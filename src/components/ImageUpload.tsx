
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File | null) => void;
  uploadedImage: File | null;
}

const ImageUpload = ({ onImageUpload, uploadedImage }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    onImageUpload(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (uploadedImage && previewUrl) {
    return (
      <div className="relative">
        <div className="relative rounded-xl overflow-hidden shadow-lg max-w-md mx-auto">
          <img 
            src={previewUrl} 
            alt="Uploaded image" 
            className="w-full h-64 object-cover"
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
        <p className="text-center mt-3 text-sm text-muted-foreground">
          {uploadedImage.name}
        </p>
      </div>
    );
  }

  return (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        dragOver 
          ? 'border-purple-400 bg-purple-50' 
          : 'border-gray-300 hover:border-purple-300 hover:bg-purple-25'
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
          <ImageIcon className="w-8 h-8 text-purple-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Drop your image here
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            Or click to browse from your device
          </p>
          
          <Button 
            type="button"
            variant="outline"
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Choose Image
          </Button>
        </div>
        
        <p className="text-xs text-gray-400">
          Supports JPG, PNG, WebP up to 10MB
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;
