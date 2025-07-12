"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

export default function EnhancedWaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number | undefined>(undefined)
  const lastTime = useRef(0)
  const bubbles = useRef<Array<{
    x: number
    y: number
    radius: number
    speed: number
    opacity: number
    drift: number
    delay: number
  }>>([])
  const waveOffset = useRef(0)
  const waveAmplitude = useRef(12)
  const waveFrequency = useRef(0.008)
  const resizeObserver = useRef<ResizeObserver | undefined>(undefined)

  // Initialize bubbles
  const initBubbles = useCallback((width: number, height: number) => {
    bubbles.current = []
    const bubbleCount = Math.min(50, Math.floor((width * height) / 4000)) // Limit max bubbles for performance
    
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.current.push({
        x: Math.random() * width,
        y: height + Math.random() * 200, // Start below the viewport
        radius: 1.5 + Math.random() * 3.5,
        speed: 0.4 + Math.random() * 1.2,
        opacity: 0.05 + Math.random() * 0.15,
        drift: (Math.random() - 0.5) * 0.5, // Reduced horizontal drift
        delay: Math.random() * 1000 // Stagger bubble appearance
      })
    }
  }, [])

  // Animation loop
  const animate = useCallback((time: number) => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const deltaTime = time - lastTime.current
    lastTime.current = time
    
    // Clear canvas with semi-transparent background for motion blur effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    
    const dpr = window.devicePixelRatio || 1
    const width = canvas.width / dpr
    const height = canvas.height / dpr
    
    // Update wave offset for smooth animation
    waveOffset.current += 0.3
    if (waveOffset.current > 10000) waveOffset.current = 0
    
    // Draw water gradient with deeper colors
    const waterGradient = ctx.createLinearGradient(0, 0, 0, height)
    waterGradient.addColorStop(0, 'rgba(8, 47, 73, 0.9)') // Darker blue
    waterGradient.addColorStop(0.7, 'rgba(4, 23, 42, 0.95)') // Even darker blue
    waterGradient.addColorStop(1, 'rgba(2, 12, 27, 1)') // Darkest blue
    
    // Draw water surface with wave effect
    ctx.beginPath()
    ctx.moveTo(0, height * 0.7) // Start higher for more water surface
    
    const segments = 30 // More segments for smoother waves
    const segmentWidth = width / segments
    
    // Draw wave with Perlin-like noise
    for (let i = 0; i <= segments; i++) {
      const x = i * segmentWidth
      
      // Combine multiple sine waves for natural look
      const baseWave = Math.sin((x * waveFrequency.current) + (waveOffset.current * 0.008)) * waveAmplitude.current
      const detailWave = Math.sin((x * waveFrequency.current * 2.3) + (waveOffset.current * 0.012)) * (waveAmplitude.current * 0.6)
      const rippleWave = Math.sin((x * waveFrequency.current * 4.5) + (waveOffset.current * 0.02)) * (waveAmplitude.current * 0.3)
      
      // Add some randomness for organic feel
      const noise = Math.sin(x * 0.01 + waveOffset.current * 0.005) * 2
      
      const y = height * 0.7 + baseWave + detailWave * 0.6 + rippleWave * 0.3 + noise
      
      if (i === 0) {
        ctx.moveTo(x, y)
      } else {
        const prevX = (i - 1) * segmentWidth
        const cpx = prevX + (x - prevX) / 2
        const cpy = (y + (height * 0.7 + Math.sin((x - segmentWidth) * waveFrequency.current) * waveAmplitude.current)) / 2
        
        ctx.quadraticCurveTo(cpx, cpy, x, y)
      }
    }
    
    // Complete the path and fill
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    
    // Create a clipping region for the water surface
    ctx.save()
    ctx.clip()
    
    // Fill water with gradient
    ctx.fillStyle = waterGradient
    ctx.fill()
    
    // Add subtle wave highlights
    const highlightGradient = ctx.createLinearGradient(0, height * 0.5, 0, height * 0.8)
    highlightGradient.addColorStop(0, 'rgba(100, 180, 255, 0.15)')
    highlightGradient.addColorStop(0.5, 'rgba(50, 130, 200, 0.1)')
    highlightGradient.addColorStop(1, 'transparent')
    
    ctx.fillStyle = highlightGradient
    ctx.fill()
    
    // Add light rays effect
    const lightGradient = ctx.createRadialGradient(
      width * 0.7, 
      height * 0.3, 
      0, 
      width * 0.7, 
      height * 0.3, 
      Math.max(width, height) * 0.8
    )
    lightGradient.addColorStop(0, 'rgba(100, 200, 255, 0.1)')
    lightGradient.addColorStop(1, 'transparent')
    
    ctx.fillStyle = lightGradient
    ctx.fillRect(0, 0, width, height)
    
    // Restore clipping region
    ctx.restore()
    
    // Draw bubbles with optimized performance
    ctx.save()
    
    // Apply global composition for lighten effect
    ctx.globalCompositeOperation = 'lighter'
    
    const currentTime = performance.now()
    
    bubbles.current.forEach(bubble => {
      // Only update visible bubbles
      if (bubble.y + bubble.radius < 0 || bubble.y - bubble.radius > height) {
        return
      }
      
      // Skip animation if bubble is in delay period
      if (currentTime < bubble.delay) return
      
      // Update bubble position
      const timeFactor = (currentTime - bubble.delay) / 1000
      bubble.y -= bubble.speed * (deltaTime / 16) // Normalize speed by frame rate
      bubble.x += Math.sin(timeFactor * 0.5 + bubble.delay) * 0.5 // Subtle horizontal movement
      
      // Reset bubble if it goes off screen
      if (bubble.y < -bubble.radius * 2) {
        bubble.y = height + bubble.radius
        bubble.x = Math.random() * width
        bubble.delay = currentTime + Math.random() * 2000 // Random delay before reappearing
      }
      
      // Draw bubble with glow effect
      const gradient = ctx.createRadialGradient(
        bubble.x, 
        bubble.y - bubble.radius * 0.3,
        0,
        bubble.x, 
        bubble.y,
        bubble.radius * 2
      )
      
      gradient.addColorStop(0, `rgba(200, 240, 255, ${bubble.opacity * 0.9})`)
      gradient.addColorStop(0.7, `rgba(150, 220, 255, ${bubble.opacity * 0.5})`)
      gradient.addColorStop(1, 'transparent')
      
      // Draw bubble glow
      ctx.beginPath()
      ctx.arc(bubble.x, bubble.y, bubble.radius * 2, 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()
      
      // Draw bubble highlight
      ctx.beginPath()
      ctx.arc(
        bubble.x - bubble.radius * 0.3,
        bubble.y - bubble.radius * 0.3,
        bubble.radius * 0.4,
        0,
        Math.PI * 2
      )
      ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity * 0.9})`
      ctx.fill()
    })
    
    ctx.restore()
    
    // Schedule next frame
    animationFrameId.current = requestAnimationFrame(animate)
  }, [])

  // Initialize canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      // Scale the context to ensure crisp rendering on high-DPI displays
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(dpr, dpr)
      }
      
      // Adjust canvas CSS size to match display size
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      // Reinitialize bubbles on resize
      initBubbles(rect.width, rect.height)
    }

    // Initialize
    handleResize()
    
    // Use ResizeObserver for better performance than window resize
    resizeObserver.current = new ResizeObserver(handleResize)
    resizeObserver.current.observe(canvas.parentElement || document.body)
    
    // Start animation
    lastTime.current = performance.now()
    animationFrameId.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect()
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animate, initBubbles])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      style={{ willChange: 'opacity' }}
    />
  )
}
