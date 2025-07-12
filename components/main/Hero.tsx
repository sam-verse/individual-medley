"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Hero() {
  return (
    <section className="relative min-h-[110vh] w-full flex items-center justify-center overflow-hidden pt-24 bg-white">
      {/* Full-bleed background image with gradient overlay */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/img1.jpg"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-cyan-900/60 to-cyan-700/40" />
        {/* Subtle animated floating shape */}
        <motion.div
          className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-cyan-400/30 blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-3 px-5 py-2 bg-gradient-to-r from-blue-400/20 via-cyan-200/40 to-blue-100/60 shadow-lg backdrop-blur-md rounded-full border border-blue-300/60 mb-6"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        <span className="relative flex items-center justify-center w-3 h-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-60 animate-ping"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-700 shadow-md"></span>
        </span>
        <span className="text-sm font-semibold tracking-wide text-blue-900 drop-shadow-sm uppercase letter-spacing-wide">Individual Medley</span>
      </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-2 drop-shadow-xl"
          style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.03em' }}
        >
          Dive Into Excellence
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="block text-cyan-200 italic font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4" style={{ fontFamily: 'cursive, Inter, sans-serif' }}
        >
          Make Every Stroke Count
        </motion.span>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg sm:text-xl text-cyan-100/90 max-w-2xl mx-auto mb-8 font-medium drop-shadow"
        >
          Join a new wave of fitness and swimming. Where champions are made, and everyone belongs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.06, boxShadow: '0 4px 32px 0 rgba(34,211,238,0.25)' }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="inline-block"
          >
            <Button className="px-10 py-5 bg-cyan-500 text-white font-bold text-lg rounded-full shadow-2xl hover:bg-cyan-400 transition-all duration-300 focus:ring-4 focus:ring-cyan-300/40">
              Start Your Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 