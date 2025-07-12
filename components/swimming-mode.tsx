"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import SwimmingBackground from "@/components/swimming/swimming-background"
import SwimmingHero from "@/components/swimming/hero"
import SkillLevels from "@/components/swimming/skill-levels"
import Instructors from "@/components/swimming/instructors"
import Testimonials from "@/components/swimming/testimonials"
import SwimmingNavbar from "@/components/swimming/navbar"
import BookingModal from "@/components/booking-modal"
import Footer from "@/components/swimming/footer"
import ModeSwitchPopup from "@/components/mode-switch-popup"
import WaterLoading from "@/components/water-loading"

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
  const [loadingComplete, setLoadingComplete] = useState(false)
  

  
  const handleSwitchModeClick = React.useCallback(() => {
    console.log('Switch mode button clicked in swimming mode')
    console.log('Showing fitness popup')
    setShowFitnessPopup(true)
  }, [])
  
  // Handle the actual mode switch
  const handleConfirmSwitch = React.useCallback(() => {
    setShowFitnessPopup(false)
    setIsSwitching(true)
    setLoadingComplete(false)
    // Don't switch modes immediately - let the loading complete first
  }, [])
  
  useEffect(() => {
    if (isSwitching && loadingComplete) {
      onSwitchToFitness();
    }
  }, [isSwitching, loadingComplete, onSwitchToFitness])
  
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
    <div ref={containerRef} className="relative min-h-screen text-slate-900 bg-transparent">
      {/* Water background with canvas animation - fixed to viewport */}
      <SwimmingBackground />

      {/* Content */}
      <div className="relative z-10 bg-transparent">
        <SwimmingNavbar 
          onBackToSelection={onBackToSelection} 
          onBookNowClick={() => setIsBookingModalOpen(true)}
          onSwitchModeClick={handleSwitchModeClick}
        />

        {/* Main content container with minimal spacing */}
        <div className="pt-16 md:pt-20 bg-transparent">
          <SwimmingHero />
          <SkillLevels />
          <Instructors />
          <Testimonials />
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
      
      {/* Water Loading Animation during mode switch */}
      <WaterLoading 
        isVisible={isSwitching}
        onComplete={() => setLoadingComplete(true)}
      />

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
