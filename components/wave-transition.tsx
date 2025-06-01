"use client"

import { motion, AnimatePresence, useAnimationFrame } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface WaveTransitionProps {
  isVisible: boolean;
  mode: 'fitness' | 'swimming';
  onAnimationComplete?: () => void;
}

// Theme configuration
const theme = {
  fitness: {
    bgGradient: 'from-gray-900 via-gray-800 to-gray-900',
    waveColors: ['#3b82f6', '#6366f1', '#8b5cf6'],
    textColor: 'text-white',
    subtextColor: 'text-gray-300',
    icon: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgPattern: 'bg-grid-white/5',
    particles: 'bg-blue-400/80'
  },
  swimming: {
    bgGradient: 'from-sky-50 via-blue-50 to-cyan-50',
    waveColors: ['#06b6d4', '#0ea5e9', '#3b82f6'],
    textColor: 'text-sky-900',
    subtextColor: 'text-sky-700',
    icon: (
      <svg className="w-16 h-16 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    bgPattern: 'bg-wave-pattern opacity-5',
    particles: 'bg-sky-400/60',
    borderColor: 'border-sky-200',
    buttonBg: 'bg-sky-600 hover:bg-sky-700',
    buttonText: 'text-white'
  }
};

// Dynamic wave component with water/sea theme
const WaveSVG = ({ 
  color, 
  speed, 
  height, 
  offset, 
  opacity = 1, 
  flip = false,
  isSwimming = false 
}: { 
  color: string; 
  speed: number; 
  height: number; 
  offset: number; 
  opacity?: number; 
  flip?: boolean;
  isSwimming?: boolean;
}) => {
  const [path, setPath] = useState("");
  const startTimeRef = useRef<number>(0);
  
  const generateWavePath = (time: number) => {
    const points = [];
    const width = window.innerWidth;
    const segments = 30; // Increased segments for smoother water effect
    const segmentWidth = width / segments;
    const amplitude = isSwimming ? 20 : 25; // Gentle waves for water effect
    const frequency = isSwimming ? 0.002 : 0.003;
    
    points.push(`M 0,${height}`);
    
    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth;
      // Create more natural water wave pattern
      const wave1 = Math.sin(x * frequency + time * speed * 0.4);
      const wave2 = Math.sin(x * (frequency * 1.3) + time * speed * 0.2) * 0.7;
      const wave3 = Math.sin(x * (frequency * 0.7) + time * speed * 0.1) * 0.4;
      const y = (wave1 + wave2 + wave3) * amplitude * (flip ? -0.6 : 0.8);
      points.push(`L ${x},${y + height + offset}`);
    }
    
    points.push(`L ${width},${height * 2} L 0,${height * 2} Z`);
    return points.join(" ");
  };

  useAnimationFrame((time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsedTime = (time - startTimeRef.current) / 1000;
    setPath(generateWavePath(elapsedTime));
  });

  return (
    <svg className="absolute left-0 w-full h-full" viewBox={`0 0 ${window.innerWidth} ${height * 2}`}>
      <path d={path} fill={color} fillOpacity={opacity} />
    </svg>
  );
};

// Water ripple effect with improved styling
const WaterRipple = ({ 
  x, y, size, color, delay, isSwimming = false 
}: { 
  x: number; 
  y: number; 
  size: number; 
  color: string; 
  delay: number;
  isSwimming?: boolean;
}) => {
  const rippleSize = isSwimming ? size * 0.8 : size;
  const duration = isSwimming ? 3 : 2.5;
  
  return (
    <div 
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${rippleSize}px`,
        height: `${rippleSize}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: color,
          backdropFilter: 'blur(1px)'
        }}
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ 
          opacity: [0.8, 0.5, 0],
          scale: [1, 3],
        }}
        transition={{
          duration,
          delay,
          ease: 'easeOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: isSwimming ? 2 : 1.5
        }}
      />
      <motion.div
        className="absolute inset-0 rounded-full border-2"
        style={{
          borderColor: color,
          filter: 'blur(1px)'
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0.6, 0.3, 0],
          scale: [1, 4],
        }}
        transition={{
          duration: duration * 1.2,
          delay: delay + 0.2,
          ease: 'easeOut',
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: isSwimming ? 2 : 1.5
        }}
      />
    </div>
  );
};

