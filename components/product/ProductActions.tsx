"use client"

import { Heart } from "lucide-react"
import { useState, useEffect } from "react"

interface ProductActionsProps {
  productId: string
}

export function ProductActions({ productId }: ProductActionsProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(productId))
  }, [productId])

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    let newFavorites

    if (favorites.includes(productId)) {
      newFavorites = favorites.filter((id: string) => id !== productId)
      setIsFavorite(false)
    } else {
      newFavorites = [...favorites, productId]
      setIsFavorite(true)
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    window.dispatchEvent(new Event("favoritesChanged"))
  }

  return (
    <div className="space-y-4">
      {/* Action Button */}
      <div className="space-y-3">
        <button
          onClick={toggleFavorite}
          className={`w-full border-2 py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-3 transition-colors ${
            isFavorite
              ? "border-red-600 bg-red-50 text-red-600"
              : "border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-600" : ""}`} />
          {isFavorite ? "Đã thêm vào yêu thích" : "Thêm vào yêu thích"}
        </button>
      </div>

      {/* Additional Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
        <p className="font-semibold text-blue-900">🎁 Ưu đãi đặc biệt</p>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Trả góp 0% lãi suất</li>
          <li>• Tặng balo gaming trị giá 500.000đ</li>
          <li>• Miễn phí cài đặt và bảo hành tại nhà</li>
        </ul>
      </div>
    </div>
  )
}
