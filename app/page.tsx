"use client"

import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    window.location.href = "/home.html"
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to home page...</p>
    </div>
  )
}
