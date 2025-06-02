"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronDown, Award, Target, TrendingUp, Trophy, Check, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SkillLevel {
  name: string
  icon: React.ReactNode
  description: string
  skills: string[]
  details: string
  prerequisites: string
  progression: string
  color: string
  bgColor: string
  textColor: string
  borderColor: string
  iconColor: string
  highlightColor: string
  buttonHover: string
}

const levels: SkillLevel[] = [
  {
    name: "Beginner",
    icon: <Award className="w-5 h-5" />,
    description: "For those new to swimming or with limited experience. Build confidence and learn fundamentals.",
    skills: ["Water comfort & safety", "Basic floating", "Intro to freestyle", "Breath control"],
    details: "Our beginner program creates a supportive environment where new swimmers can build confidence in the water through progressive skill development.",
    prerequisites: "No experience needed",
    progression: "8-12 weeks to next level",
    color: "bg-gradient-to-r from-teal-500 to-cyan-500",
    bgColor: "bg-white",
    textColor: "text-cyan-800",
    borderColor: "border-cyan-100",
    iconColor: "text-white",
    highlightColor: "from-teal-50 to-cyan-50",
    buttonHover: "hover:shadow-lg hover:shadow-teal-100"
  },
  {
    name: "Intermediate",
    icon: <Target className="w-5 h-5" />,
    description: "For swimmers comfortable in deep water. Refine technique and build endurance.",
    skills: ["Stroke refinement", "Breaststroke & butterfly", "Flip turns", "Endurance training"],
    details: "Build upon basic skills with proper technique across all four competitive strokes and learn competitive elements.",
    prerequisites: "Can swim 25m without stopping",
    progression: "3-6 months to advance",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    bgColor: "bg-white",
    textColor: "text-blue-800",
    borderColor: "border-blue-100",
    iconColor: "text-white",
    highlightColor: "from-blue-50 to-indigo-50",
    buttonHover: "hover:shadow-lg hover:shadow-blue-100"
  },
  {
    name: "Advanced",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "For experienced swimmers looking to compete or improve performance.",
    skills: ["Advanced stroke technique", "Race strategy", "Starts & turns", "Interval training"],
    details: "Advanced training focused on competitive swimming, endurance, and perfecting technique for all strokes.",
    prerequisites: "Can swim 100m of all four strokes",
    progression: "6-12 months to elite level",
    color: "bg-gradient-to-r from-purple-500 to-fuchsia-500",
    bgColor: "bg-white",
    textColor: "text-purple-800",
    borderColor: "border-purple-100",
    iconColor: "text-white",
    highlightColor: "from-purple-50 to-fuchsia-50",
    buttonHover: "hover:shadow-lg hover:shadow-purple-100"
  },
  {
    name: "Elite",
    icon: <Trophy className="w-5 h-5" />,
    description: "For competitive swimmers aiming for regional/national competitions.",
    skills: ["Race pace training", "Advanced conditioning", "Mental preparation", "Competition strategy"],
    details: "High-performance training program designed for competitive swimmers focusing on competition preparation and peak performance.",
    prerequisites: "Regional qualifying times",
    progression: "Ongoing training and competition",
    color: "bg-gradient-to-r from-amber-500 to-orange-500",
    bgColor: "bg-white",
    textColor: "text-amber-800",
    borderColor: "border-amber-100",
    iconColor: "text-white",
    highlightColor: "from-amber-50 to-orange-50",
    buttonHover: "hover:shadow-lg hover:shadow-amber-100"
  },
]

