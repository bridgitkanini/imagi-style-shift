
import { useState } from 'react';
import Navigation from '../components/Navigation';
import { useImageHistory } from '../hooks/useImageHistory';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Trash2, Calendar, Tag, Palette, History as HistoryIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const History = () => {
  const { data: images, isLoading, error, refetch } = useImageHistory();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDownload = async (imageUrl: string, prompt: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${prompt.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Downloaded!",
        description: "Image has been downloaded to your device.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Could not download the image. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, storagePath: string) => {
    setDeletingId(id);
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('generated-images')
        .remove([storagePath]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('image_history')
        .delete()
        .eq('id', id);

      if (dbError) {
        throw new Error(dbError.message);
      }

      toast({
        title: "Deleted!",
        description: "Image has been removed from your history.",
      });
      
      refetch();
    } catch (error) {
      toast({
        title: "Delete Failed",
        description: "Could not delete the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="pt-20 px-4 max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading History</h1>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <Button onClick={() => refetch()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      <div className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <HistoryIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Your AI Image History
            </h1>
          </div>
          <p className="text-gray-600">
            View and manage all your generated and edited images
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : images && images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={image.image_url}
                    alt={image.prompt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="w-8 h-8 bg-white/80 hover:bg-white"
                      onClick={() => handleDownload(image.image_url, image.prompt)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="w-8 h-8"
                      onClick={() => handleDelete(image.id, image.storage_path)}
                      disabled={deletingId === image.id}
                    >
                      {deletingId === image.id ? (
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    "{image.prompt}"
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {image.generation_type === 'text-to-image' ? 'Generated' : 'Edited'}
                    </Badge>
                    {image.model_used && (
                      <Badge variant="outline" className="text-xs">
                        <Palette className="w-3 h-3 mr-1" />
                        {image.model_used}
                      </Badge>
                    )}
                    {image.size && (
                      <Badge variant="outline" className="text-xs">
                        {image.size}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(image.created_at).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <HistoryIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Images Yet</h2>
            <p className="text-gray-600 mb-6">
              Start generating images to see your history here
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Generate Your First Image
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
