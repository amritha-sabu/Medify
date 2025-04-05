import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import SearchResults from './Components/SearchResults/SearchResults';
import './App.css'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/medical-centers" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
