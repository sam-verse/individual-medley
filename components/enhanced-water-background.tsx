"use client"

import { useEffect, useRef } from "react"

export default function EnhancedWaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Water animation variables
    let time = 0
    const waves: Array<{
      amplitude: number
      frequency: number
      phase: number
      speed: number
      y: number
      opacity: number
    }> = []

    // Create multiple wave layers
    for (let i = 0; i < 5; i++) {
      waves.push({
        amplitude: 30 + Math.random() * 40,
        frequency: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: 0.02 + Math.random() * 0.03,
        y: window.innerHeight * 0.3 + i * 80,
        opacity: 0.1 + Math.random() * 0.2,
      })
    }

    // Bubble particles
    const bubbles: Array<{
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
    }> = []

    for (let i = 0; i < 20; i++) {
      bubbles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: 2 + Math.random() * 8,
        speed: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 150, 255, 0.1)")
      gradient.addColorStop(0.5, "rgba(0, 100, 200, 0.15)")
      gradient.addColorStop(1, "rgba(0, 50, 150, 0.2)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      waves.forEach((wave, index) => {
        ctx.beginPath()
        ctx.moveTo(0, wave.y)

        for (let x = 0; x <= canvas.width; x += 5) {
          const y = wave.y + Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.lineTo(0, canvas.height)
        ctx.closePath()

        const waveGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, canvas.height)
        waveGradient.addColorStop(0, `rgba(0, 150, 255, ${wave.opacity})`)
        waveGradient.addColorStop(1, `rgba(0, 100, 200, ${wave.opacity * 0.5})`)

        ctx.fillStyle = waveGradient
        ctx.fill()
      })

      // Draw bubbles
      bubbles.forEach((bubble) => {
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`
        ctx.fill()

        // Move bubbles up
        bubble.y -= bubble.speed
        if (bubble.y < -bubble.radius) {
          bubble.y = canvas.height + bubble.radius
          bubble.x = Math.random() * canvas.width
        }
      })

      time += 0.016
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)" }}
    />
  )
}
