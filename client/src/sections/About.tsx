import { useRef } from "react";
import { useScrollAnimation } from "@/lib/hooks";
import { AnimatedElement } from "@/components/AnimatedElement";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bioCardRef = useRef<HTMLDivElement>(null);
  const educationCardRef = useRef<HTMLDivElement>(null);
  const experienceCardRef = useRef<HTMLDivElement>(null);
  
  // Set up scroll animations
  useScrollAnimation(bioCardRef, 'slideIn', { 
    fromDirection: 'left', 
    threshold: 0.2 
  });
  
  useScrollAnimation(educationCardRef, 'slideIn', { 
    fromDirection: 'right', 
    threshold: 0.2,
    delay: 0.2
  });
  
  useScrollAnimation(experienceCardRef, 'slideIn', { 
    fromDirection: 'right', 
    threshold: 0.2,
    delay: 0.4
  });

  return (
    <section id="about" ref={sectionRef} className="scroll-section relative py-20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <AnimatedElement animation="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-foreground">
            About <span className="text-primary">Me</span>
          </h2>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div ref={bioCardRef} className="bg-card rounded-3xl p-6 md:p-8 shadow-lg">
            <AnimatedElement animation="fade-in" delay="delay-200">
              <h3 className="text-2xl font-semibold mb-4 text-card-foreground">Who I Am</h3>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-in" delay="delay-300">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I'm a passionate MERN Stack Developer with over a year of experience in building responsive web applications 
                and creating intuitive UI/UX designs. Currently working at Syndell Technology as a React.js Developer since July 2023,
                I've been focusing on developing scalable applications that deliver exceptional user experiences.
              </p>
            </AnimatedElement>
            
            <AnimatedElement animation="fade-in" delay="delay-400">
              <p className="text-muted-foreground leading-relaxed">
                I completed my B.Tech in Information Technology from Gandhinagar Institute of Technology with a CGPA of 7.85,
                where I developed a strong foundation in software development principles and practices.
              </p>
            </AnimatedElement>
          </div>
          
          <div className="flex flex-col space-y-6">
            <div ref={educationCardRef} className="bg-card rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Education</h3>
              <div className="flex items-start">
                <div className="bg-muted rounded-full p-3 mr-4">
                  <i className="fas fa-graduation-cap text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">B.Tech in Information Technology</h4>
                  <p className="text-muted-foreground">Gandhinagar Institute of Technology</p>
                  <p className="text-muted-foreground text-sm">CGPA: 7.85</p>
                </div>
              </div>
            </div>
            
            <div ref={experienceCardRef} className="bg-card rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">Experience</h3>
              <div className="flex items-start">
                <div className="bg-muted rounded-full p-3 mr-4">
                  <i className="fas fa-briefcase text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground">React.js Developer</h4>
                  <p className="text-muted-foreground">Syndell Technology</p>
                  <p className="text-muted-foreground text-sm">July 2023 - Present</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
