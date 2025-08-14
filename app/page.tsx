"use client"

import type React from "react"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, Environment } from "@react-three/drei"
import type * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, ExternalLink, Menu, X, Calendar, ChevronDown } from "lucide-react"

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [])

  return mousePosition
}

// Navigation component
function Navigation({
  activeSection,
  setActiveSection,
}: { activeSection: string; setActiveSection: (section: string) => void }) {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    { id: "hero", label: "Home" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-bold text-xl tracking-tight">DEVESH SINGH</div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeSection === section.id
                    ? "text-primary bg-primary/10 border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  scrollToSection(section.id)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-3 text-sm font-medium transition-colors rounded-md mx-2 mb-1 ${
                  activeSection === section.id
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

// Floating particles background
function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const particleCount = 50
  const positions = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="white" transparent opacity={0.6} />
    </points>
  )
}

// Hero Section Component
function HeroSection() {
  const scrollToNext = () => {
    document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="min-h-screen bg-black text-white relative overflow-hidden flex items-center justify-center"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

            <FloatingParticles />

            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">DEVESH SINGH</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">Software Development Engineer</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            View My Work
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 bg-transparent"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Get In Touch
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-white" />
      </div>
    </section>
  )
}

function ExperienceStickFigure({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number]
  scale?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)

  const { camera, gl } = useThree()
  const mousePosition = useMousePosition()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.15
    }

    if (leftArmRef.current && rightArmRef.current) {
      const point = Math.sin(state.clock.elapsedTime * 2) * 0.4
      leftArmRef.current.rotation.z = -0.8 + point
      rightArmRef.current.rotation.z = 1.2 // Strong pointing gesture
      rightArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
    }

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1) * 0.4
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.1
    }

    if (leftEyeRef.current && rightEyeRef.current && groupRef.current) {
      const rect = gl.domElement.getBoundingClientRect()
      const x = ((mousePosition.x - rect.left) / rect.width) * 2 - 1
      const y = -((mousePosition.y - rect.top) / rect.height) * 2 + 1

      const eyeMovement = 0.08
      leftEyeRef.current.position.x = -0.05 + x * eyeMovement
      leftEyeRef.current.position.z = 0.12 + y * eyeMovement
      rightEyeRef.current.position.x = 0.05 + x * eyeMovement
      rightEyeRef.current.position.z = 0.12 + y * eyeMovement
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.05, 0.85, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.05, 0.85, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.75, 0.12]}>
        <torusGeometry args={[0.04, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.15, 0.5, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.15, 0.5, 0]} rotation={[0, 0, 0.8]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.08, -0.2, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <Html position={[0.5, 1.2, 0]} center>
        <div className="bg-white text-black px-2 py-1 rounded-lg shadow-lg text-xs max-w-[100px] relative">
          My journey!
          <div className="absolute -bottom-1 -left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
        </div>
      </Html>
    </group>
  )
}

