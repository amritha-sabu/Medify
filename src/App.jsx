import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import SearchResults from './Components/SearchResults/SearchResults';
import BookingPage from './Components/Bookings/BookingsPage';
import './App.css'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/medical-centers" element={<SearchResults />} />
          <Route path='/my-bookings' element={<BookingPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
