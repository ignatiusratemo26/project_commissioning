import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from 'axios'
import App from './App.jsx'
import { UserContextProvider } from './UserContext.jsx'
import { ThemeProvider } from "@material-tailwind/react";

const API_URL="http://localhost:8000/api";
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </ThemeProvider>
  </StrictMode>,
);
