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
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { Avatar } from '@mui/material'
import { FaUser } from 'react-icons/fa6'

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
      <FloatingWhatsApp
        phoneNumber="+923440751588"
        accountName={'Osama Akram'} 
        allowClickAway={true}
        notification={true}
        notificationSound={true}
        notificationDelay={60000}
        className="custom-color"
        styles={{ bottom: '20px', right: '20px' }}
      />

      <ToastContainer />
    </Router>
  )
}

export default App
