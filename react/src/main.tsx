import './assets/css/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import App from './App.tsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './contexts/UserProvider.tsx'
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer
      position="top-left"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>,
)
