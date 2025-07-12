import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-20 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 0.08, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-20 left-20 w-56 h-56 bg-cyan-400/15 rounded-full blur-2xl"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <div className="flex flex-col items-start gap-1 mb-4">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.3 }}
                className="w-20 h-20 flex items-center justify-center"
              >
                <img src="/images/fitness-logo.png" alt="Individual Medley Logo" className="w-20 h-20 object-contain" />
              </motion.div>
              <span className="text-xl font-bold mt-1">Individual Medley</span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4 text-sm">
              Empowering individuals through excellence in swimming and fitness. 
              Join our community and discover your potential.
            </p>
            {/* Social Links - swimming mode style */}
            <div className="flex items-center space-x-1.5 mt-4">
              {[
                { icon: Instagram, label: 'Instagram', color: 'hover:text-pink-500', url: '#' },
                { icon: Twitter, label: 'Twitter', color: 'hover:text-blue-400', url: '#' },
                { icon: Facebook, label: 'Facebook', color: 'hover:text-blue-100', url: '#' },
                { icon: Linkedin, label: 'LinkedIn', color: 'hover:text-blue-300', url: '#' }
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.url}
                    className={`relative p-2.5 rounded-xl bg-blue-900/40 transition-all duration-200 group`}
                    aria-label={social.label}
                    whileHover={{ y: -4, scale: 1.12, boxShadow: '0 4px 24px 0 rgba(56,189,248,0.25)' }}
                    whileTap={{ scale: 0.98 }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className={`h-5 w-5 transition-colors duration-200 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)] ${social.color}`} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <div className="space-y-2">
              {[
                { name: "Home", href: "#hero" },
                { name: "About Us", href: "#about" },
                { name: "Services", href: "#services" },
                { name: "Testimonials", href: "#testimonials" },
                { name: "Contact", href: "#contact" }
              ].map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ x: 3, color: "#60A5FA" }}
                  className="block text-slate-300 hover:text-blue-300 transition-colors duration-300 text-sm"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <div className="space-y-2">
              {[
                "Swimming Programs",
                "Fitness Training",
                "Competitive Programs",
                "Family Programs",
                "Specialized Training"
              ].map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                  className="text-slate-300 hover:text-blue-300 transition-colors duration-300 cursor-pointer text-sm"
                >
                  {service}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-200" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs">123 Aquatic Drive</p>
                  <p className="text-slate-400 text-xs">Wellness City, WC 12345</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-200" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs">+1 (555) 123-4567</p>
                  <p className="text-slate-400 text-xs">Mon-Fri 6AM-10PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-blue-200" />
                </div>
                <div>
                  <p className="text-slate-300 text-xs">info@individualmedley.com</p>
                  <p className="text-slate-400 text-xs">24/7 Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/20 pt-6"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-300 text-xs">
              © {currentYear} Individual Medley. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs">
              <a href="#" className="text-slate-300 hover:text-blue-300 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-slate-300 hover:text-blue-300 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-slate-300 hover:text-blue-300 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
} 