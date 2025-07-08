document.addEventListener("DOMContentLoaded", () => {
  const imageGrid = document.getElementById("imageGrid")
  const animeImages = [] // Declare animeImages variable
  const createImageCard = (image) => {
    // Implement createImageCard function
    const card = document.createElement("div")
    card.classList.add("image-card")
    card.innerHTML = `<img src="${image.src}" alt="${image.alt}">`
    return card
  }
  const goToSearch = (query) => {
    // Implement goToSearch function
    window.location.href = `/search?q=${query}`
  }

  if (imageGrid) {
    // Load featured images
    animeImages.forEach((image) => {
      const card = createImageCard(image)
      imageGrid.appendChild(card)
    })
  }

  // Add click handlers for hero tags
  const heroTags = document.querySelectorAll(".hero-tags .tag")
  heroTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      const tagText = this.textContent
      goToSearch(tagText)
    })
  })

  // Add click handlers for category cards
  const categoryCards = document.querySelectorAll(".category-card")
  categoryCards.forEach((card) => {
    card.addEventListener("click", function () {
      const categoryTitle = this.querySelector("h4").textContent
      let searchQuery = ""

      switch (categoryTitle) {
        case "Dress & Fashion":
          searchQuery = "dress"
          break
        case "Eye Colors":
          searchQuery = "red_eyes"
          break
        case "Hair Styles":
          searchQuery = "long_hair"
          break
        case "Action & Combat":
          searchQuery = "sword"
          break
      }

      if (searchQuery) {
        goToSearch(searchQuery)
      }
    })
  })
})
