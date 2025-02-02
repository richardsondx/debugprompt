"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)
    // Reset the input
    setEmail("")
    // You might want to show a success message to the user
  }

  return (
    <section className="bg-gray-900 py-12 mt-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#00F3FF] mb-4">Subscribe for Weekly Drops</h2>
        <p className="text-gray-400 mb-6">
          Get the latest debugging prompts delivered straight to your inbox every week.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-black/50 border-[#00F3FF]/50 text-[#00F3FF] flex-grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="bg-[#00F3FF] text-black hover:bg-[#00F3FF]/80">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}

