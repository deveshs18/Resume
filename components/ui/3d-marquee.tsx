"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const DEFAULT_FRAMEWORK_IMAGES = [
  "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1461740680692-0acd25f38b08?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&auto=format&fit=crop&q=80",
]

interface ThreeDMarqueeProps {
  images?: string[]
  className?: string
  active?: boolean
}

export function ThreeDMarquee({
  images = DEFAULT_FRAMEWORK_IMAGES,
  className,
  active = true,
}: ThreeDMarqueeProps) {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-black", className)} style={{ perspective: "900px" }}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="aspect-square h-[140%] w-[140%] max-w-none shrink-0 scale-110">
          <div
            style={{ transform: "rotateX(45deg) rotateY(0deg) rotateZ(45deg)", transformStyle: "preserve-3d" }}
            className="relative -top-8 right-[-42%] grid h-full w-full origin-top-left grid-cols-3 gap-3 sm:gap-4"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                key={`marquee-col-${colIndex}`}
                animate={active ? { y: colIndex % 2 === 0 ? 40 : -40 } : { y: 0 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: active ? Infinity : 0,
                  repeatType: "reverse",
                }}
                className="flex flex-col items-start gap-4"
              >
                {subarray.map((src, imageIndex) => (
                  <div key={`${src}-${imageIndex}`} className="relative w-full">
                    <img
                      className="aspect-[4/3] h-auto w-full rounded-lg border border-cyan-500/20 bg-neutral-900 object-cover select-none"
                      src={src}
                      alt={`Framework visual ${imageIndex + 1}`}
                      draggable={false}
                      loading="lazy"
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40" />
    </div>
  )
}

export default ThreeDMarquee
