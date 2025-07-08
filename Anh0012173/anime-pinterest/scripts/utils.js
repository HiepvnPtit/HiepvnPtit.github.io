// Utility functions
const tagColors = [
  "tag-red",
  "tag-purple",
  "tag-pink",
  "tag-orange",
  "tag-cyan",
  "tag-blue",
  "tag-green",
  "tag-indigo",
  "tag-purple",
  "tag-blue",
  "tag-green",
  "tag-blue",
  "tag-indigo",
  "tag-orange",
  "tag-pink",
  "tag-red",
  "tag-yellow",
  "tag-purple",
  "tag-cyan",
  "tag-blue",
  "tag-green",
  "tag-indigo",
  "tag-red",
  "tag-purple",
  "tag-green",
  "tag-cyan",
  "tag-blue",
  "tag-pink",
  "tag-pink",
  "tag-pink",
  "tag-orange",
  "tag-red",
  "tag-indigo",
  "tag-purple",
  "tag-orange",
  "tag-purple",
  "tag-pink",
  "tag-red",
  "tag-indigo",
  "tag-orange",
  "tag-blue",
  "tag-brown",
  "tag-green",
  "tag-cyan",
  "tag-purple",
  "tag-purple",
  "tag-orange",
  "tag-blue",
  "tag-green",
  "tag-pink",
  "tag-pink",
  "tag-orange",
  "tag-indigo",
  "tag-cyan",
  "tag-purple",
  "tag-green",
  "tag-orange",
]





class Utils {
  static urlParamsId(){
    if (urlParams.get('tags')) {
      const listtags = urlParams.get('tags').split(" ") || []
    } else {
      const listtags = []
    }
    if (urlParams.get('number')) {
      const numberTrang = Number.parseInt(urlParams.get('number')) || 0
    } else {
      const numberTrang = 0
    }
    return [listtags,numberTrang]
  }
  static getTagColor(tag) {
    return tagColors[tag] || "tag-blue"
  }
  static randon_color() {
    
    return tagColors[Math.floor(Math.random() * (57 - 0)) ]
  }

  static formatNumber(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k"
    }
    return num.toString()
  }

  static showLoading() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.add("active")
    }
  }

  static hideLoading() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.remove("active")
    }
  }
  
  static createImageCard(image, className = "gallery-item") {
    const card = document.createElement("div")
    const urlParamsId = this.urlParamsId()
   card.className = className
    card.onclick = () => this.goToDetail(urlParamsId[0].toString().replaceAll(",", "+"),urlParamsId[1],image.id)

    const img = document.createElement("img")
    img.src = image.preview_url

    img.alt = image.id
    img.className = "gallery-image"
    img.loading = "lazy"

    const info = document.createElement("div")
    info.className = "gallery-info"

    const title = document.createElement("div")
    title.className = "gallery-title"
    title.textContent = ''

    const owner = document.createElement("div")
    owner.className = "gallery-owner"
    owner.textContent = `owner: ${image.owner}`

    const tags = document.createElement("div")
    tags.className = "gallery-tags"



    // Show only first 4 tags
    image.tags.split(' ').slice(0, 4).forEach((tag) => {
      const tagSpan = document.createElement("span")
      tagSpan.className = `gallery-tag ${this.randon_color()}`
      tagSpan.textContent = tag
      tags.appendChild(tagSpan)
    
    })

    const meta = document.createElement("div")
    meta.className = "gallery-meta"

    const size = document.createElement("span")
    size.textContent = `${image.height}x${image.width}`


    const stats = document.createElement("div")
    stats.className = "gallery-stats"



    meta.appendChild(size)
    meta.appendChild(stats)

    info.appendChild(title)
    info.appendChild(owner)
    info.appendChild(tags)
    info.appendChild(meta)

    card.appendChild(img)
    card.appendChild(info)

    return card
  }

  static createSidebarItem(image) {
    const item = document.createElement("div")
    const urlParamsId = this.urlParamsId()
    item.className = "sidebar-item"
    item.onclick = () => this.goToDetail(urlParamsId[0].toString().replaceAll(",", "+"),urlParamsId[1],image.id)

    const img = document.createElement("img")
    img.src = image.preview_url
    img.alt =  image.id
    img.className = "sidebar-image"
    img.loading = "lazy"

    const info = document.createElement("div")
    info.className = "sidebar-info"

    const title = document.createElement("div")
    title.className = "sidebar-item-title"
    title.textContent = image.score

    const tags = document.createElement("div")
    tags.className = "sidebar-item-tags"


   
   

    item.appendChild(img)
   

    return item
  }

  static goToDetail(list_tags,numberTrang,imageId) {
    window.location.href = `detail.html?tags=${list_tags}&number=${numberTrang}&id=${imageId}`
  }

  static gotoSearchImgByTags(list_tags,numberTrang){
   
    window.location.href = `index.html?tags=${list_tags}&number=${numberTrang}`
  }

  static goToHome() {
    window.location.href = "index.html"
  }

  static animateOnScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

  
  }
}
