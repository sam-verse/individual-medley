"use client"

import { useRef, useEffect, useCallback, useMemo } from "react"
import { Waves, Dumbbell, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import Image, { StaticImageData } from "next/image"

type ModeType = 'swimming' | 'fitness';

interface ModeSelectionProps {
  onModeSelect: (mode: ModeType) => void
}

interface WaveConfig {
  y: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
}

interface Particle extends Omit<WaveConfig, 'color' | 'speed' | 'frequency'> {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
}

interface CanvasDimensions {
  width: number;
  height: number;
  dpr: number;
}

// Animation variants for Framer Motion
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.2, 0.8, 0.2, 1] 
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] 
    } 
  }
};

const ModeSelection = ({ onModeSelect }: ModeSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>();
  const particles = useRef<Particle[]>([]);
  
  // Memoize wave configurations to prevent unnecessary recalculations
  const waves = useMemo<WaveConfig[]>(() => [
    { y: 0.6, amplitude: 15, frequency: 0.005, speed: 0.01, color: "rgba(186, 230, 253, 0.1)" },
    { y: 0.5, amplitude: 10, frequency: 0.003, speed: 0.008, color: "rgba(125, 211, 252, 0.1)" },
    { y: 0.7, amplitude: 8, frequency: 0.007, speed: 0.015, color: "rgba(56, 189, 248, 0.1)" },
  ], []);
  
  // Generate a random particle
  const createParticle = useCallback((width: number, height: number): Particle => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 0.5,
    color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
      Math.random() * 100 + 155
    )}, 255, ${Math.random() * 0.2 + 0.05})`,
    speedX: Math.random() * 0.3 - 0.15,
    speedY: Math.random() * 0.3 - 0.15,
    y: 0.6 + Math.random() * 0.3, // Random y position within a range
    amplitude: 5 + Math.random() * 10, // Random amplitude
    frequency: 0.003 + Math.random() * 0.004, // Random frequency
    speed: 0.008 + Math.random() * 0.01, // Random speed
  }), []);

  /**
   * Set up canvas dimensions and scaling for Retina displays
   */
  const setupCanvas = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): CanvasDimensions => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.floor(rect.width * dpr);
    const height = Math.floor(rect.height * dpr);
    
    // Only update if dimensions have changed
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    }
    
    return { width, height, dpr };
  }, []);

  /**
   * Initialize particles based on canvas size
   */
  const initParticles = useCallback((width: number, height: number, count: number = 0): Particle[] => {
    const particleCount = count || Math.floor(width / 20); // Responsive particle count
    return Array.from({ length: particleCount }, () => createParticle(width, height));
  }, [createParticle]);

  /**
   * Create a gradient for the background
   */
  const createGradient = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number): CanvasGradient => {
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#0c4a6e");
    gradient.addColorStop(1, "#1e40af");
    return gradient;
  }, []);

  // Interactive background animation
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Initialize canvas and get dimensions
    const { width, height } = setupCanvas(canvas, ctx);
    
    // Initialize particles if not already done
    if (particles.current.length === 0) {
      particles.current = initParticles(width, height);
    }
    
    // Create gradient
    const gradient = createGradient(ctx, width, height);
    
    // Handle window resize
    const handleResize = () => {
      const newDims = setupCanvas(canvas, ctx);
      // Optionally adjust particles on resize
      if (particles.current.length === 0) {
        particles.current = initParticles(newDims.width, newDims.height);
      }
    };

    let time = 0;

    /**
     * Animation loop
     */
    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      time += 0.01;
      
      // Clear canvas with gradient
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw waves
      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y * height);
        
        // Optimize performance based on screen size
        const step = window.innerWidth < 768 ? 30 : 15;
        for (let x = 0; x <= width; x += step) {
          const dx = x * wave.frequency;
          const y = wave.y * height + Math.sin(dx + time * wave.speed) * wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // Update and draw particles
      particles.current.forEach(particle => {
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Wrap around screen edges
        if (particle.x < -10) particle.x = width + 10;
        if (particle.x > width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = height + 10;
        if (particle.y > height + 10) particle.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Handle visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = undefined;
        }
      } else {
        if (!animationFrameId.current) {
          animationFrameId.current = requestAnimationFrame(animate);
        }
      }
    };

    // Start the animation
    animationFrameId.current = requestAnimationFrame(animate);
    
    // Set up event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = undefined;
      }
    };
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center relative p-4 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800"
      role="main"
      aria-label="Mode Selection"
    >
      {/* Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-90" 
        aria-hidden="true"
      />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-4 md:px-10 md:py-6">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Image
                src="/images/atom-logo.png"
                alt="Individual Medley"
                width={24}
                height={24}
                className="w-5 h-5 object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Individual Medley</h1>
              <p className="text-xs text-sky-200/80">Swimming & Fitness</p>
            </div>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center gap-1.5"
          >
            <span className="relative z-10">Join Now</span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </header>

      {/* Main Content */}
      <main className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-8 sm:mb-12 px-4">
          {/* Logo above the text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              ease: [0.2, 0.8, 0.2, 1]
            }}
            className="mb-6 sm:mb-8 flex justify-center"
          >
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
              <Image
                src="/images/fitness-logo.png"
                alt="Individual Medley Logo"
                fill
                sizes="(max-width: 768px) 8rem, (max-width: 1024px) 10rem, 12rem"
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key="content"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: 0.1
                  }
                },
                exit: {
                  opacity: 0,
                  transition: {
                    when: "afterChildren",
                    staggerChildren: 0.05,
                    staggerDirection: -1
                  }
                }
              }}
            >
              <motion.h1
                key="title"
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 leading-tight"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-sky-100">
                  Individual Medley
                </span>
              </motion.h1>

              <motion.p
                key="subtitle"
                variants={fadeInUp}
                className="text-lg sm:text-xl md:text-2xl text-sky-100/90 max-w-3xl mx-auto leading-relaxed"
              >
                Choose your fitness journey. Dive into swimming excellence or power up with our fitness programs.
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.4,
            ease: [0.2, 0.8, 0.2, 1]
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto w-full px-4 sm:px-6"
        >
          {/* Swimming Card */}
          <motion.div
            whileHover={{ 
              y: -8,
              transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 20 
              } 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect('swimming')}
            className="group relative h-full bg-gradient-to-br from-sky-500/90 to-sky-700/90 rounded-2xl shadow-2xl cursor-pointer overflow-hidden border-2 border-sky-400/30 hover:border-sky-300/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-sky-600/10 group-hover:from-sky-400/20 group-hover:to-sky-600/20 transition-all duration-500" />
            <div className="relative p-6 sm:p-8 flex flex-col items-center text-center h-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20 group-hover:shadow-xl group-hover:shadow-sky-500/30 transition-all duration-300">
                <Waves className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Swimming</h2>
              <p className="text-sky-100/90 mb-6 text-base sm:text-lg leading-relaxed max-w-md">
                Master the water with our expert swimming programs for all ages and skill levels. Perfect your technique and build endurance.
              </p>
              <div className="mt-auto pt-4">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 text-sm sm:text-base group-hover:px-8 group-hover:shadow-lg group-hover:shadow-sky-500/20">
                  Explore Swimming
                  <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] bg-[length:100px_100px] opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
          </motion.div>

          {/* Fitness Card */}
          <motion.div
            whileHover={{ 
              y: -8,
              transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 20 
              } 
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onModeSelect('fitness')}
            className="group relative h-full bg-gradient-to-br from-blue-600/90 to-blue-800/90 rounded-2xl shadow-2xl cursor-pointer overflow-hidden border-2 border-blue-400/30 hover:border-blue-300/50 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-700/10 group-hover:from-blue-500/20 group-hover:to-blue-700/20 transition-all duration-500" />
            <div className="relative p-6 sm:p-8 flex flex-col items-center text-center h-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                <Dumbbell className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Fitness</h2>
              <p className="text-blue-100/90 mb-6 text-base sm:text-lg leading-relaxed max-w-md">
                Transform your body with our high-intensity fitness programs tailored to your goals. Build strength and confidence.
              </p>
              <div className="mt-auto pt-4">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 text-sm sm:text-base group-hover:px-8 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                  Explore Fitness
                  <ChevronRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] bg-[length:100px_100px] opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
          </motion.div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <footer className="z-10 w-full py-4 sm:py-6 px-4">
        <div className="container mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs sm:text-sm text-sky-100/50"
          >
            © {new Date().getFullYear()} Individual Medley. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}

export default ModeSelection
