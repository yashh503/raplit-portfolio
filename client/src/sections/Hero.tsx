import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    timeline
      .fromTo(
        titleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        subtitleRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.6"
      )
      .fromTo(
        descriptionRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.6"
      )
      .fromTo(
        buttonRef.current, 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        "-=0.6"
      )
      .fromTo(
        scrollIndicatorRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.8, repeat: -1, yoyo: true },
        "-=0.4"
      );
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      window.scrollTo({
        top: projectsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="home" className="scroll-section flex items-center justify-center relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-montserrat bg-gradient-to-r from-primary to-secondary inline-block text-transparent bg-clip-text"
          >
            Yash Vyas
          </h1>
          <h2 
            ref={subtitleRef}
            className="text-xl md:text-3xl font-semibold mb-6 text-foreground"
          >
            MERN Stack Developer
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl mb-10 text-foreground opacity-90"
          >
            I build scalable web and mobile solutions with a focus on performance and design.
          </p>
          <a 
            ref={buttonRef}
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollToProjects();
            }}
            className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 px-8 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
          >
            View My Work
          </a>
        </div>

        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <a 
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const aboutSection = document.getElementById("about");
              if (aboutSection) {
                window.scrollTo({
                  top: aboutSection.offsetTop - 80,
                  behavior: "smooth",
                });
              }
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <i className="fas fa-chevron-down text-2xl"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
