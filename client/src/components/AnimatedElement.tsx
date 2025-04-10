import { useRef, useEffect, ReactNode } from "react";

interface AnimatedElementProps {
  children: ReactNode;
  animation?: "fade-in" | "slide-left" | "slide-right" | "scale-in";
  delay?: "delay-100" | "delay-200" | "delay-300" | "delay-400" | "delay-500";
  className?: string;
  threshold?: number;
}

export function AnimatedElement({
  children,
  animation = "fade-in",
  delay,
  className = "",
  threshold = 0.1,
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold }
    );
    
    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);
  
  const classes = [animation, delay, className].filter(Boolean).join(" ");
  
  return (
    <div ref={elementRef} className={classes}>
      {children}
    </div>
  );
}

// For animating multiple elements with staggered delays
export function AnimatedGroup({
  children,
  animation = "fade-in",
  className = "",
  staggerDelay = 0.1,
  threshold = 0.1,
}: {
  children: ReactNode[];
  animation?: "fade-in" | "slide-left" | "slide-right" | "scale-in";
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}) {
  return (
    <>
      {Array.isArray(children) &&
        children.map((child, index) => {
          const delay = `delay-${Math.min(Math.floor((index + 1) * staggerDelay * 1000), 500)}` as
            | "delay-100"
            | "delay-200"
            | "delay-300"
            | "delay-400"
            | "delay-500";
            
          return (
            <AnimatedElement
              key={index}
              animation={animation}
              delay={delay}
              className={className}
              threshold={threshold}
            >
              {child}
            </AnimatedElement>
          );
        })}
    </>
  );
}