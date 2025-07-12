"use client"

import { useState, useRef } from "react"
import { ModeSelection } from "@/components/ModeSelection"
import { SwimmingMode } from "@/components/SwimmingMode"
import { FitnessMode } from "@/components/FitnessMode"
import { AnimatePresence } from "framer-motion"
import gsap from "gsap"

export default function Home() {
  const [selectedMode, setSelectedMode] = useState<string | null>(null)
  const [transitioning, setTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update the handleModeSelect function to add a better transition:
  const handleModeSelect = (mode: string) => {
    setTransitioning(true)

    // Animate transition with a more dramatic effect
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setSelectedMode(mode)

        // Delay to ensure the new component is mounted
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setTransitioning(false)
            },
          })
        }, 100)
      },
    })
  }

  // Update the handleBackToSelection function with the same animation:
  const handleBackToSelection = () => {
    setTransitioning(true)

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setSelectedMode(null)

        // Delay to ensure the new component is mounted
        setTimeout(() => {
          gsap.to(containerRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              setTransitioning(false)
            },
          })
        }, 100)
      },
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div ref={containerRef} className="bg-white rounded-lg shadow-xl overflow-hidden p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Workout Mode Selection</h1>

        {/* Update the AnimatePresence section for better transitions: */}
        <AnimatePresence mode="wait">
          {!selectedMode && !transitioning ? (
            <motion.div
              key="selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ModeSelection onModeSelect={handleModeSelect} />
            </motion.div>
          ) : selectedMode === "Swimming" ? (
            <motion.div
              key="swimming"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <SwimmingMode onBackToSelection={handleBackToSelection} />
            </motion.div>
          ) : (
            <motion.div
              key="fitness"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FitnessMode onBackToSelection={handleBackToSelection} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
