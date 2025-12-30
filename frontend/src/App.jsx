import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TicketDetail from './pages/TicketDetail'

// Import the pages we just created
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import NewComplaint from './pages/NewComplaint'

function App() {
  return (
    <>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
            
    
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/complaint/:id" element={<TicketDetail />} />
            
            <Route path="/new-complaint" element={<NewComplaint />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App