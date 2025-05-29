
import { ArrowLeft, User, Code, Briefcase, GraduationCap, Award, Target, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js", "MongoDB", "Express", 
    "HTML/CSS", "Git/GitHub", "Docker", "AWS", "Next.js", "Firebase"
  ];

  const journey = [
    {
      year: "Aug 2024",
      title: "Software Developer",
      company: "Started my journey as a software developer",
      description: "Began my professional journey in software development, focusing on full-stack web applications."
    },
    {
      year: "Apr 2024", 
      title: "Completed my college degree",
      company: "St. Joseph's College",
      description: "Graduated with a Bachelor's degree in Computer Science and Engineering."
    },
    {
      year: "Jan 2024",
      title: "Project Tubeez",
      company: "Completed a major project during college",
      description: "Developed a comprehensive web application as part of my final year project."
    },
    {
      year: "Aug 2023",
      title: "Started Freelancing",
      company: "Independent Contractor",
      description: "Began taking on freelance projects to gain real-world experience while studying."
    },
    {
      year: "2021",
      title: "Started my college studies in Computer Science and Engineering",
      company: "St. Joseph's College",
      description: "Began my formal education in computer science, laying the foundation for my career."
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
            <p className="text-foreground/80 mb-8">Following my tech journey, I strive to assist entrepreneurs and leave an outstanding track every day.</p>
            <div className="space-y-6">
              {journey.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-lg border border-primary/10 hover:border-primary/20 transition-colors">
                  <div className="text-primary font-bold text-sm whitespace-nowrap">
                    {item.year}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-primary mb-2">{item.company}</p>
                    <p className="text-sm text-foreground/70">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
