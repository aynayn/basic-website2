"use client"

import { useEffect } from "react"

export default function MainPage() {
  useEffect(() => {
    window.location.href = "/home"
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
        color: "#666",
      }}
    >
      Redirecting to home page...
    </div>
  )
}
