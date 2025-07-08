// Declare Utils and animeData variables before using them
// (Đã xóa khai báo animeData để dùng từ data.js)
function loadedTrangChu(animeData) {
  Utils.showLoading()


  createTads(listtags)
  createNumber()

  // Load gallery images
  const galleryGrid = document.getElementById("galleryGrid")
  if (galleryGrid) {
    animeData.slice(0, 40).forEach((image, index) => {

      setTimeout(() => {
        const card = Utils.createImageCard(image)
        galleryGrid.appendChild(card)
      }, index * 100)
    })
  }

  // Load sidebar images
  const sidebarImages = document.getElementById("sidebarImages")
  if (sidebarImages) {
    animeData.slice(40, 50).forEach((image, index) => {
      setTimeout(() => {
        const item = Utils.createSidebarItem(image)
        sidebarImages.appendChild(item)
      }, index * 150)
    })
  }

  // Add click handlers for header tags



  // Search functionality
  const searchInput = document.querySelector(".search-input")
  const searchBtn = document.querySelector(".search-btn")



  if (searchBtn) {
    searchBtn.addEventListener("click", () => {

      Utils.gotoSearchImgByTags(list_tags.toString().replaceAll(",", "+"), 0)

    })
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {

        createListTags(searchInput.value)
        searchInput.value = ''
      }
    })
  }

  // Hide loading after content is loaded
  setTimeout(() => {
    Utils.animateOnScroll()
    Utils.hideLoading()

  }, 1000)
  let scroll_change = window.pageYOffset
  const heroImage = document.querySelector(".hero-image")
  const changeTrang_layer = document.querySelector(".change-loadier")
  // Add parallax effect to hero section

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset

    if ((scroll_change - scrolled) <= 0) {
      changeTrang_layer.style.bottom = "0px"


    }
    setTimeout(() => {
      if ((changeTrang_layer.style.bottom  == "0px") && (document.documentElement.scrollHeight >= (scrolled + 1200))&&(scroll_change == scrolled)) {
        changeTrang_layer.style.bottom  = "-60px"
      }
    }, 3000)
    scroll_change = scrolled
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
    }



  })

}
