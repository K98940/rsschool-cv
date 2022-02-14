'use strict'

const container = document.querySelector('.container')
const blocks = document.querySelectorAll('.blocks')
let block = ''
const coordContainer = container.getBoundingClientRect()
const minY = coordContainer.y
const maxY = coordContainer.bottom - 120
const minX = coordContainer.x
const maxX = coordContainer.x + coordContainer.width
const field = [
   [2, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0]
]



function ArrowDown() {
   // сместить элементы массива вниз
   for (let i = field.length - 2; i >= 0 ; i--) {
      for (let j = 0; j < field[i].length - 1; j++) {
         if (field[i + 1][j] === 0 && field[i][j] > 0) { // если нижняя клетка пустая, а верхняя не пустая
            field[i + 1][j] = field[i][j]
            field[i][j] = 0

            // найти блок с атрибутом 'ij' и сместить вниз
            block = document.querySelector('[data-xy="' + i + j + '"]')
            block.dataset.xy = `${i + 1}${j}`
            block.style.top = `${(i + 1) * 100}px`
            console.log(block.dataset.xy)
         }
      }
   }

   // blocks.forEach(elem => {
   //    const coord = elem.getBoundingClientRect()
   //    if (coord.top < maxY) {
   //       elem.style.top = `${coord.top + 96}px`
   //    }
   // })
}

function ArrowUp() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      if (coord.top > minY) {
         elem.style.top = `${coord.top - 104}px`
      }
   })
}

function ArrowRight() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      if (coord.x + 100 < maxX) {
         elem.style.left = `${coord.x - coordContainer.x + 100}px`
      }
   })
}

function ArrowLeft() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      if (coord.x > minX) {
         elem.style.left = `${coord.x - coordContainer.x - 100}px`
      }
   })
}

function keyDown(key) {
   window.removeEventListener('keydown', keyDown)
   window.addEventListener('keyup', keyUp)

   if (key.code === 'ArrowDown') { ArrowDown() }
   if (key.code === 'ArrowUp') { ArrowUp() }
   if (key.code === 'ArrowRight') { ArrowRight() }
   if (key.code === 'ArrowLeft') { ArrowLeft() }
}

function keyUp(key) {
   window.removeEventListener('keyup', keyUp)
   window.addEventListener('keydown', keyDown)
}

window.addEventListener('keydown', keyDown)