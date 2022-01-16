'use strict'

const hamburger = document.querySelector('#hamburger')
const headerNavWrapper = document.querySelector('#header-nav-wrapper')
const headerNav = document.querySelector('#header-nav')

hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('is-active')
   headerNavWrapper.classList.toggle('nav-wrapper--active')
   headerNav.classList.toggle('header-nav--active')

   if (hamburger.classList.contains('is-active')) { // заблокировать прокрутку / свайп экрана при открытом меню
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

document.body.addEventListener('dragstart', (event) => { // заблокировать "перетаскивание" иконок и картинок
   event.preventDefault()
})