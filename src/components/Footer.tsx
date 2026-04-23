'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <footer style={{ 
      backgroundColor: '#f9fafb', 
      color: 'var(--foreground)', 
      padding: '40px 0 30px',
      marginTop: 'auto',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px',
          marginBottom: '30px'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 3' }}>
            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>🌿</span> FarmSetu
            </Link>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6', fontSize: '0.9rem' }}>
              Empowering communities by connecting them directly with local farmers. Fresh harvest, fair prices, and zero middlemen.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'var(--foreground)', marginBottom: '16px', fontSize: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px' }}>
                <button 
                  onClick={() => setShowHelp(true)} 
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--text-muted)', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit' }}
                >
                  Help Center
                </button>
              </li>
              <li style={{ marginBottom: '8px' }}><Link href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* ... existing copyright ... */}
        <div style={{ 
          borderTop: '1px solid var(--border)', 
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} FarmSetu. Built for sustainable agriculture.
          </p>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
            <Link href="#" style={{ color: 'var(--text-muted)' }}>Twitter</Link>
            <Link href="#" style={{ color: 'var(--text-muted)' }}>Instagram</Link>
            <Link href="#" style={{ color: 'var(--text-muted)' }}>LinkedIn</Link>
          </div>
        </div>
      </div>

      {/* Help Center Modal */}
      {showHelp && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
          <div className="card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center', padding: '32px' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎧</div>
            <h2 style={{ marginBottom: '12px' }}>Help Center</h2>
            <p className="text-muted" style={{ marginBottom: '24px' }}>How can we help you today?</p>
            
            <div style={{ textAlign: 'left', marginBottom: '32px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px', marginBottom: '12px' }}>
                <span className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Support</span>
                <div style={{ fontWeight: 600 }}>support@farmsetu.com</div>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                <span className="text-xs text-muted" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Toll Free (India)</span>
                <div style={{ fontWeight: 600 }}>1800-FARM-SETU</div>
              </div>
            </div>

            <button 
              className="btn btn-primary" 
              style={{ width: '100%', padding: '12px' }}
              onClick={() => setShowHelp(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
