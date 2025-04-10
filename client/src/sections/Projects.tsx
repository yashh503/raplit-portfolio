import { useRef, useEffect } from "react";
import { useInView } from "@/lib/hooks";
import { projects } from "@/data/projects";
import gsap from "gsap";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    // Reset refs array with fresh nulls
    projectRefs.current = Array(projects.length).fill(null);
  }, []);
  
  useEffect(() => {
    if (isInView) {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      timeline
        .fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.3"
        );
      
      // Animate each project card with stagger
      projectRefs.current.forEach((ref, index) => {
        if (ref) {
          timeline.fromTo(
            ref,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.5,
              delay: index * 0.1 // Stagger the animations
            },
            "-=0.3"
          );
        }
      });
    }
  }, [isInView]);

  return (
    <section id="projects" ref={sectionRef} className="scroll-section relative py-20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h2 
          ref={headerRef}
          className="text-3xl md:text-4xl font-bold mb-4 text-center font-montserrat text-foreground"
        >
          My <span className="text-primary">Projects</span>
        </h2>
        <p 
          ref={descriptionRef}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-12"
        >
          Here are some of the projects I've worked on. Each demonstrates my skills in different areas of modern web development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => projectRefs.current[index] = el}
              className="project-card bg-card rounded-xl overflow-hidden shadow-lg"
            >
              <div className={`h-48 bg-gradient-to-r from-${project.gradient.from} to-${project.gradient.to} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <i className={`fas fa-${project.icon} text-white text-5xl`}></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-card-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
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
                    else if (tech.includes("Fire")) colorClass = "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
                    else colorClass = "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200";
                    
                    return (
                      <span key={techIndex} className={`px-2 py-1 ${colorClass} rounded text-xs`}>
                        {tech}
                      </span>
                    );
                  })}
                </div>
                <a href="#" className="text-primary hover:text-primary-dark text-sm font-medium flex items-center">
                  View Details <i className="fas fa-arrow-right ml-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
