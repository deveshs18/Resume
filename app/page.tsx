"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AnimatedText } from "@/components/ui/animated-shiny-text"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { LampContainer } from "@/components/ui/lamp"
import { SparklesCore } from "@/components/ui/sparkles"
import { ContactInfoPanel, SectionGlassPanel } from "@/components/ui/3d-hero-section-boxes"
import { SplineScene } from "@/components/ui/splite"
import { AnimatePresence, motion } from "framer-motion"
import { CircularGallery, type GalleryItem } from "@/components/ui/circular-gallery"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ExpandableTabs } from "@/components/ui/expandable-tabs"
import { cn } from "@/lib/utils"
import {
  Briefcase,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Code2,
  FolderKanban,
  Home,
  Mail,
  Linkedin,
} from "lucide-react"

const NAV_SECTIONS = [
  { id: "home", label: "Home", icon: Home },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "contact", label: "Contact", icon: Mail },
] as const

// Navigation component
function Navigation({
  activeSection,
  setActiveSection,
}: { activeSection: string; setActiveSection: (section: string) => void }) {
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const activeIndex = NAV_SECTIONS.findIndex((section) => section.id === activeSection)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-500/20 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 lg:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="shrink-0 bg-gradient-to-r from-cyan-400 to-sky-300 bg-clip-text text-xs font-bold tracking-tight text-transparent sm:text-sm md:text-lg"
        >
          <span className="sm:hidden">DS</span>
          <span className="hidden sm:inline">DEVESH SINGH</span>
        </button>

        {/* Mobile: compact icon-only nav — single row, no wrapping */}
        <div className="flex flex-nowrap items-center gap-0.5 rounded-xl border border-cyan-500/30 bg-black/90 p-0.5 sm:hidden">
          {NAV_SECTIONS.map((section, index) => {
            const Icon = section.icon
            const isActive = activeIndex === index
            return (
              <button
                key={section.id}
                type="button"
                aria-label={section.label}
                onClick={() => scrollToSection(section.id)}
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-cyan-500/15 text-cyan-400"
                    : "text-neutral-400 hover:bg-cyan-500/10 hover:text-cyan-300",
                )}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        </div>

        {/* Desktop: expandable tabs with labels */}
        <ExpandableTabs
          tabs={NAV_SECTIONS.map((section) => ({
            title: section.label,
            icon: section.icon,
          }))}
          selected={activeIndex >= 0 ? activeIndex : null}
          onChange={(index) => {
            if (index !== null) {
              scrollToSection(NAV_SECTIONS[index].id)
            }
          }}
          dismissOnClickOutside={false}
          activeColor="text-cyan-400"
          selectedClassName="border border-cyan-500/40 bg-cyan-500/10 shadow-[0_0_16px_rgba(34,211,238,0.35)]"
          className="hidden shrink-0 border-cyan-500/40 bg-black/90 shadow-[0_0_24px_rgba(34,211,238,0.15)] backdrop-blur-sm sm:flex"
        />
      </div>
    </nav>
  )
}

// Hero Section Component
function HeroSection() {
  return (
    <section id="home" className="scroll-mt-20 overflow-x-hidden bg-black pt-14 text-white sm:pt-0 sm:overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <AnimatedText
              text="DEVESH SINGH"
              className="py-1"
              textClassName="text-[1.75rem] font-bold leading-tight sm:text-[2.75rem] md:text-[4rem] lg:text-[5rem]"
              gradientColors="linear-gradient(90deg, #0891b2, #e2e8f0, #22d3ee, #ffffff, #0891b2)"
              gradientAnimationDuration={4}
              hoverEffect
            />
            <p className="mt-1 text-sm font-light text-neutral-300 md:text-lg">
              Software Development Engineer
            </p>
          </>
        }
      >
        <LampContainer embedded className="h-full">
          <div className="relative z-20 max-w-xl space-y-3 px-2 text-center text-xs leading-relaxed text-slate-300 sm:space-y-4 sm:px-0 sm:text-sm md:max-w-2xl md:text-base">
            <p>
              I&apos;m passionate about technology and constantly push myself to stay current across full-stack
              development, data engineering, and AI engineering. I enjoy building scalable systems, experimenting with
              modern AI, and creating products that combine intelligent automation with strong engineering foundations.
            </p>
            <p>
              What excites me most is AI-driven applications and multi-agent systems that solve complex real-world
              problems in practical ways. For me, learning never stops — I love exploring new technologies, adapting
              quickly, and turning innovative ideas into impactful solutions.
            </p>
          </div>

          <div className="relative z-10 h-20 w-full max-w-md md:h-24">
            <div className="absolute inset-x-8 top-0 h-[2px] w-3/4 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm" />
            <div className="absolute inset-x-8 top-0 h-px w-3/4 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={600}
              className="h-full w-full"
              particleColor="#22d3ee"
              speed={2}
            />
            <div className="absolute inset-0 h-full w-full bg-slate-950 [mask-image:radial-gradient(240px_100px_at_top,transparent_20%,white)]" />
          </div>

          <div className="relative z-20 flex w-full max-w-md flex-col gap-3 px-2 sm:flex-row sm:px-0">
            <Button
              size="lg"
              className="w-full bg-cyan-500 text-black hover:bg-cyan-400 sm:w-auto"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full border-cyan-500/50 bg-transparent text-white hover:bg-cyan-500/10 sm:w-auto"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch
            </Button>
          </div>
        </LampContainer>
      </ContainerScroll>
    </section>
  )
}

