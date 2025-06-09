
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  folder: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, folder, label, required = false, disabled = false }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const { toast } = useToast();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const fileName = `${folder.toLowerCase()}-${Date.now()}.${fileExtension}`;
      const filePath = `/${folder}/${fileName}`;

      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // Update the form data with the new image path
      onChange(filePath);
      
      toast({
        title: "Success",
        description: `Image prepared for upload! Save the form to complete the process.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to process image: " + error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={`image-upload-${folder}`}>
        {label} {required && "*"}
      </Label>
      
      <div className="space-y-4">
        {preview && (
          <div className="relative w-full max-w-xs">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-32 object-cover rounded-lg border"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder.svg';
              }}
            />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2 h-6 w-6 p-0"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Input
            id={`image-upload-${folder}`}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading || disabled}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading || disabled}
            className="whitespace-nowrap"
          >
            <Upload className="h-4 w-4 mr-1" />
            {uploading ? "Processing..." : "Select"}
          </Button>
        </div>
        
        {value && !preview && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Image className="h-4 w-4" />
            <span>Current: {value}</span>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          Upload an image file (max 5MB). Supported formats: JPEG, PNG, WebP, GIF.
        </p>
      </div>
    </div>
  );
};

export default ImageUpload;
