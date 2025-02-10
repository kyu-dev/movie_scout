import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { SearchProvider } from './context/SearchContext';
import './styles/main.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </StrictMode>
);