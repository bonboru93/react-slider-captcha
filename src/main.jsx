import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SliderCaptcha from './SliderCaptcha.jsx'

const onLoad = () => new Promise(resolve => setTimeout(() => resolve({
  bgSrc: '/bg.jpg',
  puzzleSrc: '/puzzle.png'
}), 1000))

const onCheck = () => new Promise((resolve, reject) =>
  setTimeout(Math.random() > .5 ? resolve : reject, 1000))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <dialog open style={{ inset: 0 }}>
      <SliderCaptcha onLoad={onLoad} onCheck={onCheck} />
    </dialog>
  </StrictMode>,
)
