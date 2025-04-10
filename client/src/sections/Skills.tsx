import { useRef, useEffect } from "react";
import { useInView } from "@/lib/hooks";
import { skillCategories } from "@/data/skills";
import gsap from "gsap";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const isInView = useInView(sectionRef, { threshold: 0.1 });
  
  useEffect(() => {
    // Reset refs array with fresh nulls
    categoryRefs.current = Array(skillCategories.length).fill(null);
  }, []);
  
  useEffect(() => {
    if (isInView) {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      
      timeline.fromTo(
        headerRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );
      
      // Animate each skill category with stagger
      categoryRefs.current.forEach((ref, index) => {
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
    <section id="skills" ref={sectionRef} className="scroll-section relative py-20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <h2 
          ref={headerRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-foreground"
        >
          My <span className="text-primary">Skills</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              ref={el => categoryRefs.current[index] = el}
              className="bg-card rounded-3xl p-8 shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className={`bg-${category.iconClass.split("-")[1]}-100 dark:bg-${category.iconClass.split("-")[1]}-900 p-3 rounded-full mr-4`}>
                  <i className={`fas fa-${category.icon} ${category.iconClass} text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">{category.title}</h3>
              </div>
              
              <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="skill-icon flex flex-col items-center">
                    <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-2">
                      {skill.type === "svg" ? (
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d={skill.svgPath} fill="currentColor" className={skill.color} />
                        </svg>
                      ) : (
                        <i className={`${skill.type} fa-${skill.icon} text-3xl ${skill.color}`}></i>
                      )}
                    </div>
                    <span className="text-sm text-center text-card-foreground">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
