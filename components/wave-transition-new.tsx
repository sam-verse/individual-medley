"use client"

import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useInView } from "framer-motion"

interface WaveTransitionProps {
  isVisible: boolean;
  mode: 'fitness' | 'swimming';
  onAnimationComplete?: () => void;
}

const theme = {
  fitness: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-700',
    text: 'text-white',
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  swimming: {
    primary: 'bg-cyan-500',
    secondary: 'bg-cyan-600',
    text: 'text-white',
    icon: (
      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
};

export default function WaveTransition({ isVisible, mode, onAnimationComplete }: WaveTransitionProps) {
  const [currentTheme, setCurrentTheme] = useState(theme[mode]);
  const [isSwimming, setIsSwimming] = useState(mode === 'swimming');
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  // Handle mode change
  useEffect(() => {
    if ((mode === 'swimming' && !isSwimming) || (mode === 'fitness' && isSwimming)) {
      const transition = async () => {
        // Start exit animation
        await controls.start({
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        });
        
        // Update theme
        setIsSwimming(mode === 'swimming');
        setCurrentTheme(theme[mode]);
        
        // Start enter animation
        await controls.start({
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.1 }
        });
        
        onAnimationComplete?.();
      };
      
      transition();
    }
  }, [mode, isSwimming, controls, onAnimationComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        ref={ref}
        className={`fixed inset-0 z-50 flex items-center justify-center ${currentTheme.primary} ${currentTheme.text}`}
        initial={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
        animate={controls}
        exit={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
      >
        <div className="text-center p-8 max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="mb-6"
          >
            {currentTheme.icon}
          </motion.div>
          
          <motion.h2 
            className="text-2xl font-bold mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {mode === 'swimming' ? 'Swimming Mode' : 'Fitness Mode'}
          </motion.h2>
          
          <motion.p 
            className="opacity-90 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {mode === 'swimming' 
              ? 'Dive into our swimming programs' 
              : 'Explore our fitness programs'}
          </motion.p>
          
          <motion.div 
            className="h-1.5 bg-white/20 rounded-full overflow-hidden max-w-xs mx-auto"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: 'easeInOut' }}
          >
            <motion.div 
              className={`h-full ${currentTheme.secondary} rounded-full`}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
              onAnimationComplete={onAnimationComplete}
            />
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
