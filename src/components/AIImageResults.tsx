
import { Button } from '@/components/ui/button';
import { Download, Share2, RefreshCw } from 'lucide-react';

interface AIImageResultsProps {
  imageUrl: string | null;
  isGenerating: boolean;
  onReset: () => void;
}

const AIImageResults = ({ imageUrl, isGenerating, onReset }: AIImageResultsProps) => {
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `ai-generated-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    if (imageUrl && navigator.share) {
      try {
        await navigator.share({
          title: 'AI Generated Image',
          url: imageUrl,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(imageUrl);
      }
    } else if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
    }
  };

  if (isGenerating) {
    return (
      <div className="p-8 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
        <div className="text-center space-y-4">
          <div className="animate-spin w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
          <h3 className="text-xl font-semibold">Creating your image...</h3>
          <p className="text-gray-600">This may take a few moments</p>
        </div>
      </div>
    );
  }

  if (!imageUrl) {
    return null;
  }

  return (
    <div className="space-y-6 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
      <h3 className="text-xl font-semibold text-center">Your AI Generated Image</h3>
      
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        <img 
          src={imageUrl} 
          alt="AI generated image" 
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Button 
          onClick={handleDownload}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        
        <Button 
          onClick={handleShare}
          variant="outline"
          className="border-blue-200 text-blue-600 hover:bg-blue-50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        
        <Button 
          onClick={onReset}
          variant="outline"
          className="border-purple-200 text-purple-600 hover:bg-purple-50"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Generate Another
        </Button>
      </div>
    </div>
  );
};

export default AIImageResults;
