import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TradeAction from './TradeAction.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
    <TradeAction />
  </StrictMode>
)
