import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "./Hero"
import About from "./About"
import Clubs from "./Clubs"
import Services from "./Services"
import Testimonials from "./Testimonials"
import Contact from "./Contact"
import Footer from "./Footer"
import SwimmingMode from "../swimming-mode"
import FitnessMode from "../fitness-mode"
import WaterLoading from "../water-loading"
import { Menu, X } from "lucide-react"

export default function MainPage() {
  const [currentMode, setCurrentMode] = useState<'main' | 'swimming' | 'fitness'>('main')
  const [isTransitioning, setIsTransitioning] = useState(false)
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleModeSwitch = (mode: 'swimming' | 'fitness') => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentMode(mode)
      setIsTransitioning(false)
    }, 300)
  }

  const handleBackToMain = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentMode('main')
      setIsTransitioning(false)
    }, 300)
  }

  // Smooth scroll to top when mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentMode])

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Global Animated White-Blue Gradient Background with Bubbles, Fog, and Motion Particles */}
      <motion.div
        aria-hidden
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff 0%, #e0f2fe 60%, #bae6fd 100%)' }}
      >
        {/* Blue fog effect (multiple, soft, animated blurred blobs) */}
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -60, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-20%] left-[-10%] w-[900px] h-[500px] bg-blue-300/20 rounded-full blur-[120px] opacity-60"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute bottom-[-15%] right-[-15%] w-[800px] h-[400px] bg-cyan-200/20 rounded-full blur-[100px] opacity-50"
        />
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut', delay: 10 }}
          className="absolute top-[30%] left-[10%] w-[600px] h-[300px] bg-blue-200/15 rounded-full blur-[90px] opacity-40"
        />
        <motion.div
          animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
          transition={{ duration: 55, repeat: Infinity, ease: 'easeInOut', delay: 15 }}
          className="absolute bottom-[20%] right-[20%] w-[500px] h-[250px] bg-cyan-300/15 rounded-full blur-[80px] opacity-35"
        />
        {/* Animated floating bubbles/dots */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, (i % 2 === 0 ? 1 : -1) * (60 + i * 10), 0],
              y: [0, (i % 2 === 0 ? -1 : 1) * (40 + i * 8), 0],
              opacity: [0.18, 0.32, 0.18],
            }}
            transition={{ duration: 18 + i * 2, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' }}
            className="absolute rounded-full blur-2xl bg-blue-300/30"
            style={{
              width: `${24 + i * 6}px`,
              height: `${24 + i * 6}px`,
              left: `${8 + (i * 9) % 80}%`,
              top: `${10 + (i * 13) % 70}%`,
            }}
          />
        ))}
        {/* Motion particles: small, glowing, animated dots */}
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              x: [0, (i % 3 - 1) * (120 + i * 7), 0],
              y: [0, (i % 2 === 0 ? 1 : -1) * (90 + i * 11), 0],
              opacity: [0.12, 0.32, 0.12],
            }}
            transition={{ duration: 22 + i * 1.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
            className={
              `absolute rounded-full pointer-events-none ` +
              (i % 3 === 0
                ? 'bg-blue-400/60'
                : i % 3 === 1
                ? 'bg-cyan-300/60'
                : 'bg-white/60')
            }
            style={{
              width: `${7 + (i % 4) * 2}px`,
              height: `${7 + (i % 4) * 2}px`,
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
              filter: 'blur(1.5px)',
              boxShadow: `0 0 8px 2px rgba(56,189,248,0.18)`
            }}
          />
        ))}
        {/* Subtle SVG dot pattern overlay, more transparent */}
        <div className="absolute inset-0 opacity-4 z-0">
          <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="#38bdf8" fillOpacity="0.05" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </motion.div>
      {/* Mode Navigation Bar - only show on main mode */}
      {currentMode === 'main' && (
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md h-16 border-b border-gray-100 shadow-sm"
        >
          <div className="py-2 pl-4 pr-4 flex items-center h-full justify-between w-full">
            <motion.div 
              className="flex flex-col items-start"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-tight flex items-center gap-3 select-none">
                <img src="/images/swimming-logo.png" alt="logo" className="w-12 h-12 mr-2" />
                Individual Medley
              </span> 
            </motion.div>
            {/* Desktop Mode Switch Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => handleModeSwitch('swimming')}
                className="px-5 py-2 rounded-full font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 transition-all border border-blue-200 shadow-sm"
              >
                Swimming Mode
              </button>
              <button
                onClick={() => handleModeSwitch('fitness')}
                className="px-5 py-2 rounded-full font-semibold text-cyan-700 bg-cyan-100 hover:bg-cyan-200 transition-all border border-cyan-200 shadow-sm"
              >
                Fitness Mode
              </button>
            </div>
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen((v) => !v)}
                className="p-2 rounded-full hover:bg-blue-100 transition-colors focus:outline-none"
                aria-label="Open menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-blue-900" /> : <Menu className="w-6 h-6 text-blue-900" />}
              </button>
            </div>
          </div>
          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white shadow-lg border-b border-gray-100 z-50 flex flex-col items-stretch md:hidden animate-fade-in">
              <button
                onClick={() => { setMobileMenuOpen(false); handleModeSwitch('swimming'); }}
                className="w-full px-6 py-4 text-left font-semibold text-blue-700 hover:bg-blue-50 border-b border-blue-100"
              >
                Swimming Mode
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); handleModeSwitch('fitness'); }}
                className="w-full px-6 py-4 text-left font-semibold text-cyan-700 hover:bg-cyan-50"
              >
                Fitness Mode
              </button>
            </div>
          )}
        </motion.nav>
      )}

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentMode === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className=""
          >
            <Hero />
            <About />
            <Clubs onModeSwitch={handleModeSwitch} />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
          </motion.div>
        )}

        {currentMode === 'swimming' && (
          <motion.div
            key="swimming"
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className=""
          >
            <SwimmingMode 
              onBackToSelection={handleBackToMain}
              onSwitchToFitness={() => handleModeSwitch('fitness')}
            />
          </motion.div>
        )}

        {currentMode === 'fitness' && (
          <motion.div
            key="fitness"
            initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className=""
          >
            <FitnessMode 
              onBackToSelection={handleBackToMain}
              onSwitchToSwimming={() => handleModeSwitch('swimming')}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extra smooth blurred overlay during transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="blur-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.32 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white/60 backdrop-blur-[6px] pointer-events-none"
          />
        )}
      </AnimatePresence>
      {/* Transition Overlay - WaterLoading animation */}
      <AnimatePresence>
        {isTransitioning && (
          <WaterLoading isVisible={true} onComplete={() => {}} />
        )}
      </AnimatePresence>
    </div>
  )
} 