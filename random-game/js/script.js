'use strict'

let touchStartY = 0 // переменные для вычисления направления свайпа на тачскрине
let touchEndY = 0
let touchStartX = 0
let touchEndX = 0

let xColor = 0 // множитель для цвета блока
let block = ''
let BlockWidth = 0
let score = 0 // очки
let step = 0 // шаги
const container = document.querySelector('.container')
const blocks = document.querySelector('.blocks')
const scoreSpan = document.querySelector('.score span')
const progress = document.querySelector('.progress')
const containerPadding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--containerPadding')) // внутренний отступ в игровом поле
const sizeShadow = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sizeShadow')) // размер тени от блоков

const coordContainer = container.getBoundingClientRect()
const eventTouch = { // объект - событие от тачскрина
   'code': ''
}
const arrColor = {
   '4': 40,
   '8': 60,
   '16': 170,
   '32': 190,
   '64': 210,
   '128': 280,
   '256': 300,
   '512': 340,
}

const field = [
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 0],
   [0, 0, 0, 2]
]


function stopGame(win) {
   const url = win ? `url("./assets/jpg/win.jpg")` : `url("./assets/jpg/lose.jpg")`
   const gameOver = document.createElement('div')

   window.removeEventListener('keydown', keyDown)
   window.removeEventListener('keyup', keyUp)
   window.removeEventListener('touchstart', touchStart)
   window.removeEventListener('touchend', touchEnd)
   gameOver.classList.add('gameover')
   gameOver.style.backgroundImage = url
   document.body.insertAdjacentElement('afterbegin', gameOver)
}


function addBlock(index) { // index - индекс пустой ячейки
   if (index === '-1') {
      stopGame(false)
      return
   }
   const item = document.createElement('div')
   field[index[0]][index[1]] = 2
   item.textContent = field[index[0]][index[1]]
   item.setAttribute('data-xy', `${index[0]}${index[1]}`)
   item.classList.add('newblock')
   item.style.top = `${index[0] * BlockWidth + containerPadding}px`
   item.style.left = `${index[1] * BlockWidth + containerPadding}px`
   item.style.animation = `anime 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`
   container.insertAdjacentElement('afterbegin', item)
}


function init() { // расставить блоки по массиву, обнулить переменные
   score = 0

   for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
         if (field[i][j] > 0) { // если элемент массива больше нуля - ставим блок в эту позицию
            const item = document.createElement('div')
            item.classList.add('blocks')
            item.textContent = field[i][j]
            item.setAttribute('data-xy', `${i}${j}`)
            container.insertAdjacentElement('afterbegin', item)
            BlockWidth = document.querySelector('.blocks').getBoundingClientRect().width + 10 // ширина (и высота) блока
            item.style.top = `${containerPadding + i * BlockWidth}px`
            item.style.left = `${containerPadding + j * BlockWidth}px`
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
      x = Math.floor(x) // получим случайный элемент из этого массива
      return x === -1 ? '-1' : '' + arrEmpty[x] // и вернем строку - значение индекса случайной пустой ячейки для массива field
   }

   addBlock(getRandomCell())
}


