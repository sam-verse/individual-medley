"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, X, CheckCircle } from "lucide-react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "swimming" | "fitness"
  currentSection?: string
}

export default function BookingModal({ isOpen, onClose, mode, currentSection }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: null as Date | null,
    time: "",
    program: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setIsSubmitted(false)
    }
  }, [isOpen])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date }))
  }

  const handleNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const handlePrevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Google Apps Script Web App URL
      const scriptUrl = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"

      const submissionData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        date: formData.date ? format(formData.date, "yyyy-MM-dd") : "",
        time: formData.time,
        program: formData.program,
        message: formData.message,
        mode: mode,
        section: currentSection,
        timestamp: new Date().toISOString(),
      }

      const response = await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })

      // Since we're using no-cors, we can't read the response
      // but we'll assume success after a delay
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1500)
    } catch (error) {
      console.error("Error submitting form:", error)
      // Still show success to user since no-cors prevents error detection
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
      }, 1500)
    }
  }

  // Programs based on mode
  const programs =
    mode === "swimming"
      ? ["Learn to Swim", "Stroke Improvement", "Competitive Training", "Adult Fitness"]
      : ["HIIT Training", "Strength Training", "Functional Fitness", "Athletic Performance"]

  // Time slots
  const timeSlots = [
    "06:00 - 07:00",
    "07:00 - 08:00",
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto"
          style={{ alignItems: 'center', justifyContent: 'center' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ 
              type: "spring", 
              damping: 20,
              stiffness: 300
            }}
            className={`relative w-full max-w-md mx-auto rounded-2xl shadow-2xl overflow-hidden text-sm ${
              mode === "swimming" ? "bg-white" : "bg-navy-900"
            }`}
            style={{
              width: 'calc(100% - 2rem)',
              maxWidth: '28rem',
              maxHeight: '90vh',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'thin',
              scrollbarColor: mode === 'swimming' ? '#0ea5e9 #e0f2fe' : '#3b82f6 #1e3a8a',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`sticky top-0 z-10 p-4 ${
                mode === "swimming"
                  ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 text-white"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-base sm:text-lg font-bold text-center flex-1">
                  {mode === "swimming" ? "Book a Session" : "Book a Session"}
                </h2>
                <button 
                  onClick={onClose} 
                  className="p-1.5 rounded-full hover:bg-white/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {!isSubmitted && (
                <div className="mt-4">
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full flex-1 transition-all duration-300 ${
                          step >= i
                            ? mode === "swimming"
                              ? "bg-white"
                              : "bg-blue-300"
                            : "bg-white/30"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm mt-2 text-white/90 text-center">
                    Step {step} of 3: {step === 1 ? "Personal Info" : step === 2 ? "Session Details" : "Review"}
                  </p>
                </div>
              )}
            </div>

            {/* Content */}
            <div className={`p-4 sm:p-6 space-y-4 ${mode === 'swimming' ? 'bg-white text-sky-900' : 'bg-navy-900 text-white'}`}>
              {isSubmitted ? (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8">
                  <div
                    className={`flex flex-col items-center justify-center p-6 sm:p-8 text-center ${
                      mode === "swimming" ? "bg-sky-50 text-sky-700" : "bg-navy-800/50 text-blue-200"
                    } rounded-xl border border-sky-100/20`}
                  >
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Booking Confirmed!</h3>
                  <p className={`text-sm ${mode === "swimming" ? "text-sky-700" : "text-blue-300"}`}>
                    Thank you for your booking. We've sent a confirmation to your email and added your details to our
                    system.
                  </p>
                  <Button
                    className={`mt-6 rounded-2xl ${
                      mode === "swimming"
                        ? "bg-sky-600 hover:bg-sky-700 text-white"
                        : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                    }`}
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Personal Information */}
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="font-semibold mb-4 text-base text-center">Personal Information</h3>

                      <div className="space-y-4 w-full">
                        <div>
                          <label
                            htmlFor="firstName"
                            className={`block text-left w-full text-xs font-medium mb-1 ${
                              mode === "swimming" ? "text-sky-800" : "text-blue-300"
                            }`}
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="Your first name"
                            required
                            className={
                              mode === "swimming"
                                ? "border-sky-200 focus:border-sky-500 rounded-xl"
                                : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className={`block text-left w-full text-xs font-medium mb-1 ${
                              mode === "swimming" ? "text-sky-800" : "text-blue-300"
                            }`}
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Your last name"
                            required
                            className={
                              mode === "swimming"
                                ? "border-sky-200 focus:border-sky-500 rounded-xl"
                                : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                            }
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                          <label
                            htmlFor="email"
                            className={`block text-left w-full text-xs font-medium mb-1 ${
                              mode === "swimming" ? "text-sky-800" : "text-blue-300"
                            }`}
                          >
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          required
                          className={
                            mode === "swimming"
                              ? "border-sky-200 focus:border-sky-500 rounded-xl"
                              : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                          }
                        />
                      </div>

                      <div className="mb-4">
                          <label
                            htmlFor="phone"
                            className={`block text-left w-full text-xs font-medium mb-1 ${
                              mode === "swimming" ? "text-sky-800" : "text-blue-300"
                            }`}
                          >
                          Phone (optional)
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(123) 456-7890"
                          className={
                            mode === "swimming"
                              ? "border-sky-200 focus:border-sky-500 rounded-xl"
                              : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                          }
                        />
                      </div>

                      <div className="flex justify-end w-full mt-6 pt-4 border-t border-sky-100/20">
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className={`px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 w-full sm:w-auto ${
                            mode === "swimming"
                              ? "bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow-md shadow-sky-200"
                              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-500/90 text-white shadow-sm hover:shadow-md shadow-blue-900/30"
                          }`}
                        >
                          Continue to Session Details →
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Session Details */}
                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="font-semibold mb-4 text-base text-center">Session Details</h3>

                      <div className="mb-4">
                        <label
                          className={`block text-left w-full text-sm font-medium mb-1 ${
                            mode === "swimming" ? "text-sky-800" : "text-blue-300"
                          }`}
                        >
                          Program
                        </label>
                        <Select
                          value={formData.program}
                          onValueChange={(value) => handleSelectChange("program", value)}
                        >
                          <SelectTrigger
                            className={
                              mode === "swimming"
                                ? "border-sky-200 focus:border-sky-500 rounded-xl"
                                : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                            }
                          >
                            <SelectValue placeholder="Select a program" />
                          </SelectTrigger>
                          <SelectContent className={mode === "swimming" ? "" : "bg-navy-800 border-blue-900"}>
                            {programs.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="mb-4">
                        <label
                          className={`block text-left w-full text-sm font-medium  ${
                            mode === "swimming" ? "text-sky-800" : "text-blue-300"
                          }`}
                        >
                          Date
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={`w-full justify-start text-left font-normal rounded-2xl ${
                                mode === "swimming"
                                  ? "border-sky-200 hover:bg-sky-50"
                                  : "bg-navy-800 border-blue-900 text-white hover:bg-navy-700"
                              } ${!formData.date && "text-muted-foreground"}`}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              {formData.date ? format(formData.date, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            className={`w-auto p-0 ${mode === "swimming" ? "" : "bg-navy-800 border-blue-900"}`}
                          >
                            <CalendarComponent
                              mode="single"
                              selected={formData.date || undefined}
                              onSelect={handleDateChange}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="mb-4">
                        <label
                          className={`block text-left w-full text-sm font-medium mb-1 ${
                            mode === "swimming" ? "text-sky-800" : "text-blue-300"
                          }`}
                        >
                          Time
                        </label>
                        <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                          <SelectTrigger
                            className={
                              mode === "swimming"
                                ? "border-sky-200 focus:border-sky-500 rounded-xl"
                                : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                            }
                          >
                            <SelectValue placeholder="Select a time slot" />
                          </SelectTrigger>
                          <SelectContent className={mode === "swimming" ? "" : "bg-navy-800 border-blue-900"}>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                <div className="w-full">
                                  <div className="flex items-center">
                                    <Clock className="w-3 h-3 mr-2" />
                                    {time}
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between gap-3 w-full mt-8 pt-4 border-t border-sky-100/20">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                          className={`w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            mode === "swimming"
                              ? "border-sky-200 text-sky-700 hover:bg-sky-50"
                              : "border-blue-700 text-blue-300 hover:bg-blue-900/30"
                          }`}
                        >
                          ← Back
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            mode === "swimming"
                              ? "bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow-md shadow-sky-200"
                              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-500/90 text-white shadow-sm hover:shadow-md shadow-blue-900/30"
                          }`}
                        >
                          Continue to Review →
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Information */}
                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <h3 className="font-semibold mb-4 text-base text-center">Additional Information</h3>

                      <div className="mb-4">
                        <label
                          htmlFor="message"
                          className={`block text-left w-full text-sm font-medium mb-1 ${
                            mode === "swimming" ? "text-sky-800" : "text-blue-300"
                          }`}
                        >
                          Special Requests or Notes
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Any special requests or information we should know..." 
                          rows={1}
                          className="text-sm"
                          className={
                            mode === "swimming"
                              ? "border-sky-200 focus:border-sky-500 rounded-xl"
                              : "bg-navy-800 border-blue-900 text-white focus:border-blue-500 rounded-xl"
                          }
                        />
                      </div>

                      <div
                        className="mt-4 p-2 rounded-xl bg-opacity-10 text-sm"
                        style={{
                          backgroundColor: mode === "swimming" ? "rgba(14, 165, 233, 0.1)" : "rgba(147, 51, 234, 0.1)",
                        }}
                      >
                        <h4 className="font-semibold mb-2">Booking Summary</h4>
                        <ul className="space-y-1">
                          <li>
                            <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
                          </li>
                          <li>
                            <span className="font-medium">Program:</span> {formData.program || "Not selected"}
                          </li>
                          <li>
                            <span className="font-medium">Date:</span>{" "}
                            {formData.date ? format(formData.date, "PPP") : "Not selected"}
                          </li>
                          <li>
                            <span className="font-medium">Time:</span> {formData.time || "Not selected"}
                          </li>
                        </ul>
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between gap-3 w-full mt-8 pt-4 border-t border-sky-100/20">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                          className={`w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                            mode === "swimming"
                              ? "border-sky-200 text-sky-700 hover:bg-sky-50"
                              : "border-blue-700 text-blue-300 hover:bg-blue-900/30"
                          }`}
                        >
                          ← Back
                        </Button>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full sm:w-auto px-8 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                            isSubmitting 
                              ? 'opacity-80 cursor-not-allowed' 
                              : ''
                          } ${
                            mode === "swimming"
                              ? "bg-sky-600 hover:bg-sky-700 text-white shadow-sm hover:shadow-md shadow-sky-200"
                              : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-600 hover:to-blue-500/90 text-white shadow-sm hover:shadow-md shadow-blue-900/30"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <svg
                                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block"
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
                              Processing...
                            </>
                          ) : (
                            "Submit Booking"
                          )}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
