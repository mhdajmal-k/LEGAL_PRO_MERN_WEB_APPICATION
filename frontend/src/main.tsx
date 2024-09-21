import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { Store } from "../src/services/store/store.ts"
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
