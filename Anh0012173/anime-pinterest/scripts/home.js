//bật loading kiểm tra lỗi 
Utils.showLoading()
//chạy trang chủ
function loadedTrangChu(animeData) {
  const checkImg = document.querySelector(".hero-subtitle")
  if(animeData.length === 0) {
    checkImg.innerHTML = "Không tìm thấy ảnh nào phù hợp với yêu cầu của bạn"
  }
  


  // lấy dữ liệu từ urlParams tạo cái thẻ tags tương ứng với trang đó
  createTads(listtags)
  // tương tự như để tạo số trang bên dưới 
  createNumber()
  // nút trở về trang 1 đã lọc theo tìm kiếm
  const back_btn = document.getElementById("detail_out")
  const urlParamsId = Utils.urlParamsId()
  back_btn.addEventListener('click', () => {
    if (numberTrang !== 0) {
      Utils.gotoSearchImgByTags(urlParamsId[0].toString().replaceAll(",", "+"), 0)
    }
  })

  // chạy hàm tạo thẻ ảnh bên Utils có thể sửa số lượng
  const galleryGrid = document.getElementById("galleryGrid")
  if (galleryGrid) {
    animeData.slice(0, 50).forEach((image, index) => {

      setTimeout(() => {
        const card = Utils.createImageCard(image)
        galleryGrid.appendChild(card)
      }, index * 100)
    })
  }

  // tạo thẻ ảnh yêu thích , kiểm tra xem nếu người dùng ấn vào xem ảnh yêu thích thì tạo cái thẻ ảnh ccofn không sẽ ko chạy và không hiển thị
  const sidebar = document.querySelector(".sidebar")
  const sidebarImages = document.getElementById("sidebarImages")
  sidebar.addEventListener("click", () => {
    if (sidebarImages.classList.contains("active")) {

      sidebarImages.classList.remove("active")
      setTimeout(() => {
        sidebarImages.innerHTML = ''
      }, 500);
    } else {

      if (sidebarImages) {


        DanhSanhYeuThich.forEach((image, index) => {
          setTimeout(() => {
            const item = Utils.createSidebarItem(image)
            sidebarImages.appendChild(item)

          }, index * 150)
        })
        sidebarImages.classList.add("active")
      }
    }
  })

  //ẩn thanh công cụ trên
  const headercontainer = document.querySelector(".header-container")
  const hiderThanhCongCu = document.getElementById("hiderThanhCongCu")
  hiderThanhCongCu.addEventListener("click", () => {
    if (headercontainer.classList.contains("collapsed")) {
      headercontainer.classList.remove('collapsed');
    } else {
      headercontainer.classList.add('collapsed');
    }

  })
  //khai báo nút tìm kiếm
  const searchBtn = document.querySelector(".search-btn")


  //thêm sự kiện tìm kiếm cho nút 
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {

      Utils.gotoSearchImgByTags(list_tags.toString().replaceAll(",", "+"), 0)

    })
  }
  // khi ấn enter chuyển dữ liệu của thành tìm kiếm để tạo tags tìm kiếm phục vụ việc lọc
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {

        createListTags(searchInput.value)

      }
    })
  }

  // sau khi chạy hết code quang trọng tắt màn hình chờ
  setTimeout(() => {
    Utils.hideLoading()

  }, 1000)

  let scroll_change = window.pageYOffset
  const heroImage = document.querySelector(".hero-image")
  const changeTrang_layer = document.querySelector(".change-loadier")

  //sự kiện kéo xuống sẽ sử 1 chút về giao diện 
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    //thanh chuyển trang tốn diện tích lên cài khi trượt xuống thì mới hiển thị sau 1 thời gian sẽ ẩn đi 
    if ((scroll_change - scrolled) <= 0) {
      changeTrang_layer.style.bottom = "0px"


    }
    setTimeout(() => {
      // nếu đã kéo xuống cuối tranh thì mặc định hiện thị lại thanh chuyển trang
      if ((changeTrang_layer.style.bottom == "0px") && (document.documentElement.scrollHeight >= (scrolled + 1200)) && (scroll_change == scrolled)) {
        changeTrang_layer.style.bottom = "-60px"
      }
    }, 3000)
    scroll_change = scrolled
    if (heroImage) {
      // chỉnh ảnh ngoài trang chủ (đơn giản làm màu lá chính :>>)
      heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
    }



  })

}
