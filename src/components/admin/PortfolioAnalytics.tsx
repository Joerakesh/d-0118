
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Eye, Heart, Code, Zap, Target, Users } from "lucide-react";

const PortfolioAnalytics = () => {
  const analyticsData = [
    {
      title: "Portfolio Completion",
      value: 85,
      description: "How complete your portfolio is",
      icon: Target,
      color: "emerald",
      suggestions: ["Add more project details", "Include testimonials"]
    },
    {
      title: "Tech Stack Diversity",
      value: 72,
      description: "Variety of technologies showcased",
      icon: Code,
      color: "blue",
      suggestions: ["Add backend projects", "Include mobile development"]
    },
    {
      title: "Visual Appeal",
      value: 90,
      description: "Quality of images and presentation",
      icon: Eye,
      color: "purple",
      suggestions: ["Perfect! Keep it up"]
    },
    {
      title: "Engagement Potential",
      value: 68,
      description: "How engaging your content is",
      icon: Heart,
      color: "pink",
      suggestions: ["Add project stories", "Include challenges faced"]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; progress: string }> = {
      emerald: {
        bg: "from-emerald-500/20 to-emerald-600/5",
        border: "border-emerald-500/30",
        text: "text-emerald-200",
        progress: "bg-emerald-500"
      },
      blue: {
        bg: "from-blue-500/20 to-blue-600/5",
        border: "border-blue-500/30", 
        text: "text-blue-200",
        progress: "bg-blue-500"
      },
      purple: {
        bg: "from-purple-500/20 to-purple-600/5",
        border: "border-purple-500/30",
        text: "text-purple-200", 
        progress: "bg-purple-500"
      },
      pink: {
        bg: "from-pink-500/20 to-pink-600/5",
        border: "border-pink-500/30",
        text: "text-pink-200",
        progress: "bg-pink-500"
      }
    };
    return colors[color] || colors.emerald;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-600/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-200">
            <Zap className="w-5 h-5 text-yellow-400" />
            Portfolio Analytics
          </CardTitle>
          <CardDescription className="text-slate-400">
            Insights to improve your portfolio performance
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {analyticsData.map((item) => {
          const Icon = item.icon;
          const colors = getColorClasses(item.color);
          
          return (
            <Card key={item.title} className={`bg-gradient-to-br ${colors.bg} ${colors.border} backdrop-blur-sm`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className={`text-base ${colors.text}`}>
                    {item.title}
                  </CardTitle>
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
                <CardDescription className="text-xs text-slate-300/70">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-2xl font-bold ${colors.text}`}>{item.value}%</span>
                    <Badge variant="outline" className={`${colors.border} ${colors.text} bg-transparent`}>
                      {item.value >= 80 ? "Excellent" : item.value >= 60 ? "Good" : "Needs Work"}
                    </Badge>
                  </div>
                  <Progress 
                    value={item.value} 
                    className="h-2"
                  />
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs font-medium text-slate-300">Suggestions:</p>
                  {item.suggestions.map((suggestion, index) => (
                    <p key={index} className="text-xs text-slate-400">
                      • {suggestion}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-200">
            <Users className="w-5 h-5" />
            Portfolio Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-200">24</div>
              <div className="text-xs text-indigo-300/70">Portfolio Views</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-200">12</div>
              <div className="text-xs text-purple-300/70">Project Clicks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-200">5</div>
              <div className="text-xs text-pink-300/70">Contact Forms</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalytics;
