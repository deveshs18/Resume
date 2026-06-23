"use client"

import { Suspense, lazy } from "react"
import { cn } from "@/lib/utils"

const Spline = lazy(() => import("@splinetool/react-spline"))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900",
        className,
      )}
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
    </div>
  )
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense fallback={<SplineFallback className={className} />}>
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}
