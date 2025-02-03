"use client"

import { useEffect } from "react"
import ads from "@/data/ads.json"
import { toast } from "sonner"

export default function AdToast() {
  useEffect(() => {
    const showAd = () => {
      const randomAd = ads[Math.floor(Math.random() * ads.length)]
      toast(
        <a
          href={randomAd.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          onClick={(e) => e.stopPropagation()} // Prevent toast from closing when clicking the link
        >
          <img src={randomAd.logo || "/placeholder.svg"} alt="" className="w-10 h-10" />
          <div>
            <h3 className="font-bold">{randomAd.title}</h3>
            <p className="text-sm">{randomAd.text}</p>
          </div>
        </a>,
        {
          duration: 5000,
          position: "bottom-right",
        },
      )
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      if (scrollPercentage > 65) {
        // Remove the scroll listener to prevent multiple triggers
        window.removeEventListener("scroll", handleScroll)
        // Add a 2-second delay before showing the ad
        setTimeout(showAd, 2000)
      }
    }

    // Add a 5-second delay before adding the scroll listener
    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll)
    }, 5000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}

