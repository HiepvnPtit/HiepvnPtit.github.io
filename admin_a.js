
   

  document.addEventListener('DOMContentLoaded', function () {
    
    
    if (!scrollContainer || !bgImage) return;
    let timeoutId = null;
    

    scrollContainer.addEventListener('scroll', function () {
      if ((scrollContainer.scrollTop > 200 &&  220 > scrollContainer.scrollTop)) {
   
        bgImage.setAttribute('src', 'backg/404-13.gif' );


        if (timeoutId) clearTimeout(timeoutId);

   
        timeoutId = setTimeout(function () {
          bgImage.setAttribute('src','backg/Distorted_Fate.webp');
          }, 200);
        }
      });
    });
const scrollContainer = document.getElementById('right_div_a-right_div_b');

const bgImage = document.getElementById('backg_eror');
window.Data_Api = null;
let Right_div_b=document.getElementById("right_div_a-right_div_b")
let Right_div_3=document.querySelector('#right_div_a-right_div_3')
let Input_tags = document.getElementById('input_tags')
let input = document.getElementById("text");
let suggestionsBox = document.getElementById("suggestions");
let img_item_api_0_a = document.getElementById("img_item_api_0")
let img_item_api_0_item_img = document.getElementById("img_item_api_0-item_img")
let img_item_api_0_item_img_img = document.getElementById("img_item_api_0-item_img-img")
let img_item_api_0_item_img_item = document.getElementById("img_item_api_0-item_img-item")
let img_item_api_0_item_img_item_item = document.getElementById("img_item_api_0-item_img-item__item")
let img_item_api_0__item_img_api = document.getElementById("img_item_api_0-_item_img_api")
let Left_div_js = document.getElementById("left_div")
let new_ing_src = document.getElementById("scr_img_new")
let tag_img_name = document.getElementById("tag_img_new")
let sh_new_img =document.getElementById("sh_img_new")
let index = 0;
let selectedTags = []
let y_trang_0
let input_vopy_calue = ''
let allTags = [];
img_item_api_0_a.style.width='100%'
let id_item_view_tktd = 0
if(true){
  try {
  const local_api=JSON.parse(localStorage.getItem('data_id_img_api'))
  y_trang_0=local_api[0].Y_trang
  id_item_view_tktd=(local_api[0].id_item_view)
  
  if (local_api[0].tag_api_0!=[]){
    for(let i_loading_tags = 0 ; i_loading_tags < local_api[0].tag_api_0.length;i_loading_tags++)
      selectSuggestion(local_api[0].tag_api_0[i_loading_tags])
      handleSearch()
   
  }
  } catch (error) {
    y_trang_0=0
      localStorage.setItem('data_id_img_api', JSON.stringify([{ 
          "id_item_view": 0 ,
          "tag_api_0":[],
          "Y_trang":y_trang_0,
          "img_api_id_view":'100%'}]))
      
  }
}
if(localStorage.getItem('data_id_admin')) {
  const local_admin=JSON.parse(localStorage.getItem('data_id_admin'))
}  else {
  localStorage.setItem('data_id_admin', JSON.stringify([{
        "id_xoa":[],
       "da_xoa": [],
       "them" : []
        }]))
}
const text_info= document.getElementById('info')
text_info.innerHTML=`${y_trang_0+1}`
document.addEventListener("click",function () {
  suggestionsBox.innerHTML=''
} )
  document.getElementById("btn_search").addEventListener("click", handleSearch);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        handleSearch();
      }
    });
let y_trang_0_copy = 0

function tiepTheo(x_trang){
  const text_info= document.getElementById('info')
  
  if(x_trang==null){
    y_trang_0=0
    loading_trang(y_trang_0)

    text_info.innerHTML=`${y_trang_0+1}`
  }else if(x_trang == 'ero' ){
    y_trang_0-=1
    input_vopy_calue=''
    Home_web()
    
    
  }else {
    y_trang_0+=x_trang
    if (y_trang_0<0){
      y_trang_0=0
    }
    loading_trang(y_trang_0)

    text_info.innerHTML=`${y_trang_0+1}`

  }

  
}


function handleSearch() {
  // Lấy các tag đã chọn
  
  selectedTags = Array.from(Input_tags.querySelectorAll("li")).map(li => li.textContent.trim());

  input_vopy_calue=''
  // Lấy nội dung đang gõ nếu có
  const typed = input.value.trim();
  if (typed && !selectedTags.includes(typed)) {
    selectedTags.push(typed);
  }

  // Ghép tất cả thành chuỗi tag
  const tagString = selectedTags.join(' ');

  // Gán vào ô input để loading_trang đọc được
  input_vopy_calue = tagString;

  // Reset input field sau khi search
  input.focus();
  suggestionsBox.innerHTML = '';

  // Chạy tìm kiếm
  tiepTheo(null);
  // Input_tags.innerHTML=''
  input.value=''

}


