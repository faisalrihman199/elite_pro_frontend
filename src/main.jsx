import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { APIProvider } from './Context/APIContext.jsx';
import { SocketProvider } from './Context/SocketContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <APIProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </APIProvider>
  </StrictMode>,
)
