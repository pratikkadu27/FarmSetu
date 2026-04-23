'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserDashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (user) {
      fetchOrders();
    }
  }, [user, isLoading, router]);

  const fetchOrders = async () => {
    try {
      const userId = user?.id || (user as any)?._id;
      const res = await fetch(`/api/orders?userId=${userId}`);
      const data = await res.json();
      if (res.ok) setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders');
    } finally {
      setDataLoading(false);
    }
  };

  if (isLoading || !user || dataLoading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading your dashboard...</div>;
  }

  const totalSavings = orders.reduce((acc, order) => {
    const marketPrice = order.dealId?.marketPrice || 0;
    const pricePaid = order.dealId?.pricePerUnit || 0;
    return acc + (marketPrice - pricePaid) * order.quantity;
  }, 0);

  return (
    <>
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1 style={{ marginBottom: '5px' }}>Namaste, {user.name.split(' ')[0]}! 🙏</h1>
          <p className="text-muted">Track your fresh farm bookings and savings.</p>
        </header>

        <section style={{ marginBottom: '32px' }}>
          <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Savings with FarmSetu</span>
              <h2 style={{ color: 'white', fontSize: '2rem', margin: '5px 0' }}>₹{totalSavings}</h2>
            </div>
            <div style={{ fontSize: '3rem', opacity: 0.3 }}>💰</div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Bookings</h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {orders.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '40px', borderStyle: 'dashed' }}>
                <p className="text-muted">No active bookings found. Explore our fresh harvest deals!</p>
              </div>
            ) : (
              orders.map(order => (
                <div key={order._id} className="card" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span className="text-sm" style={{ fontWeight: 700, color: 'var(--secondary)' }}>ID: {order._id.slice(-6).toUpperCase()}</span>
                    <span className={`badge ${order.status === 'confirmed' ? 'badge-active' : ''}`} style={{ 
                      backgroundColor: order.status === 'pending' ? '#E3F2FD' : '',
                      color: order.status === 'pending' ? '#1976D2' : ''
                    }}>
                      {order.status}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '12px' }}>{order.dealId?.name || 'Harvest Deal'}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '15px' }}>
                    <div className="text-sm">
                      <span className="text-muted">Quantity:</span> <br />
                      <strong>{order.quantity} {order.dealId?.unit}</strong>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted">Price Paid:</span> <br />
                      <strong>₹{order.totalAmount}</strong>
                    </div>
                  </div>

                  <div style={{ backgroundColor: '#F9F7F2', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-sm">Ordered On: <strong>{new Date(order.createdAt).toLocaleDateString()}</strong></span>
                    <span className="text-sm" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                      Saved ₹{(order.dealId?.marketPrice - order.dealId?.pricePerUnit) * order.quantity}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p className="text-sm text-muted">Need help with an order? <button style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact Support</button></p>
        </div>
      </main>
    </>
  );
}
