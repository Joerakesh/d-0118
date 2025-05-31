
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactForm from "./ContactForm";
import { Menu, X, Sun, Moon, Download, Github, Linkedin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      setIsLightTheme(true);
      document.body.classList.add("light");
    } else {
      document.body.classList.add("dark");
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isLightTheme) {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("theme", "light");
    }
    setIsLightTheme(!isLightTheme);
  };

  const openContactForm = () => {
    const contactButton = document.getElementById("open-contact-dialog");
    if (contactButton) {
      contactButton.click();
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      const sections = ["home", "about", "skills", "education", "projects", "certifications", "achievements"];
      const matchedSection = sections.find(section => 
        section.includes(searchLower) || searchLower.includes(section)
      );
      
      if (matchedSection) {
        const element = document.getElementById(matchedSection);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setSearchOpen(false);
          setSearchTerm("");
        }
      }
    }
  };

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Joe_Rakesh_A_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-0 ${
        scrolled ? "py-3 glass-nav backdrop-blur-md" : "py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary neon-text hover:scale-105 transition-transform">
          Joe Rakesh A
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {[
              "Home",
              "About", 
              "Skills",
              "Education",
              "Projects",
              "Certifications",
              "Achievements",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden md:block">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sections..."
                  className="w-40 h-8 text-sm"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <X size={16} />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-foreground hover:text-primary"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={16} />
              </Button>
            )}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground hover:text-primary"
              onClick={() => window.open('https://github.com/joerakeshdeveloper', '_blank')}
            >
              <Github size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-foreground hover:text-primary"
              onClick={() => window.open('https://linkedin.com/in/joe-rakesh-a', '_blank')}
            >
              <Linkedin size={16} />
            </Button>
          </div>

          {/* Download Resume */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex h-8 w-8 text-foreground hover:text-primary"
            onClick={downloadResume}
            title="Download Resume"
          >
            <Download size={16} />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-foreground hover:text-primary"
            onClick={toggleTheme}
          >
            {isLightTheme ? <Moon size={16} /> : <Sun size={16} />}
          </Button>

          {/* Contact Button */}
          <Button
            className="hidden md:inline-flex bg-primary hover:bg-primary/90 h-8 px-4 text-sm"
            onClick={openContactForm}
          >
            Contact Me
          </Button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground relative z-50 transition-all duration-300 p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={20} className="animate-fade-in" />
            ) : (
              <Menu size={20} className="animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 transition-all duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-background/90 backdrop-blur-xl transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          className={cn(
            "absolute top-[4.5rem] left-0 w-full bg-card/95 backdrop-blur-xl border-t border-primary/10 transition-all duration-500 overflow-hidden",
            isOpen ? "max-h-[calc(100vh-4.5rem)]" : "max-h-0"
          )}
        >
          <ul className="container mx-auto space-y-4 px-4 py-6">
            {/* Search in mobile */}
            <li>
              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search sections..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Search size={16} />
                </Button>
              </form>
            </li>

            {["Home", "About", "Skills", "Projects", "Education", "Certifications"].map(
              (item, index) => (
                <li
                  key={item}
                  className={cn(
                    "transform transition-all duration-300",
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  )}
                  style={{
                    transitionDelay: isOpen ? `${index * 75}ms` : "0ms",
                  }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-colors block py-2 text-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
            
            {/* Mobile Actions */}
            <li className="pt-4 border-t border-primary/10">
              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    downloadResume();
                    setIsOpen(false);
                  }}
                  className="flex-1"
                >
                  <Download size={16} className="mr-2" />
                  Resume
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://github.com/joerakeshdeveloper', '_blank')}
                  className="flex-1"
                >
                  <Github size={16} className="mr-2" />
                  GitHub
                </Button>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={() => {
                  setIsOpen(false);
                  openContactForm();
                }}
              >
                Contact Me
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
