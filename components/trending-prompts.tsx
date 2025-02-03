import PromptCard from "./prompt-card"

interface Prompt {
  id: string
  category: string
  tags: string[]
  prompt: string
  upvotes: number
  author: {
    name: string
    avatar: string
    github: string
  }
}

interface TrendingPromptsProps {
  prompts: Prompt[]
}

export default function TrendingPrompts({ prompts }: TrendingPromptsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Trending Prompts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  )
}

