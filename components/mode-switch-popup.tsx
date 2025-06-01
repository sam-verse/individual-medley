"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Dumbbell, Waves, X, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import WaveTransition from "./wave-transition"

interface ModeSwitchPopupProps {
  currentMode: "swimming" | "fitness"
  onSwitchMode: () => void
  onClose: () => void
  isVisible: boolean
}

export default function ModeSwitchPopup({ currentMode, onSwitchMode, onClose, isVisible }: ModeSwitchPopupProps) {
  const otherMode = currentMode === "swimming" ? "fitness" : "swimming"
  const [showWave, setShowWave] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

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
    // Close the popup immediately
    onClose()
    
    // Add a small delay to allow the popup to close before starting the wave
    setTimeout(() => {
      console.log('Calling onSwitchMode')
      onSwitchMode()
    }, 100)
  }

  return (
    <>
      <WaveTransition isVisible={showWave} mode={currentMode} />
      
      <AnimatePresence>
        {isVisible && isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed bottom-6 right-6 z-50 max-w-xs w-full sm:w-auto"
          >
            <div className="fixed inset-0 z-40" onClick={onClose} />
            <motion.div
              className={`rounded-3xl shadow-2xl p-4 border ${
                currentMode === "swimming"
                  ? "bg-gradient-to-r from-sky-600 to-sky-500 text-white border-sky-400/30"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white border-blue-400/30"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className={`w-8 h-8 rounded-2xl flex items-center justify-center mr-2 ${
                      currentMode === "swimming" ? "bg-blue-600" : "bg-sky-600"
                    }`}
                  >
                    {currentMode === "swimming" ? (
                      <Dumbbell className="w-4 h-4 text-white" />
                    ) : (
                      <Waves className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                  <h3 className="font-bold text-sm">Try {otherMode === "swimming" ? "Swimming" : "Fitness"} Mode!</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-1 rounded-xl hover:bg-white/20 transition-colors"
                  aria-label="Close popup"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs mb-3 text-white/90">
                {currentMode === "swimming"
                  ? "Looking for high-intensity workouts? Check out our fitness programs!"
                  : "Want to improve your swimming skills? Check out our swimming programs!"}
              </p>

              <div className="flex gap-2">
                <Button
                  onClick={handleSwitch}
                  size="sm"
                  className={`bg-white hover:bg-opacity-90 text-xs px-3 py-1 h-auto flex-1 rounded-2xl ${
                    currentMode === "swimming" ? "text-blue-600" : "text-sky-600"
                  }`}
                >
                  Switch <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
                <Button
                  onClick={onClose}
                  size="sm"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 text-xs px-3 py-1 h-auto rounded-2xl"
                >
                  Later
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
