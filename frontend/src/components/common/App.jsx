import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from '../../routes/AppRoutes';
import '../../styles/App.css';

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 500,
          style: {
            background: '#fff',
            color: '#000',
            padding: '16px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #C9A876 0%, #A0826D 100%)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 32px',
              borderRadius: '50px',
              boxShadow: '0 10px 25px rgba(192, 152, 110, 0.3)',
              fontSize: '15px',
              fontWeight: '600',
              animation: 'slideInDown 0.4s ease-out',
            },
            icon: '🎉',
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
              fontSize: '15px',
              fontWeight: '500',
              animation: 'slideInDown 0.4s ease-out',
            },
            icon: '⚠️',
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
              fontSize: '15px',
              fontWeight: '500',
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
