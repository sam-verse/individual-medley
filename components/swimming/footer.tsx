"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { 
  Instagram, 
  Twitter, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Waves, 
  Calendar, 
  Users, 
  Award, 
  Clock,
  MessageCircle,
  PhoneCall,
  Navigation,
  ArrowRight,
  Waves as WavesIcon
} from 'lucide-react'

// Social media links with colors
const socialLinks = [
  { 
    icon: Instagram, 
    label: 'Instagram', 
    color: 'hover:text-pink-500',
    url: '#'
  },
  { 
    icon: Twitter, 
    label: 'Twitter', 
    color: 'hover:text-blue-400',
    url: '#'
  },
  { 
    icon: Facebook, 
    label: 'Facebook', 
    color: 'hover:text-blue-600',
    url: '#'
  },
  { 
    icon: Mail, 
    label: 'Email', 
    color: 'hover:text-cyan-400',
    url: 'mailto:hello@swimacademy.com'
  }
]

// Navigation links - Mapped to match navbar sections
const navLinks = [
  { name: 'Programs', href: '#programs', mobileRow: 1 },
  { name: 'Skill Levels', href: '#skill-levels', mobileRow: 1 },
  { name: 'Schedule', href: '#schedule', mobileRow: 2 },
  { name: 'Instructors', href: '#instructors', mobileRow: 2 },
  { name: 'Contact', href: '#contact', mobileRow: 3 }
]

// Contact information
const contactInfo = [
  { 
    icon: MapPin, 
    text: '123 Ocean View, Beachfront',
    href: 'https://maps.google.com?q=123+Ocean+View,+Beachfront',
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
    text: 'hello@swimacademy.com',
    href: 'mailto:hello@swimacademy.com'
  },
  {
    icon: Clock,
    text: 'Mon-Fri: 6:00 AM - 8:00 PM\nSat-Sun: 8:00 AM - 6:00 PM',
    className: 'whitespace-pre-line'
  }
]

export default function Footer() {
  // Handle smooth scrolling for navigation links
  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
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
    <footer id="contact" className="bg-gradient-to-b from-sky-900 to-blue-900 text-white pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <WavesIcon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Swim Academy
                  </span>
                </h3>
              </div>
              <p className="text-sky-100 text-sm leading-relaxed">
                Dive into excellence with our professional swimming programs for all ages and skill levels. 
                Join our community of passionate swimmers today!
              </p>
            </div>
            <div className="flex items-center space-x-1.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className={`relative p-2.5 rounded-xl bg-blue-900/40 hover:bg-blue-800/60 transition-all duration-200 group`}
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className={`h-5 w-5 ${social.color}`} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-2"></span>
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
                    onClick={handleNavClick}
                    className="group flex items-center text-sky-200 hover:text-white transition-colors text-sm py-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all"></span>
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
                    onClick={handleNavClick}
                    className="group flex items-center text-sky-200 hover:text-white transition-colors text-sm py-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-cyan-400 group-hover:shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all"></span>
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>



          {/* Newsletter */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold mb-2 text-white flex items-center">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mr-2"></span>
                Newsletter
              </h3>
              <p className="text-sky-200 text-sm">Get swimming tips and exclusive offers</p>
            </div>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-blue-900/50 border border-blue-700 rounded-xl px-4 py-3 text-white placeholder-sky-300 focus:outline-none focus:ring-1 focus:ring-cyan-400/50 focus:border-transparent text-sm transition-all duration-200"
                  required
                />
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-cyan-400/30 pointer-events-none transition-all duration-200"></div>
              </div>
              <motion.button 
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2.5 px-6 rounded-2xl font-medium hover:opacity-90 transition-all duration-300"
                whileHover={{ scale: 1.02, boxShadow: '0 0 15px rgba(14, 165, 233, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 pt-8 text-center md:text-left">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-sky-300 text-sm">
              © {new Date().getFullYear()} Swim Academy. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sky-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sky-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-sky-300 hover:text-white text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 