// danh sách màu để chọn ngẫu nhiên 1 màu từ danh sách
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




// Class Các hàm tiện ích tạo card ảnh, sidebar item, chuyển trang, hiệu ứng loading
class Utils {
  // lấy dữ liệu từ đường đẫn nếu có urlParams được khai báo bên data.js 
  static urlParamsId() {
    // lấy danh sách tag ()
    if (urlParams.get('tags')) {
      const listtags = urlParams.get('tags').split(" ") || []
    } else {
      const listtags = []
    }
    // láy vị trí trang hiện tại
    if (urlParams.get('number')) {
      const numberTrang = Number.parseInt(urlParams.get('number')) || 0
    } else {
      const numberTrang = 0
    }
    //tra vể cả 2 dạng list
    return [listtags, numberTrang]
  }
  // hàm này hình như không dùng nữa
  static getTagColor(tag) {
    return tagColors[tag] || "tag-blue"
  }
  //chọn màu ngẫu nhiên từ danh sách màu bên trên
  static randon_color() {

    return tagColors[Math.floor(Math.random() * (57 - 0))]
  }

  // thêm màn hình chờ , nếu lỗi nó sẽ không biến mất tiện phát hiện lỗi
  static showLoading() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.add("active")
    }
  }
  // nếu tất cả code đều chạy thì nó sẽ xoá màn hình chờ này đi tương đương lỗi ko nghiêm trọng hoặc không có lỗi
  static hideLoading() {
    const overlay = document.getElementById("loadingOverlay")
    if (overlay) {
      overlay.classList.remove("active")
    }
  }
  //tạo cái khối thẻ để hiển thị các thẻ chưa img (sử dụng data bên data.js)
  static createImageCard(image, className = "gallery-item") {
    const card = document.createElement("div")
    const urlParamsId = this.urlParamsId()
    card.className = className
    card.onclick = () => this.goToDetail(urlParamsId[0].toString().replaceAll(",", "+"), urlParamsId[1], image.id)

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
  // tạo cái thẻ ảnh tương tự nhưng dành cho danh sách ảnh yêu thích
  static createSidebarItem(image) {
    const item = document.createElement("div")
    const urlParamsId = this.urlParamsId()
    item.className = "sidebar-item"
    item.onclick = () => this.goToDetail(image.tags.toString().replaceAll(" ", "+"), 0, image.id)

    const img = document.createElement("img")
    img.src = image.preview_url
    img.alt = image.id
    img.className = "sidebar-image"
    img.loading = "lazy"
    const id = document.createElement("span")
    id.className = "gallery-meta"
    id.textContent = `ID: ${image.id}`
    const info = document.createElement("div")
    info.className = "gallery-info"

    const owner = document.createElement("div")
    owner.className = "gallery-owner"
    owner.textContent = `owner: ${image.owner}`

    const tags = document.createElement("div")
    tags.className = "gallery-tags"
    image.tags.split(' ').slice(0, 4).forEach((tag) => {
      const tagSpan = document.createElement("span")
      tagSpan.className = `gallery-tag ${this.randon_color()}`
      tagSpan.textContent = tag
      tags.appendChild(tagSpan)

    })
    




    item.appendChild(img)
    info.appendChild(id)
    info.appendChild(tags)
    info.appendChild(owner)
    item.appendChild(info)


    return item
  }
  // hàm này khi click vào ảnh thì sẽ đương đến trang chi tiết tương ứng với thẻ ảnh đó theo các thông tin từ thẻ ảnh 
  static goToDetail(list_tags, numberTrang, imageId) {
    window.location.href = `detail.html?tags=${list_tags}&number=${numberTrang}&id=${imageId}`
  }
  //khi ấn vào sẽ đưa về trang chủ tuỳ cách được sử dụng nó sẽ là hàm tìm kiếm kiêm thoát trang chi tiết
  static gotoSearchImgByTags(list_tags, numberTrang) {

    window.location.href = `index.html?tags=${list_tags}&number=${numberTrang}`
  }
  //đưa về trang gốc 
  static goToHome() {
    window.location.href = "index.html"
  }


}
