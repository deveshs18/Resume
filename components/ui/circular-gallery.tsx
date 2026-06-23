"use client"



import React, { useState, useEffect, useRef, type HTMLAttributes } from "react"

import { cn } from "@/lib/utils"



export interface GalleryItem {

  common: string

  binomial: string

  photo: {

    url: string

    text: string

    pos?: string

    by: string

  }

  tags?: string[]

}



interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {

  items: GalleryItem[]

  radius?: number

  autoRotateSpeed?: number

  rotation?: number

  animate?: boolean

  scrollDriven?: boolean

  onItemClick?: (index: number) => void

}



const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(

  (

    {

      items,

      className,

      radius = 600,

      autoRotateSpeed = 0.02,

      rotation: controlledRotation,

      animate = false,

      scrollDriven = true,

      onItemClick,

      ...props

    },

    ref,

  ) => {

    const [internalRotation, setInternalRotation] = useState(0)

    const [isScrolling, setIsScrolling] = useState(false)

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const animationFrameRef = useRef<number | null>(null)



    const isControlled = controlledRotation !== undefined

    const rotation = isControlled ? controlledRotation : internalRotation



    useEffect(() => {

      if (!scrollDriven || isControlled) return



      const handleScroll = () => {

        setIsScrolling(true)

        if (scrollTimeoutRef.current) {

          clearTimeout(scrollTimeoutRef.current)

        }



        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight

        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0

        setInternalRotation(scrollProgress * 360)



        scrollTimeoutRef.current = setTimeout(() => {

          setIsScrolling(false)

        }, 150)

      }



      window.addEventListener("scroll", handleScroll, { passive: true })

      return () => {

        window.removeEventListener("scroll", handleScroll)

        if (scrollTimeoutRef.current) {

          clearTimeout(scrollTimeoutRef.current)

        }

      }

    }, [scrollDriven, isControlled])



    useEffect(() => {

      if (isControlled || !scrollDriven) return



      const autoRotate = () => {

        if (!isScrolling) {

          setInternalRotation((prev) => prev + autoRotateSpeed)

        }

        animationFrameRef.current = requestAnimationFrame(autoRotate)

      }



      animationFrameRef.current = requestAnimationFrame(autoRotate)



      return () => {

        if (animationFrameRef.current) {

          cancelAnimationFrame(animationFrameRef.current)

        }

      }

    }, [isScrolling, autoRotateSpeed, scrollDriven, isControlled])



    const anglePerItem = 360 / items.length



    return (

      <div

        ref={ref}

        role="region"

        aria-label="Circular 3D Gallery"

        className={cn("relative flex h-full w-full items-center justify-center overflow-visible", className)}

        style={{ perspective: "2000px" }}

        {...props}

      >

        <div

          className="relative h-full w-full"

          style={{

            transform: `rotateY(${rotation}deg)`,

            transformStyle: "preserve-3d",

            transition: animate ? "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)" : undefined,

          }}

        >

          {items.map((item, i) => {

            const itemAngle = i * anglePerItem

            const totalRotation = rotation % 360

            const relativeAngle = (itemAngle + totalRotation + 360) % 360

            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle)

            const opacity = Math.max(0.35, 1 - normalizedAngle / 180)



            return (

              <div

                key={`${item.common}-${i}`}

                role="group"

                aria-label={item.common}

                className="absolute h-[240px] w-[190px] max-[380px]:h-[220px] max-[380px]:w-[170px] sm:h-[300px] sm:w-[230px] md:h-[380px] md:w-[280px] lg:h-[400px] lg:w-[300px]"

                style={{

                  transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,

                  left: "50%",

                  top: "50%",

                  translate: "-50% -50%",

                  opacity,

                  transition: "opacity 0.3s linear",

                }}

              >

                <button

                  type="button"

                  onClick={() => onItemClick?.(i)}

                  className="group relative h-full w-full cursor-pointer overflow-hidden rounded-xl border border-cyan-500/30 bg-slate-950/80 text-left shadow-[0_0_30px_rgba(34,211,238,0.12)] backdrop-blur-lg transition-colors hover:border-cyan-400/50 sm:rounded-lg"

                >

                  <img

                    src={item.photo.url}

                    alt={item.photo.text}

                    className="absolute inset-0 h-full w-full object-cover"

                    style={{ objectPosition: item.photo.pos || "center" }}

                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute bottom-0 left-0 w-full p-3 text-white sm:p-4">

                    <p className="text-[10px] font-medium text-cyan-300 sm:text-xs">{item.binomial}</p>

                    <h2 className="mt-1 text-base font-bold leading-tight sm:text-lg md:text-xl">{item.common}</h2>

                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-300 opacity-90">

                      {item.photo.text}

                    </p>

                    <p className="mt-2 text-xs text-neutral-400">{item.photo.by}</p>

                    {item.tags && item.tags.length > 0 && (

                      <div className="mt-3 flex flex-wrap gap-1">

                        {item.tags.map((tag) => (

                          <span

                            key={tag}

                            className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2 py-0.5 text-[10px] text-cyan-200"

                          >

                            {tag}

                          </span>

                        ))}

                      </div>

                    )}

                  </div>

                </button>

              </div>

            )

          })}

        </div>

      </div>

    )

  },

)



CircularGallery.displayName = "CircularGallery"



export { CircularGallery }


