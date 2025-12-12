"use client"

import type React from "react"

import Link from "next/link"
import { Search, User, Heart, Menu, ChevronDown } from "lucide-react"
import { Container } from "./Container"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [favoriteCount, setFavoriteCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const updateFavoriteCount = () => {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
      setFavoriteCount(favorites.length)
    }

    updateFavoriteCount()
    window.addEventListener("favoritesChanged", updateFavoriteCount)

    return () => window.removeEventListener("favoritesChanged", updateFavoriteCount)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const categories = [
    { name: "Laptop", href: "/category/laptop" },
    { name: "PC", href: "/category/pc" },
    { name: "Màn hình", href: "/category/monitor" },
    { name: "VGA", href: "/category/vga" },
    { name: "Bàn phím", href: "/category/keyboard" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-2">
        <Container>
          <p className="text-center text-sm font-medium">
            🎉 MUA PC TẶNG MÀN HÌNH 240Hz - GIẢM ĐẾN 2% KHI MUA HÀNG ONLINE
          </p>
        </Container>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <Container>
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                GEARVN
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <Menu className="w-6 h-6" />
              </button>

              {/* Desktop Icons */}
              <div className="hidden md:flex items-center gap-4">
                <Link href="/account" className="flex flex-col items-center gap-1 hover:text-red-600 transition-colors">
                  <User className="w-6 h-6" />
                  <span className="text-xs">Tài khoản</span>
                </Link>
                <Link
                  href="/wishlist"
                  className="flex flex-col items-center gap-1 hover:text-red-600 transition-colors relative"
                >
                  <Heart className="w-6 h-6" />
                  <span className="text-xs">Yêu thích</span>
                  {favoriteCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                      {favoriteCount > 9 ? "9+" : favoriteCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <form onSubmit={handleSearch} className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-red-600 text-white p-2 rounded-md"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </Container>
      </div>

      {/* Navigation */}
      <div className="bg-gray-50">
        <Container>
          <nav className="hidden md:flex items-center gap-6 py-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center gap-1 text-sm font-medium hover:text-red-600 transition-colors"
              >
                {category.name}
                <ChevronDown className="w-4 h-4" />
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Container>
            <nav className="py-4 space-y-3">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="block py-2 text-sm font-medium hover:text-red-600 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
