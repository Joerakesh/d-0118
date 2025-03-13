
import { Button } from "@/components/ui/button";
import { ArrowRight, Code } from "lucide-react";

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-4 bg-dark">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="flex items-center gap-2 bg-primary/10 w-fit px-4 py-2 rounded-full border border-primary/20">
            <Code className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium">Full Stack Developer</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            Hi, I'm
            <br />
            <span className="text-primary">Joe Rakesh A</span>
          </h1>
          <p className="text-lg text-white/80 max-w-md">
            I build modern, responsive web applications with cutting-edge technologies. Let's create something amazing together.
          </p>
          <div className="flex items-center gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-dark font-medium px-8 py-6 text-lg">
              My Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
              Contact Me
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-primary/20 rounded-2xl blur opacity-30" />
          <img
            src="https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1050&q=80"
            alt="Joe Rakesh A"
            className="relative rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
