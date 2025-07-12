"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface WaterLoadingProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export default function WaterLoading({ isVisible, onComplete }: WaterLoadingProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    const duration = 500; // 0.5 seconds - very fast
    const interval = 10; // Update every 10ms for ultra-smooth animation
    const increment = (interval / duration) * 100;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete?.();
          }, 0);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-blue-900/90 to-blue-950/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-80 max-w-sm mx-auto p-8 text-center">
        {/* Water Ripple Effect */}
        <div className="relative mb-8">
          <motion.div
            className="w-24 h-24 mx-auto rounded-full border-4 border-blue-300/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-blue-200/40"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.05, 0.4],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
          <motion.div
            className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-4 border-blue-100/50"
            animate={{
              scale: [1, 1.6, 1],
              opacity: [0.5, 0.02, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4
            }}
          />
          
          {/* Center Water Drop */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-8 h-8 bg-gradient-to-b from-blue-200 to-blue-400 rounded-full shadow-lg" />
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative h-3 bg-blue-900/50 rounded-full overflow-hidden mb-4 border border-blue-300/20">
            {/* Progress Fill */}
            <motion.div
              className="h-full rounded-full relative"
              style={{
                background: "linear-gradient(90deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1, ease: "linear" }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-100">
            Diving In...
          </h3>
          <p className="text-sm opacity-70 text-blue-200">
            {Math.round(progress)}%
          </p>
        </motion.div>

        {/* Floating Bubbles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
              style={{
                left: `${20 + (i * 12)}%`,
                top: `${60 + (i % 2) * 20}%`,
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 0.8 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 