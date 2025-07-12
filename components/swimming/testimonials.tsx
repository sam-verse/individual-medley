"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  video?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Parent of Junior Swimmer",
    content:
      "My son has been taking lessons here for 6 months and his progress is remarkable. The instructors are patient, knowledgeable, and make learning fun. He went from being afraid of the water to swimming confidently in just a few months!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    video: "/videos/swimming-video.mp4",
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
    video: "/videos/fitness-video.mp4",
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

function TestimonialCard({ testimonial, active, faded, onClick }: { testimonial: Testimonial, active?: boolean, faded?: boolean, onClick?: () => void }) {
  return (
    <motion.div
      whileHover={active ? { scale: 1.02, boxShadow: "0 8px 32px 0 rgba(0, 120, 255, 0.10)" } : {}}
      whileTap={active ? { scale: 0.98 } : {}}
      className={`transition-all duration-300 relative bg-white/60 border border-sky-100/70 shadow-lg rounded-3xl px-4 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center gap-6 w-full mx-auto min-h-[340px] max-w-xl ${active ? "z-20" : "z-10"} ${faded ? 'opacity-50 scale-90 blur-[1px] pointer-events-auto' : 'opacity-100 scale-100 blur-0'} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Media */}
      <div className="flex-shrink-0 w-full sm:w-56 flex flex-col items-center">
        {testimonial.video ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-sky-100 shadow bg-black mb-4">
            <video
              src={testimonial.video}
              poster={testimonial.image}
              controls
              className="w-full h-full object-cover rounded-2xl"
            />
            <span className="absolute top-2 left-2 bg-sky-500 rounded-full p-1.5 shadow">
              <Quote className="w-4 h-4 text-white" />
            </span>
          </div>
        ) : (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-sky-100 shadow mb-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute -bottom-1 -right-1 bg-sky-500 rounded-full p-1 shadow">
              <Quote className="w-3 h-3 text-white" />
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex-1 flex flex-col justify-center items-center sm:items-start text-center sm:text-left">
        <div className="flex gap-1 mb-2 justify-center sm:justify-start">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating ? "text-sky-500 fill-sky-400" : "text-gray-200"}`}
            />
          ))}
        </div>
        <blockquote className="text-sky-900 text-base sm:text-lg leading-relaxed mb-4 italic font-medium">
          “{testimonial.content}”
        </blockquote>
        <div className="mt-2">
          <h4 className="font-bold text-sky-900 text-lg sm:text-xl">
            {testimonial.name}
          </h4>
          <p className="text-sky-600 text-xs sm:text-sm font-medium">
            {testimonial.role}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const paginate = (dir: number) => {
    setCurrent((prev) => {
      let next = prev + dir
      if (next < 0) next = testimonials.length - 1
      if (next >= testimonials.length) next = 0
      return next
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) paginate(1)
    else if (touchEndX.current - touchStartX.current > 50) paginate(-1)
  }

  // Helper to get indices for prev/next
  const prev = (current - 1 + testimonials.length) % testimonials.length
  const next = (current + 1) % testimonials.length

  return (
    <section id="testimonials" className="relative py-16 px-2 sm:px-6 bg-transparent overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center overflow-hidden">
        <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-4 py-1 rounded-full mb-4 tracking-wide shadow-sm">
          TESTIMONIALS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-sky-900 text-center mb-2">
          What Our Swimmers Say
        </h2>
        <p className="text-base text-sky-700 text-center mb-8 max-w-xl">
          Hear from our community about their swimming journey with us.
        </p>

        {/* Carousel */}
        <div className="relative w-full flex flex-col items-center overflow-hidden">
          <div
            className="w-full flex justify-center items-center lg:gap-6 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left arrow */}
            <button
              onClick={() => paginate(-1)}
              className="absolute left-0 z-10 bg-white/80 hover:bg-white/90 shadow-lg rounded-full p-2 sm:p-3 transition-all border border-sky-100 top-1/2 -translate-y-1/2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-sky-700" />
            </button>
            {/* Carousel cards */}
            <div className="w-full flex justify-center items-center relative overflow-hidden max-w-full">
             
              {/* Center card */}
              <TestimonialCard testimonial={testimonials[current]} active />
          
            </div>
            {/* Right arrow */}
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 z-10 bg-white/80 hover:bg-white/90 shadow-lg rounded-full p-2 sm:p-3 transition-all border border-sky-100 top-1/2 -translate-y-1/2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-sky-700" />
            </button>
          </div>

          {/* Avatar navigation */}
          <div className="flex justify-center gap-3 mt-8">
       
          </div>
        </div>
      </div>
    </section>
  )
}
