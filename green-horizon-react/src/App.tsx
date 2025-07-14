import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { Navbar } from './components/Navbar'
import HomePage from './pages/HomePage'
import GreenLane from './pages/GreenLane'
import LocalHarvest from './pages/LocalHarvest'
import AirBuddy from './pages/AirBuddy'
import Wasteless from './pages/Wasteless'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/green-lane" element={<GreenLane />} />
              <Route path="/local-harvest" element={<LocalHarvest />} />
              <Route path="/air-buddy" element={<AirBuddy />} />
              <Route path="/wasteless" element={<Wasteless />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App