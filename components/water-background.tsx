"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function WaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // Enhanced wave properties for a more dynamic water effect
    const waves = [
      { y: 0.3, amplitude: 15, frequency: 0.01, speed: 0.03, color: "rgba(186, 230, 253, 0.4)" }, // Light sky blue
      { y: 0.5, amplitude: 20, frequency: 0.008, speed: 0.02, color: "rgba(125, 211, 252, 0.4)" }, // Sky blue
      { y: 0.7, amplitude: 12, frequency: 0.015, speed: 0.04, color: "rgba(56, 189, 248, 0.4)" }, // Bright sky blue
    ]

    // Add bubbles for more water-like effect
    const bubbles: {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
    }[] = []

    for (let i = 0; i < 30; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        radius: Math.random() * 5 + 2,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }

    let animationFrameId: number
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create light background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#e0f7fa") // Very light cyan
      gradient.addColorStop(1, "#b3e5fc") // Light blue
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw enhanced waves
      waves.forEach((wave) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y * canvas.height)

        for (let x = 0; x < canvas.width; x += 5) {
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

      // Draw and update bubbles
      bubbles.forEach((bubble, index) => {
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`
        ctx.fill()

        // Add subtle glow
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius + 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity / 3})`
        ctx.fill()

        // Move bubble up
        bubble.y -= bubble.speed

        // Reset bubble if it goes off screen
        if (bubble.y < -bubble.radius * 2) {
          bubble.y = canvas.height + bubble.radius
          bubble.x = Math.random() * canvas.width
          bubble.radius = Math.random() * 5 + 2
          bubble.speed = Math.random() * 2 + 1
        }
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Additional floating elements with Framer Motion */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-sky-200/30"
          style={{
            width: Math.random() * 100 + 50,
            height: Math.random() * 100 + 50,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            scale: [1, Math.random() * 0.2 + 0.9, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
