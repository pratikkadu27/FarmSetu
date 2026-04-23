'use client';

import { useAuth } from '@/context/AuthContext';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

export default function DealBuyersPage() {
  const { id } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const [buyers, setBuyers] = useState<any[]>([]);
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    } else if (id) {
      fetchData();
    }
  }, [id, user, authLoading, router]);

  const fetchData = async () => {
    try {
      // Fetch deal details
      const dealRes = await fetch(`/api/deals/${id}`);
      const dealData = await dealRes.json();
      if (dealRes.ok) setDeal(dealData);

      // Fetch buyers/orders for this deal
      const ordersRes = await fetch(`/api/orders?dealId=${id}`);
      const ordersData = await ordersRes.json();
      if (ordersRes.ok) setBuyers(ordersData);
    } catch (err) {
      showToast('Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading buyer details...</div>;
  }

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
      <header style={{ marginBottom: '30px' }}>
        <Link href="/admin" style={{ color: 'var(--primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', marginBottom: '16px' }}>
          ← Back to Deals
        </Link>
        <h1>Buyers for {deal?.name || 'Deal'}</h1>
        <p className="text-muted">Review all community members who have joined this harvest group deal.</p>
      </header>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#F0F4F1', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '16px', fontSize: '0.875rem' }}>Buyer Details</th>
              <th style={{ padding: '16px', fontSize: '0.875rem' }}>Location</th>
              <th style={{ padding: '16px', fontSize: '0.875rem' }}>Quantity</th>
              <th style={{ padding: '16px', fontSize: '0.875rem' }}>Amount Paid</th>
              <th style={{ padding: '16px', fontSize: '0.875rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {buyers.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No one has joined this deal yet.
                </td>
              </tr>
            ) : (
              buyers.map(order => (
                <tr key={order._id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600 }}>{order.userName}</div>
                    <div className="text-sm text-muted">{order.userEmail}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem' }}>{order.userCity}</td>
                  <td style={{ padding: '16px', fontSize: '0.9rem', fontWeight: 600 }}>
                    {order.quantity} {deal?.unit}
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem' }}>₹{order.totalAmount}</td>
                  <td style={{ padding: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {buyers.length > 0 && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <div className="card" style={{ padding: '16px 24px', backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>
            <span style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Harvest Committed</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>
              {buyers.reduce((acc, b) => acc + b.quantity, 0)} {deal?.unit}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
