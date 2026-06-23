"use client"

import React, { useRef } from "react"
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode
  children: React.ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.95, 1] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [18, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -30] : [0, -80])

  return (
    <div
      className="relative flex h-[40rem] items-start justify-center px-2 pb-4 pt-6 sm:h-[48rem] sm:pb-6 sm:pt-8 md:h-[62rem] md:px-8 md:pb-8 md:pt-16"
      ref={containerRef}
    >
      <div
        className="relative w-full max-w-5xl py-4 md:py-10"
        style={{
          perspective: "1200px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto mb-3 max-w-5xl px-2 text-center sm:mb-4 md:mb-8"
    >
      {titleComponent}
    </motion.div>
  )
}

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformStyle: "preserve-3d",
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className="mx-auto w-full rounded-[20px] border-4 border-[#6C6C6C] bg-[#222222] p-1.5 shadow-2xl sm:rounded-[30px] md:p-4"
    >
      <div className="min-h-[24rem] w-full overflow-hidden rounded-xl bg-zinc-900 sm:min-h-[28rem] md:min-h-[36rem] md:rounded-2xl">
        {children}
      </div>
    </motion.div>
  )
}
