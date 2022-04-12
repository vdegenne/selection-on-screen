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
// movableFrame.style.userSelect = 'none'

let pressed = false
let innerX, innerY

// let _userSelectDebouncer;

movableFrame.addEventListener('mousedown', function (e) {
  if (e.button==2) { return }
  pressed = true
  const rect = this.getBoundingClientRect()
  innerX = e.clientX - rect.left; // x position within the element.
  innerY = e.clientY - rect.top;  // y position within the element.
  // _userSelectDebouncer = setTimeout(() => {
  //   movableFrame.style.userSelect = 'none'
  // }, 50);
})
movableFrame.addEventListener('mouseup', function (e) {
  if (e.button==2) { return }
  pressed = false
  // if (_userSelectDebouncer) {
  //   clearTimeout(_userSelectDebouncer)
  //   _userSelectDebouncer = undefined
  // }
  // movableFrame.style.userSelect = 'initial'
})
window.addEventListener('mousemove', function (e) {
  if (pressed) {
    movableFrame.style.top = `${e.y - innerY}px`
    movableFrame.style.left = `${e.x - innerX}px`
  }
})
// movableFrame.addEventListener('mouseleave', function () {
//   pressed = false
// })


const params = new URLSearchParams(window.location.search)
if (window.location.host.includes('www.google.') && params.has('tbm') && params.get('tbm') == 'isch') { // google images
  movableFrame.innerText = params.get('q')
}




/******** AUDIO */
const audioMap = {}
movableFrame.addEventListener('contextmenu', e=>e.preventDefault())
movableFrame.addEventListener('pointerdown', function (e) {
  if (e.button == 2) {
    const content = movableFrame.innerText.trim()
    if (content) {
      let audio
      if (audioMap[content]) {
        audio = audioMap[content]
      }
      else {
        audio = new Audio(`https://assiets.vdegenne.com/data/japanese/audio/${encodeURIComponent(content)}`)
        audioMap[content] = audio
      }
      audio.play()
    }
  }
})