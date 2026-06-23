"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { cn } from "@/lib/utils"

type ArtificialHeroVisualProps = {
  className?: string
  active?: boolean
}

export function ArtificialHeroVisual({ className, active = true }: ArtificialHeroVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const grainCanvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    const canvas = canvasRef.current
    const grainCanvas = grainCanvasRef.current
    if (!container || !canvas || !grainCanvas) return

    const ctx = canvas.getContext("2d")
    const grainCtx = grainCanvas.getContext("2d")
    if (!ctx || !grainCtx) return

    const density = " .:-=+*#%@"

    const params = {
      rotation: 0,
      atmosphereShift: 0,
      glitchIntensity: 0,
    }

    gsap.to(params, {
      rotation: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none",
    })

    gsap.to(params, {
      atmosphereShift: 1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    })

    gsap.to(params, {
      glitchIntensity: 1,
      duration: 0.1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      repeatDelay: Math.random() * 3 + 1,
    })

    let width = 0
    let height = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = width
      canvas.height = height
      grainCanvas.width = width
      grainCanvas.height = height
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(container)

    const generateFilmGrain = (w: number, h: number, intensity = 0.15) => {
      const imageData = grainCtx.createImageData(w, h)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const grain = (Math.random() - 0.5) * intensity * 255
        data[i] = Math.max(0, Math.min(255, 128 + grain))
        data[i + 1] = Math.max(0, Math.min(255, 128 + grain))
        data[i + 2] = Math.max(0, Math.min(255, 128 + grain))
        data[i + 3] = Math.abs(grain) * 3
      }
      return imageData
    }

    const drawGlitchedOrb = (
      centerX: number,
      centerY: number,
      radius: number,
      hue: number,
      glitchIntensity: number,
    ) => {
      ctx.save()
      const shouldGlitch = Math.random() < 0.1 && glitchIntensity > 0.5
      const glitchOffset = shouldGlitch ? (Math.random() - 0.5) * 20 * glitchIntensity : 0

      if (shouldGlitch) {
        ctx.translate(glitchOffset, glitchOffset * 0.8)
      }

      const orbGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 1.5)
      orbGradient.addColorStop(0, `hsla(${hue + 10}, 100%, 95%, 0.9)`)
      orbGradient.addColorStop(0.2, `hsla(${hue + 20}, 90%, 80%, 0.7)`)
      orbGradient.addColorStop(0.5, `hsla(${hue}, 70%, 50%, 0.4)`)
      orbGradient.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = orbGradient
      ctx.fillRect(0, 0, width, height)

      const centerRadius = radius * 0.3
      ctx.fillStyle = `hsla(${hue + 20}, 100%, 95%, 0.8)`
      ctx.beginPath()
      ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = `hsla(${hue + 20}, 80%, 70%, 0.6)`
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()
    }

    function render() {
      timeRef.current += 0.016
      const time = timeRef.current

      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, width, height)

      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.22

      const bgGradient = ctx.createRadialGradient(centerX, centerY - 20, 0, centerX, centerY, Math.max(width, height) * 0.8)
      const hue = 180 + params.atmosphereShift * 60
      bgGradient.addColorStop(0, `hsla(${hue + 40}, 80%, 60%, 0.4)`)
      bgGradient.addColorStop(0.3, `hsla(${hue}, 60%, 40%, 0.3)`)
      bgGradient.addColorStop(0.6, `hsla(${hue - 20}, 40%, 20%, 0.2)`)
      bgGradient.addColorStop(1, "rgba(0, 0, 0, 0.9)")
      ctx.fillStyle = bgGradient
      ctx.fillRect(0, 0, width, height)

      drawGlitchedOrb(centerX, centerY, radius, hue, params.glitchIntensity)

      ctx.font = '8px "JetBrains Mono", monospace'
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const spacing = 8
      const cols = Math.min(80, Math.floor(width / spacing))
      const rows = Math.min(50, Math.floor(height / spacing))

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = (i - cols / 2) * spacing + centerX
          const y = (j - rows / 2) * spacing + centerY
          const dx = x - centerX
          const dy = y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius && Math.random() > 0.4) {
            const z = Math.sqrt(Math.max(0, radius * radius - dx * dx - dy * dy))
            const angle = params.rotation
            const rotZ = dx * Math.sin(angle) + z * Math.cos(angle)
            const brightness = (rotZ + radius) / (radius * 2)

            if (rotZ > -radius * 0.3) {
              const charIndex = Math.floor(brightness * (density.length - 1))
              let char = density[charIndex]
              if (dist < radius * 0.8 && params.glitchIntensity > 0.8 && Math.random() < 0.3) {
                const glitchChars = ["█", "▓", "▒", "░"]
                char = glitchChars[Math.floor(Math.random() * glitchChars.length)]
              }
              ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.2, brightness)})`
              ctx.fillText(char, x, y)
            }
          }
        }
      }

      grainCtx.clearRect(0, 0, width, height)
      const grainIntensity = 0.22 + Math.sin(time * 10) * 0.03
      grainCtx.putImageData(generateFilmGrain(width, height, grainIntensity), 0, 0)

      frameRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      observer.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      gsap.killTweensOf(params)
    }
  }, [active])

  return (
    <div ref={containerRef} className={cn("relative h-full w-full overflow-hidden bg-black", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <canvas
        ref={grainCanvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60 mix-blend-overlay"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
    </div>
  )
}
