
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Code, Zap, Target, Users, TrendingUp, BarChart3, Calendar, Award } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const PortfolioAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    completion: 0,
    techDiversity: 0,
    visualAppeal: 0,
    engagement: 0,
    projectsData: [],
    techStackData: [],
    timelineData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const { data: projects } = await supabase
        .from("projects")
        .select("*");

      const { data: certificates } = await supabase
        .from("certificates")
        .select("*");

      if (projects && certificates) {
        // Calculate portfolio completion
        const totalProjects = projects.length;
        const projectsWithImages = projects.filter(p => p.image).length;
        const projectsWithDescription = projects.filter(p => p.description && p.description.length > 50).length;
        const completion = Math.round(((projectsWithImages + projectsWithDescription + certificates.length) / ((totalProjects * 2) + 10)) * 100);

        // Calculate tech diversity
        const allTech = projects.flatMap(p => p.tech || []);
        const uniqueTech = new Set(allTech);
        const techDiversity = Math.min(Math.round((uniqueTech.size / 15) * 100), 100);

        // Calculate visual appeal
        const visualAppeal = Math.round((projectsWithImages / Math.max(totalProjects, 1)) * 100);

        // Calculate engagement potential
        const projectsWithLinks = projects.filter(p => p.live_link || p.repo_link).length;
        const engagement = Math.round((projectsWithLinks / Math.max(totalProjects, 1)) * 100);

        // Prepare chart data
        const techStackData = Array.from(uniqueTech).slice(0, 8).map(tech => ({
          name: tech,
          count: allTech.filter(t => t === tech).length,
        }));

        const projectsData = projects.slice(0, 5).map(project => ({
          name: project.title.slice(0, 10) + (project.title.length > 10 ? '...' : ''),
          tech: project.tech?.length || 0,
          featured: project.featured ? 1 : 0,
        }));

        // Timeline data (projects by month)
        const monthlyData = projects.reduce((acc, project) => {
          const month = new Date(project.created_at).toLocaleDateString('en-US', { month: 'short' });
          acc[month] = (acc[month] || 0) + 1;
          return acc;
        }, {});

        const timelineData = Object.entries(monthlyData).map(([month, count]) => ({
          month,
          projects: count,
        }));

        setAnalytics({
          completion,
          techDiversity,
          visualAppeal,
          engagement,
          projectsData,
          techStackData,
          timelineData,
        });
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyticsCards = [
    {
      title: "Portfolio Completion",
      value: analytics.completion,
      description: "Overall portfolio completeness",
      icon: Target,
      color: "emerald",
      suggestions: analytics.completion < 70 ? ["Add more project details", "Include more certificates"] : ["Portfolio looks great!"]
    },
    {
      title: "Tech Stack Diversity",
      value: analytics.techDiversity,
      description: "Variety of technologies used",
      icon: Code,
      color: "blue",
      suggestions: analytics.techDiversity < 60 ? ["Add backend projects", "Include mobile development"] : ["Great tech diversity!"]
    },
    {
      title: "Visual Appeal",
      value: analytics.visualAppeal,
      description: "Projects with quality images",
      icon: Eye,
      color: "purple",
      suggestions: analytics.visualAppeal < 80 ? ["Add project screenshots", "Include demo videos"] : ["Excellent visual presentation!"]
    },
    {
      title: "Engagement Potential",
      value: analytics.engagement,
      description: "Projects with live links",
      icon: Heart,
      color: "pink",
      suggestions: analytics.engagement < 70 ? ["Add live demo links", "Include GitHub repositories"] : ["Perfect engagement setup!"]
    }
  ];

  const COLORS = ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899', '#6366f1', '#84cc16'];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; progress: string }> = {
      emerald: {
        bg: "from-emerald-500/20 to-emerald-600/10",
        border: "border-emerald-400/30",
        text: "text-emerald-100",
        progress: "bg-emerald-500"
      },
      blue: {
        bg: "from-blue-500/20 to-blue-600/10",
        border: "border-blue-400/30", 
        text: "text-blue-100",
        progress: "bg-blue-500"
      },
      purple: {
        bg: "from-purple-500/20 to-purple-600/10",
        border: "border-purple-400/30",
        text: "text-purple-100", 
        progress: "bg-purple-500"
      },
      pink: {
        bg: "from-pink-500/20 to-pink-600/10",
        border: "border-pink-400/30",
        text: "text-pink-100",
        progress: "bg-pink-500"
      }
    };
    return colors[color] || colors.emerald;
  };

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
          <CardTitle className="flex items-center gap-2 text-slate-100 font-bold text-xl">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Portfolio Analytics Dashboard
          </CardTitle>
          <CardDescription className="text-slate-300/80 font-medium">
            Real-time insights and performance metrics for your portfolio
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {analyticsCards.map((item) => {
          const Icon = item.icon;
          const colors = getColorClasses(item.color);
          
          return (
            <Card key={item.title} className={`bg-gradient-to-br ${colors.bg} ${colors.border} backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-base font-semibold ${colors.text}`}>
                    {item.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
                <CardDescription className="text-xs text-slate-300/80 font-medium">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-2xl font-bold ${colors.text}`}>{item.value}%</span>
                    <Badge variant="outline" className={`${colors.border} ${colors.text} bg-transparent font-semibold`}>
                      {item.value >= 80 ? "Excellent" : item.value >= 60 ? "Good" : "Needs Work"}
                    </Badge>
                  </div>
                  <Progress 
                    value={item.value} 
                    className="h-2 bg-slate-700/50"
                  />
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-200">Suggestions:</p>
                  {item.suggestions.map((suggestion, index) => (
                    <p key={index} className="text-xs text-slate-300/80">
                      • {suggestion}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-100 font-bold">Tech Stack Usage</CardTitle>
            <CardDescription className="text-slate-300/80">Most used technologies in your projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Usage Count",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.techStackData}>
                  <XAxis dataKey="name" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 border-slate-600/30 backdrop-blur-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-slate-100 font-bold">Project Timeline</CardTitle>
            <CardDescription className="text-slate-300/80">Projects created over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                projects: {
                  label: "Projects",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.timelineData}>
                  <XAxis dataKey="month" tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#cbd5e1', fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="projects" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-400/30 backdrop-blur-md shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-100 font-bold">
            <TrendingUp className="w-5 h-5" />
            Portfolio Impact Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-cyan-500/10 border border-cyan-400/20">
              <div className="text-2xl font-bold text-cyan-100">{analytics.projectsData.length}</div>
              <div className="text-xs text-cyan-200/80 font-medium">Active Projects</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-emerald-500/10 border border-emerald-400/20">
              <div className="text-2xl font-bold text-emerald-100">{analytics.techStackData.length}</div>
              <div className="text-xs text-emerald-200/80 font-medium">Technologies</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-500/10 border border-purple-400/20">
              <div className="text-2xl font-bold text-purple-100">{Math.round(analytics.completion * 0.8)}</div>
              <div className="text-xs text-purple-200/80 font-medium">Quality Score</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-pink-500/10 border border-pink-400/20">
              <div className="text-2xl font-bold text-pink-100">{Math.round(analytics.engagement * 0.9)}</div>
              <div className="text-xs text-pink-200/80 font-medium">Engagement Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytics;
