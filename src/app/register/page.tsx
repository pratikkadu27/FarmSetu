'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', city: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🌱</div>
          <h1>Application Sent!</h1>
          <p className="text-muted" style={{ margin: '16px 0' }}>
            Thanks for joining FarmSetu. To ensure trust within our community, your account requires admin approval.
          </p>
          <p style={{ fontWeight: 600, color: 'var(--primary)' }}>
            We'll notify you once you're activated.
          </p>
          <button 
            className="btn btn-primary" 
            style={{ width: '100%', marginTop: '24px' }}
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '1.75rem', color: 'var(--secondary)' }}>Join FarmSetu</h1>
            <p className="text-muted">Register to access direct farm bulk pricing.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600 }}>Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. John Smith"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600 }}>Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600 }}>Phone Number</label>
              <input 
                type="tel" 
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="10 digit mobile number"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem', fontWeight: 600 }}>City</label>
              <select 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white' }}
              >
                <option value="">Select your city</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
              Request Access
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.875rem' }}>
            <span className="text-muted">Already have an account? </span>
            <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
}
