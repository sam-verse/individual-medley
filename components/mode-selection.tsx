"use client"

import { useRef, useEffect } from "react"
import { Waves, Dumbbell } from "lucide-react"
import { motion } from "framer-motion"

interface ModeSelectionProps {
  onModeSelect: (mode: string) => void
}

const ModeSelection = ({ onModeSelect }: ModeSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive background animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#0c4a6e") // Dark blue
    gradient.addColorStop(1, "#1e40af") // Royal blue

    // Wave parameters
    const waves = [
      { y: 0.6, amplitude: 15, frequency: 0.005, speed: 0.01, color: "rgba(186, 230, 253, 0.1)" },
      { y: 0.5, amplitude: 10, frequency: 0.003, speed: 0.008, color: "rgba(125, 211, 252, 0.1)" },
      { y: 0.7, amplitude: 8, frequency: 0.007, speed: 0.015, color: "rgba(56, 189, 248, 0.1)" },
    ]

    // Particles for dynamic effect
    const particles = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
      })
    }

    let time = 0

    // Animation function
    const animate = () => {
      time += 0.01
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y * canvas.height)

        for (let x = 0; x < canvas.width; x += 10) {
          const dx = x * wave.frequency
          const y = wave.y * canvas.height + Math.sin(dx + time * wave.speed) * wave.amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()
        ctx.fillStyle = wave.color
        ctx.fill()
      })

      // Draw particles
      particles.forEach((particle, index) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Reset particles that go off-screen
        if (particle.x < 0 || particle.x > canvas.width) {
          particles[index].speedX *= -1
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particles[index].speedY *= -1
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen flex flex-col items-center justify-center relative p-4 overflow-hidden"
    >
      {/* Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 px-4 py-4 md:px-10 md:py-6">
        <div className="container mx-auto flex items-center justify-between">
          {/*<div className="flex items-center gap-2">
           // <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Image
                src="/images/atom-logo.png"
                alt="Individual Medley"
                width={40}
                height={40}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Individual Medley</h1>
              <p className="text-xs text-sky-200">Swimming & Fitness</p>
            </div>
          </div>

          <button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2 rounded-full text-sm transition-all duration-300 shadow-lg shadow-blue-500/20">
            <span className="relative z-10">Join Now</span>
          </button>*/}
        </div>
      </header>

      {/* Content */}
      <div className="z-10 text-center mb-8 px-4 max-w-4xl mx-auto">
        {/* Logo above the text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">IM</div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-4 text-center"
        >
          Individual Medley
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-sky-200 max-w-2xl mx-auto text-center"
        >
          Choose your fitness journey. Dive into swimming excellence or power up with our fitness programs.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch justify-center z-10 w-full max-w-2xl px-4"
      >
        {/* Swimming Button */}
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeSelect("Swimming")}
          className="w-full sm:w-1/2 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl shadow-xl cursor-pointer overflow-hidden transform transition-all duration-300 border border-sky-400/30"
        >
          <div className="p-6 sm:p-8 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner shadow-sky-600/50">
              <Waves className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Swimming</h2>
            <p className="text-sky-100 mb-4 sm:mb-6 text-sm sm:text-base">
              Master the water with our expert swimming programs for all ages and skill levels.
            </p>
            <div className="mt-auto">
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-colors duration-300 text-sm sm:text-base">
                Explore Swimming
              </span>
            </div>
          </div>
        </motion.div>

        {/* Fitness Button */}
        <motion.div
          whileHover={{ scale: 1.03, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onModeSelect("Fitness")}
          className="w-full sm:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-xl cursor-pointer overflow-hidden transform transition-all duration-300 border border-blue-400/30"
        >
          <div className="p-6 sm:p-8 flex flex-col items-center text-center h-full">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-inner shadow-blue-600/50">
              <Dumbbell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Fitness</h2>
            <p className="text-blue-100 mb-4 sm:mb-6 text-sm sm:text-base">
              Transform your body with our high-intensity fitness programs tailored to your goals.
            </p>
            <div className="mt-auto">
              <span className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-white font-medium hover:bg-white/20 transition-colors duration-300 text-sm sm:text-base">
                Explore Fitness
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ModeSelection
