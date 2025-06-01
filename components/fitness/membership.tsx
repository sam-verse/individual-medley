"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, X, ArrowRight, Clock, Users, Zap } from "lucide-react"

export default function Membership() {
  const sectionRef = useRef<HTMLElement>(null)
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null)

  useEffect(() => {
    // Animate section on scroll
    if (sectionRef.current) {
      gsap.from(sectionRef.current.querySelectorAll(".animate-on-scroll"), {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
      })
    }
  }, [])

  const membershipPlans = [
    {
      name: "Basic",
      price: 49,
      period: "monthly",
      description: "Perfect for beginners looking to start their fitness journey.",
      features: [
        { name: "Access to main gym area", included: true },
        { name: "Basic fitness assessment", included: true },
        { name: "Access to group classes", included: false },
        { name: "Personal training sessions", included: false },
        { name: "Nutrition consultation", included: false },
        { name: "Access to recovery zone", included: false },
      ],
      color: "from-blue-600 to-blue-500",
      popular: false,
    },
    {
      name: "Premium",
      price: 89,
      period: "monthly",
      description: "Our most popular plan for dedicated fitness enthusiasts.",
      features: [
        { name: "Access to main gym area", included: true },
        { name: "Comprehensive fitness assessment", included: true },
        { name: "Access to group classes", included: true },
        { name: "Personal training sessions (2/month)", included: true },
        { name: "Nutrition consultation", included: false },
        { name: "Access to recovery zone", included: true },
      ],
      color: "from-blue-600 to-blue-400",
      popular: true,
    },
    {
      name: "Elite",
      price: 129,
      period: "monthly",
      description: "The ultimate fitness experience with all premium features.",
      features: [
        { name: "Access to main gym area", included: true },
        { name: "Comprehensive fitness assessment", included: true },
        { name: "Unlimited access to group classes", included: true },
        { name: "Personal training sessions (4/month)", included: true },
        { name: "Nutrition consultation", included: true },
        { name: "Access to recovery zone", included: true },
      ],
      color: "from-blue-500 to-cyan-400",
      popular: false,
    },
  ]

  const handleSelectPlan = (index: number) => {
    setSelectedPlan(index)
  }

  return (
    <section id="membership" ref={sectionRef} className="py-12 md:py-16 lg:py-20 px-3 md:px-6 lg:px-10">
      <div className="container mx-auto w-full">
        <div className="text-center mb-12 md:mb-16 animate-on-scroll">
          <div className="inline-block px-3 md:px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-xs md:text-sm font-medium mb-4">
            MEMBERSHIP PLANS
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
            JOIN OUR FITNESS COMMUNITY
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-blue-300 max-w-3xl mx-auto px-4">
            Choose the membership plan that fits your fitness goals and lifestyle. All plans include access to our
            state-of-the-art facilities and expert staff.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 animate-on-scroll">
          {membershipPlans.map((plan, index) => (
            <Card
              key={index}
              className={`bg-navy-800/80 backdrop-blur-sm border-blue-900 hover:border-blue-600 transition-all duration-300 overflow-hidden relative ${plan.popular ? "ring-1 md:ring-2 ring-blue-400 ring-offset-1 md:ring-offset-2 ring-offset-navy-900" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-3 md:px-4 py-1 transform rotate-45 translate-x-[25%] md:translate-x-[30%] translate-y-[100%] md:translate-y-[120%] shadow-lg">
                    POPULAR
                  </div>
                </div>
              )}

              <div className={`h-1 md:h-2 bg-gradient-to-r ${plan.color}`}></div>

              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-blue-300 ml-1">/{plan.period}</span>
                </div>

                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">{plan.description}</p>

                <div className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      {feature.included ? (
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                          <Check className="w-2 h-2 md:w-3 md:h-3" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-navy-700 text-gray-500 flex items-center justify-center mr-2 md:mr-3 flex-shrink-0">
                          <X className="w-2 h-2 md:w-3 md:h-3" />
                        </div>
                      )}
                      <span className={`text-xs md:text-sm ${feature.included ? "text-gray-300" : "text-gray-500"}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${plan.color} text-white text-sm md:text-base py-2 md:py-3`}
                  onClick={() => handleSelectPlan(index)}
                >
                  {plan.popular ? "Choose Popular Plan" : "Select Plan"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Membership Benefits */}
        <div className="mt-12 md:mt-16 animate-on-scroll">
          <Card className="bg-navy-800/80 backdrop-blur-sm border-blue-900 p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Membership Benefits</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-navy-700 p-3 md:p-4 rounded-lg border border-blue-800">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 md:mb-4">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Flexible Hours</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  Access our facilities from 5:30 AM to 9:00 PM on weekdays and extended hours on weekends.
                </p>
              </div>

              <div className="bg-navy-700 p-3 md:p-4 rounded-lg border border-blue-800">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 md:mb-4">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Expert Trainers</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  Work with our certified fitness professionals who are dedicated to helping you achieve your goals.
                </p>
              </div>

              <div className="bg-navy-700 p-3 md:p-4 rounded-lg border border-blue-800">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-3 md:mb-4">
                  <Zap className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Premium Equipment</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  Train with state-of-the-art fitness equipment designed to maximize your workout efficiency.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 md:mt-16 animate-on-scroll">
          <Card className="bg-navy-800/80 backdrop-blur-sm border-blue-900 p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Frequently Asked Questions</h3>

            <div className="space-y-4">
              <div className="bg-navy-700 p-3 md:p-4 rounded-lg border border-blue-800">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Is there a joining fee?</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  Yes, there is a one-time joining fee of $49 for all membership plans. This fee is waived during
                  promotional periods.
                </p>
              </div>

              <div className="bg-navy-700 p-3 md:p-4 rounded-lg border border-blue-800">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">Can I freeze my membership?</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  Yes, you can freeze your membership for up to 3 months per year with a small monthly maintenance fee.
                </p>
              </div>

              <div className="bg-navy-700 p-3 md:p-4 rounded-lg border border-blue-800">
                <h4 className="text-base md:text-lg font-semibold text-white mb-2">What is the cancellation policy?</h4>
                <p className="text-gray-300 text-sm md:text-base">
                  Memberships require a 30-day written notice for cancellation. There are no cancellation fees after the
                  initial 3-month commitment period.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 md:mt-16 animate-on-scroll">
          <Card className="bg-gradient-to-r from-blue-900 to-blue-800 border-blue-700 p-6 md:p-8 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Ready to Start Your Fitness Journey?</h3>
            <p className="text-blue-200 mb-4 md:mb-6 max-w-2xl mx-auto text-sm md:text-base">
              Join today and get a free fitness assessment and personalized workout plan to kickstart your
              transformation.
            </p>
            <Button
              className="bg-white text-blue-900 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-6 text-sm md:text-lg font-semibold"
              data-book-now="true"
            >
              Join Now <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
