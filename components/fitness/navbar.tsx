"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dumbbell, Menu, X, Flame, Calendar, Users, Apple, MessageCircle, PhoneCall } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FitnessNavbarProps {
  onBackToSelection?: () => void
  onBookNowClick?: () => void
  onSwitchModeClick?: () => void
}

export default function FitnessNavbar({ onBackToSelection, onBookNowClick, onSwitchModeClick }: FitnessNavbarProps) {
  // Debug effect to log when props change
  useEffect(() => {
    console.log('FitnessNavbar props updated:', {
      onBackToSelection: !!onBackToSelection,
      onBookNowClick: !!onBookNowClick
    })
  }, [onBackToSelection, onBookNowClick])
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = React.useRef<HTMLDivElement>(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false)
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      // Clean up
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { 
      name: "Programs", 
      href: "#programs", 
      icon: <Flame className="w-4 h-4 text-blue-400 group-hover:text-orange-500 transition-colors duration-300" />,
      color: "text-orange-500",
      target: "_self"
    },
    { 
      name: "Trainers", 
      href: "#trainers", 
      icon: <Users className="w-4 h-4 text-blue-400 group-hover:text-purple-500 transition-colors duration-300" />,
      color: "text-purple-500",
      target: "_self"
    },
    { 
      name: "Nutrition", 
      href: "#nutrition", 
      icon: <Apple className="w-4 h-4 text-blue-400 group-hover:text-red-500 transition-colors duration-300" />,
      color: "text-red-500",
      target: "_self"
    },
    {
      name: "Testimonials",
      href: "#testimonials",
      icon: (
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 ring-2 ring-pink-300">
          <MessageCircle className="w-4 h-4 text-blue-400" />
        </span>
      ),
      color: "text-pink-600",
      target: "_self"
    },
      { 
        name: "Contact", 
        href: "#contact", 
        icon: (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 ring-2 ring-yellow-300">
            <PhoneCall className="w-4 h-4 text-yellow-400" />
          </span>
        ),
        color: "text-yellow-500",
        target: "_self"
      }
    
    
  ]

  const handleNavClick = (href: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Small delay to ensure menu is closed before scrolling
    setTimeout(() => {
      // For contact section, scroll to footer
      if (href === '#contact') {
        const footer = document.querySelector('footer');
        if (footer) {
          footer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
        return;
      }
      
      // For other sections, scroll to the element
      const element = document.querySelector(href);
      if (element) {
        // Calculate the scroll position with an offset for the fixed header
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100); // Small delay to ensure menu is closed
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.3 }
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy-900/95 backdrop-blur-md border-b border-blue-500/20 py-2 shadow-lg"
          : "bg-gradient-to-b from-navy-900 to-transparent py-3"
      }`}
    >
      <div className="w-full px-4" ref={menuRef}>
        <div className="relative flex items-center justify-between h-12 md:h-10">
          {/* Logo - Far left */}
          <motion.div 
            className="flex-shrink-0 z-10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            <div className="flex items-center justify-center w-16 h-16 relative">
              <Image
                src="/images/fitness-logo.png"
                alt="Individual Medley"
                width={80}
                height={80}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </motion.div>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center absolute left-0 right-0">
            <div className="flex items-center justify-center space-x-1 bg-navy-900/95 backdrop-blur-sm px-4 py-1 rounded-full border border-blue-500/20">
              {navItems.map((item) => (
              <motion.div 
                key={item.name}
                className="group relative overflow-hidden rounded-full"
                initial={false}
                whileHover="hover"
                animate="rest"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100"
                  variants={{
                    rest: { opacity: 0, scaleX: 0.5, originX: 0 },
                    hover: { 
                      opacity: 1, 
                      scaleX: 1,
                      transition: { 
                        duration: 0.3,
                        ease: [0.4, 0, 0.2, 1]
                      }
                    }
                  }}
                />
                <motion.button
                  onClick={(e) => handleNavClick(item.href, e)}
                  className={`px-4 py-2.5 text-sm font-medium text-blue-100 hover:text-white rounded-full transition-all duration-300 flex items-center relative z-10`}
                  whileHover={{ 
                    y: -2,
                    color: '#ffffff',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    className="mr-2"
                    variants={{
                      rest: { scale: 1 },
                      hover: { 
                        scale: 1.2,
                        transition: { 
                          type: 'spring',
                          stiffness: 400,
                          damping: 10
                        }
                      }
                    }}
                  >
                    {React.cloneElement(item.icon, { 
                      className: `w-4 h-4 ${item.color} transition-transform duration-300 group-hover:scale-125` 
                    })}
                  </motion.span>
                  <motion.span
                    variants={{
                      rest: { x: 0 },
                      hover: { 
                        x: 4,
                        transition: { 
                          type: 'spring',
                          stiffness: 300,
                          damping: 10
                        }
                      }
                    }}
                  >
                    {item.name}
                  </motion.span>
                </motion.button>
              </motion.div>
              ))}
            </div>
          </nav>

          {/* Book Now Button - Far right */}
          <div className="hidden lg:flex items-center space-x-3 ml-6">
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={() => {
                  console.log('Switch Mode button clicked');
                  onSwitchModeClick?.();
                }}
                className="group relative flex items-center justify-center px-4 py-2.5 bg-transparent border border-blue-400 text-blue-300 text-sm font-medium rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-900/30 hover:border-blue-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a1a]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  <motion.span 
                    className="mr-2"
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  >
                    🔄
                  </motion.span>
                  Switch to Swimming
                </span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>

              <motion.button
                onClick={onBookNowClick}
                className="flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 z-10"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Book Now
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Mobile menu button - Pushed to far right */}
          <motion.div 
            className="lg:hidden ml-auto"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: [0.2, 0, 0, 1] }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative w-10 h-10 flex items-center justify-center rounded-2xl transition-all duration-200 hover:bg-navy-800/50"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className={`absolute block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
              <span className={`absolute block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ 
              duration: 0.35, 
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.25 }
            }}
            className="lg:hidden bg-navy-900/95 backdrop-blur-md border-t border-blue-500/20 shadow-inner overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name}
                  className="group relative overflow-hidden rounded-full"
                  initial={false}
                  whileHover="hover"
                  animate="rest"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100"
                    variants={{
                      rest: { opacity: 0, x: '-100%' },
                      hover: { 
                        opacity: 1,
                        x: 0,
                        transition: { 
                          duration: 0.3,
                          ease: [0.4, 0, 0.2, 1]
                        }
                      }
                    }}
                  />
                  <motion.button
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="w-full text-left px-4 py-3 text-base font-medium text-blue-100 hover:text-white rounded-full flex items-center relative z-10"
                    variants={{
                      rest: { color: '#bfdbfe' }, // text-blue-200
                      hover: { 
                        color: '#ffffff',
                        transition: { duration: 0.2 }
                      }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span 
                      className="mr-3"
                      variants={{
                        rest: { scale: 1 },
                        hover: { 
                          scale: 1.2,
                          transition: { 
                            type: 'spring',
                            stiffness: 400,
                            damping: 10
                          }
                        }
                      }}
                    >
                      {React.cloneElement(item.icon, { 
                        className: `w-5 h-5 ${item.color} transition-transform duration-300 group-hover:scale-125`,
                        style: { display: 'block' }
                      })}
                    </motion.span>
                    <motion.span
                      variants={{
                        rest: { x: 0 },
                        hover: { 
                          x: 8,
                          transition: { 
                            type: 'spring',
                            stiffness: 300,
                            damping: 10
                          }
                        }
                      }}
                    >
                      {item.name}
                    </motion.span>
                    <motion.span
                      className="ml-auto opacity-0 group-hover:opacity-100 -mr-2"
                      initial={{ x: -10 }}
                      whileHover={{ 
                        x: 0,
                        transition: { duration: 0.2 }
                      }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>
              ))}
              
              <div className="pt-2 pb-3 border-t border-navy-700/50 mt-2 space-y-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={() => {
                      onBookNowClick?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 text-base font-medium rounded-full"
                  >
                    <span className="flex items-center justify-center">
                      <motion.span 
                        className="mr-2"
                        animate={{
                          x: [0, 4, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      >
                        👋
                      </motion.span>
                      Join Now
                    </span>
                  </Button>
                </motion.div>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    console.log('Switch Mode button clicked from mobile menu');
                    onSwitchModeClick?.();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full group border-blue-400 text-blue-300 hover:bg-blue-900/30 hover:border-blue-300 py-3 text-base font-medium rounded-full relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <motion.span 
                      className="mr-2"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      🔄
                    </motion.span>
                    Switch Mode
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
