import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Navbar from "@/components/navbar"
import CategorySidebar from "@/components/category-sidebar"
import AdToast from "@/components/ad-toast"
import GoogleAnalytics from "@/components/google-analytics"
import categories from "@/data/categories.json"
import prompts from "@/data/prompts.json"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DebugPrompt",
  description: "AI Debugging Prompts for Modern Devs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const categoryCounts = categories.reduce(
    (acc, category) => {
      acc[category] = prompts.filter((p) => p.category === category).length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={`${inter.className} bg-[#0A0A0A] text-white min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="flex flex-1 flex-col lg:flex-row pt-16">
            <CategorySidebar categories={categories} counts={categoryCounts} />
            <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
          </div>
          <Toaster />
          <AdToast />
        </ThemeProvider>
      </body>
    </html>
  )
}
