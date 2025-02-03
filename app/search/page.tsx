import { notFound } from "next/navigation"
import TrendingPrompts from "@/components/trending-prompts"
import prompts from "@/data/prompts.json"

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q

  if (!query) {
    notFound()
  }

  const searchResults = prompts.filter(
    (prompt) =>
      // prompt.title.toLowerCase().includes(query.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(query.toLowerCase()) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#00F3FF] mb-8">Search Results for &quot;{query}&quot;</h1>
      {searchResults.length > 0 ? (
        <TrendingPrompts prompts={searchResults} />
      ) : (
        <p className="text-gray-400">No results found for your search query.</p>
      )}
    </div>
  )
}

