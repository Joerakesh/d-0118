
import { Folder, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const projectsList = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with payment integration, product management and analytics.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      liveLink: "https://example.com/ecommerce",
      repoLink: "https://github.com/joerakesh/ecommerce",
      image: "https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Task Management App",
      description: "A Kanban-style task management application with real-time updates and team collaboration features.",
      tech: ["React", "Firebase", "Tailwind CSS", "Redux"],
      liveLink: "https://example.com/taskmanager",
      repoLink: "https://github.com/joerakesh/taskmanager",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      title: "Fitness Tracker",
      description: "A mobile-responsive fitness tracking application with workout plans, progress charts, and meal tracking.",
      tech: ["React Native", "Express", "MongoDB", "Chart.js"],
      liveLink: "https://example.com/fitnesstracker",
      repoLink: "https://github.com/joerakesh/fitnesstracker",
      image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80"
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-dark-light">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Folder className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Projects</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project, index) => (
            <div key={index} className="bg-dark rounded-xl overflow-hidden border border-primary/10 transition-all hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      <ExternalLink className="w-4 h-4 mr-2" /> Live
                    </Button>
                  </a>
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                    <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                      <Github className="w-4 h-4 mr-2" /> Code
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
