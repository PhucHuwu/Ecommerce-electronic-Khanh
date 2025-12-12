import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface RatingStarsProps {
  rating: number
  reviewCount?: number
  size?: "sm" | "md" | "lg"
  showCount?: boolean
}

export function RatingStars({ rating, reviewCount, size = "sm", showCount = true }: RatingStarsProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizes[size],
              star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
            )}
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-gray-600">({reviewCount} đánh giá)</span>
      )}
    </div>
  )
}
