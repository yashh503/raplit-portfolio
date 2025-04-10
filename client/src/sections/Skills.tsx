import { useRef } from "react";
import { skillCategories } from "@/data/skills";
import { AnimatedElement } from "@/components/AnimatedElement";
import { useScrollAnimation } from "@/lib/hooks";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize category refs array
  if (!categoryRefs.current.length) {
    categoryRefs.current = Array(skillCategories.length).fill(null);
  }
  
  // Set up scroll animation for title
  useScrollAnimation(headerRef, 'fadeIn', { threshold: 0.2 });

  return (
    <section id="skills" ref={sectionRef} className="scroll-section relative py-20">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <AnimatedElement animation="fade-in">
          <h2 
            ref={headerRef}
            className="text-3xl md:text-4xl font-bold mb-12 text-center font-montserrat text-foreground"
          >
            My <span className="text-primary">Skills</span>
          </h2>
        </AnimatedElement>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {skillCategories.map((category, index) => (
            <AnimatedElement 
              key={category.title} 
              animation={index % 2 === 0 ? "slide-left" : "slide-right"} 
              delay={`delay-${Math.min((index + 1) * 100, 500)}` as "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500"}
            >
              <div 
                ref={el => categoryRefs.current[index] = el}
                className="bg-card rounded-3xl p-8 shadow-lg transform transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center mb-6">
                  <div 
                    className={`bg-${category.iconClass.split("-")[1]}-100 dark:bg-${category.iconClass.split("-")[1]}-900 p-3 rounded-full mr-4 transform transition-all duration-300 hover:rotate-12 hover:scale-110`}
                  >
                    <i className={`fas fa-${category.icon} ${category.iconClass} text-xl`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground">{category.title}</h3>
                </div>
                
                <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <AnimatedElement 
                      key={skill.name} 
                      animation="scale-in" 
                      delay={`delay-${Math.min(((skillIndex % 6) + 1) * 100, 500)}` as "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500"}
                    >
                      <div className="skill-icon flex flex-col items-center group">
                        <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-2 transform transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                          {skill.type === "svg" ? (
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d={skill.svgPath} fill="currentColor" className={skill.color} />
                            </svg>
                          ) : (
                            <i className={`${skill.type} fa-${skill.icon} text-3xl ${skill.color}`}></i>
                          )}
                        </div>
                        <span className="text-sm text-center text-card-foreground font-medium transition-colors duration-300 group-hover:text-primary">{skill.name}</span>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
