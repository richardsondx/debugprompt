"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"
import type { Prompt } from "@/types/prompt"
import Image from "next/image"

function getGithubUsername(githubUrl: string): string {
  return githubUrl.trim().replace(/\/$/, '').split('/').pop() || ''
}

function getGithubAvatar(githubUrl: string): string {
  const username = getGithubUsername(githubUrl)
  return username ? `https://github.com/${username}.png` : ''
}

interface PromptCardProps {
  prompt: Prompt
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/prompt/${prompt.id}`)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card
        className="bg-black/50 border-[#00F3FF]/20 overflow-hidden relative cursor-pointer h-full flex flex-col"
        onClick={handleCardClick}
      >
        <CardContent className="flex flex-col justify-between h-full p-4">
          <div className="space-y-4 flex-grow">
            <p className="text-gray-200 text-sm lg:text-base line-clamp-6">{prompt.prompt}</p>
          </div>
          <div className="flex flex-wrap items-center justify-between pt-4 gap-2">
            <div className="flex flex-wrap gap-2">
              {prompt.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="bg-[#00F3FF]/5 text-[#00F3FF]/70 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href={prompt.author.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={getGithubAvatar(prompt.author.github) || "/placeholder.svg"}
                  alt="Author avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full hover:ring-2 hover:ring-[#00F3FF]"
                />
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

