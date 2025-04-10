import { useRef } from "react";
import { projects } from "@/data/projects";
import { AnimatedElement } from "@/components/AnimatedElement";
import { useScrollAnimation } from "@/lib/hooks";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize project refs array
  if (!projectRefs.current.length) {
    projectRefs.current = Array(projects.length).fill(null);
  }
  
  // Set up scroll animations for title and description
  useScrollAnimation(headerRef, 'fadeIn', { threshold: 0.2 });
  useScrollAnimation(descriptionRef, 'fadeIn', { threshold: 0.2, delay: 0.2 });

  return (
    <section id="projects" ref={sectionRef} className="scroll-section relative py-20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <AnimatedElement animation="fade-in">
          <h2 
            ref={headerRef}
            className="text-3xl md:text-4xl font-bold mb-4 text-center font-montserrat text-foreground"
          >
            My <span className="text-primary">Projects</span>
          </h2>
        </AnimatedElement>
        
        <AnimatedElement animation="fade-in" delay="delay-200">
          <p 
            ref={descriptionRef}
            className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
          >
            Here are some of the projects I've worked on. Each demonstrates my skills in different areas of modern web development.
          </p>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <AnimatedElement 
              key={project.id} 
              animation="scale-in" 
              delay={`delay-${Math.min(((index % 4) + 1) * 100, 500)}` as "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500"}
            >
              <div
                ref={el => projectRefs.current[index] = el}
                className="project-card bg-card rounded-xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300 hover:scale-105"
              >
                <div 
                  className="h-48 relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, ${project.gradient.from}, ${project.gradient.to})`
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${project.icon} text-white text-5xl transition-transform duration-500 group-hover:scale-125 transform group-hover:rotate-6`}></i>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white opacity-10 transform transition-all duration-500 group-hover:scale-150"></div>
                  <div className="absolute top-8 -left-8 w-16 h-16 rounded-full bg-white opacity-10 transform transition-all duration-500 group-hover:scale-150"></div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-card-foreground">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => {
                      // Dynamically set the color class based on the tech
                      let colorClass = "";
                      if (tech.includes("React")) colorClass = "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
                      else if (tech.includes("Node")) colorClass = "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
                      else if (tech.includes("Mongo")) colorClass = "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
                      else if (tech.includes("Express")) colorClass = "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200";
                      else if (tech.includes("Redux")) colorClass = "bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200";
                      else if (tech.includes("Material")) colorClass = "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200";
                      else if (tech.includes("Fire")) colorClass = "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200";
                      else colorClass = "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
                      
                      return (
                        <span 
                          key={techIndex} 
                          className={`px-2 py-1 ${colorClass} rounded text-xs transform transition-transform duration-300 hover:scale-110`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                  <a 
                    href="#" 
                    className="text-primary hover:text-primary-dark text-sm font-medium flex items-center group transition-all duration-300"
                  >
                    View Details 
                    <i className="fas fa-arrow-right ml-1 transform transition-transform duration-300 group-hover:translate-x-1"></i>
                  </a>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
