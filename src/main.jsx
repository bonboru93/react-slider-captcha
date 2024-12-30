import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SliderCaptcha from './SliderCaptcha.jsx'


const onCheck = () => new Promise((resolve, reject) =>
  setTimeout(Math.random() > .5 ? resolve : reject, 500))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <dialog open style={{ inset: 0 }}>
      <SliderCaptcha onCheck={onCheck} />
    </dialog>
  </StrictMode>,
)
