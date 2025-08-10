document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const modeToggle = document.getElementById("mode-toggle")
  const sidebarCloseButton = document.getElementById("sidebar-close-button")
  const body = document.body
  const sidebarLinks = document.querySelectorAll(".sidebar-list a")
  const prevButton = document.getElementById("prev-button")
  const nextButton = document.getElementById("next-button")
  const searchInput = document.getElementById("sidebar-search")

  // Dynamically generate postData from the sidebar links
  const postData = Array.from(sidebarLinks).map((link, index) => ({
    index: index,
    title: link.textContent,
    filename: link.getAttribute("data-filename"),
  }))

  let currentIndex = 0
  let postTemplate = "" // Cache the template to avoid re-fetching

  // Function to fetch the post template
  async function loadPostTemplate() {
    if (postTemplate) {
      return postTemplate
    }
    try {
      const response = await fetch("post-template.html") // Path corrected to root
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      postTemplate = await response.text()
      return postTemplate
    } catch (error) {
      console.error("Could not load post template:", error)
      // Return a fallback template in case of an error
      return '<div class="story-entry"><p>Error loading post content.</p></div>'
    }
  }

  // Function to display a specific post
  async function showPost(index) {
    if (index >= 0 && index < postData.length) {
      const post = postData[index]

      // Fetch the template and the post content concurrently
      try {
        const [template, postContent] = await Promise.all([
          loadPostTemplate(),
          fetch(`posts/${post.filename}`).then((res) => {
            // Path corrected to root
            if (!res.ok) throw new Error(`Post not found: posts/${post.filename}`)
            return res.text()
          }),
        ])

        const newPostHtml = template
          .replace("{postIndex}", index)
          .replace("{postTitle}", post.title)
          .replace("{postDate}", new Date().toDateString()) // Dynamically generate date for now
          .replace("{postContent}", postContent)

        const postContainer = document.getElementById("post-container")
        if (postContainer) {
          const oldPost = postContainer.querySelector(".story-entry")
          if (oldPost) {
            oldPost.classList.remove("active")
          }

          postContainer.innerHTML = newPostHtml

          setTimeout(() => {
            const newPost = postContainer.querySelector(".story-entry")
            if (newPost) {
              newPost.classList.add("active")
            }
          }, 10)
        }

        currentIndex = index
        if (prevButton) prevButton.disabled = currentIndex === 0
        if (nextButton) nextButton.disabled = currentIndex === postData.length - 1

        window.scrollTo({ top: 0, behavior: "smooth" })
      } catch (error) {
        console.error("Error fetching post:", error)
        const postContainer = document.getElementById("post-container")
        if (postContainer) {
          postContainer.innerHTML = `<div class="story-entry"><p>Could not load post content. Error: ${error.message}</p></div>`
        }
      }
    }
  }

  const moonIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.25A9.75 9.75 0 0 1 21.75 12c0 .4-.02.8-.07 1.19A8.25 8.25 0 1 1 12 3.76V2.25z"/></svg>'
  const sunIcon =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0 0 18A9 9 0 0 0 12 3zM12 1a11 11 0 0 1 0 22c6.075 0 11-4.925 11-11a11 11 0 0 1-22 0C1 5.925 5.925 1 12 1zM12 5a7 7 0 0 1 0 14A7 7 0 0 1 12 5z"/></svg>'

  function setModeIcon() {
    if (modeToggle) {
      const isDarkMode = body.classList.contains("dark-mode")
      modeToggle.innerHTML = isDarkMode ? sunIcon : moonIcon
      modeToggle.setAttribute("aria-label", isDarkMode ? "Toggle light mode" : "Toggle dark mode")
    }
  }

  // Event listener for opening the sidebar
  if (menuToggle) {
    menuToggle.addEventListener("click", () => body.classList.add("sidebar-open"))
  }

  // Event listener for closing the sidebar via the close button
  if (sidebarCloseButton) {
    sidebarCloseButton.addEventListener("click", () => body.classList.remove("sidebar-open"))
  }

  // Event listener for toggling dark mode
  if (modeToggle) {
    modeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
      setModeIcon()
    })
  }

  // Event listener for sidebar search input
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase()
      sidebarLinks.forEach((link) => {
        const text = link.textContent.toLowerCase()
        const listItem = link.parentElement
        listItem.style.display = text.includes(query) ? "block" : "none"
      })
    })
  }

  // Event listeners for sidebar navigation links (closes sidebar on click)
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const index = postData.findIndex((post) => post.title === link.textContent)
      if (index !== -1) {
        showPost(index)
        body.classList.remove("sidebar-open") // Hide sidebar immediately on menu click
      }
    })
  })

  // Event listeners for pagination buttons (closes sidebar on click)
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showPost(currentIndex - 1)
      body.classList.remove("sidebar-open") // Hide sidebar on pagination click
    })
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showPost(currentIndex + 1)
      body.classList.remove("sidebar-open") // Hide sidebar on pagination click
    })
  }

  setModeIcon()
  // Load the first post by default
  if (postData.length > 0) {
    showPost(0)
  }
})
