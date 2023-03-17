import React from 'react'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { About } from './components/static-subpages/About'
import { EventPage } from './components/EventPage'
import PlacePage from './components/PlacePage'
import Places from './components/Places'
import { Page404 } from './components/Page404'
import { Events } from './components/Events'
import config from './config.json'

function App() {
  document.body.style.zoom = '85%'

  return (
    <React.StrictMode>
      <main className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Events />} />
          <Route path='about' element={<About />} />
          <Route path='places' element={<Places />} />
          <Route path='events/:eventId' element={<EventPage />} />
          <Route path='places/:placeId' element={<PlacePage />} />
          <Route path='*' element={<Page404 />} />
        </Routes>
      </main>
    </React.StrictMode>
  )
}

export default App
