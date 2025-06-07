
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  skills: string[];
  description: string;
  credential_id: string;
  status: string;
  completion_date?: string;
  valid_until?: string;
  course_hours?: number;
  verify_link?: string;
  personal_note?: string;
}

interface CertificateFormProps {
  certificate?: Certificate | null;
  onSuccess: () => void;
}

const CertificateForm = ({ certificate, onSuccess }: CertificateFormProps) => {
  const [formData, setFormData] = useState({
    title: certificate?.title || "",
    issuer: certificate?.issuer || "",
    date: certificate?.date || "",
    image: certificate?.image || "",
    skills: certificate?.skills?.join(", ") || "",
    description: certificate?.description || "",
    credential_id: certificate?.credential_id || "",
    status: certificate?.status || "Completed",
    completion_date: certificate?.completion_date || "",
    valid_until: certificate?.valid_until || "",
    course_hours: certificate?.course_hours?.toString() || "",
    verify_link: certificate?.verify_link || "",
    personal_note: certificate?.personal_note || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
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

    setUploadingImage(true);
    try {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop();
      const fileName = `certificate-${Date.now()}.${fileExtension}`;
      const filePath = `/Certifications/${fileName}`;

      // Create the file content as base64
      const reader = new FileReader();
      reader.onload = () => {
        // Update the form data with the new image path
        setFormData({ ...formData, image: filePath });
        
        toast({
          title: "Success",
          description: `Image uploaded successfully! Please save the certificate to store the image at: ${filePath}`,
        });
      };
      reader.readAsDataURL(file);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to upload image: " + error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const skillsArray = formData.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const certificateData = {
        title: formData.title,
        issuer: formData.issuer,
        date: formData.date,
        image: formData.image,
        skills: skillsArray,
        description: formData.description,
        credential_id: formData.credential_id,
        status: formData.status,
        completion_date: formData.completion_date || null,
        valid_until: formData.valid_until || null,
        course_hours: formData.course_hours ? parseInt(formData.course_hours) : null,
        verify_link: formData.verify_link || null,
        personal_note: formData.personal_note || null,
        updated_at: new Date().toISOString(),
      };

      if (certificate) {
        const { error } = await supabase
          .from("certificates")
          .update(certificateData)
          .eq("id", certificate.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Certificate updated successfully",
        });
      } else {
        const { error } = await supabase
          .from("certificates")
          .insert([certificateData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Certificate created successfully",
        });
      }

      onSuccess();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {certificate ? "Edit Certificate" : "Add New Certificate"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer *</Label>
                <Input
                  id="issuer"
                  value={formData.issuer}
                  onChange={(e) =>
                    setFormData({ ...formData, issuer: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Issue Date *</Label>
                <Input
                  id="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  placeholder="2024"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-upload">Certificate Image *</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploadingImage}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={uploadingImage}
                      className="whitespace-nowrap"
                    >
                      <Upload className="h-4 w-4 mr-1" />
                      {uploadingImage ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                  {formData.image && (
                    <p className="text-sm text-gray-600">
                      Current image: {formData.image}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Upload an image file (max 5MB). It will be stored in the public/Certifications folder.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Skills * (comma-separated)</Label>
              <Input
                id="skills"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                required
                placeholder="Web Development, React, JavaScript"
              />
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Certificate Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="credential_id">Credential ID *</Label>
                <Input
                  id="credential_id"
                  value={formData.credential_id}
                  onChange={(e) =>
                    setFormData({ ...formData, credential_id: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  placeholder="Completed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  type="date"
                  value={formData.completion_date}
                  onChange={(e) =>
                    setFormData({ ...formData, completion_date: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valid_until">Valid Until</Label>
                <Input
                  id="valid_until"
                  type="date"
                  value={formData.valid_until}
                  onChange={(e) =>
                    setFormData({ ...formData, valid_until: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course_hours">Course Hours</Label>
                <Input
                  id="course_hours"
                  type="number"
                  value={formData.course_hours}
                  onChange={(e) =>
                    setFormData({ ...formData, course_hours: e.target.value })
                  }
                  placeholder="24"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verify_link">Verification Link</Label>
              <Input
                id="verify_link"
                value={formData.verify_link}
                onChange={(e) =>
                  setFormData({ ...formData, verify_link: e.target.value })
                }
                placeholder="https://www.linkedin.com/learning/certificates/..."
              />
            </div>
          </div>

          {/* Personal Note */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Reflection</h3>
            
            <div className="space-y-2">
              <Label htmlFor="personal_note">Personal Note</Label>
              <Textarea
                id="personal_note"
                value={formData.personal_note}
                onChange={(e) =>
                  setFormData({ ...formData, personal_note: e.target.value })
                }
                rows={3}
                placeholder="What did you learn from this course? How has it impacted your work?"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading || uploadingImage}>
              {isLoading
                ? "Saving..."
                : certificate
                ? "Update Certificate"
                : "Create Certificate"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CertificateForm;
