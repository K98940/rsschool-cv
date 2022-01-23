'use strict'

const hamburger = document.querySelector('#hamburger')
const headerNavWrapper = document.querySelector('#header-nav-wrapper')
const headerNav = document.querySelector('#header-nav')
const portfolioButtons = document.querySelector('.portfolio-btn-wrapper')
const portfolioImages = document.querySelectorAll('.portfolio-img img')
const imgZoomed = document.querySelector('.portfolio-img__zoomed')


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
      if (event.target.innerHTML === 'Winter') {
         event.target.classList.add('btn__active')
         portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/portfolio/winter/${index}.jpg`
         })
      }
      if (event.target.innerHTML === 'Spring') {
         event.target.classList.add('btn__active')
         portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/portfolio/spring/${index}.jpg`
         })
      }
      if (event.target.innerHTML === 'Summer') {
         event.target.classList.add('btn__active')
         portfolioImages.forEach((img, index) => {
            img.src = `./assets/img/portfolio/summer/${index}.jpg`
         })
      }
   }
})

// обработка нажатий на фотографии секции 'Portfolio'
document.addEventListener('click', event => {
   console.log(event.target)
   console.log(event.target.closest('.portfolio-img'))
   console.log(event.clientX, event.clientY)

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