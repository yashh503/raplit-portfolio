import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";

// Fallback component for when Three.js is loading or not available
function SimpleBgFallback({ theme }: { theme: "dark" | "light" }) {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ 
        backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa',
        backgroundImage: `radial-gradient(circle at 25px 25px, ${theme === 'dark' ? '#333' : '#ddd'} 2%, transparent 0%), 
                        radial-gradient(circle at 75px 75px, ${theme === 'dark' ? '#333' : '#ddd'} 2%, transparent 0%)`,
        backgroundSize: '100px 100px'
      }}
    />
  );
}

// Simpler animated background using CSS
function AnimatedDotsBg({ theme }: { theme: "dark" | "light" }) {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className="relative w-full h-full"
        style={{
          backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa'
        }}
      >
        {/* Generate dots for animation */}
        {Array.from({ length: 100 }).map((_, i) => {
          const size = Math.random() * 6 + 1;
          const opacity = Math.random() * 0.5 + 0.2;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.random() * 50 + 30;
          
          const animationStyle = {
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            backgroundColor: theme === 'dark' ? '#3b82f6' : '#3b82f6',
            opacity,
            boxShadow: `0 0 ${size * 2}px ${size}px rgba(59, 130, 246, ${opacity * 0.5})`,
          };
          
          // Apply animation class instead of inline styles for animation
          return (
            <div
              key={i}
              className={`absolute rounded-full float`}
              style={animationStyle}
            />
          );
        })}
      </div>
    </div>
  );
}

export function ThreeBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <SimpleBgFallback theme={theme} />;
  }
  
  return <AnimatedDotsBg theme={theme} />;
}
