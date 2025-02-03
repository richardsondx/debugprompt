import { notFound } from "next/navigation"
import TrendingPrompts from "@/components/trending-prompts"
import prompts from "@/data/prompts.json"

interface RawPrompt {
  id: string;
  category: string;
  tags: string[];
  prompt: string;
  moel?: string[];
  upvotes?: number;
  author: {
    github: string;
    name?: string;
    avatar?: string;
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  // Await the Promise for search parameters
  const params = await searchParams
  const q = params.q

  // If q is not provided, trigger Next.js notFound
  if (!q) {
    notFound()
  }

  // Perform search on prompts
  const searchResults = prompts.filter((prompt: RawPrompt) =>
    prompt.prompt.toLowerCase().includes(q.toLowerCase()) ||
    prompt.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()))
  )

  // Map the filtered results to conform to the Prompt type
  const validatedResults = searchResults.map((prompt: RawPrompt) => ({
    ...prompt,
    upvotes: prompt.upvotes ?? 0, // default upvotes
    author: {
      github: prompt.author.github,
      name: prompt.author.name ?? "Unknown", // default name
      avatar: prompt.author.avatar ?? "" // default avatar
    }
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Results for &quot;{q}&quot;</h1>
      {validatedResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TrendingPrompts prompts={validatedResults} />
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  )
}
