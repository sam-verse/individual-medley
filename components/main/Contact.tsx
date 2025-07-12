import { motion } from "framer-motion"
import React from "react"
import dynamic from "next/dynamic"
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Linkedin, Sparkles, Users } from "lucide-react"

// Create a client-side only form component
const ContactForm = dynamic(() => import('./ContactForm'), { ssr: false })

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 bg-transparent overflow-hidden">
      {/* Animated, Layered Backgrounds */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 left-24 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl z-0 opacity-60"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-24 right-24 w-96 h-96 bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl z-0 opacity-50"
      />
      {/* Animated Bubbles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30 - i * 10, 0],
            opacity: [0.18, 0.32, 0.18],
          }}
          transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
          className={`absolute z-0 rounded-full blur-2xl bg-cyan-300/20`} style={{
            width: `${32 + i * 8}px`,
            height: `${32 + i * 8}px`,
            left: `${10 + i * 10}%`,
            top: `${20 + (i % 3) * 18}%`,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl flex flex-col justify-center min-h-[80vh]">
        {/* Header Section - About-style */}
        <div className="text-center mb-10 relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm text-sm font-semibold text-blue-900 mb-2"
          >
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            CONTACT US
          </motion.div>
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
          >
            Where <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Connection</span> <br />
            Meets <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Community</span>
          </motion.h2>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto"
          >
            Reach out to us for any questions, support, or to join our vibrant community. <br />
            We're here to help you start your journey and make meaningful connections.
          </motion.p>
          {/* Pulse tagline */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-4 inline-flex items-center px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm text-sm font-semibold text-blue-900 animate-pulse"
          >
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            <Users className="w-3 h-3 mr-2" />
            <span>Join 500+ Happy Members</span>
          </motion.div>
        </div>

        {/* Subtle floating/animated background shape behind grid */}
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, -40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-cyan-200/20 via-blue-200/20 to-white/0 rounded-full blur-3xl z-0 pointer-events-none"
        />

        {/* Main Grid Layout with vertical divider */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch min-h-[500px] z-10">
          {/* Vertical divider for large screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-full w-1 z-20">
            <div className="h-full w-full bg-gradient-to-b from-cyan-200/0 via-cyan-300/40 to-blue-200/0 blur-md rounded-full" />
          </div>

          {/* Left: Contact Form (glassy, layered, animated border) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex flex-col justify-center h-full bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-12 border-2 border-blue-100 group overflow-hidden min-h-[480px] card-pattern"
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
              <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="dots-card" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#38bdf8" fillOpacity="0.13" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dots-card)" />
              </svg>
            </div>
            {/* Animated gradient shimmer */}
            <motion.div
              aria-hidden
              className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.07) 0%, rgba(59,130,246,0.07) 50%, rgba(56,189,248,0.07) 100%)", backgroundSize: "200% 200%" }}
            />
            {/* Animated border ring on hover/focus */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="pointer-events-none absolute inset-0 rounded-3xl border-4 border-cyan-400/30 group-hover:border-cyan-400/60 group-focus-within:border-cyan-400/80 animate-pulse z-10"
            />
            {/* Floating badge/tagline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -top-6 left-8 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full shadow-lg animate-pulse text-sm z-20"
            >
              <Sparkles className="w-4 h-4" />
              Let's Talk
            </motion.div>
            <div className="mb-6 mt-6 max-w-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Send us a Message</h3>
              <p className="text-blue-700 text-base mb-4">We'd love to hear from you and help you get started.</p>
            </div>
            <div className="max-w-xl">
              <ContactForm />
            </div>
            {/* Social proof/testimonial quote */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 shadow-inner text-blue-800 text-sm font-semibold flex items-center gap-2 max-w-xl"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              "The team at Individual Medley made it so easy to get started. Super friendly and responsive!" <span className="ml-auto italic text-blue-500 font-bold">— New Member</span>
            </motion.div>
          </motion.div>

          {/* Right: Editorial stack of Info, Map, Socials, and floating stat badge */}
          <div className="flex flex-col gap-8 h-full justify-between max-w-xl mx-auto lg:mx-0 relative">
            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -top-8 right-0 inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full shadow-lg animate-pulse text-sm z-30"
            >
              <Sparkles className="w-4 h-4" />
              Response in 24h
            </motion.div>
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-7 text-white shadow-2xl flex flex-col justify-between h-full border-2 border-blue-200/30 relative z-10 card-pattern"
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots-card" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#38bdf8" fillOpacity="0.13" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots-card)" />
                </svg>
              </div>
              {/* Animated gradient shimmer */}
              <motion.div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.07) 0%, rgba(59,130,246,0.07) 50%, rgba(56,189,248,0.07) 100%)", backgroundSize: "200% 200%" }}
              />
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-100" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Location</p>
                    <p className="text-blue-100 text-xs">123 Aquatic Drive, Wellness City</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-cyan-100" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Phone</p>
                    <p className="text-blue-100 text-xs">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-cyan-100" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Email</p>
                    <p className="text-blue-100 text-xs">info@individualmedley.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border-2 border-blue-100 flex flex-col justify-between h-full relative z-10 card-pattern"
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots-card" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#38bdf8" fillOpacity="0.13" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots-card)" />
                </svg>
              </div>
              {/* Animated gradient shimmer */}
              <motion.div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.07) 0%, rgba(59,130,246,0.07) 50%, rgba(56,189,248,0.07) 100%)", backgroundSize: "200% 200%" }}
              />
              <h3 className="text-xl font-bold text-blue-900 mb-4">Visit Us</h3>
              <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center text-blue-400 text-2xl mb-3">
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-blue-700 text-base text-center">Interactive map coming soon</p>
            </motion.div>

            {/* Social Links - premium style, ripple/glow on hover, original color scheme */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="bg-white/80 backdrop-blur-xl rounded-3xl p-7 shadow-xl border-2 border-blue-100 flex flex-col justify-between h-full relative z-10 card-pattern"
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots-card" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#38bdf8" fillOpacity="0.13" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots-card)" />
                </svg>
              </div>
              {/* Animated gradient shimmer */}
              <motion.div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none rounded-3xl"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.07) 0%, rgba(59,130,246,0.07) 50%, rgba(56,189,248,0.07) 100%)", backgroundSize: "200% 200%" }}
              />
              <h3 className="text-xl font-bold text-blue-900 mb-4">Follow Us</h3>
              <div className="flex gap-4 justify-start">
                {[
                  { icon: Instagram, label: "Instagram", href: "#", color: "hover:text-pink-500", iconColor: "text-pink-500" },
                  { icon: Facebook, label: "Facebook", href: "#", color: "hover:text-blue-500", iconColor: "text-blue-500" },
                  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-blue-400", iconColor: "text-blue-400" },
                  { icon: Linkedin, label: "LinkedIn", href: "#", color: "hover:text-blue-700", iconColor: "text-blue-700" }
                ].map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.12, y: -2, boxShadow: '0 2px 16px 0 rgba(56,189,248,0.22)', backgroundColor: '#e0f2fe' }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm border border-blue-100 transition-all duration-300 ${social.color} relative overflow-hidden`}
                      aria-label={social.label}
                    >
                      {/* Ripple/Glow effect */}
                      <span className="absolute inset-0 rounded-2xl pointer-events-none animate-pulse bg-cyan-400/10 group-hover:bg-cyan-400/20 z-0" />
                      <Icon className={`w-7 h-7 relative z-10 ${social.iconColor}`} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
} 