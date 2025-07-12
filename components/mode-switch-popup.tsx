"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dumbbell, Waves, X, ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface ModeSwitchPopupProps {
  currentMode: "swimming" | "fitness"
  onSwitchMode: () => void
  onClose: () => void
  isVisible: boolean
}

export default function ModeSwitchPopup({ currentMode, onSwitchMode, onClose, isVisible }: ModeSwitchPopupProps) {
  const otherMode = currentMode === "swimming" ? "fitness" : "swimming"
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Handle scroll to show popup after 2 sections (only for auto-show)
  useEffect(() => {
    if (hasShownPopup) return
    
    const hasShown = sessionStorage.getItem('hasShownModePopup')
    if (hasShown === 'true') {
      setHasShownPopup(true)
      return
    }

    const handleScroll = () => {
      const sections = document.querySelectorAll('section')
      if (sections.length >= 2) {
        const secondSection = sections[1]
        const secondSectionBottom = secondSection.offsetTop + (secondSection.offsetHeight * 0.5)
        const scrollPosition = window.scrollY + (window.innerHeight * 0.8)
        
        if (scrollPosition >= secondSectionBottom) {
          setHasShownPopup(true)
          sessionStorage.setItem('hasShownModePopup', 'true')
          onClose() // Close the popup if it was shown manually
        }
      }
    }

    // Only add scroll listener if popup is not shown manually
    if (!isVisible) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [isVisible, hasShownPopup, onClose])

  // Track mount state to prevent initial flash
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSwitch = () => {
    console.log('handleSwitch called')
    setIsSwitching(true)
    
    // Close the popup immediately
    onClose()
    
    // Switch mode directly
    setTimeout(() => {
      console.log('Calling onSwitchMode')
      onSwitchMode()
      
      // Reset states after switch
      setTimeout(() => {
        setIsSwitching(false)
      }, 500)
    }, 100)
  }

  const handleClose = () => {
    console.log('handleClose called')
    onClose()
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && isMounted && !isSwitching && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              damping: 20, 
              stiffness: 300,
              duration: 0.5
            }}
            className="fixed bottom-6 right-6 z-50 max-w-xs w-full sm:w-auto"
          >
            {/* Backdrop */}
            <div className="fixed inset-0 z-40" onClick={handleClose} />
            
            {/* Popup Content */}
            <motion.div
              className={`rounded-3xl shadow-2xl p-5 border relative z-50 overflow-hidden ${
                currentMode === "swimming"
                  ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white border-sky-400/30"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400/30"
              }`}
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Animated background effect */}
              <motion.div
                className="absolute inset-0 opacity-20"
                animate={{
                  background: currentMode === "swimming" 
                    ? "linear-gradient(45deg, #0ea5e9, #0284c7, #0ea5e9)"
                    : "linear-gradient(45deg, #3b82f6, #2563eb, #3b82f6)",
                  backgroundSize: ["200% 200%", "200% 200%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Sparkle effect */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-3 right-3"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Header */}
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center mr-3 ${
                      currentMode === "swimming" ? "bg-blue-600" : "bg-sky-600"
                    }`}
                  >
                    {currentMode === "swimming" ? (
                      <Dumbbell className="w-5 h-5 text-white" />
                    ) : (
                      <Waves className="w-5 h-5 text-white" />
                    )}
                  </motion.div>
                  <h3 className="font-bold text-base">Try {otherMode === "swimming" ? "Swimming" : "Fitness"} Mode!</h3>
                </div>

                <motion.button
                  onClick={handleClose}
                  className="p-2 rounded-xl hover:bg-white/20 transition-colors"
                  aria-label="Close popup"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Description */}
              <p className="text-sm mb-4 text-white/90 relative z-10 leading-relaxed">
                {currentMode === "swimming"
                  ? "Looking for high-intensity workouts? Check out our fitness programs!"
                  : "Want to improve your swimming skills? Check out our swimming programs!"}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 relative z-10">
                <motion.div 
                  className="flex-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ 
                      boxShadow: [
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                        "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                      ]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                <Button
                  onClick={handleSwitch}
                  size="sm"
                      className={`bg-white hover:bg-gray-50 text-xs px-4 py-2.5 h-auto flex-1 rounded-2xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl ${
                        currentMode === "swimming" 
                          ? "text-blue-600 hover:text-blue-700 border-2 border-blue-200 hover:border-blue-300 hover:shadow-blue-200/50" 
                          : "text-sky-600 hover:text-sky-700 border-2 border-sky-200 hover:border-sky-300 hover:shadow-sky-200/50"
                  }`}
                      disabled={isSwitching}
                    >
                      <span className="flex items-center justify-center">
                        <span className="mr-1 font-medium">Switch</span>
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                          className="flex items-center"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </motion.div>
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                <Button
                    onClick={handleClose}
                  size="sm"
                  variant="outline"
                    className="border-2 border-white/40 text-white hover:bg-white/20 hover:border-white/60 text-xs px-4 py-2.5 h-auto rounded-2xl transition-all duration-300 font-medium shadow-md hover:shadow-lg"
                    disabled={isSwitching}
                >
                  Later
                </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
