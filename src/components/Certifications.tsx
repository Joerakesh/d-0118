
import { useState, useEffect } from "react";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { supabase } from "@/integrations/supabase/client";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  skills: string[];
  description: string;
  credential_id: string;
  status: string;
}

const Certifications = () => {
  const [certificationsData, setCertificationsData] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCertificationsData(data || []);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificateClick = () => {
    sessionStorage.setItem(
      "portfolioScrollPosition",
      window.scrollY.toString()
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <section id="certifications" className="py-20 px-4 bg-dark">
        <div className="container mx-auto">
          <div className="flex items-center gap-2 mb-12">
            <Award className="w-5 h-5 text-primary" />
            <h2 className="text-3xl font-bold text-white">Certifications</h2>
          </div>
          <div className="flex justify-center">
            <div className="text-white">Loading certifications...</div>
          </div>
        </div>
      </section>
    );
  }

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
                      className="w-full h-48 group-hover:scale-105 transition-transform duration-500"
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
              <HoverCardContent className="w-80 bg-dark-light border-primary/20 text-white">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{cert.title}</h4>
                      <p className="text-primary text-sm">{cert.issuer}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400">
                        {cert.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/70 text-sm">{cert.description}</p>

                  <div>
                    <h5 className="text-sm font-medium text-white mb-2">
                      Skills Learned:
                    </h5>
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
                    <span className="text-xs text-white/60">
                      ID: {cert.credential_id}
                    </span>
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
