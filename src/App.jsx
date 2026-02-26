import './App.css'
import { Home } from './pages/home'
import { Search} from './pages/search'
import { WatchList } from './pages/Watchlist'
import { ShowDetails } from './pages/details'
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Navbar'


function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/show/:id' element={<ShowDetails />} />
          <Route path='*' element={<div>Page not found</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
