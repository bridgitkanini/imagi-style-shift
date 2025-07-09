
import { useState } from 'react';
import Navigation from '../components/Navigation';
import ImageUpload from '../components/ImageUpload';
import StyleSelector from '../components/StyleSelector';
import TransformationResults from '../components/TransformationResults';
import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, Image as ImageIcon } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<'ghibli' | 'action-figure' | null>(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);

  const handleTransform = async () => {
    if (!uploadedImage || !selectedStyle) return;
    
    setIsTransforming(true);
    // Simulate transformation process
    setTimeout(() => {
      // In a real app, this would be the result from your AI transformation API
      setTransformedImage('/placeholder.svg');
      setIsTransforming(false);
    }, 3000);
  };

  const resetTransformation = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setTransformedImage(null);
    setIsTransforming(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Transform Your Images
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Create magical Ghibli-style artwork or stunning action figure renders with the power of AI
            </p>
          </div>
          
          {/* Example Transformations */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img 
                src="/placeholder.svg" 
                alt="Ghibli transformation example"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Ghibli Magic
                  </h3>
                  <p className="text-sm opacity-90">Watercolor dreamscapes</p>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img 
                src="/placeholder.svg" 
                alt="Action figure transformation example"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Wand2 className="w-5 h-5" />
                    Action Figure
                  </h3>
                  <p className="text-sm opacity-90">Collectible perfection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transformation Interface */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Start Your Transformation
            </h2>
            
            <div className="space-y-8">
              {/* Step 1: Upload Image */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h3 className="text-xl font-semibold">Upload Your Image</h3>
                </div>
                <ImageUpload 
                  onImageUpload={setUploadedImage}
                  uploadedImage={uploadedImage}
                />
              </div>

              {/* Step 2: Choose Style */}
              {uploadedImage && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <h3 className="text-xl font-semibold">Choose Your Style</h3>
                  </div>
                  <StyleSelector 
                    selectedStyle={selectedStyle}
                    onStyleSelect={setSelectedStyle}
                  />
                </div>
              )}

              {/* Step 3: Transform */}
              {uploadedImage && selectedStyle && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <h3 className="text-xl font-semibold">Transform</h3>
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <Button 
                      onClick={handleTransform}
                      disabled={isTransforming}
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                    >
                      {isTransforming ? (
                        <>
                          <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Transforming...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Transform Image
                        </>
                      )}
                    </Button>
                    
                    {(transformedImage || isTransforming) && (
                      <Button 
                        onClick={resetTransformation}
                        variant="outline"
                        className="mt-2"
                      >
                        Start Over
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {(transformedImage || isTransforming) && (
        <TransformationResults 
          originalImage={uploadedImage}
          transformedImage={transformedImage}
          isTransforming={isTransforming}
          selectedStyle={selectedStyle}
        />
      )}
    </div>
  );
};

export default Index;
