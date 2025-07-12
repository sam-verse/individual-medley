"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Check, Award, AwardIcon, Trophy, Star, Zap, Users, Clock, Hourglass, UserCircle2 } from "lucide-react"

interface ClassScheduleItem {
  id: number
  name: string
  time: string
  duration: string
  instructor: string
  level: string
  capacity: string
  availability: "available" | "limited" | "full"
}

export default function Schedule() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const [activeDay, setActiveDay] = useState("Monday")
  const [activeFilter, setActiveFilter] = useState("all")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getLevelIcon = (level: string, className: string) => {
    switch (level) {
      case 'beginner':
        return <Star className={className} />
      case 'intermediate':
        return <AwardIcon className={className} />
      case 'advanced':
        return <Zap className={className} />
      default:
        return <Award className={className} />
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'all':
        return 'All Levels'
      case 'beginner':
        return 'Beginner'
      case 'intermediate':
        return 'Intermediate'
      case 'advanced':
        return 'Advanced'
      default:
        return 'All Levels'
    }
  }

  const scheduleData: Record<string, ClassScheduleItem[]> = {
    Monday: [
      {
        id: 1,
        name: "Learn to Swim (Kids)",
        time: "3:30 PM - 4:15 PM",
        duration: "45 min",
        instructor: "Emily Chen",
        level: "beginner",
        capacity: "6 students",
        availability: "limited",
      },
      {
        id: 2,
        name: "Adult Beginner",
        time: "5:30 PM - 6:30 PM",
        duration: "60 min",
        instructor: "Marcus Johnson",
        level: "beginner",
        capacity: "8 students",
        availability: "available",
      },
      {
        id: 3,
        name: "Competitive Training",
        time: "6:45 PM - 8:15 PM",
        duration: "90 min",
        instructor: "Alex Rivera",
        level: "advanced",
        capacity: "12 students",
        availability: "available",
      },
    ],
    Tuesday: [
      {
        id: 4,
        name: "Adaptive Swimming",
        time: "10:00 AM - 11:00 AM",
        duration: "60 min",
        instructor: "Sofia Rodriguez",
        level: "all",
        capacity: "4 students",
        availability: "limited",
      },
      {
        id: 5,
        name: "Stroke Improvement",
        time: "4:00 PM - 5:00 PM",
        duration: "60 min",
        instructor: "Alex Rivera",
        level: "intermediate",
        capacity: "8 students",
        availability: "available",
      },
      {
        id: 6,
        name: "Masters Swim",
        time: "7:00 PM - 8:30 PM",
        duration: "90 min",
        instructor: "Marcus Johnson",
        level: "advanced",
        capacity: "15 students",
        availability: "available",
      },
    ],
    Wednesday: [
      {
        id: 7,
        name: "Parent & Tot",
        time: "9:30 AM - 10:15 AM",
        duration: "45 min",
        instructor: "Emily Chen",
        level: "beginner",
        capacity: "8 pairs",
        availability: "available",
      },
      {
        id: 8,
        name: "Youth Stroke Development",
        time: "4:30 PM - 5:30 PM",
        duration: "60 min",
        instructor: "Emily Chen",
        level: "intermediate",
        capacity: "10 students",
        availability: "full",
      },
      {
        id: 9,
        name: "Adult Technique",
        time: "6:00 PM - 7:00 PM",
        duration: "60 min",
        instructor: "Marcus Johnson",
        level: "intermediate",
        capacity: "8 students",
        availability: "limited",
      },
    ],
    Thursday: [
      {
        id: 10,
        name: "Senior Aqua Fitness",
        time: "11:00 AM - 12:00 PM",
        duration: "60 min",
        instructor: "Sofia Rodriguez",
        level: "beginner",
        capacity: "12 students",
        availability: "available",
      },
      {
        id: 11,
        name: "Teen Swim Club",
        time: "4:00 PM - 5:30 PM",
        duration: "90 min",
        instructor: "Alex Rivera",
        level: "intermediate",
        capacity: "15 students",
        availability: "available",
      },
      {
        id: 12,
        name: "Triathlon Training",
        time: "6:30 PM - 8:00 PM",
        duration: "90 min",
        instructor: "Marcus Johnson",
        level: "advanced",
        capacity: "10 students",
        availability: "limited",
      },
    ],
    Friday: [
      {
        id: 13,
        name: "Learn to Swim (Kids)",
        time: "3:30 PM - 4:15 PM",
        duration: "45 min",
        instructor: "Emily Chen",
        level: "beginner",
        capacity: "6 students",
        availability: "available",
      },
      {
        id: 14,
        name: "Adult Beginner",
        time: "5:30 PM - 6:30 PM",
        duration: "60 min",
        instructor: "Marcus Johnson",
        level: "beginner",
        capacity: "8 students",
        availability: "available",
      },
      {
        id: 15,
        name: "Open Swim Practice",
        time: "7:00 PM - 8:30 PM",
        duration: "90 min",
        instructor: "Alex Rivera",
        level: "all",
        capacity: "20 students",
        availability: "available",
      },
    ],
    Saturday: [
      {
        id: 16,
        name: "Family Swim",
        time: "9:00 AM - 10:30 AM",
        duration: "90 min",
        instructor: "Emily Chen",
        level: "all",
        capacity: "10 families",
        availability: "available",
      },
      {
        id: 17,
        name: "Youth Intensive",
        time: "11:00 AM - 12:30 PM",
        duration: "90 min",
        instructor: "Alex Rivera",
        level: "intermediate",
        capacity: "8 students",
        availability: "limited",
      },
      {
        id: 18,
        name: "Adult Workshop",
        time: "1:00 PM - 3:00 PM",
        duration: "120 min",
        instructor: "Marcus Johnson",
        level: "all",
        capacity: "12 students",
        availability: "available",
      },
    ],
    Sunday: [
      {
        id: 19,
        name: "Adaptive Swimming",
        time: "10:00 AM - 11:00 AM",
        duration: "60 min",
        instructor: "Sofia Rodriguez",
        level: "all",
        capacity: "4 students",
        availability: "available",
      },
      {
        id: 20,
        name: "Competitive Clinic",
        time: "12:00 PM - 2:00 PM",
        duration: "120 min",
        instructor: "Alex Rivera",
        level: "advanced",
        capacity: "10 students",
        availability: "limited",
      },
    ],
  }

  const filteredSchedule = scheduleData[activeDay]?.filter((item) => {
    if (activeFilter === "all") return true
    return item.level === activeFilter
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-100 text-green-800"
      case "limited":
        return "bg-yellow-100 text-yellow-800"
      case "full":
        return "bg-red-100 text-red-800"
      default:
        return "bg-sky-100 text-sky-800"
    }
  }

  return (
    <section id="schedule" className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden bg-transparent">

      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-sky-900 mb-4"
          >
            Class Schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg lg:text-xl text-sky-700 max-w-3xl mx-auto px-4"
          >
            Find the perfect swimming class that fits your schedule and skill level.
          </motion.p>
        </div>

        {/* Day Selection */}
        <div className="mb-6 md:mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-1 md:space-x-2 min-w-max px-2">
            {days.map((day) => (
              <motion.button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-3 md:px-4 py-2 md:py-3 rounded-2xl text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeDay === day ? "bg-sky-600 text-white shadow-lg" : "bg-sky-100 text-sky-800 hover:bg-sky-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">{day}</span>
                <span className="sm:hidden">{day.slice(0, 3)}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div className="mb-6 md:mb-8 flex flex-col items-center px-2 gap-4">
          {/* Mobile Dropdown */}
          <div className="w-full max-w-xs md:hidden relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-5 py-3.5 bg-white border-2 border-sky-100 rounded-2xl shadow-sm hover:border-sky-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50"
            >
              <div className="flex items-center gap-2 text-sky-900 font-medium">
                {getLevelIcon(activeFilter, 'h-4 w-4')}
                <span>{getLevelLabel(activeFilter)}</span>
              </div>
              {isDropdownOpen ? (
                <ChevronUp className="h-5 w-5 text-sky-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-sky-500" />
              )}
            </button>
            
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-1.5 w-full bg-white rounded-xl shadow-xl border border-sky-100 overflow-hidden"
                  ref={dropdownRef}
                >
                  {[
                    { key: "all", label: "All Levels", icon: <Award className="h-4 w-4" /> },
                    { key: "beginner", label: "Beginner", icon: <Star className="h-4 w-4" /> },
                    { key: "intermediate", label: "Intermediate", icon: <AwardIcon className="h-4 w-4" /> },
                    { key: "advanced", label: "Advanced", icon: <Zap className="h-4 w-4" /> },
                  ].map((filter) => (
                    <button
                      key={filter.key}
                      onClick={() => {
                        setActiveFilter(filter.key);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-5 py-3 text-left text-sm font-medium transition-colors duration-150 ${
                        activeFilter === filter.key 
                          ? 'bg-sky-50 text-sky-700' 
                          : 'text-sky-600 hover:bg-sky-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${activeFilter === filter.key ? 'text-sky-500' : 'text-sky-400'}`}>
                          {filter.icon}
                        </span>
                        {filter.label}
                      </div>
                      {activeFilter === filter.key && (
                        <Check className="h-4 w-4 text-sky-500" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex flex-wrap gap-1 md:gap-2 bg-sky-50 p-1 rounded-2xl">
            {[
              { key: "all", label: "All Levels" },
              { key: "beginner", label: "Beginner" },
              { key: "intermediate", label: "Intermediate" },
              { key: "advanced", label: "Advanced" },
            ].map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter.key ? "bg-white text-sky-900 shadow-md" : "text-sky-700 hover:text-sky-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Schedule Grid */}
        <motion.div
          key={activeDay + activeFilter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full space-y-4 md:space-y-5"
        >
          {filteredSchedule?.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ y: -2 }}
              className="w-full bg-white/95 backdrop-blur-sm border border-cyan-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="text-base font-semibold text-cyan-900 leading-tight">
                        {classItem.name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${
                          classItem.availability === "available"
                            ? "bg-green-50/80 text-green-700 border border-green-100"
                            : classItem.availability === "limited"
                              ? "bg-yellow-50/80 text-yellow-700 border border-yellow-100"
                              : "bg-red-50/80 text-red-700 border border-red-100"
                        }`}
                      >
                        {classItem.availability === "available"
                          ? "Available"
                          : classItem.availability === "limited"
                            ? "Few Spots"
                            : "Class Full"}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-cyan-700">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Hourglass className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{classItem.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <UserCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                        <span className="truncate max-w-[120px] sm:max-w-[140px]">{classItem.instructor}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          classItem.level === "beginner"
                            ? "bg-green-50/80 text-green-700 border border-green-100"
                            : classItem.level === "intermediate"
                              ? "bg-blue-50/80 text-blue-700 border border-blue-100"
                              : classItem.level === "advanced"
                                ? "bg-purple-50/80 text-purple-700 border border-purple-100"
                                : "bg-gray-50/80 text-gray-700 border border-gray-100"
                        }`}
                      >
                        {classItem.level.charAt(0).toUpperCase() + classItem.level.slice(1)}
                      </span>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-50/80 border border-cyan-100">
                        <Users className="w-3.5 h-3.5 text-cyan-600" />
                        <span className="text-xs font-medium text-cyan-700">{classItem.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                      classItem.availability === "full"
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-200/50"
                    }`}
                    disabled={classItem.availability === "full"}
                    whileHover={classItem.availability !== "full" ? { y: -2, scale: 1.02 } : {}}
                    whileTap={classItem.availability !== "full" ? { scale: 0.98 } : {}}
                    data-book-now="true"
                  >
                    {classItem.availability === "full" ? "Fully Booked" : "Book Now"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredSchedule?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sky-700 text-base md:text-lg">No classes available for the selected filters.</p>
          </div>
        )}
      </div>
    </section>
  )
}
