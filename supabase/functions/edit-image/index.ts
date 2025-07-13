
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration is missing');
    }

    // Get the authorization header to identify the user
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    // Create Supabase client for user authentication
    const supabaseAuth = createClient(supabaseUrl, Deno.env.get('SUPABASE_ANON_KEY') || '');
    const { data: { user } } = await supabaseAuth.auth.getUser(authHeader.replace('Bearer ', ''));
    
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Create service role client for checking limits
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check usage limits
    const { data: limitData, error: limitError } = await supabase
      .rpc('get_user_limits', { user_email: user.email });
    
    if (limitError) {
      console.error('Error checking limits:', limitError);
      throw new Error('Failed to check usage limits');
    }

    const limits = limitData?.[0];
    if (limits && limits.current_usage >= limits.generation_limit) {
      throw new Error(`Usage limit exceeded. You have used ${limits.current_usage}/${limits.generation_limit} edits this month. Upgrade your plan for more edits.`);
    }

    const formData = await req.formData();
    const image = formData.get('image') as File;
    const prompt = formData.get('prompt') as string;
    const size = formData.get('size') as string || '1024x1024';

    if (!image || !prompt) {
      throw new Error('Image and prompt are required');
    }

    console.log('Editing image with prompt:', prompt);

    const editFormData = new FormData();
    editFormData.append('image', image);
    editFormData.append('prompt', prompt);
    editFormData.append('model', 'dall-e-2');
    editFormData.append('size', size);
    editFormData.append('n', '1');
    editFormData.append('response_format', 'url');

    const response = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
      },
      body: editFormData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error(error.error?.message || 'Failed to edit image');
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;
    
    // Download the edited image from OpenAI
    const imageResponse = await fetch(imageUrl);
    const imageBlob = await imageResponse.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    
    // Use existing service role client
    
    // Generate unique filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${user.id}/${timestamp}-edited.png`;
    
    // Upload to Supabase storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('generated-images')
      .upload(filename, imageBuffer, {
        contentType: 'image/png',
        cacheControl: '3600',
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error('Failed to save image to storage');
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('generated-images')
      .getPublicUrl(filename);

    // Save to database
    const { error: dbError } = await supabase
      .from('image_history')
      .insert({
        user_id: user.id,
        prompt,
        image_url: publicUrl,
        storage_path: filename,
        generation_type: 'edit-image',
        model_used: 'dall-e-2',
        size,
      });

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Don't throw here, as the image was edited successfully
    }

    // Update usage tracking
    const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM format
    const currentUsage = limits?.current_usage || 0;
    
    const { error: usageError } = await supabase.from('usage_tracking').upsert({
      user_id: user.id,
      month_year: currentMonth,
      generations_used: 0,
      edits_used: currentUsage + 1
    }, {
      onConflict: 'user_id,month_year',
      ignoreDuplicates: false
    });

    if (usageError) {
      console.error('Usage tracking error:', usageError);
      // Don't throw error for usage tracking failure
    }

    console.log('Image edited and saved successfully');
    
    return new Response(JSON.stringify({ imageUrl: publicUrl }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in edit-image function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
