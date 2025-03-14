
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add animation delay for entrance effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4 transition-colors duration-300">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20 animate-pulse">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Full Stack Developer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-foreground neon-text">
            Hi, I'm
            <br />
            <span className="text-primary relative">
              Joe Rakesh A
              <Sparkles className="absolute -right-8 top-0 w-6 h-6 text-primary animate-pulse" />
            </span>
          </h1>
          <p className="text-lg text-foreground/80 max-w-md">
            I build modern, responsive web applications with cutting-edge technologies. Let's create something amazing together.
          </p>
          <div className="flex items-center gap-4">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white font-medium px-8 py-6 text-lg neon-border button-glow"
              onClick={() => scrollToSection("projects")}
            >
              My Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className="border-primary/20 text-primary hover:bg-primary/10"
              onClick={() => {
                document.getElementById("open-contact-dialog")?.click();
              }}
            >
              Contact Me
            </Button>
          </div>
        </div>
        <div className={`relative float-animation transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
          <div className="absolute -inset-0.5 bg-primary/20 rounded-2xl blur-lg opacity-50 animate-pulse" />
          <img
            src="https://joerakesh-portfolio.netlify.app/assets/profile-pic2.png"
            alt="Joe Rakesh A"
            className="relative rounded-2xl shadow-2xl object-cover w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
