"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  CardCurtainReveal,
  CardCurtainRevealBody,
  CardCurtainRevealDescription,
  CardCurtainRevealFooter,
  CardCurtainRevealTitle,
} from "@/components/ui/card-curtain-reveal"
import { TextHoverEffect } from "@/components/ui/hover-text-effect"

export type ProjectItem = {
  id: number
  title: string
  hoverText: string
  shortDescription: string
  fullDescription: string
  techStack: string[]
  githubLink: string
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    title: "UBER Simulation – Distributed Systems Project",
    hoverText: "UBER",
    shortDescription:
      "Microservices ride-hailing system with Kafka, Redis, MongoDB, MySQL, and XGBoost dynamic pricing.",
    fullDescription:
      "Designed and implemented a microservices-based ride-hailing system using Node.js, Kafka, Redis, MongoDB, MySQL, and XGBoost for dynamic pricing on Kaggle ride data. Deployed containerized services on AWS using Docker and Kubernetes, with Kafka for messaging, Redis for caching, and load testing via JMeter on 10K+ records.",
    techStack: ["Node.js", "Kafka", "Redis", "Docker", "Kubernetes", "AWS"],
    githubLink: "https://github.com/deveshs18/UBER",
  },
  {
    id: 2,
    title: "Sentimental Stock Prediction using GenAI",
    hoverText: "GenAI",
    shortDescription:
      "GPT + FinBERT market insights pipeline cutting analysis time by 70% and improving accuracy by 15%.",
    fullDescription:
      "Integrated GPT API with FinBERT to auto-generate market insights, cutting analysis time by 70% and improving accuracy by 15%. Built a time-decay sentiment model, increasing prediction relevance by 25% over baseline. Developed a PyTorch pipeline combining FinBERT sentiment and technical indicators for trend forecasting.",
    techStack: ["FinBERT", "PyTorch", "Transformers", "Streamlit", "Python"],
    githubLink: "https://github.com/deveshs18/Sentimental_stock_predictor",
  },
  {
    id: 3,
    title: "Sentiment & Lingo Trend Analysis",
    hoverText: "Trend NLP",
    shortDescription:
      "Kafka-Spark NLP pipeline handling 1,200+ tweets/hour with PostgreSQL and Grafana dashboards.",
    fullDescription:
      "Engineered a Kafka-Spark NLP pipeline handling 1,200+ tweets/hour, with PostgreSQL and Grafana for live trend tracking. Applied Bloom Filter, Flajolet-Martin, and Count-Min Sketch for efficient deduplication, interaction estimation, and frequency tracking in high-velocity data streams.",
    techStack: ["Kafka", "Spark", "PostgreSQL", "Grafana", "NLTK", "spaCy"],
    githubLink: "https://github.com/deveshs18/Trend_Analysis_BigData",
  },
  {
    id: 4,
    title: "Text-to-SQL (LLM + RAG)",
    hoverText: "Text2SQL",
    shortDescription:
      "Natural-language database querying with Schema-RAG, SQL auto-correction, and LLM benchmarking.",
    fullDescription:
      "Built a comprehensive evaluation and deployment framework for Text-to-SQL systems. The framework benchmarks open-source local LLMs (Qwen) vs commercial APIs (GPT-4o) under controlled prompting and schema retrieval settings. Designed a modular pipeline featuring Schema-RAG, model-aware prompt builder, SQL validation/repair layer, and an execution harness.",
    techStack: ["Python", "RAG", "LLMs", "QLoRA", "SQLite", "HuggingFace"],
    githubLink: "https://github.com/deveshs18/Text-To-SQL",
  },
  {
    id: 5,
    title: "Lyrics2Music – AI Music Generation",
    hoverText: "Lyrics2Music",
    shortDescription:
      "End-to-end deep learning pipeline generating structured MIDI from lyrics via Transformers.",
    fullDescription:
      "Lyric2Music is a 4-stage modular AI pipeline: Emotion Detection (DistilBERT) → Control Mapping (MLP) → Music Generation (Transformer) → Emotion Verification. Developed a custom Structured REMI tokenizer and trained a multi-task Transformer on 16,000+ MIDI files to ensure harmonic coherence and rhythmic alignment.",
    techStack: ["PyTorch", "Transformers", "DistilBERT", "CUDA", "MIDI"],
    githubLink: "https://github.com/deveshs18/Lyrics2Music",
  },
]

