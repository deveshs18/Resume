"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode
  showRadialGradient?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div>
      <div
        className={cn(
          "relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 transition-bg dark:bg-zinc-900",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-50 will-change-transform
            [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [background-image:var(--white-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%]
            filter blur-[10px] invert
            after:absolute after:inset-0 after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%]
            after:content-['']
            dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0`,
            showRadialGradient &&
              "[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]",
          )}
        />
        {children}
      </div>
    </div>
  )
}
