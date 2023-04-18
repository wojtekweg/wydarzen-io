import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter, BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')
const root = createRoot(container) // createRoot(container!) if you use TypeScript
root.render(
  <BrowserRouter>
    {/* fix for gh-pages deploy */}
    {/* <HashRouter> */}
    <App />
    {/* </HashRouter> */}
  </BrowserRouter>
)
