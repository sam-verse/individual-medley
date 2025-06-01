"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import EnhancedWaterBackground from "@/components/enhanced-water-background"
import SwimmingHero from "@/components/swimming/hero"
import ProgramsOverview from "@/components/swimming/programs-overview"
import SkillLevels from "@/components/swimming/skill-levels"
import Schedule from "@/components/swimming/schedule"
import Instructors from "@/components/swimming/instructors"
import Testimonials from "@/components/swimming/testimonials"
import ContactForm from "@/components/swimming/contact-form"
import SwimmingNavbar from "@/components/swimming/navbar"
import BookingModal from "@/components/booking-modal"
import Footer from "@/components/swimming/footer"
import ModeSwitchPopup from "@/components/mode-switch-popup"
import WaveTransition from "./wave-transition"

gsap.registerPlugin(ScrollTrigger)

interface SwimmingModeProps {
  onBackToSelection: () => void
  onSwitchToFitness: () => void
}

export default function SwimmingMode({ onBackToSelection, onSwitchToFitness }: SwimmingModeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [showFitnessPopup, setShowFitnessPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [isSwitching, setIsSwitching] = useState(false)
  

  
  const handleSwitchModeClick = React.useCallback(() => {
    console.log('Switch mode button clicked in swimming mode')
    console.log('Showing fitness popup')
    setShowFitnessPopup(true)
  }, [])
  
  // Handle the actual mode switch with wave transition
  const handleConfirmSwitch = React.useCallback(() => {
    console.log('handleConfirmSwitch called in swimming mode')
    setShowFitnessPopup(false)
    setIsSwitching(true)
    
    // Wait for the wave animation to complete before switching modes
    const timer = setTimeout(() => {
      console.log('Executing onSwitchToFitness')
      onSwitchToFitness()
    }, 1500) // Slightly longer to ensure wave animation completes
    
    return () => clearTimeout(timer)
  }, [onSwitchToFitness])
  
  // Listen for the showModeSwitchPopup event
  useEffect(() => {
    const handleShowPopup = (e: CustomEvent) => {
      if (e.detail.mode === 'swimming') {
        console.log('Show mode switch popup event received in swimming mode')
        // Skip popup and directly trigger switch with wave animation
        handleConfirmSwitch()
      }
    }

    // @ts-ignore - CustomEvent type needs to be handled
    window.addEventListener('showModeSwitchPopup', handleShowPopup)
    
    return () => {
      // @ts-ignore
      window.removeEventListener('showModeSwitchPopup', handleShowPopup)
    }
  }, [handleConfirmSwitch])
  
  useEffect(() => {
    // Track scroll position for popup
    if (hasShownPopup) return;

    const handleScroll = () => {
      // Calculate how many sections have been scrolled through
      const sections = document.querySelectorAll('section');
      let visibleSections = 0;
      
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          visibleSections++;
        }
      });

      // Show popup after scrolling through 2 sections
      if (visibleSections >= 2 && !hasShownPopup) {
        setShowFitnessPopup(true);
        setHasShownPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownPopup]);

  useEffect(() => {
    // Add event listener for "Book Now" buttons only
    const handleBookNowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('[data-book-now="true"]')) {
        e.preventDefault()

        // Find the current section
        const sections = document.querySelectorAll("section")
        let activeSection = ""

        sections.forEach((section) => {
          const rect = section.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            activeSection = section.id || ""
          }
        })

        setCurrentSection(activeSection)
        setIsBookingModalOpen(true)
      }
    }

    document.addEventListener("click", handleBookNowClick)

    // Scroll listener for fitness mode popup - trigger at halfway point
    const handleScroll = () => {
      if (!hasShownPopup) {
        const scrollPosition = window.scrollY
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrollPercentage = scrollPosition / documentHeight

        if (scrollPercentage >= 0.5) {
          setShowFitnessPopup(true)
          setHasShownPopup(true)

          // Auto-hide after 5 seconds
          setTimeout(() => {
            setShowFitnessPopup(false)
          }, 5000)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Ensure ScrollTrigger is properly initialized
    ScrollTrigger.refresh()

    return () => {
      document.removeEventListener("click", handleBookNowClick)
      window.removeEventListener("scroll", handleScroll)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [hasShownPopup])

  const handleClosePopup = () => {
    setShowFitnessPopup(false)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-white text-slate-900">
      {/* Water background with canvas animation */}
      <div className="fixed inset-0 z-0">
        <EnhancedWaterBackground />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <SwimmingNavbar 
          onBackToSelection={onBackToSelection} 
          onBookNowClick={() => setIsBookingModalOpen(true)}
          onSwitchModeClick={handleSwitchModeClick}
        />

        {/* Add padding-top to ensure content is visible below fixed navbar */}
        <div className="pt-16 md:pt-20 space-y-16 md:space-y-24">
          <SwimmingHero />
          <ProgramsOverview />
          <SkillLevels />
          <Schedule />
          <Instructors />
          <Testimonials />
          <ContactForm />
          <Footer />
        </div>
      </div>

      {/* Mode Switch Popup - Keeping for potential future use */}
      <ModeSwitchPopup
        currentMode="swimming"
        onSwitchMode={handleConfirmSwitch}
        onClose={() => setShowFitnessPopup(false)}
        isVisible={showFitnessPopup && !isSwitching}
      />
      
      {/* Wave transition during mode switch */}
      <WaveTransition 
        isVisible={isSwitching}
        mode="swimming"
        onAnimationComplete={() => {
          console.log('Wave animation complete in swimming mode');
        }}
      />
      
      {/* Overlay during mode switch */}
      <AnimatePresence>
        {isSwitching && (
          <motion.div 
            className="fixed inset-0 bg-black/50 z-[9997]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        mode="swimming"
        currentSection={currentSection}
      />
    </div>
  )
}
