"use client"

import type React from "react"
import Spline from "@splinetool/react-spline"
import { cn } from "@/lib/utils"

export const SPLINE_KEYBOARD_SCENE =
  "https://prod.spline.design/dJqTIQ-tE3ULUPMi/scene.splinecode"

function GradientOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        background: `
          linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 30%, transparent 70%, rgba(0, 0, 0, 0.8)),
          linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.9))
        `,
      }}
    />
  )
}

function HeroSplineBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("relative h-full min-h-full w-full overflow-hidden", className)}
      style={{ pointerEvents: "auto" }}
    >
      <Spline
        scene={SPLINE_KEYBOARD_SCENE}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100%",
          pointerEvents: "auto",
        }}
      />
      <GradientOverlay />
    </div>
  )
}

interface SplineKeyboardSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

function SplineKeyboardSection({ children, className, id }: SplineKeyboardSectionProps) {
  return (
    <section
      id={id}
      className={cn("relative min-h-screen overflow-hidden bg-black", className)}
    >
      <div className="absolute inset-0 z-0">
        <HeroSplineBackground className="min-h-screen" />
      </div>
      <div className="relative z-10 min-h-screen pointer-events-none">{children}</div>
    </section>
  )
}

interface SectionGlassPanelProps {
  children: React.ReactNode
  className?: string
  variant?: "neutral" | "accent"
}

function SectionGlassPanel({ children, className, variant = "neutral" }: SectionGlassPanelProps) {
  return (
    <div
      className={cn(
        "pointer-events-auto relative overflow-hidden rounded-xl shadow-2xl backdrop-blur-sm",
        variant === "accent"
          ? "border border-cyan-500/25 bg-black/40 shadow-[0_0_32px_rgba(34,211,238,0.12)]"
          : "border border-gray-700/50 bg-gray-900/45",
        className,
      )}
    >
      {variant === "accent" && (
        <>
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl" />
        </>
      )}
      {variant === "neutral" && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.08),transparent_55%)]" />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Backwards-compatible aliases
const ContactSectionBackground = SplineKeyboardSection
const ContactInfoPanel = SectionGlassPanel
const ContactRobotPanel = ({ children, className }: SectionGlassPanelProps) => (
  <SectionGlassPanel variant="accent" className={className}>
    {children}
  </SectionGlassPanel>
)

export {
  SplineKeyboardSection,
  SectionGlassPanel,
  HeroSplineBackground,
  GradientOverlay,
  ContactSectionBackground,
  ContactInfoPanel,
  ContactRobotPanel,
}
