"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  return (
    <footer ref={footerRef} className="bg-sky-900 text-white py-16 px-4 md:px-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1: Logo and About */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold">Individual Medley</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sky-200 mb-6"
            >
              Providing exceptional swimming instruction and fitness programs for all ages and skill levels since 2005.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-4"
            >
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-sky-800 flex items-center justify-center hover:bg-sky-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-sky-800 flex items-center justify-center hover:bg-sky-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-sky-800 flex items-center justify-center hover:bg-sky-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold mb-4 border-b border-sky-700 pb-2"
            >
              Quick Links
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <li>
                <Link href="#programs" className="text-sky-200 hover:text-white transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="#levels" className="text-sky-200 hover:text-white transition-colors">
                  Skill Levels
                </Link>
              </li>
              <li>
                <Link href="#schedule" className="text-sky-200 hover:text-white transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="#instructors" className="text-sky-200 hover:text-white transition-colors">
                  Instructors
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-sky-200 hover:text-white transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#location" className="text-sky-200 hover:text-white transition-colors">
                  Location
                </Link>
              </li>
            </motion.ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold mb-4 border-b border-sky-700 pb-2"
            >
              Contact Information
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-sky-400 mt-0.5" />
                <span className="text-sky-200">
                  123 Aquatic Drive
                  <br />
                  Watertown, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-sky-400" />
                <span className="text-sky-200">(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-sky-400" />
                <span className="text-sky-200">info@individualmedley.com</span>
              </li>
            </motion.ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-lg font-semibold mb-4 border-b border-sky-700 pb-2"
            >
              Hours of Operation
            </motion.h3>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-2"
            >
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-sky-400" />
                <div>
                  <span className="font-medium">Monday - Friday:</span>
                  <span className="text-sky-200 ml-2">5:30 AM - 9:00 PM</span>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-sky-400" />
                <div>
                  <span className="font-medium">Saturday:</span>
                  <span className="text-sky-200 ml-2">7:00 AM - 7:00 PM</span>
                </div>
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-sky-400" />
                <div>
                  <span className="font-medium">Sunday:</span>
                  <span className="text-sky-200 ml-2">8:00 AM - 5:00 PM</span>
                </div>
              </li>
            </motion.ul>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="border-t border-sky-800 mt-10 pt-6 text-center text-sky-300"
        >
          <p>&copy; {new Date().getFullYear()} Individual Medley. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
