import { useEffect, useState, useCallback, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Initialize GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Hook to determine if element is in view with animation trigger
export function useInView(ref: React.RefObject<HTMLElement>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsInView(isIntersecting);
        
        // Add animation trigger once element comes into view
        if (isIntersecting && !hasAnimated.current && typeof window !== 'undefined') {
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1, ...options }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return isInView;
}

// Hook to handle scroll event
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  const onScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    // Add event listener
    window.addEventListener("scroll", onScroll);
    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return scrollY;
}

// Hook to determine if a component is mounted
export function useMounted() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  
  return mounted;
}

// Hook for scroll-triggered animations
export function useScrollAnimation(
  ref: React.RefObject<HTMLElement>,
  animation: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'rotate' = 'fadeIn',
  options?: {
    delay?: number;
    duration?: number;
    threshold?: number;
    fromDirection?: 'left' | 'right' | 'top' | 'bottom';
  }
) {
  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return;
    
    const element = ref.current;
    const delay = options?.delay || 0;
    const duration = options?.duration || 1;
    const threshold = options?.threshold || 0.2;
    const fromDirection = options?.fromDirection || 'bottom';
    
    // Configure animation based on type
    let fromVars = {};
    
    if (animation === 'fadeIn') {
      fromVars = { opacity: 0, y: 50 };
    } else if (animation === 'slideUp') {
      fromVars = { opacity: 0, y: 100 };
    } else if (animation === 'slideIn') {
      if (fromDirection === 'left') fromVars = { opacity: 0, x: -100 };
      if (fromDirection === 'right') fromVars = { opacity: 0, x: 100 };
      if (fromDirection === 'top') fromVars = { opacity: 0, y: -100 };
      if (fromDirection === 'bottom') fromVars = { opacity: 0, y: 100 };
    } else if (animation === 'scale') {
      fromVars = { opacity: 0, scale: 0.5 };
    } else if (animation === 'rotate') {
      fromVars = { opacity: 0, rotation: -15, scale: 0.8 };
    }
    
    // Set initial state
    gsap.set(element, fromVars);
    
    // Create scroll trigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: `top ${(1 - threshold) * 100}%`,
        toggleActions: 'play none none none',
      }
    });
    
    tl.to(element, {
      ...Object.fromEntries(
        Object.entries(fromVars).map(([key, value]) => 
          [key, key === 'opacity' ? 1 : 0]
        )
      ),
      duration,
      delay,
      ease: 'power2.out',
    });
    
    return () => {
      // Clean up animations
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [ref, animation, options]);
}
