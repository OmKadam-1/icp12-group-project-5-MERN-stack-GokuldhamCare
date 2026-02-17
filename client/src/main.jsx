import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import NavbarPatient from './components/NavbarPatient.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavbarPatient />
  </StrictMode>,
)
