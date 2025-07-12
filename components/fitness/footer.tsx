"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Instagram, Twitter, Facebook, Mail, Phone, MapPin, ChevronDown, ChevronUp, Award, Users, Dumbbell, Clock, MessageCircle, PhoneCall, Navigation, ArrowRight } from 'lucide-react'

export default function Footer() {
  // Social media links with colors and real URLs
  const socialLinks = [
    { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500', url: '#' },
    { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400', url: '#' },
    { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-600', url: '#' },
    { icon: Mail, label: 'Email', color: 'hover:text-purple-400', url: 'mailto:hello@fitclub.com' }
  ]

  // Navigation links - Mapped to match navbar sections
  const navLinks = [
    { name: 'Programs', href: '#programs', mobileRow: 1 },
    { name: 'Trainers', href: '#trainers', mobileRow: 1 },
    { name: 'Nutrition', href: '#nutrition', mobileRow: 2 },
    { name: 'Contact', href: '#contact', mobileRow: 2 }
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
    },
    {
      icon: Clock,
      text: 'Mon-Fri: 5:00 AM - 10:00 PM\nSat-Sun: 7:00 AM - 8:00 PM',
      className: 'whitespace-pre-line'
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
    <footer id="contact" className="bg-gradient-to-b from-blue-900 to-purple-900 text-white pt-16 pb-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Brand Info */}
          <div className="space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col items-start sm:flex-row sm:items-center mb-3 gap-2 sm:gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden flex items-center justify-center ">
                  <img src="/images/fitness-logo.png" alt="FitClub Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain" />
                </div>
                <h3 className="text-xl sm:text-3xl font-bold mt-2 sm:mt-0">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    FitClub
                  </span>
                </h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Achieve your best self with our expert trainers, modern equipment, and motivating fitness community. Join FitClub and transform your fitness journey today!
              </p>
            </div>
            <div className="flex items-center space-x-1.5 mt-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className={`relative p-2.5 rounded-xl bg-blue-900/40 transition-all duration-200 group`}
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.12, boxShadow: '0 4px 24px 0 rgba(99,102,241,0.25)' }}
                    whileTap={{ scale: 0.98 }}
                    target={social.url.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <Icon className={`h-5 w-5 transition-colors duration-200 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.7)] ${social.color}`} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
              <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2"></span>
              Quick Links
            </h3>
            {/* Mobile View - 2x2 Grid */}
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
                    className="group flex items-center text-blue-200 hover:text-white transition-colors text-sm py-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all"></span>
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
                    className="group flex items-center text-blue-200 hover:text-white transition-colors text-sm py-1.5"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 group-hover:bg-purple-400 group-hover:shadow-[0_0_8px_rgba(139,92,246,0.8)] transition-all"></span>
                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="w-full flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center">
                <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mr-2"></span>
              Contact
              </h3>
            <ul className="space-y-4">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <li key={idx} className="flex items-start gap-3 text-blue-100 text-sm">
                    <Icon className="w-5 h-5 flex-shrink-0 text-purple-400 mt-0.5" />
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.target || undefined}
                        rel={info.rel || undefined}
                        className="text-white hover:text-purple-200 transition-colors font-medium"
                      >
                        <span className={info.className || ''}>{info.text}</span>
                      </a>
                    ) : (
                      <span className={info.className || ''}>{info.text}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-700 pt-8 text-center md:text-left mt-10">
          <div className="md:flex md:items-center md:justify-between">
            <p className="text-blue-300 text-sm">
              © {new Date().getFullYear()} FitClub. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-blue-300 hover:text-white text-sm transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