function handleInput(e) {
  const query = e.target.value.toLowerCase();

  let suggestions = [];
  if (query !== "") {
    suggestions = allTags
      .filter(item => item.toLowerCase().includes(query))
      .slice(0, 100); // Giới hạn gợi ý
  }

  const suggestionsHTML = suggestions.map(item =>
    `<li  class="input_tags_li" onclick="selectSuggestion('${item}')">${item}</li>`
  ).join("");

  suggestionsBox.innerHTML = suggestionsHTML;
}
function search_tag(_ass) {
  allTags = _ass;

  if (!input._listenerAdded) {
    input.addEventListener("input", handleInput);
    input._listenerAdded = true;
  }
}


fetch('img_tags_beta.json')
    .then(response => response.json())
    .then(_ass => {
      search_tag(_ass)
    })
// Đặt bên ngoài để global
function selectSuggestion(value) {
  const tags = Array.from(Input_tags.querySelectorAll("li")).map(li => li.textContent);
  if (!tags.includes(value)) {
    const li = document.createElement("li");
    li.className = "input_tags_li";
    li.style.backgroundColor=`rgb(${randon_color()},${randon_color()},${randon_color()})`
    li.style.color="white"
    li.textContent = value;
    li.addEventListener('click',function(){
      Input_tags.removeChild(li)
    })
    Input_tags.appendChild(li);
    
  }
  

  input.value = '';
  suggestionsBox.innerHTML = '';
  input.focus();
  input.dispatchEvent(new Event('input'));
}
function Home_web(){
  
  
  input.value=''
  y_trang_0=0
  Input_tags.innerHTML=''
  handleSearch()
}
function reset_xoa(){
  local_admin[0].id_xoa=[]
  local_admin[0].da_xoa=[]
  local_admin[0].them=[]
   localStorage.setItem('data_id_admin', JSON.stringify(local_admin));
}
function new_img(){
  local_admin[0].them.push({
    change: 0,
    comment_count: 0,
    directory: 0,
    file_url: new_ing_src.value,
    has_notes: false,
    hash: "4ea5cad1294192ac6dfb54533308cd47",
    height: 2000,
    id: 1000+ local_admin[0].them.length,
    image: new_ing_src.value,
    owner: sh_new_img.value,
    parent_id: 0,
    preview_url: new_ing_src.value,
    rating: "general",
    sample: true,
    sample_height: 850,
    sample_url:new_ing_src.value,
    sample_width: 850,
    score: 1,
    source: new_ing_src.value,
    status: "active",
    tags: tag_img_name.value,
    tags_list: tag_img_name.value.split(" "),
    width: 2000

  })
  localStorage.setItem('data_id_admin', JSON.stringify(local_admin));
  alert("cap nhat thanh cong")
}

function xoa_id_img(){
 
  for(let id_img_xoa=0;id_img_xoa<Data_Api.length;id_img_xoa++){
    if (Data_Api[id_img_xoa].id == local_api[0].id_item_view && !local_admin[0].id_xoa.includes(Data_Api[id_img_xoa].id)){
      local_admin[0].da_xoa.push(Data_Api[id_img_xoa])

    }
  }
   if(!local_admin[0].id_xoa.includes(local_api[0].id_item_view)){
  local_admin[0].id_xoa.push(local_api[0].id_item_view)
  
  }
  localStorage.setItem('data_id_admin', JSON.stringify(local_admin));
  Tao_khoi_tu_dong(0, window.Data_Api,[])
}
function Back_out_img(){
  
  
  
  tiepTheo(0)
}
function isContiguousSublist(sub, full) {
    const subStr = sub.join(',');
    const fullStr = full.join(',');
    return fullStr.includes(subStr);
}

let api_data_new =[]

    async function loading_trang(y_trang_1) {
      
      const btn_0 = input_vopy_calue.trim();
      const btn_1 = 50


      try {
        const url = `https://safebooru.org/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(btn_0)}&limit=${btn_1}&pid=${y_trang_1}`;
        const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`;
        const response = await fetch(proxyUrl);
   
        const text = await response.text();  // codetabs trả về dạng text gốc
        try{
        var api_data_new =[]
          for(let new_img_them = 0;new_img_them<local_admin[0].them.length;new_img_them++){
            
            if(isContiguousSublist(local_admin[0].them[new_img_them].tags_list,selectedTags ) && y_trang_1==0){
              api_data_new.push(local_admin[0].them[new_img_them])

            }
            
          }
           
        }catch (e) {}
        let data = JSON.parse(text);  
        window.Data_Api = api_data_new.concat(data);
             // sau đó ta mới parse

        if ( window.Data_Api.length === 0) {
          alert("Hết ảnh hoặc không có ảnh phù hợp.");
          
          return tiepTheo(-1);
        }

        let img_html = '';
        Tao_khoi_tu_dong(0,  window.Data_Api,[])
 
      } catch (e) {
        console.error("Lỗi:", e);
       
        alert("Không tìm được ảnh đạt yêu cầu! Vui lòng tìm ảnh khác");
        
        return tiepTheo('ero');
        
      }
      
    }
    
    
    loading_trang(y_trang_0).then(() => {
  
});
function randon_color(){
  return Math.floor(Math.random() * (255 - 100)) + 100;
}

    