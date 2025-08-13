"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function ContactPage() {
  useEffect(() => {
    // Dark mode functionality
    const modeToggle = document.getElementById("mode-toggle")
    if (modeToggle) {
      modeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode").toString())
      })
    }

    // Load saved dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode")
    }

    return () => {
      if (modeToggle) {
        modeToggle.removeEventListener("click", () => {})
      }
    }
  }, [])

  return (
    <>
      <link rel="stylesheet" href="/style.css" />
      <div className="page-container">
        <div className="main-content">
          <header className="site-header">
            <h1>My Stories & Poems</h1>
            <button id="mode-toggle" className="toggle-button" aria-label="Toggle dark mode">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 2.25A9.75 9.75 0 0 1 21.75 12c0 .4-.02.8-.07 1.19A8.25 8.25 0 1 1 12 3.76V2.25z" />
              </svg>
            </button>
          </header>

          <ul className="navbar">
            <li>
              <Link href="/home">HOME</Link>
            </li>
            <li>
              <Link href="/">BLOG</Link>
            </li>
            <li>
              <Link href="/about">ABOUT</Link>
            </li>
            <li>
              <Link href="/contact" className="active">
                CONTACT
              </Link>
            </li>
          </ul>

          <main className="content-container">
            <div className="story-entry">
              <img
                src="https://images.unsplash.com/uploads/1413222992504f1b734a6/1928e537?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Contact image"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "2rem",
                }}
              />
              <center>
                <h1 style={{ fontSize: "3rem", margin: "2rem 0", color: "var(--text-color)" }}>CONTACT</h1>
              </center>
              <div style={{ textAlign: "center", maxWidth: "500px", margin: "0 auto" }}>
                <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", margin: "2rem 0", lineHeight: "1.6" }}>
                  I'd love to hear from you! Whether you have feedback on my stories, want to collaborate, or just want
                  to say hello.
                </p>
                <div style={{ margin: "2rem 0" }}>
                  <p style={{ fontSize: "1.1rem", color: "var(--text-color)", margin: "1rem 0" }}>
                    <strong>Email:</strong>{" "}
                    <a href="mailto:hello@example.com" style={{ color: "var(--accent-color)" }}>
                      hello@example.com
                    </a>
                  </p>
                  <p style={{ fontSize: "1.1rem", color: "var(--text-color)", margin: "1rem 0" }}>
                    <strong>Follow me:</strong>{" "}
                    <a href="#" style={{ color: "var(--accent-color)" }}>
                      @mystoriesandpoems
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <footer className="site-footer">
        <p>&copy; 2025 by [Your Name].</p>
      </footer>
    </>
  )
}
