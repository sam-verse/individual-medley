"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface LocationMapProps {
  mode: "swimming" | "fitness"
}

export default function LocationMap({ mode }: LocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This would normally load the Google Maps API and initialize the map
    // For this example, we'll create a placeholder that looks like a map
    if (mapRef.current) {
      const mapContainer = mapRef.current

      // Create a placeholder map
      const canvas = document.createElement("canvas")
      canvas.width = mapContainer.clientWidth
      canvas.height = mapContainer.clientHeight

      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Draw a map-like background
        ctx.fillStyle = "#e5e7eb" // Gray background
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Draw some "roads"
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 3

        // Horizontal roads
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.moveTo(0, (canvas.height * (i + 1)) / 6)
          ctx.lineTo(canvas.width, (canvas.height * (i + 1)) / 6)
          ctx.stroke()
        }

        // Vertical roads
        for (let i = 0; i < 5; i++) {
          ctx.beginPath()
          ctx.moveTo((canvas.width * (i + 1)) / 6, 0)
          ctx.lineTo((canvas.width * (i + 1)) / 6, canvas.height)
          ctx.stroke()
        }

        // Draw a marker in the center
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2

        // Pin base
        ctx.fillStyle = mode === "swimming" ? "#0284c7" : "#7c3aed"
        ctx.beginPath()
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
        ctx.fill()

        // Pin outline
        ctx.strokeStyle = "#ffffff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, 10, 0, Math.PI * 2)
        ctx.stroke()
      }

      mapContainer.appendChild(canvas)

      return () => {
        if (canvas.parentNode === mapContainer) {
          mapContainer.removeChild(canvas)
        }
      }
    }
  }, [mode])

  return (
    <section id="location" className={`py-20 px-4 md:px-10 ${mode === "swimming" ? "bg-sky-50/70" : "bg-navy-800/50"}`}>
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`text-3xl md:text-5xl font-bold mb-4 ${mode === "swimming" ? "text-sky-900" : "text-white"}`}
          >
            Find Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`text-xl max-w-3xl mx-auto ${mode === "swimming" ? "text-sky-700" : "text-blue-300"}`}
          >
            Visit our state-of-the-art facility conveniently located in the heart of the city.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`h-[400px] rounded-xl overflow-hidden shadow-lg ${
              mode === "swimming" ? "border border-sky-200" : "border border-blue-900"
            }`}
          >
            <div ref={mapRef} className="w-full h-full relative">
              {/* Map will be loaded here */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4 rounded-lg bg-white/80 backdrop-blur-sm">
                  <p className="font-medium text-gray-700">Google Maps would load here</p>
                  <p className="text-sm text-gray-500">API key required for actual implementation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`rounded-xl shadow-lg overflow-hidden ${
              mode === "swimming" ? "bg-white border border-sky-200" : "bg-navy-700 border border-blue-900"
            }`}
          >
            <div className="p-8">
              <h3 className={`text-2xl font-bold mb-6 ${mode === "swimming" ? "text-sky-900" : "text-white"}`}>
                Contact Information
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className={`w-6 h-6 mr-4 mt-1 ${mode === "swimming" ? "text-sky-500" : "text-blue-400"}`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${mode === "swimming" ? "text-sky-900" : "text-white"}`}>
                      Location
                    </h4>
                    <p className={mode === "swimming" ? "text-sky-700" : "text-blue-200"}>
                      123 Aquatic Drive
                      <br />
                      Watertown, CA 90210
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className={`w-6 h-6 mr-4 mt-1 ${mode === "swimming" ? "text-sky-500" : "text-blue-400"}`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${mode === "swimming" ? "text-sky-900" : "text-white"}`}>
                      Phone
                    </h4>
                    <p className={mode === "swimming" ? "text-sky-700" : "text-blue-200"}>(123) 456-7890</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className={`w-6 h-6 mr-4 mt-1 ${mode === "swimming" ? "text-sky-500" : "text-blue-400"}`} />
                  <div>
                    <h4 className={`font-semibold mb-1 ${mode === "swimming" ? "text-sky-900" : "text-white"}`}>
                      Email
                    </h4>
                    <p className={mode === "swimming" ? "text-sky-700" : "text-blue-200"}>info@individualmedley.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className={`font-semibold mb-3 ${mode === "swimming" ? "text-sky-900" : "text-white"}`}>
                  Hours of Operation
                </h4>
                <ul className={`space-y-2 ${mode === "swimming" ? "text-sky-700" : "text-blue-200"}`}>
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>5:30 AM - 9:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span>7:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Button
                  className={
                    mode === "swimming"
                      ? "bg-sky-600 hover:bg-sky-700 text-white w-full"
                      : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white w-full"
                  }
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                >
                  Get Directions <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
