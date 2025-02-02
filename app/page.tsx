"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import CheckboxGroup from "@/components/ui/checkbox-group"
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
    const matchesModel = selectedModels.length === 0 || selectedModels.includes(prompt.model)
    const matchesSearch = searchQuery === "" || prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesModel && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-[#00F3FF]">AI Debugging Prompts</h1>

        <div className="flex items-center gap-4">
          <Select
            value={selectedModels.join(",")}
            onValueChange={(value) => setSelectedModels(value ? (value.split(",") as AIModel[]) : [])}
          >
            <SelectTrigger className="w-full lg:w-[200px] bg-black/50 border-[#00F3FF]/50 text-[#00F3FF]">
              <SelectValue placeholder="Filter by Model" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900">
              <CheckboxGroup value={selectedModels} onValueChange={(value) => setSelectedModels(value as AIModel[])}>
                {models.map((model) => (
                  <div key={model} className="flex items-center space-x-2 p-2">
                    <Checkbox id={model} value={model} />
                    <label htmlFor={model} className="text-sm text-gray-200">
                      {model}
                    </label>
                  </div>
                ))}
              </CheckboxGroup>
            </SelectContent>
          </Select>
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

