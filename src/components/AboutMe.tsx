
import { User, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "@/utils/toast-utils";

const AboutMe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('about');
      if (element) {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight - 200) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadCV = () => {
    toast.success("CV Download", "Your CV is being downloaded...");
    
    // Create an anchor element and trigger the download
    const link = document.createElement('a');
    link.href = 'https://joerakesh-portfolio.netlify.app/assets/resume.pdf';
    link.target = '_blank';
    link.download = 'Joe_Rakesh_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="py-20 px-4 transition-colors duration-300">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-foreground neon-text">About Me</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <p className="text-foreground/80 text-lg leading-relaxed">
              Hello! I'm Joe Rakesh A, a passionate full-stack developer with a
              love for creating elegant solutions to complex problems. With over
              1 years of experience in web development, I specialize in building
              modern, responsive web applications.
            </p>
            <p className="text-foreground/80 text-lg leading-relaxed">
              My approach combines technical expertise with a keen eye for
              design, ensuring that the applications I build are not only
              functional but also provide an excellent user experience. I'm
              constantly learning new technologies and methodologies to stay at
              the forefront of web development.
            </p>
            <Button 
              variant="outline" 
              className="mt-4 border-primary/20 text-primary hover:bg-primary/10 transition-all duration-300 button-glow"
              onClick={handleDownloadCV}
            >
              <Download className="w-4 h-4 mr-2" /> Download CV
            </Button>
          </div>
          <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
            <div className="p-6 bg-card rounded-lg border border-primary/10 transform transition-transform hover:scale-105 hover:border-primary/30 card-hover neon-box">
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                1+
                <Sparkles className="ml-1 h-4 w-4 text-primary" />
              </h3>
              <p className="text-foreground/80">Years of Experience</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-primary/10 transform transition-transform hover:scale-105 hover:border-primary/30 card-hover neon-box">
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                5+
                <Sparkles className="ml-1 h-4 w-4 text-primary" />
              </h3>
              <p className="text-foreground/80">Projects Completed</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-primary/10 transform transition-transform hover:scale-105 hover:border-primary/30 card-hover neon-box">
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                2+
                <Sparkles className="ml-1 h-4 w-4 text-primary" />
              </h3>
              <p className="text-foreground/80">Happy Clients</p>
            </div>
            <div className="p-6 bg-card rounded-lg border border-primary/10 transform transition-transform hover:scale-105 hover:border-primary/30 card-hover neon-box">
              <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                100%
                <Sparkles className="ml-1 h-4 w-4 text-primary" />
              </h3>
              <p className="text-foreground/80">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
