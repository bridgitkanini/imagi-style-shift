
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit3, Upload, X } from 'lucide-react';
import { editImage } from '@/utils/openaiApi';
import { useToast } from '@/hooks/use-toast';
import ImageGalleryWidget from './ImageGalleryWidget';

interface ImageEditorProps {
  onImageEdited: (imageUrl: string) => void;
}

const ImageEditor = ({ onImageEdited }: ImageEditorProps) => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [size, setSize] = useState('1024x1024');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setOriginalImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setOriginalImage(null);
    setPreviewUrl(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleEdit = async () => {
    if (!originalImage || !editPrompt.trim()) {
      toast({
        title: "Missing Information",
        description: "Please upload an image and provide editing instructions.",
        variant: "destructive",
      });
      return;
    }

    setIsEditing(true);
    try {
      const editedImageUrl = await editImage({
        image: originalImage,
        prompt: editPrompt,
        size: size as any,
      });
      
      onImageEdited(editedImageUrl);
      toast({
        title: "Image Edited!",
        description: "Your edited image is ready.",
      });
    } catch (error) {
      console.error('Image editing error:', error);
      toast({
        title: "Edit Failed",
        description: error instanceof Error ? error.message : "Failed to edit image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6 p-6 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <Edit3 className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Edit Existing Image</h3>
        </div>

        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <Label>Upload Image to Edit</Label>
            {!previewUrl ? (
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-300 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Click to upload an image</p>
                <p className="text-sm text-gray-500">PNG, JPG, WebP up to 4MB</p>
              </div>
            ) : (
              <div className="mt-2 relative">
                <img
                  src={previewUrl}
                  alt="Image to edit"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  onClick={removeImage}
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 rounded-full w-8 h-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Edit Instructions */}
          <div>
            <Label htmlFor="editPrompt">Describe the changes you want</Label>
            <Textarea
              id="editPrompt"
              placeholder="Add sunglasses to the person, change the background to a beach..."
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
          </div>

          {/* Size Selection */}
          <div>
            <Label>Output Size</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="256x256">256x256</SelectItem>
                <SelectItem value="512x512">512x512</SelectItem>
                <SelectItem value="1024x1024">1024x1024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            onClick={handleEdit}
            disabled={isEditing || !originalImage || !editPrompt.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            size="lg"
          >
            {isEditing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Editing...
              </>
            ) : (
              <>
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Image
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Gallery Widget */}
      <ImageGalleryWidget />
    </div>
  );
};

export default ImageEditor;
