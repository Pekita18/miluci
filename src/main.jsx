import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import FinalPage from './FinalPage.jsx'
import AlbumPage from './AlbumPage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lucitin" element={<FinalPage />} />
        <Route path="/album" element={<AlbumPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
