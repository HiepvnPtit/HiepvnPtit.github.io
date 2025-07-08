let local_api = JSON.parse(localStorage.getItem('data_id_img_api'))
let local_admin = JSON.parse(localStorage.getItem('data_id_admin'))


function Tao_khoi_tu_dong(n, arr, arr1) {

  if ((img_item_api_0_a.style.width == '100%')) {
    Tao_khoi_tu_dong_1(0)
    document.querySelector('#right_div_a-right_div_b-right_div_1').innerHTML = ''
    document.querySelector('#right_div_a-right_div_b-right_div_2').innerHTML = ''
    Right_div_3.innerHTML = ''

  } else {

    if (true) {
      const new_div = arr.slice(0, n + 20).map((item) => {
        var name_a = item.tags.substring(0, 20)
        if (local_admin[0].id_xoa.includes(item.id)) {
          return ''
        } else {

          return `<button class="right_div_b-right_div_1-button_1" id="${item.id}" onclick="Tao_khoi_tu_dong_1(${item.id})">
                  <div class='img_0_a'>
                    <img class='img_0' src="${item.preview_url}">
                  </div>
                  <div class='img_0_b'>
                   <img class='img_0_b_0' src="${item.preview_url}">
                    <div class='img_0_b_1'>${name_a}...</div>
                  </div></button>`}
      }).join('');
      document.querySelector('#right_div_a-right_div_b-right_div_1').innerHTML = new_div
      Right_div_b.scrollTop = 0
    }
    if (true) {
      const new_div = arr.slice(n + 20, n + 35).map((item) => {
        if (local_admin[0].id_xoa.includes(item.id)) {
          return ''
        } else {

          return `<button class="right_div_b-right_div_2-button_2" id="${item.id}" onclick="Tao_khoi_tu_dong_1(${item.id})"><img class='img_0' src="${item.file_url}"></button>`
        }
      }).join('');
      document.querySelector('#right_div_a-right_div_b-right_div_2').innerHTML = new_div
    }
    if (true) {
      const new_div = arr.slice(n + 35, Data_Api.length).map((item) => {
        if (local_admin[0].id_xoa.includes(item.id)) {
          return ''
        } else {

          return `<button class="right_div_a-right_div_3-button_3" id="${item.id}" onclick="Tao_khoi_tu_dong_1(${item.id})">   <img class='img_0' src="${item.file_url}"></button>`
        }
      }).join('');
      Right_div_3.innerHTML = new_div
      Right_div_3.scrollTop = 0
    }
    localStorage.setItem('data_id_img_api', JSON.stringify([{
      "id_item_view": null,
      "tag_api_0": Array.from(Input_tags.querySelectorAll("li")).map(li => li.textContent.trim()),
      "Y_trang": y_trang_0,
      "img_api_id_view": '100%'
    }]));
    local_api = JSON.parse(localStorage.getItem('data_id_img_api'))
    local_admin = JSON.parse(localStorage.getItem('data_id_admin'))
  }




}
function tags_id_input(tags_id) {
  selectSuggestion(tags_id)
  handleSearch()
  img_item_api_0_a.style.width = '1px'
}
function Tao_khoi_tu_dong_1(id_a) {


  img_item_api_0_a.style.width = '100%'
  img_item_api_0_a.scrollTop = 0
  let img_item_api_0__item_img_api_item = ''
  img_item_api_0_item_img_img.innerHTML = ''
  img_item_api_0_item_img_item.innerHTML = ''
  img_item_api_0_item_img_item_item.innerHTML = ''

  if (id_a === 0) {
    id_a = local_api[0].id_item_view


  }
  for (let id_img = 0; id_img < Data_Api.length; id_img++) {


    if (Data_Api[id_img].id != id_a && !local_admin[0].id_xoa.includes(Data_Api[id_img].id)) {
      img_item_api_0__item_img_api_item += `<button class="right_div_b-right_div_1-button_1" id="${Data_Api[id_img].id}" onclick="Tao_khoi_tu_dong_1(${Data_Api[id_img].id})">
                  <div class='img_0_a'>
                    <img class='img_0' src="${Data_Api[id_img].preview_url}">
                  </div>
                  <div class='img_0_b'>
                   <img class='img_0_b_0' src="${Data_Api[id_img].preview_url}">
                    <div class='img_0_b_1'>${Data_Api[id_img].tags.substring(0, 20)}...</div>
                  </div></button>`
    } else if (!local_admin[0].id_xoa.includes(Data_Api[id_img].id)) {
      let as = Data_Api[id_img].tags
      let div_tags = ''
      as = as.split(" ")
      for (let i_tags = 0; i_tags < as.length; i_tags++) {
        div_tags += `<button class="img_item_api_0-item_img-item_div" onclick="selectSuggestion('${as[i_tags]}')" style="background-color:rgb(${randon_color()},${randon_color()},${randon_color()})">${as[i_tags]}</button>`
      }
      img_item_api_0_item_img_img.innerHTML = `<button class="img_item_api_0-item_img-img_a" id="${Data_Api[id_img].id}" style="margin: 0px"><img class='img_0' src="${Data_Api[id_img].file_url}"></button>`
      img_item_api_0_item_img_item.innerHTML = div_tags
      img_item_api_0_item_img_item_item.innerHTML = `<p>owner : ${Data_Api[id_img].owner}</p><p> change : ${Data_Api[id_img].change}</p><p>id : ${Data_Api[id_img].id} - size : ${Data_Api[id_img].width} x ${Data_Api[id_img].height}</p><p>status : ${Data_Api[id_img].status}</p><p>rating : ${Data_Api[id_img].rating}</p><p>comment_count : ${Data_Api[id_img].comment_count}</p>`

    }
  }
  img_item_api_0__item_img_api.innerHTML = img_item_api_0__item_img_api_item

  localStorage.setItem('data_id_img_api', JSON.stringify([{
    "id_item_view": id_a,
    "tag_api_0": Array.from(Input_tags.querySelectorAll("li")).map(li => li.textContent.trim()),
    "Y_trang": y_trang_0,
    "img_api_id_view": '100%'
  }]));
  local_api = JSON.parse(localStorage.getItem('data_id_img_api'))
  local_admin = JSON.parse(localStorage.getItem('data_id_admin'))
}

