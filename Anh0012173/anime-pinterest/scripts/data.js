let list_tags = [];
const list_headerTags = document.querySelector(".header-tags")
const nuber_trang = document.getElementById("nuber-trang")
const suggestionsListTags = document.getElementById("suggestions_listTags")
const searchInput = document.querySelector(".search-input")
let listtags = []
let allTags = []
let numberTrang = 0

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('tags')) {
  listtags = urlParams.get('tags').split(" ") || []
}
if (urlParams.get('number')) {
  numberTrang = Number.parseInt(urlParams.get('number')) || 0
}
console.log(listtags.toString())

window.addEventListener("click",()=>{
  suggestionsListTags.innerHTML = '';
})

fetch('img_tags_beta.json')
  .then(response => response.json())
  .then(_ass => {
    search_tag(_ass)
  })


function handleInput(e) {
  const query = e.target.value.toLowerCase();

  let suggestions = [];
  if (query !== "") {
    suggestions = allTags
      .filter(item => item.toLowerCase().includes(query))
      .slice(0, 100); // Giới hạn gợi ý
  }

  const suggestionsHTML = suggestions.map(item =>
    `<li  class="input_tags_li" onclick="createListTags('${item}')">${item}</li>`
  ).join("");

  suggestionsListTags.innerHTML = suggestionsHTML;
}
function search_tag(_ass) {
  allTags = _ass;

  if (!searchInput._listenerAdded) {
    searchInput.addEventListener("input", handleInput);
    searchInput._listenerAdded = true;
  }
}

async function searchImgByNumberTrang(changeTrang) {
  if ((numberTrang + changeTrang >= 0)) {
    const result = await checkFetchApi(listtags.toString().replaceAll(",", " "), numberTrang+changeTrang);
     // true hoặc false
    if (result) {
      // Có data, xử lý tiếp
      window.location.href = `index.html?tags=${listtags.toString().replaceAll(",", "+")}&number=${numberTrang+changeTrang}`
    } 
  }
}

function createTads(listtags) {
  listtags.forEach(element => {
    createListTags(element)
  });
}

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
    // suggestionsListTags.innerHTML = '';
  }

}

function createNumber(){
  const span = document.createElement('span')
  span.className = `header-tag tag-blue`
  span.textContent = `${numberTrang+1}`
  nuber_trang.appendChild(span)
}

function checkFetchApi(listTags_sumit, numberTrang) {
  return fetch('https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(`https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(listTags_sumit)}&limit=50&pid=${numberTrang}`))
    .then(response => response.json())
    .then(data => {
      
      // Kiểm tra data là mảng và rỗng
      if (Array.isArray(data) && data.length === 0) {
        return false;
      }
      return true;
    })
    .catch(error => {
      console.error(error);
      return false; // Nếu có lỗi cũng trả về false
    });
}


async function fetchApi(listTags_sumit, numberTrang) {

  try {
    const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(listTags_sumit)}&limit=50&pid=${numberTrang}`;
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
    const response = await fetch(proxyUrl);
    const text = await response.text();
    let data = JSON.parse(text);
    try {
      loadedTrangChu(data)
    }
    catch (e) {
      loadedTrangChiTiet(data)
    }





  } catch (e) {
    console.error("Lỗi:", e);
    loadedTrangChu([])
    loadedTrangChiTiet([])
  }
}


fetchApi(listtags.toString().replaceAll(",", " "), numberTrang)

