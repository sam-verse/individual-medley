"use client"

import { useState, useEffect } from "react"
import ModeSelection from "@/components/mode-selection"
import SwimmingMode from "@/components/swimming-mode"
import FitnessMode from "@/components/fitness-mode"
import { AnimatePresence, motion } from "framer-motion"

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Fix for mode switching button
  const handleModeSelect = (mode: string) => {
    console.log('Mode selected:', mode)
    if (isTransitioning) return

    setIsTransitioning(true)

    // Set a timeout to ensure the animation has time to complete
    setTimeout(() => {
      // Convert to lowercase for consistency
      const normalizedMode = mode.toLowerCase()
      console.log('Setting mode to:', normalizedMode)
      setSelectedMode(normalizedMode)

      // Add a small delay before allowing new transitions
      setTimeout(() => {
        console.log('Selection transition complete')
        setIsTransitioning(false)
      }, 600)
    }, 500)
  }

  const handleBackToSelection = () => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Set a timeout to ensure the animation has time to complete
    setTimeout(() => {
      setSelectedMode(null)

      // Add a small delay before allowing new transitions
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }, 500)
  }

  // Direct switch to fitness mode
  const handleSwitchToFitness = () => {
    console.log('Switching to Fitness mode')
    if (isTransitioning) return

    setIsTransitioning(true)

    setTimeout(() => {
      console.log('Setting mode to fitness')
      setSelectedMode('fitness')

      setTimeout(() => {
        console.log('Transition complete')
        setIsTransitioning(false)
      }, 600)
    }, 500)
  }

  // Direct switch to swimming mode
  const handleSwitchToSwimming = () => {
    console.log('Switching to Swimming mode')
    if (isTransitioning) return

    setIsTransitioning(true)

    setTimeout(() => {
      console.log('Setting mode to swimming')
      setSelectedMode('swimming')

      setTimeout(() => {
        console.log('Transition complete')
        setIsTransitioning(false)
      }, 600)
    }, 500)
  }

  // Add a class to the body for mobile center alignment and fix mobile viewport height
  useEffect(() => {
    document.body.classList.add("mobile-center")

    // Fix for mobile viewport height issues
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)
    window.addEventListener("orientationchange", setVh)

    // Scroll to top when changing modes
    window.scrollTo(0, 0)

    return () => {
      document.body.classList.remove("mobile-center")
      window.removeEventListener("resize", setVh)
      window.removeEventListener("orientationchange", setVh)
    }
  }, [selectedMode])

  return (
    <main className="min-h-screen w-full overflow-x-hidden" style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}>
      <AnimatePresence mode="wait">
        {!selectedMode ? (
          <motion.div
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full"
            style={{ minHeight: "calc(var(--vh, 1vh) * 100)" }}
          >
            <ModeSelection onModeSelect={handleModeSelect} />
          </motion.div>
        ) : selectedMode?.toLowerCase() === "swimming" ? (
          <motion.div
            key="swimming"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <SwimmingMode onBackToSelection={handleBackToSelection} onSwitchToFitness={handleSwitchToFitness} />
          </motion.div>
        ) : (
          <motion.div
            key="fitness"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <FitnessMode onBackToSelection={handleBackToSelection} onSwitchToSwimming={handleSwitchToSwimming} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
