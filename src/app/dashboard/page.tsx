'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function UserDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading your dashboard...</div>;
  }

  // Mock orders
  const orders = [
    { id: 'ORD-101', item: 'Organic Basmati Rice', qty: '10 kg', price: '₹850', savings: '₹350', status: 'Booked', delivery: 'April 28, 2026' },
    { id: 'ORD-98', item: 'Fresh Alphonso Mangoes', qty: '2 dozen', price: '₹1200', savings: '₹600', status: 'Completed', delivery: 'April 20, 2026' },
  ];

  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ marginBottom: '5px' }}>Namaste, {user.name.split(' ')[0]}! 🙏</h1>
          <p className="text-muted">Track your fresh farm bookings and savings.</p>
        </header>

        <section style={{ marginBottom: '32px' }}>
          <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Savings with FarmSetu</span>
              <h2 style={{ color: 'white', fontSize: '2rem', margin: '5px 0' }}>₹950</h2>
            </div>
            <div style={{ fontSize: '3rem', opacity: 0.3 }}>💰</div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Bookings</h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {orders.map(order => (
              <div key={order.id} className="card" style={{ marginBottom: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span className="text-sm" style={{ fontWeight: 700, color: 'var(--secondary)' }}>{order.id}</span>
                  <span className={`badge ${order.status === 'Completed' ? 'badge-active' : ''}`} style={{ 
                    backgroundColor: order.status === 'Booked' ? '#E3F2FD' : '',
                    color: order.status === 'Booked' ? '#1976D2' : ''
                  }}>
                    {order.status}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{order.item}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                  <div className="text-sm">
                    <span className="text-muted">Quantity:</span> <br />
                    <strong>{order.qty}</strong>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted">Price Paid:</span> <br />
                    <strong>{order.price}</strong>
                  </div>
                </div>

                <div style={{ backgroundColor: '#F9F7F2', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-sm">Delivery Expected: <strong>{order.delivery}</strong></span>
                  <span className="text-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>Saved {order.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p className="text-sm text-muted">Need help with an order? <button style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact Support</button></p>
        </div>
      </main>
    </>
  );
}
