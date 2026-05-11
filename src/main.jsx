import { StrictMode } from 'react'
import { HashRouter } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Startar React-appen och monterar den i <div id="root"> i index.html
// StrictMode hjälper till att hitta potentiella problem under utveckling
// HashRouter används för routing med # i URL:en, vilket krävs för GitHub Pages
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
