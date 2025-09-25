'use client';

import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  perspective?: number;
  maxTilt?: number;
  scaleOnHover?: boolean;
}

const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  perspective = 1000,
  maxTilt = 10,
  scaleOnHover = true,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 400, damping: 30 });
  const rotateX = useSpring(0, { stiffness: 400, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 400, damping: 30 });
  const scale = useSpring(1, { stiffness: 400, damping: 30 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMounted) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rotateYValue = ((mouseX - centerX) / centerX) * maxTilt;
    const rotateXValue = ((centerY - mouseY) / centerY) * maxTilt;
    
    x.set(mouseX - centerX);
    y.set(mouseY - centerY);
    
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    
    if (scaleOnHover) {
      scale.set(1.03);
    }
  };

  const handleMouseLeave = () => {
    if (!isMounted) return;
    
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleTapStart = () => {
    setIsTapped(true);
    if (scaleOnHover) {
      scale.set(0.98);
    }
  };

  const handleTapEnd = () => {
    setIsTapped(false);
    if (scaleOnHover) {
      scale.set(1.03);
    } else {
      scale.set(1);
    }
  };

  const transform = useMotionTemplate`
    perspective(${perspective}px)
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(${scale})
  `;

  const gradientPosition = useMotionTemplate`${x}px ${y}px`;
  const gradientOpacity = useSpring(isHovered ? 0.15 : 0, { stiffness: 300, damping: 30 });

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transform: transform,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTapStart={handleTapStart}
      onTap={handleTapEnd}
      onTapCancel={handleTapEnd}
    >
      {/* Gradient overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(
            600px circle at ${gradientPosition},
            rgba(99, 102, 241, ${gradientOpacity}) 0%,
            transparent 80%
          )`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
      
      {/* Reflective edge */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
        }}
      />
    </motion.div>
  );
};

export default ThreeDCard;
