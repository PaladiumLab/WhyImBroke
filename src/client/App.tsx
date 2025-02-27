//Author: Gurleen Wadhwa.
//Required Packages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

//Helpers
import { ThemeProvider } from './helper/dark-mode-provider/theme-provider';

//Components
import LoginPage from './pages/Login/loginpage';
import PrivateRoute from './helper/private-route/private-route';
import DashboardPage from './pages/Dashboard/DashboardPage';

const App:React.FC = () => {
  return (
    <>
      <RecoilRoot>
        <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute/>}>
                <Route path="/" element={<DashboardPage />} />
              </Route>

              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </RecoilRoot>
    </>
  )
}

export default App
