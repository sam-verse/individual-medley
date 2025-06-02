"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface Bubble {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
}

interface OceanBackgroundProps {
  className?: string;
}

export const OceanBackground: React.FC<OceanBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const bubbles = useRef<Bubble[]>([])
  const lastTime = useRef(0)

  // Initialize bubbles
  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const newBubbles: Bubble[] = []
    
    for (let i = 0; i < 30; i++) {
      newBubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.5
      })
    }
    
    bubbles.current = newBubbles
  }, [])

  const draw = useCallback((timestamp: number = 0) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Water gradient
    const waterGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    waterGradient.addColorStop(0, 'rgba(10, 30, 80, 0.9)')
    waterGradient.addColorStop(1, 'rgba(5, 15, 40, 0.95)')

    // Light rays
    const drawLightRays = () => {
      ctx.save()
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.05)')
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.01)')
      
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * canvas.width
        const y = canvas.height * 0.2
        const width = 1 + Math.random() * 2
        const height = canvas.height * 0.5
        
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x + width, y)
        ctx.lineTo(x + width + 20, y + height)
        ctx.lineTo(x + 20, y + height)
        ctx.closePath()
        
        ctx.fillStyle = gradient
        ctx.globalCompositeOperation = 'lighter'
        ctx.fill()
      }
      ctx.restore()
    }

    // Bubbles
    const drawBubbles = (time: number = 0) => {
      const bubbleCount = 30
      const bubbleSize = 10
      
      for (let i = 0; i < bubbleCount; i++) {
        const x = (i * (canvas.width / bubbleCount) + (time * 0.02) * 50) % (canvas.width + 100) - 50
        const y = canvas.height - (time * 0.5 + i * 30) % (canvas.height + 100)
        const size = 2 + Math.sin(time * 0.01 + i) * 2
        
        // Bubble shine
        const gradient = ctx.createRadialGradient(
          x - size * 0.3, y - size * 0.3, 0,
          x, y, size
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(0.8, 'rgba(100, 200, 255, 0.3)')
        gradient.addColorStop(1, 'rgba(0, 50, 100, 0)')
        
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Caustics effect
    const drawCaustics = (time: number) => {
      ctx.save()
      ctx.globalCompositeOperation = 'overlay'
      
      // Create a gradient for the caustics
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(100, 200, 255, 0.03)')
      gradient.addColorStop(1, 'rgba(100, 200, 255, 0.01)')
      
      // Draw wavy patterns
      const patternCanvas = document.createElement('canvas')
      const patternCtx = patternCanvas.getContext('2d')
      if (!patternCtx) return
      
      patternCanvas.width = 200
      patternCanvas.height = 200
      
      // Create a wavy pattern
      patternCtx.fillStyle = gradient
      patternCtx.beginPath()
      
      for (let x = 0; x < patternCanvas.width; x += 10) {
        const y = Math.sin(x * 0.2 + time * 0.005) * 15 + 100
        if (x === 0) {
          patternCtx.moveTo(x, y)
        } else {
          patternCtx.lineTo(x, y)
        }
      }
      
      patternCtx.lineTo(patternCanvas.width, patternCanvas.height)
      patternCtx.lineTo(0, patternCanvas.height)
      patternCtx.closePath()
      patternCtx.fill()
      
      // Create pattern and fill the canvas
      const pattern = ctx.createPattern(patternCanvas, 'repeat')
      if (pattern) {
        ctx.fillStyle = pattern
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      
      ctx.restore()
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw water background
    ctx.fillStyle = waterGradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    // Calculate delta time for smooth animation
    const deltaTime = timestamp - (lastTime.current || timestamp)
    lastTime.current = timestamp
    
    // Draw effects
    drawLightRays()
    drawCaustics(timestamp)
    
    // Update and draw bubbles
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      
      // Update bubbles
      bubbles.current.forEach(bubble => {
        bubble.y -= bubble.speed * (deltaTime / 16) // Normalize speed
        
        // Reset bubble to bottom if it goes off screen
        if (bubble.y < -bubble.size * 2) {
          bubble.y = canvasRef.current!.height + bubble.size
          bubble.x = Math.random() * canvasRef.current!.width
        }
        
        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2)
        
        // Bubble gradient
        const gradient = ctx.createRadialGradient(
          bubble.x - bubble.size * 0.3, 
          bubble.y - bubble.size * 0.3, 
          0,
          bubble.x, 
          bubble.y, 
          bubble.size
        )
        gradient.addColorStop(0, `rgba(255, 255, 255, ${bubble.opacity})`)
        gradient.addColorStop(0.8, `rgba(100, 200, 255, ${bubble.opacity * 0.8})`)
        gradient.addColorStop(1, 'rgba(0, 50, 100, 0)')
        
        ctx.fillStyle = gradient
        ctx.fill()
      })
    }
    
    // Continue animation
    animationFrameId.current = requestAnimationFrame(draw)
  }, [])

  // Setup and cleanup
  useEffect(() => {
    animationFrameId.current = requestAnimationFrame(draw)
    
    const handleResize = () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      draw()
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [draw])

  return (
    <motion.div 
      className="fixed inset-0 -z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </motion.div>
  )
}

export default OceanBackground
