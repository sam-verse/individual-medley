import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "./Hero"
import About from "./About"
import Clubs from "./Clubs"
import Services from "./Services"
import Testimonials from "./Testimonials"
import Contact from "./Contact"
import Footer from "./Footer"

export default function MainPage() {
  const [currentMode, setCurrentMode] = useState<'main' | 'swimming' | 'fitness'>('main')
  const [isTransitioning, setIsTransitioning] = useState(false)

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
      {/* Mode Navigation Bar */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md h-16 border-b border-gray-100 shadow-sm"
      >
        <div className="py-2 pl-4 flex items-center h-full justify-start">
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
            {/* <span className="block w-12 h-1 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400" /> */}
          </motion.div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {currentMode === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <Hero />
            <About />
            <Clubs />
            <Services />
            <Testimonials />
            <Contact />
            <Footer />
          </motion.div>
        )}

        {currentMode === 'swimming' && (
          <motion.div
            key="swimming"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <SwimmingMode />
          </motion.div>
        )}

        {currentMode === 'fitness' && (
          <motion.div
            key="fitness"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <FitnessMode />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-2xl font-semibold text-blue-900"
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Placeholder components for mode switching
function SwimmingMode() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-cyan-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-blue-900 mb-4">🏊 Swimming Mode</h1>
        <p className="text-xl text-blue-700">Swimming mode content coming soon...</p>
      </motion.div>
    </div>
  )
}

function FitnessMode() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-green-900 mb-4">💪 Fitness Mode</h1>
        <p className="text-xl text-green-700">Fitness mode content coming soon...</p>
      </motion.div>
    </div>
  )
} 