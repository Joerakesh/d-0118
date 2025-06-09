
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
      const filePath = `${folder}/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);

      // Update the form data with the new image URL
      onChange(publicUrl);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload image: " + error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (value && value.includes('portfolio-images')) {
      try {
        // Extract file path from URL
        const url = new URL(value);
        const filePath = url.pathname.split('/storage/v1/object/public/portfolio-images/')[1];
        
        if (filePath) {
          await supabase.storage
            .from('portfolio-images')
            .remove([filePath]);
        }
      } catch (error) {
        console.error('Error removing file:', error);
      }
    }
    
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
            {uploading ? "Uploading..." : "Select"}
          </Button>
        </div>
        
        {value && !preview && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Image className="h-4 w-4" />
            <span>Current: {value.split('/').pop()}</span>
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
