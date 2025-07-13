
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ImageHistoryItem {
  id: string;
  prompt: string;
  image_url: string;
  storage_path: string;
  generation_type: 'text-to-image' | 'edit-image';
  model_used: string | null;
  size: string | null;
  created_at: string;
}

export const useImageHistory = () => {
  return useQuery({
    queryKey: ['image-history'],
    queryFn: async (): Promise<ImageHistoryItem[]> => {
      const { data, error } = await supabase
        .from('image_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      return (data || []) as ImageHistoryItem[];
    },
  });
};

export const useRecentImages = (limit: number = 6) => {
  return useQuery({
    queryKey: ['recent-images', limit],
    queryFn: async (): Promise<ImageHistoryItem[]> => {
      const { data, error } = await supabase
        .from('image_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        throw new Error(error.message);
      }

      return (data || []) as ImageHistoryItem[];
    },
  });
};
