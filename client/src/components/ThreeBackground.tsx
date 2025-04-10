import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";

// Fallback component for when Three.js is loading or not available
function SimpleBgFallback({ theme }: { theme: "dark" | "light" }) {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full z-0"
      style={{ 
        backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa',
        backgroundImage: 'radial-gradient(circle at 25px 25px, ' + (theme === 'dark' ? '#333' : '#ddd') + ' 2%, transparent 0%), ' +
                        'radial-gradient(circle at 75px 75px, ' + (theme === 'dark' ? '#333' : '#ddd') + ' 2%, transparent 0%)',
        backgroundSize: '100px 100px'
      }}
    />
  );
}

// Simpler animated background using CSS
function AnimatedDotsBg({ theme }: { theme: "dark" | "light" }) {
  const [dots, setDots] = useState(
    Array.from({ length: 100 }).map((_, i) => {
      const size = Math.random() * 6 + 1;
      const opacity = Math.random() * 0.5 + 0.2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = Math.random() * 50 + 30;
      
      return {
        size,
        opacity,
        left,
        top,
        duration,
      };
    })
  );

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX * 1, y: e.clientY * 1 });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setCursorPosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };
    const handleCLickMove = (e:any) => {
      setCursorPosition({ x: e.clientX * 1, y: e.clientY * 1 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('click', handleCLickMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('click', handleCLickMove);
      
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className="relative w-full h-full"
        style={{
          backgroundColor: theme === 'dark' ? '#121212' : '#f8f9fa'
        }}
      >
        {/* Generate dots for animation */}
        {dots.map((dot, i) => {
          const distanceX = cursorPosition.x - (window.innerWidth / 2);
          const distanceY = cursorPosition.y - (window.innerHeight / 2);
          const angle = Math.atan2(distanceY, distanceX);
          const radius = Math.sqrt(distanceX ** 2 + distanceY ** 2) / 10;

          const left = (dot.left + Math.cos(angle + i / 10) * radius) + '%';
          const top = (dot.top + Math.sin(angle + i / 10) * radius) + '%';

          const animationStyle = {
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            left,
            top,
            backgroundColor: theme === 'dark' ? '#3b82f6' : '#3b82f6',
            opacity: dot.opacity,
            boxShadow: `0 0 ${dot.size * 2}px ${dot.size}px rgba(59, 130, 246, ${dot.opacity * 0.5})`,
          };

          return (
            <div
              key={i}
              className="absolute rounded-full"
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