function Arrow(keyCode) {
   const keyObj = {

      'ArrowUp': function () {
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
                     block.style.backgroundColor = `hsl(${arrColor[field[i - 1][j]]}, 80%, 50%)`
                     block.style.boxShadow = `${sizeShadow}px ${sizeShadow}px ${sizeShadow * 1.5}px hsl(${arrColor[field[i - 1][j]]}, 100%, 80%)`
                  } else if (field[i - 1][j] === 0) { // иначе, если вверху ноль
                     field[i - 1][j] = field[i][j] // просто перенести из нижней ячейки в верхнюю
                     field[i][j] = 0 // а текущий блок обнулить
                  } else continue // если верхняя ячейка не пустая - div вверх не перемещаем

                  // найти блок с атрибутом 'ij' и сместить вверх
                  block.dataset.xy = `${i - 1}${j}`
                  block.style.top = `${(i - 1) * BlockWidth + containerPadding}px`
               }
            }
         }
      },

      'ArrowDown': function () {
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
                     block.style.backgroundColor = `hsl(${arrColor[field[i + 1][j]]}, 80%, 50%)`
                     block.style.boxShadow = `${sizeShadow}px ${sizeShadow}px ${sizeShadow * 1.5}px hsl(${arrColor[field[i + 1][j]]}, 100%, 80%)`
                  } else if (field[i + 1][j] === 0) { // иначе, если внизу ноль
                     field[i + 1][j] = field[i][j] // просто перенести из верхней ячейки в нижнюю
                     field[i][j] = 0 // а текущий блок обнулить
                  } else continue // если нижняя ячейка не пустая - div вниз не перемещаем


                  block.dataset.xy = `${i + 1}${j}` // изменить аттрибут
                  block.style.top = `${(i + 1) * BlockWidth + containerPadding}px` // div с атрибутом 'ij' сместить вниз

               }
            }
         }
      },

      'ArrowRight': function () {
         // сместить элементы массива вправо
         for (let k = 0; k < field.length; k++) {
            for (let i = field.length - 1; i >= 0; i--) { // столбец, идем с права на лево
               for (let j = 0; j < field[i].length; j++) { // строка, идем с верху вниз
                  if (field[j][i] === 0) continue // если текущий элемент равен нулю, здесь делать нечего
                  block = document.querySelector('[data-xy="' + j + i + '"]')

                  if (field[j][i + 1] === field[j][i]) { // переместить если текущая ячейка и ячейка справа совпадают 
                     score += field[j][i] // плюсуем очки

                     field[j][i + 1] = field[j][i] * 2 // то удвоить значение блока
                     field[j][i] = 0 // а текущий блок обнулить

                     block.remove() // лишний div с атрибутом 'ij' удалить
                     block = document.querySelector(`[data-xy="${j}${i + 1}"]`) // а блоку справа сделать
                     block.textContent = field[j][i + 1] // новое значение
                     block.style.backgroundColor = `hsl(${arrColor[field[j][i + 1]]}, 80%, 50%)`
                     block.style.boxShadow = `${sizeShadow}px ${sizeShadow}px ${sizeShadow * 1.5}px hsl(${arrColor[field[j][i + 1]]}, 100%, 80%)`
                  } else if (field[j][i + 1] === 0) { // иначе, если справа ноль
                     field[j][i + 1] = field[j][i] // просто перенести из текущей ячейки в правую
                     field[j][i] = 0 // а текущий блок обнулить
                  } else continue // если правая ячейка не пустая - div вправо не перемещаем

                  // найти блок с атрибутом 'ij' и сместить вправо
                  block.dataset.xy = `${j}${i + 1}`
                  block.style.left = `${(i + 1) * BlockWidth + containerPadding}px`
               }
            }
         }
      },

      'ArrowLeft': function () {
         // сместить элементы массива влево
         for (let k = 0; k < field.length; k++) {
            for (let i = 1; i < field.length; i++) { // столбец, идем слева на право
               for (let j = 0; j < field[i].length; j++) { // строка, идем с верху вниз
                  if (field[j][i] === 0) continue // если текущий элемент равен нулю, здесь делать нечего
                  block = document.querySelector('[data-xy="' + j + i + '"]')

                  if (field[j][i - 1] === field[j][i]) { // переместить если текущая ячейка и ячейка слева совпадают 
                     score += field[j][i] // плюсуем очки

                     field[j][i - 1] = field[j][i] * 2 // то удвоить значение блока
                     field[j][i] = 0 // а текущий блок обнулить

                     block.remove() // лишний div с атрибутом 'ij' удалить
                     block = document.querySelector(`[data-xy="${j}${i - 1}"]`) // а блоку слева сделать
                     block.textContent = field[j][i - 1] // новое значение
                     block.style.backgroundColor = `hsl(${arrColor[field[j][i - 1]]}, 80%, 50%)`
                     block.style.boxShadow = `${sizeShadow}px ${sizeShadow}px ${sizeShadow * 1.5}px hsl(${arrColor[field[j][i - 1]]}, 100%, 80%)`
                  } else if (field[j][i - 1] === 0) { // иначе, если слева ноль
                     field[j][i - 1] = field[j][i] // просто перенести из текущей ячейки в левую
                     field[j][i] = 0 // а текущий блок обнулить
                  } else continue // если левая ячейка не пустая - div влево не перемещаем


                  // найти блок с атрибутом 'ij' и сместить влево
                  block.dataset.xy = `${j}${i - 1}`
                  block.style.left = `${(i - 1) * BlockWidth + containerPadding}px`
               }
            }
         }
      }
   }

   if (keyObj[keyCode]) { // если у объекта есть ключ для нажатой клавиши, выполняем функцию и возвращаем true
      keyObj[keyCode]()
      return true
   } else { // иначе возвращаем false, так исключаем все необрабатываемые клавиши
      return false
   }
}


function keyDown(key) {
   window.removeEventListener('keydown', keyDown)
   window.addEventListener('keyup', keyUp)

   if (Arrow(key.code)) { // ф. Arrow должна вернуть true если была нажат клавиша на которую у неё есть обработчик
      setTimeout(addNewBlock, 500) // через 500мс добавить на поле новый блок
      scoreSpan.textContent = score // обновить очки

      progress.style.width = `${score / 2048 * coordContainer.width}px` // обновить длину прогресс бара
      progress.style.background = `linear-gradient(90deg, hsl(${50 + score / 5.6}, 80%, 20%) 0%, hsl(${50 + score / 5.6}, 80%, 40%) 50%, hsl(${50 + score / 5.6}, 80%, 60%) 100%)` // обновить цвет прогресс бара
      container.style.backgroundColor = `hsl(${score * 10}, 40%, 50%)` // и обновить фоновый цвет игрового поля

      if (score > 2047) { // если набрали больше 2047 очков игра завершает с аргументом true - победа
         stopGame(true)
      }
   }
}

function keyUp(key) {
   window.removeEventListener('keyup', keyUp)
   window.addEventListener('keydown', keyDown)
}



function touchStart(event) {
   touchStartY = event.changedTouches[0].pageY // получить координаты начала свайпа
   touchStartX = event.changedTouches[0].pageX
}

function touchEnd(event) { // обработка свайпов на тачскрине
   let tmpX = 0
   let tmpY = 0

   touchEndY = event.changedTouches[0].pageY // получить координаты конца свайпа
   touchEndX = event.changedTouches[0].pageX
   tmpX = touchStartX - touchEndX // получить направление движения по Х
   tmpY = touchStartY - touchEndY // получить направление движения по Y

   if (Math.abs(tmpX) < Math.abs(tmpY)) { // если Х < Y значит движение будет по вертикали
      if (touchStartY > touchEndY) { // если начало движения больше конечной точки - это движение вверх
         eventTouch.code = 'ArrowUp'
      } else {
         eventTouch.code = 'ArrowDown'
      }
   } else {
      if (touchStartX > touchEndX) { // если начало движения больше конечной точки - это движение влево
         eventTouch.code = 'ArrowLeft'
      } else {
         eventTouch.code = 'ArrowRight'
      }
   }

   keyDown(eventTouch)
}



window.addEventListener('keydown', keyDown)
window.addEventListener('touchstart', touchStart)
window.addEventListener('touchend', touchEnd)
window.onload = init()