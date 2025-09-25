'use client';

import { useEffect, useState } from 'react';
import Tilt from 'react-tilt';

// Define TiltOptions type since it's not exported from react-tilt
type TiltOptions = {
  reverse?: boolean;
  max?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  transition?: boolean;
  axis?: 'x' | 'y' | null;
  reset?: boolean;
  easing?: string;
  trackOnWindow?: boolean;
  gyroscope?: boolean;
};

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  options?: Partial<TiltOptions>;
};

const defaultOptions: TiltOptions = {
  reverse: false,
  max: 15,
  perspective: 1000,
  scale: 1.05,
  speed: 300,
  transition: true,
  axis: null,
  reset: true,
  easing: 'cubic-bezier(.03,.98,.52,.99)',
  trackOnWindow: false,
  gyroscope: false,
};

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  options = {},
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  const tiltOptions = { ...defaultOptions, ...options };

  return (
    <div className={`tilt-container ${className}`}>
      <Tilt options={tiltOptions}>
        <div className="tilt-content">
          {children}
        </div>
      </Tilt>
    </div>
  );
};

export default TiltCard;
