document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const modeToggle = document.getElementById("mode-toggle")
  const sidebarCloseButton = document.getElementById("sidebar-close-button")
  const body = document.body
  const sidebarLinks = document.querySelectorAll(".sidebar-list a")
  const navbarLinks = document.querySelectorAll(".navbar a")
  const prevButton = document.getElementById("prev-button")
  const nextButton = document.getElementById("next-button")
  const searchInput = document.getElementById("sidebar-search")

  // Function to create URL-safe slug from filename
  function createSlug(filename) {
    return filename
      .replace(".html", "")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-") // Replace non-alphanumeric chars with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
      .replace(/^-|-$/g, "") // Remove leading/trailing hyphens
  }

  // Dynamically generate postData from the sidebar links
  const postData = Array.from(sidebarLinks).map((link, index) => {
    const filename = link.getAttribute("data-filename")
    return {
      index: index,
      title: link.textContent,
      filename: filename,
      slug: createSlug(filename),
    }
  })

  let currentIndex = 0
  let postTemplate = "" // Cache the template to avoid re-fetching

  // Function to share post
  function sharePost() {
    const currentUrl = window.location.href
    const postTitle = document.querySelector(".story-entry h2")?.textContent || "My Stories & Poems"

    if (navigator.share) {
      // Use native sharing if available (mobile devices)
      navigator
        .share({
          title: postTitle,
          url: currentUrl,
        })
        .catch(console.error)
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          // Show temporary feedback
          const shareButton = document.querySelector(".share-button")
          if (shareButton) {
            const originalHTML = shareButton.innerHTML
            shareButton.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!'
            setTimeout(() => {
              shareButton.innerHTML = originalHTML
            }, 2000)
          }
        })
        .catch(() => {
          // Fallback for older browsers
          alert("Copy this link to share: " + currentUrl)
        })
    }
  }

  // Function to get post index by slug
  function getPostIndexBySlug(slug) {
    return postData.findIndex((post) => post.slug === slug)
  }

  // Function to update URL hash
  function updateURL(index) {
    if (index >= 0 && index < postData.length) {
      const slug = postData[index].slug
      window.history.replaceState(null, null, `#${slug}`)
    }
  }

  // Function to get current post from URL hash
  function getCurrentPostFromURL() {
    const hash = decodeURIComponent(window.location.hash.substring(1)) // Remove the # symbol and decode
    if (hash) {
      const index = getPostIndexBySlug(hash)
      return index !== -1 ? index : 0
    }
    return 0 // Default to first post
  }

  // Function to fetch the post template
  async function loadPostTemplate() {
    if (postTemplate) {
      return postTemplate
    }
    try {
      const response = await fetch("post-template.html")
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
  async function showPost(index, updateUrl = true) {
    if (index >= 0 && index < postData.length) {
      const post = postData[index]

      // Fetch the template and the post content concurrently
      try {
        const [template, postContent] = await Promise.all([
          loadPostTemplate(),
          fetch(`posts/${post.filename}`).then((res) => {
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

          // Add event listener to the new share button
          const shareButton = postContainer.querySelector(".share-button")
          if (shareButton) {
            shareButton.addEventListener("click", sharePost)
          }

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

        // Update URL hash
        if (updateUrl) {
          updateURL(index)
        }

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

  navbarLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const index = postData.findIndex((post) => post.title === link.textContent)
      if (index !== -1) {
        showPost(index)
        body.classList.remove("sidebar-open") // Hide sidebar on navbar click
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

  // Handle browser back/forward buttons
  window.addEventListener("hashchange", () => {
    const newIndex = getCurrentPostFromURL()
    if (newIndex !== currentIndex) {
      showPost(newIndex, false) // Don't update URL since it's already changed
    }
  })

  setModeIcon()

  // Load the post based on URL hash, or first post by default
  const initialIndex = getCurrentPostFromURL()
  if (postData.length > 0) {
    showPost(initialIndex, false) // Don't update URL on initial load
  }
})

document.querySelectorAll(".toggle-parent").forEach((item) => {
  item.addEventListener("click", function () {
    const subList = this.querySelector(".sub-list")
    if (subList) {
      // Check if a sub-list exists
      subList.classList.toggle("active") // Toggles the 'active' class
    }
  })
})
