import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "vietnamese"] })

export const metadata: Metadata = {
  title: "GEARVN - Mua sắm PC, Laptop, Gaming Gear chính hãng",
  description:
    "GEARVN - Cửa hàng máy tính, laptop gaming, PC gaming, linh kiện máy tính, phụ kiện gaming gear chính hãng, giá tốt nhất. Trả góp 0%, giao hàng toàn quốc.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
