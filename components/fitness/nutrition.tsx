"use client"

import React, { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Apple,
  Coffee,
  Utensils,
  Droplet,
  Award,
  Check,
  ChefHat,
  Target,
  Zap,
  Heart,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react"
import { motion } from "framer-motion"

gsap.registerPlugin(ScrollTrigger)

export default function Nutrition() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState("plans")

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

  const nutritionPlans = [
    {
      title: "Muscle Building",
      subtitle: "Power & Growth",
      description: "Optimized protein intake and strategic carb timing to maximize muscle growth and recovery.",
      icon: <Award className="w-6 h-6 md:w-8 md:h-8" />,
      macros: { protein: 40, carbs: 40, fats: 20 },
      features: [
        "5-6 meals per day",
        "Pre & post-workout nutrition",
        "High-quality protein sources",
        "Strategic carb cycling",
      ],
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-500/30",
      badge: "Popular",
    },
    {
      title: "Fat Loss",
      subtitle: "Lean & Defined",
      description: "Balanced macronutrient approach with calorie control to promote fat loss while preserving muscle.",
      icon: <Droplet className="w-6 h-6 md:w-8 md:h-8" />,
      macros: { protein: 35, carbs: 25, fats: 40 },
      features: [
        "Intermittent fasting options",
        "Low glycemic carb sources",
        "Healthy fat emphasis",
        "Metabolic boosting foods",
      ],
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30",
      badge: "Beginner",
    },
    {
      title: "Performance",
      subtitle: "Peak Energy",
      description: "Fuel your workouts with optimized nutrition timing and performance-enhancing nutrients.",
      icon: <Zap className="w-6 h-6 md:w-8 md:h-8" />,
      macros: { protein: 30, carbs: 50, fats: 20 },
      features: [
        "Pre-workout carb loading",
        "Electrolyte optimization",
        "Recovery nutrition protocols",
        "Energy sustaining meals",
      ],
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
      badge: "Advanced",
    },
  ]

  const mealIdeas = [
    {
      time: "Breakfast",
      meal: "Protein-packed overnight oats with berries and almond butter",
      icon: <Coffee className="w-5 h-5" />,
      calories: "420 cal",
      macros: "P: 25g | C: 45g | F: 12g",
      prepTime: "5 min",
    },
    {
      time: "Lunch",
      meal: "Grilled chicken quinoa bowl with roasted vegetables",
      icon: <Utensils className="w-5 h-5" />,
      calories: "520 cal",
      macros: "P: 35g | C: 40g | F: 18g",
      prepTime: "15 min",
    },
    {
      time: "Dinner",
      meal: "Baked salmon with sweet potato and steamed broccoli",
      icon: <ChefHat className="w-5 h-5" />,
      calories: "480 cal",
      macros: "P: 32g | C: 35g | F: 20g",
      prepTime: "20 min",
    },
    {
      time: "Snack",
      meal: "Greek yogurt parfait with mixed nuts and honey",
      icon: <Apple className="w-5 h-5" />,
      calories: "280 cal",
      macros: "P: 18g | C: 25g | F: 12g",
      prepTime: "3 min",
    },
  ]

  const supplements = [
    {
      name: "Whey Protein",
      benefit: "Enhances muscle recovery and growth",
      description: "Premium quality whey protein isolate with 24g protein per serving",
      icon: <Target className="w-5 h-5" />,
      rating: "4.9/5",
      price: "$29.99",
      color: "from-blue-600 to-cyan-500",
      features: ["30 servings per container", "24g protein per serving", "Fast absorption"],
      popular: true
    },
    {
      name: "Creatine Monohydrate",
      benefit: "Boosts power & strength",
      description: "Pure micronized creatine for improved performance",
      icon: <Zap className="w-5 h-5" />,
      rating: "4.8/5",
      price: "$19.99",
      color: "from-purple-600 to-pink-500",
      features: ["100 servings", "Increases ATP production", "Supports muscle growth"],
      popular: true
    },
    {
      name: "Omega-3 Fish Oil",
      benefit: "Supports joint & heart health",
      description: "High-potency EPA & DHA for optimal benefits",
      icon: <Heart className="w-5 h-5" />,
      rating: "4.7/5",
      price: "$24.99",
      color: "from-amber-500 to-yellow-400",
      features: ["120 softgels", "1000mg per serving", "Supports brain function"],
      popular: false
    },
    {
      name: "Multivitamin Complex",
      benefit: "Complete daily nutrition",
      description: "Essential vitamins and minerals for overall wellness",
      icon: <Award className="w-5 h-5" />,
      rating: "4.6/5",
      price: "$14.99",
      color: "from-emerald-600 to-teal-400",
      features: ["60 tablets", "22 essential nutrients", "Immune support"],
      popular: true
    },
  ]

  return (
    <section id="nutrition" ref={sectionRef} className="py-12 md:py-20 px-4 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16 animate-on-scroll pt-24 sm:pt-0"
        >
          <div className="inline-block px-3 md:px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-xs md:text-sm font-medium mb-3 md:mb-4">
            NUTRITION & WELLNESS
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
            FUEL YOUR PERFORMANCE
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-blue-300 max-w-3xl mx-auto px-2 leading-relaxed">
            Optimize your results with science-backed nutrition plans designed to complement your fitness goals and
            lifestyle.
          </p>
        </motion.div>

        {/* Tab Navigation - Responsive Single Row */}
        <div className="w-full overflow-x-auto pb-3 -mx-4 px-4 md:px-0 md:mx-0 no-scrollbar animate-on-scroll">
          <div className="flex justify-center min-w-max mx-auto">
            <div className="inline-flex items-center bg-navy-800/50 backdrop-blur-sm rounded-2xl p-1 border border-blue-900/50">
              {[
                {
                  key: "plans",
                  label: "Nutrition Plans",
                  shortLabel: "Plans",
                  icon: <Target className="w-4 h-4 flex-shrink-0" />,
                },
                {
                  key: "meals",
                  label: "Sample Meals",
                  shortLabel: "Meals",
                  icon: <ChefHat className="w-4 h-4 flex-shrink-0" />,
                },
                {
                  key: "supplements",
                  label: "Supplements",
                  shortLabel: "Supps",
                  icon: <Award className="w-4 h-4 flex-shrink-0" />,
                },
              ].map((tab) => (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg rounded-xl'
                      : 'text-blue-300 hover:text-white hover:bg-blue-900/30 rounded-xl'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                    {tab.icon}
                    <span className="whitespace-nowrap">
                      {window.innerWidth < 480 ? tab.shortLabel : tab.label}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Add this to your global CSS */}
        <style jsx global>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Nutrition Plans Tab - Enhanced Mobile */}
        {activeTab === "plans" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 animate-on-scroll items-stretch"
          >
            {nutritionPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group relative mt-4"
              >
                {/* Mobile Badge - Removed in favor of single badge in card */}

                <Card
                  className={`${plan.bgColor} backdrop-blur-sm border ${plan.borderColor} p-4 sm:p-5 md:p-6 h-full hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden relative rounded-2xl sm:rounded-3xl flex flex-col justify-between`}
                >
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${plan.color}`}></div>

                  {/* Badge - Top Right Corner */}
                  <div className="absolute -top-px right-0">
                    <span className={`px-4 py-1.5 text-xs font-semibold bg-gradient-to-r ${plan.color} text-white shadow-lg whitespace-nowrap rounded-bl-xl`}>
                      {plan.badge}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 sm:gap-4 mb-4 pt-1">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                      {React.cloneElement(plan.icon, {
                        className: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7'
                      })}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        {plan.title}
                      </h3>
                      <p className="text-blue-300 text-xs sm:text-sm">{plan.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{plan.description}</p>

                  {/* Enhanced Macro Breakdown for Mobile */}
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-blue-300 mb-2">Macro Split:</h4>
                    <div className="flex justify-between gap-2">
                      <div className="flex-1 text-center bg-navy-900/30 rounded-lg p-2">
                        <div className="text-xs text-blue-300 mb-1">Protein</div>
                        <div className="text-sm font-semibold text-white">{plan.macros.protein}%</div>
                      </div>
                      <div className="flex-1 text-center bg-navy-900/30 rounded-lg p-2">
                        <div className="text-xs text-blue-300 mb-1">Carbs</div>
                        <div className="text-sm font-semibold text-white">{plan.macros.carbs}%</div>
                      </div>
                      <div className="flex-1 text-center bg-navy-900/30 rounded-lg p-2">
                        <div className="text-xs text-blue-300 mb-1">Fats</div>
                        <div className="text-sm font-semibold text-white">{plan.macros.fats}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Compact Features for Mobile */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-blue-300 mb-3">What's Included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-4 h-4 mt-0.5 mr-3 text-green-400 flex-shrink-0" />
                          <span className="text-sm text-gray-100 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm py-2.5 font-medium rounded-2xl hover:scale-[1.02] active:scale-95`}
                    data-book-now="true"
                  >
                    Get This Plan
                    <ArrowRight className="ml-2 w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Sample Meals Tab - Enhanced Mobile */}
        {activeTab === "meals" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-8 lg:space-y-0 animate-on-scroll"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4 text-center md:text-left">Daily Meal Examples</h3>
              {mealIdeas.map((meal, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-navy-800/50 backdrop-blur-sm border border-blue-900/50 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-900/50 flex items-center justify-center text-blue-400 flex-shrink-0">
                      {meal.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-blue-300 text-sm sm:text-base">{meal.time}</h4>
                  <div className="flex gap-2">
                    <span className="text-[10px] sm:text-xs bg-blue-900/40 text-blue-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                      <span>{meal.prepTime}</span>
                    </span>
                    <span className="text-[10px] sm:text-xs bg-green-900/40 text-green-200 px-2 py-0.5 rounded-full">
                      {meal.calories}
                    </span>
                  </div>
                </div>
                      <p className="text-white mb-2 text-sm leading-relaxed">{meal.meal}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {meal.macros.split('|').map((macro, i) => (
                            <span key={i} className="text-[10px] bg-blue-900/40 text-blue-200 px-2 py-0.5 rounded-full">
                              {macro.trim()}
                            </span>
                          ))}
                        </div>
                        <TrendingUp className="w-4 h-4 text-green-400 flex-shrink-0" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-6 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-4">Nutrition Consultation</h3>
              <p className="mb-6 text-blue-100 text-sm leading-relaxed">
                Get a personalized nutrition plan tailored to your specific goals, preferences, and dietary
                requirements.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  "Comprehensive body composition analysis",
                  "Custom meal planning & recipes",
                  "Supplement recommendations",
                  "Ongoing support & adjustments",
                  "Progress tracking & monitoring",
                ].map((item, i) => (
                  <div key={i} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-blue-100 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full bg-white text-blue-900 hover:bg-blue-50 font-semibold text-sm py-3 rounded-2xl"
                data-book-now="true"
              >
                Schedule Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Supplements Tab */}
        {activeTab === "supplements" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="animate-on-scroll"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10">
              {supplements.map((supplement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative h-full"
                >
                  {/* Popular Badge */}
                  {supplement.popular && (
                    <div className="absolute -top-3 right-4 z-10">
                      <span className="px-3 py-1 text-xs font-bold bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full shadow-lg">
                        MOST POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className={`h-full bg-gradient-to-br from-navy-800/80 to-navy-900/80 backdrop-blur-sm border border-blue-900/30 rounded-2xl p-5 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 flex flex-col`}>
                    {/* Icon with gradient background */}
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${supplement.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4`}>
                      {React.cloneElement(supplement.icon, { className: 'w-6 h-6' })}
                    </div>
                    
                    {/* Title & Rating */}
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-white">{supplement.name}</h4>
                      <span className="flex items-center bg-yellow-900/40 text-yellow-200 text-xs px-2 py-0.5 rounded-full">
                        ⭐ {supplement.rating}
                      </span>
                    </div>
                    
                    {/* Benefit & Description */}
                    <p className="text-blue-300 text-sm font-medium mb-3">{supplement.benefit}</p>
                    <p className="text-gray-400 text-xs mb-4 flex-grow">{supplement.description}</p>
                    
                    {/* Features */}
                    <ul className="space-y-2 mb-5">
                      {supplement.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <Check className="w-3.5 h-3.5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-xs text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {/* Price & Button */}
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-white">{supplement.price}</span>
                        <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded-full">In Stock</span>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        <Button 
                          className={`w-full bg-gradient-to-r ${supplement.color} text-white hover:opacity-90 hover:shadow-lg transition-all duration-300 rounded-xl py-2`}
                        >
                          Add to Cart
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80 backdrop-blur-sm z-0" />
              {/* Animated Background Elements */}
              <div className="absolute inset-0 overflow-hidden opacity-20">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: Math.random() * 20 + 10,
                      height: Math.random() * 20 + 10,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -100],
                      opacity: [0.1, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Need Help Choosing the Right Supplements?</h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                  Our certified nutritionists will analyze your needs and create a personalized supplement stack that complements your fitness goals and lifestyle.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-sm md:text-base font-semibold rounded-2xl group"
                    >
                      Get Personalized Advice
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 px-8 py-3 text-sm md:text-base font-medium rounded-2xl group backdrop-blur-sm"
                    >
                      View All Products
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