type ExperienceItem = {
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  technologies: string[]
  image: string
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: "Instructional Student Asst. — Deep Learning",
    company: "San José State University",
    period: "Jan 2026 – May 2026",
    location: "San José, CA",
    achievements: [
      "Mentored over 30 graduate students on convolutional and transformer model architectures, model optimization, deployment, and supervised GPU/NPU lab sessions including training and inference execution on Mobilint MLA100 NPU hardware.",
    ],
    technologies: ["PyTorch", "CNN", "Transformers", "NPU", "Mobilint MLA100", "GPU", "Deep Learning"],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Data Engineer Intern",
    company: "ASANTE Inc.",
    period: "May 2025 – Aug 2025",
    location: "Remote",
    achievements: [
      "Saved $2,300/month by productionizing a Shopify Te-Credits wallet using Admin API, Storefront API & GraphQL — automated secure transaction workflows, eliminating 80% of manual development effort.",
      "Reduced customer-support volume by 40% by engineering a production LLM chatbot using Retrieval-Augmented Generation (RAG), vector embeddings and semantic search, and architected fallback workflows to handle failures gracefully.",
      "Projected 15% lift in revenue via a collaborative-filtering recommendation engine powered by behavioral analytics; delivered actionable performance insights through Power BI dashboards to product stakeholders.",
      "Developed human-in-the-loop escalation workflow for the LLM chatbot, routing complex queries to support agents to ensure resolution accuracy.",
    ],
    technologies: ["Shopify", "GraphQL", "RAG", "LLM", "Power BI", "Python", "Vector DB"],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80",
  },
  {
    title: "Software Development Engineer",
    company: "Tata Consultancy Services",
    period: "Oct 2021 – Jul 2024",
    location: "India",
    achievements: [
      "Designed system architecture for a PostgreSQL → Elasticsearch data pipeline via Logstash (ELK Stack) to offload read-heavy analytics queries, eliminating 90% of production DB load and cutting backend cache utilization by 75%.",
      "Accelerated data retrieval by 40% engineering a star-schema data warehouse on AWS (S3, ECS, ECR) enabling scalable BI reporting on millions of records across cross-functional teams.",
      "Reduced ticket resolution time by 30% architecting an Angular + Spring Boot Issue Deduction System centralizing error tracking, workflow automation & alerting — serving 50K+ daily active users with zero downtime.",
      "Designed and implemented REST APIs using Spring Boot to enable microservices integration and improve scalability across internal tools.",
    ],
    technologies: ["PostgreSQL", "Elasticsearch", "AWS", "Angular", "Spring Boot", "Logstash", "REST APIs"],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&auto=format&fit=crop&q=80",
  },
]

function experienceToGalleryItem(experience: ExperienceItem): GalleryItem {
  return {
    common: experience.title,
    binomial: experience.company,
    photo: {
      url: experience.image,
      text: experience.achievements[0],
      by: `${experience.period} · ${experience.location}`,
      pos: "center",
    },
    tags: experience.technologies.slice(0, 4),
  }
}

