// let url = `http://www.omdbapi.com/?apikey=852b08f0&s=matrix`
let url = ``
let res = ''
let data
const searchInput = document.querySelector('.search-input')
const main = document.querySelector('.main')
const btnClear = document.querySelector('.header-btn-clear')


window.addEventListener('load', () => {
   data = restoreData()
   showData(data)
})

function showError(err) {
   alert(err)
}

function showData(data) {
   if (typeof data === 'undefined') {
      showError(`нет данных для отображения`)
      return
   }
   if (data.Response === 'False') {
      showError(`нет данных для отображения`)
      return
   }

   main.innerHTML = ''
   data.Search.forEach((obj) => { // создаем карточки из полученного массива
      const item = document.createElement('div')
      item.classList.add('item')

      const poster = document.createElement('div')
      poster.classList.add('item-poster')
      poster.style.background = `url(${obj.Poster}) 0 0 / cover no-repeat`

      const title = document.createElement('div')
      title.classList.add('item-title')
      title.textContent = obj.Title

      item.insertAdjacentElement('afterbegin', title)
      item.insertAdjacentElement('afterbegin', poster)
      main.insertAdjacentElement('afterbegin', item)
   })
}


function saveData(data) {
   if (typeof data === 'undefined') {
      return
   }
   if (data.Response === 'False') {
      return
   }

   localStorage.setItem('search', JSON.stringify(data))
}


function restoreData() {
   return JSON.parse(localStorage.getItem('search'))
}



async function getData() {
   res = await fetch(url)
   data = await res.json()
}

async function search(event) {
   if (event.key != 'Enter') return
   url = `http://www.omdbapi.com/?apikey=852b08f0&s=${searchInput.value}`
   await getData()
   showData(data)
   saveData(data)
}

searchInput.addEventListener('keydown', search)

btnClear.addEventListener('click', () => {
   searchInput.value = ''
})