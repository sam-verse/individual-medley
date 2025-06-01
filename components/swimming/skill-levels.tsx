"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Award, Target, TrendingUp, Trophy } from "lucide-react"
import { motion } from "framer-motion"

export default function SkillLevels() {
  const sectionRef = useRef<HTMLElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [activeLevel, setActiveLevel] = useState(0)

  const levels = [
    {
      name: "Beginner",
      icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
      description:
        "For those new to swimming or with limited experience. Focus on water comfort, basic floating, and fundamental stroke development.",
      skills: ["Water comfort and safety", "Floating and gliding", "Basic freestyle and backstroke", "Breath control"],
      details:
        "Our beginner program creates a supportive environment where new swimmers can build confidence in the water. Classes maintain a low student-to-instructor ratio to ensure personalized attention and maximum safety. Through progressive skill building, students develop the foundational techniques needed for all swimming activities.",
      prerequisites: "No previous swimming experience required. Open to ages 3 and up.",
      progression: "Most beginners advance to the intermediate level after 8-12 weeks of consistent training.",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      textColor: "text-green-900",
      borderColor: "border-green-300",
      iconColor: "text-white",
    },
    {
      name: "Intermediate",
      icon: <Target className="w-6 h-6 md:w-8 md:h-8" />,
      description:
        "For swimmers who can swim at least 25 meters and are comfortable in deep water. Focus on technique refinement and endurance building.",
      skills: [
        "Refined freestyle and backstroke",
        "Introduction to breaststroke and butterfly",
        "Flip turns and diving",
        "Endurance training",
      ],
      details:
        "The intermediate program builds upon basic skills to develop proper technique across all four competitive strokes. Swimmers will improve their efficiency, endurance, and speed while learning competitive elements like starts, turns, and finishes. Classes include both technique drills and conditioning sets.",
      prerequisites: "Ability to swim 25 meters without stopping and comfort in deep water.",
      progression: "Intermediate swimmers typically advance to advanced level after 3-6 months of training.",
      color: "from-blue-400 to-sky-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-sky-50",
      textColor: "text-blue-900",
      borderColor: "border-blue-300",
      iconColor: "text-white",
    },
    {
      name: "Advanced",
      icon: <TrendingUp className="w-6 h-6 md:w-8 md:h-8" />,
      description:
        "For proficient swimmers looking to enhance performance. Focus on advanced techniques, race strategy, and competitive skills.",
      skills: [
        "Advanced stroke mechanics",
        "Race starts and turns",
        "Pace training and race strategy",
        "Competition preparation",
      ],
      details:
        "Our advanced program is designed for swimmers who have mastered the fundamentals and are ready for more challenging training. Sessions focus on refinement of technique, race-specific strategies, and building the physical and mental conditioning needed for competitive swimming. Video analysis and personalized feedback help swimmers reach their full potential.",
      prerequisites:
        "Proficiency in all four competitive strokes and ability to swim at least 200 meters continuously.",
      progression:
        "Advanced swimmers may progress to the Elite level based on performance metrics and coach recommendation.",
      color: "from-purple-400 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      textColor: "text-purple-900",
      borderColor: "border-purple-300",
      iconColor: "text-white",
    },
    {
      name: "Elite",
      icon: <Trophy className="w-6 h-6 md:w-8 md:h-8" />,
      description:
        "For competitive swimmers aiming for peak performance. Personalized training plans and advanced conditioning.",
      skills: [
        "Elite stroke refinement",
        "Advanced race strategy",
        "Specialized training plans",
        "Mental preparation and visualization",
      ],
      details:
        "The Elite program caters to competitive swimmers with serious performance goals. Training is highly personalized with individualized goal setting, periodized training plans, and comprehensive performance monitoring. Swimmers receive advanced coaching on technique, race strategy, nutrition, and mental preparation to maximize their competitive potential.",
      prerequisites: "Competitive swimming experience and coach recommendation required.",
      progression: "Elite swimmers often compete at regional, national, or international levels.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
      textColor: "text-yellow-900",
      borderColor: "border-yellow-300",
      iconColor: "text-white",
    },
  ]

  useEffect(() => {
    // Smooth transition animation
    if (sliderRef.current) {
      gsap.to(sliderRef.current, {
        x: `-${activeLevel * 100}%`,
        duration: 0.6,
        ease: "power2.out",
      })
    }
  }, [activeLevel])

  const handlePrev = () => {
    setActiveLevel((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setActiveLevel((prev) => (prev < levels.length - 1 ? prev + 1 : prev))
  }

  return (
    <section id="levels" ref={sectionRef} className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden">
      {/* Enhanced background with water-like patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50"></div>
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* Animated water bubbles */}
      <div className="absolute top-10 left-10 w-16 h-16 md:w-32 md:h-32 bg-sky-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 md:w-40 md:h-40 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-12 h-12 md:w-24 md:h-24 bg-indigo-300/20 rounded-full blur-xl animate-pulse delay-500"></div>
      <div className="absolute top-1/3 right-1/3 w-14 h-14 md:w-28 md:h-28 bg-sky-400/15 rounded-full blur-xl animate-pulse delay-700"></div>

      <div className="container mx-auto relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-4">Swimming Skill Levels</h2>
          <p className="text-base md:text-lg lg:text-xl text-sky-700 max-w-3xl mx-auto px-4">
            We offer programs for all skill levels, from beginners just getting comfortable in the water to elite
            swimmers training for competition.
          </p>
        </motion.div>

        {/* Level Selector */}
        <motion.div
          className="flex justify-center mb-6 md:mb-10 overflow-x-auto pb-2 px-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex p-1 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-sky-200 min-w-max gap-1">
            {levels.map((level, index) => (
              <motion.button
                key={index}
                className={`px-3 md:px-6 py-3 md:py-4 rounded-2xl text-xs md:text-base font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  activeLevel === index
                    ? `bg-gradient-to-r ${level.color} text-white shadow-lg transform scale-105`
                    : "text-sky-700 hover:bg-sky-50"
                }`}
                onClick={() => setActiveLevel(index)}
                whileHover={{ scale: activeLevel === index ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={activeLevel === index ? "text-white" : "text-sky-500"}>{level.icon}</span>
                <span className="hidden sm:inline">{level.name}</span>
                <span className="sm:hidden text-xs">{level.name.slice(0, 4)}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Level Content Slider */}
        <motion.div
          className="relative overflow-hidden bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl border border-sky-200"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={`h-2 bg-gradient-to-r ${levels[activeLevel].color}`}></div>
          <div
            ref={sliderRef}
            className="flex transition-transform duration-600 ease-out"
            style={{ width: `${levels.length * 100}%` }}
          >
            {levels.map((level, index) => (
              <div
                key={index}
                className="w-full px-4 md:px-8 py-6 md:py-8 flex-shrink-0"
                style={{ width: `${100 / levels.length}%`, minWidth: "100%" }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-r ${level.color} flex items-center justify-center mr-0 md:mr-4 mb-4 md:mb-0 shadow-lg`}
                  >
                    <span className="text-white">{level.icon}</span>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-sky-900">{level.name} Level</h3>
                    <p className="text-sky-600">Professional swimming training</p>
                  </div>
                </div>

                <p className="text-sky-700 mb-6 md:mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-center md:text-left">
                  {level.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h4 className="font-semibold text-sky-800 mb-4 text-base md:text-lg">Key Skills:</h4>
                    <div className="space-y-3">
                      {level.skills.map((skill, i) => (
                        <motion.div
                          key={i}
                          className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl ${level.bgColor} ${level.textColor} border ${level.borderColor} shadow-sm`}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r ${level.color} mr-2 md:mr-3`}
                            ></div>
                            <span className="text-xs md:text-sm">{skill}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h4 className="font-semibold text-sky-800 mb-2 text-sm md:text-base">Program Details:</h4>
                      <p className="text-sky-700 leading-relaxed text-xs md:text-sm lg:text-base">{level.details}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 md:gap-4">
                      <div className={`p-3 md:p-4 rounded-2xl ${level.bgColor} border ${level.borderColor}`}>
                        <h4 className="font-semibold text-sky-800 mb-2 text-xs md:text-sm">Prerequisites:</h4>
                        <p className="text-sky-700 text-xs md:text-sm">{level.prerequisites}</p>
                      </div>
                      <div className={`p-3 md:p-4 rounded-2xl ${level.bgColor} border ${level.borderColor}`}>
                        <h4 className="font-semibold text-sky-800 mb-2 text-xs md:text-sm">Progression:</h4>
                        <p className="text-sky-700 text-xs md:text-sm">{level.progression}</p>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className={`w-full bg-gradient-to-r ${level.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl py-2 md:py-3 text-sm md:text-base`}
                        data-book-now="true"
                      >
                        Join {level.name} Program
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.button
            className={`absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-sky-600 hover:bg-white transition-all duration-300 ${
              activeLevel === 0 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:scale-110"
            }`}
            onClick={handlePrev}
            disabled={activeLevel === 0}
            whileHover={{ scale: activeLevel === 0 ? 1 : 1.1 }}
            whileTap={{ scale: activeLevel === 0 ? 1 : 0.9 }}
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>

          <motion.button
            className={`absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-sky-600 hover:bg-white transition-all duration-300 ${
              activeLevel === levels.length - 1 ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:scale-110"
            }`}
            onClick={handleNext}
            disabled={activeLevel === levels.length - 1}
            whileHover={{ scale: activeLevel === levels.length - 1 ? 1 : 1.1 }}
            whileTap={{ scale: activeLevel === levels.length - 1 ? 1 : 0.9 }}
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </motion.button>

          {/* Progress Indicators */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 md:gap-2">
            {levels.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  activeLevel === index ? `bg-gradient-to-r ${levels[activeLevel].color}` : "bg-sky-200"
                }`}
                onClick={() => setActiveLevel(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
