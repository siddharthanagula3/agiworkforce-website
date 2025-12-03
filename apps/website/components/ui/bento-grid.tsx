"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, type HTMLMotionProps } from "framer-motion"

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface BentoCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  title?: string
  description?: string
  icon?: React.ReactNode
  background?: React.ReactNode
  href?: string
  colSpan?: 1 | 2 | 3
  rowSpan?: 1 | 2
  children?: React.ReactNode
}

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(300px,auto)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

BentoGrid.displayName = "BentoGrid"

const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
  ({
    className,
    title,
    description,
    icon,
    background,
    colSpan = 1,
    rowSpan = 1,
    children,
    ...props
  }, ref) => {
    const colSpanClasses = {
      1: "md:col-span-1",
      2: "md:col-span-2",
      3: "md:col-span-3",
    }

    const rowSpanClasses = {
      1: "row-span-1",
      2: "row-span-2",
    }

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "group relative overflow-hidden rounded-3xl border border-border/50",
          "bg-gradient-to-br from-background via-background to-muted/20",
          "p-6 md:p-8",
          "hover:border-border",
          "hover:shadow-2xl hover:shadow-primary/5",
          "transition-all duration-500",
          colSpanClasses[colSpan],
          rowSpanClasses[rowSpan],
          className
        )}
        {...props}
      >
        {/* Background element (optional) */}
        {background && (
          <div className="absolute inset-0 -z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500">
            {background}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-5" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          {icon && (
            <div className="mb-4 p-3 rounded-2xl bg-primary/10 w-fit group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
              {icon}
            </div>
          )}

          {title && (
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
          )}

          {description && (
            <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
              {description}
            </p>
          )}

          {children && (
            <div className="mt-auto">
              {children}
            </div>
          )}
        </div>

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-[1px] rounded-3xl bg-background" />
        </div>
      </motion.div>
    )
  }
)

BentoCard.displayName = "BentoCard"

export { BentoGrid, BentoCard }
