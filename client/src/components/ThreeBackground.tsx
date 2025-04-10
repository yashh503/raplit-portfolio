import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-provider";
import { motion } from "framer-motion";

// Starry background component using CSS animation
export function ThreeBackground() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
  
  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = (clientY / window.innerHeight) * 2 - 1;
    setMousePosition({ x, y });
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
  
  // Generate floating objects
  const generateFloatingObjects = (count: number) => {
    const objects = [];
    const shapes = ["circle", "square", "triangle"];
    const colors = ["#3b82f6", "#8b5cf6", "#10b981", "#ef4444", "#f59e0b"];
    
    for (let i = 0; i < count; i++) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 60 + 20;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.12 + 0.03;
      const parallaxFactor = Math.random() * 0.05 + 0.02;
      
      let shapeElement;
      
      // Create different shapes
      if (shape === "circle") {
        shapeElement = (
          <div
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              opacity,
              transform: `translate(${mousePosition.x * parallaxFactor * 100}px, ${mousePosition.y * parallaxFactor * 100}px)`,
              transition: "transform 0.2s ease-out",
              animation: `float ${duration}s infinite ease-in-out`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      } else if (shape === "square") {
        shapeElement = (
          <div
            key={i}
            className="absolute rounded-md pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              opacity,
              transform: `translate(${mousePosition.x * parallaxFactor * 100}px, ${mousePosition.y * parallaxFactor * 100}px) rotate(${Math.random() * 360}deg)`,
              transition: "transform 0.2s ease-out",
              animation: `floatRotate ${duration}s infinite ease-in-out`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      } else {
        // Triangle using clip-path
        shapeElement = (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              opacity,
              clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              transform: `translate(${mousePosition.x * parallaxFactor * 100}px, ${mousePosition.y * parallaxFactor * 100}px) rotate(${Math.random() * 360}deg)`,
              transition: "transform 0.2s ease-out",
              animation: `floatRotate ${duration}s infinite ease-in-out`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      }
      
      objects.push(shapeElement);
    }
    
    return objects;
  };

  // Mouse follower
  const MouseFollower = () => {
    return (
      <motion.div
        className="fixed w-8 h-8 rounded-full pointer-events-none z-10"
        animate={{
          x: mousePosition.x * 10 + window.innerWidth / 2,
          y: mousePosition.y * 10 + window.innerHeight / 2,
          opacity: 0.7,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 100, damping: 20 },
          y: { type: "spring", stiffness: 100, damping: 20 },
          scale: { duration: 1.5, repeat: Infinity },
        }}
        style={{
          background: `radial-gradient(circle, ${theme === "dark" ? "#3b82f6" : "#3b82f6"} 0%, transparent 70%)`,
          boxShadow: `0 0 20px 10px ${theme === "dark" ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.3)"}`,
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
      {/* Layer with stars */}
      <div className="stars-container absolute inset-0">
        {generateStars(150)}
      </div>
      
      {/* Layer with floating shapes */}
      <div className="shapes-container absolute inset-0">
        {generateFloatingObjects(20)}
      </div>
      
      {/* Mouse follower effect */}
      <MouseFollower />
      
      {/* CSS animations added to index.css instead */}
    </div>
  );
}
