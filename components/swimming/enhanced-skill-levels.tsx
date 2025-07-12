"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Waves, Users, Award, Target, TrendingUp, Trophy, Star, Zap, Flame, Medal, Rocket, ChevronRight, Clock } from "lucide-react"

const skillLevels = [
  {
    id: "beginner-1",
    title: "Beginner 1",
    subtitle: "First Splash",
    description: "Start your swimming journey with water safety, floating, and basic movement.",
    features: [
      "Water comfort",
      "Basic floating",
      "Face in water",
      "Simple kicks",
      "Pool entry/exit safety",
    ],
    duration: "2-4 weeks",
    groupSize: "4-6 students",
    ageGroups: ["Kids (6-10)", "Teens (11-15)", "Adults (16+)",],
    color: "from-blue-400 to-cyan-500",
    icon: Waves,
    popular: false,
  },
  {
    id: "beginner-2",
    title: "Beginner 2",
    subtitle: "Building Basics",
    description: "Progress to gliding, breath control, and introduction to strokes.",
    features: [
      "Gliding techniques",
      "Breath control",
      "Front/back float",
      "Kickboard drills",
      "Intro to freestyle",
    ],
    duration: "2-4 weeks",
    groupSize: "4-6 students",
    ageGroups: ["Kids (8-12)", "Teens (13-17)", "Adults (18+)",],
    color: "from-cyan-500 to-emerald-400",
    icon: Users,
    popular: false,
  },
  {
    id: "intermediate-1",
    title: "Intermediate 1",
    subtitle: "Stroke Skills",
    description: "Develop proper stroke techniques and increase water confidence.",
    features: [
      "Freestyle basics",
      "Backstroke basics",
      "Treading water",
      "Streamline position",
      "Endurance drills",
    ],
    duration: "3-5 weeks",
    groupSize: "6-8 students",
    ageGroups: ["Kids (10+)", "Teens (13-17)", "Adults (18+)",],
    color: "from-emerald-400 to-teal-500",
    icon: Award,
    popular: false,
  },
  {
    id: "intermediate-2",
    title: "Intermediate 2",
    subtitle: "Technique Builder",
    description: "Refine strokes, learn breaststroke, and improve stamina.",
    features: [
      "Freestyle refinement",
      "Backstroke refinement",
      "Breaststroke intro",
      "Flip turns",
      "Longer swims",
    ],
    duration: "3-5 weeks",
    groupSize: "6-8 students",
    ageGroups: ["Teens (13-17)", "Adults (18+)",],
    color: "from-teal-500 to-indigo-500",
    icon: Target,
    popular: true,
  },
  {
    id: "advanced-1",
    title: "Advanced 1",
    subtitle: "Power & Endurance",
    description: "Master all four strokes and build endurance for longer swims.",
    features: [
      "Butterfly basics",
      "Stroke efficiency",
      "Interval training",
      "Starts & turns",
      "Endurance sets",
    ],
    duration: "4-6 weeks",
    groupSize: "6-10 students",
    ageGroups: ["Teens (15+)", "Adults (18+)",],
    color: "from-indigo-500 to-purple-500",
    icon: TrendingUp,
    popular: false,
  },
  {
    id: "advanced-2",
    title: "Advanced 2",
    subtitle: "Performance Focus",
    description: "Perfect advanced techniques and prepare for competition.",
    features: [
      "Race strategies",
      "Advanced drills",
      "Starts & finishes",
      "Pace work",
      "Mental focus",
    ],
    duration: "4-6 weeks",
    groupSize: "8-12 students",
    ageGroups: ["Teens (16+)", "Adults (18+)",],
    color: "from-purple-500 to-pink-500",
    icon: Flame,
    popular: false,
  },
  {
    id: "elite-1",
    title: "Elite 1",
    subtitle: "Competitive Edge",
    description: "Train for local and regional competitions with advanced sets.",
    features: [
      "Race pace sets",
      "Starts & underwater",
      "Relay skills",
      "Competition prep",
      "Video analysis",
    ],
    duration: "6-8 weeks",
    groupSize: "8-12 students",
    ageGroups: ["Teens (16+)", "Adults (18+)",],
    color: "from-pink-500 to-amber-400",
    icon: Trophy,
    popular: false,
  },
  {
    id: "elite-2",
    title: "Elite 2",
    subtitle: "Champion Training",
    description: "High-intensity training for national-level competition and peak performance.",
    features: [
      "High-intensity intervals",
      "Strength & conditioning",
      "Race simulation",
      "Nutrition guidance",
      "Peak performance coaching",
    ],
    duration: "Ongoing",
    groupSize: "6-10 students",
    ageGroups: ["Teens (17+)", "Adults (18+)",],
    color: "from-amber-400 to-orange-500",
    icon: Rocket,
    popular: false,
  },
  {
    id: "explorer",
    title: "Explorer",
    subtitle: "Discovery Stage",
    description: "Explore new aquatic skills and build confidence with fun challenges.",
    features: [
      "Underwater games",
      "Obstacle courses",
      "Buddy swims",
      "Creative drills",
      "Confidence boosters",
    ],
    duration: "2-3 weeks",
    groupSize: "5-8 students",
    ageGroups: ["Kids (6-12)", "Teens (13-17)", "Adults (18+)",],
    color: "from-green-400 to-lime-500",
    icon: Zap,
    popular: false,
  },
  {
    id: "sprint",
    title: "Sprint",
    subtitle: "Speed & Agility",
    description: "Focus on speed, quick turns, and agility in the water.",
    features: [
      "Sprint sets",
      "Quick turns",
      "Reaction drills",
      "Short distance races",
      "Agility training",
    ],
    duration: "2-4 weeks",
    groupSize: "6-10 students",
    ageGroups: ["Teens (13-17)", "Adults (18+)",],
    color: "from-fuchsia-500 to-pink-500",
    icon: Medal,
    popular: false,
  },
  {
    id: "rescue",
    title: "Rescue",
    subtitle: "Safety & Lifesaving",
    description: "Learn essential water safety and basic lifesaving skills.",
    features: [
      "Rescue techniques",
      "Towing skills",
      "Safe entries",
      "Emergency response",
      "Teamwork drills",
    ],
    duration: "3-5 weeks",
    groupSize: "6-10 students",
    ageGroups: ["Teens (15+)", "Adults (18+)",],
    color: "from-red-400 to-yellow-400",
    icon: Star,
    popular: false,
  },
  {
    id: "aqua-pro",
    title: "Aqua Pro",
    subtitle: "Mastery Stage",
    description: "Achieve mastery with advanced drills, leadership, and coaching basics.",
    features: [
      "Advanced drills",
      "Peer coaching",
      "Leadership in water",
      "Technique analysis",
      "Personal bests",
    ],
    duration: "Ongoing",
    groupSize: "4-8 students",
    ageGroups: ["Teens (16+)", "Adults (18+)",],
    color: "from-sky-400 to-blue-700",
    icon: Flame,
    popular: false,
  },
]

export function EnhancedSkillLevels() {
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

export default skillLevels;
