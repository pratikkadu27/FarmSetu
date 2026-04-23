'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', animation: 'fadeIn 0.5s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Welcome Back</h1>
          <p className="text-muted text-sm">Login to your FarmSetu account</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FFEBEE', color: 'var(--danger)', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '0.875rem', border: '1px solid #FFCDD2' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. user@farmsetu.com"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', outlineColor: 'var(--primary)' }}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', outlineColor: 'var(--primary)' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
            Login
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem' }}>
          <span className="text-muted">Don't have an account? </span>
          <Link href="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Register Now</Link>
        </div>

        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#F0F4F1', borderRadius: '8px', fontSize: '0.75rem' }}>
          <p><strong>Demo Credentials:</strong></p>
          <p>Admin: admin@farmsetu.com / admin123</p>
          <p>User: user@farmsetu.com / user123</p>
        </div>
      </div>
    </div>
  );
}
