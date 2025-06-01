"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, CheckCircle, Mail, Phone, MapPin } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100/50 to-white pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-sky-900 mb-4"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sky-700 max-w-2xl mx-auto"
          >
            Have questions about our swimming programs? We're here to help! Send us a message and we'll get back to you
            as soon as possible.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-sky-100"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full py-12 text-center rounded-2xl"
              >
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-sky-600" />
                </div>
                <h3 className="text-xl font-bold text-sky-900 mb-2">Message Sent!</h3>
                <p className="text-sky-700">Thank you for contacting us. We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-sky-800 mb-1">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="border-sky-200 focus:border-sky-500 rounded-xl"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-sky-800 mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="border-sky-200 focus:border-sky-500 rounded-xl"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-sky-800 mb-1">
                    Phone Number (optional)
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(123) 456-7890"
                    className="border-sky-200 focus:border-sky-500 rounded-xl"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-sky-800 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    required
                    className="border-sky-200 focus:border-sky-500 min-h-[120px] rounded-xl"
                  />
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 text-white py-2 rounded-2xl"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div className="bg-gradient-to-r from-sky-600 to-sky-500 rounded-3xl shadow-xl p-6 md:p-8 text-white mb-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 mt-0.5 text-sky-200" />
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a
                      href="mailto:info@individualmedley.com"
                      className="text-sky-100 hover:text-white transition-colors"
                    >
                      info@individualmedley.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 mt-0.5 text-sky-200" />
                  <div>
                    <p className="font-medium">Call Us</p>
                    <a href="tel:+11234567890" className="text-sky-100 hover:text-white transition-colors">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-0.5 text-sky-200" />
                  <div>
                    <p className="font-medium">Visit Us</p>
                    <address className="text-sky-100 not-italic">
                      123 Aquatic Drive
                      <br />
                      Waterfront, CA 90210
                    </address>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-sky-100 rounded-3xl shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-sky-900 mb-4">Operating Hours</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-sky-800 font-medium">Monday - Friday</span>
                  <span className="text-sky-700">6:00 AM - 9:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sky-800 font-medium">Saturday</span>
                  <span className="text-sky-700">7:00 AM - 8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-sky-800 font-medium">Sunday</span>
                  <span className="text-sky-700">8:00 AM - 6:00 PM</span>
                </li>
              </ul>
              <div className="mt-6">
                <p className="text-sky-700 text-sm">
                  <strong>Note:</strong> Hours may vary on holidays. Please call ahead to confirm.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
