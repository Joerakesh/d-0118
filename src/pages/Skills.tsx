
import { useState, useEffect } from "react";
import { Code, Layers, Server, Database, Palette, Globe, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  description?: string;
  image_url?: string;
}

interface ContentSection {
  id: string;
  section_name: string;
  content: string;
}

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [skillsDescription, setSkillsDescription] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const categoryIcons = {
    frontend: Layers,
    backend: Server,
    database: Database,
    design: Palette,
    tools: Globe,
  };

  const categoryColors = {
    frontend: "from-blue-500/20 to-blue-600/10 border-blue-400/30",
    backend: "from-green-500/20 to-green-600/10 border-green-400/30",
    database: "from-purple-500/20 to-purple-600/10 border-purple-400/30",
    design: "from-pink-500/20 to-pink-600/10 border-pink-400/30",
    tools: "from-orange-500/20 to-orange-600/10 border-orange-400/30",
  };

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const { data: skillsData, error: skillsError } = await supabase
        .from("skills")
        .select("*")
        .order("category", { ascending: true })
        .order("proficiency", { ascending: false });

      if (skillsError) throw skillsError;

      const { data: contentData, error: contentError } = await supabase
        .from("content_sections")
        .select("*")
        .eq("section_name", "skills_description")
        .single();

      if (contentError && contentError.code !== 'PGRST116') {
        console.error("Error fetching content:", contentError);
      }

      setSkills(skillsData || []);
      setSkillsDescription(contentData?.content || "");
    } catch (error) {
      console.error("Error fetching skills data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTechImageUrl = (techName: string) => {
    const tech = techName.toLowerCase().replace(/\s+/g, '');
    const iconMappings: { [key: string]: string } = {
      'react': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'javascript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
      'typescript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      'nodejs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      'python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      'html': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
      'css': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
      'mongodb': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
      'postgresql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      'mysql': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
      'git': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
      'github': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
      'docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      'figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
      'tailwind': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'tailwindcss': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
      'vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
      'angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
      'express': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      'nestjs': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg',
      'supabase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
      'firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
      'aws': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
      'vercel': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
      'netlify': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg',
    };
    
    return iconMappings[tech] || `https://via.placeholder.com/64/6366f1/ffffff?text=${techName.charAt(0).toUpperCase()}`;
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return "Expert";
    if (proficiency >= 75) return "Advanced";
    if (proficiency >= 60) return "Intermediate";
    if (proficiency >= 40) return "Beginner";
    return "Learning";
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "text-green-400 bg-green-400/20";
    if (proficiency >= 75) return "text-blue-400 bg-blue-400/20";
    if (proficiency >= 60) return "text-yellow-400 bg-yellow-400/20";
    if (proficiency >= 40) return "text-orange-400 bg-orange-400/20";
    return "text-red-400 bg-red-400/20";
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as { [key: string]: Skill[] });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="container mx-auto">
            <div className="text-center text-white/70">Loading skills...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="pt-20 px-4">
        <div className="container mx-auto">
          {!selectedSkill ? (
            <>
              <div className="flex items-center gap-2 mb-12">
                <Code className="w-5 h-5 text-primary" />
                <h1 className="text-4xl font-bold text-white">Skills & Technologies</h1>
              </div>

              {skillsDescription && (
                <div className="mb-12 max-w-4xl mx-auto">
                  <p className="text-white/80 text-lg leading-relaxed text-center">
                    {skillsDescription}
                  </p>
                </div>
              )}

              <div className="space-y-12">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons] || Code;
                  const colorClasses = categoryColors[category as keyof typeof categoryColors] || categoryColors.tools;

                  return (
                    <div key={category} className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-white capitalize">
                          {category}
                        </h2>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {categorySkills.map((skill) => (
                          <div
                            key={skill.id}
                            onClick={() => setSelectedSkill(skill)}
                            className={`p-4 rounded-xl border backdrop-blur-md bg-gradient-to-br ${colorClasses} transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 group cursor-pointer`}
                          >
                            <div className="text-center space-y-3">
                              <div className="w-16 h-16 mx-auto rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                                <img
                                  src={skill.image_url || getTechImageUrl(skill.name)}
                                  alt={skill.name}
                                  className="w-10 h-10 object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = `https://via.placeholder.com/40/6366f1/ffffff?text=${skill.name.charAt(0).toUpperCase()}`;
                                  }}
                                />
                              </div>
                              <div>
                                <h3 className="text-white font-semibold text-sm">
                                  {skill.name}
                                </h3>
                                <div className="mt-2">
                                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getProficiencyColor(skill.proficiency)}`}>
                                    {getProficiencyLabel(skill.proficiency)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setSelectedSkill(null)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Skills
              </button>

              <div className="bg-dark-light rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-20 h-20 rounded-xl bg-white/10 flex items-center justify-center">
                    <img
                      src={selectedSkill.image_url || getTechImageUrl(selectedSkill.name)}
                      alt={selectedSkill.name}
                      className="w-12 h-12 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/48/6366f1/ffffff?text=${selectedSkill.name.charAt(0).toUpperCase()}`;
                      }}
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{selectedSkill.name}</h1>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getProficiencyColor(selectedSkill.proficiency)}`}>
                      {getProficiencyLabel(selectedSkill.proficiency)}
                    </span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">About this skill</h2>
                    <p className="text-white/80 leading-relaxed">
                      {selectedSkill.description || `I have experience working with ${selectedSkill.name} and have developed projects using this technology. It's part of my ${selectedSkill.category} development skills.`}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">Experience Level</h2>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 bg-white/10 rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${selectedSkill.proficiency}%` }}
                        />
                      </div>
                      <span className="text-white/60 text-sm">{selectedSkill.proficiency}%</span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">Category</h2>
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium capitalize">
                      {selectedSkill.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Skills;
