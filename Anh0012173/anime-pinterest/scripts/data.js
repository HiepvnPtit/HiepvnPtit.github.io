let list_tags = [];
let list_headerTags = document.querySelector(".header-tags")
let nuber_trang = document.getElementById("nuber-trang")
const suggestionsListTags = document.getElementById("suggestions_listTags")
const searchInput = document.querySelector(".search-input")
let listtags = []
let allTags = []
let numberTrang = 0
let DanhSanhYeuThich = []
let IdDanhSanhYeuThich = []
try {
  //kiểm tra xem có danh sách yêu thích không nếu không hoặc có lỗi thì nó là rỗng
  if (localStorage.getItem('danhSanhYeuThich')) {
    DanhSanhYeuThich = JSON.parse(localStorage.getItem('danhSanhYeuThich')) || []
    IdDanhSanhYeuThich = JSON.parse(localStorage.getItem('IDdanhSanhYeuThich')) || []
  } else {
    removeDanhSachYeuThich()
  }
} catch (e) {
  console.log("loi danh sanh yeu thich", e)
  DanhSanhYeuThich = []
  IdDanhSanhYeuThich = []
}
// lấy dữ liệu từ đường dẫn
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('tags')) {
  listtags = urlParams.get('tags').split(" ") || []
}
if (urlParams.get('number')) {
  numberTrang = Number.parseInt(urlParams.get('number')) || 0
}
console.log(listtags.toString())

window.addEventListener("click", () => {
  suggestionsListTags.innerHTML = '';
})

//truy cập file json chứa tất cả thẻ tags chuyển qua cho hàm search
fetch('img_tags_beta.json')
  .then(response => response.json())
  .then(_ass => {
    search_tag(_ass)
  })
// có nút xoá tất cả danh sách yêu thích 
function removeDanhSachYeuThich() {
  DanhSanhYeuThich = []
  IdDanhSanhYeuThich = []
  localStorage.setItem('danhSanhYeuThich', JSON.stringify([]))
  localStorage.setItem('IDdanhSanhYeuThich', JSON.stringify([]))
  sidebarImages.innerHTML = ''

}
//tiến hành lọc tìm kiếm tags phù hợp
function handleInput(e) {
  // chuyển input thành chữ thường 
  const query = e.target.value.toLowerCase();

  let suggestions = [];
  // yêu cầu từ khoá khác rỗng
  if (query !== "") {
    //suggestions chữ danh sách tags từ file img_tags_beta.json(khoảng 8000 tags)
    suggestions = allTags
      //lọc từ khoá
      .filter(item => item.toLowerCase().includes(query))
      .slice(0, 100);
  }
  // sau khi lọc chuyển chúng từ thẻ gợi ý
  const suggestionsHTML = suggestions.map(item =>
    `<li  class="input_tags_li" onclick="createListTags('${item}')">${item}</li>`
  ).join("");

  suggestionsListTags.innerHTML = suggestionsHTML;
}
function search_tag(_ass) {
  allTags = _ass;
  //đánh dấu có sử dụng input tìm kiếm không nếu không thì thêm hoạt động của hàm lọc
  if (!searchInput._listenerAdded) {
    searchInput.addEventListener("input", handleInput);
    searchInput._listenerAdded = true;
  }
}
// dùng để sửa đổi trang 
async function searchImgByNumberTrang(changeTrang) {
  if ((numberTrang + changeTrang >= 0)) {
    //nếu trang tiếp theo cần đến lớn hơn 0 thì kiểm tra xem tra đó có tồn tại hay không nếu không thì không hoạt động nữa 
    const result = await checkFetchApi(listtags.toString().replaceAll(",", " "), numberTrang + changeTrang);
    // true hoặc false
    if (result) {
      // Có data, xử lý tiếp
      window.location.href = `index.html?tags=${listtags.toString().replaceAll(",", "+")}&number=${numberTrang + changeTrang}`
    }
  }
}
//tạo ra danh sánh tags
function createTads(listtags) {
  listtags.forEach(element => {
    createListTags(element)
  });
}
//tạo tag đơn thêm sử lý xoá tag khi ấn vào
function createListTags(_Tags) {

  if (!(list_tags.includes(_Tags))) {
    const span = document.createElement("span")
    span.className = `header-tag ${Utils.randon_color()}`
    span.textContent = `${_Tags}`
    span.addEventListener('click', function () {
      list_headerTags.removeChild(span)
      list_tags = list_tags.filter(item => item !== span.textContent)

    })
    list_headerTags.appendChild(span)
    list_tags.push(_Tags)
    searchInput.value = ''

  }

}
//kiểm tra sự tồn tại của các trang khác ngoài trang đang sử dụng
async function createNumber() {
  var i_check = false
  for (let i = 2; i > -3; i--) {
    if ((((i_check) || (i <= 0)) && (numberTrang + i + 1 > 0)) || (await checkFetchApi(listtags.toString().replaceAll(",", " "), numberTrang + i))) {
      const span = document.createElement('span')
      i_check = true
      if (i !== 0) {
        span.className = `header-tag tag-blue`
        span.onclick = () => searchImgByNumberTrang(i)

      } else {
        span.className = `header-tag tag-indigo`

      }
      span.textContent = `${numberTrang + i + 1}`
      nuber_trang.prepend(span)
    }
  }


}
//kiểm tra sự tồn tại của các trang chưa được sử dụng
function checkFetchApi(listTags_sumit, numberTrang) {
  const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(listTags_sumit)}&limit=1&pid=${numberTrang * 50}`;
  const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;

  return fetch(proxyUrl, {
    timeout: 10000 // 10 giây timeout
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(text => {
      if (!text || text.trim() === '') {
        return false;
      }
      try {
        const data = JSON.parse(text);
        if (Array.isArray(data) && data.length === 0) {
          return false;
        }
        return true;
      } catch (e) {
        console.error('Không parse được JSON:', e, 'Response:', text.substring(0, 100));
        return false;
      }
    })
    .catch(error => {
      console.error('API Error:', error);
      return false; // Nếu có lỗi cũng trả về false
    });
}

//lấy data theo tag và vị trí
async function fetchApi(listTags_sumit, numberTrang) {
  try {
    const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(listTags_sumit)}&limit=50&pid=${numberTrang}`;
    //Để tránh lỗi CORS, dùng proxy codetabs.com để lấy api của trang safebooru.org
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
    console.log('Fetching:', url);

    const response = await fetch(proxyUrl, {
      timeout: 15000 // 15 giây timeout
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    if (!text || text.trim() === '') {
      //lếu ảnh gốc đã bị xoá từ phía trang gốc vẫn lưu trữ lại ảnh và hiển thị nếu cần
      loadedTrangChiTiet(DanhSanhYeuThich)
      throw new Error('Empty response');

    }

    let data = JSON.parse(text);
    // cách đơn giản để lấy ra trang cần chọn để sử lý
    try {
      loadedTrangChu(data)
    }
    catch (e) {
      loadedTrangChiTiet(data)
    }

  } catch (e) {
    console.error("Lỗi fetchApi:", e);
    try {
      loadedTrangChu([])
    }
    catch (e) {
      loadedTrangChiTiet([])
    }
  }
}

// hiển thị và khởi tạo trang lúc mới khởi tạo để khởi tạo ban đầu
fetchApi(listtags.toString().replaceAll(",", " "), numberTrang)

