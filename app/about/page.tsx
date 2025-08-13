export default function About() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>About - My Stories & Poems</title>
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
                <a href="/about" className="active">
                  ABOUT
                </a>
              </li>
              <li>
                <a href="/contact">CONTACT</a>
              </li>
            </ul>
          </nav>

          <main className="main-content">
            <div className="hero-section">
              <img src="/placeholder-uesd5.png" alt="About Us - Serene mountain landscape" className="hero-image" />
              <div className="hero-content">
                <h2>About Our Collection</h2>
                <p>
                  Dive into a world where words paint vivid landscapes of emotion and imagination. Our collection
                  features carefully curated stories and poems that explore the depths of human experience, from
                  whispered secrets in ancient woods to the thunderous echoes of untold adventures.
                </p>
                <p>
                  Each piece is crafted with love and attention to detail, designed to transport you to different worlds
                  and touch your heart in unexpected ways.
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
