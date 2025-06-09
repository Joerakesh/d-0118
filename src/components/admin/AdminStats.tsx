
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Award, Star, Calendar, TrendingUp } from "lucide-react";

const AdminStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalCertificates: 0,
    recentActivity: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get projects stats
      const { data: projects } = await supabase
        .from("projects")
        .select("id, featured, created_at");

      // Get certificates stats
      const { data: certificates } = await supabase
        .from("certificates")
        .select("id, created_at");

      const totalProjects = projects?.length || 0;
      const featuredProjects = projects?.filter(p => p.featured).length || 0;
      const totalCertificates = certificates?.length || 0;

      // Calculate recent activity (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentProjects = projects?.filter(p => 
        new Date(p.created_at) > thirtyDaysAgo
      ).length || 0;
      
      const recentCertificates = certificates?.filter(c => 
        new Date(c.created_at) > thirtyDaysAgo
      ).length || 0;

      setStats({
        totalProjects,
        featuredProjects,
        totalCertificates,
        recentActivity: recentProjects + recentCertificates,
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
      description: "All projects in portfolio",
      icon: FolderOpen,
      gradient: "from-blue-500/20 to-blue-600/5",
      border: "border-blue-500/30",
      iconColor: "text-blue-400",
      textColor: "text-blue-200",
      descColor: "text-blue-200/70",
    },
    {
      title: "Featured Projects",
      value: stats.featuredProjects,
      description: "Projects shown on homepage",
      icon: Star,
      gradient: "from-yellow-500/20 to-yellow-600/5",
      border: "border-yellow-500/30",
      iconColor: "text-yellow-400",
      textColor: "text-yellow-200",
      descColor: "text-yellow-200/70",
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      description: "Professional certifications",
      icon: Award,
      gradient: "from-emerald-500/20 to-emerald-600/5",
      border: "border-emerald-500/30",
      iconColor: "text-emerald-400",
      textColor: "text-emerald-200",
      descColor: "text-emerald-200/70",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      description: "Added in last 30 days",
      icon: TrendingUp,
      gradient: "from-purple-500/20 to-purple-600/5",
      border: "border-purple-500/30",
      iconColor: "text-purple-400",
      textColor: "text-purple-200",
      descColor: "text-purple-200/70",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="bg-slate-800/30 border-slate-600/20 backdrop-blur-sm">
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
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className={`bg-gradient-to-br ${stat.gradient} ${stat.border} backdrop-blur-sm hover:scale-105 transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${stat.textColor}`}>
                {stat.title}
              </CardTitle>
              <Icon className={`h-5 w-5 ${stat.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</div>
              <CardDescription className={`text-xs ${stat.descColor}`}>
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AdminStats;
