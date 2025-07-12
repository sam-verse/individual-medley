"use client"

import { useRef, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Award, Users, Calendar, Instagram, Twitter, Linkedin, X } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

export default function Trainers() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false)
        setSelectedTrainer(null)
      }
    }
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isModalOpen])

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

  const trainers = [
    {
      name: "Marcus Johnson",
      title: "Head Strength Coach",
      image: "/placeholder.svg?height=400&width=400",
      experience: "8 years",
      specialties: ["Powerlifting", "Olympic Lifting", "Strength Training"],
      certifications: ["NSCA-CSCS", "USAW Level 2", "FMS Level 2"],
      bio: "Marcus brings elite-level strength training expertise with a background in competitive powerlifting. He's helped over 500 clients achieve their strength goals.",
      rating: 4.9,
      clients: 150,
      social: {
        instagram: "@marcus_strength",
        twitter: "@marcusjohnson",
        linkedin: "marcus-johnson-fitness",
      },
      achievements: ["National Powerlifting Champion", "Certified Strength Coach", "Published Fitness Author"],
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "Alicia Chen",
      title: "HIIT & Cardio Specialist",
      image: "/placeholder.svg?height=400&width=400",
      experience: "6 years",
      specialties: ["HIIT Training", "Cardio Conditioning", "Weight Loss"],
      certifications: ["ACSM-CPT", "HIIT Certified", "Nutrition Coach"],
      bio: "Alicia's high-energy approach to fitness has transformed hundreds of lives. Her innovative HIIT programs deliver results while keeping workouts fun and engaging.",
      rating: 4.8,
      clients: 200,
      social: {
        instagram: "@alicia_hiit",
        twitter: "@aliciachen_fit",
        linkedin: "alicia-chen-fitness",
      },
      achievements: ["HIIT Instructor of the Year", "Fitness Model", "Wellness Coach Certification"],
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Derek Williams",
      title: "Athletic Performance Coach",
      image: "/placeholder.svg?height=400&width=400",
      experience: "10 years",
      specialties: ["Athletic Performance", "Speed & Agility", "Sports Conditioning"],
      certifications: ["CSCS", "USATF Level 2", "Corrective Exercise"],
      bio: "Former professional athlete turned coach, Derek specializes in unlocking athletic potential. He's worked with Olympic athletes and weekend warriors alike.",
      rating: 5.0,
      clients: 120,
      social: {
        instagram: "@derek_performance",
        twitter: "@derekwilliams",
        linkedin: "derek-williams-performance",
      },
      achievements: ["Olympic Team Coach", "Sports Performance Expert", "Athletic Development Specialist"],
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Sophia Rodriguez",
      title: "Functional Movement Expert",
      image: "/placeholder.svg?height=400&width=400",
      experience: "7 years",
      specialties: ["Functional Training", "Mobility", "Injury Prevention"],
      certifications: ["FMS", "SFMA", "Yoga Alliance RYT-500"],
      bio: "Sophia combines functional movement with mindful training approaches. Her holistic method helps clients move better, feel better, and live better.",
      rating: 4.9,
      clients: 180,
      social: {
        instagram: "@sophia_functional",
        twitter: "@sophiarodriguez",
        linkedin: "sophia-rodriguez-movement",
      },
      achievements: ["Movement Specialist Certification", "Yoga Instructor", "Rehabilitation Expert"],
      color: "from-purple-500 to-pink-600",
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
    <section id="trainers" ref={sectionRef} className="py-16 md:py-24 px-4 md:px-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 animate-on-scroll"
        >
          <div className="inline-block px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-sm font-medium mb-4">
            EXPERT TRAINERS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">MEET YOUR FITNESS COACHES</h2>
          <p className="text-xl text-blue-300 max-w-3xl mx-auto">
            Train with certified professionals who are passionate about helping you achieve your fitness goals.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {trainers.map((trainer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
              className="animate-on-scroll"
            >
              <Card className="bg-navy-800/80 backdrop-blur-sm border border-blue-900/50 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group h-full rounded-3xl">
                <div className="relative h-64 overflow-hidden rounded-2xl">
                  <Image
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-white text-sm font-medium">{trainer.rating}</span>
                  </div>

                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href="#"
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Instagram className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                    {trainer.name}
                  </h3>
                  <p className="text-blue-400 mb-4">{trainer.title}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-300 flex items-center">
                        <Award className="w-4 h-4 mr-2" />
                        Experience
                      </span>
                      <span className="text-white font-medium">{trainer.experience}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-blue-300 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Clients
                      </span>
                      <span className="text-white font-medium">{trainer.clients}+</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trainer.specialties.map((specialty, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-navy-700 text-blue-300 rounded-xl">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      className={`w-full bg-gradient-to-r ${trainer.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 mb-3 rounded-2xl`}
                      onClick={() => {
                        setSelectedTrainer(index);
                        setIsModalOpen(true);
                      }}
                    >
                      <Award className="mr-2 w-4 h-4" />
                      View Details
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal for trainer details */}
      {isModalOpen && selectedTrainer !== null && (
        typeof window !== 'undefined' && createPortal(
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50" onClick={() => { setIsModalOpen(false); setSelectedTrainer(null); }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-navy-800 rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-2 md:p-4"
              onClick={e => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className={`h-32 bg-gradient-to-r ${trainers[selectedTrainer].color} rounded-t-3xl flex items-center justify-center relative`}>
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); setSelectedTrainer(null); }}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-blue-700 rounded-full p-2 shadow transition z-50"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
                {/* Centered image overlap */}
                <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-10 w-24 flex justify-center">
                  <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-navy-900 shadow-lg flex items-center justify-center">
                    <Image
                      src={trainers[selectedTrainer].image || "/placeholder.svg"}
                      alt={trainers[selectedTrainer].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-20 sm:pt-24 px-4 pb-6 flex flex-col items-center">
                <div className="text-center mb-6 w-full">
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">{trainers[selectedTrainer].name}</h2>
                  <p className="text-blue-400 text-sm sm:text-base">{trainers[selectedTrainer].title}</p>
                </div>
                <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">About</h4>
                    <p className="text-blue-100 mb-4 text-sm sm:text-base">{trainers[selectedTrainer].bio}</p>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2 text-yellow-400" /> Certifications
                    </h4>
                    <ul className="list-disc list-inside text-blue-100 mb-4 text-sm sm:text-base">
                      {trainers[selectedTrainer].certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2 text-blue-400" /> Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trainers[selectedTrainer].specialties.map((specialty, i) => (
                        <span key={i} className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-xl">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-blue-300 text-xs sm:text-sm mb-2">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" /> {trainers[selectedTrainer].rating} rating
                    </div>
                    <div className="flex items-center text-blue-300 text-xs sm:text-sm mb-2">
                      <Users className="w-4 h-4 mr-1" /> {trainers[selectedTrainer].clients}+ clients
                    </div>
                    <div className="flex items-center text-blue-300 text-xs sm:text-sm mb-4">
                      <Award className="w-4 h-4 mr-1" /> {trainers[selectedTrainer].experience} experience
                    </div>
                    <h4 className="font-semibold text-white mb-2">Achievements</h4>
                    <ul className="list-disc list-inside text-blue-100 mb-2 text-sm sm:text-base">
                      {trainers[selectedTrainer].achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3 mt-4 justify-center">
                  <a href="#" className="w-8 h-8 bg-blue-900 text-blue-200 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors" target="_blank" rel="noopener noreferrer"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 bg-blue-900 text-blue-200 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors" target="_blank" rel="noopener noreferrer"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="w-8 h-8 bg-blue-900 text-blue-200 rounded-xl flex items-center justify-center hover:bg-blue-800 transition-colors" target="_blank" rel="noopener noreferrer"><Linkedin className="w-4 h-4" /></a>
                </div>
              </div>
            </motion.div>
          </div>, document.body)
        )}
    </section>
  )
}
