import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, FolderOpen, Award, BarChart3, Palette, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectsManager from "@/components/admin/ProjectsManager";
import CertificatesManager from "@/components/admin/CertificatesManager";
import AdminStats from "@/components/admin/AdminStats";
import PortfolioAnalytics from "@/components/admin/PortfolioAnalytics";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-400 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-32 w-32 border-t-2 border-purple-400 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
          </div>
          <p className="mt-6 text-emerald-300 font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="border-b border-purple-500/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                  Portfolio Studio
                </h1>
                <p className="text-emerald-300/80">Manage your creative portfolio</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => window.open("/", "_blank")}
                className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400"
              >
                <Zap className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-purple-500/30 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border border-purple-500/20 backdrop-blur-sm">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
            >
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="certificates" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white"
            >
              <Award className="w-4 h-4" />
              Certificates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <AdminStats />
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-300">
                    <Plus className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="text-emerald-200/70">
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full justify-start bg-emerald-500/20 text-emerald-200 border-emerald-500/30 hover:bg-emerald-500/30" 
                    variant="outline"
                    onClick={() => {
                      const tabs = document.querySelector('[role="tablist"]');
                      const projectTab = tabs?.querySelector('[value="projects"]') as HTMLElement;
                      projectTab?.click();
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Project
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-purple-500/20 text-purple-200 border-purple-500/30 hover:bg-purple-500/30"
                    onClick={() => {
                      const tabs = document.querySelector('[role="tablist"]');
                      const certTab = tabs?.querySelector('[value="certificates"]') as HTMLElement;
                      certTab?.click();
                    }}
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Add New Certificate
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-300">
                    <Palette className="w-5 h-5" />
                    Design Tips
                  </CardTitle>
                  <CardDescription className="text-purple-200/70">
                    Best practices for your portfolio
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-purple-200/80">
                  <p>• Use high-quality images (max 5MB)</p>
                  <p>• Write clear, concise descriptions</p>
                  <p>• Include relevant technologies and skills</p>
                  <p>• Add links to live demos and repositories</p>
                  <p>• Feature your best projects on the homepage</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-300">
                    <Sparkles className="w-5 h-5" />
                    Pro Features
                  </CardTitle>
                  <CardDescription className="text-blue-200/70">
                    Advanced portfolio management
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-blue-200 text-sm font-medium">Image Storage</p>
                    <p className="text-blue-200/70 text-xs">Images are stored securely in cloud storage</p>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <p className="text-emerald-200 text-sm font-medium">Real-time Updates</p>
                    <p className="text-emerald-200/70 text-xs">Changes reflect instantly on your portfolio</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-600/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-200">Recent Activity</CardTitle>
                <CardDescription className="text-slate-400">
                  Track your portfolio updates and management activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <p className="text-emerald-200 text-sm">Image storage system is now active</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <p className="text-purple-200 text-sm">Admin dashboard enhanced with new features</p>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-blue-200 text-sm">Portfolio management system ready</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <PortfolioAnalytics />
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
