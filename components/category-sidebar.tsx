"use client"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CategorySidebarProps {
  categories: string[]
  counts: Record<string, number>
}

export default function CategorySidebar({ categories, counts }: CategorySidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category)
    if (isHomePage) {
      window.dispatchEvent(new CustomEvent("categorySelected", { detail: category }))
    } else {
      router.push(`/?category=${encodeURIComponent(category || "")}`)
    }
    setIsOpen(false)
  }

  const isActiveCategory = (category: string | null) => {
    return category === selectedCategory
  }

  return (
    <div className="w-full lg:w-64 bg-gray-900">
      <Button
        variant="ghost"
        className="flex justify-between items-center w-full p-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-[#00F3FF]">
          {selectedCategory || "Categories"}
        </span>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>
      <div className={`space-y-2 p-4 ${isOpen ? "block" : "hidden lg:block"}`}>
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            isActiveCategory(null)
              ? 'text-[#00F3FF] bg-[#00F3FF]/10'
              : 'text-gray-400 hover:text-[#00F3FF] hover:bg-[#00F3FF]/10'
          }`}
          onClick={() => handleCategoryClick(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            className={`w-full justify-start ${
              isActiveCategory(category)
                ? 'text-[#00F3FF] bg-[#00F3FF]/10'
                : 'text-gray-400 hover:text-[#00F3FF] hover:bg-[#00F3FF]/10'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            <span className="ml-auto text-xs opacity-70">({counts[category] || 0})</span>
          </Button>
        ))}
      </div>
    </div>
  )
}

