'use client'

import { useEffect, useRef } from 'react'

interface Bubble {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  startY: number
  maxHeight: number
}

const WaterBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameId = useRef<number>()
  const bubbles = useRef<Bubble[]>([])
  
  // Initialize canvas and bubbles
  const initCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    // Set canvas size to full viewport
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    
    // Create bubbles
    const bubbleCount = 50
    const newBubbles: Bubble[] = []
    
    for (let i = 0; i < bubbleCount; i++) {
      newBubbles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 100, // Start below the viewport
        startY: canvas.height,
        size: 2 + Math.random() * 8,
        speed: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.8,
        maxHeight: canvas.height * 1.5 // Bubbles will travel 1.5x viewport height
      })
    }
    
    bubbles.current = newBubbles
  }
  
  // Animation loop
  useEffect(() => {
    initCanvas()
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrameIdValue: number
    let lastTime = 0
    
    const animate = (time: number) => {
      const deltaTime = time - lastTime
      lastTime = time
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw water background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, '#f0f8ff')
      gradient.addColorStop(0.5, '#e0f0ff')
      gradient.addColorStop(1, '#d0e8ff')
      
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw bubbles
      bubbles.current = bubbles.current.map(bubble => {
        // Move bubble up
        const y = bubble.y - bubble.speed * (deltaTime / 16)
        
        // Slight horizontal movement
        const x = bubble.x + Math.sin(y * 0.01) * 0.5
        
        // Reset bubble if it goes above the top
        if (y < -bubble.size * 2) {
          return {
            ...bubble,
            x: Math.random() * canvas.width,
            y: canvas.height + Math.random() * 100,
            startY: canvas.height
          }
        }
        
        // Draw bubble
        ctx.save()
        ctx.globalAlpha = bubble.opacity
        
        // Bubble gradient
        const bubbleGradient = ctx.createRadialGradient(
          x, y - bubble.size * 0.3, 0,
          x, y, bubble.size
        )
        bubbleGradient.addColorStop(0, 'rgba(100, 180, 255, 0.8)')
        bubbleGradient.addColorStop(0.7, 'rgba(80, 160, 230, 0.6)')
        bubbleGradient.addColorStop(1, 'rgba(60, 140, 210, 0.2)')
        
        // Draw bubble
        ctx.beginPath()
        ctx.arc(x, y, bubble.size, 0, Math.PI * 2)
        ctx.fillStyle = bubbleGradient
        ctx.fill()
        
        // Bubble highlight
        ctx.beginPath()
        ctx.arc(
          x - bubble.size * 0.3,
          y - bubble.size * 0.3,
          bubble.size * 0.4,
          0,
          Math.PI * 2
        )
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.fill()
        
        ctx.restore()
        
        return { ...bubble, x, y }
      })
      
      animationFrameIdValue = requestAnimationFrame(animate)
    }
    
    animationFrameIdValue = requestAnimationFrame((time) => {
      lastTime = time
      animate(time)
    })
    
    // Handle window resize
    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      cancelAnimationFrame(animationFrameIdValue)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  useEffect(() => {
    initCanvas()
    
    const handleResize = () => {
      if (canvasRef.current) {
        initCanvas()
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [initCanvas])

  return (
    <div className="fixed inset-0 w-full h-full -z-10">
      <canvas
        ref={canvasRef}
        width={typeof window !== 'undefined' ? window.innerWidth : 0}
        height={typeof window !== 'undefined' ? window.innerHeight : 0}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none'
        }}
      />
    </div>
  )
}

export default WaterBackground
