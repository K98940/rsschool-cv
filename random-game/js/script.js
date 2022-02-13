'use strict'

const container = document.querySelector('.container')
const blocks = document.querySelectorAll('.blocks')

const coordContainer = container.getBoundingClientRect()
const minY = coordContainer.y
const maxY = coordContainer.bottom - 120
const minX = coordContainer.x
const maxX = coordContainer.x + coordContainer.width
console.log('coordContainer,  ', coordContainer)


function ArrowDown() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      if (coord.top < maxY) {
         elem.style.top = `${coord.top + 96}px`
      }
      console.log(coord.top, maxY)
   })
}

function ArrowUp() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      if (coord.top > minY) {
         elem.style.top = `${coord.top - 104}px`
      }
      console.log(coord.top, minY)
   })
}

function ArrowRight() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      console.log(coord.x, maxX)
      if (coord.x + 100 < maxX) {
         elem.style.left = `${coord.x - coordContainer.x + 100}px`
      }
   })
}

function ArrowLeft() {
   blocks.forEach(elem => {
      const coord = elem.getBoundingClientRect()
      console.log(coord, minX)
      if (coord.x > minX) {
         elem.style.left = `${coord.x - coordContainer.x - 100}px`
      }
   })
}

function keyDown(key) {
   window.removeEventListener('keydown', keyDown)
   window.addEventListener('keyup', keyUp)

   console.log(key)
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