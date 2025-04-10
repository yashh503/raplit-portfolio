import { useRef, useEffect } from "react";
import { skillCategories } from "@/data/skills";
import { AnimatedElement } from "@/components/AnimatedElement";
import { TiltCard } from "@/components/TiltCard";
import { useScrollAnimation } from "@/lib/hooks";
import { motion, useAnimation } from "framer-motion";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();
  
  // Initialize category refs array
  if (!categoryRefs.current.length) {
    categoryRefs.current = Array(skillCategories.length).fill(null);
  }
  
  // Set up scroll animation for title
  useScrollAnimation(headerRef, 'fadeIn', { threshold: 0.2 });
  
  // Setup intersection observer for framer-motion animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { 
      y: 30, 
      opacity: 0 
    },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  const skillIconVariants = {
    hidden: { 
      scale: 0.8, 
      opacity: 0 
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: {
        rotate: {
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2
        }
      }
    }
  };

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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              custom={index}
              className="h-full"
            >
              <TiltCard 
                glareColor="rgba(59, 130, 246, 0.3)"
                perspective={2000}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.01}
                className="h-full"
              >
                <div 
                  ref={el => categoryRefs.current[index] = el}
                  className="bg-card rounded-3xl p-8 shadow-lg h-full transform transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <motion.div 
                      className={`bg-${category.iconClass.split("-")[1]}-100 dark:bg-${category.iconClass.split("-")[1]}-900 p-3 rounded-full mr-4`}
                      whileHover={{ 
                        rotate: 12, 
                        scale: 1.1,
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" 
                      }}
                    >
                      <i className={`fas fa-${category.icon} ${category.iconClass} text-xl`}></i>
                    </motion.div>
                    <h3 className="text-xl font-semibold text-card-foreground">{category.title}</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        variants={skillIconVariants}
                        whileHover="hover"
                        custom={skillIndex}
                      >
                        <div className="skill-icon flex flex-col items-center group">
                          <motion.div 
                            className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-2"
                            whileHover={{ 
                              boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
                              y: -5
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10
                            }}
                          >
                            {skill.type === "svg" ? (
                              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d={skill.svgPath} fill="currentColor" className={skill.color} />
                              </svg>
                            ) : (
                              <i className={`${skill.type} fa-${skill.icon} text-3xl ${skill.color}`}></i>
                            )}
                          </motion.div>
                          <motion.span 
                            className="text-sm text-center text-card-foreground font-medium"
                            whileHover={{ color: "#3b82f6", scale: 1.05 }}
                          >
                            {skill.name}
                          </motion.span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
