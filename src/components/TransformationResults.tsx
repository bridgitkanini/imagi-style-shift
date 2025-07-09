
import { Button } from '@/components/ui/button';
import { Download, Share2, RotateCcw } from 'lucide-react';

interface TransformationResultsProps {
  originalImage: File | null;
  transformedImage: string | null;
  isTransforming: boolean;
  selectedStyle: 'ghibli' | 'action-figure' | null;
}

const TransformationResults = ({ 
  originalImage, 
  transformedImage, 
  isTransforming, 
  selectedStyle 
}: TransformationResultsProps) => {
  const originalUrl = originalImage ? URL.createObjectURL(originalImage) : null;
  
  const handleDownload = () => {
    if (transformedImage) {
      const link = document.createElement('a');
      link.href = transformedImage;
      link.download = `transformed-${selectedStyle}-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Transformation Results
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Original Image */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">Original</h3>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              {originalUrl && (
                <img 
                  src={originalUrl} 
                  alt="Original image" 
                  className="w-full h-80 object-cover"
                />
              )}
            </div>
          </div>

          {/* Transformed Image */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-center">
              {selectedStyle === 'ghibli' ? 'Ghibli Magic' : 'Action Figure'}
            </h3>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              {isTransforming ? (
                <div className="w-full h-80 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-purple-600 font-medium">
                      Creating your masterpiece...
                    </p>
                    <div className="w-48 h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ) : transformedImage ? (
                <img 
                  src={transformedImage} 
                  alt="Transformed image" 
                  className="w-full h-80 object-cover"
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {transformedImage && !isTransforming && (
          <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-in">
            <Button 
              onClick={handleDownload}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            <Button 
              variant="outline"
              className="border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            
            <Button 
              variant="outline"
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Different Style
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TransformationResults;
