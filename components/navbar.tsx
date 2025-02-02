"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Menu, X, Search } from "lucide-react"

const GITHUB_REPO_URL = "https://github.com/yourusername/debugprompt"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/?search=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A] border-b border-[#00F3FF]/20 py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold text-[#00F3FF]">
            DebugPrompt
          </Link>
          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <Input
              type="search"
              placeholder="▍> Search debugging prompts..."
              className="w-64 bg-black/50 border-[#00F3FF]/50 text-[#00F3FF] pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" className="absolute right-0 top-0 bottom-0">
              <Search className="h-4 w-4 text-[#00F3FF]" />
            </Button>
          </form>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#00F3FF]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavItems />
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0A0A0A] border-b border-[#00F3FF]/20 p-4">
          <form onSubmit={handleSearch} className="mb-4 flex items-center relative">
            <Input
              type="search"
              placeholder="▍> Search debugging prompts..."
              className="w-full bg-black/50 border-[#00F3FF]/50 text-[#00F3FF] pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" variant="ghost" className="absolute right-0 top-0 bottom-0">
              <Search className="h-4 w-4 text-[#00F3FF]" />
            </Button>
          </form>
          <NavItems mobile setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
    </nav>
  )
}

function NavItems({ mobile = false, setIsMenuOpen = () => {} }) {
  const handleItemClick = () => {
    if (mobile) {
      setIsMenuOpen(false)
    }
  }

  return (
    <div className={mobile ? "flex flex-col space-y-4" : "flex items-center gap-6"}>
      <Link href="/learn" className="text-[#00F3FF] hover:text-[#00F3FF]/80" onClick={handleItemClick}>
        Learn
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link" className="text-[#00F3FF] hover:text-[#00F3FF]/80 p-0" onClick={handleItemClick}>
            About
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#00F3FF]">About DebugPrompt</DialogTitle>
            <DialogDescription className="text-gray-300">
              DebugPrompt is an open-source hub where developers collaborate to master AI-powered debugging through precision prompt engineering. In an era where generative AI transforms how we code, a well-crafted prompt can mean the difference between hours of frustration and a swift, accurate solution.
              <br /><br />
              This platform addresses a critical gap in generative AI driven development: structured strategies to diagnose, analyze, and resolve coding issues efficiently using AI.<br/><br/>
              DebugPrompt focuses on curating battle-tested prompts that:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Isolate root causes systematically</li>
                <li>Generate actionable debugging steps</li>
                <li>Prevent repetitive solution loops</li>
                <li>Adapt to evolving codebases and AI models</li>
              </ul>
              <br />
              This tool was built by <a href="https://x.com/richardsondx" target="_blank" rel="noopener noreferrer" className="text-[#00F3FF] hover:text-[#00F3FF]/80">@Richardsondx</a> and maintained by contributors. You can submit a contribution on github.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="border-[#00F3FF] text-[#00F3FF] hover:bg-[#00F3FF] hover:text-black"
            onClick={handleItemClick}
          >
            Submit Prompt
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#00F3FF]">Submit a Prompt</DialogTitle>
            <DialogDescription>To submit a prompt, you need to create a pull request on GitHub.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-4">Follow these steps:</p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Fork the DebugPrompt repository</li>
              <li>Create a new file in the `prompts` directory</li>
              <li>Add your prompt using the provided template</li>
              <li>Create a pull request with your changes</li>
            </ol>
          </div>
          <Button
            className="w-full bg-[#00F3FF] text-black hover:bg-[#00F3FF]/80"
            onClick={() => window.open(GITHUB_REPO_URL, "_blank")}
          >
            Fork the GitHub Project
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

