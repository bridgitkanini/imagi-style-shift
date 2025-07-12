
import { useState } from 'react';
import { useRecentImages } from '../hooks/useImageHistory';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { History, ExternalLink, Calendar } from 'lucide-react';

const ImageGalleryWidget = () => {
  const { data: recentImages, isLoading } = useRecentImages(6);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!recentImages || recentImages.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-white/20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-lg">Recent Creations</CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.href = '/history'}
            className="text-purple-600 border-purple-200 hover:bg-purple-50"
          >
            View All
            <ExternalLink className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {recentImages.map((image) => (
              <div
                key={image.id}
                className="relative group cursor-pointer rounded-lg overflow-hidden aspect-square"
                onClick={() => setSelectedImage(selectedImage === image.id ? null : image.id)}
              >
                <img
                  src={image.image_url}
                  alt={image.prompt}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                
                {selectedImage === image.id && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col justify-end p-3">
                    <p className="text-white text-xs mb-2 line-clamp-2">
                      "{image.prompt}"
                    </p>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">
                        {image.generation_type === 'text-to-image' ? 'Generated' : 'Edited'}
                      </Badge>
                      <div className="flex items-center text-xs text-white/80">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(image.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {recentImages.length === 0 && !isLoading && (
          <div className="text-center py-6 text-gray-500">
            <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No recent images</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ImageGalleryWidget;
