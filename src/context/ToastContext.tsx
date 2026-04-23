'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Overlay */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: 'calc(100% - 40px)',
        maxWidth: '400px'
      }}>
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            style={{
              backgroundColor: toast.type === 'success' ? '#4CAF50' : 
                               toast.type === 'error' ? '#F44336' : 
                               toast.type === 'warning' ? '#FF9800' : '#2196F3',
              color: 'white',
              padding: '16px 20px',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideIn 0.3s ease-out forwards',
              fontWeight: 600,
              fontSize: '0.9rem',
              border: '2px solid rgba(255,255,255,0.2)'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>
              {toast.type === 'success' && '🌿'}
              {toast.type === 'error' && '⚠️'}
              {toast.type === 'warning' && '🌾'}
              {toast.type === 'info' && 'ℹ️'}
            </span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              style={{ color: 'white', opacity: 0.7, fontSize: '1.2rem', padding: '0 5px' }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
