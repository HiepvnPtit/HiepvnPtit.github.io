// Declare animeImages variable
const animeImages = [
  {
    id: 1,
    src: "image1.jpg",
    title: "Image 1",
    owner: "Owner 1",
    size: "1MB",
    status: "Active",
    rating: 4.5,
    comments: "Great image!",
    tags: ["tag1", "tag2"],
  },
  {
    id: 2,
    src: "image2.jpg",
    title: "Image 2",
    owner: "Owner 2",
    size: "2MB",
    status: "Inactive",
    rating: 3.8,
    comments: "Nice image!",
    tags: ["tag2", "tag3"],
  },
  // Add more images as needed
]

// Declare getTagColor function
function getTagColor(tag) {
  const tagColors = {
    tag1: "color1",
    tag2: "color2",
    tag3: "color3",
    // Add more tag colors as needed
  }
  return tagColors[tag] || "default-color"
}

// Declare goToSearch function
function goToSearch(tag) {
  window.location.href = `search.html?tag=${tag}`
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search)
  const imageId = Number.parseInt(urlParams.get("id")) || 1

  const image = animeImages.find((img) => img.id === imageId) || animeImages[0]

  // Update main image
  const mainImage = document.getElementById("mainImage")
  mainImage.src = image.src
  mainImage.alt = image.title

  // Update image info
  document.getElementById("imageTitle").textContent = image.title
  document.getElementById("imageOwner").textContent = image.owner
  document.getElementById("imageId").textContent = image.id
  document.getElementById("imageSize").textContent = image.size
  document.getElementById("imageStatus").textContent = image.status
  document.getElementById("imageRating").textContent = image.rating
  document.getElementById("imageComments").textContent = image.comments

  // Update tags
  const tagsContainer = document.getElementById("tagsContainer")
  image.tags.forEach((tag) => {
    const tagSpan = document.createElement("span")
    tagSpan.className = `detail-tag ${getTagColor(tag)}`
    tagSpan.textContent = tag
    tagSpan.onclick = () => goToSearch(tag)
    tagsContainer.appendChild(tagSpan)
  })

  // Load related images
  const relatedGrid = document.getElementById("relatedGrid")
  const relatedImages = animeImages
    .filter((img) => img.id !== imageId && img.tags.some((tag) => image.tags.includes(tag)))
    .slice(0, 8)

  relatedImages.forEach((relatedImage) => {
    const item = document.createElement("div")
    item.className = "related-item"
    item.onclick = () => {
      window.location.href = `detail.html?id=${relatedImage.id}`
    }

    const img = document.createElement("img")
    img.src = relatedImage.src
    img.alt = relatedImage.title
    img.loading = "lazy"

    const info = document.createElement("div")
    info.className = "related-info"

    const title = document.createElement("div")
    title.className = "related-title"
    title.textContent = relatedImage.title

    const tags = document.createElement("div")
    tags.className = "related-tags"

    relatedImage.tags.slice(0, 2).forEach((tag) => {
      const tagSpan = document.createElement("span")
      tagSpan.className = `tag ${getTagColor(tag)}`
      tagSpan.textContent = tag
      tags.appendChild(tagSpan)
    })

    info.appendChild(title)
    info.appendChild(tags)

    item.appendChild(img)
    item.appendChild(info)

    relatedGrid.appendChild(item)
  })
})
