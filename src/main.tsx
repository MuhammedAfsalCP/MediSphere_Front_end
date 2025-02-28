import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {Provider} from 'react-redux'
import Store from './Redux/Store.ts'
const queryClient = new QueryClient();
const theme = createTheme({
  // You can customize your theme here
  palette: {
    primary: {
      main: '#00a2ff',
    },
    secondary: {
      main: '#007acc',
    },
  },
});
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={Store}>
          <App />
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>

  </StrictMode>,
)
