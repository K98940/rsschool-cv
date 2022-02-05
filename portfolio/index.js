'use strict'

let theme = 'dark'
let language = 'en'
let curTime = 0

const hamburger = document.querySelector('#hamburger')
const headerNavWrapper = document.querySelector('#header-nav-wrapper')
const headerNav = document.querySelector('#header-nav')
const portfolioButtons = document.querySelector('.portfolio-btn-wrapper')
const portfolioImages = document.querySelectorAll('.portfolio-img img')
const imgZoomed = document.querySelector('.portfolio-img__zoomed')
const swTheme = document.querySelector('#swTheme') // кнопка переключения темы светлая / темная
const svg = document.querySelectorAll('#swTheme svg')
const switchs = document.querySelector('.switchs')
// video player
const videoWrapper = document.querySelector('.video-wrapper')
const player = document.querySelector('.player')
const playerButton = document.querySelector('.player-button')
const playerTime = document.querySelector('.player-time span')
const progressFill = document.querySelector('.player-progress-fill')
const playerProgress = document.querySelector('.player-progress')
const progressSpan = document.querySelector('.progress-span')
const playerVolume = document.querySelector('.player-volume')
const playerMute = document.querySelector('.player-mute')



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

//переключение темы
function setTheme() {
   if (theme === 'dark') {
      svg[0].classList.add('visually-hidden') // спрятать / показать иконку текущей темы
      svg[1].classList.remove('visually-hidden')
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
      document.documentElement.style.setProperty('--color-placeholder', '#00000060')
      document.documentElement.style.setProperty('--color-placeholder-hover', '#000000')
   } else {
      svg[0].classList.remove('visually-hidden')
      svg[1].classList.add('visually-hidden')

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
      document.documentElement.style.setProperty('--color-placeholder', '#ffffff60')
      document.documentElement.style.setProperty('--color-placeholder-hover', '#bdae82')
   }
}

// кнопка переключения темы светлая / темная
swTheme.addEventListener('click', event => {
   theme = theme === 'dark' ? 'light' : 'dark'
   setTheme()
   localStorage.setItem('theme', theme) // сохранить состояние 
})



//переключение языка
function getTranslate(lang) {
   const eng = switchs.querySelector('.sw-eng')
   const ru = switchs.querySelector('.sw-ru')
   const i18Obj = {
      'en': {
         'skills': 'Skills',
         'portfolio': 'Portfolio',
         'video': 'Video',
         'price': 'Price',
         'contacts': 'Contacts',
         'hero-title': 'Alexa Rise',
         'hero-text': 'Save sincere emotions, romantic feelings and happy moments of life together with professional photographer Alexa Rise',
         'hire': 'Hire me',
         'skill-title-1': 'Digital photography',
         'skill-text-1': 'High-quality photos in the studio and on the nature',
         'skill-title-2': 'Video shooting',
         'skill-text-2': 'Capture your moments so that they always stay with you',
         'skill-title-3': 'Rotouch',
         'skill-text-3': 'I strive to make photography surpass reality',
         'skill-title-4': 'Audio',
         'skill-text-4': 'Professional sounds recording for video, advertising, portfolio',
         'winter': 'Winter',
         'spring': 'Spring',
         'summer': 'Summer',
         'autumn': 'Autumn',
         'price-description-1-span-1': 'One location',
         'price-description-1-span-2': '120 photos in color',
         'price-description-1-span-3': '12 photos in retouch',
         'price-description-1-span-4': 'Readiness 2-3 weeks',
         'price-description-1-span-5': 'Make up, visage',
         'price-description-2-span-1': 'One or two locations',
         'price-description-2-span-2': '200 photos in color',
         'price-description-2-span-3': '20 photos in retouch',
         'price-description-2-span-4': 'Readiness 1-2 weeks',
         'price-description-2-span-5': 'Make up, visage',
         'price-description-3-span-1': 'Three locations or more',
         'price-description-3-span-2': '300 photos in color',
         'price-description-3-span-3': '50 photos in retouch',
         'price-description-3-span-4': 'Readiness 1 week',
         'price-description-3-span-5': 'Make up, visage, hairstyle',
         'order': 'Order shooting',
         'contact-me': 'Contact me',
         'send-message': 'Send message',
         'phone': 'Phone',
         'message': 'Message'
      },
      'ru': {
         'skills': 'Навыки',
         'portfolio': 'Портфолио',
         'video': 'Видео',
         'price': 'Цены',
         'contacts': 'Контакты',
         'hero-title': 'Алекса Райс',
         'hero-text': 'Сохраните искренние эмоции, романтические переживания и счастливые моменты жизни вместе с профессиональным фотографом',
         'hire': 'Пригласить',
         'skill-title-1': 'Фотография',
         'skill-text-1': 'Высококачественные фото в студии и на природе',
         'skill-title-2': 'Видеосъемка',
         'skill-text-2': 'Запечатлите лучшие моменты, чтобы они всегда оставались с вами',
         'skill-title-3': 'Ретушь',
         'skill-text-3': 'Я стремлюсь к тому, чтобы фотография превосходила реальность',
         'skill-title-4': 'Звук',
         'skill-text-4': 'Профессиональная запись звука для видео, рекламы, портфолио',
         'winter': 'Зима',
         'spring': 'Весна',
         'summer': 'Лето',
         'autumn': 'Осень',
         'price-description-1-span-1': 'Одна локация',
         'price-description-1-span-2': '120 цветных фото',
         'price-description-1-span-3': '12 отретушированных фото',
         'price-description-1-span-4': 'Готовность через 2-3 недели',
         'price-description-1-span-5': 'Макияж, визаж',
         'price-description-2-span-1': 'Одна-две локации',
         'price-description-2-span-2': '200 цветных фото',
         'price-description-2-span-3': '20 отретушированных фото',
         'price-description-2-span-4': 'Готовность через 1-2 недели',
         'price-description-2-span-5': 'Макияж, визаж',
         'price-description-3-span-1': 'Три локации и больше',
         'price-description-3-span-2': '300 цветных фото',
         'price-description-3-span-3': '50 отретушированных фото',
         'price-description-3-span-4': 'Готовность через 1 неделю',
         'price-description-3-span-5': 'Макияж, визаж, прическа',
         'order': 'Заказать съемку',
         'contact-me': 'Свяжитесь со мной',
         'send-message': 'Отправить',
         'phone': 'Телефон',
         'message': 'Сообщение'
      }
   }

   // перевод
   document.querySelectorAll('[data-i18n]').forEach(elem => {
      if (elem.placeholder) {
         elem.placeholder = i18Obj[lang][elem.dataset.i18n]
      } else {
         elem.innerHTML = i18Obj[lang][elem.dataset.i18n]
      }

   })

   // повесить актив на нужный язык
   if (lang === 'en') {
      eng.classList.add('active')
      ru.classList.remove('active')
   } else {
      eng.classList.remove('active')
      ru.classList.add('active')
   }
}



