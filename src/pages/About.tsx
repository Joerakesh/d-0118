
import { ArrowLeft, User, Code, Briefcase, GraduationCap, Award, Target, Heart, Laptop, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Express", 
    "HTML/CSS", "Git/GitHub", "Docker", "AWS", "Next.js", "Firebase"
  ];

  const journey = [
    {
      year: "Feb 2025",
      title: "Software Developer",
      badge: "Present",
      subtitle: "Currently working as a Full Stack Engineer @Catalyst by Zoho",
      description: "Working on scalable frontend banking services with multiple framework support.",
      icon: "💻",
      completed: false
    },
    {
      year: "Apr 2024", 
      title: "Completed my college degree",
      subtitle: "",
      description: "Graduated with a Bachelor's degree in Computer Science and Engineering from St. Joseph's College.",
      icon: "🎓",
      completed: true
    },
    {
      year: "Mar 2022",
      title: "Project Trainee",
      subtitle: "I joined as a project trainee @Zoho Corporation",
      description: "Gained hands-on experience working on real-world projects and learning industry best practices.",
      icon: "📋",
      completed: true
    },
    {
      year: "Jul 2021",
      title: "Worked as an Intern",
      subtitle: "I worked as a intern @Grids and Guides",
      description: "Started my professional journey by working on web development projects and learning the fundamentals.",
      icon: "💼",
      completed: true
    },
    {
      year: "Jan 2020",
      title: "Started Freelancing",
      subtitle: "I used my freelancing earnings to upgrade my laptop.",
      description: "Began taking on freelance projects to gain experience and fund my education.",
      icon: "💻",
      device: "Honor MagicBook, AMD Ryzen 5, 8GB, 256 GB SSD",
      completed: true
    },
    {
      year: "Aug 2018",
      title: "Started my college studies in Computer Science and Engineering",
      subtitle: "",
      description: "Began formal education in computer science at St. Joseph's College, laying the foundation for my career.",
      icon: "📚",
      completed: true
    },
    {
      year: "~ 2016",
      title: "Wrote my first code",
      subtitle: "I wrote my first line of code during my higher secondary school years.",
      description: "My journey into programming began during high school, sparking my passion for technology.",
      icon: "👨‍💻",
      completed: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/10 bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <User className="w-6 h-6 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">About Me</h1>
          </div>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            I'm a passionate full-stack developer who loves creating elegant solutions to complex problems. 
            Here's my journey and what drives me in the world of technology.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="w-5 h-5 text-primary" />
              Who I Am
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80">
            <p>
              I'm Muthukkarasu, a self-driven and career-oriented developer passionate about crafting high-quality, scalable web 
              applications. I specialize in front-end development, building responsive websites and web interfaces.
            </p>
            <p>
              I primarily working with technologies like React.js, TypeScript, Java, Spring Boot and so on.
            </p>
            <p>
              I love coding in my free time and constantly seek opportunities to enhance my skills, which allowed me to work on new projects with like-
              minded people.
            </p>
          </CardContent>
        </Card>

        {/* Current Work */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Briefcase className="w-5 h-5 text-primary" />
              Current Work
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-foreground/80">
            <p>
              I'm currently architecting a scalable frontend banking service with support for multiple frameworks on the Catalyst 
              talent platform.
            </p>
            <p>
              Apart from that, I contribute to developing SOEs, testing framework adapters, plugins, and developer tools.
            </p>
            <p>
              I actively help applications on the Catalyst platform to enhance the developer experience and improve efficiency.
            </p>
          </CardContent>
        </Card>

        {/* My Skills */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Code className="w-5 h-5 text-primary" />
              My Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-6">Technologies I have worked with and I am familiar with:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-center font-medium hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* GitHub Stats */}
        <Card className="mb-12 border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Target className="w-5 h-5 text-primary" />
              GitHub Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-4">
              I believe in open source contribution as it is a great way to learn and contribute to the community.
            </p>
            <div className="text-sm text-foreground/60">
              Check out more on my GitHub profile for detailed statistics and contributions.
            </div>
          </CardContent>
        </Card>

        {/* My Journey */}
        <Card className="border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <GraduationCap className="w-5 h-5 text-primary" />
              My Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground/80 mb-8">
              Embracing my own journey, I strive to avoid comparisons and focus on taking small, meaningful steps every day.
            </p>
            
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
              
              <div className="space-y-8">
                {journey.map((item, index) => (
                  <div key={index} className="relative flex items-start gap-6">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary/20">
                      {item.completed ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="bg-card border border-primary/10 rounded-lg p-6 hover:border-primary/20 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-foreground">
                              {item.title}
                            </h3>
                            {item.badge && (
                              <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-primary font-medium">
                            {item.year}
                          </span>
                        </div>
                        
                        {item.subtitle && (
                          <p className="text-sm text-foreground/70 mb-2 flex items-center gap-1">
                            <span className="text-lg">{item.icon}</span>
                            {item.subtitle}
                          </p>
                        )}
                        
                        <p className="text-sm text-foreground/80 mb-3">
                          {item.description}
                        </p>
                        
                        {item.device && (
                          <div className="flex items-center gap-2 text-xs text-foreground/60">
                            <Laptop className="w-3 h-3" />
                            {item.device}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
