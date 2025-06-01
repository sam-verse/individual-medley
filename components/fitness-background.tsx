"use client"

import { useRef, useEffect } from "react"

export default function FitnessBackground() {
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

    // Create dark background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, "#020617") // Darker blue
    gradient.addColorStop(1, "#0a0a1a") // Navy blue
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add some static elements instead of animations
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const radius = Math.random() * 50 + 20

      // Draw subtle glow
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius)
      glow.addColorStop(0, "rgba(30, 64, 175, 0.2)") // Blue
      glow.addColorStop(1, "rgba(30, 64, 175, 0)") // Transparent

      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Static background elements */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 150 + 100,
            height: Math.random() * 150 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, rgba(30, 64, 175, 0.15) 0%, rgba(30, 64, 175, 0.05) 70%)`,
          }}
        />
      ))}
    </div>
  )
}
