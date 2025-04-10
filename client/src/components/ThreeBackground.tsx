import { useState, useEffect } from "react";
import { useTheme } from "@/lib/theme-provider";

export function ThreeBackground() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    setMounted(true);
    
    // Load Three.js only after component mounts (client-side)
    if (typeof window !== 'undefined') {
      import('@react-three/fiber').then(({ Canvas }) => {
        import('@react-three/drei').then(() => {
          setMounted(true);
        });
      });
    }
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  // Create a simpler background for now
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
