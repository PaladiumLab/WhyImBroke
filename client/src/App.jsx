import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './app/login/page';
import { ThemeProvider } from './components/theme-provider';

function App() {

  return (
    <>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
