"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, AnimatePresence } from "framer-motion"
import FitnessBackground from "@/components/fitness-background"
import FitnessHero from "@/components/fitness/hero"
import TrainingPrograms from "@/components/fitness/training-programs"
import Trainers from "@/components/fitness/trainers"
import Nutrition from "@/components/fitness/nutrition"
import FitnessNavbar from "@/components/fitness/navbar"
import BookingModal from "@/components/booking-modal"
import Footer from "@/components/fitness/footer"
import ModeSwitchPopup from "@/components/mode-switch-popup"
import Testimonials from "@/components/fitness/testimonials"
import WaterLoading from "@/components/water-loading"

gsap.registerPlugin(ScrollTrigger)

interface FitnessModeProps {
  onBackToSelection: () => void
  onSwitchToSwimming: () => void
}

export default function FitnessMode({ onBackToSelection, onSwitchToSwimming }: FitnessModeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [showSwimmingPopup, setShowSwimmingPopup] = useState(false)
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [currentSection, setCurrentSection] = useState<string>("")
  const [isSwitching, setIsSwitching] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  
  // Handle the actual mode switch
  const handleConfirmSwitch = React.useCallback(() => {
    console.log('handleConfirmSwitch called')
    setShowSwimmingPopup(false)
    setIsSwitching(true)
    setLoadingComplete(false)
    
    // Don't switch modes immediately - let the loading complete first
    // The mode switch will be triggered by the loading completion
  }, [])

  // Listen for the showModeSwitchPopup event
  useEffect(() => {
    const handleShowPopup = (e: CustomEvent) => {
      if (e.detail.mode === 'fitness') {
        console.log('Show mode switch popup event received')
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

  // Track scroll position for popup
  useEffect(() => {
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
        setShowSwimmingPopup(true);
        setHasShownPopup(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShownPopup]);

  useEffect(() => {
    // Ensure ScrollTrigger is properly initialized
    ScrollTrigger.refresh()

    // Configure default ScrollTrigger settings to prevent content from disappearing
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    })

    // Force a scroll event to trigger ScrollTrigger refresh
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"))
      window.dispatchEvent(new Event("scroll"))

      // Refresh ScrollTrigger again after a delay to ensure all content is properly measured
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 500)
    }, 100)

    // Add event listener for "Book Now" buttons
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

    // Set up global ScrollTrigger defaults to make elements appear on scroll
    gsap.utils.toArray<HTMLElement>(".animate-on-scroll").forEach((element) => {
      gsap.fromTo(
        element,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        },
      )
    })

    // Scroll listener for swimming mode popup - trigger at halfway point
    const handleScroll = () => {
      if (!hasShownPopup) {
        const scrollPosition = window.scrollY
        const pageHeight = document.body.scrollHeight
        const windowHeight = window.innerHeight
        const scrollPercentage = scrollPosition / (pageHeight - windowHeight)

        if (scrollPercentage > 0.5 && !showSwimmingPopup) {
          setShowSwimmingPopup(true)
          setHasShownPopup(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      document.removeEventListener("click", handleBookNowClick)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [showSwimmingPopup])

  useEffect(() => {
    if (isSwitching && loadingComplete) {
      onSwitchToSwimming();
    }
  }, [isSwitching, loadingComplete, onSwitchToSwimming])

  const closeBookingModal = () => {
    setIsBookingModalOpen(false)
  }

  const closeModeSwitchPopup = () => {
    setShowSwimmingPopup(false)
  }

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#0a0a1a] text-white overflow-x-hidden">
      {/* Energetic background with canvas animation */}
      <div className="fixed inset-0 z-0">
        <FitnessBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <FitnessNavbar 
          onBackToSelection={onBackToSelection} 
          onBookNowClick={() => setIsBookingModalOpen(true)}
          onSwitchModeClick={() => setShowSwimmingPopup(true)}
        />

        {/* Add padding-top to ensure content is visible below fixed navbar */}
        <div className="pt-16 md:pt-20 space-y-8 md:space-y-16 lg:space-y-24 w-full">
          <div className="animate-on-scroll w-full">
            <FitnessHero />
          </div>

          <div id="programs" className="animate-on-scroll w-full">
            <TrainingPrograms />
          </div>

          <div id="trainers" className="animate-on-scroll w-full">
            <Trainers />
          </div>

          <div id="nutrition" className="animate-on-scroll w-full">
            <Nutrition />
          </div>

          <div className="animate-on-scroll w-full">
            <Testimonials />
          </div>

          <Footer />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={closeBookingModal}
        mode="fitness"
        currentSection={currentSection}
      />

      {/* Mode Switch Popup - Only show if not already switching */}
      {!isSwitching && (
        <ModeSwitchPopup
          key="fitness-mode-popup"
          currentMode="fitness"
          onSwitchMode={handleConfirmSwitch}
          onClose={() => setShowSwimmingPopup(false)}
          isVisible={showSwimmingPopup}
        />
      )}
      
      {/* Water Loading Animation during mode switch */}
      <WaterLoading 
        isVisible={isSwitching} 
        onComplete={() => setLoadingComplete(true)}
          />
    </div>
  )
}
