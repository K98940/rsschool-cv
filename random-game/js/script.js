'use strict'

let block = ''
let score = 0
const container = document.querySelector('.container')
const blocks = document.querySelectorAll('.blocks')
const coordContainer = container.getBoundingClientRect()
const minY = coordContainer.y
const maxY = coordContainer.bottom - 120
const minX = coordContainer.x
const maxX = coordContainer.x + coordContainer.width
const field = [
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 2]
]


function addBlock(index) { // index - индекс пустой ячейки
   console.log(index)
   if (index === '-1') {
      window.removeEventListener('keydown', keyDown)
      alert('GAME OVER!')
      console.log('GAME OVER!')
      return
   }
   const item = document.createElement('div')
   field[index[0]][index[1]] = 2
   item.textContent = field[index[0]][index[1]]
   item.setAttribute('data-xy', `${index[0]}${index[1]}`)
   item.classList.add('blocks')
   
   item.style.top = `${index[0] * 100}px`
   item.style.left = `${index[1] * 100}px`
   container.insertAdjacentElement('afterbegin', item)
}


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
      for (let i = field.length - 2; i >= 0; i--) { // строка, идем снизу вверх
         for (let j = 0; j < field[i].length; j++) { // столбец
            if (field[i][j] === 0) continue // если текущий элемент равен нулю, здесь делать нечего
            block = document.querySelector('[data-xy="' + i + j + '"]')

            if (field[i + 1][j] === field[i][j]) { // переместить значение: если верхняя и нижняя ячейки совпадают 
               score += field[i][j] // плюсуем очки
               field[i + 1][j] = field[i][j] * 2 // то удвоить значение блока
               field[i][j] = 0 // а текущий блок обнулить

               block.remove() // лишний div с атрибутом 'ij' удалить
               block = document.querySelector(`[data-xy="${i + 1}${j}"]`) // а блоку ниже сделать
               block.textContent = field[i + 1][j] // новое значение
               block.style.backgroundColor = `hsl(${field[i + 1][j] * 50}, 80%, 50%)`
            } else if (field[i + 1][j] === 0) { // иначе, если внизу ноль
               field[i + 1][j] = field[i][j] // просто перенести из верхней ячейки в нижнюю
               field[i][j] = 0 // а текущий блок обнулить
            } else continue // если нижняя ячейка не пустая - div вниз не перемещаем


            block.dataset.xy = `${i + 1}${j}` // изменить аттрибут
            block.style.top = `${(i + 1) * 100}px` // div с атрибутом 'ij' сместить вниз

         }
      }
   }
}

function ArrowUp() {
   // сместить элементы массива вверх
   for (let k = 0; k < field.length; k++) {
      for (let i = 1; i < field.length; i++) { // строка, идем с 1 строки до последней
         for (let j = 0; j < field[i].length; j++) { // столбец
            if (field[i][j] === 0) continue // если текущий элемент равен нулю, здесь делать нечего
            block = document.querySelector('[data-xy="' + i + j + '"]')

            if (field[i - 1][j] === field[i][j]) { // переместить значение: если текущая и нижняя ячейки совпадают 
               score += field[i][j] // плюсуем очки
               field[i - 1][j] = field[i][j] * 2 // то удвоить значение блока
               field[i][j] = 0 // а текущий блок обнулить

               block.remove() // лишний div с атрибутом 'ij' удалить
               block = document.querySelector(`[data-xy="${i - 1}${j}"]`) // а блоку выше сделать
               block.textContent = field[i - 1][j] // новое значение
               block.style.backgroundColor = `hsl(${field[i - 1][j] * 50}, 80%, 50%)`
            } else if (field[i - 1][j] === 0) { // иначе, если вверху ноль
               field[i - 1][j] = field[i][j] // просто перенести из нижней ячейки в верхнюю
               field[i][j] = 0 // а текущий блок обнулить
            } else continue // если верхняя ячейка не пустая - div вверх не перемещаем

            // найти блок с атрибутом 'ij' и сместить вверх
            block.dataset.xy = `${i - 1}${j}`
            block.style.top = `${(i - 1) * 100}px`
         }
      }
   }
}

