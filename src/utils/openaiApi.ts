
import { supabase } from '@/integrations/supabase/client';

interface ImageGenerationOptions {
  prompt: string;
  model?: 'dall-e-2' | 'dall-e-3' | 'gpt-image-1';
  size?: '256x256' | '512x512' | '1024x1024' | '1792x1024' | '1024x1792' | '1536x1024' | '1024x1536';
  quality?: 'standard' | 'hd' | 'auto' | 'high' | 'medium' | 'low';
  style?: 'vivid' | 'natural';
  n?: number;
}

interface ImageEditOptions {
  image: File;
  prompt: string;
  model?: 'dall-e-2';
  size?: '256x256' | '512x512' | '1024x1024';
  n?: number;
}

export const generateImage = async (options: ImageGenerationOptions): Promise<string> => {
  // Get the current session for authentication
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User must be authenticated to generate images');
  }

  const { data, error } = await supabase.functions.invoke('generate-image', {
    body: {
      prompt: options.prompt,
      model: options.model || 'dall-e-3',
      size: options.size || '1024x1024',
      quality: options.quality || 'standard',
      style: options.style || 'vivid',
      n: options.n || 1,
    },
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error('Edge function error:', error);
    throw new Error(error.message || 'Failed to generate image');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.imageUrl;
};

export const editImage = async (options: ImageEditOptions): Promise<string> => {
  // Get the current session for authentication
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User must be authenticated to edit images');
  }

  const formData = new FormData();
  formData.append('image', options.image);
  formData.append('prompt', options.prompt);
  formData.append('size', options.size || '1024x1024');

  const { data, error } = await supabase.functions.invoke('edit-image', {
    body: formData,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error('Edge function error:', error);
    throw new Error(error.message || 'Failed to edit image');
  }

  if (data.error) {
    throw new Error(data.error);
  }

  return data.imageUrl;
};
