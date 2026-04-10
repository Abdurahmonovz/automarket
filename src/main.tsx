import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { SessionProvider } from './context/SessionContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <UserProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
          
          </UserProvider>
        </SessionProvider>

      </ThemeProvider>

    </BrowserRouter>

  </StrictMode>,
)