function ExpandedExperienceCard({
  experience,
  onBack,
}: {
  experience: ExperienceItem
  onBack: () => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-cyan-400/40 bg-slate-950/95 shadow-[0_0_48px_rgba(34,211,238,0.18)] backdrop-blur-md">
      <div className="relative h-36 sm:h-44 md:h-48">
        <img
          src={experience.image}
          alt={experience.company}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-10 flex items-center gap-2 rounded-full border border-cyan-500/40 bg-black/70 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-sm transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="absolute bottom-0 left-0 w-full px-5 pb-4 md:px-6 md:pb-5">
          <p className="text-sm font-semibold text-cyan-400">{experience.company}</p>
          <h3 className="mt-0.5 text-xl font-bold text-white md:text-2xl">{experience.title}</h3>
          <p className="mt-1 text-sm text-neutral-400">
            {experience.period} · {experience.location}
          </p>
        </div>
      </div>

      <div className="max-h-[min(380px,50vh)] overflow-y-auto px-4 py-4 sm:max-h-[420px] sm:px-5 sm:py-5 md:px-6 md:py-6">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
          Key contributions
        </h4>
        <ul className="space-y-3">
          {experience.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-neutral-300 md:text-base">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-cyan-500/15 pt-4">
          <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-cyan-300/80">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden bg-black py-12 text-white sm:py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-16">
          <h2 className="mb-3 bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:mb-4 sm:text-4xl md:text-6xl">
            Let&apos;s Connect
          </h2>
          <p className="text-base font-light text-zinc-300 sm:text-xl md:text-2xl">
            Ready to collaborate on your next project?
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <ContactInfoPanel className="min-h-0 lg:min-h-[520px]">
            <div className="flex h-full flex-col justify-center p-5 sm:p-8 md:p-10">
              <h3 className="mb-6 text-2xl font-bold tracking-tight text-white sm:mb-8 sm:text-3xl">Get in Touch</h3>

              <div className="space-y-4 sm:space-y-5">
                <a
                  href="mailto:deveshs2015@gmail.com"
                  className="group flex items-center gap-3 rounded-xl border border-zinc-700/80 bg-black/50 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-black/70 sm:gap-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 sm:h-12 sm:w-12">
                    <Mail className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-white sm:text-lg">Email</h4>
                    <p className="break-all text-sm text-zinc-300 transition-colors group-hover:text-cyan-200/90 sm:text-base">
                      deveshs2015@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/devesh-singh-9998a6199"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-zinc-700/80 bg-black/50 p-4 transition-all duration-300 hover:border-cyan-500/30 hover:bg-black/70 sm:gap-4 sm:p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 sm:h-12 sm:w-12">
                    <Linkedin className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-base font-semibold text-white sm:text-lg">LinkedIn</h4>
                    <p className="text-sm text-zinc-300 transition-colors group-hover:text-cyan-200/90 sm:text-base">
                      Connect with me
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </ContactInfoPanel>

          <SectionGlassPanel variant="accent" className="min-h-[280px] sm:min-h-[360px] lg:min-h-[520px]">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="h-full min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[520px]"
            />
          </SectionGlassPanel>
        </div>

        <div className="mt-12 border-t border-zinc-700/50 pt-6 text-center sm:mt-20 sm:pt-8">
          <p className="px-2 text-sm text-zinc-400 sm:text-base">
            © 2024 Devesh Singh. Built with passion for technology and innovation
          </p>
        </div>
      </div>
    </section>
  )
}

// Experience Section Component
function FullExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [galleryRadius, setGalleryRadius] = useState(320)
  const galleryItems = EXPERIENCE_DATA.map(experienceToGalleryItem)
  const angleStep = 360 / galleryItems.length
  const rotation = -activeIndex * angleStep
  const isExpanded = expandedIndex !== null

  const goToPrevious = () => {
    setActiveIndex((index) => (index - 1 + galleryItems.length) % galleryItems.length)
  }

  const goToNext = () => {
    setActiveIndex((index) => (index + 1) % galleryItems.length)
  }

  const handleCardClick = (index: number) => {
    setActiveIndex(index)
    setExpandedIndex(index)
  }

  const handleBack = () => {
    setExpandedIndex(null)
  }

  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth
      if (w < 380) setGalleryRadius(155)
      else if (w < 640) setGalleryRadius(195)
      else if (w < 1024) setGalleryRadius(260)
      else setGalleryRadius(320)
    }

    updateRadius()
    window.addEventListener("resize", updateRadius)
    return () => window.removeEventListener("resize", updateRadius)
  }, [])

  return (
    <section id="experience" className="relative scroll-mt-20 overflow-hidden bg-black pt-6 pb-10 sm:overflow-visible sm:pb-12 md:pt-8 md:pb-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 text-center md:mb-8">
          <h2 className="mb-2 bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl">
            Experience
          </h2>
          <p className="px-2 text-xs font-light text-neutral-400 sm:text-sm md:text-base">
            {isExpanded
              ? "Expanded role details"
              : `Use arrows to browse roles · ${activeIndex + 1} of ${galleryItems.length}`}
          </p>
        </div>

        <div
          className={cn(
            "relative mx-auto max-w-4xl overflow-hidden transition-all duration-500 sm:overflow-visible",
            isExpanded ? "min-h-[480px] md:min-h-[560px]" : "h-[340px] sm:h-[400px] md:h-[500px]",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isExpanded ? (
              <motion.div
                key={`expanded-${expandedIndex}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3 }}
              >
                <ExpandedExperienceCard
                  experience={EXPERIENCE_DATA[expandedIndex!]}
                  onBack={handleBack}
                />
              </motion.div>
            ) : (
              <div key="gallery" className="relative h-full w-full overflow-visible">
                <CircularGallery
                  items={galleryItems}
                  radius={galleryRadius}
                  rotation={rotation}
                  animate
                  scrollDriven={false}
                  onItemClick={handleCardClick}
                  className="h-full"
                />

                <button
                  type="button"
                  aria-label="Previous experience"
                  onClick={goToPrevious}
                  className="absolute left-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-500/40 bg-black/80 text-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white sm:left-0 sm:h-10 sm:w-10 md:left-2 md:h-12 md:w-12"
                >
                  <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </button>

                <button
                  type="button"
                  aria-label="Next experience"
                  onClick={goToNext}
                  className="absolute right-1 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-500/40 bg-black/80 text-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-white sm:right-0 sm:h-10 sm:w-10 md:right-2 md:h-12 md:w-12"
                >
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                </button>

                <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-2">
                  {galleryItems.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to experience ${index + 1}`}
                      onClick={() => setActiveIndex(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        activeIndex === index
                          ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                          : "w-2 bg-cyan-500/30 hover:bg-cyan-500/60",
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
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