// перевод страницы
switchs.addEventListener('click', () => {
   language = language === 'en' ? 'ru' : 'en'
   localStorage.setItem('language', language) // сохранить состояние
   getTranslate(language)
})



//загрузка страницы, восстановление сохраненных состояний
window.addEventListener('load', () => {
   if (localStorage.getItem('language')) {
      language = localStorage.getItem('language')
      getTranslate(language)
   }

   if (localStorage.getItem('theme')) {
      theme = localStorage.getItem('theme')
      setTheme()
   }

   if (localStorage.getItem('curTime')) {
      curTime = localStorage.getItem('curTime')
      player.currentTime = curTime
      progressFill.style.width = `${curTime / localStorage.getItem('videoDuration') * 100}%`
   }

   if (localStorage.getItem('volume')) {
      player.volume = localStorage.getItem('volume')
      playerVolume.value = player.volume
      playerVolume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${playerVolume.value * 100}%, #fff ${playerVolume.value * 100}%, white 100%)`
   }

   if (localStorage.getItem('mute') === 'true') {
      if (localStorage.getItem('mute')) {
         player.volume = 0
         playerMute.classList.add('mute')
      }
   }

})


// video player
function secondsToTime(time) {
   let h = Math.floor(time / (60 * 60))
   let dm = time % (60 * 60)
   let m = Math.floor(dm / 60)
   let ds = dm % 60
   let s = Math.ceil(ds)
   let fulltime = ''

   if (s === 60) {
      s = 0
      m = m + 1
   }
   if (s < 10) {
      s = '0' + s
   }
   if (m === 60) {
      m = 0
      h = h + 1
   }
   if (m < 10) {
      m = '0' + m
   }
   if (h === 0) {
      fulltime = m + ':' + s
   } else {
      fulltime = h + ':' + m + ':' + s
   }
   return fulltime;
}



function updateButton() {
   const icon = this.paused ? '\u25B6' : '\u2016'
   playerButton.textContent = icon
}



function togglePlay() {
   const method = player.paused ? 'play' : 'pause'
   player[method]()
}



function updateProgress() {
   let t = Math.trunc(player.currentTime)

   if ((t % 10 === 0) && (curTime != t)) { // сохранить состояние каждые 10 сек
      localStorage.setItem('curTime', t)
      localStorage.setItem('videoDuration', player.duration)
      curTime = t
   }

   playerTime.textContent = `${secondsToTime(t)} : ${secondsToTime(player.duration)}` // показать текущее время воспроизведения
   progressFill.style.width = `${t / player.duration * 100}%`
}



function scrub(event) {
   const scrubTime = (event.offsetX / playerProgress.offsetWidth) * player.duration
   player.currentTime = scrubTime
}


function showTime(event) {
   const scrubTime = (event.offsetX / playerProgress.offsetWidth) * player.duration
   progressSpan.textContent = secondsToTime(scrubTime)
}


function changeVolume() {
   player.volume = playerVolume.value
   console.log(playerVolume.value)
   localStorage.setItem('volume', player.volume)
   playerVolume.style.background = `linear-gradient(to right, #bdae82 0%, #bdae82 ${playerVolume.value * 100}%, #fff ${playerVolume.value * 100}%, white 100%)`
   playerMute.classList.remove('mute')
   localStorage.setItem('mute', playerMute.classList.contains('mute'))
}


function muteVolume() {
   player.volume = (player.volume > 0) ? 0 : playerVolume.value
   playerMute.classList.toggle('mute')
   localStorage.setItem('mute', playerMute.classList.contains('mute'))
}


player.addEventListener('click', togglePlay)
playerButton.addEventListener('click', togglePlay)
player.addEventListener('play', updateButton)
player.addEventListener('pause', updateButton)
player.addEventListener('timeupdate', updateProgress)
playerProgress.addEventListener('click', scrub)
playerProgress.addEventListener('mousemove', showTime)
playerVolume.addEventListener('input', changeVolume)
playerMute.addEventListener('click', muteVolume)

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
