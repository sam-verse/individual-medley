"use client"

import { ShieldCheck, Users, Wrench } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import React from "react"

const services = [
  {
    tag: "Safety",
    image: "/images/img1.jpg",
    icon: <ShieldCheck className="w-6 h-6 text-cyan-700" />,
    tagColor: "from-cyan-400 to-blue-500"
  },
  {
    tag: "Fun",
    image: "/images/img3.jpg",
    icon: <Users className="w-6 h-6 text-blue-600" />,
    tagColor: "from-blue-400 to-cyan-500"
  },
  {
    tag: "Care",
    image: "/images/img22.jpg",
    icon: <Wrench className="w-6 h-6 text-sky-700" />,
    tagColor: "from-sky-400 to-blue-400"
  }
]

const titles = [
  "Lifeguard Supervision & Safety First",
  "Fun Aquatic Adventures for Kids",
  "Professional Pool Care Services"
]
const descriptions = [
  "We ensure your safety with certified lifeguards always on duty. Our team is trained in CPR, first-aid, and proactive risk prevention to give you peace of mind while you swim.",
  "Dive into fun! Our specially designed programs include aqua games, swim lessons for all levels, and recreational activities tailored to keep your children safe, engaged, and active.",
  "Keep your pools crystal clear! From routine cleaning to chemical balancing and equipment inspection, we offer reliable maintenance packages for homes, clubs, and institutions."
]

export default function Services() {
  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      {/* Faint Wave Pattern/Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-10 z-0">
        <Image src="/wave-pattern.svg" alt="wave pattern" fill className="object-cover object-center" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm text-sm font-semibold text-blue-900 mb-2"
          >
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            OTHER SERVICES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Other Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Explore our unique services for every swimmer, family, and facility. Safety, fun, and care—covered by the pros.
          </motion.p>
        </div>
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, i) => (
            <motion.div
              key={service.tag}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, type: "spring", stiffness: 120 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.04, boxShadow: "0 8px 40px 0 rgba(56,189,248,0.18)", borderColor: "#22d3ee" }}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-100 hover:border-cyan-400 flex flex-col items-center text-center p-0 min-h-[500px] overflow-hidden"
              style={{ minHeight: 500 }}
            >
              {/* Category Tag - bold, gradient, shadow */}
              <span className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r ${service.tagColor} text-white text-xs font-semibold shadow-lg border border-white/30 z-20`}>{service.tag}</span>
              {/* Image with overlays */}
              <div className="relative w-full h-56 overflow-hidden flex items-center justify-center group">
                <Image
                  src={service.image}
                  alt={titles[i]}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
                {/* Gradient overlay for vibrancy */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-blue-400/10 to-transparent" />
                {/* Glassy, gradient, or neon-glow icon circle top right */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-white/80 via-cyan-100 to-blue-100 border-2 border-cyan-300 shadow-lg p-3 ring-2 ring-cyan-200">
                    {service.icon}
                  </span>
                  {/* Soft floating bubble for flair */}
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-200 rounded-full opacity-60 blur-sm animate-pulse" />
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col flex-1 justify-between p-8 pt-6 w-full bg-white/70 backdrop-blur-xl rounded-b-2xl shadow-inner">
                <h3 className="text-xl font-bold text-blue-900 mb-3 mt-2">{titles[i]}</h3>
                <p className="text-gray-700 mb-6 text-base leading-relaxed flex-1">{descriptions[i]}</p>
                <a href="#contact" className="inline-block mt-auto px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-base focus:ring-4 focus:ring-cyan-300/40 hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.18)]">
                  Learn More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 