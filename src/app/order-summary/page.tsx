'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function OrderSummaryPage() {
  return (
    <>
      <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
          <h1 style={{ color: 'var(--primary)' }}>Booking Confirmed!</h1>
          <p className="text-muted" style={{ margin: '16px 0' }}>
            We've received your booking. You'll receive a confirmation email and SMS shortly.
          </p>
          
          <div style={{ backgroundColor: '#F9F7F2', padding: '24px', borderRadius: '12px', margin: '24px 0', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '15px' }}>Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Organic Basmati Rice</span>
              <strong>10 kg</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Booking Amount</span>
              <strong>₹850</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: 700, marginTop: '10px', fontSize: '1.1rem' }}>
              <span>Total Saved</span>
              <span>₹350</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <Link href="/dashboard" className="btn btn-outline" style={{ width: '100%' }}>Track Orders</Link>
            <Link href="/" className="btn btn-primary" style={{ width: '100%' }}>Back to Deals</Link>
          </div>
        </div>
      </main>
    </>
  );
}
