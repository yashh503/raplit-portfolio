import { useEffect, useState } from "react";
import { AnimatedElement } from "@/components/AnimatedElement";
import gsap from "gsap";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Animate the floating objects
    if (mounted) {
      gsap.to(".float-1", {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
      
      gsap.to(".float-2", {
        y: -30,
        x: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5
      });
      
      gsap.to(".float-3", {
        y: -15,
        x: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1
      });
    }
  }, [mounted]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="scroll-section flex items-center justify-center relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 md:left-40 w-16 h-16 bg-primary opacity-20 rounded-full blur-xl float-1 hidden md:block"></div>
        <div className="absolute bottom-40 right-10 md:right-40 w-24 h-24 bg-secondary opacity-20 rounded-full blur-xl float-2 hidden md:block"></div>
        <div className="absolute top-40 right-20 w-10 h-10 bg-accent opacity-20 rounded-full blur-xl float-3 hidden md:block"></div>
        
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedElement animation="fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-montserrat bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text">
              Yash Vyas
            </h1>
          </AnimatedElement>
          
          <AnimatedElement animation="fade-in" delay="delay-200">
            <h2 className="text-xl md:text-3xl font-semibold mb-6 text-foreground">
              MERN Stack Developer
            </h2>
          </AnimatedElement>
          
          <AnimatedElement animation="fade-in" delay="delay-300">
            <p className="text-lg md:text-xl mb-10 text-foreground opacity-90">
              I build scalable web and mobile solutions with a focus on performance and design.
            </p>
          </AnimatedElement>
          
          <AnimatedElement animation="scale-in" delay="delay-400">
            <a 
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToProjects();
              }}
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 px-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 inline-block"
            >
              View My Work
            </a>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="fade-in" delay="delay-500">
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a 
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToAbout();
              }}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <i className="fas fa-chevron-down text-2xl"></i>
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