export default function SkillLevels() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeLevel, setActiveLevel] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel>(levels[0])

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleLevelChange = (index: number) => {
    setActiveLevel(index)
    setSelectedLevel(levels[index])
    setIsDropdownOpen(false)
  }

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  return (
    <section
      ref={sectionRef}
      id="skill-levels"
      className="relative py-8 md:py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-white to-cyan-50/20"
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-8 md:mb-14 px-2"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px 0px -50px 0px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-medium mb-3 border border-cyan-100/50">
            <Info className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
            <span>Skill Levels</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-900 mb-3 leading-tight">
            Find Your Perfect <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">Swim Level</span>
          </h2>
          <p className="text-sm sm:text-base text-cyan-700/90 max-w-2xl mx-auto">
            From first-time swimmers to competitive athletes, we have a program tailored to your skill level and goals.
          </p>
        </motion.div>

        {/* Mobile Level Selector */}
        {isMobile && (
          <motion.div 
            className="mb-6 px-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative w-full max-w-md mx-auto mb-8 md:hidden">
              <div className="relative">
                <button
                  type="button"
                  className={`w-full px-5 py-3.5 text-sm rounded-xl bg-white border-2 ${selectedLevel.borderColor} ${selectedLevel.textColor} font-medium text-left flex justify-between items-center transition-all shadow-sm hover:shadow-md`}
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="listbox"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${selectedLevel.color}`}></span>
                    <span>{selectedLevel.name} Level</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="py-1.5" role="listbox">
                      {levels.map((level, index) => (
                        <button
                          key={index}
                          className={`w-full px-5 py-3 text-sm text-left flex items-center transition-colors ${activeLevel === index ? 'bg-opacity-10 font-medium' : 'hover:bg-gray-50'}`}
                          style={{ 
                            backgroundColor: activeLevel === index ? `${level.textColor}15` : 'transparent',
                            color: activeLevel === index ? level.textColor : 'inherit'
                          }}
                          onClick={() => handleLevelChange(index)}
                          role="option"
                          aria-selected={activeLevel === index}
                        >
                          <span className={`w-2.5 h-2.5 rounded-full mr-3 ${level.color}`}></span>
                          <span>{level.name} Level</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Desktop Level Tabs */}
        {!isMobile && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex p-0.5 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-cyan-100 overflow-x-auto no-scrollbar">
              {levels.map((level, index) => (
                <motion.button
                  key={index}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-1.5 ${
                    activeLevel === index
                      ? `bg-gradient-to-r ${level.color} text-white shadow-sm`
                      : "text-cyan-700 hover:bg-cyan-50/50"
                  }`}
                  onClick={() => setActiveLevel(index)}
                  whileHover={{ scale: activeLevel === index ? 1 : 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={activeLevel === index ? "text-white" : level.textColor}>
                    {level.icon}
                  </span>
                  {level.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Level Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`${selectedLevel.bgColor} rounded-2xl shadow-md border ${selectedLevel.borderColor} overflow-hidden transition-all duration-300 hover:shadow-lg`}
          >
            <div className={`h-1.5 ${selectedLevel.color} transition-all duration-300`}></div>
            
            <div className="p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                {/* Left Column - Main Content */}
                <div className="flex-1">
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-2xl ${selectedLevel.color} flex items-center justify-center text-white shadow-md flex-shrink-0`}>
                      {React.isValidElement(selectedLevel.icon) && (
                        React.cloneElement(selectedLevel.icon as React.ReactElement<{ className?: string }>, { 
                          className: `w-4 h-4 sm:w-4.5 sm:h-4.5 ${selectedLevel.iconColor}`
                        })
                      )}
                    </div>
                    <div>
                      <h3 className={`text-lg sm:text-xl font-bold ${selectedLevel.textColor} leading-tight`}>{selectedLevel.name} Level</h3>
                      <p className={`text-sm ${selectedLevel.textColor}/80 mt-1`}>{selectedLevel.description}</p>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h4 className="font-semibold text-sm text-cyan-800 mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />
                        <span>What You'll Learn</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedLevel.skills.map((skill, i) => (
                          <motion.div
                            key={i}
                            className="flex items-start gap-2.5 p-3 bg-cyan-50/50 rounded-xl border border-cyan-100/60 text-sm"
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Check className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-cyan-500" />
                            <span className="text-cyan-800 leading-snug">{skill}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl border ${selectedLevel.highlightColor} ${selectedLevel.borderColor}`}>
                        <h4 className={`font-semibold text-sm ${selectedLevel.textColor} mb-2.5`}>Program Details</h4>
                        <p className={`${selectedLevel.textColor}/80 text-sm leading-relaxed`}>
                          {selectedLevel.details}
                        </p>
                      </div>

                      <div className={`rounded-xl p-4 border ${selectedLevel.highlightColor} ${selectedLevel.borderColor} sticky top-4`}>
                        <div className="space-y-4">
                          <div>
                            <h4 className={`text-xs font-semibold uppercase tracking-wider ${selectedLevel.textColor}/80 mb-2`}>Prerequisites</h4>
                            <p className={`text-sm ${selectedLevel.textColor} leading-relaxed`}>{selectedLevel.prerequisites}</p>
                          </div>
                          <div>
                            <h4 className={`text-xs font-semibold uppercase tracking-wider ${selectedLevel.textColor}/80 mb-2`}>Progression</h4>
                            <p className={`text-sm ${selectedLevel.textColor} leading-relaxed`}>{selectedLevel.progression}</p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            className="pt-1"
                          >
                            <Button
                              className={`w-full ${selectedLevel.color} ${selectedLevel.buttonHover} transition-all text-sm h-12 rounded-xl font-medium text-white hover:-translate-y-0.5`}
                              size="sm"
                              data-book-now="true"
                            >
                              Join {selectedLevel.name}
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Sidebar */}
                <div className="md:w-64 flex-shrink-0 mt-2 md:mt-0">
                  <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100/60 sticky top-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-600/90 mb-2">Prerequisites</h4>
                        <p className="text-sm text-cyan-800 leading-relaxed">{selectedLevel.prerequisites}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-600/90 mb-2">Progression</h4>
                        <p className="text-sm text-cyan-800 leading-relaxed">{selectedLevel.progression}</p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="pt-1"
                      >
                        <Button
                          className={`w-full ${selectedLevel.color} ${selectedLevel.buttonHover} transition-all text-sm h-12 rounded-xl font-medium text-white hover:-translate-y-0.5`}
                          size="sm"
                          data-book-now="true"
                        >
                          Join {selectedLevel.name}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </motion.div>
        </AnimatePresence>


      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>
    </section>
  )
}