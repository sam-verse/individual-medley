"use client"

import { motion } from "framer-motion"
import { CheckCircle, Award, Users, Clock, Star, Zap } from "lucide-react"
import Image from "next/image"

export default function About() {
  const features = [
    {
      icon: <Award className="w-5 h-5" />,
      title: "Expert Instructors",
      description: "Certified professionals with years of experience in both swimming and fitness training."
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Personalized Training",
      description: "Custom programs tailored to your skill level and fitness goals."
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Flexible Scheduling",
      description: "Classes available throughout the day to fit your busy lifestyle."
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Premium Facilities",
      description: "State-of-the-art equipment and pristine swimming pools."
    }
  ]

  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "500+", label: "Happy Members" },
    { number: "50+", label: "Expert Coaches" },
    { number: "95%", label: "Success Rate" }
  ]

  return (
    <section className="relative py-20 bg-transparent overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl opacity-60"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl opacity-50"
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
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
              ABOUT US
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Where{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">
                Excellence
              </span>{" "}
              Meets{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">
                Innovation
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              At Individual Medley, we believe in pushing boundaries and redefining what's possible. 
              Our state-of-the-art facilities combine the best of swimming and fitness training, 
              creating an environment where every member can achieve their full potential.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="flex items-start space-x-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-sm">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[500px] sm:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-900/10 rounded-full filter blur-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-blue-900/10 rounded-full filter blur-3xl -z-10"></div>
              
              {/* Main Image Container */}
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/0 to-slate-900/20 rounded-2xl -rotate-2 scale-95"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/10 to-slate-900/20 rounded-2xl rotate-2 scale-95"></div>
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-800/20 bg-slate-900 backdrop-blur-sm">
                  <Image
                    src="/images/img11.jpg"
                    alt="Individual Medley Facility"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-200"
              >
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Premium Facility</span>
                </div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-blue-200"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">15+</div>
                  <div className="text-xs text-gray-600">Years Experience</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 