import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux';
import { persistor, Store } from "../src/services/store/store.ts"
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import { Toaster } from 'sonner';
import ErrorBoundary from './components/erroBoundary.tsx';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from './contextAPI/useSocket.tsx';

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <ErrorBoundary>
      <Provider store={Store}>
        <PersistGate persistor={persistor}>
          <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
          <BrowserRouter>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </SocketProvider>,
)
