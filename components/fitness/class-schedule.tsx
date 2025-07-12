"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Clock, Users, Zap, Trophy, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ClassSchedule() {
  const [activeDay, setActiveDay] = useState("Monday")

  const scheduleData = [
    {
      day: "Monday",
      classes: [
        {
          time: "6:00 AM",
          name: "Morning HIIT Blast",
          trainer: "Alex Rivera",
          duration: "45 min",
          intensity: "High",
          spots: "8/12",
        },
        {
          time: "9:00 AM",
          name: "Strength Foundations",
          trainer: "Sarah Chen",
          duration: "60 min",
          intensity: "Medium",
          spots: "6/10",
        },
        {
          time: "5:30 PM",
          name: "CrossFit Intensity",
          trainer: "Mike Johnson",
          duration: "50 min",
          intensity: "High",
          spots: "10/15",
        },
        {
          time: "7:00 PM",
          name: "Power Yoga Flow",
          trainer: "Emma Rodriguez",
          duration: "60 min",
          intensity: "Low",
          spots: "12/20",
        },
      ],
    },
    {
      day: "Tuesday",
      classes: [
        {
          time: "7:00 AM",
          name: "Spin & Burn",
          trainer: "John Davis",
          duration: "45 min",
          intensity: "High",
          spots: "15/20",
        },
        {
          time: "10:00 AM",
          name: "Senior Strength",
          trainer: "Patricia Wilson",
          duration: "45 min",
          intensity: "Low",
          spots: "8/12",
        },
        {
          time: "4:30 PM",
          name: "Boxing Bootcamp",
          trainer: "Carlos Martinez",
          duration: "60 min",
          intensity: "High",
          spots: "10/16",
        },
        {
          time: "6:30 PM",
          name: "Core Power",
          trainer: "Lisa Thompson",
          duration: "30 min",
          intensity: "Medium",
          spots: "14/18",
        },
      ],
    },
    {
      day: "Wednesday",
      classes: [
        {
          time: "6:00 AM",
          name: "Circuit Training",
          trainer: "Alex Rivera",
          duration: "50 min",
          intensity: "High",
          spots: "9/12",
        },
        {
          time: "9:00 AM",
          name: "Pilates Precision",
          trainer: "Sarah Chen",
          duration: "55 min",
          intensity: "Medium",
          spots: "7/10",
        },
        {
          time: "5:30 PM",
          name: "CrossFit WOD",
          trainer: "Mike Johnson",
          duration: "60 min",
          intensity: "High",
          spots: "12/15",
        },
        {
          time: "7:00 PM",
          name: "Meditation & Stretch",
          trainer: "Emma Rodriguez",
          duration: "45 min",
          intensity: "Low",
          spots: "16/25",
        },
      ],
    },
    {
      day: "Thursday",
      classes: [
        {
          time: "7:00 AM",
          name: "Spin Revolution",
          trainer: "John Davis",
          duration: "45 min",
          intensity: "High",
          spots: "18/20",
        },
        {
          time: "10:00 AM",
          name: "Functional Movement",
          trainer: "Patricia Wilson",
          duration: "50 min",
          intensity: "Medium",
          spots: "6/12",
        },
        {
          time: "4:30 PM",
          name: "Boxing Technique",
          trainer: "Carlos Martinez",
          duration: "45 min",
          intensity: "Medium",
          spots: "8/16",
        },
        {
          time: "6:30 PM",
          name: "Abs & Glutes",
          trainer: "Lisa Thompson",
          duration: "30 min",
          intensity: "Medium",
          spots: "15/18",
        },
      ],
    },
    {
      day: "Friday",
      classes: [
        {
          time: "6:00 AM",
          name: "HIIT Friday",
          trainer: "Alex Rivera",
          duration: "45 min",
          intensity: "High",
          spots: "10/12",
        },
        {
          time: "9:00 AM",
          name: "Advanced Strength",
          trainer: "Sarah Chen",
          duration: "60 min",
          intensity: "High",
          spots: "5/8",
        },
        {
          time: "5:30 PM",
          name: "Happy Hour Workout",
          trainer: "Mike Johnson",
          duration: "45 min",
          intensity: "Medium",
          spots: "12/15",
        },
        {
          time: "7:00 PM",
          name: "Weekend Prep Yoga",
          trainer: "Emma Rodriguez",
          duration: "60 min",
          intensity: "Low",
          spots: "18/25",
        },
      ],
    },
    {
      day: "Saturday",
      classes: [
        {
          time: "8:00 AM",
          name: "Weekend Warrior",
          trainer: "Carlos Martinez",
          duration: "75 min",
          intensity: "High",
          spots: "8/12",
        },
        {
          time: "10:00 AM",
          name: "Family Fitness",
          trainer: "Patricia Wilson",
          duration: "45 min",
          intensity: "Low",
          spots: "10/15",
        },
        {
          time: "12:00 PM",
          name: "Strength & Conditioning",
          trainer: "Mike Johnson",
          duration: "60 min",
          intensity: "High",
          spots: "6/10",
        },
      ],
    },
    {
      day: "Sunday",
      classes: [
        {
          time: "9:00 AM",
          name: "Gentle Flow Yoga",
          trainer: "Emma Rodriguez",
          duration: "60 min",
          intensity: "Low",
          spots: "20/25",
        },
        {
          time: "11:00 AM",
          name: "Recovery Session",
          trainer: "Sarah Chen",
          duration: "45 min",
          intensity: "Low",
          spots: "12/15",
        },
      ],
    },
  ]

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getIntensityIcon = (intensity: string) => {
    switch (intensity) {
      case "High":
        return <Zap className="w-3 h-3" />
      case "Medium":
        return <Target className="w-3 h-3" />
      case "Low":
        return <Trophy className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const currentDayClasses = scheduleData.find((day) => day.day === activeDay)?.classes || []

  return (
    <section id="schedule" className="py-16 md:py-24 px-4 md:px-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-sm font-medium mb-4">
            CLASS SCHEDULE
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">TRAIN ON YOUR SCHEDULE</h2>
          <p className="text-xl text-blue-300 max-w-3xl mx-auto">
            Our diverse class schedule is designed to fit your busy lifestyle. Join any of our expert-led sessions
            throughout the week.
          </p>
        </motion.div>

        {/* Enhanced Day Selection */}
        <div className="mb-10 w-full">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent h-px -top-3" />
            <div className="grid grid-cols-7 gap-2 px-2 bg-navy-900/30 backdrop-blur-sm p-2 rounded-2xl border border-blue-900/30">
              {scheduleData.map((day, index) => {
                const isActive = activeDay === day.day;
                const dayNumber = new Date().getDate() + index;
                const isToday = index === new Date().getDay() - 1; // Adjust if your week starts differently
                
                return (
                  <motion.button
                    key={day.day}
                    onClick={() => setActiveDay(day.day)}
                    className={`relative py-3 flex flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-navy-800/50 text-blue-200 hover:bg-navy-700/60 border border-blue-900/30 hover:border-blue-700/50'
                    } ${isToday && !isActive ? 'ring-2 ring-blue-500/50' : ''}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="activeDay"
                        className="absolute -top-1.5 w-1.5 h-1.5 bg-blue-400 rounded-full"
                        initial={false}
                      />
                    )}
                    <span className={`text-[11px] font-medium ${isActive ? 'text-blue-100' : 'text-blue-300/80'} mb-0.5`}>
                      {day.day.slice(0, 3).toUpperCase()}
                    </span>
                    <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-blue-100'}`}>
                      {dayNumber}
                    </span>
                    {isToday && !isActive && (
                      <div className="absolute -bottom-1 w-1 h-1 bg-blue-500 rounded-full" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Classes Grid */}
        <div className="relative">
          {/* Desktop Grid */}
          <motion.div
            key={`${activeDay}-desktop`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {currentDayClasses.map((classItem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Card className="bg-navy-800/80 backdrop-blur-sm border border-blue-900/50 p-4 sm:p-6 h-full hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 rounded-2xl sm:rounded-3xl">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center text-blue-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="font-bold text-base sm:text-lg">{classItem.time}</span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-medium border flex items-center gap-1 ${getIntensityColor(classItem.intensity)}`}
                    >
                      {getIntensityIcon(classItem.intensity)}
                      {classItem.intensity}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{classItem.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-blue-300 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      <span>Instructor: {classItem.trainer}</span>
                    </div>
                    <div className="flex items-center text-blue-300 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration: {classItem.duration}</span>
                    </div>
                    <div className="flex items-center text-blue-300 text-sm">
                      <Target className="w-4 h-4 mr-2" />
                      <span>Available: {classItem.spots}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-2xl"
                    data-book-now="true"
                  >
                    Book Class
                  </Button>
                </Card>
              </motion.div>
            ))}
            {currentDayClasses.length === 0 && (
              <div className="col-span-3 text-center py-12">
                <p className="text-blue-300 text-lg">No classes scheduled for {activeDay}.</p>
              </div>
            )}
          </motion.div>

          {/* Mobile Vertical List - Full Width */}
          <div className="sm:hidden w-screen -ml-4">
            <div className="px-4 space-y-4">
              {currentDayClasses.length > 0 ? (
                currentDayClasses.map((classItem, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Card className="bg-navy-800/80 backdrop-blur-sm border border-blue-900/40 p-6 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-700/50 transition-all duration-300 rounded-2xl w-full relative overflow-hidden group">
                      {/* Enhanced Intensity Label */}
                      <div className="absolute top-4 right-4 z-10">
                        <div 
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm flex items-center gap-1.5 shadow-lg transition-all duration-300 group-hover:scale-105 ${
                            getIntensityColor(classItem.intensity)
                          }`}
                        >
                          <span className="opacity-90">
                            {getIntensityIcon(classItem.intensity)}
                          </span>
                          <span className="text-[11px] font-bold tracking-wide">
                            {classItem.intensity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      {/* Time */}
                      <div className="flex items-center text-blue-300 mb-5 group-hover:text-blue-200 transition-colors">
                        <Clock className="w-4 h-4 mr-2.5 opacity-80" />
                        <span className="font-semibold text-sm tracking-wide">{classItem.time}</span>
                        <div className="hidden sm:flex items-center">
                          <div className="ml-3 w-1 h-1 rounded-full bg-blue-900/50 group-hover:bg-blue-500/80 transition-colors" />
                          <span className="ml-3 text-blue-300/80 text-sm font-medium">
                            {classItem.duration}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                        {classItem.name}
                      </h3>

                      <div className="space-y-3 mb-5">
                        <div className="flex items-center text-blue-200/90 text-sm group-hover:text-blue-100 transition-colors">
                          <Users className="w-4 h-4 mr-2.5 opacity-80" />
                          <span className="font-medium">{classItem.trainer}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 bg-blue-900/30 rounded-full h-1.5 overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                              style={{ width: `${(parseInt(classItem.spots.split('/')[0]) / parseInt(classItem.spots.split('/')[1])) * 100}%` }}
                            />
                          </div>
                          <span className="ml-3 text-xs font-medium text-blue-300/80">
                            {classItem.spots} spots left
                          </span>
                        </div>
                        <div className="flex items-center text-blue-300 text-xs">
                          <Target className="w-4 h-4 mr-2" />
                          <span>Available: {classItem.spots}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl py-5 font-semibold text-sm tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 group-hover:scale-[1.02]"
                        data-book-now="true"
                      >
                        <span className="relative">
                          <span className="opacity-0 group-hover:opacity-100 absolute -left-5 transition-opacity">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span>Book This Class</span>
                        </span>
                      </Button>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="w-full flex items-center justify-center text-blue-300 text-sm h-48 rounded-2xl bg-navy-800/80 border border-blue-900/50">
                No classes scheduled for {activeDay}.
              </div>
            )}
          </div>
        </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-900 to-blue-800 border-blue-700 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold text-white mb-4">Can't Find the Perfect Time?</h3>
            <p className="text-blue-200 mb-6 max-w-2xl mx-auto">
              We offer flexible scheduling and personal training sessions to accommodate your busy lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 rounded-2xl" data-book-now="true">
                Schedule Personal Training
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-3 rounded-2xl"
                data-book-now="true"
              >
                Contact Us
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
