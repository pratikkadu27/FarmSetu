'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';

export default function ContactUsPage() {
  const [founders, setFounders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFounders();
  }, []);

  const fetchFounders = async () => {
    try {
      const res = await fetch('/api/founders');
      const data = await res.json();
      if (res.ok) setFounders(data);
    } catch (err) {
      console.error('Failed to load founders');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        <header style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Meet Our Founders 🤝</h1>
          <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            The visionary team behind FarmSetu, dedicated to transforming the agricultural landscape of India.
          </p>
        </header>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading founders...</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {founders.map(founder => (
              <div key={founder._id} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                <div style={{ padding: '40px 24px', backgroundColor: '#F0F4F1' }}>
                  <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    borderRadius: '50%', 
                    backgroundColor: 'white', 
                    margin: '0 auto 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    border: '4px solid white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    overflow: 'hidden'
                  }}>
                    {founder.image ? <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
                  </div>
                  <h3 style={{ marginBottom: '4px' }}>{founder.name}</h3>
                  <span className="badge badge-active">{founder.role}</span>
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>{founder.bio}</p>
                  {founder.linkedIn && (
                    <a 
                      href={founder.linkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Connect on LinkedIn →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {founders.length === 0 && !loading && (
          <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
            <p className="text-muted">Information about our founders will be added soon. Please stay tuned!</p>
          </div>
        )}

        <section style={{ marginTop: '100px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '24px' }}>Still Have Questions?</h2>
          <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <p style={{ marginBottom: '20px' }}>Our support team is here to help you 24/7.</p>
            <div style={{ display: 'grid', gap: '12px' }}>
              <div style={{ padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                <span className="text-muted">Email Us:</span> <br />
                <strong>support@farmsetu.com</strong>
              </div>
              <div style={{ padding: '12px', backgroundColor: '#F9FAFB', borderRadius: '8px' }}>
                <span className="text-muted">Toll Free:</span> <br />
                <strong>1800-FARM-SETU</strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
