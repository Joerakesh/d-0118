
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ContactForm from "./ContactForm";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    // Check if user has a theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsLightTheme(true);
      document.body.classList.add('light');
    } else {
      document.body.classList.add('dark');
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
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem('theme', 'light');
    }
    setIsLightTheme(!isLightTheme);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 ${
        scrolled ? "py-3 glass-nav" : "py-5"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-primary neon-text"
        >
          Joe Rakesh A
        </Link>

        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {["Home", "About", "Skills", "Projects", "Education"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-colors"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:text-primary"
            onClick={toggleTheme}
          >
            {isLightTheme ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                id="open-contact-dialog"
                className="hidden md:inline-flex bg-primary hover:bg-primary/90"
              >
                Contact Me
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <ContactForm />
            </DialogContent>
          </Dialog>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-card py-4 border-t border-primary/10">
          <ul className="container mx-auto space-y-4 px-4">
            {["Home", "About", "Skills", "Projects", "Education"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-foreground/80 hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
            <li>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Me
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <ContactForm />
                </DialogContent>
              </Dialog>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