// Skills Section Component
function SkillsSection() {
  return (
    <section id="skills" className="min-h-screen bg-black text-white py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Programming Languages */}
        <div className="flex-1 bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 text-white">Programming Languages</h3>
          <div className="flex flex-wrap gap-3">
            {["Python", "Java", "JavaScript"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-white text-black text-lg font-medium rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Tools & Platforms */}
        <div className="flex-1 bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 text-white">Tools & Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Git",
              "Docker",
              "AWS",
              "Apache Kafka",
              "Apache Spark",
              "Apache Flink",
              "Hadoop",
              "KSQLDB",
              "PostgreSQL",
              "MySQL",
              "MongoDB",
              "Snowflake",
              "Postman",
              "gRPC",
            ].map((tool) => (
              <span
                key={tool}
                className="px-3 py-1 bg-white text-black text-sm rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div className="flex-1 bg-gray-900 p-8 rounded-lg hover:bg-gray-800 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 text-white">Frameworks & Libraries</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "React.js",
              "Node.js",
              "Angular",
              "Flask",
              "scikit-learn",
              "PyTorch",
              "Hugging Face",
              "FinBERT",
              "spaCy",
              "NLTK",
            ].map((framework) => (
              <span
                key={framework}
                className="px-3 py-1 bg-white text-black text-sm rounded-full hover:bg-gray-200 transition-colors transform hover:scale-105"
              >
                {framework}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white text-black p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl font-bold mb-2">3+</div>
          <div className="text-sm text-gray-600">Years Experience</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl font-bold mb-2">Major</div>
          <div className="text-sm text-gray-400">Projects</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 p-6 rounded-lg text-center hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl font-bold mb-2">MS</div>
          <div className="text-sm text-gray-400">Data Intelligence</div>
        </div>
        <div className="bg-white text-black p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-3xl font-bold mb-2">SJSU</div>
          <div className="text-sm text-gray-600">Graduate</div>
        </div>
      </div>
    </section>
  )
}

function SkillsStickFigure({ position, scale }) {
  const groupRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const headRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const mousePosition = useMousePosition()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = position[1] + Math.sin(time * 1.5) * 0.1
      groupRef.current.rotation.z = Math.sin(time * 0.8) * 0.05
    }

    // Enhanced typing animation
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 8) * 0.4 + 0.3
      rightArmRef.current.rotation.z = -Math.sin(time * 8 + 0.5) * 0.4 - 0.3
    }

    // Subtle head movement
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(time * 0.7) * 0.1
    }

    // Enhanced mouse-following eyes
    if (leftEyeRef.current && rightEyeRef.current && mousePosition) {
      const eyeMovement = {
        x: (mousePosition.x - 0.5) * 0.3,
        y: -(mousePosition.y - 0.5) * 0.3,
      }

      leftEyeRef.current.position.x = -0.08 + eyeMovement.x
      leftEyeRef.current.position.y = 0.05 + eyeMovement.y
      rightEyeRef.current.position.x = 0.08 + eyeMovement.x
      rightEyeRef.current.position.y = 0.05 + eyeMovement.y
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.08, 0.55, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.08, 0.55, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.45, 0.12]}>
        <torusGeometry args={[0.04, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.15, 0.1, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.15, 0.1, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, -0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.08, -0.5, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Keyboard (typing animation prop) */}
      <mesh position={[0, -0.1, 0.2]}>
        <boxGeometry args={[0.3, 0.05, 0.15]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    </group>
  )
}

// Projects Section Component
function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen bg-white text-black py-20 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Project 1 */}
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <img src="/ride-hailing-app.png" alt="Uber Simulation" className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Uber Simulation – Distributed Systems Project</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Designed and implemented microservices-based ride hailing system using Kafka, Redis, MongoDB, MySQL, and
              XGBoost for dynamic pricing on Kaggle ride data.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Node.js", "Express", "MongoDB", "Kafka", "+5 more"].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-black text-white text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                Code
              </Button>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="h-48 bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
            <img src="/financial-dashboard.png" alt="Stock Prediction" className="w-full h-full object-cover" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Sentimental Stock Prediction using GenAI</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Integrated GPT API with FinBERT to auto-generate market insights, cutting analysis time by 70% and
              improving accuracy by 15%.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Python", "FinBERT", "PyTorch", "Transformers", "+2 more"].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-black text-white text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                Code
              </Button>
            </div>
          </div>
        </div>

        {/* Project 3 */}
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <img
              src="/social-media-analytics-dashboard.png"
              alt="Sentiment Analysis"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">Sentiment & Lingo Trend Analysis</h3>
            <p className="text-gray-600 mb-4 text-sm">
              Engineered a Kafka-Spark NLP pipeline handling 1,200+ tweets/hour, with PostgreSQL and Grafana for live
              trend tracking.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {["Kafka", "Apache Spark", "PySpark", "Twitter API", "+4 more"].map((tech) => (
                <span key={tech} className="px-2 py-1 bg-black text-white text-xs rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                View Details
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white bg-transparent"
              >
                Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8">
          View All Projects
        </Button>
      </div>
    </section>
  )
}

function ProjectsStickFigure({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number]
  scale?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)

  const { camera, gl } = useThree()
  const mousePosition = useMousePosition()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.18
    }

    if (leftArmRef.current && rightArmRef.current) {
      const present = Math.sin(state.clock.elapsedTime * 1.8) * 0.5
      leftArmRef.current.rotation.z = -1.0 + present * 0.7
      rightArmRef.current.rotation.z = 1.0 - present * 0.7
      leftArmRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.3
      rightArmRef.current.rotation.y = -Math.sin(state.clock.elapsedTime * 1.2) * 0.3
    }

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.35
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.9) * 0.15
    }

    if (leftEyeRef.current && rightEyeRef.current && groupRef.current) {
      const rect = gl.domElement.getBoundingClientRect()
      const x = ((mousePosition.x - rect.left) / rect.width) * 2 - 1
      const y = -((mousePosition.y - rect.top) / rect.height) * 2 + 1

      const eyeMovement = 0.08
      leftEyeRef.current.position.x = -0.05 + x * eyeMovement
      leftEyeRef.current.position.z = 0.12 + y * eyeMovement
      rightEyeRef.current.position.x = 0.05 + x * eyeMovement
      rightEyeRef.current.position.z = 0.12 + y * eyeMovement
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.05, 0.85, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.05, 0.85, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.75, 0.12]}>
        <torusGeometry args={[0.04, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.15, 0.5, 0]} rotation={[0, 0, -0.7]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.15, 0.5, 0]} rotation={[0, 0, 0.7]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.08, -0.2, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <Html position={[0.5, 1.2, 0]} center>
        <div className="bg-white text-black px-2 py-1 rounded-lg shadow-lg text-xs max-w-[100px] relative">
          My projects!
          <div className="absolute -bottom-1 -left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
        </div>
      </Html>
    </group>
  )
}

