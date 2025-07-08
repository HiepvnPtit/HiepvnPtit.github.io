document.addEventListener("DOMContentLoaded", () => {
  const masonryGrid = document.getElementById("masonryGrid")
  const resultsCount = document.getElementById("resultsCount")
  const searchInput = document.getElementById("searchInput")
  const filterTags = document.querySelectorAll(".filter-tag")

  let currentQuery = ""
  const activeFilters = new Set()
  const animeImages = [] // Declare animeImages variable
  const goToDetail = (id) => {
    window.location.href = `/detail/${id}`
  } // Declare goToDetail function
  const getTagColor = (tag) => {
    return "tag-color"
  } // Declare getTagColor function

  // Get query from URL
  const urlParams = new URLSearchParams(window.location.search)
  const queryParam = urlParams.get("q")
  if (queryParam) {
    currentQuery = queryParam
    searchInput.value = queryParam
  }

  function createMasonryItem(image) {
    const item = document.createElement("div")
    item.className = "masonry-item"
    item.onclick = () => goToDetail(image.id)

    const img = document.createElement("img")
    img.src = image.src
    img.alt = image.title
    img.loading = "lazy"

    const info = document.createElement("div")
    info.className = "masonry-info"

    const title = document.createElement("div")
    title.className = "masonry-title"
    title.textContent = image.title

    const tags = document.createElement("div")
    tags.className = "masonry-tags"

    // Show first 3 tags
    image.tags.slice(0, 3).forEach((tag) => {
      const tagSpan = document.createElement("span")
      tagSpan.className = `tag ${getTagColor(tag)}`
      tagSpan.textContent = tag
      tags.appendChild(tagSpan)
    })

    info.appendChild(title)
    info.appendChild(tags)

    item.appendChild(img)
    item.appendChild(info)

    return item
  }

  function filterImages() {
    let filteredImages = animeImages

    // Filter by search query
    if (currentQuery) {
      const queryLower = currentQuery.toLowerCase()
      filteredImages = filteredImages.filter(
        (image) =>
          image.title.toLowerCase().includes(queryLower) ||
          image.tags.some((tag) => tag.toLowerCase().includes(queryLower)),
      )
    }

    // Filter by active filter tags
    if (activeFilters.size > 0) {
      filteredImages = filteredImages.filter((image) =>
        Array.from(activeFilters).every((filter) => image.tags.includes(filter)),
      )
    }

    return filteredImages
  }

  function renderImages() {
    const filteredImages = filterImages()
    masonryGrid.innerHTML = ""

    filteredImages.forEach((image) => {
      const item = createMasonryItem(image)
      masonryGrid.appendChild(item)
    })

    // Update results count
    if (filteredImages.length === animeImages.length) {
      resultsCount.textContent = "Hiển thị tất cả hình ảnh"
    } else {
      resultsCount.textContent = `Tìm thấy ${filteredImages.length} hình ảnh`
    }
  }

  // Filter tag click handlers
  filterTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const tagValue = this.dataset.tag

      if (activeFilters.has(tagValue)) {
        activeFilters.delete(tagValue)
        this.classList.remove("active")
      } else {
        activeFilters.add(tagValue)
        this.classList.add("active")
      }

      renderImages()
    })
  })

  // Search functionality
  const searchBtn = document.getElementById("searchBtn")
  searchBtn.addEventListener("click", () => {
    currentQuery = searchInput.value.trim()
    renderImages()
  })

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      currentQuery = this.value.trim()
      renderImages()
    }
  })

  // Initial render
  renderImages()
})
