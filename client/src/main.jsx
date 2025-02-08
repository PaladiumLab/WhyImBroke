import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/Login/loginpage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import { ThemeProvider } from './components/dark-mode-provider/theme-provider';
import { RecoilRoot } from 'recoil';
import PrivateRoute from './helper/private-route/private-route.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute/>}>
                <Route path="/" element={<Dashboard/>} />
              </Route>

              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
  </StrictMode>,
)
