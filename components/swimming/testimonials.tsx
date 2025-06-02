"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Parent of Junior Swimmer",
      content:
        "My son has been taking lessons here for 6 months and his progress is remarkable. The instructors are patient, knowledgeable, and make learning fun. He went from being afraid of the water to swimming confidently in just a few months!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Adult Learner",
      content:
        "I finally learned to swim at 35 years old! The instructors created a comfortable environment where I never felt judged. Their step-by-step approach helped me overcome my fear of water. Now I swim laps regularly for exercise.",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Competitive Swimmer",
      content:
        "The coaching at Individual Medley has taken my competitive swimming to the next level. Their technical expertise and personalized training plans helped me improve my times significantly. I qualified for nationals this year!",
      rating: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Senior Swimmer",
      content:
        "The water aerobics classes are perfect for my needs. As a senior with arthritis, swimming has been the best exercise for me. The instructors are attentive and modify exercises to accommodate different ability levels.",
      rating: 4,
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToPrev = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      goToNext()
    } else if (touchEndX.current - touchStartX.current > 75) {
      goToPrev()
    }
  }

  // Auto-advance carousel
  useEffect(() => {
    if (!isAnimating) {
      animationRef.current = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % testimonials.length)
      }, 6000)
    }

    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current as unknown as number)
        animationRef.current = null
      }
    }
  }, [currentIndex, isAnimating, testimonials.length])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-12 sm:py-14 px-4 sm:px-6 bg-transparent relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-2">
            TESTIMONIALS
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-900 to-cyan-600 bg-clip-text text-transparent mb-2">
            What Our Swimmers Say
          </h2>
          <p className="text-sm text-sky-700 max-w-2xl mx-auto">
            Hear from our community about their swimming journey with us.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden sm:flex justify-between absolute top-1/2 -translate-y-1/2 left-0 right-0 -mx-4 z-10">
            <button
              onClick={goToPrev}
              className="bg-white/90 hover:bg-white text-sky-700 p-2 rounded-full shadow-md hover:scale-105 transition-all"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="bg-white/90 hover:bg-white text-sky-700 p-2 rounded-full shadow-md hover:scale-105 transition-all"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div 
            className="relative h-[380px] sm:h-[280px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35
                }}
                className="absolute inset-0 flex items-center px-2"
                onAnimationStart={() => {
                  setIsAnimating(true)
                  if (animationRef.current) clearTimeout(animationRef.current)
                }}
                onAnimationComplete={() => setIsAnimating(false)}
              >
                <div className="bg-white/95 rounded-xl shadow-lg p-6 w-full border border-sky-100">
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 flex-shrink-0">
                      <div className="relative w-full h-full">
                        <div className="w-full h-full rounded-xl overflow-hidden border-2 border-white shadow-sm">
                          <img
                            src={testimonials[currentIndex].image || "/placeholder.svg"}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-sky-500 rounded-full p-1 shadow">
                          <Quote className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 w-full text-center sm:text-left">
                      <div className="flex justify-center sm:justify-start gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < testimonials[currentIndex].rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sky-800 text-sm leading-relaxed line-clamp-3 mb-3">
                        "{testimonials[currentIndex].content}"
                      </p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-sky-900">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-sky-600 text-sm">
                            {testimonials[currentIndex].role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-4 mt-6 sm:hidden">
            <button
              onClick={goToPrev}
              className="bg-white text-sky-700 p-2 rounded-full shadow-md"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="bg-white text-sky-700 p-2 rounded-full shadow-md"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
