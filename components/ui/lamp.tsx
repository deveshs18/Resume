"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const lampTransition = {
  delay: 0.15,
  duration: 1,
  ease: "easeInOut" as const,
}

export const LampContainer = ({
  children,
  className,
  embedded = false,
}: {
  children: React.ReactNode
  className?: string
  embedded?: boolean
}) => {
  return (
    <div
      className={cn(
        "relative z-0 flex w-full flex-col overflow-hidden rounded-md bg-slate-950",
        embedded ? "min-h-full h-full" : "min-h-screen items-center justify-center",
        className,
      )}
    >
      <div
        className={cn(
          "relative isolate z-0 flex w-full items-center justify-center",
          embedded ? "h-44 shrink-0 scale-y-110 md:h-52" : "flex-1 scale-y-125",
        )}
      >
        <motion.div
          initial={{ opacity: 0.4, width: "8rem" }}
          animate={{ opacity: 1, width: embedded ? "22rem" : "30rem" }}
          transition={lampTransition}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-40 w-[22rem] overflow-visible bg-gradient-conic from-cyan-500 via-transparent to-transparent md:h-56 md:w-[30rem] [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-32 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)] md:h-40" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-32 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)] md:w-40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.4, width: "8rem" }}
          animate={{ opacity: 1, width: embedded ? "22rem" : "30rem" }}
          transition={lampTransition}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-40 w-[22rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 md:h-56 md:w-[30rem] [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-32 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)] md:w-40" />
          <div className="absolute bottom-0 right-0 z-20 h-32 w-full bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)] md:h-40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.3, scale: 0.6 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={lampTransition}
          className="absolute inset-auto z-50 h-28 w-64 -translate-y-6 rounded-full bg-cyan-500 opacity-50 blur-3xl md:h-36 md:w-[28rem] md:-translate-y-8"
        />
        <motion.div
          initial={{ width: "4rem", opacity: 0.4 }}
          animate={{ width: embedded ? "14rem" : "18rem", opacity: 1 }}
          transition={lampTransition}
          className="absolute inset-auto z-30 h-28 w-48 -translate-y-12 rounded-full bg-cyan-400 blur-2xl md:h-36 md:w-64 md:-translate-y-16"
        />
        <motion.div
          initial={{ width: "2rem", height: "2px", opacity: 0.3 }}
          animate={{
            width: embedded ? "18rem" : "30rem",
            height: "5px",
            opacity: 1,
          }}
          transition={{ ...lampTransition, duration: 1.2 }}
          className="absolute inset-auto z-50 -translate-y-14 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.8)] md:-translate-y-20 md:h-1.5"
        />
        <motion.div
          initial={{ height: "0rem", opacity: 0 }}
          animate={{ height: embedded ? "5rem" : "8rem", opacity: 0.35 }}
          transition={{ ...lampTransition, delay: 0.4, duration: 1 }}
          className="absolute inset-auto z-40 w-16 -translate-y-8 bg-gradient-to-b from-cyan-400/60 via-cyan-500/20 to-transparent blur-sm md:w-24 md:-translate-y-12"
        />
      </div>

      <div
        className={cn(
          "relative z-50 flex flex-1 flex-col items-center justify-center gap-4 px-5 pb-6 pt-2 md:gap-5 md:pb-8",
          !embedded && "-translate-y-80",
        )}
      >
        {children}
      </div>
    </div>
  )
}
