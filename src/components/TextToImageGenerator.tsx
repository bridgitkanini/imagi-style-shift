
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Wand2 } from 'lucide-react';
import { generateImage } from '@/utils/openaiApi';
import { useToast } from '@/hooks/use-toast';

interface TextToImageGeneratorProps {
  onImageGenerated: (imageUrl: string) => void;
}

const TextToImageGenerator = ({ onImageGenerated }: TextToImageGeneratorProps) => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState<'dall-e-2' | 'dall-e-3' | 'gpt-image-1'>('dall-e-3');
  const [size, setSize] = useState('1024x1024');
  const [style, setStyle] = useState<'vivid' | 'natural'>('vivid');
  const [quality, setQuality] = useState('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a description for the image you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const imageUrl = await generateImage({
        prompt,
        model,
        size: size as any,
        style,
        quality: quality as any,
      });
      
      onImageGenerated(imageUrl);
      toast({
        title: "Image Generated!",
        description: "Your AI-generated image is ready.",
      });
    } catch (error) {
      console.error('Image generation error:', error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const getSizeOptions = () => {
    if (model === 'dall-e-2') {
      return ['256x256', '512x512', '1024x1024'];
    } else if (model === 'dall-e-3') {
      return ['1024x1024', '1792x1024', '1024x1792'];
    } else {
      return ['1024x1024', '1536x1024', '1024x1536'];
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-xl font-semibold">Generate Image from Text</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="prompt">Describe your image</Label>
          <Textarea
            id="prompt"
            placeholder="A cute baby sea otter floating in crystal clear water..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mt-2 min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Model</Label>
            <Select value={model} onValueChange={(value: any) => setModel(value)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dall-e-2">DALL-E 2 (Fast)</SelectItem>
                <SelectItem value="dall-e-3">DALL-E 3 (High Quality)</SelectItem>
                <SelectItem value="gpt-image-1">GPT Image 1 (Advanced)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getSizeOptions().map((sizeOption) => (
                  <SelectItem key={sizeOption} value={sizeOption}>
                    {sizeOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {model === 'dall-e-3' && (
            <div>
              <Label>Style</Label>
              <Select value={style} onValueChange={(value: any) => setStyle(value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vivid">Vivid</SelectItem>
                  <SelectItem value="natural">Natural</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Button 
          onClick={handleGenerate}
          disabled={isGenerating || !prompt.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          size="lg"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              Generate Image
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default TextToImageGenerator;
