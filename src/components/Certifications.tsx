
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const certificationsData = [
  {
    id: "microsoft-career-essentials",
    title: "Career Essentials in Software Development",
    issuer: "Microsoft & LinkedIn",
    date: "2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop",
    skills: ["Software Development", "Programming Fundamentals", "Problem Solving"],
    description: "Comprehensive program covering essential software development skills and industry best practices.",
    credentialId: "MS-2024-001",
    status: "Completed"
  },
  {
    id: "web-development-bootcamp",
    title: "Full Stack Web Development",
    issuer: "Tech Academy",
    date: "2023",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    skills: ["React", "Node.js", "Database Management", "API Development"],
    description: "Intensive bootcamp covering modern web development technologies and frameworks.",
    credentialId: "TA-2023-456",
    status: "Completed"
  },
  {
    id: "javascript-advanced",
    title: "Advanced JavaScript Programming",
    issuer: "Code Institute",
    date: "2023",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    skills: ["JavaScript ES6+", "Async Programming", "Performance Optimization"],
    description: "Deep dive into advanced JavaScript concepts and modern programming techniques.",
    credentialId: "CI-2023-789",
    status: "Completed"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Fundamentals",
    issuer: "AWS Academy",
    date: "2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    skills: ["AWS Services", "Cloud Architecture", "DevOps"],
    description: "Foundation course in cloud computing concepts and AWS services implementation.",
    credentialId: "AWS-2024-321",
    status: "In Progress"
  }
];

const Certifications = () => {
  const handleCertificateClick = () => {
    // Store current scroll position before navigating
    sessionStorage.setItem('portfolioScrollPosition', window.scrollY.toString());
    // Scroll to top for the new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="certifications" className="py-20 px-4 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-12">
          <Award className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">Certifications</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {certificationsData.map((cert, index) => (
            <HoverCard key={cert.id}>
              <HoverCardTrigger asChild>
                <Link
                  to={`/certificate/${cert.id}`}
                  onClick={handleCertificateClick}
                  className="group block bg-dark-light rounded-xl overflow-hidden border border-primary/10 hover:border-primary/30 transition-all duration-300 card-hover"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-light/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2 text-white/80 text-sm mb-1">
                        <Calendar className="w-4 h-4" />
                        {cert.date}
                      </div>
                      <h3 className="font-semibold text-white line-clamp-2">
                        {cert.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-dark-light border-primary/20">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{cert.title}</h4>
                      <p className="text-primary text-sm">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">{cert.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-sm">{cert.description}</p>
                  
                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">Skills Learned:</h5>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-primary/10">
                    <span className="text-xs text-white/60">ID: {cert.credentialId}</span>
                    <ExternalLink className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
