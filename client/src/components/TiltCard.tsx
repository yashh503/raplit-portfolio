import { ReactNode, useState } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  scale?: number;
  perspective?: number;
  glareEnable?: boolean;
  transitionSpeed?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
  gyroscope?: boolean;
}

export function TiltCard({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.4)",
  scale = 1.02,
  perspective = 1000,
  glareEnable = true,
  transitionSpeed = 400,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10,
  gyroscope = false
}: TiltCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const defaultOptions = {
    reverse: false,
    max: 25,
    perspective: perspective,
    scale: scale,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    glare: glareEnable,
    "max-glare": 0.4,
    "glare-prerender": false,
    "full-page-listening": false,
    "mouse-event-element": null,
    gyroscope: gyroscope,
    gyroscopeMinAngleX: -45,
    gyroscopeMaxAngleX: 45,
    gyroscopeMinAngleY: -45,
    gyroscopeMaxAngleY: 45,
    "max-tilt-x": tiltMaxAngleX,
    "max-tilt-y": tiltMaxAngleY
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.01, 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 17
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative ${className}`}
      style={{ 
        transformStyle: "preserve-3d",
      }}
    >
      <Tilt options={defaultOptions} className="h-full w-full">
        {children}
        
        {/* Custom glow effect on hover */}
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${glareColor}, transparent 70%)`,
              opacity: 0.6,
              mixBlendMode: "overlay"
            }}
          />
        )}
      </Tilt>
    </motion.div>
  );
}