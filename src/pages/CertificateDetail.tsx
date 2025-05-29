
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Award, Calendar, CheckCircle, ExternalLink, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
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

  const handleDownload = () => {
    // Create a simple certificate download
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Fill background
    ctx.fillStyle = '#1A1F2C';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add certificate content
    ctx.fillStyle = '#9b87f5';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 150);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = '24px Arial';
    ctx.fillText(certificate.title, canvas.width / 2, 250);
    
    ctx.font = '18px Arial';
    ctx.fillText(`Issued by: ${certificate.issuer}`, canvas.width / 2, 300);
    ctx.fillText(`Date: ${certificate.completionDate}`, canvas.width / 2, 350);
    ctx.fillText(`Credential ID: ${certificate.credentialId}`, canvas.width / 2, 400);
    
    // Download the canvas as image
    const link = document.createElement('a');
    link.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Certificate Downloaded",
      description: "Your certificate has been downloaded successfully.",
    });
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareText = `Check out my ${certificate.title} certificate from ${certificate.issuer}!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: certificate.title,
          text: shareText,
          url: shareUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Certificate link has been shared.",
        });
      } catch (error) {
        // If sharing fails, fall back to copying to clipboard
        handleCopyToClipboard(shareUrl);
      }
    } else {
      // Fallback to copying to clipboard
      handleCopyToClipboard(shareUrl);
    }
  };

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Link Copied",
        description: "Certificate link has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually from the address bar.",
        variant: "destructive",
      });
    }
  };

  if (!certificate) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-white mb-4">Certificate Not Found</h1>
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
        <div className="container mx-auto px-4 py-4 md:py-6">
          <button 
            onClick={handleBackClick}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </button>
          <div className="flex items-start md:items-center gap-3">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-primary flex-shrink-0 mt-1 md:mt-0" />
            <div>
              <h1 className="text-xl md:text-3xl font-bold text-white leading-tight">{certificate.title}</h1>
              <p className="text-primary text-sm md:text-base">{certificate.issuer}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Certificate Image */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-dark-light border-primary/20 overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-48 md:h-80 object-cover"
                />
              </CardContent>
            </Card>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleDownload}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline" 
                className="flex-1 sm:flex-none border-primary/20 text-primary hover:bg-primary/10"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white flex items-center gap-2 text-lg md:text-xl">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  Certificate Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Status</p>
                    <p className="text-white font-medium text-sm md:text-base">{certificate.status}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Completion Date</p>
                    <p className="text-white font-medium text-sm md:text-base">{certificate.completionDate}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Valid Until</p>
                    <p className="text-white font-medium text-sm md:text-base">{certificate.validUntil}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Course Hours</p>
                    <p className="text-white font-medium text-sm md:text-base">{certificate.courseHours}</p>
                  </div>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Credential ID</p>
                  <p className="text-white font-medium text-sm md:text-base break-all">{certificate.credentialId}</p>
                </div>
                <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary/10">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Verify Certificate
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">{certificate.description}</p>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">Skills Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-primary/20 text-primary px-2 md:px-3 py-1 rounded-full text-xs md:text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-dark-light border-primary/20">
              <CardHeader className="pb-3 md:pb-6">
                <CardTitle className="text-white text-lg md:text-xl">Personal Note</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 italic text-sm md:text-base leading-relaxed">"{certificate.personalNote}"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
