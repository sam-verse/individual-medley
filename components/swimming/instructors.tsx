"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Award, Clock, Users } from "lucide-react"

interface Instructor {
  id: number
  name: string
  role: string
  bio: string
  image: string
  specialties: string[]
  experience: string
  certifications: string[]
  contact: {
    email: string
    phone: string
  }
}

export default function Instructors() {
  const instructors: Instructor[] = [
    {
      id: 1,
      name: "Coach Alex Rivera",
      role: "Head Swimming Coach",
      bio: "Alex has over 15 years of experience coaching swimmers of all levels, from beginners to Olympic athletes. His passion is helping swimmers achieve their personal best while maintaining proper technique.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Competitive Training", "Advanced Technique", "Race Strategy"],
      experience: "15+ years",
      certifications: ["ASCA Level 5", "Red Cross WSI", "USA Swimming"],
      contact: {
        email: "alex@individualmedley.com",
        phone: "(123) 456-7890",
      },
    },
    {
      id: 2,
      name: "Coach Emily Chen",
      role: "Youth Program Director",
      bio: "Emily specializes in teaching children and teens, making swimming fun while building strong fundamentals. Her energetic approach helps young swimmers build confidence in the water.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Youth Development", "Water Safety", "Stroke Technique"],
      experience: "8 years",
      certifications: ["Red Cross WSI", "USA Swimming", "Child Development"],
      contact: {
        email: "emily@individualmedley.com",
        phone: "(123) 456-7891",
      },
    },
    {
      id: 3,
      name: "Coach Marcus Johnson",
      role: "Adult Program Specialist",
      bio: "Marcus focuses on adult swimmers, from beginners to masters. He understands the unique challenges adults face when learning to swim and creates a supportive environment for progress.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Adult Learn-to-Swim", "Masters Training", "Triathlon Prep"],
      experience: "12 years",
      certifications: ["USMS Coach", "Red Cross WSI", "Triathlon Coach"],
      contact: {
        email: "marcus@individualmedley.com",
        phone: "(123) 456-7892",
      },
    },
    {
      id: 4,
      name: "Coach Sofia Rodriguez",
      role: "Adaptive Swimming Specialist",
      bio: "Sofia is dedicated to making swimming accessible to everyone. She specializes in adaptive techniques for swimmers with different abilities and needs, ensuring everyone can enjoy the water.",
      image: "/placeholder.svg?height=300&width=300",
      specialties: ["Adaptive Swimming", "Special Needs", "Therapeutic Swimming"],
      experience: "10 years",
      certifications: ["Adaptive Aquatics", "Red Cross WSI", "Therapeutic Recreation"],
      contact: {
        email: "sofia@individualmedley.com",
        phone: "(123) 456-7893",
      },
    },
  ]

  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)

  return (
    <section id="instructors" className="py-16 md:py-24 px-4 md:px-6 bg-transparent relative overflow-hidden">

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-sky-900 mb-4"
          >
            Meet Our Instructors
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sky-700 max-w-2xl mx-auto"
          >
            Our team of certified swimming instructors brings years of experience and passion to every lesson.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden border border-sky-100 h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-bold text-xl">{instructor.name}</h3>
                    <p className="text-sky-100">{instructor.role}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4">
                  <h4 className="font-semibold text-sky-900 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {instructor.specialties.map((specialty, i) => (
                      <span key={i} className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-xl">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sky-700 text-sm mb-4">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{instructor.experience} experience</span>
                </div>

                <Button
                  onClick={() => setSelectedInstructor(instructor)}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white rounded-2xl"
                >
                  View Profile
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructor Modal */}
        {selectedInstructor && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedInstructor(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative p-2 md:p-4"
              style={{ scrollbarWidth: 'none', margin: '16px' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with close button and image overlap */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-sky-600 to-sky-400 rounded-t-3xl flex items-center justify-center">
                  <button
                    onClick={() => setSelectedInstructor(null)}
                    className="absolute top-4 right-4 bg-white/80 hover:bg-white text-sky-700 rounded-full p-2 shadow transition"
                    aria-label="Close profile"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 z-10">
                  <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden bg-white shadow-lg">
                    <img
                      src={selectedInstructor.image || "/placeholder.svg"}
                      alt={selectedInstructor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-16 px-4 pb-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-sky-900">{selectedInstructor.name}</h3>
                  <p className="text-sky-600">{selectedInstructor.role}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-sky-900 mb-2">About</h4>
                    <p className="text-sky-800 mb-4">{selectedInstructor.bio}</p>
                    <h4 className="font-semibold text-sky-900 mb-2 flex items-center">
                      <Award className="w-4 h-4 mr-2" /> Certifications
                    </h4>
                    <ul className="list-disc list-inside text-sky-800 mb-4">
                      {selectedInstructor.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sky-900 mb-2 flex items-center">
                      <Users className="w-4 h-4 mr-2" /> Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedInstructor.specialties.map((specialty, i) => (
                        <span key={i} className="bg-sky-100 text-sky-800 text-xs px-2 py-1 rounded-xl">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center text-sky-700 text-sm mb-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{selectedInstructor.experience} experience</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-sky-100 pt-4 mb-2">
                  <h4 className="font-semibold text-sky-900 mb-4">Contact Information</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={`mailto:${selectedInstructor.contact.email}`}
                      className="flex items-center bg-sky-100 hover:bg-sky-200 text-sky-800 px-4 py-2 rounded-2xl transition-colors flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      {selectedInstructor.contact.email}
                    </a>
                    <a
                      href={`tel:${selectedInstructor.contact.phone}`}
                      className="flex items-center bg-sky-100 hover:bg-sky-200 text-sky-800 px-4 py-2 rounded-2xl transition-colors flex-1"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {selectedInstructor.contact.phone}
                    </a>
                  </div>
                </div>
                <div className="mt-2 flex justify-center">
                  <Button
                    onClick={() => setSelectedInstructor(null)}
                    className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl px-8 shadow"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <style jsx global>{`
        .bg-white::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}
