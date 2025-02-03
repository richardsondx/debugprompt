import { notFound } from "next/navigation"
import TrendingPrompts from "@/components/trending-prompts"
import prompts from "@/data/prompts.json"

interface SearchPageProps {
  searchParams: { q: string }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await Promise.resolve(searchParams)

  if (!q) {
    notFound()
  }

  const searchResults = prompts.filter(
    (prompt) =>
      prompt.prompt.toLowerCase().includes(q.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#00F3FF] mb-8">
        Search Results for &quot;{q}&quot;
      </h1>
      {searchResults.length > 0 ? (
        <TrendingPrompts prompts={searchResults} />
      ) : (
        <p className="text-gray-400">No results found for your search query.</p>
      )}
    </div>
  )
}