interface RippleEffect {
  id: string | number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export default function WaveTransition({ isVisible, mode, onAnimationComplete }: WaveTransitionProps) {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentTheme = theme[mode];
  const isSwimming = mode === 'swimming';
  
  // Create water surface effects
  useEffect(() => {
    if (!isVisible) return;
    
    const createWaterEffect = () => {
      if (containerRef.current) {
        const isMobile = window.innerWidth < 768;
        const maxRipples = isMobile ? 5 : 8;
        const newRipple = {
          id: Date.now(),
          x: 20 + Math.random() * 60, // Keep ripples more centered
          y: 30 + Math.random() * 40, // Focus on middle area
          size: isSwimming ? 10 + Math.random() * 20 : 8 + Math.random() * 15,
          delay: Math.random() * 0.5,
        };
        
        setRipples(prev => {
          // Keep only the most recent ripples
          const updated = [...prev, newRipple];
          return updated.slice(-maxRipples);
        });
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, isSwimming ? 3500 : 3000);
      }
    };
    
    // Initial ripples
    const initialRipples = Array.from({ length: isSwimming ? 3 : 2 }, (_, i) => ({
      id: `initial-${i}`,
      x: 30 + Math.random() * 40,
      y: 40 + Math.random() * 30,
      size: 15 + Math.random() * 20,
      delay: i * 0.3
    } as RippleEffect));
    
    setRipples(initialRipples);
    
    // Add new ripples at intervals
    const interval = setInterval(createWaterEffect, isSwimming ? 800 : 1000);
    
    return () => clearInterval(interval);
  }, [isVisible, isSwimming]);
  
  // Handle animation complete
  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [isVisible, onAnimationComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          ref={containerRef}
          className={`fixed inset-0 z-50 overflow-hidden ${currentTheme.bgGradient} bg-gradient-to-br ${currentTheme.bgPattern}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background particles */}
          <div className="absolute inset-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${currentTheme.particles}`}
                style={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Wave layers */}
          <div className="absolute inset-0">
            <WaveSVG 
              color={currentTheme.waveColors[0]}
              speed={isSwimming ? 0.4 : 0.5}
              height={window.innerHeight / 2} 
              offset={20}
              opacity={0.8}
              isSwimming={isSwimming}
            />
            <WaveSVG 
              color={currentTheme.waveColors[1]}
              speed={isSwimming ? 0.6 : 0.8}
              height={window.innerHeight / 2 + 40}
              offset={10}
              opacity={0.6}
              flip={true}
              isSwimming={isSwimming}
            />
            <WaveSVG 
              color={currentTheme.waveColors[2]}
              speed={isSwimming ? 0.3 : 0.6}
              height={window.innerHeight / 2 + 20}
              offset={0}
              opacity={0.4}
              isSwimming={isSwimming}
            />
          </div>
          
          {/* Ripple effects */}
          <div className="absolute inset-0">
            {ripples.map(ripple => (
              <WaterRipple 
                key={ripple.id}
                x={ripple.x}
                y={ripple.y}
                size={ripple.size}
                color={isSwimming ? '#06b6d4' : currentTheme.waveColors[0]}
                delay={ripple.delay}
                isSwimming={isSwimming}
              />
            ))}
          </div>
          
          {/* Content Section with Water Theme */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center px-6 ${isSwimming ? 'text-sky-900' : 'text-white'}`}>
            <div className="text-center max-w-2xl mx-auto relative z-10">
              {/* Water Drop Icon */}
              <motion.div 
                className="mb-6 flex justify-center"
                initial={{ scale: 0, opacity: 0, y: 20 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  transition: { 
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }
                }}
              >
                <div className={`p-5 rounded-2xl ${isSwimming ? 'bg-white/20 backdrop-blur-sm' : 'bg-white/10'}`}>
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }
                    }}
                  >
                    {currentTheme.icon}
                  </motion.div>
                </div>
              </motion.div>


              {/* Main Heading */}
              <motion.h2 
                className={`text-3xl md:text-4xl font-bold mb-4 ${isSwimming ? 'bg-clip-text text-sky-900' : 'text-white'}`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 1,
                  transition: { 
                    delay: 0.15, 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1] 
                  }
                }}
              >
                {isSwimming ? 'Diving into Swimming Mode' : 'Switching to Fitness Mode'}
              </motion.h2>
              
              {/* Subtext */}
              <motion.p 
                className={`text-lg ${isSwimming ? 'text-sky-800' : 'text-gray-200'} mb-8 max-w-md mx-auto`}
                initial={{ y: 10, opacity: 0 }}
                animate={{ 
                  y: 0, 
                  opacity: 0.9,
                  transition: { 
                    delay: 0.25, 
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1] 
                  }
                }}
              >
                {isSwimming 
                  ? 'Preparing your aquatic experience...' 
                  : 'Loading your fitness dashboard...'}
              </motion.p>
              
              {/* Animated Water Dots */}
              <motion.div 
                className="flex justify-center space-x-3 mt-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.35 }
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${isSwimming ? 'bg-cyan-500' : 'bg-white'}`}
                    animate={{
                      y: [0, -8, 0],
                      scale: [1, 1.4, 1],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut'
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Subtle Water Ripple */}
              <motion.div 
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full bg-white/20"
                initial={{ scaleX: 0.5, opacity: 0 }}
                animate={{
                  scaleX: 1.5,
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'easeOut'
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
