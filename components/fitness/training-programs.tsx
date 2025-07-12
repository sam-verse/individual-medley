"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap, Target, Users, Trophy, ArrowRight, Clock, Star, X } from "lucide-react"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

export default function TrainingPrograms() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll(".animate-on-scroll"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
          },
        },
      )
    }
  }, [])

  const programs = [
    {
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
      title: "HIIT Training",
      description: "High-intensity interval training for maximum calorie burn and cardiovascular improvement.",
      duration: "45 min",
      intensity: "High",
      participants: "8-12",
      benefits: [
        "Burns calories for hours after workout",
        "Improves cardiovascular health",
        "Builds lean muscle",
        "Increases metabolism",
      ],
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-500/30",
    },
    {
      icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Strength Training",
      description: "Build muscle mass and increase overall strength with progressive resistance training.",
      duration: "60 min",
      intensity: "Medium-High",
      participants: "6-10",
      benefits: ["Increases muscle mass", "Improves bone density", "Boosts metabolism", "Enhances functional strength"],
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30",
    },
    {
      icon: <Users className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Functional Fitness",
      description: "Real-world movement patterns to improve daily activities and prevent injuries.",
      duration: "50 min",
      intensity: "Medium",
      participants: "10-15",
      benefits: ["Improves daily movement", "Reduces injury risk", "Enhances balance", "Increases flexibility"],
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30",
    },
    {
      icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />,
      title: "Sports Fitness",
      description: "Sport-specific training to enhance athletic performance and competitive edge.",
      duration: "75 min",
      intensity: "Very High",
      participants: "4-8",
      benefits: [
        "Improves athletic performance",
        "Increases power output",
        "Enhances agility",
        "Builds mental toughness",
      ],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="programs" ref={sectionRef} className="py-12 md:py-16 lg:py-24 px-3 md:px-6 lg:px-10">
      <div className="container mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16 animate-on-scroll"
        >
          <div className="inline-block px-3 md:px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-xs md:text-sm font-medium mb-4">
            TRAINING PROGRAMS
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">TRANSFORM YOUR FITNESS</h2>
          <p className="text-sm md:text-lg lg:text-xl text-blue-300 max-w-3xl mx-auto px-4">
            Choose from our scientifically-designed programs tailored to your fitness goals and experience level.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className="animate-on-scroll"
            >
              <Card
                className={`${program.bgColor} backdrop-blur-sm border ${program.borderColor} p-4 md:p-6 h-full hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group cursor-pointer rounded-3xl`}
              >
                <motion.div
                  className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r ${program.color} flex items-center justify-center mb-4 md:mb-6 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 rounded-2xl`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {program.icon}
                </motion.div>

                <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {program.title}
                </h3>

                <p className="text-gray-300 mb-4 md:mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-sm md:text-base">
                  {program.description}
                </p>

                <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-blue-300 flex items-center">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Duration
                    </span>
                    <span className="text-white font-medium">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-blue-300 flex items-center">
                      <Zap className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Intensity
                    </span>
                    <span className="text-white font-medium">{program.intensity}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs md:text-sm">
                    <span className="text-blue-300 flex items-center">
                      <Users className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      Group Size
                    </span>
                    <span className="text-white font-medium">{program.participants}</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full bg-gradient-to-r ${program.color} text-white shadow-lg hover:shadow-xl group-hover:shadow-2xl transition-all duration-300 text-sm md:text-base py-2 md:py-3 rounded-2xl`}
                    data-book-now="true"
                  >
                    Start Training
                    <ArrowRight className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>

                <motion.button
                  className="w-full mt-2 md:mt-3 text-blue-400 hover:text-blue-300 text-xs md:text-sm transition-colors duration-300"
                  onClick={() => { setSelectedProgram(index); setIsModalOpen(true); }}
                  whileHover={{ scale: 1.02 }}
                >
                  {selectedProgram === index ? "Hide Details" : "View Benefits"}
                </motion.button>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 md:px-8 py-3 md:py-4 text-sm md:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
              data-book-now="true"
            >
              Book Your First Session
              <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for program details */}
      {isModalOpen && selectedProgram !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-navy-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative p-6 border border-blue-500/30"
            onClick={e => e.stopPropagation()}
          >
            <div className={`h-2 bg-gradient-to-r ${programs[selectedProgram].color} rounded-t-2xl mb-4`}></div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-navy-700 hover:bg-navy-600 text-gray-400 hover:text-white rounded-full p-2 shadow transition"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              <div className={`w-16 h-16 bg-gradient-to-r ${programs[selectedProgram].color} flex items-center justify-center text-white rounded-2xl shadow-lg mb-4`}>
                {programs[selectedProgram].icon}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2 text-center">{programs[selectedProgram].title}</h2>
              <p className="text-blue-200 mb-4 text-center">{programs[selectedProgram].description}</p>
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex items-center text-blue-300 text-sm"><Clock className="w-4 h-4 mr-1" /> {programs[selectedProgram].duration}</div>
                <div className="flex items-center text-blue-300 text-sm"><Zap className="w-4 h-4 mr-1" /> {programs[selectedProgram].intensity}</div>
                <div className="flex items-center text-blue-300 text-sm"><Users className="w-4 h-4 mr-1" /> {programs[selectedProgram].participants} participants</div>
              </div>
              <div className="w-full border-t border-blue-700 my-4"></div>
              <h4 className="text-base font-semibold text-blue-300 mb-2">Key Benefits:</h4>
              <ul className="space-y-2 mb-2">
                {programs[selectedProgram].benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start text-blue-100 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
