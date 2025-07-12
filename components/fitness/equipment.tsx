"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"

// Add the necessary imports at the top:
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

export default function Equipment() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeEquipment, setActiveEquipment] = useState(0)

  // Add a modal for equipment details
  const [selectedEquipment, setSelectedEquipment] = useState<number | null>(null)

  const handleViewEquipment = (index: number) => {
    setSelectedEquipment(index)
  }

  const handleCloseModal = () => {
    setSelectedEquipment(null)
  }

  const equipment = [
    {
      name: "State-of-the-Art Cardio Zone",
      description:
        "Our cardio area features the latest treadmills, ellipticals, and rowing machines with integrated fitness tracking and entertainment systems.",
      features: [
        "Smart fitness tracking",
        "Virtual training routes",
        "Heart rate monitoring",
        "Integrated entertainment",
      ],
      details:
        "Our cardio zone spans over 2,000 square feet and features 30+ pieces of premium cardio equipment from brands like Life Fitness, Precor, and Concept2. Each machine is equipped with individual screens offering streaming services, virtual training routes, and real-time performance metrics.",
      brands: ["Life Fitness", "Precor", "Concept2", "Woodway", "StairMaster"],
      maintenanceSchedule: "All equipment undergoes weekly maintenance checks and quarterly deep servicing.",
      color: "from-blue-600 to-cyan-500",
    },
    {
      name: "Strength Training Area",
      description:
        "A comprehensive strength training zone with free weights, machines, and functional training equipment for all your muscle-building needs.",
      features: [
        "Olympic lifting platforms",
        "Full dumbbell rack (5-150 lbs)",
        "Specialized machines",
        "Cable systems",
      ],
      details:
        "Our strength area includes 8 Olympic lifting platforms, a complete set of dumbbells ranging from 5 to 150 pounds, 15 specialized resistance machines, and a comprehensive cable system. The space is designed to accommodate both beginners and advanced lifters with proper spacing and safety features.",
      brands: ["Rogue Fitness", "Hammer Strength", "Eleiko", "Cybex", "Nautilus"],
      maintenanceSchedule: "Weight equipment is inspected daily with monthly maintenance and calibration.",
      color: "from-blue-600 to-indigo-500",
    },
    {
      name: "Functional Training Zone",
      description:
        "Dedicated space for functional movements with rigs, ropes, kettlebells, and open floor space for dynamic exercises.",
      features: ["Battle ropes", "TRX suspension trainers", "Kettlebells and medicine balls", "Agility equipment"],
      details:
        "Our 1,500 square foot functional training zone features a custom-built rig system, complete sets of kettlebells (8kg-48kg), medicine balls, battle ropes, TRX systems, and ample open space for movement-based training. The flooring is specially designed to absorb impact while providing stability for dynamic movements.",
      brands: ["TRX", "Rogue Fitness", "Dynamax", "BOSU", "Onnit"],
      maintenanceSchedule: "Functional equipment is inspected weekly with quarterly replacements as needed.",
      color: "from-blue-600 to-sky-500",
    },
    {
      name: "Recovery & Wellness Center",
      description:
        "State-of-the-art recovery facilities to help you rejuvenate after intense workouts and prevent injuries.",
      features: ["Cryotherapy", "Compression therapy", "Massage stations", "Stretching area"],
      details:
        "Our recovery center offers the latest in recovery technology including a cryotherapy chamber, Normatec compression systems, Hypervolt massage guns, foam rolling stations, and a dedicated stretching area with assisted stretching services available. Members can book recovery sessions with our wellness specialists to maximize their post-workout recovery and prevent injuries.",
      brands: ["Normatec", "Hyperice", "Theragun", "PowerDot", "Trigger Point"],
      maintenanceSchedule: "Recovery equipment is sanitized after each use and undergoes weekly technical maintenance.",
      color: "from-blue-600 to-teal-500",
    },
  ]

  useEffect(() => {
    // Animate equipment change with smoother transition
    const contentElements = document.querySelectorAll(".equipment-content")

    gsap.to(contentElements, {
      opacity: 0,
      y: 15,
      duration: 0.25,
      onComplete: () => {
        gsap.to(contentElements, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.05,
        })
      },
    })
  }, [activeEquipment])

  const handlePrev = () => {
    setActiveEquipment((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNext = () => {
    setActiveEquipment((prev) => (prev < equipment.length - 1 ? prev + 1 : prev))
  }

  return (
    <section id="equipment" ref={sectionRef} className="py-20 px-4 md:px-10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 bg-blue-900/50 rounded-full text-blue-300 text-sm font-medium mb-4">
            EQUIPMENT & FACILITIES
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">CUTTING-EDGE FITNESS EQUIPMENT</h2>
          <p className="text-xl text-blue-300 max-w-3xl mx-auto">
            Train with the best equipment in the industry. Our gym features state-of-the-art machines and facilities
            designed to maximize your workout efficiency.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* 3D Preview */}
          {/* Replace the 3D Preview section with a more impressive visualization: */}
          <div className="h-[400px] bg-navy-800/50 rounded-lg overflow-hidden">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <Environment preset="night" />

              {/* More impressive 3D model based on the active equipment */}
              {activeEquipment === 0 && (
                <group>
                  <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <boxGeometry args={[1, 0.1, 2]} />
                    <meshStandardMaterial color="#3b82f6" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0, 0.6, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
                    <meshStandardMaterial color="#1e40af" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0, 1.2, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <boxGeometry args={[2, 0.1, 0.5]} />
                    <meshStandardMaterial color="#3b82f6" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[-0.8, 1.4, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0.8, 1.4, 0]} rotation={[0, Math.PI / 4, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
                  </mesh>
                </group>
              )}

              {activeEquipment === 1 && (
                <group>
                  <mesh castShadow receiveShadow position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
                    <meshStandardMaterial color="#1e40af" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[-1, 0.4, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
                    <meshStandardMaterial color="#1e40af" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[-1.8, 0.4, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.3, 0.1, 16, 32]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
                  </mesh>
                  <mesh castShadow receiveShadow position={[-0.2, 0.4, 0]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.3, 0.1, 16, 32]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.2} />
                  </mesh>
                </group>
              )}

              {activeEquipment === 2 && (
                <group>
                  <mesh castShadow receiveShadow position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[2, 0.2, 2]} />
                    <meshStandardMaterial color="#1e40af" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[-0.5, 0, 0]} rotation={[0, 0, 0]}>
                    <sphereGeometry args={[0.3, 16, 16]} />
                    <meshStandardMaterial color="#60a5fa" metalness={0.5} roughness={0.5} />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0.5, 0, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[0.3, 0.3, 0.3]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.5} roughness={0.5} />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0, 0, 0.5]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.4, 16]} />
                    <meshStandardMaterial color="#60a5fa" metalness={0.5} roughness={0.5} />
                  </mesh>
                </group>
              )}

              {activeEquipment === 3 && (
                <group>
                  <mesh castShadow receiveShadow position={[0, -0.5, 0]} rotation={[0, 0, 0]}>
                    <boxGeometry args={[2, 0.2, 1]} />
                    <meshStandardMaterial color="#1e40af" />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0, 0, 0]} rotation={[0, 0, 0]}>
                    <capsuleGeometry args={[0.5, 1, 8, 16]} />
                    <meshStandardMaterial color="#3b82f6" metalness={0.2} roughness={0.8} />
                  </mesh>
                  <mesh castShadow receiveShadow position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
                  </mesh>
                </group>
              )}

              {/* Add animated particles for visual effect */}
              <Particles count={200} color="#60a5fa" />
            </Canvas>
          </div>

          {/* Equipment Info */}
          <div className="equipment-content">
            <div className={`h-2 bg-gradient-to-r ${equipment[activeEquipment].color} rounded-t-md mb-6`}></div>

            <h3 className="text-2xl font-bold text-white mb-4">{equipment[activeEquipment].name}</h3>

            <p className="text-gray-300 mb-6">{equipment[activeEquipment].description}</p>

            <h4 className="font-semibold text-blue-300 mb-3">Key Features:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {equipment[activeEquipment].features.map((feature, i) => (
                <li key={i} className="px-4 py-2 rounded-lg bg-navy-800 text-white border border-blue-900">
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                className="border-blue-500 text-blue-300 hover:bg-blue-950/50"
                onClick={handlePrev}
                disabled={activeEquipment === 0}
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> Previous
              </Button>

              <div className="flex gap-1">
                {equipment.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${activeEquipment === index ? "bg-blue-500" : "bg-navy-700"}`}
                    onClick={() => setActiveEquipment(index)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                className="border-blue-500 text-blue-300 hover:bg-blue-950/50"
                onClick={handleNext}
                disabled={activeEquipment === equipment.length - 1}
              >
                Next <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            <Button
              className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
              onClick={() => handleViewEquipment(activeEquipment)}
            >
              View Detailed Specifications
            </Button>
          </div>
        </div>
      </div>
      {selectedEquipment !== null && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-navy-800 rounded-xl shadow-xl max-w-2xl w-full overflow-hidden border border-blue-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-2 bg-gradient-to-r ${equipment[selectedEquipment].color}`}></div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">{equipment[selectedEquipment].name}</h2>
                <button
                  className="w-8 h-8 bg-navy-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-navy-600 transition-colors"
                  onClick={handleCloseModal}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-300 mb-6">{equipment[selectedEquipment].details}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {equipment[selectedEquipment].features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-blue-900/50 text-blue-400 flex items-center justify-center mr-2 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Featured Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {equipment[selectedEquipment].brands.map((brand, i) => (
                    <span key={i} className="px-3 py-1 bg-navy-700 text-blue-300 rounded-full text-sm">
                      {brand}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">Maintenance Schedule</h3>
                <p className="text-gray-300">{equipment[selectedEquipment].maintenanceSchedule}</p>
              </div>

              <div className="flex justify-end">
                <Button
                  className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                  data-book-now="true"
                >
                  Book a Tour
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

// Add the Particles component at the end of the file:
function Particles({ count, color }: { count: number; color: string }) {
  const mesh = useRef<THREE.InstancedMesh>(null)

  useEffect(() => {
    if (!mesh.current) return

    // Create a temporary object to hold position and scale
    const temp = new THREE.Object3D()

    // Set position and scale for each particle
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 3

      temp.position.x = radius * Math.cos(theta)
      temp.position.y = (Math.random() - 0.5) * 4
      temp.position.z = radius * Math.sin(theta)

      const scale = Math.random() * 0.05 + 0.02
      temp.scale.set(scale, scale, scale)

      temp.updateMatrix()
      mesh.current.setMatrixAt(i, temp.matrix)
    }

    mesh.current.instanceMatrix.needsUpdate = true
  }, [count])

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </instancedMesh>
  )
}