function ProjectDetailCard({ project, onClose }: { project: ProjectItem; onClose: () => void }) {
  return (
    <CardCurtainReveal
      revealOnClick
      className="h-[min(520px,90vh)] w-full max-w-md border border-zinc-800 bg-black text-white shadow-2xl"
    >
      <CardCurtainRevealBody className="flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 flex w-fit items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </button>

        <CardCurtainRevealTitle className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          {project.title}
        </CardCurtainRevealTitle>

        <CardCurtainRevealDescription className="my-4 text-sm leading-relaxed text-neutral-300">
          <p>{project.fullDescription}</p>
        </CardCurtainRevealDescription>

        <Button
          className="w-fit gap-2 rounded-full border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
          onClick={() => window.open(project.githubLink, "_blank")}
        >
          <Github className="h-4 w-4" />
          View on GitHub
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardCurtainRevealBody>

      <CardCurtainRevealFooter className="mt-auto flex h-40 items-center justify-center bg-black">
        <div className="h-full w-full px-4">
          <TextHoverEffect text={project.hoverText} duration={0.15} variant="mono" />
        </div>
      </CardCurtainRevealFooter>
    </CardCurtainReveal>
  )
}

export function ProjectsSection() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null)
  const selectedProject = PROJECTS_DATA.find((p) => p.id === selectedProjectId) ?? null

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProjectId(null)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selectedProjectId ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedProjectId])

  return (
    <section
      id="projects"
      className="relative scroll-mt-20 min-h-screen overflow-hidden bg-black py-16 text-white md:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
            Projects
          </h2>
          <p className="text-lg font-light text-neutral-400 md:text-xl">
            Scroll the carousel · hover cards · click to open details
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-lg justify-center px-8">
          <Carousel opts={{ align: "start" }} orientation="vertical" className="w-full">
            <CarouselContent className="-mt-1 h-[420px] sm:h-[500px]">
              {PROJECTS_DATA.map((project) => (
                <CarouselItem key={project.id} className="basis-full pt-1 md:basis-1/2">
                  <button
                    type="button"
                    onClick={() => setSelectedProjectId(project.id)}
                    className="w-full text-left"
                  >
                    <Card className="overflow-hidden border-cyan-500/25 bg-zinc-950/80 shadow-[0_0_24px_rgba(34,211,238,0.08)] transition-all hover:-translate-y-0.5 hover:border-cyan-400/40 hover:shadow-[0_0_32px_rgba(34,211,238,0.18)]">
                      <div className="flex h-36 items-center justify-center bg-black sm:h-40">
                        <div className="h-full w-full px-2">
                          <TextHoverEffect text={project.hoverText} duration={0.15} />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="line-clamp-1 text-sm font-semibold text-cyan-300">
                          {project.title}
                        </p>
                        <CardDescription className="mt-2 line-clamp-2 text-xs text-neutral-400 sm:text-sm">
                          {project.shortDescription}
                        </CardDescription>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {project.techStack.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-cyan-500/40 bg-black text-cyan-400 hover:bg-cyan-500/10 hover:text-white" />
            <CarouselNext className="border-cyan-500/40 bg-black text-cyan-400 hover:bg-cyan-500/10 hover:text-white" />
          </Carousel>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProjectId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <ProjectDetailCard
                project={selectedProject}
                onClose={() => setSelectedProjectId(null)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
