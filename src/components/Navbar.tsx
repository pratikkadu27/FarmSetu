'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav style={{
      backgroundColor: 'var(--card-bg)',
      padding: '15px 0',
      borderBottom: '1px solid var(--border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: 'var(--shadow)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.8rem' }}>🌿</span> FarmSetu
        </Link>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link href="/admin" className="text-sm" style={{ fontWeight: 600 }}>Admin</Link>
              ) : (
                <Link href="/dashboard" className="text-sm" style={{ fontWeight: 600 }}>My Orders</Link>
              )}
              <button onClick={logout} className="text-sm" style={{ color: 'var(--danger)', fontWeight: 600 }}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm" style={{ fontWeight: 600 }}>Login</Link>
              <Link href="/register" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.875rem' }}>Join Us</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
