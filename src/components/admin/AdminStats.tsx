
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Award, Star, Calendar, TrendingUp, Users, Activity, Zap } from "lucide-react";

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalCertificates: 0,
    recentActivity: 0,
    techStack: 0,
    completionRate: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get projects stats
      const { data: projects } = await supabase
        .from("projects")
        .select("id, featured, created_at, tech, title");

      // Get certificates stats
      const { data: certificates } = await supabase
        .from("certificates")
        .select("id, created_at, title, status");

      const totalProjects = projects?.length || 0;
      const featuredProjects = projects?.filter(p => p.featured).length || 0;
      const totalCertificates = certificates?.length || 0;

      // Calculate unique tech stack
      const allTech = projects?.flatMap(p => p.tech || []) || [];
      const uniqueTech = new Set(allTech);
      const techStack = uniqueTech.size;

      // Calculate completion rate for certificates
      const completedCerts = certificates?.filter(c => c.status === 'Completed').length || 0;
      const completionRate = totalCertificates > 0 ? Math.round((completedCerts / totalCertificates) * 100) : 0;

      // Calculate recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentProjects = projects?.filter(p => 
        new Date(p.created_at) > thirtyDaysAgo
      ) || [];
      
      const recentCertificates = certificates?.filter(c => 
        new Date(c.created_at) > thirtyDaysAgo
      ).length || 0;

      setRecentProjects(recentProjects.slice(0, 3));

      setStats({
        totalProjects,
        featuredProjects,
        totalCertificates,
        recentActivity: recentProjects.length + recentCertificates,
        techStack,
        completionRate,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      description: "Portfolio projects created",
      icon: FolderOpen,
      gradient: "from-cyan-500/20 to-blue-600/10",
      border: "border-cyan-400/30",
      iconColor: "text-cyan-400",
      textColor: "text-cyan-100",
      valueColor: "text-cyan-50",
      bgGlow: "shadow-cyan-500/20",
    },
    {
      title: "Featured Projects",
      value: stats.featuredProjects,
      description: "Highlighted on homepage",
      icon: Star,
      gradient: "from-yellow-500/20 to-orange-600/10",
      border: "border-yellow-400/30",
      iconColor: "text-yellow-400",
      textColor: "text-yellow-100",
      valueColor: "text-yellow-50",
      bgGlow: "shadow-yellow-500/20",
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      description: `${stats.completionRate}% completion rate`,
      icon: Award,
      gradient: "from-emerald-500/20 to-green-600/10",
      border: "border-emerald-400/30",
      iconColor: "text-emerald-400",
      textColor: "text-emerald-100",
      valueColor: "text-emerald-50",
      bgGlow: "shadow-emerald-500/20",
    },
    {
      title: "Tech Stack",
      value: stats.techStack,
      description: "Unique technologies used",
      icon: Zap,
      gradient: "from-purple-500/20 to-pink-600/10",
      border: "border-purple-400/30",
      iconColor: "text-purple-400",
      textColor: "text-purple-100",
      valueColor: "text-purple-50",
      bgGlow: "shadow-purple-500/20",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      description: "Added in last 30 days",
      icon: TrendingUp,
      gradient: "from-rose-500/20 to-red-600/10",
      border: "border-rose-400/30",
      iconColor: "text-rose-400",
      textColor: "text-rose-100",
      valueColor: "text-rose-50",
      bgGlow: "shadow-rose-500/20",
    },
    {
      title: "Portfolio Score",
      value: Math.round((stats.totalProjects * 20 + stats.featuredProjects * 15 + stats.totalCertificates * 10) / 3),
      description: "Overall portfolio strength",
      icon: Activity,
      gradient: "from-indigo-500/20 to-violet-600/10",
      border: "border-indigo-400/30",
      iconColor: "text-indigo-400",
      textColor: "text-indigo-100",
      valueColor: "text-indigo-50",
      bgGlow: "shadow-indigo-500/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="bg-slate-900/40 border-slate-700/30 backdrop-blur-md animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-slate-600/50 animate-pulse rounded" />
              <div className="h-4 w-4 bg-slate-600/50 animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-slate-600/50 animate-pulse rounded mb-1" />
              <div className="h-3 w-24 bg-slate-600/50 animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={stat.title} 
              className={`bg-gradient-to-br ${stat.gradient} ${stat.border} backdrop-blur-md hover:scale-105 transition-all duration-300 ${stat.bgGlow} shadow-lg hover:shadow-xl`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-semibold ${stat.textColor} tracking-wide`}>
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.iconColor} drop-shadow-sm`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold ${stat.valueColor} mb-1 tracking-tight`}>
                  {stat.value}
                </div>
                <CardDescription className={`text-xs ${stat.textColor}/80 font-medium`}>
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {recentProjects.length > 0 && (
        <Card className="bg-gradient-to-r from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100 font-bold text-lg">
              <Users className="w-5 h-5 text-emerald-400" />
              Recent Projects
            </CardTitle>
            <CardDescription className="text-slate-300/80 font-medium">
              Your latest portfolio additions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentProjects.map((project: any) => (
                <div key={project.id} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-400/20 hover:border-emerald-400/40 transition-colors">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-emerald-100 font-semibold text-sm">{project.title}</p>
                    <p className="text-emerald-200/70 text-xs">
                      Added {new Date(project.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {project.tech && project.tech.length > 0 && (
                    <div className="flex gap-1">
                      {project.tech.slice(0, 3).map((tech: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-emerald-400/20 text-emerald-300 text-xs rounded-full border border-emerald-400/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminStats;
