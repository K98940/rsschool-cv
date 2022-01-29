'use strict'

let theme = 'dark'

const hamburger = document.querySelector('#hamburger')
const headerNavWrapper = document.querySelector('#header-nav-wrapper')
const headerNav = document.querySelector('#header-nav')
const portfolioButtons = document.querySelector('.portfolio-btn-wrapper')
const portfolioImages = document.querySelectorAll('.portfolio-img img')
const imgZoomed = document.querySelector('.portfolio-img__zoomed')
const swTheme = document.querySelector('#swTheme') // кнопка переключения темы светлая / темная
const svg = document.querySelectorAll('#swTheme svg')
console.log(svg)


// гамбургер-меню
hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('is-active')
   headerNavWrapper.classList.toggle('nav-wrapper--active')
   headerNav.classList.toggle('header-nav--active')

   // заблокировать прокрутку / свайп экрана при открытом меню
   if (hamburger.classList.contains('is-active')) {
      document.body.style.position = 'fixed'
   } else {
      document.body.style.position = '';
   }
})

headerNavWrapper.addEventListener('click', (element => {
   if (element.target.classList.contains('nav-link')) {
      hamburger.classList.remove('is-active')
      headerNav.classList.remove('header-nav--active')
      headerNavWrapper.classList.remove('nav-wrapper--active')
      document.body.style.position = '';
   }
}))

// заблокировать "перетаскивание" иконок и картинок
document.body.addEventListener('dragstart', (event) => {
   event.preventDefault()
})

// обработка нажатий кнопок секции 'Portfolio'
portfolioButtons.addEventListener('click', (event) => {
   if (event.target.classList.contains('btn__portfolio')) {
      portfolioButtons.querySelectorAll('button').forEach(btn => {
         btn.classList.remove('btn__active')
      })
      event.target.classList.add('btn__active')
      portfolioImages.forEach((img, index) => {
         img.src = `./assets/img/portfolio/${event.target.dataset.button}/${index}.jpg`
      })
   }
})

// обработка нажатий на фотографии секции 'Portfolio'
document.addEventListener('click', event => {
   if (imgZoomed.classList.contains('portfolio-img__zoomed--active')) { //свернуть zoom
      document.body.style.overflow = 'auto'
      imgZoomed.classList.remove('portfolio-img__zoomed--active')
   }
   if (event.target.closest('.portfolio-img')) { // развернуть zoom на весь экран
      document.body.style.overflow = 'hidden'
      imgZoomed.classList.add('portfolio-img__zoomed--active')
      imgZoomed.querySelector('img').src = event.target.src
   }
})

// кнопка переключения темы светлая / темная
swTheme.addEventListener('click', event => {
   svg.forEach(elem => {
      elem.classList.toggle('visually-hidden')
   })
   if (theme === 'dark') {
      theme = 'light'
      document.documentElement.style.setProperty('--color-icon', '#000000')
      document.documentElement.style.setProperty('--background-color', '#ffffff')
      document.documentElement.style.setProperty('--background-image', 'url("../assets/img/bg_light.jpg")')
      document.documentElement.style.setProperty('--background-image-768', 'url("../assets/img/bg_768_light.jpg")')
      document.documentElement.style.setProperty('--background-contacts', 'url("../assets/img/Contacts/contacts_light.jpg")')
      document.documentElement.style.setProperty('--background-contacts-768', 'url("../assets/img/Contacts/contacts_768_light.jpg")')
      document.documentElement.style.setProperty('--color-font', '#1c1c1c')
      document.documentElement.style.setProperty('--input-background', '#ffffff8a')

      document.documentElement.style.setProperty('--btn-font-hover', '#bdae82')
      document.documentElement.style.setProperty('--btn-background', '#ffffff')
      document.documentElement.style.setProperty('--btn-2-background', '#bdae82')
      document.documentElement.style.setProperty('--btn-background-hover', '#000000')

      document.documentElement.style.setProperty('--color-title', '#1c1c1c')
   } else {
      theme = 'dark'
      document.documentElement.style.setProperty('--color-icon', '#ffffff')
      document.documentElement.style.setProperty('--background-color', '#000000')
      document.documentElement.style.setProperty('--background-image', 'url("../assets/img/bg.jpg")')
      document.documentElement.style.setProperty('--background-image-768', 'url("../assets/img/bg_768.jpg")')
      document.documentElement.style.setProperty('--background-contacts', 'url("../assets/img/Contacts/contacts.jpg")')
      document.documentElement.style.setProperty('--background-contacts-768', 'url("../assets/img/Contacts/contacts_768.jpg")')
      document.documentElement.style.setProperty('--color-font', '#ffffff')
      document.documentElement.style.setProperty('--input-background', '#0000004d')

      document.documentElement.style.setProperty('--btn-font-hover', '#ffffff')
      document.documentElement.style.setProperty('--btn-background', '#bdae82')
      document.documentElement.style.setProperty('--btn-2-background', '#000000')
      document.documentElement.style.setProperty('--btn-background-hover', '#bdae82')

      document.documentElement.style.setProperty('--color-title', '#bdae82')
   }
})