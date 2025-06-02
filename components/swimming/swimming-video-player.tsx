"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VideoItem {
  id: string
  title?: string
  description?: string
  thumbnail: string
  videoUrl: string
}

interface SwimmingVideoPlayerProps {
  isOpen: boolean
  onClose: () => void
}

const SwimmingVideoPlayer: React.FC<SwimmingVideoPlayerProps> = ({
  isOpen,
  onClose,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showControls, setShowControls] = useState(true)
  
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const controlsTimeout = useRef<NodeJS.Timeout>()
  const controlsAnimation = useAnimation()

  // Single video for swimming
  const video: VideoItem = {
    id: 'swimming-video',
    // title: 'Swim Like a Champion',
    // description: 'Experience our world-class swimming program',
    thumbnail: '/images/swimming/hero-bg.jpg',
    videoUrl: '/videos/swimming-video.mp4'
  }

  // Handle video playback
  const togglePlay = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    
    if (!videoRef.current) return
    
    const playPromise = videoRef.current.paused 
      ? videoRef.current.play().then(() => true).catch(() => false)
      : Promise.resolve(false)
    
    playPromise.then((didPlay) => {
      if (didPlay) {
        setIsPlaying(true)
      } else {
        videoRef.current?.pause()
        setIsPlaying(false)
      }
      
      // Show controls when toggling play/pause
      setShowControls(true)
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current)
      }
      controlsTimeout.current = setTimeout(() => setShowControls(false), 3000)
    })
  }, [setIsPlaying, setShowControls])


  // Handle video end
  const handleVideoEnd = useCallback((): void => {
    setIsPlaying(false)
  }, [])

  // Handle video ready
  const handleLoadedData = useCallback(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
      setProgress(0)
      
      // Set initial volume and muted state
      if (videoRef.current) {
        videoRef.current.volume = 0.7
        videoRef.current.muted = false
      }
    }
  }, [setDuration, setProgress])

  // Handle video time update
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current
      setCurrentTime(currentTime)
      setDuration(duration)
      setProgress((currentTime / duration) * 100)
    }
  }, [setCurrentTime, setDuration, setProgress])

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!videoRef.current) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    const newTime = pos * duration
    
    if (videoRef.current) {
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
      setProgress((newTime / duration) * 100)
    }
  }

  // Toggle fullscreen
  const toggleFullscreen = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation() // Prevent event bubbling
    if (!containerRef.current) return
    
    const toggleFs = () => {
      if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => console.error('Fullscreen error:', err))
      } else {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(err => console.error('Exit fullscreen error:', err))
      }
    }
    
    toggleFs()
  }, [])

  // Toggle mute
  const toggleMute = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation() // Prevent event bubbling
    if (!videoRef.current) return
    
    const newMutedState = !videoRef.current.muted
    videoRef.current.muted = newMutedState
    setIsMuted(newMutedState)
  }, [setIsMuted])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay(undefined as unknown as React.MouseEvent)
          break
        case 'm':
          e.preventDefault()
          toggleMute(undefined as unknown as React.MouseEvent)
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen(undefined as unknown as React.MouseEvent)
          break
        case 'arrowleft':
          e.preventDefault()
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
          }
          break
        case 'arrowright':
          e.preventDefault()
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(videoRef.current.duration, videoRef.current.currentTime + 5)
          }
          break
        case 'arrowup':
          e.preventDefault()
          if (videoRef.current) {
            videoRef.current.volume = Math.min(1, (videoRef.current.volume || 0) + 0.1)
          }
          break
        case 'arrowdown':
          e.preventDefault()
          if (videoRef.current) {
            videoRef.current.volume = Math.max(0, (videoRef.current.volume || 1) - 0.1)
          }
          break
        case 'Escape':
          if (isFullscreen) {
            document.exitFullscreen()
            setIsFullscreen(false)
          } else {
            onClose()
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isFullscreen, currentTime, duration, onClose, togglePlay, toggleMute, toggleFullscreen])

  // Auto-hide controls
  useEffect(() => {
    if (!isOpen) return
    
    const hideControls = () => {
      if (isPlaying) {
        controlsAnimation.start({
          opacity: 0,
          transition: { duration: 0.3, delay: 2 }
        })
        setShowControls(false)
      }
    }

    if (controlsTimeout.current) {
      clearTimeout(controlsTimeout.current)
    }

    controlsAnimation.start({ opacity: 1 })
    setShowControls(true)
    controlsTimeout.current = setTimeout(hideControls, 3000)

    return () => {
      if (controlsTimeout.current) {
        clearTimeout(controlsTimeout.current)
      }
    }
  }, [isPlaying, isOpen, controlsAnimation])

  // Reset player when opening
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.load()
      setProgress(0)
      setCurrentTime(0)
    }
  }, [isOpen])

  // Format time
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (!isOpen) return null

  // Add proper motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Add motion variants for controls
  const controlsVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      y: 100, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        ref={containerRef}
        variants={contentVariants}
        className={cn(
          'relative w-full max-w-5xl aspect-video bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl overflow-hidden shadow-2xl',
          'border-2 border-cyan-200/50 backdrop-blur-lg',
          'transform transition-all duration-300',
          isFullscreen ? 'w-screen h-screen max-w-none rounded-none' : ''
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Water wave overlay */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 via-blue-100/90 to-cyan-50/80"></div>
          <div 
            className="absolute -bottom-10 left-0 w-300% h-24 animate-wave opacity-70"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1200 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512,54,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%23a5f3fc\' fill-opacity=\'0.3\'/%3E%3C/svg%3E")'
            }}
          ></div>
          <div 
            className="absolute -bottom-20 left-0 w-400% h-20 animate-wave-slow opacity-60"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 1200 120\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512,54,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z\' fill=\'%2367e8f9\' fill-opacity=\'0.2\'/%3E%3C/svg%3E")'
            }}
          ></div>
        </div>

        {/* Video element */}
        <video
          ref={videoRef}
          key={video.id}
          className="absolute inset-0 w-full h-full object-cover z-10"
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
          preload="auto"
          playsInline
          poster={video.thumbnail}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 via-cyan-800/10 to-transparent z-20" />

        {/* Video info */}
        <motion.div
          className="absolute top-0 left-0 right-0 p-6 z-30 text-cyan-900"
          initial={{ y: -100 }}
          animate={showControls ? { y: 0 } : { y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-cyan-900">{video.title}</h2>
          <p className="text-cyan-800/90 text-sm mt-1">{video.description}</p>
        </motion.div>

        {/* Video controls */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-30"
          initial={{ y: 100 }}
          animate={showControls ? { y: 0 } : { y: 100 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div 
            className="h-2 bg-cyan-100/50 rounded-full mb-4 cursor-pointer overflow-hidden shadow-inner"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full transform translate-x-1/2 shadow-md border-2 border-cyan-300 hover:scale-125 transition-transform" />
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center space-x-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full bg-white/90 hover:bg-cyan-100 transition-all shadow-md hover:shadow-lg hover:scale-105"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-cyan-800" strokeWidth={2.5} />
                ) : (
                  <Play className="w-5 h-5 text-cyan-800 pl-0.5" strokeWidth={2.5} />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full text-cyan-800/80 hover:bg-cyan-100/50 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Volume2 className="w-5 h-5" strokeWidth={2} />
                )}
              </button>

              <div className="text-sm font-medium text-cyan-900/90 ml-1">
                {formatTime(currentTime)} <span className="text-cyan-700/70">/ {formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full text-cyan-800/80 hover:bg-cyan-100/50 transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5" strokeWidth={2} />
                ) : (
                  <Maximize2 className="w-5 h-5" strokeWidth={2} />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-cyan-800/80 hover:bg-cyan-100/50 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SwimmingVideoPlayer
