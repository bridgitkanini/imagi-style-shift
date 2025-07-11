
import { useState } from 'react';
import Navigation from '../components/Navigation';
import ImageUpload from '../components/ImageUpload';
import StyleSelector from '../components/StyleSelector';
import TransformationResults from '../components/TransformationResults';
import FeaturesSection from '../components/FeaturesSection';
import ExamplesSection from '../components/ExamplesSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
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
              Transform Images with AI Magic
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Turn your ordinary photos into enchanting Ghibli-style artwork or action figures with our AI-powered image transformation platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Try It Now →
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-purple-200 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg font-semibold rounded-full"
              >
                View Examples
              </Button>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=500&fit=crop" 
                alt="AI transformation example"
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                <span className="text-sm font-medium text-purple-600">Original</span>
              </div>
              <div className="absolute bottom-4 right-4 bg-purple-600 text-white rounded-lg px-3 py-1">
                <span className="text-sm font-medium">Transformed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Examples Section */}
      <ExamplesSection />

      {/* Transformation Interface */}
      <section className="py-20 px-4" id="try-it">
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

      {/* Pricing Section */}
      <PricingSection />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
