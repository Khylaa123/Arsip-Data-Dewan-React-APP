// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// HARUS ADA: Import BrowserRouter
import { BrowserRouter } from 'react-router-dom' 
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* HARUS MEMBUNGKUS APP */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)