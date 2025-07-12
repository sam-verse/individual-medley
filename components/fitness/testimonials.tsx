"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Card } from "@/components/ui/card"

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
    name: "Jessica Lee",
    role: "Personal Training Client",
    content:
      "Joining FitClub was the best decision for my health. The trainers are motivating and truly care about your progress. I've never felt stronger or more confident!",
    rating: 5,
    image: "/placeholder-user.jpg",
    video: "/videos/fitness-video.mp4",
  },
  {
    id: 2,
    name: "Carlos Martinez",
    role: "Group Fitness Enthusiast",
    content:
      "The group classes are energetic and fun! The community at FitClub keeps me coming back every week. Highly recommend for anyone looking to get fit and make friends.",
    rating: 5,
    image: "/placeholder-user.jpg",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Nutrition Coaching Client",
    content:
      "The nutrition guidance I received was life-changing. I learned how to fuel my body for performance and feel amazing every day.",
    rating: 5,
    image: "/placeholder-user.jpg",
    video: "/videos/fitness-video.mp4",
  },
  {
    id: 4,
    name: "Ethan Smith",
    role: "Strength Training Member",
    content:
      "The equipment is top-notch and the staff is always helpful. I've hit new personal records since joining FitClub!",
    rating: 4,
    image: "/placeholder-user.jpg",
  },
]

function TestimonialCard({ testimonial, active, faded, onClick }: { testimonial: Testimonial, active?: boolean, faded?: boolean, onClick?: () => void }) {
  return (
    <Card
      className={`bg-navy-800/80 backdrop-blur-sm border border-blue-900/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 px-4 py-8 sm:px-10 sm:py-10 flex flex-col sm:flex-row items-center gap-6 w-full mx-auto min-h-[340px] max-w-xl ${active ? "z-20" : "z-10"} ${faded ? 'opacity-50 scale-90 blur-[1px] pointer-events-auto' : 'opacity-100 scale-100 blur-0'} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {/* Media */}
      <div className="flex-shrink-0 w-full sm:w-56 flex flex-col items-center">
        {testimonial.video ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-blue-200 shadow bg-black mb-4">
            <video
              src={testimonial.video}
              poster={testimonial.image}
              controls
              className="w-full h-full object-cover rounded-2xl"
            />
            <span className="absolute top-2 left-2 bg-blue-500 rounded-full p-1.5 shadow">
              <Quote className="w-4 h-4 text-white" />
            </span>
          </div>
        ) : (
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border border-blue-200 shadow mb-4">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <span className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-1 shadow">
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
              className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
              fill={i < testimonial.rating ? "#facc15" : "none"}
            />
          ))}
        </div>
        <blockquote className="text-blue-100 text-base sm:text-lg leading-relaxed mb-4 italic font-medium">
          “{testimonial.content}”
        </blockquote>
        <div className="mt-2">
          <h4 className="font-bold text-white text-lg sm:text-xl">
            {testimonial.name}
          </h4>
          <p className="text-blue-400 text-xs sm:text-sm font-medium">
            {testimonial.role}
          </p>
        </div>
      </div>
    </Card>
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
    <section id="testimonials" className="relative py-16 md:py-20 px-4 sm:px-6 lg:px-10 bg-gradient-to-b from-navy-900/80 via-navy-900/90 to-navy-900/80 backdrop-blur-md overflow-hidden">
      <div className="container mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 animate-on-scroll"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-3 md:px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-xs md:text-sm font-medium mb-4"
          >
            TESTIMONIALS
          </motion.div>
          <motion.h2
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            WHAT OUR MEMBERS SAY
          </motion.h2>
          <motion.p
            className="text-sm md:text-lg lg:text-xl text-blue-300 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Hear from our fitness community about their transformation at FitClub.
          </motion.p>
        </motion.div>

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
              className="absolute left-0 z-10 bg-white/80 hover:bg-white/90 shadow-lg rounded-full p-2 sm:p-3 transition-all border border-blue-200 top-1/2 -translate-y-1/2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-blue-700" />
            </button>
            {/* Carousel cards */}
            <div className="w-full flex justify-center items-center relative overflow-hidden max-w-full">
              {/* Center card */}
              <TestimonialCard testimonial={testimonials[current]} active />
            </div>
            {/* Right arrow */}
            <button
              onClick={() => paginate(1)}
              className="absolute right-0 z-10 bg-white/80 hover:bg-white/90 shadow-lg rounded-full p-2 sm:p-3 transition-all border border-blue-200 top-1/2 -translate-y-1/2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-blue-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 