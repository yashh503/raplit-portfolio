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
  
  // Generate stars
  const generateStars = (count: number) => {
    const stars = [];
    
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      const delay = Math.random() * 10;
      const duration = Math.random() * 100 + 50;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.7 + 0.3;
      
      stars.push(
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}%`,
            top: `${y}%`,
            backgroundColor: theme === "dark" ? "#ffffff" : "#3b82f6",
            opacity,
            boxShadow: theme === "dark" 
              ? `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, ${opacity * 0.5})`
              : `0 0 ${size * 2}px ${size / 2}px rgba(59, 130, 246, ${opacity * 0.5})`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`
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
      
      // Reduced parallax factor for less extreme movement
      const parallaxFactor = Math.random() * 0.025 + 0.005;
      
      // Use motion.div for smoother animations
      const commonProps = {
        initial: { opacity: 0 },
        animate: { 
          opacity,
          x: mousePosition.x * parallaxFactor * 50, // reduced movement
          y: mousePosition.y * parallaxFactor * 50  // reduced movement
        },
        transition: {
          opacity: { duration: 1 },
          x: { type: "spring", stiffness: 10, damping: 20 },
          y: { type: "spring", stiffness: 10, damping: 20 }
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

  // Mouse follower with much smoother movement
  const MouseFollower = () => {
    return (
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-10"
        animate={{
          // Calculate position more accurately based on our adjusted mouse coordinates
          // The +0.5 helps center it since our mousePosition is now -0.25 to 0.25 range
          left: `calc(${(mousePosition.x + 0.5) * 100}%)`,
          top: `calc(${(mousePosition.y + 0.5) * 100}%)`,
          opacity: 0.7,
          scale: [1, 1.1, 1],
        }}
        transition={{
          left: { type: "spring", stiffness: 50, damping: 30 }, // More dampening for smoother feel
          top: { type: "spring", stiffness: 50, damping: 30 },
          scale: { duration: 2, repeat: Infinity }, // Slower pulse
        }}
        style={{
          translateX: "-50%", // Center the element on cursor
          translateY: "-50%",
          background: `radial-gradient(circle, ${theme === "dark" ? "#3b82f6" : "#3b82f6"} 0%, transparent 70%)`,
          boxShadow: `0 0 20px 10px ${theme === "dark" ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.2)"}`,
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
      {/* Layer with stars - fewer for better performance */}
      <div className="stars-container absolute inset-0">
        {generateStars(80)}
      </div>
      
      {/* Layer with floating shapes - fewer for better performance */}
      <div className="shapes-container absolute inset-0">
        {generateFloatingObjects(12)}
      </div>
      
      {/* Mouse follower effect */}
      <MouseFollower />
      
      {/* CSS animations added to index.css instead */}
    </div>
  );
}
