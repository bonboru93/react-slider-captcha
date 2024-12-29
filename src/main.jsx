import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import SliderCaptcha from './SliderCaptcha.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <dialog open style={{ inset: 0 }}>
      <SliderCaptcha onVerify={console.log} />
    </dialog>
  </StrictMode>,
)
