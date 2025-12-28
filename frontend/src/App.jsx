import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
            {/* When URL is /, show Login */}
            <Route path="/" element={<Login />} />
            
            {/* When URL is /register, show Register */}
            <Route path="/register" element={<Register />} />
            
            {/* When URL is /dashboard, show Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* When URL is /new-complaint, show the Form */}
            <Route path="/new-complaint" element={<NewComplaint />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App