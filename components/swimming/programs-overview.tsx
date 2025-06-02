"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Waves, Users, Trophy, Heart, ArrowRight, Clock, Target } from "lucide-react"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

export default function ProgramsOverview() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null)

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
      icon: <Waves className="w-8 h-8" />,
      title: "Learn to Swim",
      description: "Perfect for beginners who want to develop water confidence and basic swimming skills.",
      duration: "30 min",
      groupSize: "4-6",
      ageRange: "All ages",
      benefits: ["Water safety skills", "Basic stroke technique", "Breathing fundamentals", "Confidence building"],
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Stroke Development",
      description: "Improve technique and efficiency in all four competitive swimming strokes.",
      duration: "45 min",
      groupSize: "6-8",
      ageRange: "8+ years",
      benefits: ["Proper stroke mechanics", "Improved efficiency", "Competitive preparation", "Endurance building"],
      color: "from-emerald-400 to-teal-500",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Training",
      description: "High-intensity training for swimmers looking to compete at various levels.",
      duration: "60 min",
      groupSize: "8-12",
      ageRange: "10+ years",
      benefits: ["Race preparation", "Advanced techniques", "Mental toughness", "Performance optimization"],
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Aqua Fitness",
      description: "Low-impact water workouts that provide excellent cardiovascular and strength benefits.",
      duration: "45 min",
      groupSize: "10-15",
      ageRange: "16+ years",
      benefits: ["Low-impact exercise", "Full-body workout", "Joint-friendly", "Stress relief"],
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
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
    <section id="programs" ref={sectionRef} className="relative py-16 md:py-24 px-4 md:px-10 overflow-hidden">
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 animate-on-scroll"
        >
          <div className="inline-block px-4 py-1 bg-cyan-100/80 backdrop-blur-sm rounded-full text-cyan-800 text-sm font-medium mb-4 border border-cyan-200/50">
            SWIMMING PROGRAMS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-cyan-900 mb-4">DIVE INTO EXCELLENCE</h2>
          <p className="text-xl text-cyan-800/90 max-w-3xl mx-auto">
            From beginner lessons to competitive training, we offer comprehensive programs for every swimmer.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className="animate-on-scroll"
            >
              <Card
                className="bg-white/90 backdrop-blur-sm border border-cyan-200/50 p-6 h-full hover:shadow-2xl hover:shadow-cyan-200/30 transition-all duration-500 group cursor-pointer rounded-3xl hover:border-cyan-300/60"
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${program.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {program.icon}
                </motion.div>

                <h3 className="text-xl font-bold text-cyan-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">
                  {program.title}
                </h3>

                <p className="text-cyan-800/90 mb-6 leading-relaxed group-hover:text-cyan-900 transition-colors duration-300">
                  {program.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Duration
                    </span>
                    <span className="text-slate-900 font-medium">{program.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Group Size
                    </span>
                    <span className="text-slate-900 font-medium">{program.groupSize}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-600 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Age Range
                    </span>
                    <span className="text-slate-900 font-medium">{program.ageRange}</span>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className={`w-full bg-gradient-to-r ${program.color} text-white shadow-lg hover:shadow-xl group-hover:shadow-2xl transition-all duration-300 rounded-2xl`}
                    data-book-now="true"
                  >
                    Join Program
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </motion.div>

                <motion.button
                  className="w-full mt-3 text-blue-600 hover:text-blue-700 text-sm transition-colors duration-300"
                  onClick={() => setSelectedProgram(selectedProgram === index ? null : index)}
                  whileHover={{ scale: 1.02 }}
                >
                  {selectedProgram === index ? "Hide Benefits" : "View Benefits"}
                </motion.button>

                <motion.div
                  initial={false}
                  animate={{
                    height: selectedProgram === index ? "auto" : 0,
                    opacity: selectedProgram === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4 border-t border-blue-200 rounded-xl">
                    <h4 className="text-sm font-semibold text-blue-600 mb-2">Program Benefits:</h4>
                    <ul className="space-y-1">
                      {program.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm text-cyan-800/90 flex items-start"
                        >
                          <Waves className="w-3.5 h-3.5 text-cyan-600 mr-2 mt-0.5 flex-shrink-0" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl"
              data-book-now="true"
            >
              Start Your Swimming Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
