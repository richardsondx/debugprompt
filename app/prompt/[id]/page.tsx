"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Link from "next/link"
import { Copy, LinkIcon } from "lucide-react"
import { toast } from "sonner"
import prompts from "@/data/prompts.json"

function getGithubUsername(githubUrl: string): string {
  return githubUrl.replace(/\/$/, '').split('/').pop() || ''
}

function getGithubAvatar(githubUrl: string): string {
  const username = getGithubUsername(githubUrl)
  return username ? `https://github.com/${username}.png` : ''
}

export default function PromptPage() {
  const params = useParams()
  const [prompt, setPrompt] = useState<any>(null)

  useEffect(() => {
    const foundPrompt = prompts.find((p) => p.id === params.id)
    setPrompt(foundPrompt)
  }, [params.id])

  if (!prompt) {
    return <div>Loading...</div>
  }

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt.prompt)
    toast.success("Prompt copied to clipboard")
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("URL copied to clipboard")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="bg-black/50 border-[#00F3FF]/20">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 relative pb-2">
          <Link href={prompt.author.github} target="_blank" rel="noopener noreferrer">
            <img
              src={getGithubAvatar(prompt.author.github) || "/placeholder.svg"}
              alt=""
              className="w-10 h-10 rounded-full hover:ring-2 hover:ring-[#00F3FF]"
            />
          </Link>
          <div className="flex items-center space-x-2 absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00F3FF] hover:bg-[#00F3FF]/10"
              onClick={handleCopyUrl}
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-[#00F3FF] hover:bg-[#00F3FF]/10"
              onClick={handleCopyPrompt}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-8 pt-6">
          <div>
            <h1 className="text-3xl font-bold text-[#00F3FF] mb-2">{prompt.category}</h1>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="bg-[#00F3FF]/5 text-[#00F3FF]/70">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative group">
            <p className="text-xl text-gray-200 leading-relaxed whitespace-pre-wrap px-4">{prompt.prompt}</p>
          </div>
          <div className="flex justify-end">
            <Badge variant="outline" className="border-[#00F3FF]/20 text-[#00F3FF]/70">
              {prompt.model}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

