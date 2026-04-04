import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from '../../routes/AppRoutes';
import '../../styles/App.css';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#000',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            style: {
              background: '#ecfdf5',
              color: '#065f46',
              border: '1px solid #d1fae5',
            },
            icon: '✅',
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#7f1d1d',
              border: '1px solid #fee2e2',
            },
            icon: '❌',
          },
          loading: {
            style: {
              background: '#f3f4f6',
              color: '#000',
            },
            icon: '⏳',
          },
        }}
      />
      <AppRoutes />
    </>
  );
}

export default App;
