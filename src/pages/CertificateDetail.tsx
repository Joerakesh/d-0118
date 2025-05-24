
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Award, Calendar, CheckCircle, ExternalLink, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const certificationsData = [
  {
    id: "microsoft-career-essentials",
    title: "Career Essentials in Software Development",
    issuer: "Microsoft & LinkedIn",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop",
    skills: ["Software Development", "Programming Fundamentals", "Problem Solving", "Code Review", "Testing"],
    description: "Comprehensive program covering essential software development skills and industry best practices.",
    credentialId: "MS-2024-001",
    status: "Completed",
    personalNote: "This certification significantly enhanced my understanding of software development lifecycle and best practices. The hands-on projects helped me apply theoretical knowledge to real-world scenarios.",
    completionDate: "March 15, 2024",
    validUntil: "March 15, 2027",
    courseHours: "40 hours",
    certUrl: "#"
  },
  {
    id: "web-development-bootcamp",
    title: "Full Stack Web Development",
    issuer: "Tech Academy",
    date: "December 2023",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
    skills: ["React", "Node.js", "Database Management", "API Development", "MongoDB", "Express.js"],
    description: "Intensive bootcamp covering modern web development technologies and frameworks.",
    credentialId: "TA-2023-456",
    status: "Completed",
    personalNote: "An intensive journey that transformed me from a beginner to a confident full-stack developer. The practical projects and mentorship were invaluable.",
    completionDate: "December 20, 2023",
    validUntil: "Lifetime",
    courseHours: "600 hours",
    certUrl: "#"
  },
  {
    id: "javascript-advanced",
    title: "Advanced JavaScript Programming",
    issuer: "Code Institute",
    date: "October 2023",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
    skills: ["JavaScript ES6+", "Async Programming", "Performance Optimization", "Design Patterns", "Testing"],
    description: "Deep dive into advanced JavaScript concepts and modern programming techniques.",
    credentialId: "CI-2023-789",
    status: "Completed",
    personalNote: "This course elevated my JavaScript skills to an advanced level. Learning about design patterns and performance optimization was particularly valuable.",
    completionDate: "October 5, 2023",
    validUntil: "Lifetime",
    courseHours: "80 hours",
    certUrl: "#"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing Fundamentals",
    issuer: "AWS Academy",
    date: "2024",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    skills: ["AWS Services", "Cloud Architecture", "DevOps", "EC2", "S3", "Lambda"],
    description: "Foundation course in cloud computing concepts and AWS services implementation.",
    credentialId: "AWS-2024-321",
    status: "In Progress",
    personalNote: "Currently exploring the vast world of cloud computing. The hands-on labs with AWS services are providing excellent practical experience.",
    completionDate: "Expected: June 2024",
    validUntil: "3 years from completion",
    courseHours: "120 hours",
    certUrl: "#"
  }
];

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const certificate = certificationsData.find(cert => cert.id === id);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackClick = () => {
    // Get stored scroll position
    const savedPosition = sessionStorage.getItem('portfolioScrollPosition');
    
    // Navigate back to home using React Router
    navigate('/');
    
    // After navigation, restore scroll position
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'smooth'
        });
        // Clean up stored position
        sessionStorage.removeItem('portfolioScrollPosition');
      }, 100);
    }
  };

  if (!certificate) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Certificate Not Found</h1>
          <button 
            onClick={handleBackClick}
            className="text-primary hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="bg-dark-light border-b border-primary/10">
        <div className="container mx-auto px-4 py-6">
          <button 
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-white">{certificate.title}</h1>
              <p className="text-primary">{certificate.issuer}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Certificate Image */}
          <div className="space-y-6">
            <Card className="bg-dark-light border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-80 object-cover"
                />
              </CardContent>
            </Card>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-6">
            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Certificate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Status</p>
                    <p className="text-white font-medium">{certificate.status}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Completion Date</p>
                    <p className="text-white font-medium">{certificate.completionDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Valid Until</p>
                    <p className="text-white font-medium">{certificate.validUntil}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Course Hours</p>
                    <p className="text-white font-medium">{certificate.courseHours}</p>
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Credential ID</p>
                  <p className="text-white font-medium">{certificate.credentialId}</p>
                </div>
                <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80">{certificate.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Skills Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader>
                <CardTitle className="text-white">Personal Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 italic">"{certificate.personalNote}"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
