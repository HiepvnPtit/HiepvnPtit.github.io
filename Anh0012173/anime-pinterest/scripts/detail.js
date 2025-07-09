function loadedTrangChiTiet(data) {

    Utils.showLoading();

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
    createTads(listtags)
    createNumber()
    const back_btn = document.getElementById("detail_out")
    const urlParamsId = Utils.urlParamsId()
    back_btn.addEventListener('click', () => {
        Utils.gotoSearchImgByTags(urlParamsId[0].toString().replaceAll(",", "+"), 0)
    })
   
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
                
            }
        })
    }
    for (let id_img = 0; id_img < data.length; id_img++) {

        if (imageId == data[id_img].id) {
            detail_container.style.display = "grid"
            var image = data[id_img]
            // Get image ID from URL parameters

            // Load image details


            // Update main image
            const mainImage = document.getElementById('mainImage');
            if (mainImage) {
                mainImage.src = image.file_url
                mainImage.alt = image.id
            }

            // Update image info
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
                                // Here you would implement tag search functionality
                            };
                            tagsContainer.appendChild(tagSpan);
                        }, index * 50);
                    });
                }
            }
        } else {


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
        // Add parallax effect to hero section

        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset

            if ((scroll_change - scrolled) <= 0) {
                changeTrang_layer.style.bottom = "0px"


            }
            setTimeout(() => {
                if ((changeTrang_layer.style.bottom  == "0px") && (document.documentElement.scrollHeight >= (scrolled + 1200)) && (scroll_change == scrolled)) {
                    changeTrang_layer.style.bottom  = "-60px"
                }
            }, 3000)
            scroll_change = scrolled




        })

        // Load related images

        // if (relatedGrid) {
        //     // Filter related images (exclude current image and get similar ones)
        //     const relatedImages = animeData.images
        //         .filter(img => img.id !== imageId)
        //         .slice(0, 4);

        //     relatedImages.forEach((relatedImage, index) => {
        //         setTimeout(() => {
        //             const item = document.createElement('div');
        //             item.className = 'related-item';
        //             item.onclick = () => {
        //                 window.location.href = `detail.html?id=${relatedImage.id}`;
        //             };

        //             const img = document.createElement('img');
        //             img.src = relatedImage.src;
        //             img.alt = relatedImage.title;
        //             img.className = 'related-image';
        //             img.loading = 'lazy';

        //             const info = document.createElement('div');
        //             info.className = 'related-info';

        //             const title = document.createElement('div');
        //             title.className = 'related-title';
        //             title.textContent = relatedImage.title;

        //             const tags = document.createElement('div');
        //             tags.className = 'related-tags';

        //             relatedImage.tags.slice(0, 3).forEach(tag => {
        //                 const tagSpan = document.createElement('span');
        //                 tagSpan.className = `related-tag ${Utils.getTagColor(tag)}`;
        //                 tagSpan.textContent = tag;
        //                 tags.appendChild(tagSpan);
        //             });

        //             info.appendChild(title);
        //             info.appendChild(tags);
        //         })
        //     })
        // }



    }
}
