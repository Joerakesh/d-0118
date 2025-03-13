import { User } from "lucide-react";

const AboutMe = () => {
  return (
    <section id="about" className="py-20 px-4 bg-dark">
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <User className="w-5 h-5 text-primary" />
          <h2 className="text-3xl font-bold text-white">About Me</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Hello! I'm Joe Rakesh A, a passionate full-stack developer with a
              love for creating elegant solutions to complex problems. With over
              1 years of experience in web development, I specialize in building
              modern, responsive web applications.
            </p>
            <p className="text-white/80 text-lg leading-relaxed">
              My approach combines technical expertise with a keen eye for
              design, ensuring that the applications I build are not only
              functional but also provide an excellent user experience. I'm
              constantly learning new technologies and methodologies to stay at
              the forefront of web development.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-dark-light rounded-lg border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-2">1+</h3>
              <p className="text-white/80">Years of Experience</p>
            </div>
            <div className="p-6 bg-dark-light rounded-lg border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-2">5+</h3>
              <p className="text-white/80">Projects Completed</p>
            </div>
            <div className="p-6 bg-dark-light rounded-lg border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-2">2+</h3>
              <p className="text-white/80">Happy Clients</p>
            </div>
            <div className="p-6 bg-dark-light rounded-lg border border-primary/10">
              <h3 className="text-xl font-bold text-primary mb-2">100%</h3>
              <p className="text-white/80">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
