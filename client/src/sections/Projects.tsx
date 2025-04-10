import { useRef, useEffect } from "react";
import { projects } from "@/data/projects";
import { AnimatedElement } from "@/components/AnimatedElement";
import { TiltCard } from "@/components/TiltCard";
import { useScrollAnimation } from "@/lib/hooks";
import { motion, useAnimation } from "framer-motion";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const controls = useAnimation();
  
  // Initialize project refs array
  if (!projectRefs.current.length) {
    projectRefs.current = Array(projects.length).fill(null);
  }
  
  // Set up scroll animations for title and description
  useScrollAnimation(headerRef, 'fadeIn', { threshold: 0.2 });
  useScrollAnimation(descriptionRef, 'fadeIn', { threshold: 0.2, delay: 0.2 });
  
  // Setup intersection observer to trigger animations
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
  
  // Animation variants for cards
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
      y: 50, 
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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              custom={index}
              className="h-full"
            >
              <TiltCard 
                glareColor={project.gradient.from}
                perspective={1000}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.02}
                className="rounded-xl h-full"
              >
                <div
                  ref={el => projectRefs.current[index] = el}
                  className="project-card bg-card rounded-xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300"
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
                    
                    {/* Decorative elements with enhanced 3D effect */}
                    <motion.div 
                      className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white opacity-10"
                      whileHover={{ scale: 1.8, rotate: 15 }}
                      transition={{ duration: 0.4 }}
                    />
                    <motion.div 
                      className="absolute top-8 -left-8 w-16 h-16 rounded-full bg-white opacity-10"
                      whileHover={{ scale: 1.8, rotate: -15 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Light effect overlay - gives a subtle spotlight effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle at center, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                      }}
                    />
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
                          <motion.span 
                            key={techIndex}
                            className={`px-2 py-1 ${colorClass} rounded text-xs`}
                            whileHover={{ 
                              scale: 1.1, 
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)" 
                            }}
                          >
                            {tech}
                          </motion.span>
                        );
                      })}
                    </div>
                    <motion.a 
                      href="#" 
                      className="text-primary hover:text-primary-dark text-sm font-medium flex items-center group transition-all duration-300"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details 
                      <motion.i 
                        className="fas fa-arrow-right ml-1"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "mirror", 
                          duration: 1.2 
                        }}
                      />
                    </motion.a>
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
