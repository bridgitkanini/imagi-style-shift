
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
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
    console.log('Image edited successfully');
    
    return new Response(JSON.stringify({ imageUrl: data.data[0].url }), {
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
