"use client"

import type React from "react"

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

  const goToNext = () => {
    if (isAnimating) return
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const goToPrev = () => {
    if (isAnimating) return
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
    const interval = setInterval(() => {
      goToNext()
    }, 6000)

    return () => clearInterval(interval)
  }, [currentIndex])

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
    <section
      id="testimonials"
      className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-white to-sky-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-4"
          >
            What Our Swimmers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg lg:text-xl text-sky-700 max-w-3xl mx-auto px-4"
          >
            Hear from our community of swimmers about their experiences and achievements with our programs.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div
            className="relative h-[450px] md:h-[400px] lg:h-[350px] overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="wait"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute inset-0 flex items-center justify-center px-4"
                onAnimationStart={() => setIsAnimating(true)}
              >
                <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-sky-100 w-full max-w-3xl">
                  <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    {/* Profile Image and Info */}
                    <div className="flex flex-col items-center md:items-start flex-shrink-0">
                      <div className="relative mb-4">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-4 border-sky-100">
                          <img
                            src={testimonials[currentIndex].image || "/placeholder.svg"}
                            alt={testimonials[currentIndex].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-sky-500 rounded-full p-1">
                          <Quote className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        </div>
                      </div>

                      <div className="text-center md:text-left">
                        <h4 className="font-bold text-sky-900 text-lg md:text-xl">{testimonials[currentIndex].name}</h4>
                        <p className="text-sky-600 text-sm md:text-base">{testimonials[currentIndex].role}</p>
                        <div className="flex justify-center md:justify-start mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonials[currentIndex].rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-sky-800 italic text-base md:text-lg leading-relaxed">
                        "{testimonials[currentIndex].content}"
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={goToPrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-sky-800 p-2 md:p-3 rounded-2xl shadow-md z-10 transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-sky-800 p-2 md:p-3 rounded-2xl shadow-md z-10 transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-sky-600 w-4 md:w-6" : "bg-sky-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
