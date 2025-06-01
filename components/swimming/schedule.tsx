"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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
    <section id="schedule" className="py-12 md:py-20 px-4 md:px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-sky-50 to-transparent pointer-events-none"></div>

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
        <div className="mb-6 md:mb-8 flex justify-center px-2">
          <div className="flex flex-wrap gap-1 md:gap-2 bg-sky-50 p-1 rounded-2xl max-w-full">
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-2"
        >
          {filteredSchedule?.map((classItem, index) => (
            <motion.div
              key={classItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white border border-sky-200 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-base md:text-lg font-bold text-sky-900 leading-tight">{classItem.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-xl font-medium ${getAvailabilityColor(
                      classItem.availability,
                    )}`}
                  >
                    {classItem.availability === "available"
                      ? "Available"
                      : classItem.availability === "limited"
                        ? "Few Spots"
                        : "Full"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sky-700 text-sm">
                    <span className="font-medium min-w-[60px]">Time:</span>
                    <span className="ml-2 text-xs md:text-sm">{classItem.time}</span>
                  </div>
                  <div className="flex items-center text-sky-700 text-sm">
                    <span className="font-medium min-w-[60px]">Duration:</span>
                    <span className="ml-2 text-xs md:text-sm">{classItem.duration}</span>
                  </div>
                  <div className="flex items-center text-sky-700 text-sm">
                    <span className="font-medium min-w-[60px]">Instructor:</span>
                    <span className="ml-2 text-xs md:text-sm">{classItem.instructor}</span>
                  </div>
                  <div className="flex items-center text-sky-700 text-sm">
                    <span className="font-medium min-w-[60px]">Capacity:</span>
                    <span className="ml-2 text-xs md:text-sm">{classItem.capacity}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs px-3 py-1 rounded-xl font-medium ${
                      classItem.level === "beginner"
                        ? "bg-green-100 text-green-800"
                        : classItem.level === "intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : classItem.level === "advanced"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {classItem.level.charAt(0).toUpperCase() + classItem.level.slice(1)}
                  </span>
                  <motion.button
                    className={`px-3 md:px-4 py-2 rounded-2xl text-xs md:text-sm font-medium transition-all duration-300 ${
                      classItem.availability === "full"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-sky-600 text-white hover:bg-sky-700"
                    }`}
                    disabled={classItem.availability === "full"}
                    whileHover={classItem.availability !== "full" ? { scale: 1.05 } : {}}
                    whileTap={classItem.availability !== "full" ? { scale: 0.95 } : {}}
                    data-book-now="true"
                  >
                    {classItem.availability === "full" ? "Full" : "Book Now"}
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
