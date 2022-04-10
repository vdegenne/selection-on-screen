const movableFrame = document.createElement('div')
movableFrame.id = 'movable-character-frame'
movableFrame.displaySelection = function () {
  const selection = document.getSelection().toString()
  if (selection) {
    this.innerText = selection
  }
}
document.body.prepend(movableFrame)


movableFrame.style.position = 'fixed'
movableFrame.style.top = 0
movableFrame.style.left = 0
movableFrame.style.zIndex = 9999999
movableFrame.style.fontSize = '48px'
movableFrame.style.backgroundColor = '#000000aa'
movableFrame.style.color = 'white'
movableFrame.style.padding = '6px'
movableFrame.style.userSelect = 'none'

let pressed = false
let innerX, innerY

movableFrame.addEventListener('mousedown', function (e) {
  pressed = true
  const rect = this.getBoundingClientRect()
  innerX = e.clientX - rect.left; // x position within the element.
  innerY = e.clientY - rect.top;  // y position within the element.
})
movableFrame.addEventListener('mouseup', function () {
  pressed = false
})
movableFrame.addEventListener('mousemove', function (e) {
  if (pressed) {
    movableFrame.style.top = `${e.y - innerY}px`
    movableFrame.style.left = `${e.x - innerX}px`
  }
})
movableFrame.addEventListener('mouseleave', function () {
  pressed = false
})