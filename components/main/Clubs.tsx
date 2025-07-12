import { motion } from "framer-motion"
import { Waves, Dumbbell, Users, Award, Star, Zap } from "lucide-react"
import Image from "next/image"

const swimmingFeatures = [
  { icon: <Award className="w-5 h-5" />, text: "Pro Coaches" },
  { icon: <Star className="w-5 h-5" />, text: "Fun Meets" },
  { icon: <Zap className="w-5 h-5" />, text: "Skill Levels" },
  { icon: <Users className="w-5 h-5" />, text: "Swim Crew" },
]
const fitnessFeatures = [
  { icon: <Dumbbell className="w-5 h-5" />, text: "Modern Gym" },
  { icon: <Star className="w-5 h-5" />, text: "Personal Plans" },
  { icon: <Zap className="w-5 h-5" />, text: "HIIT Classes" },
  { icon: <Users className="w-5 h-5" />, text: "Squad Vibes" },
]

export default function Clubs() {
  return (
    <section id="clubs" className="relative py-20 bg-transparent overflow-hidden">
      {/* Background Elements */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl opacity-60"
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/8 to-blue-400/8 rounded-full blur-3xl opacity-50"
      />
      {/* Section Heading and Description */}
      <div className="max-w-2xl mx-auto text-center mb-16 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-4 tracking-tight drop-shadow-xl"
        >
          Our Clubs
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-lg sm:text-xl text-blue-700 mb-4 font-medium"
        >
          Discover the ultimate destination for aquatic and fitness excellence.<br />
          Join a vibrant community where every member finds their lane and their crew.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-blue-200 shadow-sm mb-2"
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-base font-semibold text-blue-900 tracking-wide">Swimming and Fitness Club</span>
        </motion.div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Swimming Club */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-5 py-2 bg-white/80 backdrop-blur-sm rounded-2xl text-blue-800 text-base font-semibold border border-blue-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              SWIMMING KLUB
            </motion.div>
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Make Waves.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600">Swim Your Story</span>
            </motion.h2>
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Dive into a club where every splash counts. From beginner to pro, our crew is all about fun, progress, and epic swim meets. Find your lane, find your people.
            </motion.p>
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {swimmingFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="font-semibold text-gray-900 text-base">{feature.text}</div>
                </motion.div>
              ))}
            </motion.div>
            {/* CTA */}
            <a href="#swimming" className="inline-block mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 text-lg focus:ring-4 focus:ring-cyan-300/40 hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.35)]">
              Explore Swimming Klub
            </a>
          </motion.div>
          {/* Swimming Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-900/10 rounded-full filter blur-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-blue-900/10 rounded-full filter blur-3xl -z-10"></div>
              {/* Main Video */}
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/0 to-slate-900/20 rounded-2xl -rotate-2 scale-95"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/10 to-slate-900/20 rounded-2xl rotate-2 scale-95"></div>
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-800/20 bg-slate-900 backdrop-blur-sm transition-shadow duration-300 group hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.35)]">
                  <video
                    src="/videos/swimming-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center transition-shadow duration-300 group-hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.35)]"
                  />
                </div>
              </div>
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-200"
              >
                <div className="flex items-center space-x-2">
                  <Waves className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900">Swim Vibes</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
        {/* Fitness Club */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Fitness Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-900/10 rounded-full filter blur-3xl -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-blue-900/10 rounded-full filter blur-3xl -z-10"></div>
              {/* Main Image */}
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300/0 to-slate-900/20 rounded-2xl -rotate-2 scale-95"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/10 to-slate-900/20 rounded-2xl rotate-2 scale-95"></div>
                <div className="relative h-full w-full rounded-2xl overflow-hidden border-2 border-blue-800/20 bg-slate-900 backdrop-blur-sm transition-shadow duration-300 group hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.35)]">
                  <video
                    src="/videos/fitness-video.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover object-center transition-shadow duration-300 group-hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.35)]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
          {/* Fitness Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 order-1 lg:order-2"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-5 py-2 bg-white/80 backdrop-blur-sm rounded-2xl text-blue-800 text-base font-semibold border border-blue-200 shadow-sm"
            >
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
              </span>
              FITNESS KLUB
            </motion.div>
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
            >
              Get Strong.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600">Train Your Way</span>
            </motion.h2>
            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Level up with a club that’s all about energy, progress, and squad goals. From HIIT to chill, we’ve got the gear, the crew, and the vibes to keep you moving.
            </motion.p>
            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {fitnessFeatures.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2 }}
                  className="flex items-center space-x-3 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white shadow-sm">
                    {feature.icon}
                  </div>
                  <div className="font-semibold text-gray-900 text-base">{feature.text}</div>
                </motion.div>
              ))}
            </motion.div>
            {/* CTA */}
            <a href="#fitness" className="inline-block mt-6 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 text-lg focus:ring-4 focus:ring-cyan-300/40 hover:shadow-[0_4px_32px_0_rgba(56,189,248,0.35)]">
              Explore Fitness Klub
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 