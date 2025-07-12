"use client"

import React, { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Award, Users, Zap, Waves } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import the video player to avoid SSR issues
const SwimmingVideoPlayer = dynamic(
  () => import("./swimming-video-player"),
  { ssr: false }
)

export default function SwimmingHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "/images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg"
  ]
  
  const stats = [
    { value: "500+", label: "Happy Swimmers", icon: <Users className="w-5 h-5" /> },
    { value: "15+", label: "Expert Coaches", icon: <Award className="w-5 h-5" /> },
    { value: "100%", label: "Satisfaction", icon: <Zap className="w-5 h-5" /> }
  ]

  useEffect(() => {
    // Carousel effect
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-start pt-20 md:pt-0 md:items-center pb-0 px-4 sm:px-6 overflow-hidden bg-transparent"
    >
      {/* Water Background - Handled by SwimmingBackground component */}
      
      {/* Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 items-center max-w-7xl w-full relative z-10 pt-2 md:pt-0">
        <div ref={textRef} className="z-10 text-center lg:text-left lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:hidden inline-flex items-center px-3.5 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-cyan-800 text-xs font-medium mb-4 md:mb-6 border border-cyan-200 shadow-sm"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
            </span>
            SWIM LIKE A CHAMPION
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:inline-flex items-center px-3.5 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-cyan-800 text-xs font-medium mb-4 md:mb-6 border border-cyan-200 shadow-sm"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600"></span>
            </span>
            DIVE INTO EXCELLENCE
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block text-3.5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 text-gray-900 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-700 to-cyan-600">
              SWIM LIKE A
            </span>
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">CHAMPION</span>
              <motion.span 
                className="absolute -bottom-1 left-0 w-full h-1.5 -z-10 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(14, 165, 180, 0) 0%, rgba(14, 165, 180, 0.6) 50%, rgba(14, 165, 180, 0) 100%)',
                  filter: 'drop-shadow(0 0 4px rgba(14, 165, 180, 0.3))',
                }}
                initial={{ scaleX: 0.9, opacity: 0.8 }}
                animate={{ 
                  scaleX: 1.05,
                  opacity: 1,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed max-w-lg mx-auto md:mx-0 px-2 sm:px-0"
          >
            Join our world-class swimming program designed for all ages and skill levels. 
            Our certified coaches provide personalized training to help you achieve your aquatic goals, 
            whether you're a beginner or an elite competitor.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8"
          >
            <Button 
              className="relative w-full sm:w-auto px-6 py-5 text-sm sm:text-base font-medium rounded-xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                boxShadow: '0 4px 20px -5px rgba(6, 182, 212, 0.5)'
              }}
              size="lg"
            >
              <span className=" text-white relative z-10 flex items-center justify-center">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Start Your Journey
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
            <Button 
              variant="outline" 
              className="relative w-full sm:w-auto px-6 py-5 text-sm sm:text-base font-medium rounded-xl border-2 border-cyan-600/30 text-cyan-700 hover:text-white hover:bg-cyan-600/10 hover:border-cyan-600 transition-all duration-300 overflow-hidden group"
              size="lg"
              onClick={() => setIsVideoOpen(true)}
            >
              <span className="relative z-10 flex items-center justify-center">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Video
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>

          {/* Video Player Modal */}
          <SwimmingVideoPlayer 
            isOpen={isVideoOpen} 
            onClose={() => setIsVideoOpen(false)} 
          />

          {/* Stats */}
          <motion.div
            className="flex flex-row justify-between items-center mb-4 md:mb-6 px-3 py-2 sm:p-3 bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-cyan-100 shadow-sm max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group flex-1 px-1"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative text-center">
                  <div className="flex justify-center mb-0.5 text-cyan-600">
                    {React.cloneElement(stat.icon, { className: 'w-3 h-3 sm:w-4 sm:h-4' })}
                  </div>
                  <div className="text-xs font-bold text-gray-800 whitespace-nowrap">{stat.value}</div>
                  <div className="text-[8px] xs:text-[9px] text-gray-600 mt-0.5 whitespace-nowrap">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          ref={imageRef}
          className="relative h-[200px] sm:h-[300px] md:h-[380px] lg:h-[450px] xl:h-[500px] order-1 lg:order-2 lg:col-span-5 w-full px-2 sm:px-0 -mt-4 sm:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginTop: '-1rem' }}
        >
          {/* Decorative Elements - Dark Blue Theme */}
          <div className="absolute -top-3 -right-3 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-indigo-900/10 rounded-full filter blur-3xl -z-10"></div>
          <div className="absolute -bottom-3 -left-3 sm:-bottom-10 sm:-left-10 w-32 h-32 sm:w-60 sm:h-60 bg-indigo-900/10 rounded-full filter blur-3xl -z-10"></div>
          
          {/* Main Image Container */}
          <div className="relative h-full w-full flex items-center justify-center px-2 sm:px-0 -mt-4">
            <AnimatePresence mode="wait">
              {images.map((src, index) => currentImage === index && (
                <motion.div
                  key={index}
                  className="absolute inset-0 flex items-center justify-center w-full h-full"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <div className="relative w-full h-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/0 to-blue-900/30   rounded-2xl -rotate-3 sm:-rotate-6 scale-95"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300/20 to-blue-900/30 rounded-2xl rotate-3 sm:rotate-6 scale-95"></div>
                    <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-cyan-800/30 shadow-2xl bg-blue-9000 backdrop-blur-sm">
                      <Image
                        src={src}
                        alt={`Swimming image ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 50vw"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating elements
          <motion.div 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-full z-20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-6 h-6 text-white" />
          </motion.div> */}

          {/* Image indicators
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
            {images.map((_, index) => (
              <motion.button
                key={index}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  currentImage === index ? "bg-white w-6 sm:w-8" : "bg-white/30 w-2 sm:w-3"
                }`}
                onClick={() => setCurrentImage(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div> */}

          {/* Water reflection effect */}
          {/* <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10"></div> */}
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes wave {
          0% {
            transform: translateX(0) translateY(0);
          }
          100% {
            transform: translateX(-50%) translateY(0);
          }
        }
        
        @keyframes waveVertical {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(5%, 2.5%);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-3%, 1.5%);
          }
        }
        
        @keyframes floatBubble {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10%, 90% {
            opacity: var(--opacity, 0.3);
          }
          25% {
            transform: translate(calc(var(--path-x) * 0.5), calc(var(--path-y) * 0.5)) scale(1.1);
          }
          50% {
            transform: translate(var(--path-x), var(--path-y)) scale(0.9);
          }
          75% {
            transform: translate(calc(var(--path-x) * 0.8), calc(var(--path-y) * 0.8)) scale(1.05);
          }
        }
        
        @keyframes pulseBubble {
          0%, 100% {
            opacity: 0;
            transform: scale(1);
          }
          50% {
            opacity: var(--opacity, 0.1);
            transform: scale(1.2);
          }
        }
        
        @keyframes splash {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.7;
          }
          20% {
            transform: translateY(-15px) scale(1.2);
            opacity: 1;
          }
          40% {
            transform: translateY(-25px) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-50px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes foamPulse {
          0%, 100% {
            opacity: 0.9;
            height: 8px;
          }
          50% {
            opacity: 0.7;
            height: 12px;
          }
        }
        
        .animate-wave {
          animation: wave 25s linear infinite;
        }
        
        .animate-wave-slow {
          animation: wave-slow 35s linear infinite;
        }
        
        .animate-wave-slower {
          animation: wave-slower 45s linear infinite;
        }
        
        .animate-float {
          animation: float 15s ease-in-out infinite;
        }
        
        @keyframes ripple {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.5);
          border-radius: 10px;
          transition: all 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.8);
        }
      `}</style>
    </section>
  )
}