function ContactStickFigure({
  position = [0, 0, 0],
  scale = 1,
}: {
  position?: [number, number, number]
  scale?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const leftArmRef = useRef<THREE.Mesh>(null)
  const rightArmRef = useRef<THREE.Mesh>(null)
  const headRef = useRef<THREE.Mesh>(null)
  const leftEyeRef = useRef<THREE.Mesh>(null)
  const rightEyeRef = useRef<THREE.Mesh>(null)

  const { camera, gl } = useThree()
  const mousePosition = useMousePosition()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.16
    }

    if (leftArmRef.current && rightArmRef.current) {
      const wave = Math.sin(state.clock.elapsedTime * 3.5) * 0.6
      leftArmRef.current.rotation.z = -0.4 + wave
      rightArmRef.current.rotation.z = 0.4 - wave * 0.5
      leftArmRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2.8) * 0.2
    }

    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.25
      headRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.7) * 0.1
    }

    if (leftEyeRef.current && rightEyeRef.current && groupRef.current) {
      const rect = gl.domElement.getBoundingClientRect()
      const x = ((mousePosition.x - rect.left) / rect.width) * 2 - 1
      const y = -((mousePosition.y - rect.top) / rect.height) * 2 + 1

      const eyeMovement = 0.08
      leftEyeRef.current.position.x = -0.05 + x * eyeMovement
      leftEyeRef.current.position.z = 0.12 + y * eyeMovement
      rightEyeRef.current.position.x = 0.05 + x * eyeMovement
      rightEyeRef.current.position.z = 0.12 + y * eyeMovement
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Head */}
      <mesh ref={headRef} position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eyes */}
      <mesh ref={leftEyeRef} position={[-0.05, 0.85, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.05, 0.85, 0.12]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 0.75, 0.12]}>
        <torusGeometry args={[0.04, 0.01, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.6, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Arms */}
      <mesh ref={leftArmRef} position={[-0.15, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh ref={rightArmRef} position={[0.15, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, -0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      <mesh position={[0.08, -0.2, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <Html position={[0.5, 1.2, 0]} center>
        <div className="bg-white text-black px-2 py-1 rounded-lg shadow-lg text-xs max-w-[90px] relative">
          Let's connect!
          <div className="absolute -bottom-1 -left-1 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white"></div>
        </div>
      </Html>
    </group>
  )
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="min-h-screen bg-black text-white py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-2xl text-muted-foreground font-light">Ready to collaborate on your next project?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold mb-8">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Mail className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Email</h4>
                  <p className="text-gray-400">devesh.singh@sjsu.edu</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Phone className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Phone</h4>
                  <p className="text-gray-400">(408) 569-6278</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Linkedin className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">LinkedIn</h4>
                  <p className="text-gray-400">LinkedIn Profile</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-6 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <ExternalLink className="w-7 h-7 text-black" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Portfolio</h4>
                  <p className="text-gray-400">Portfolio Website</p>
                </div>
              </div>
            </div>

            <div className="relative h-64 mt-8">
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ width: "100%", height: "100%" }}>
                <ambientLight intensity={0.6} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <ContactStickFigure position={[0, 0, 0]} scale={1.2} />
              </Canvas>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-8 rounded-xl border border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-4 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none transition-colors resize-none"
                  required
                />
                <div className="text-right text-sm text-gray-400 mt-2">{formData.message.length}/500</div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors font-semibold py-4"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-20 pt-8 border-t border-gray-800">
          <p className="text-gray-400">© 2024 Devesh Singh. Built with passion for technology and innovation 🚀</p>
        </div>
      </div>
    </section>
  )
}

// Experience Section Component
function FullExperienceSection() {
  const experiences = [
    {
      title: "Software Development Intern",
      company: "ASANTE Inc.",
      period: "May 2025 – Aug 2025",
      location: "Remote",
      achievements: [
        "Overcame Shopify Basic limitations by generating discount codes linked to Te-Credits and applying them automatically at checkout",
        "Built the entire system using Admin API, Storefront API, and GraphQL, saving $2.3K/month in costs and cutting development time by 80%",
        "Leveraged gRPC to develop high-efficiency APIs, cutting response times by 70% over REST-based implementations",
      ],
      technologies: ["Shopify", "GraphQL", "Admin API", "Storefront API", "gRPC"],
    },
    {
      title: "System Engineer",
      company: "Tata Consultancy Services",
      period: "Oct 2021 – Jul 2024",
      location: "India",
      achievements: [
        "Designed and optimized Angular-based UI for JLR's forecasting systems. Result: Increased engagement by 30%",
        "Developed a region-specific predictive inventory model, resulting in reduced inventory costs by 18%",
        "Utilized MongoDB for inventory analysis, identifying 13% surplus. Result: Reallocated 25% of resources efficiently",
        "Facilitated cross-team collaboration through enhanced communication skills",
      ],
      technologies: ["Angular", "MongoDB", "Forecasting Models", "UI/UX Design"],
    },
  ]

  return (
    <section
      id="experience"
      className="min-h-screen py-20 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={0.6} />
            <ExperienceStickFigure position={[-4, 0, 0]} scale={1.5} />
            <Environment preset="studio" />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-2xl text-muted-foreground font-light">My professional journey through innovation</p>
        </div>

        {/* Modern Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <div key={index} className="relative mb-20 last:mb-0">
              {/* Experience Card */}
              <div className="group">
                <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-10 border border-border/50 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02] hover:border-primary/30">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xl text-primary font-semibold mb-2">
                        <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-5 w-5" />
                        <span className="text-lg">{exp.period}</span>
                      </div>
                    </div>

                    {/* Timeline Indicator */}
                    <div className="hidden md:flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full border-4 border-primary/20 group-hover:border-primary/50 transition-all duration-300">
                      <div className="w-6 h-6 bg-primary rounded-full group-hover:scale-125 transition-transform duration-300"></div>
                    </div>
                  </div>

                  {/* Achievements Grid */}
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Key Achievements</h4>
                    <div className="grid gap-4">
                      {exp.achievements.map((achievement, achIndex) => (
                        <div
                          key={achIndex}
                          className="flex items-start gap-4 p-4 bg-muted/20 rounded-xl hover:bg-muted/30 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-3 flex-shrink-0 animate-pulse"></div>
                          <span className="text-foreground/90 leading-relaxed text-lg">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 text-muted-foreground">Technologies Used</h4>
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-primary/10 text-primary text-base font-medium rounded-full border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              {index < experiences.length - 1 && (
                <div className="flex justify-center my-12">
                  <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="text-center mt-20">
          <Button
            size="lg"
            className="text-xl px-12 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            onClick={() => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })}
          >
            Explore My Skills →
          </Button>
        </div>
      </div>

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
    </section>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <HeroSection />
        <FullExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  )
}
