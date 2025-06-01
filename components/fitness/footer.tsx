"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react'

export default function Footer() {
  // Social media links with colors
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-600' }
  ]

  // Navigation links - Mapped to match navbar sections
  const navLinks = [
    { name: 'Programs', href: '#programs', mobileRow: 1 },
    { name: 'Schedule', href: '#schedule', mobileRow: 1 },
    { name: 'Trainers', href: '#trainers', mobileRow: 2 },
    { name: 'Nutrition', href: '#nutrition', mobileRow: 2 },
    { name: 'Contact', href: '#contact', mobileRow: 3 }
  ]

  // Handle smooth scrolling for navigation links
  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Contact information
  const contactInfo = [
    { 
      icon: MapPin, 
      text: '123 Fitness St, City',
      href: 'https://maps.google.com?q=123+Fitness+St,+City',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    { 
      icon: Phone, 
      text: '+1 (123) 456-7890',
      href: 'tel:+11234567890'
    },
    { 
      icon: Mail, 
      text: 'hello@fitclub.com',
      href: 'mailto:hello@fitclub.com'
    }
  ]
  
  // State for mobile accordion
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section)
  }

  // Auto-close mobile menu when clicking a link
  const handleNavClick = () => {
    if (window.innerWidth < 768) { // Only for mobile
      setActiveSection(null)
    }
  }

  return (
    <footer id="contact" className="bg-gradient-to-b from-gray-900 to-black text-white pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  FitClub
                </span>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Transform your life with our expert trainers and state-of-the-art fitness facilities.
              </p>
            </div>
            <div className="flex items-center space-x-1.5">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  className={`relative p-2.5 rounded-xl bg-gray-800/40 hover:bg-gray-800/60 transition-all duration-200 group`}
                  aria-label={social.label}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className={`h-5 w-5 ${social.color}`} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2"></span>
              Quick Links
            </h3>
            {/* Mobile View - 3x2 Grid */}
            <div className="md:hidden grid grid-cols-2 gap-x-8 gap-y-3 w-full max-w-xs">
              {navLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  className={`row-start-${link.mobileRow}`}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-white transition-colors text-sm py-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-blue-400 group-hover:shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all"></span>
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop View - Single Column */}
            <div className="hidden md:block space-y-3">
              {navLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Link 
                    href={link.href}
                    className="group flex items-center text-gray-300 hover:text-white transition-colors text-sm py-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-2 group-hover:bg-blue-400 group-hover:shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-all"></span>
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start space-x-3 group"
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <info.icon className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  {info.href ? (
                    <a 
                      href={info.href} 
                      target={info.target || '_self'}
                      rel={info.rel || ''}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-400">{info.text}</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold mb-2 text-white">Newsletter</h3>
              <p className="text-gray-300 text-sm">Get fitness tips and exclusive offers</p>
            </div>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-sm transition-all duration-200"
                  required
                />
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-blue-500/30 pointer-events-none transition-all duration-200"></div>
              </div>
              <motion.button 
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 px-6 rounded-2xl font-medium hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FitClub. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors hover:underline">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
