import Link from "next/link"
import Image from "next/image"
import { getCategories } from "@/lib/api"

export async function CategoryGrid() {
  const categories = await getCategories()
  
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-3">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl hover:shadow-lg hover:border-red-500 transition-all duration-300"
        >
          <div className="relative w-20 h-20">
            <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-contain" />
          </div>
          <span className="text-xs md:text-sm font-medium text-center text-gray-800">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}
