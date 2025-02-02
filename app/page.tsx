"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import PromptCard from "@/components/prompt-card"
import prompts from "@/data/prompts.json"
import type { AIModel, Prompt } from "@/types/prompt"
import modelsList from "@/data/models.json"

const models: AIModel[] = modelsList

export default function Home() {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category") || null)
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([])
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")

  const toggleModel = (model: AIModel) => {
    setSelectedModels(prev => 
      prev.includes(model) 
        ? prev.filter(m => m !== model)
        : [...prev, model]
    )
  }

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

  const filteredPrompts = prompts.filter((prompt: Prompt) => {
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory
    const matchesModel = 
      selectedModels.length === 0 || 
      selectedModels.some(selected => 
        Array.isArray(prompt.model) 
          ? prompt.model.includes(selected) 
          : prompt.model === selected
      )
    const matchesSearch = searchQuery === "" || prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesModel && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-wrap gap-2 ml-auto">
          {models.map((model) => (
            <Button
              key={model}
              variant={selectedModels.includes(model) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleModel(model)}
              className={`
                ${selectedModels.includes(model) 
                  ? 'bg-[#00F3FF] text-black hover:bg-[#00F3FF]/80' 
                  : 'border-[#00F3FF]/20 text-[#00F3FF]/70 hover:bg-[#00F3FF]/10'
                }
              `}
            >
              {model}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedModels([])}
            className={`
              ${selectedModels.length === 0
                ? 'bg-[#00F3FF] text-black hover:bg-[#00F3FF]/80'
                : 'border-[#00F3FF]/20 text-[#00F3FF]/70 hover:bg-[#00F3FF]/10'
              }
            `}
          >
            All
          </Button>
        </div>
      </div>

      {searchQuery && <p className="text-[#00F3FF]">Search results for: &quot;{searchQuery}&quot;</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <p className="text-center text-gray-400">No prompts found matching your criteria.</p>
      )}
    </div>
  )
}

