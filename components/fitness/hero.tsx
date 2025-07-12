"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Sparkles, Play, Users, Trophy, Zap } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import PremiumVideoPlayer from "./premium-video-player"

export default function FitnessHero() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  const demoVideos = [
    {
      id: '1',
      title: 'Premium Fitness Training',
      description: 'Experience world-class training with our expert coaches',
      thumbnail: '/images/hero-thumbnail.jpg',
      videoUrl: '/videos/fitness-video.mp4'
    }
  ]

  const images = [
    "/images/img11.jpg",
    "/images/img22.jpg",
    "/images/img33.jpg",
    "/images/img44.jpg",
  ]

  const stats = [
    { icon: <Users className="w-4 h-4 md:w-5 md:h-5" />, value: "500+", label: "Active Members" },
    { icon: <Trophy className="w-4 h-4 md:w-5 md:h-5" />, value: "50+", label: "Programs" },
    { icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />, value: "24/7", label: "Access" },
  ]

  useEffect(() => {
    // Animate other elements with smoother timing
    // Removed paragraph animation to keep it always visible

    gsap.from(textRef.current?.querySelector(".buttons-container"), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.7,
      ease: "power3.out",
    })

    gsap.from(textRef.current?.querySelector(".stats-container"), {
      opacity: 0,
      y: 20,
      duration: 0.6,
      delay: 0.9,
      ease: "power3.out",
    })

    // Auto-advance carousel every 4 seconds
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [images.length])

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] md:min-h-screen flex items-start pt-16 md:items-center pb-8 md:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-navy-900 via-navy-900/95 to-navy-900/90"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-10 w-60 h-60 bg-indigo-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 items-center max-w-7xl w-full relative z-10 pt-2 md:pt-0">
        <div ref={textRef} className="z-10 text-center md:text-left order-2 md:order-1">
          {/* Tagline - Hidden on mobile, shown on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:inline-flex items-center px-3.5 py-1.5 bg-blue-900/40 backdrop-blur-sm rounded-full text-blue-300 text-xs font-medium mb-4 md:mb-6 border border-blue-500/20"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            TRANSFORM YOUR BODY & MIND
          </motion.div>

          {/* Mobile Heading - Tagline as main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:hidden flex justify-center mb-4"
          >
            <div className="inline-flex items-center px-3 py-1.5 bg-blue-900/40 backdrop-blur-sm rounded-full text-blue-300 text-sm font-medium border border-blue-500/20 shadow-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              TRANSFORM YOUR BODY & MIND
            </div>
          </motion.div>

          {/* Desktop Heading - Original main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden md:block"
          >
            <h1
              ref={titleRef}
              className="text-3.5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-6 text-white leading-tight"
            >
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-300 whitespace-nowrap">
                UNLEASH YOUR
              </span>
              <span className="block relative">
                <span className="relative z-10">POTENTIAL</span>
                <span className="absolute -bottom-1 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500/50 to-transparent rounded-full"></span>
              </span>
            </h1>
          </motion.div>
          <div className="relative z-10">
            <p className="text-sm sm:text-base md:text-lg text-blue-200/90 mb-3 md:mb-6 leading-relaxed max-w-lg mx-auto md:mx-0 px-2 sm:px-0 opacity-100">
              Transform your fitness journey with our cutting-edge training programs, expert coaches, and state-of-the-art facilities. Achieve peak performance and unlock your true potential.
            </p>
          </div>

          {/* Stats - Single row, 3 columns */}
          <motion.div
            className="flex flex-row justify-between items-center mb-4 md:mb-6 px-2 py-1.5 sm:p-3 bg-navy-800/40 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-blue-500/20 max-w-md mx-auto md:mx-0"
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
                  <div className="flex justify-center mb-0.5 text-blue-400/90">
                    {React.cloneElement(stat.icon, { className: 'w-3 h-3 sm:w-4 sm:h-4' })}
                  </div>
                  <div className="text-xs font-bold text-white whitespace-nowrap">{stat.value}</div>
                  <div className="text-[8px] xs:text-[9px] text-blue-300/80 mt-0.5 whitespace-nowrap">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 md:mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Button
                className="relative w-full sm:w-auto px-6 py-5 text-sm sm:text-base font-medium rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                  boxShadow: '0 4px 20px -5px rgba(59, 130, 246, 0.5)'
                }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start Training
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Button
                variant="outline"
                className="relative w-full sm:w-auto px-6 py-5 text-sm sm:text-base font-medium rounded-xl border-blue-500/30 text-blue-300 hover:text-white hover:bg-blue-500/10 transition-all duration-300 overflow-hidden"
                onClick={() => setIsVideoOpen(true)}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Watch Demo
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            className="flex flex-col items-center md:items-start gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center text-xs text-blue-300/80">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div 
                    key={i} 
                    className="w-6 h-6 rounded-full border-2 border-navy-800 bg-blue-500/80"
                    style={{ zIndex: 5 - i }}
                  ></div>
                ))}
              </div>
              <span>Join 1000+ happy members</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs text-blue-300/80">
              <span className="flex items-center">
                <svg className="w-3.5 h-3.5 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No commitment
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center">
                <svg className="w-3.5 h-3.5 text-green-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free trial
              </span>
            </div>
          </motion.div>
        </div>

        {/* Image Container - Moved up with negative margin */}
        <motion.div 
          ref={imageRef}
          className="relative h-[200px] sm:h-[350px] md:h-[450px] lg:h-[550px] xl:h-[650px] order-1 md:order-2 w-full px-2 sm:px-0 -mt-14 sm:mt-0" style={{ marginTop: '-2rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-3 -right-3 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-blue-500/10 rounded-full filter blur-3xl -z-10"></div>
          <div className="absolute -bottom-3 -left-3 sm:-bottom-10 sm:-left-10 w-32 h-32 sm:w-60 sm:h-60 bg-indigo-500/10 rounded-full filter blur-3xl -z-10"></div>
          
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
                  <div className="relative w-full h-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-3xl -rotate-3 sm:-rotate-6 scale-95"></div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-3xl rotate-3 sm:rotate-6 scale-95"></div>
                    <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl bg-navy-800/50 backdrop-blur-sm">
                      <Image
                        src={src}
                        alt={`Fitness ${index + 1}`}
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
        </motion.div>
      </div>
      {/* Premium Video Player */}
      <PremiumVideoPlayer
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videos={demoVideos}
      />
    </section>
  )
}
