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
   [2, 0, 0, 2],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [2, 0, 0, 2]
]


function init() { // расставить блоки по массиву
   for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
         if (field[i][j] > 0) { // если элемент массива больше нуля - ставим блок в эту позицию
            const item = document.createElement('div')
            item.classList.add('blocks')
            item.textContent = field[i][j]
            item.setAttribute('data-xy', `${i}${j}`)
            item.style.top = `${i * 100}px`
            item.style.left = `${j * 100}px`
            container.insertAdjacentElement('afterbegin', item)
         }
      }
   }
}


function ArrowDown() {
   // сместить элементы массива вниз
   for (let k = 0; k < field.length; k++) {
      for (let i = field.length - 2; i >= 0; i--) { // строка
         for (let j = 0; j < field[i].length; j++) { // столбец

            if (field[i + 1][j] != field[i][j]) continue // если нижняя и верхняя клетки не равны - пропускаем

            console.log('enter')
            field[i + 1][j] = field[i][j]
            field[i][j] = 0

            // найти блок с атрибутом 'ij' и сместить вниз
            block = document.querySelector('[data-xy="' + i + j + '"]')
            block.dataset.xy = `${i + 1}${j}`
            block.style.top = `${(i + 1) * 100}px`
         }
      }
   }
}

function ArrowUp() {
   // сместить элементы массива вверх
   for (let k = 0; k < field.length; k++) {
      for (let i = 1; i < field.length; i++) {
         for (let j = 0; j < field[i].length; j++) {
            if (field[i - 1][j] === 0 && field[i][j] > 0) { // если верхняя клетка пустая, а нижняя нет
               field[i - 1][j] = field[i][j]
               field[i][j] = 0

               // найти блок с атрибутом 'ij' и сместить вверх
               block = document.querySelector('[data-xy="' + i + j + '"]')
               block.dataset.xy = `${i - 1}${j}`
               block.style.top = `${(i - 1) * 100}px`
            }
         }
      }
   }
}

function ArrowRight() {
   // сместить элементы массива вправо
   for (let k = 0; k < field.length; k++) {
      for (let i = field.length - 1; i >= 0; i--) { // столбец
         for (let j = 0; j < field[i].length; j++) { // строка
            if (field[j][i + 1] === 0 && field[j][i] > 0) { // если правая клетка пустая, а левая нет
               field[j][i + 1] = field[j][i]
               field[j][i] = 0

               // найти блок с атрибутом 'ij' и сместить вправо
               block = document.querySelector('[data-xy="' + j + i + '"]')
               block.dataset.xy = `${j}${i + 1}`
               block.style.left = `${(i + 1) * 100}px`
            }
         }
      }
   }
}

function ArrowLeft() {
   // сместить элементы массива влево
   for (let k = 0; k < field.length; k++) {
      for (let i = field.length - 1; i >= 0; i--) { // столбец
         for (let j = 0; j < field[i].length; j++) { // строка
            if (field[j][i - 1] === 0 && field[j][i] > 0) { // если левая клетка пустая, а правая нет
               field[j][i - 1] = field[j][i]
               field[j][i] = 0

               // найти блок с атрибутом 'ij' и сместить влево
               block = document.querySelector('[data-xy="' + j + i + '"]')
               block.dataset.xy = `${j}${i - 1}`
               block.style.left = `${(i - 1) * 100}px`
            }
         }
      }
   }
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
window.onload = init()