import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { consumeInstallReturn } from './lib/install-state';
import './index.css';

// O'rnatishdan qaytgan foydalanuvchi (`/?installed=1`) — sahifani chizmasdan
// darhol UYSOT ichidagi Pulse'ga o'tkaziladi.
if (!consumeInstallReturn()) {
  const root = document.getElementById('root');
  if (!root) throw new Error('#root topilmadi');

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
