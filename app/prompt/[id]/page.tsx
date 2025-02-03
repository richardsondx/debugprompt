"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import type { Prompt } from "@/types/prompt"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { LinkIcon } from "lucide-react"
import { Copy } from "lucide-react"
import { toast } from "sonner"
import prompts from "@/data/prompts.json"
import Image from 'next/image'

export default function PromptPage() {
  const params = useParams()
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [copyCount, setCopyCount] = useState(0)

  useEffect(() => {
    const foundPrompt = prompts.find((p) => p.id === params.id)
    setPrompt(foundPrompt || null)

    if (foundPrompt) {
      const fetchCopyCount = async () => {
        try {
          const response = await fetch(`/api/prompts/${foundPrompt.id}/copy`)
          const data = await response.json()
          setCopyCount(data.count)
        } catch (error) {
          console.error('Failed to fetch copy count:', error)
        }
      }
      fetchCopyCount()
    }
  }, [params.id])

  if (!prompt) {
    return <div>Loading...</div>
  }

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt)
      const response = await fetch(`/api/prompts/${prompt.id}/copy`, {
        method: 'POST',
      })
      const data = await response.json()
      setCopyCount(data.count)
      toast.success("Prompt copied to clipboard")
    } catch (error) {
      console.error('Failed to increment copy count:', error)
      toast.error("Failed to copy prompt")
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success("URL copied to clipboard")
  }

  const getGithubUsername = (githubUrl: string): string => {
    return githubUrl.replace(/\/$/, '').split('/').pop() || ''
  }

  const getGithubAvatar = (githubUrl: string): string => {
    const username = getGithubUsername(githubUrl)
    return username ? `https://github.com/${username}.png` : ''
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="bg-black/50 border-[#00F3FF]/20">
        <CardContent className="space-y-8 pt-6">
          <div>
            <h1 className="text-m font-bold text-[#00F3FF] mb-2">{prompt.category}</h1>
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary" className="bg-[#00F3FF]/5 text-[#00F3FF]/70">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div 
              onClick={handleCopyPrompt}
              className="cursor-pointer p-4 rounded-lg hover:bg-[#00F3FF]/5 transition-colors w-full"
            >
              <p className="text-xl text-gray-200 leading-relaxed whitespace-pre-wrap">
                {prompt.prompt}
              </p>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#00F3FF]/70 flex items-center gap-2">
                <span className="text-xs">Click to copy</span>
                <Copy className="h-4 w-4" />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-start justify-between space-y-0 relative">
            <div className="flex items-center">
              <Link 
                href={prompt.author.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center hover:opacity-80"
              >
                <Image
                  src={getGithubAvatar(prompt.author.github) || "/placeholder.svg"}
                  alt=""
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full hover:ring-2 hover:ring-[#00F3FF]"
                />
                <span className="text-xs text-[#00F3FF]/70 ml-2">
                  @{getGithubUsername(prompt.author.github)}
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-[#00F3FF] hover:bg-[#00F3FF]/10"
                onClick={handleCopyUrl}
              >
                <LinkIcon className="h-4 w-4" />
              </Button>
              <div className="text-xs text-[#00F3FF]/70">
                {copyCount} {copyCount === 1 ? 'copy' : 'copies'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
