"use client"

import { cn } from "@/lib/utils"

type Loader3VisualProps = {
  className?: string
  active?: boolean
}

export function Loader3Visual({ className, active = true }: Loader3VisualProps) {
  return (
    <div
      className={cn(
        "loader-3-scene relative flex h-full w-full items-center justify-center overflow-hidden bg-black",
        !active && "loader-3-scene--paused",
        className,
      )}
    >
      <div className="origin-center scale-[0.48] sm:scale-[0.54] md:scale-[0.58]">
        <div className="loader">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className={`box box${i}`}>
              <div />
            </div>
          ))}
          <div className="ground">
            <div />
          </div>
        </div>
      </div>
    </div>
  )
}
