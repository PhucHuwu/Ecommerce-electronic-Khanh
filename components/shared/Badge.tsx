import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "hot" | "sale" | "new"
  className?: string
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    hot: "bg-red-600 text-white",
    sale: "bg-orange-500 text-white",
    new: "bg-blue-600 text-white",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
