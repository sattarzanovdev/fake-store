const $container = document.querySelector('.container')
const $search = document.querySelector('.searchInput')

const BASE_URL = 'https://fakestoreapi.com/'

function getRequest(endPoint, cb) {
   fetch(`${BASE_URL}${endPoint}`)
      .then(r => r.json())
      .then(res => cb(res))
}

window.addEventListener('load', () => {
   getRequest('products', cb => {
      cardTemplate(cb)
      console.log(cb);
   })
})

$search.addEventListener('input', e => {
  let value = e.target.value.toUpperCase()
    getRequest('products', cb => {
      const filtered = cb.filter(item => item.title.toUpperCase().includes(value))
      cardTemplate(filtered)
    })
})

function cardTemplate(base) {
   const newBase = base.map(item => {
      return `
         <div class="card">
          <div class="card-header">
            <h3>
                ${item.title.length > 20 ? item.title.slice(0,15) + '...' : item.title} / ${item.price}$
            </h3>
          </div>
            <div class="card-image">
               <img src="${item.image}">
            </div>
            <div class="card-footer">
               <button onclick="getRoute('${item.id}')" class="more_btn">Buy</button>
            </div>
         </div>
      `
   }).join('')

   $container.innerHTML = newBase
}

function getRoute(id){
   getRequest(`products/${id}`, cb => {
      moreInfo(cb)
   })
 }

function moreInfo(item) {
   $container.innerHTML = `
      <div class="more_card">
         <div class="more_image">
            <img src="${item.image}">
         </div>
         <div class="more_info">
            <div class="more_title">  
               <h2>Category: ${item.title}</h2>
            </div>
            <ul class="list">
               <li>Category: ${item.category}</li>
               <li>Price: ${item.price}$</li>
               <li>Rate: ${item.rating.rate}</li>
               <li>Сount: ${item.rating.count} pieces</li>
            </ul>
            <div class="list_footer">
               <p>Description: ${item.description}</p>
            </div>
            <button class="back_btn" onclick="goBack()"><img src="https://o.remove.bg/downloads/347466ed-c7f4-4743-a493-2b3a5ea9d6c5/png-clipart-arrow-computer-icons-arrow-angle-arrow-thumbnail-removebg-preview.png"></button>
         </div>
      </div>
   `
   console.log(item);
}

function goBack() {
   window.location.reload()
}