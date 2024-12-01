import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Dashboard from './Pages/Dashboard/Dashboard'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import Login from './Pages/Auth/Login'
import Signup from './Pages/Auth/Signup'
import VerifyOTP from './Pages/Auth/VerifyOTP'
import Chat from './Pages/Chat/Chat'
import NotFound from './Pages/Error/NotFound'
import { ToastContainer } from 'react-toastify'  
import 'react-toastify/dist/ReactToastify.css' 
import ScrollToTop from './Components/ScrollTop'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/verify_otp" element={<VerifyOTP />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </Router>
  )
}

export default App
