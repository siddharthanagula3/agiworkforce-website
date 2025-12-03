"use client"

import * as React from "react"
import { motion, type HTMLMotionProps } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { cn } from "@/lib/utils"

export interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  once?: boolean
}

const ScrollReveal = React.forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ className, children, delay = 0, direction = "up", once = true, ...props }, ref) => {
    const [inViewRef, inView] = useInView({
      triggerOnce: once,
      threshold: 0.1,
    })

    const directions = {
      up: { y: 40, x: 0 },
      down: { y: -40, x: 0 },
      left: { y: 0, x: 40 },
      right: { y: 0, x: -40 },
    }

    return (
      <motion.div
        ref={inViewRef}
        initial={{
          opacity: 0,
          ...directions[direction],
        }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
                x: 0,
              }
            : {}
        }
        transition={{
          duration: 0.6,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

ScrollReveal.displayName = "ScrollReveal"

export { ScrollReveal }
