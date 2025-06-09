
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Award, Star, Calendar } from "lucide-react";

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
      color: "text-blue-600",
    },
    {
      title: "Featured Projects",
      value: stats.featuredProjects,
      description: "Projects shown on homepage",
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      description: "Professional certifications",
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Recent Activity",
      value: stats.recentActivity,
      description: "Added in last 30 days",
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-4 bg-muted animate-pulse rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted animate-pulse rounded mb-1" />
              <div className="h-3 w-24 bg-muted animate-pulse rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription className="text-xs text-muted-foreground">
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
