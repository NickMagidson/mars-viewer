import { Theme } from '@carbon/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css';
import App from './App.tsx';
import './custom.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme theme="g100">
      <App />
    </Theme>
  </StrictMode>,
)
