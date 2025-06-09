import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, FolderOpen, Award, BarChart3, Palette, Sparkles, Zap, TrendingUp, Activity, Settings, Bell, FileText, Database, Image, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ProjectsManager from "@/components/admin/ProjectsManager";
import CertificatesManager from "@/components/admin/CertificatesManager";
import AdminStats from "@/components/admin/AdminStats";
import PortfolioAnalytics from "@/components/admin/PortfolioAnalytics";
import ContentManager from "@/components/admin/ContentManager";
import BackupManager from "@/components/admin/BackupManager";
import MediaLibrary from "@/components/admin/MediaLibrary";

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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-32 w-32 border-t-2 border-purple-400 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '3s' }}></div>
          </div>
          <p className="mt-6 text-cyan-300 font-bold text-lg">Loading Portfolio Studio...</p>
          <p className="text-slate-400 text-sm mt-2">Preparing your creative workspace</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Portfolio Studio
                </h1>
                <p className="text-slate-300 font-medium">Creative Portfolio Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-slate-700/50"
              >
                <Bell className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.open("/", "_blank")}
                className="border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 font-semibold transition-all"
              >
                <Zap className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-red-400/30 text-red-300 hover:bg-red-500/10 hover:border-red-400 font-semibold transition-all"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-7 bg-slate-900/60 border border-slate-700/50 backdrop-blur-md shadow-xl rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/20 data-[state=active]:to-purple-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500/20 data-[state=active]:to-blue-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500/20 data-[state=active]:to-pink-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <FolderOpen className="w-4 h-4" />
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="certificates" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-500/20 data-[state=active]:to-orange-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <Award className="w-4 h-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger 
              value="content" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500/20 data-[state=active]:to-violet-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger 
              value="media" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/20 data-[state=active]:to-rose-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <Image className="w-4 h-4" />
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="backup" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500/20 data-[state=active]:to-green-500/20 data-[state=active]:text-white font-semibold transition-all text-xs"
            >
              <Shield className="w-4 h-4" />
              Backup
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-4">
              <div className="lg:col-span-3">
                <AdminStats />
              </div>
              <div className="space-y-6">
                <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-600/5 border-cyan-400/30 backdrop-blur-md shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-cyan-100 font-bold">
                      <Plus className="w-5 h-5" />
                      Quick Actions
                    </CardTitle>
                    <CardDescription className="text-cyan-200/80 font-medium">
                      Manage your portfolio content
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start bg-cyan-500/20 text-cyan-100 border-cyan-400/30 hover:bg-cyan-500/30 font-semibold transition-all" 
                      variant="outline"
                      onClick={() => {
                        const tabs = document.querySelector('[role="tablist"]');
                        const projectTab = tabs?.querySelector('[value="projects"]') as HTMLElement;
                        projectTab?.click();
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      New Project
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-purple-500/20 text-purple-100 border-purple-400/30 hover:bg-purple-500/30 font-semibold transition-all"
                      onClick={() => {
                        const tabs = document.querySelector('[role="tablist"]');
                        const certTab = tabs?.querySelector('[value="certificates"]') as HTMLElement;
                        certTab?.click();
                      }}
                    >
                      <Award className="w-4 h-4 mr-2" />
                      New Certificate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start bg-emerald-500/20 text-emerald-100 border-emerald-400/30 hover:bg-emerald-500/30 font-semibold transition-all"
                      onClick={() => {
                        const tabs = document.querySelector('[role="tablist"]');
                        const analyticsTab = tabs?.querySelector('[value="analytics"]') as HTMLElement;
                        analyticsTab?.click();
                      }}
                    >
                      <Activity className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-600/5 border-purple-400/30 backdrop-blur-md shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-100 font-bold">
                      <Palette className="w-5 h-5" />
                      Pro Tips
                    </CardTitle>
                    <CardDescription className="text-purple-200/80 font-medium">
                      Best practices for your portfolio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-purple-100/90 font-medium">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-400/20">
                      <p className="font-semibold text-purple-100">🎨 Visual Excellence</p>
                      <p className="text-purple-200/80 text-xs mt-1">Use high-quality images and consistent styling</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                      <p className="font-semibold text-cyan-100">🚀 Performance</p>
                      <p className="text-cyan-200/80 text-xs mt-1">Add live demos and GitHub links</p>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
                      <p className="font-semibold text-emerald-100">📝 Content Quality</p>
                      <p className="text-emerald-200/80 text-xs mt-1">Write clear, engaging project descriptions</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-slate-100 font-bold text-lg">System Status</CardTitle>
                <CardDescription className="text-slate-300/80 font-medium">
                  Current system health and recent updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-emerald-100 font-semibold text-sm">Storage Active</p>
                      <p className="text-emerald-200/80 text-xs">Image uploads working perfectly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-cyan-100 font-semibold text-sm">Analytics Ready</p>
                      <p className="text-cyan-200/80 text-xs">Real-time data processing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-purple-500/10 border border-purple-400/20">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <div>
                      <p className="text-purple-100 font-semibold text-sm">Database Synced</p>
                      <p className="text-purple-200/80 text-xs">All content up to date</p>
                    </div>
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

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>

          <TabsContent value="media">
            <MediaLibrary />
          </TabsContent>

          <TabsContent value="backup">
            <BackupManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
