export default function Contact() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Contact - My Stories & Poems</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div className="container">
          <header>
            <h1>My Stories & Poems</h1>
            <button id="dark-mode-toggle">🌙</button>
          </header>

          <nav className="navbar">
            <ul>
              <li>
                <a href="/">HOME</a>
              </li>
              <li>
                <a href="/index.html">BLOG</a>
              </li>
              <li>
                <a href="/about">ABOUT</a>
              </li>
              <li>
                <a href="/contact" className="active">
                  CONTACT
                </a>
              </li>
            </ul>
          </nav>

          <main className="main-content">
            <div className="hero-section">
              <img
                src="/vintage-writing-desk.png"
                alt="Contact Us - Writing desk with typewriter"
                className="hero-image"
              />
              <div className="hero-content">
                <h2>Get In Touch</h2>
                <p>
                  We'd love to hear from you! Whether you have questions about our stories and poems, want to share your
                  thoughts, or are interested in collaborating, don't hesitate to reach out.
                </p>
                <div className="contact-info">
                  <p>
                    <strong>Email:</strong> stories@example.com
                  </p>
                  <p>
                    <strong>Follow us:</strong> @mystoriesandpoems
                  </p>
                </div>
                <p>
                  Your feedback and connection mean the world to us. Every story shared and every poem read creates a
                  bridge between hearts and minds.
                </p>
              </div>
            </div>
          </main>

          <footer>
            <p>&copy; 2025 by [Your Name].</p>
          </footer>
        </div>

        <script src="/main.js"></script>
      </body>
    </html>
  )
}
