"use client"

import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    // Redirect to the HTML version of the site
    window.location.href = "/index.html"
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        <p>Redirecting to your website...</p>
      </div>
    </div>
  )
}