function ArrowRight() {
   // сместить элементы массива вправо
   for (let k = 0; k < field.length; k++) {
      for (let i = field.length - 1; i >= 0; i--) { // столбец, идем с права на лево
         for (let j = 0; j < field[i].length; j++) { // строка, идем с верху вниз
            if (field[j][i] === 0) continue // если текущий элемент равен нулю, здесь делать нечего
            block = document.querySelector('[data-xy="' + j + i + '"]')

            if (field[j][i + 1] === field[j][i]) { // переместить если текущая ячейка и ячейка справа совпадают 
               score += field[i][j] // плюсуем очки
               field[j][i + 1] = field[j][i] * 2 // то удвоить значение блока
               field[j][i] = 0 // а текущий блок обнулить

               block.remove() // лишний div с атрибутом 'ij' удалить
               block = document.querySelector(`[data-xy="${j}${i + 1}"]`) // а блоку справа сделать
               block.textContent = field[j][i + 1] // новое значение
               block.style.backgroundColor = `hsl(${field[j][i + 1] * 50}, 80%, 50%)`
            } else if (field[j][i + 1] === 0) { // иначе, если справа ноль
               field[j][i + 1] = field[j][i] // просто перенести из текущей ячейки в правую
               field[j][i] = 0 // а текущий блок обнулить
            } else continue // если правая ячейка не пустая - div вправо не перемещаем

            // найти блок с атрибутом 'ij' и сместить вправо
            block.dataset.xy = `${j}${i + 1}`
            block.style.left = `${(i + 1) * 100}px`
         }
      }
   }
}

function ArrowLeft() {
   // сместить элементы массива влево
   for (let k = 0; k < field.length; k++) {
      for (let i = 1; i < field.length; i++) { // столбец, идем слева на право
         for (let j = 0; j < field[i].length; j++) { // строка, идем с верху вниз
            if (field[j][i] === 0) continue // если текущий элемент равен нулю, здесь делать нечего
            block = document.querySelector('[data-xy="' + j + i + '"]')

            if (field[j][i - 1] === field[j][i]) { // переместить если текущая ячейка и ячейка слева совпадают 
               score += field[i][j] // плюсуем очки
               field[j][i - 1] = field[j][i] * 2 // то удвоить значение блока
               field[j][i] = 0 // а текущий блок обнулить

               block.remove() // лишний div с атрибутом 'ij' удалить
               block = document.querySelector(`[data-xy="${j}${i - 1}"]`) // а блоку слева сделать
               block.textContent = field[j][i - 1] // новое значение
               block.style.backgroundColor = `hsl(${field[j][i - 1] * 50}, 80%, 50%)`
            } else if (field[j][i - 1] === 0) { // иначе, если слева ноль
               field[j][i - 1] = field[j][i] // просто перенести из текущей ячейки в левую
               field[j][i] = 0 // а текущий блок обнулить
            } else continue // если левая ячейка не пустая - div влево не перемещаем


            // найти блок с атрибутом 'ij' и сместить влево
            block.dataset.xy = `${j}${i - 1}`
            block.style.left = `${(i - 1) * 100}px`
         }
      }
   }
}



function addNewBlock() { // добавить новый блок на игровое поле
   function getRandomCell() { // получить случайные координаты для новго блока
      let x = Math.random()
      const arrEmpty = []

      // сформировать массив индексов нулевых элементов (пустые ячейки игрового поля)
      for (let i = 0; i < field.length; i++) {
         for (let j = 0; j < field.length; j++) {
            if (field[i][j] === 0) arrEmpty.push(`${i}${j}`)
         }
      }

      x = arrEmpty.length === 0 ? -1 : x * arrEmpty.length // вернём минус 1 если массив пустой, т.е. нет пустых ячеек на поле
      console.log('X = ', x)
      x = Math.floor(x) // получим случайный элемент из этого массива
      console.log('floor(x) = ', x)
      return x === -1 ? '-1' : ''+arrEmpty[x] // и вернем строку - значение индекса случайной пустой ячейки для массива field
   }

   addBlock(getRandomCell())
}


function keyDown(key) {
   window.removeEventListener('keydown', keyDown)
   window.addEventListener('keyup', keyUp)

   if (key.code === 'ArrowDown') ArrowDown()
   if (key.code === 'ArrowUp') ArrowUp()
   if (key.code === 'ArrowRight') ArrowRight()
   if (key.code === 'ArrowLeft') ArrowLeft()

   setTimeout(addNewBlock, 500)
}

function keyUp(key) {
   window.removeEventListener('keyup', keyUp)
   window.addEventListener('keydown', keyDown)
}

window.addEventListener('keydown', keyDown)
window.onload = init()