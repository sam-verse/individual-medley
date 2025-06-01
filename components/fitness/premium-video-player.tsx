"use client"

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, PanInfo, useAnimation } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface VideoItem {
  id: string
  title: string
  description: string
  thumbnail: string
  videoUrl: string
}

interface PremiumVideoPlayerProps {
  videos: VideoItem[]
  isOpen: boolean
  initialIndex?: number
  onClose: () => void
}

const PremiumVideoPlayer: React.FC<PremiumVideoPlayerProps> = ({
  videos,
  isOpen,
  initialIndex = 0,
  onClose,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
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

  const currentVideo = videos[currentIndex]

  // Handle video playback
  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  // Handle video end
  const handleVideoEnd = useCallback(() => {
    setIsPlaying(false)
    handleNext()
  }, [currentIndex])

  // Handle video time update
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current
      setCurrentTime(currentTime)
      setDuration(duration)
      setProgress((currentTime / duration) * 100)
    }
  }, [])

  // Handle progress bar click
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
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

  // Handle swipe gestures
  const handleDragEnd = useCallback((event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50 && currentIndex > 0) {
      // Swipe right
      handlePrev()
    } else if (info.offset.x < -50 && currentIndex < videos.length - 1) {
      // Swipe left
      handleNext()
    }
  }, [currentIndex, videos.length])

  // Navigation functions
  const handleNext = useCallback(() => {
    if (currentIndex < videos.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsPlaying(true)
    }
  }, [currentIndex, videos.length])

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
      setIsPlaying(true)
    }
  }, [currentIndex])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return
    
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }, [isMuted])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'm':
          toggleMute()
          break
        case 'f':
          toggleFullscreen()
          break
        case 'ArrowLeft':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.max(0, currentTime - 5)
          }
          break
        case 'ArrowRight':
          if (videoRef.current) {
            videoRef.current.currentTime = Math.min(duration, currentTime + 5)
          }
          break
        case 'ArrowUp':
          if (videoRef.current) {
            videoRef.current.volume = Math.min(1, (videoRef.current.volume || 0) + 0.1)
          }
          break
        case 'ArrowDown':
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
  }, [isPlaying, currentIndex, isOpen, controlsAnimation])

  // Reset player when video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false))
      }
      setProgress(0)
      setCurrentTime(0)
    }
  }, [currentIndex, isPlaying])

  // Format time
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        ref={containerRef}
        className={cn(
          'relative w-full max-w-5xl aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl',
          'border border-white/10 backdrop-blur-lg',
          'transform transition-all duration-300',
          isFullscreen ? 'w-screen h-screen max-w-none rounded-none' : ''
        )}
        onClick={(e) => e.stopPropagation()}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        dragElastic={0.1}
      >
        {/* Video element */}
        <video
          ref={videoRef}
          key={currentVideo.id}
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={handleVideoEnd}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
          preload="auto"
          playsInline
          poster={currentVideo.thumbnail}
        >
          <source src={currentVideo.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70" />

        {/* Navigation arrows */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
        )}

        {currentIndex < videos.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-all"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        )}

        {/* Video info */}
        <motion.div
          className="absolute top-0 left-0 right-0 p-6 z-10 text-white"
          initial={{ y: -100 }}
          animate={showControls ? { y: 0 } : { y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold">{currentVideo.title}</h2>
          <p className="text-white/80 text-sm mt-1">{currentVideo.description}</p>
        </motion.div>

        {/* Video controls */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-4 z-10"
          initial={{ y: 100 }}
          animate={showControls ? { y: 0 } : { y: 100 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Progress bar */}
          <div 
            className="h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer overflow-hidden"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-blue-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full transform translate-x-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlay}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              <div className="text-sm text-white/80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/60">
                {currentIndex + 1} / {videos.length}
              </span>
              
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-white" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-white" />
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Swipe hint */}
        {videos.length > 1 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              Swipe to navigate
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default PremiumVideoPlayer
