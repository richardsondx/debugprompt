'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setResult(null)
    setCopied(false)

    const formData = new FormData(e.currentTarget)
    const prompt = formData.get('prompt')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate response')
      }

      const data = await response.json()
      setResult(data.content)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-4xl font-bold text-center text-[#00F3FF] mb-12">
        Generate Debug Prompt from Your Issues
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
        <Textarea
          name="prompt"
          placeholder="Paste your error here or start typing..."
          className="min-h-[200px] bg-black/50 border-[#00F3FF]/50 text-[#00F3FF]"
          required
        />
        <Button 
          type="submit"
          className="w-full bg-[#00F3FF] text-black hover:bg-[#00F3FF]/80"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </form>

      {error && (
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500">
          {error}
        </div>
      )}

      {result && (
        <div className="max-w-3xl mx-auto mt-8">
          <div className="relative group">
            <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "relative h-8 w-8 border border-[#00F3FF]/20 bg-black/50",
                  copied && "border-green-500"
                )}
                onClick={copyToClipboard}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-[#00F3FF]" />
                )}
              </Button>
            </div>
            <div 
              className="p-4 bg-black/50 border border-[#00F3FF]/50 rounded-lg cursor-pointer"
              onClick={copyToClipboard}
            >
              <h2 className="text-xl font-semibold text-[#00F3FF] mb-4">Generated Debug Strategy:</h2>
              <div className="text-white whitespace-pre-wrap">
                {result}
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-pink-500 mb-2 animate-shimmer">Built by @Richardsondx</p>
            <Button className="bg-black text-white" onClick={() => window.open("https://www.x.com/richardsondx", "_blank")}>
              Follow me on X
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 