"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function SwimmingHero() {
  const heroRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)

  const images = [
    "/placeholder.svg?height=1000&width=800",
    "/placeholder.svg?height=1000&width=800",
    "/placeholder.svg?height=1000&width=800",
    "/placeholder.svg?height=1000&width=800",
  ]

  useEffect(() => {
    // Carousel effect
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center py-16 md:py-20 px-4 md:px-10 overflow-hidden"
    >
      {/* Water-related background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/80 to-sky-50/50"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1000&width=1000')] bg-cover opacity-10"></div>

        {/* Animated water waves */}
        <div className="absolute bottom-0 left-0 right-0 h-32 md:h-64 overflow-hidden">
          <svg
            className="absolute bottom-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
            </defs>
            <g className="waves">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(14, 165, 233, 0.1)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(14, 165, 233, 0.05)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(14, 165, 233, 0.03)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(14, 165, 233, 0.02)" />
            </g>
          </svg>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center relative z-10">
        <div ref={textRef} className="z-10 text-center md:text-left order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-sky-900"
          >
            Dive Into Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl mb-6 md:mb-8 text-sky-700 max-w-lg mx-auto md:mx-0"
          >
            Experience the ultimate swimming coaching program designed for all ages and skill levels. Our expert
            instructors will guide you through personalized training to help you achieve your aquatic goals.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            <Button className="bg-sky-600 hover:bg-sky-700 text-white px-6 md:px-8 py-4 md:py-6 rounded-3xl text-base md:text-lg relative overflow-hidden group w-full sm:w-auto">
              <span className="relative z-10">Explore Programs</span>
              <span className="absolute inset-0 bg-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
            <Button
              variant="outline"
              className="border-sky-600 text-sky-600 hover:bg-sky-50 px-6 md:px-8 py-4 md:py-6 rounded-3xl text-base md:text-lg relative overflow-hidden group w-full sm:w-auto"
              data-book-now="true"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">Book a Trial</span>
              <span className="absolute inset-0 bg-sky-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </motion.div>
        </div>

        <div
          ref={imageRef}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2 mx-4 sm:mx-0"
        >
          <AnimatePresence mode="wait">
            {images.map(
              (src, index) =>
                currentImage === index && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 rounded-2xl overflow-hidden"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Swimming image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ),
            )}
          </AnimatePresence>

          {/* Enhanced overlay for better visibility */}
          <div className="absolute inset-0 bg-sky-500/20 z-10 rounded-2xl">
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                background: [
                  "linear-gradient(0deg, rgba(14,165,233,0.2) 0%, rgba(186,230,253,0.1) 100%)",
                  "linear-gradient(0deg, rgba(14,165,233,0.3) 0%, rgba(186,230,253,0.1) 100%)",
                  "linear-gradient(0deg, rgba(14,165,233,0.2) 0%, rgba(186,230,253,0.1) 100%)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          </div>

          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImage === index ? "bg-white w-6" : "bg-white/50"
                }`}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CSS for wave animation */}
      <style jsx>{`
        .waves {
          animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
        }
        @keyframes move-forever {
          0% {
            transform: translate3d(-90px, 0, 0);
          }
          100% {
            transform: translate3d(85px, 0, 0);
          }
        }
      `}</style>
    </section>
  )
}
