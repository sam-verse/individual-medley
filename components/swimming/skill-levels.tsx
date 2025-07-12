"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronDown, Award, Target, TrendingUp, Trophy, Check, Info, Users, Star, Zap, Flame } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import EnhancedSkillLevels from "@/components/swimming/enhanced-skill-levels"

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
    name: "Beginner 1",
    icon: <Award className="w-5 h-5" />,
    description: "Start your swimming journey with water safety, floating, and basic movement.",
    skills: ["Water comfort", "Basic floating", "Face in water", "Simple kicks", "Pool entry/exit safety"],
    details: "Perfect for those taking their first strokes. Learn water safety, basic floating, and fundamental swimming techniques.",
    prerequisites: "No experience needed",
    progression: "2-4 weeks to next level",
    color: "bg-gradient-to-r from-blue-400 to-cyan-500",
    bgColor: "bg-white",
    textColor: "text-cyan-800",
    borderColor: "border-cyan-100",
    iconColor: "text-white",
    highlightColor: "from-blue-50 to-cyan-50",
    buttonHover: "hover:shadow-lg hover:shadow-blue-100"
  },
  {
    name: "Beginner 2",
    icon: <Users className="w-5 h-5" />,
    description: "Progress to gliding, breath control, and introduction to strokes.",
    skills: ["Gliding techniques", "Breath control", "Front/back float", "Kickboard drills", "Intro to freestyle"],
    details: "Build on basics with gliding, breath control, and more advanced floating.",
    prerequisites: "Beginner 1 or equivalent",
    progression: "2-4 weeks to next level",
    color: "bg-gradient-to-r from-cyan-500 to-emerald-400",
    bgColor: "bg-white",
    textColor: "text-emerald-800",
    borderColor: "border-emerald-100",
    iconColor: "text-white",
    highlightColor: "from-cyan-50 to-emerald-50",
    buttonHover: "hover:shadow-lg hover:shadow-emerald-100"
  },
  {
    name: "Intermediate 1",
    icon: <Target className="w-5 h-5" />,
    description: "Develop proper stroke techniques and increase water confidence.",
    skills: ["Freestyle basics", "Backstroke basics", "Treading water", "Streamline position", "Endurance drills"],
    details: "Focus on stroke development and water confidence.",
    prerequisites: "Beginner 2 or equivalent",
    progression: "3-5 weeks to next level",
    color: "bg-gradient-to-r from-emerald-400 to-teal-500",
    bgColor: "bg-white",
    textColor: "text-teal-800",
    borderColor: "border-teal-100",
    iconColor: "text-white",
    highlightColor: "from-emerald-50 to-teal-50",
    buttonHover: "hover:shadow-lg hover:shadow-teal-100"
  },
  {
    name: "Intermediate 2",
    icon: <TrendingUp className="w-5 h-5" />,
    description: "Refine strokes, learn breaststroke, and improve stamina.",
    skills: ["Freestyle refinement", "Backstroke refinement", "Breaststroke intro", "Flip turns", "Longer swims"],
    details: "Refine your technique and build stamina for advanced levels.",
    prerequisites: "Intermediate 1 or equivalent",
    progression: "3-5 weeks to next level",
    color: "bg-gradient-to-r from-teal-500 to-indigo-500",
    bgColor: "bg-white",
    textColor: "text-indigo-800",
    borderColor: "border-indigo-100",
    iconColor: "text-white",
    highlightColor: "from-teal-50 to-indigo-50",
    buttonHover: "hover:shadow-lg hover:shadow-indigo-100"
  },
  {
    name: "Advanced 1",
    icon: <Trophy className="w-5 h-5" />,
    description: "Master all four strokes and build endurance for longer swims.",
    skills: ["Butterfly basics", "Stroke efficiency", "Interval training", "Starts & turns", "Endurance sets"],
    details: "Master advanced strokes and build endurance.",
    prerequisites: "Intermediate 2 or equivalent",
    progression: "4-6 weeks to next level",
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    bgColor: "bg-white",
    textColor: "text-purple-800",
    borderColor: "border-purple-100",
    iconColor: "text-white",
    highlightColor: "from-indigo-50 to-purple-50",
    buttonHover: "hover:shadow-lg hover:shadow-purple-100"
  },
  {
    name: "Advanced 2",
    icon: <Star className="w-5 h-5" />,
    description: "Perfect advanced techniques and prepare for competition.",
    skills: ["Race strategies", "Advanced drills", "Starts & finishes", "Pace work", "Mental focus"],
    details: "Prepare for competition with advanced techniques and drills.",
    prerequisites: "Advanced 1 or equivalent",
    progression: "4-6 weeks to next level",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    bgColor: "bg-white",
    textColor: "text-pink-800",
    borderColor: "border-pink-100",
    iconColor: "text-white",
    highlightColor: "from-purple-50 to-pink-50",
    buttonHover: "hover:shadow-lg hover:shadow-pink-100"
  },
  {
    name: "Elite 1",
    icon: <Zap className="w-5 h-5" />,
    description: "Train for local and regional competitions with advanced sets.",
    skills: ["Race pace sets", "Starts & underwater", "Relay skills", "Competition prep", "Video analysis"],
    details: "Train for competitions with advanced sets and analysis.",
    prerequisites: "Advanced 2 or equivalent",
    progression: "6-8 weeks to next level",
    color: "bg-gradient-to-r from-pink-500 to-amber-400",
    bgColor: "bg-white",
    textColor: "text-amber-800",
    borderColor: "border-amber-100",
    iconColor: "text-white",
    highlightColor: "from-pink-50 to-amber-50",
    buttonHover: "hover:shadow-lg hover:shadow-amber-100"
  },
  {
    name: "Elite 2",
    icon: <Flame className="w-5 h-5" />,
    description: "High-intensity training for national-level competition and peak performance.",
    skills: ["High-intensity intervals", "Strength & conditioning", "Race simulation", "Nutrition guidance", "Peak performance coaching"],
    details: "Achieve peak performance with high-intensity training and coaching.",
    prerequisites: "Elite 1 or equivalent",
    progression: "Ongoing",
    color: "bg-gradient-to-r from-amber-400 to-orange-500",
    bgColor: "bg-white",
    textColor: "text-orange-800",
    borderColor: "border-orange-100",
    iconColor: "text-white",
    highlightColor: "from-amber-50 to-orange-50",
    buttonHover: "hover:shadow-lg hover:shadow-orange-100"
  }
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
      className="relative py-8 md:py-20 px-4 sm:px-6 overflow-hidden bg-transparent"
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
            <div className="inline-flex p-1 bg-white/80 backdrop-blur-sm rounded-full shadow-md border border-cyan-100 overflow-x-auto no-scrollbar gap-2">
              {levels.map((level, index) => {
                const isActive = activeLevel === index;
                return (
                <motion.button
                  key={index}
                    className={`flex flex-col items-center justify-center px-4 py-2 rounded-full transition-all duration-300 min-w-[80px] 
                      ${isActive ? `bg-gradient-to-r ${level.color} text-white shadow-lg border-2` : "bg-transparent text-cyan-800 hover:bg-cyan-50/70 hover:shadow-md border-2 border-transparent"}
                    `}
                    style={isActive ? { borderColor: getFromColor(level.color) } : { borderColor: 'transparent' }}
                    onClick={() => { setActiveLevel(index); setSelectedLevel(levels[index]); }}
                    whileHover={{ scale: isActive ? 1.05 : 1.04 }}
                    whileTap={{ scale: 0.97 }}
                >
                    <span className={`mb-1 ${isActive ? 'text-white' : level.textColor}`}>{level.icon}</span>
                    <span className={`text-xs font-semibold ${isActive ? 'text-white' : level.textColor}`}>{level.name.split(' ')[0]} <span className="font-normal">{level.name.split(' ')[1]}</span></span>
                </motion.button>
                );
              })}
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
                    </div>
                  </div>
                </div>

                {/* Right Column - Sidebar + Decorative Image */}
                <div className="md:w-80 flex-shrink-0 mt-2 md:mt-0 flex flex-col gap-6 items-center">
                  <div className="bg-cyan-50/50 rounded-xl p-4 border border-cyan-100/60 sticky top-4 w-full">
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
                  {/* Decorative Image for Desktop */}
                  <div className="hidden md:block w-full mt-4">
                    <img src="/images/img1.jpg" alt="Swimming" className="rounded-2xl w-full object-cover shadow-md" style={{ maxHeight: 180 }} />
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

function getFromColor(gradientClass: string): string {
  // Map Tailwind from-* classes to hex colors
  const colorMap: Record<string, string> = {
    'from-blue-400': '#60a5fa',
    'from-cyan-500': '#06b6d4',
    'from-emerald-400': '#34d399',
    'from-teal-500': '#14b8a6',
    'from-indigo-500': '#6366f1',
    'from-purple-500': '#a78bfa',
    'from-pink-500': '#ec4899',
    'from-amber-400': '#fbbf24',
  };
  const match = gradientClass.match(/from-[^ ]+/);
  return match ? colorMap[match[0]] || '#06b6d4' : '#06b6d4';
}