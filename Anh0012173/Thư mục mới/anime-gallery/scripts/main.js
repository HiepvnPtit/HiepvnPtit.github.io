// Common utility functions
const tagColors = {
  nature: "tag-green",
  portrait: "tag-purple",
  landscape: "tag-orange",
  city: "tag-red",
}

function getTagColor(tag) {
  return tagColors[tag] || "tag-blue"
}

function createImageCard(image, className = "image-card") {
  const card = document.createElement("div")
  card.className = className
  card.onclick = () => goToDetail(image.id)

  const img = document.createElement("img")
  img.src = image.src
  img.alt = image.title
  img.loading = "lazy"

  const info = document.createElement("div")
  info.className = "image-info"

  const title = document.createElement("div")
  title.className = "image-title"
  title.textContent = image.title

  const tags = document.createElement("div")
  tags.className = "image-tags"

  // Show only first 4 tags
  image.tags.slice(0, 4).forEach((tag) => {
    const tagSpan = document.createElement("span")
    tagSpan.className = `tag ${getTagColor(tag)}`
    tagSpan.textContent = tag
    tags.appendChild(tagSpan)
  })

  const meta = document.createElement("div")
  meta.className = "image-meta"
  meta.textContent = `${image.size} • ${image.comments} comments`

  info.appendChild(title)
  info.appendChild(tags)
  info.appendChild(meta)

  card.appendChild(img)
  card.appendChild(info)

  return card
}

function goToDetail(imageId) {
  window.location.href = `detail.html?id=${imageId}`
}

function goToSearch(query = "") {
  window.location.href = `search.html${query ? "?q=" + encodeURIComponent(query) : ""}`
}

// Search functionality
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-input")
  const searchBtn = document.querySelector(".search-btn")

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput.value.trim()
      if (query) {
        goToSearch(query)
      }
    })
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const query = this.value.trim()
        if (query) {
          goToSearch(query)
        }
      }
    })
  }
})
