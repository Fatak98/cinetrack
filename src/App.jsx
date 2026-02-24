import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './pages/home'
import { Search} from './pages/search'
import { WatchList } from './pages/Watchlist'
import { ShowDetails } from './pages/details'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/research' element={<Search />} />
        <Route path='/watchlist' element={<WatchList />} />
        <Route path='/show/:id' element={<ShowDetails />} />
        <Route path='*'>page not exists</Route>
      </Routes>
    </div>
  )
}

export default App
