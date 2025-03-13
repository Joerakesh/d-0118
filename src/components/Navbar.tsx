
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "glass-nav py-3" : "py-5"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-white cursor-pointer" onClick={() => scrollToSection("home")}>
          Joe<span className="text-primary">Rakesh</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <span 
            onClick={() => scrollToSection("about")} 
            className="text-white/90 hover:text-primary transition-colors cursor-pointer"
          >
            About
          </span>
          <span 
            onClick={() => scrollToSection("skills")} 
            className="text-white/90 hover:text-primary transition-colors cursor-pointer"
          >
            Skills
          </span>
          <span 
            onClick={() => scrollToSection("education")} 
            className="text-white/90 hover:text-primary transition-colors cursor-pointer"
          >
            Education
          </span>
          <span 
            onClick={() => scrollToSection("projects")} 
            className="text-white/90 hover:text-primary transition-colors cursor-pointer"
          >
            Projects
          </span>
          <span 
            onClick={() => scrollToSection("achievements")} 
            className="text-white/90 hover:text-primary transition-colors cursor-pointer"
          >
            Achievements
          </span>
        </div>
        
        <Button className="hidden md:flex bg-primary hover:bg-primary/90 text-white font-medium">
          Contact Me
        </Button>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-light shadow-lg py-4 px-4">
          <div className="flex flex-col space-y-4">
            <span 
              onClick={() => scrollToSection("about")} 
              className="text-white/90 hover:text-primary transition-colors cursor-pointer py-2"
            >
              About
            </span>
            <span 
              onClick={() => scrollToSection("skills")} 
              className="text-white/90 hover:text-primary transition-colors cursor-pointer py-2"
            >
              Skills
            </span>
            <span 
              onClick={() => scrollToSection("education")} 
              className="text-white/90 hover:text-primary transition-colors cursor-pointer py-2"
            >
              Education
            </span>
            <span 
              onClick={() => scrollToSection("projects")} 
              className="text-white/90 hover:text-primary transition-colors cursor-pointer py-2"
            >
              Projects
            </span>
            <span 
              onClick={() => scrollToSection("achievements")} 
              className="text-white/90 hover:text-primary transition-colors cursor-pointer py-2"
            >
              Achievements
            </span>
            <Button className="bg-primary hover:bg-primary/90 text-white font-medium w-full">
              Contact Me
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
