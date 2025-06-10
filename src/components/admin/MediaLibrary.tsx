
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Image, 
  Search, 
  Grid, 
  List, 
  Trash2, 
  Download, 
  Eye, 
  Upload,
  Filter,
  FolderOpen,
  Calendar,
  File
} from "lucide-react";

interface MediaFile {
  name: string;
  id: string;
  size?: number;
  created_at?: string;
  updated_at?: string;
  last_accessed_at?: string;
  metadata?: any;
}

const MediaLibrary = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('portfolio-images')
        .list('', {
          limit: 100,
          offset: 0,
        });

      if (error) throw error;

      // Transform the Supabase FileObject to our MediaFile interface
      const transformedFiles: MediaFile[] = (data || []).map(file => ({
        name: file.name,
        id: file.id || file.name,
        size: file.metadata?.size || 0,
        created_at: file.created_at,
        updated_at: file.updated_at,
        last_accessed_at: file.last_accessed_at,
        metadata: file.metadata,
      }));

      setFiles(transformedFiles);
    } catch (error) {
      console.error("Error loading files:", error);
      toast({
        title: "Error",
        description: "Failed to load media files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('portfolio-images')
        .remove([fileName]);

      if (error) throw error;

      setFiles(prev => prev.filter(f => f.name !== fileName));
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const getFileUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('portfolio-images')
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-slate-900/40 border-slate-700/30 backdrop-blur-md animate-pulse">
          <CardHeader>
            <div className="h-6 w-48 bg-slate-600/50 rounded" />
            <div className="h-4 w-64 bg-slate-600/50 rounded" />
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white font-bold text-xl">
            <Image className="w-6 h-6 text-purple-400" />
            Media Library
          </CardTitle>
          <CardDescription className="text-slate-300 font-medium">
            Manage your portfolio images and media files
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/20 to-indigo-600/10 border-purple-400/30 backdrop-blur-md shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 w-4 h-4" />
                <Input
                  placeholder="Search media files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-purple-400/30 text-white"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-400/30 text-purple-200 hover:bg-purple-500/20"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-purple-500" : "border-purple-400/30 text-purple-200"}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-purple-500" : "border-purple-400/30 text-purple-200"}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-purple-400/30 text-purple-200">
                <FolderOpen className="w-3 h-3 mr-1" />
                {filteredFiles.length} files
              </Badge>
              <Badge variant="outline" className="border-cyan-400/30 text-cyan-200">
                <Calendar className="w-3 h-3 mr-1" />
                Last updated today
              </Badge>
            </div>
            {selectedFiles.length > 0 && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  selectedFiles.forEach(deleteFile);
                  setSelectedFiles([]);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedFiles.length})
              </Button>
            )}
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="group relative">
                  <div className="aspect-square rounded-lg overflow-hidden bg-slate-800/50 border border-purple-400/20 hover:border-purple-400/40 transition-colors">
                    <img
                      src={getFileUrl(file.name)}
                      alt={file.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          className="h-8 w-8 p-0"
                          onClick={() => deleteFile(file.name)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-white text-sm font-medium truncate">{file.name}</p>
                    <p className="text-purple-200/70 text-xs">{formatFileSize(file.size || 0)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/30 border border-purple-400/20 hover:bg-slate-800/50 transition-colors">
                  <img
                    src={getFileUrl(file.name)}
                    alt={file.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="flex-1">
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-purple-200/70 text-sm">
                      {formatFileSize(file.size || 0)} • {file.created_at ? new Date(file.created_at).toLocaleDateString() : 'Unknown date'}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-200">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-purple-400/30 text-purple-200">
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => deleteFile(file.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <File className="w-16 h-16 text-purple-300 mx-auto mb-4" />
              <p className="text-white font-medium text-lg">No files found</p>
              <p className="text-purple-200/70 text-sm">Upload some images to get started</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaLibrary;
