import { useState } from "react";
import Navigation from "../components/Navigation";
import ImageUpload from "../components/ImageUpload";
import StyleSelector from "../components/StyleSelector";
import TransformationResults from "../components/TransformationResults";
import TextToImageGenerator from "../components/TextToImageGenerator";
import ImageEditor from "../components/ImageEditor";
import AIImageResults from "../components/AIImageResults";
import FeaturesSection from "../components/FeaturesSection";
import ExamplesSection from "../components/ExamplesSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Wand2, Image as ImageIcon, Edit3 } from "lucide-react";
import { CurrentPlanDisplay } from "@/components/CurrentPlanDisplay";
import { SignedIn } from "@clerk/clerk-react";

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<
    "ghibli" | "action-figure" | null
  >(null);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);

  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("transform");

  const handleTransform = async () => {
    if (!uploadedImage || !selectedStyle) return;

    setIsTransforming(true);
    // Simulate transformation process
    setTimeout(() => {
      // In a real app, this would be the result from your AI transformation API
      setTransformedImage("/placeholder.svg");
      setIsTransforming(false);
    }, 3000);
  };

  const resetTransformation = () => {
    setUploadedImage(null);
    setSelectedStyle(null);
    setTransformedImage(null);
    setIsTransforming(false);
  };

  const handleImageGenerated = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
    setIsGenerating(false);
  };

  const handleImageEdited = (imageUrl: string) => {
    setGeneratedImage(imageUrl);
    setIsGenerating(false);
  };

  const resetAIGeneration = () => {
    setGeneratedImage(null);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />

      {/* Hero Section */}
      <section
        className="relative w-full py-48 px-4 bg-gradient-to-r from-[#b993f4] to-[#8ca6db]"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left: Text & Buttons */}
          <div className="flex-1 flex flex-col items-start justify-center text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black leading-tight">
              Transform Images
              <br />
              with{" "}
              <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                AI Magic
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-xl">
              Turn your ordinary photos into enchanting Ghibli-style artwork or
              action figures with our AI-powered image transformation platform.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-md transition-all duration-300"
                onClick={() => setActiveTab("generate")}
              >
                Try It Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 px-8 py-3 text-lg font-semibold rounded-lg"
                onClick={() => {
                  const el = document.getElementById("examples");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Examples
              </Button>
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="flex-1 flex items-center justify-center w-full md:w-auto">
            <div className="relative w-[380px] h-[240px] md:w-[420px] md:h-[260px] rounded-3xl shadow-2xl border-4 border-white overflow-hidden bg-white">
              <img
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=500&fit=crop" 
                alt="Main example"
                className="w-full h-full object-cover"
              />
              {/* Overlay smaller image */}
              <div className="absolute bottom-4 right-4 w-40 h-24 rounded-xl shadow-lg border-2 border-white overflow-hidden bg-white flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=500&fit=crop" 
                  alt="Overlay example"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Examples Section */}
      <ExamplesSection />

      {/* AI Tools Interface */}
      <section className="py-20 px-4" id="try-it">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                AI Image Tools
              </h2>
              <SignedIn>
                <CurrentPlanDisplay />
              </SignedIn>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger
                  value="generate"
                  className="flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Generate
                </TabsTrigger>
                <TabsTrigger value="edit" className="flex items-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit
                </TabsTrigger>
                <TabsTrigger
                  value="transform"
                  className="flex items-center gap-2"
                >
                  <Wand2 className="w-4 h-4" />
                  Transform
                </TabsTrigger>
              </TabsList>

              <TabsContent value="generate" className="space-y-8">
                <TextToImageGenerator onImageGenerated={handleImageGenerated} />
                <AIImageResults
                  imageUrl={generatedImage}
                  isGenerating={isGenerating}
                  onReset={resetAIGeneration}
                />
              </TabsContent>

              <TabsContent value="edit" className="space-y-8">
                <ImageEditor onImageEdited={handleImageEdited} />
                <AIImageResults
                  imageUrl={generatedImage}
                  isGenerating={isGenerating}
                  onReset={resetAIGeneration}
                />
              </TabsContent>

              <TabsContent value="transform" className="space-y-8">
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
                      <h3 className="text-xl font-semibold">
                        Choose Your Style
                      </h3>
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
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Style Transformation Results */}
      {(transformedImage || isTransforming) && activeTab === "transform" && (
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
