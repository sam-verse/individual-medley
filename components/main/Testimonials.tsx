import { motion, AnimatePresence } from "framer-motion"
import React from "react"

const testimonials = [
  {
    name: "Sarah K.",
    role: "Swimming Parent",
    photo: "/placeholder-user.jpg",
    feedback: "The swimming coaches are absolutely incredible! My kids have grown so much in confidence and skill. The community here is like family - everyone is so supportive and encouraging.",
    rating: 5,
    program: "Swimming Programs"
  },
  {
    name: "James L.",
    role: "Fitness Enthusiast",
    photo: "/placeholder-user.jpg",
    feedback: "I've been to many gyms, but nothing compares to the personalized attention and cutting-edge programs here. I've never felt stronger or more motivated in my fitness journey!",
    rating: 5,
    program: "Fitness Training"
  },
  {
    name: "Priya S.",
    role: "Competitive Swimmer",
    photo: "/placeholder-user.jpg",
    feedback: "The competitive training program is world-class. The coaches understand exactly what it takes to excel at the highest level. I've achieved personal bests I never thought possible.",
    rating: 5,
    program: "Competitive Programs"
  },
  {
    name: "Michael R.",
    role: "Family Member",
    photo: "/placeholder-user.jpg",
    feedback: "As a family, we love the variety of programs available. From kids' swimming to family fitness classes, there's something for everyone. The facilities are immaculate!",
    rating: 5,
    program: "Family Programs"
  },
  {
    name: "Emma T.",
    role: "Rehabilitation Client",
    photo: "/placeholder-user.jpg",
    feedback: "The aquatic therapy program helped me recover from my injury faster than expected. The specialized training and attention to detail made all the difference in my recovery.",
    rating: 5,
    program: "Specialized Training"
  }
]

export default function Testimonials() {
  const [index, setIndex] = React.useState(0)
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="testimonials" className="relative w-full py-20 px-4 bg-transparent overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-20 w-48 h-48 bg-blue-200/30 rounded-full blur-2xl opacity-60"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 left-20 w-56 h-56 bg-cyan-200/20 rounded-full blur-2xl opacity-50"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm text-sm font-semibold text-blue-900 mb-2"
          >
            <span className="relative flex h-1.5 w-1.5 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
            Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-blue-700 mb-4"
          >
            Stories of
            <br />
            <span className="text-blue-600">Transformation</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real stories from our vibrant community of swimmers, fitness enthusiasts, and families 
            who have experienced the transformative power of our programs.
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-slate-100 relative overflow-hidden testimonial-pattern"
            >
              {/* Pattern overlay */}
              <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <svg width="100%" height="100%" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="dots-testimonial" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#38bdf8" fillOpacity="0.13" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#dots-testimonial)" />
                </svg>
              </div>
              {/* Animated gradient shimmer */}
              <motion.div
                aria-hidden
                className="absolute inset-0 z-0 pointer-events-none rounded-2xl"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ background: "linear-gradient(90deg, rgba(56,189,248,0.07) 0%, rgba(59,130,246,0.07) 50%, rgba(56,189,248,0.07) 100%)", backgroundSize: "200% 200%" }}
              />
              {/* Quote Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-4 right-4 text-6xl text-blue-200"
              >
                "
              </motion.div>

              <div className="relative z-10">
                {/* Rating Stars */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex justify-center mb-4"
                >
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                      className="text-lg text-yellow-400"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </motion.div>

                {/* Testimonial Content */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-lg text-slate-800 text-center leading-relaxed mb-6 font-medium"
                >
                  "{testimonials[index].feedback}"
                </motion.p>

                {/* Author Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.img
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      src={testimonials[index].photo}
                      alt={testimonials[index].name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 shadow-sm"
                    />
                    <div className="text-center">
                      <h4 className="text-lg font-bold text-slate-900">{testimonials[index].name}</h4>
                      <p className="text-slate-600 text-sm">{testimonials[index].role}</p>
                    </div>
                  </div>
                  
                  {/* Program Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-200"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                    <span className="text-xs font-medium text-blue-700">{testimonials[index].program}</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center gap-2 mt-6"
          >
            {testimonials.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setIndex(i)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === index ? 'bg-blue-600 scale-125' : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 