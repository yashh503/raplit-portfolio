import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-provider";
import { motion } from "framer-motion";

// Starry background component using CSS animation
export function ThreeBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse move for parallax effect with smooth transition
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { clientX, clientY } = e;
    // Reduce sensitivity by multiplying by smaller values (0.5 instead of 2)
    const x = (clientX / window.innerWidth - 0.5) * 0.5;
    const y = (clientY / window.innerHeight - 0.5) * 0.5;
    
    // Use smooth transition with requestAnimationFrame
    requestAnimationFrame(() => {
      setMousePosition(prev => ({
        x: prev.x + (x - prev.x) * 0.05, // Apply easing for smoother movement
        y: prev.y + (y - prev.y) * 0.05
      }));
    });
  };
  
  useEffect(() => {
    setMounted(true);
    
    // Add global mouse move listener
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  
  // Generate much more subtle stars with softer appearance
  const generateStars = (count: number) => {
    const stars = [];
    
    for (let i = 0; i < count; i++) {
      // Much smaller stars
      const size = Math.random() * 1.5 + 0.5;
      
      // Longer animation intervals for less distracting twinkling
      const delay = Math.random() * 15;
      const duration = Math.random() * 150 + 100; // Much slower twinkle
      
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Much lower opacity for subtle effect
      const opacity = Math.random() * 0.2 + 0.1;
      
      stars.push(
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            backgroundColor: theme === "dark" ? "#f8f9fa" : "#3b82f6",
            opacity,
            // Reduced glow effect with much smaller, softer shadow
            boxShadow: theme === "dark" 
              ? `0 0 ${size}px ${size / 3}px rgba(255, 255, 255, ${opacity * 0.2})`
              : `0 0 ${size}px ${size / 3}px rgba(59, 130, 246, ${opacity * 0.2})`,
            animation: `subtleTwinkle ${duration}s infinite ease-in-out`,
            animationDelay: `${delay}s`
          }}
        />
      );
    }
    
    return stars;
  };
  
  // Generate floating objects with improved smoothness
  const generateFloatingObjects = (count: number) => {
    const objects = [];
    const shapes = ["circle", "square", "triangle"];
    const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b"];
    
    for (let i = 0; i < count; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Use smaller sizes for better performance
      const size = Math.random() * 40 + 10;
      
      // Better distribute elements across the screen
      const x = Math.random() * 90 + 5; // keep away from extreme edges
      const y = Math.random() * 90 + 5; // keep away from extreme edges
      
      // Slower animations for gentler movement
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 5;
      
      // Lower opacity for subtler effect
      const opacity = Math.random() * 0.08 + 0.02;
      
      // Extremely reduced parallax factor for minimal, subtle movement
      const parallaxFactor = Math.random() * 0.01 + 0.002;
      
      // Use motion.div for ultra-smooth animations with minimal movement
      const commonProps = {
        initial: { opacity: 0 },
        animate: { 
          opacity,
          x: mousePosition.x * parallaxFactor * 30, // highly reduced movement
          y: mousePosition.y * parallaxFactor * 30  // highly reduced movement
        },
        transition: {
          opacity: { duration: 1.5 },
          // Much slower spring with high damping for professional, subtle motion
          x: { type: "spring", stiffness: 5, damping: 25 },
          y: { type: "spring", stiffness: 5, damping: 25 }
        }
      };
      
      let shapeElement;
      
      // Create different shapes with more subtle animation
      if (shape === "circle") {
        shapeElement = (
          <motion.div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              animationName: "float",
              animationDuration: `${duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${delay}s`,
            }}
            {...commonProps}
          />
        );
      } else if (shape === "square") {
        shapeElement = (
          <motion.div
            key={i}
            className="absolute rounded-md pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              animationName: "floatRotate",
              animationDuration: `${duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${delay}s`,
              rotate: Math.random() * 45 // less rotation
            }}
            {...commonProps}
          />
        );
      } else {
        // Triangle using clip-path
        shapeElement = (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              animationName: "floatRotate",
              animationDuration: `${duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${delay}s`,
              rotate: Math.random() * 30 // less rotation
            }}
            {...commonProps}
          />
        );
      }
      
      objects.push(shapeElement);
    }
    
    return objects;
  };

  // Ultra-subtle mouse follower with minimal visual impact
  const MouseFollower = () => {
    return (
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-10"
        animate={{
          // Calculate position more accurately based on our adjusted mouse coordinates
          // The +0.5 helps center it since our mousePosition is now -0.25 to 0.25 range
          left: `calc(${(mousePosition.x + 0.5) * 100}%)`,
          top: `calc(${(mousePosition.y + 0.5) * 100}%)`,
          opacity: 0.35, // Much lower opacity for subtlety
          scale: [1, 1.05, 1], // Almost imperceptible pulse
        }}
        transition={{
          left: { type: "spring", stiffness: 40, damping: 35 }, // Even more dampening for smoother feel
          top: { type: "spring", stiffness: 40, damping: 35 },
          scale: { duration: 3, repeat: Infinity }, // Very slow, gentle pulse
        }}
        style={{
          translateX: "-50%", // Center the element on cursor
          translateY: "-50%",
          background: `radial-gradient(circle, ${theme === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.3)"} 0%, transparent 80%)`,
          boxShadow: `0 0 15px 5px ${theme === "dark" ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.05)"}`,
        }}
      />
    );
  };
  
  const backgroundStyles = {
    backgroundColor: theme === "dark" ? "#0f172a" : "#f8fafc",
  };
  
  if (!mounted) {
    return (
      <div
        className="fixed top-0 left-0 w-full h-full z-0"
        style={backgroundStyles}
      />
    );
  }
  
  return (
    <div
      ref={backgroundRef}
      className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden"
      style={backgroundStyles}
      onMouseMove={handleMouseMove}
    >
      {/* Layer with stars - very minimal for a clean, subtle effect */}
      <div className="stars-container absolute inset-0">
        {generateStars(40)}
      </div>
      
      {/* Layer with floating shapes - minimal count for subtle professional effect */}
      <div className="shapes-container absolute inset-0">
        {generateFloatingObjects(8)}
      </div>
      
      {/* Mouse follower effect */}
      <MouseFollower />
      
      {/* CSS animations added to index.css instead */}
    </div>
  );
}
