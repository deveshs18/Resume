"use client"

import { useEffect, useState } from "react"
import { CardStack, type CardStackItem } from "@/components/ui/card-stack"
import { Macbook } from "@/components/ui/animated-3d-mac-book-air"
import { ArtificialHeroVisual } from "@/components/ui/artificial-hero"
import { Loader3Visual } from "@/components/ui/loader-3"
import { ThreeDMarquee } from "@/components/ui/3d-marquee"

type SkillEffect = "macbook" | "loader" | "marquee" | "artificial"

type SkillStackItem = CardStackItem & {
  skills: string[]
  effect: SkillEffect
}

const SKILL_STACK_ITEMS: SkillStackItem[] = [
  {
    id: "languages",
    title: "Programming Languages",
    description: "Core languages for backend, ML, and full-stack development",
    tag: "Languages",
    effect: "macbook",
    imageSrc:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=900&auto=format&fit=crop&q=80",
    skills: ["Python", "Java", "JavaScript"],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    description: "Cloud, data pipelines, and developer infrastructure",
    tag: "DevOps & Data",
    effect: "loader",
    imageSrc:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=80",
    skills: [
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
    ],
  },
  {
    id: "frameworks",
    title: "Frameworks & Libraries",
    description: "Modern stacks for web apps and machine learning",
    tag: "Frameworks",
    effect: "marquee",
    imageSrc:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=900&auto=format&fit=crop&q=80",
    skills: [
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
      "Transformers",
      "LangChain",
      "QLoRA",
      "CUDA",
    ],
  },
  {
    id: "ai",
    title: "AI & Data Science",
    description: "LLMs, RAG, NLP, and deep learning specializations",
    tag: "AI / ML",
    effect: "artificial",
    imageSrc:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&auto=format&fit=crop&q=80",
    skills: [
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Generative AI",
      "Fine-Tuning",
      "Prompt Engineering",
      "Symbolic AI",
      "Natural Language Processing (NLP)",
      "Sequence Modeling",
      "Computer Vision (CNNs)",
    ],
  },
]

function SkillEffectVisual({ effect, active }: { effect: SkillEffect; active: boolean }) {
  if (effect === "macbook") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full scale-[2] sm:scale-[2.2]">
            <Macbook />
          </div>
        </div>
      </div>
    )
  }

  if (effect === "loader") return <Loader3Visual active={active} />
  if (effect === "marquee") return <ThreeDMarquee active={active} />
  return <ArtificialHeroVisual active={active} />
}

function SkillStackCard({ item, active }: { item: SkillStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div className="absolute inset-x-0 top-0 h-[55%]">
        <SkillEffectVisual effect={item.effect} active={active} />
      </div>

      <div className="absolute inset-x-0 bottom-0 flex h-[45%] flex-col justify-end bg-gradient-to-t from-black via-black/95 to-black/70 p-4 md:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-cyan-400">{item.tag}</p>
        <h3 className="mt-1 text-base font-bold text-white md:text-lg">{item.title}</h3>
        {item.description ? (
          <p className="mt-1 line-clamp-1 text-xs text-neutral-400">{item.description}</p>
        ) : null}
        <div className="mt-3 flex max-h-[72px] flex-wrap gap-1.5 overflow-y-auto pr-1">
          {item.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SkillsSection() {
  const [cardWidth, setCardWidth] = useState(300)
  const [cardHeight, setCardHeight] = useState(360)

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth
      if (w < 640) {
        setCardWidth(Math.min(300, w - 48))
        setCardHeight(340)
      } else if (w < 1024) {
        setCardWidth(420)
        setCardHeight(360)
      } else {
        setCardWidth(520)
        setCardHeight(380)
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <section id="skills" className="relative scroll-mt-20 min-h-screen overflow-hidden bg-black py-16 text-white md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="mb-4 bg-gradient-to-r from-cyan-300 via-white to-cyan-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
            Skills
          </h2>
          <p className="text-lg font-light text-neutral-400 md:text-xl">
            Swipe or click cards · each category has its own live effect
          </p>
        </div>

        <CardStack
          items={SKILL_STACK_ITEMS}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          autoAdvance
          intervalMs={3500}
          pauseOnHover
          loop
          spreadDeg={42}
          renderCard={(item, { active }) => (
            <SkillStackCard item={item as SkillStackItem} active={active} />
          )}
        />

        <div className="mt-16 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 text-center text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-2 text-3xl font-bold">3+</div>
            <div className="text-sm text-gray-600">Years Experience</div>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800">
            <div className="mb-2 text-3xl font-bold">Bachelors</div>
            <div className="text-sm text-gray-400">Computer Science</div>
          </div>
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800">
            <div className="mb-2 text-3xl font-bold">MS</div>
            <div className="text-sm text-gray-400">Data Intelligence</div>
          </div>
          <div className="rounded-lg bg-white p-6 text-center text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="mb-2 text-3xl font-bold">SJSU</div>
            <div className="text-sm text-gray-600">Graduate</div>
          </div>
        </div>
      </div>
    </section>
  )
}
