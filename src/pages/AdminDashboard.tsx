
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, FolderOpen, Award, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectsManager from "@/components/admin/ProjectsManager";
import CertificatesManager from "@/components/admin/CertificatesManager";
import AdminStats from "@/components/admin/AdminStats";

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = "/admin/auth";
        return;
      }

      // Check if user is admin
      const { data: adminData, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error || !adminData) {
        await supabase.auth.signOut();
        window.location.href = "/admin/auth";
        return;
      }

      setUser(session.user);
    } catch (error) {
      console.error("Auth check failed:", error);
      window.location.href = "/admin/auth";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    window.location.href = "/";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Portfolio Admin</h1>
              <p className="text-muted-foreground">Manage your portfolio content</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => window.open("/", "_blank")}>
                View Portfolio
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="certificates" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats />
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const projectTab = tabs?.querySelector('[value="projects"]') as HTMLElement;
                    projectTab?.click();
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Project
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => {
                    const tabs = document.querySelector('[role="tablist"]');
                    const certTab = tabs?.querySelector('[value="certificates"]') as HTMLElement;
                    certTab?.click();
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Certificate
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips & Guidelines</CardTitle>
                  <CardDescription>
                    Best practices for your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Use high-quality images (max 5MB)</p>
                  <p>• Write clear, concise descriptions</p>
                  <p>• Include relevant technologies and skills</p>
                  <p>• Add links to live demos and repositories</p>
                  <p>• Feature your best projects on the homepage</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
