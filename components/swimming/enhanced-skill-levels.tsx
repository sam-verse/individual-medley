"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Waves, Users, Clock, Trophy, Star, ChevronRight } from "lucide-react"

const skillLevels = [
  {
    id: "beginner",
    title: "Beginner",
    subtitle: "New to Swimming",
    description:
      "Perfect for those taking their first strokes. Learn water safety, basic floating, and fundamental swimming techniques.",
    features: [
      "Water safety basics",
      "Floating techniques",
      "Basic strokes introduction",
      "Breathing exercises",
      "Pool confidence building",
    ],
    duration: "4-6 weeks",
    groupSize: "4-6 students",
    ageGroups: ["Kids (6-12)", "Teens (13-17)", "Adults (18+)"],
    color: "from-blue-400 to-cyan-500",
    icon: Waves,
    popular: false,
  },
  {
    id: "intermediate",
    title: "Intermediate",
    subtitle: "Building Confidence",
    description: "Develop proper stroke techniques, improve endurance, and learn advanced swimming skills.",
    features: ["Stroke refinement", "Endurance building", "Diving techniques", "Flip turns", "Swimming etiquette"],
    duration: "6-8 weeks",
    groupSize: "6-8 students",
    ageGroups: ["Kids (8-12)", "Teens (13-17)", "Adults (18+)"],
    color: "from-cyan-500 to-blue-600",
    icon: Users,
    popular: true,
  },
  {
    id: "advanced",
    title: "Advanced",
    subtitle: "Competitive Ready",
    description: "Master all four strokes, competitive techniques, and prepare for swim team or competitions.",
    features: [
      "All four strokes mastery",
      "Racing techniques",
      "Advanced starts & turns",
      "Training strategies",
      "Competition preparation",
    ],
    duration: "8-12 weeks",
    groupSize: "6-10 students",
    ageGroups: ["Kids (10+)", "Teens (13-17)", "Adults (18+)"],
    color: "from-blue-600 to-indigo-700",
    icon: Trophy,
    popular: false,
  },
]

export default function EnhancedSkillLevels() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Swimming Programs</Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Swimming Skill Levels</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Choose the perfect program for your swimming journey. Our expert instructors will guide you through every
            stroke, every breath, every victory.
          </p>
        </div>

        {/* Skill Level Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {skillLevels.map((level) => {
            const IconComponent = level.icon
            const isSelected = selectedLevel === level.id

            return (
              <Card
                key={level.id}
                className={`relative overflow-hidden transition-all duration-300 cursor-pointer group hover:shadow-2xl ${
                  isSelected ? "ring-2 ring-blue-500 shadow-2xl scale-105" : "hover:scale-102"
                } ${level.popular ? "ring-2 ring-yellow-400" : ""}`}
                onClick={() => setSelectedLevel(isSelected ? null : level.id)}
              >
                {level.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-yellow-500 text-white flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${level.color}`} />

                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${level.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{level.title}</h3>
                      <p className="text-gray-600">{level.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">{level.description}</p>

                  {/* Quick Info */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{level.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>{level.groupSize}</span>
                    </div>
                  </div>

                  {/* Age Groups */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-700 mb-2">Age Groups:</p>
                    <div className="flex flex-wrap gap-2">
                      {level.ageGroups.map((age) => (
                        <Badge key={age} variant="outline" className="text-xs">
                          {age}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features - Show when selected */}
                  {isSelected && (
                    <div className="mb-6 animate-in slide-in-from-top-2 duration-300">
                      <p className="text-sm font-medium text-gray-700 mb-3">What You'll Learn:</p>
                      <ul className="space-y-2">
                        {level.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button className={`w-full bg-gradient-to-r ${level.color} hover:opacity-90 text-white group`}>
                    {isSelected ? "Book This Level" : "Learn More"}
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Not Sure Which Level is Right for You?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our experienced instructors will assess your current skills and recommend the perfect program to help you
              achieve your swimming goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Schedule Assessment
              </Button>
              <Button size="lg" variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50">
                Contact Instructor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
