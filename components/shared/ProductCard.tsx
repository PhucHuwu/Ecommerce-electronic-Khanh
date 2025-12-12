"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Gift, Heart } from "lucide-react"
import type { Product } from "@/lib/types"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import { RatingStars } from "./RatingStars"
import { Badge } from "./Badge"
import { useState, useEffect } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = calculateDiscount(product.originalPrice, product.price)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    setIsFavorite(favorites.includes(product.id))
  }, [product.id])

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
    let newFavorites

    if (favorites.includes(product.id)) {
      newFavorites = favorites.filter((id: string) => id !== product.id)
      setIsFavorite(false)
    } else {
      newFavorites = [...favorites, product.id]
      setIsFavorite(true)
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites))
    window.dispatchEvent(new Event("favoritesChanged"))
  }

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.mainImage || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.badge && (
              <Badge variant="hot" className="shadow-lg">
                {product.badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge variant="sale" className="shadow-lg">
                -{discount}%
              </Badge>
            )}
          </div>

          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-600 text-red-600" : "text-gray-400"}`} />
          </button>

          {/* Gift Icon */}
          {product.badge === "Quà tặng HOT" && (
            <div className="absolute bottom-2 right-2">
              <Gift className="w-6 h-6 text-red-600" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Product Name */}
          <h3 className="font-medium text-sm line-clamp-2 min-h-[40px] text-gray-900">{product.name}</h3>

          {/* Specs Preview */}
          <div className="flex flex-wrap gap-1 text-xs text-gray-600">
            {product.specs.cpu && (
              <span className="bg-gray-100 px-2 py-0.5 rounded">
                {product.specs.cpu.split(" ").slice(0, 3).join(" ")}
              </span>
            )}
            {product.specs.gpu && (
              <span className="bg-gray-100 px-2 py-0.5 rounded">
                {product.specs.gpu.split(" ").slice(0, 2).join(" ")}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="space-y-1">
            {product.originalPrice > product.price && (
              <p className="text-sm text-gray-400 line-through">{formatPrice(product.originalPrice)}</p>
            )}
            <p className="text-xl font-bold text-red-600">{formatPrice(product.price)}</p>
          </div>

          {/* Rating */}
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>
      </div>
    </Link>
  )
}
