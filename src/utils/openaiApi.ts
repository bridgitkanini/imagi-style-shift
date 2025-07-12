
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
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: options.prompt,
      model: options.model || 'dall-e-3',
      size: options.size || '1024x1024',
      quality: options.quality || 'standard',
      style: options.style || 'vivid',
      n: options.n || 1,
      response_format: 'url',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to generate image');
  }

  const data = await response.json();
  return data.data[0].url;
};

export const editImage = async (options: ImageEditOptions): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  const formData = new FormData();
  formData.append('image', options.image);
  formData.append('prompt', options.prompt);
  formData.append('model', options.model || 'dall-e-2');
  formData.append('size', options.size || '1024x1024');
  formData.append('n', (options.n || 1).toString());
  formData.append('response_format', 'url');

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to edit image');
  }

  const data = await response.json();
  return data.data[0].url;
};
