import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import App from './App'

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <StrictMode>
	<BrowserRouter>
	    <App />
	</BrowserRouter>
  </StrictMode>,
)
