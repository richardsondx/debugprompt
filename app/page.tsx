"use client"

import { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import PromptCard from "@/components/prompt-card"
import prompts from "@/data/prompts.json"
import type { Prompt } from "@/types/prompt"

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function HomeContent() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category") || null)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [shuffledPrompts, setShuffledPrompts] = useState<Prompt[]>([])

  useEffect(() => {
    const handleCategorySelected = (event: CustomEvent) => {
      setSelectedCategory(event.detail)
    }

    window.addEventListener("categorySelected", handleCategorySelected as EventListener)

    return () => {
      window.removeEventListener("categorySelected", handleCategorySelected as EventListener)
    }
  }, [])

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "")
  }, [searchParams])

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesCategory = !selectedCategory || prompt.category === selectedCategory
      const matchesSearch = searchQuery === "" || prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Update shuffled prompts whenever filteredPrompts changes
  useEffect(() => {
    setShuffledPrompts(shuffleArray(filteredPrompts))
  }, [filteredPrompts])

  return (
    <div className="space-y-6">
      {searchQuery && <p className="text-[#00F3FF]">Search results for: &quot;{searchQuery}&quot;</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shuffledPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {shuffledPrompts.length === 0 && (
        <p className="text-center text-gray-400">No prompts found matching your criteria.</p>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-[#00F3FF]/10 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-[#00F3FF]/10 rounded"></div>
          ))}
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
