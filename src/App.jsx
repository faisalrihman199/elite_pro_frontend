import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
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
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function FloatingIcon() {
  const location = useLocation();

  // Show Floating WhatsApp on all pages except those under "/dashboard"
  if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/chat')) {
    return null;
  }

  return (
    <FloatingWhatsApp
      phoneNumber="+923440751588"
      accountName={'Osama Akram'} 
      allowClickAway={true}
      notificationDelay={60000}
      styles={{ bottom: '20px', right: '20px' }}
    />
  );
}

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

      <FloatingIcon />

      <ToastContainer />
    </Router>
  );
}

export default App;
