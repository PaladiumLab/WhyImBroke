import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RecoilRoot } from 'recoil';
import './styles/globals.css'

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/Login/loginpage.jsx';
import { ThemeProvider } from './helper/dark-mode-provider/theme-provider';
import PrivateRoute from './helper/private-route/private-route.jsx';
import DashboardPage from './pages/Dashboard/DashboardPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardPage/>} />
              </Route>

              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
  </StrictMode>,
)
