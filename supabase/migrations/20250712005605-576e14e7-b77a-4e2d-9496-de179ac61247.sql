
-- Create storage bucket for generated images
INSERT INTO storage.buckets (id, name, public)
VALUES ('generated-images', 'generated-images', true);

-- Create storage policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'generated-images' AND 
  auth.role() = 'authenticated'
);

-- Create storage policy to allow public read access to images
CREATE POLICY "Allow public read access to images" ON storage.objects
FOR SELECT USING (bucket_id = 'generated-images');

-- Create storage policy to allow users to delete their own images
CREATE POLICY "Allow users to delete their own images" ON storage.objects
FOR DELETE USING (
  bucket_id = 'generated-images' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Create table for image history
CREATE TABLE public.image_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  generation_type TEXT NOT NULL CHECK (generation_type IN ('text-to-image', 'edit-image')),
  model_used TEXT,
  size TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.image_history ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for image_history table
CREATE POLICY "Users can view their own image history" 
  ON public.image_history 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own image history records" 
  ON public.image_history 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own image history records" 
  ON public.image_history 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for better query performance
CREATE INDEX idx_image_history_user_created ON public.image_history (user_id, created_at DESC);
