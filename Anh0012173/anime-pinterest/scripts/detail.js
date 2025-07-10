Utils.showLoading();
// hiển thị trang chi tiết 
function loadedTrangChiTiet(data) {


    // tại trang này hiển thị nhiều ảnh khác nhau và có lọc cả ảnh trong danh sách yêu thích lên phải lấy lại dữ liệu (cho chắc)
    const urlParams = new URLSearchParams(window.location.search);
    const imageId = Number.parseInt(urlParams.get('id')) || 1;
    const detail_container = document.getElementById
        ('detail-container')
    const relatedGrid = document.getElementById('relatedGrid')
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
    //tạo danh sách tags trên thành công cụ bên trên
    createTads(listtags)
    //tạo thanh số trang bên dưới
    createNumber()
    // nút trở về trang 1 đã lọc theo tìm kiếm
    const back_btn = document.getElementById("detail_out")
    const urlParamsId = Utils.urlParamsId()
    back_btn.addEventListener('click', () => {
        Utils.gotoSearchImgByTags(urlParamsId[0].toString().replaceAll(",", "+"), numberTrang)
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

    for (let id_img = 0; id_img < data.length; id_img++) {
        //kiểm tra dữ liệu từ data nếu có ảnh phù hợp với ảnh đã chọn thì hiển thị nó dạng chi tiết 
        if (imageId == data[id_img].id) {
            detail_container.style.display = "grid"
            var image = data[id_img]

            //nút tải xuống ở trên khung ảnh chuyển xang 1 trang mới đễ xem ảnh dõ hơn hoặc tải về thủ công
            const taiXuongImg = document.getElementById("taiXuongImg")
            taiXuongImg.addEventListener("click", () => {



                window.open(image.file_url, '_blank');


            });
            //nút yêu thích
            const ImgYeuThich = document.getElementById("Yeuthich")
            if (IdDanhSanhYeuThich.includes(image.id)) {
                ImgYeuThich.style.color = "#e91e63"
            }
            ImgYeuThich.addEventListener("click", () => {

                //nếu ảnh thuộc loại yêu thích sẽ tự tô màu hồng để đánh dấu
                if (IdDanhSanhYeuThich && !IdDanhSanhYeuThich.includes(image.id)) {
                    //nếu anh chưa có trong danh sách yêu thích thì đưa dữ liệu của ảnh lên localStorage để lưu trữ ko bắt buộc đăng nhập đây là sở thích cả nhân
                    DanhSanhYeuThich.push(image)
                    IdDanhSanhYeuThich.push(image.id)
                    console.log(DanhSanhYeuThich)
                    localStorage.setItem('danhSanhYeuThich', JSON.stringify(DanhSanhYeuThich))
                    localStorage.setItem('IDdanhSanhYeuThich', JSON.stringify(IdDanhSanhYeuThich))
                    ImgYeuThich.style.color = "#e91e63"
                } else {
                    for (let i = 0; i < IdDanhSanhYeuThich.length; i++) {
                        //nếu ảnh đã ở trong danh sách yêu thích thì chức năng của nút sẽ từ thêm thành xoá ảnh ra khôi mục yêu thích
                        if (DanhSanhYeuThich[i].id == image.id) {
                            console.log(DanhSanhYeuThich[i])
                            IdDanhSanhYeuThich = IdDanhSanhYeuThich.filter(item => item !== image.id)
                            DanhSanhYeuThich = DanhSanhYeuThich.filter(item => item.id !== image.id)
                            localStorage.setItem('danhSanhYeuThich', JSON.stringify(DanhSanhYeuThich))
                            localStorage.setItem('IDdanhSanhYeuThich', JSON.stringify(IdDanhSanhYeuThich))
                            ImgYeuThich.style.color = "blue"

                        }
                    }
                }

            });
            //tạo bảng hiển thị tất cả các tags của ảnh và thông tin chi tiết

            const mainImage = document.getElementById('mainImage');
            if (mainImage) {
                mainImage.src = image.file_url
                mainImage.alt = image.id
            }


            const imageTitle = document.getElementById('imageTitle');
            if (imageTitle) {
                imageTitle.textContent = image.score
            }

            const imageOwner = document.getElementById('imageOwner');
            if (imageOwner) {
                imageOwner.textContent = image.owner;
            }

            const imageChange = document.getElementById('imageChange');
            if (imageChange) {
                imageChange.textContent = image.change;
            }

            const imageIdElement = document.getElementById('imageId');
            if (imageIdElement) {
                imageIdElement.textContent = imageId;
            }

            const imageSize = document.getElementById('imageSize');
            if (imageSize) {
                imageSize.textContent = `${image.height}x${image.width}`

                const imageStatus = document.getElementById('imageStatus');
                if (imageStatus) {
                    imageStatus.textContent = image.status;
                }

                const imageRating = document.getElementById('imageRating');
                if (imageRating) {
                    imageRating.textContent = image.rating;
                }

                const imageComments = document.getElementById('imageComments');
                if (imageComments) {
                    imageComments.textContent = image.comments;
                }

                // Load tags
                const tagsContainer = document.getElementById('tagsContainer');
                if (tagsContainer) {
                    image.tags.split(' ').forEach((tag, index) => {
                        setTimeout(() => {
                            const tagSpan = document.createElement('span');
                            tagSpan.className = `detail-tag ${Utils.randon_color()}`;
                            tagSpan.textContent = tag;
                            tagSpan.onclick = () => {

                                createListTags(tag)

                            };
                            tagsContainer.appendChild(tagSpan);
                        }, index * 50);
                    });
                }
            }
        } else {

            //tận dụng vòng lập tậo cách thẻ ảnh gán mác liên quan(chung tag sẽ liên quan tới nhau còn không thì sẽ thuộc danh sách ảnh mới được cập nhật)
            const item = document.createElement('div');
            item.className = 'related-item';
            item.onclick = () => {
                window.location.href = `detail.html?tags=${listtags.toString().replaceAll(",", "+")}&number=${numberTrang}&id=${data[id_img].id}`;
            };

            const img = document.createElement('img');
            img.src = data[id_img].preview_url
            img.alt = data[id_img].id
            img.className = 'related-image';
            img.loading = 'lazy';

            const info = document.createElement('div');
            info.className = 'related-info';

            const title = document.createElement('div');
            title.className = 'related-title';
            title.textContent = data[id_img].owner

            const tags = document.createElement('div');
            tags.className = 'related-tags';

            data[id_img].tags.split(' ').slice(0, 3).forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = `related-tag ${Utils.randon_color()}`;
                tagSpan.textContent = tag;
                tags.appendChild(tagSpan);
            });

            info.appendChild(title);
            info.appendChild(tags);
            item.appendChild(img)
            item.appendChild(info)
            relatedGrid.appendChild(item)

        }
        setTimeout(() => { Utils.hideLoading(); }, 1000)
        let scroll_change = window.pageYOffset

        const changeTrang_layer = document.querySelector(".change-loadier")
        // sự kiển của thanh chuyển trang

        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset

            if ((scroll_change - scrolled) <= 0) {
                changeTrang_layer.style.bottom = "0px"


            }
            setTimeout(() => {
                if ((changeTrang_layer.style.bottom == "0px") && (document.documentElement.scrollHeight >= (scrolled + 1200)) && (scroll_change == scrolled)) {
                    changeTrang_layer.style.bottom = "-60px"
                }
            }, 3000)
            scroll_change = scrolled




        })


    }
}
