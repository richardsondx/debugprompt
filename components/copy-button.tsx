"use client"

import { useState, useEffect } from "react"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface CopyButtonProps {
  promptId: string
  prompt: string
  initialCount?: number
  className?: string
}

export function CopyButton({ promptId, prompt, initialCount = 0, className }: CopyButtonProps) {
  const [copyCount, setCopyCount] = useState(initialCount)

  useEffect(() => {
    fetch(`/api/prompts/${promptId}/copy`)
      .then(res => res.json())
      .then(data => setCopyCount(data.count))
      .catch(console.error)
  }, [promptId])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      const res = await fetch(`/api/prompts/${promptId}/copy`, { method: 'POST' })
      const data = await res.json()
      setCopyCount(data.count)
      toast.success("Prompt copied to clipboard")
    } catch (error: unknown) {
      console.error('Failed to copy prompt:', error)
      toast.error("Failed to copy prompt")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className={className}
        onClick={handleCopy}
      >
        <Copy className="h-4 w-4" />
      </Button>
      <span className="text-xs text-[#00F3FF]/70">{copyCount}</span>
    </div>
  )
} 