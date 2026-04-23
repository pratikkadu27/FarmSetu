'use client';

import { useAuth } from '@/context/AuthContext';
import { useDeals } from '@/context/DealContext';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, isLoading } = useAuth();
  const { deals, updateDeal } = useDeals();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'admin') {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Directing to secure login...</div>;
  }

  const activeDealsCount = deals.filter(d => d.status === 'active').length;
  const totalBooked = deals.reduce((acc, d) => acc + d.bookedQuantity, 0);

  const handleFreeze = (id: string) => {
    updateDeal(id, { status: 'closed' });
    showToast('Deal frozen successfully. No further bookings allowed.', 'info');
  };

  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border)' }}>
          <Link href="/admin" style={{ padding: '10px 0', borderBottom: '3px solid var(--primary)', fontWeight: 700, color: 'var(--primary)' }}>Deals Management</Link>
          <Link href="/admin/users" style={{ padding: '10px 0', fontWeight: 600, color: 'var(--text-muted)' }}>User Management</Link>
        </div>

        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Active Product Deals</h1>
          <Link href="/admin/deals/new" className="btn btn-primary" style={{ padding: '8px 16px' }}>+ New Deal</Link>
        </header>

        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
            <div className="card" style={{ margin: 0, textAlign: 'center' }}>
              <span className="text-muted text-sm" style={{ display: 'block' }}>Active Deals</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{activeDealsCount}</span>
            </div>
            <div className="card" style={{ margin: 0, textAlign: 'center' }}>
              <span className="text-muted text-sm" style={{ display: 'block' }}>Total Bookings</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{totalBooked}</span>
            </div>
          </div>
        </section>

        <section>
          <div style={{ display: 'grid', gap: '15px' }}>
            {deals.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                <p className="text-muted">No deals yet. Start by creating one!</p>
              </div>
            ) : (
              deals.map(deal => (
                <div key={deal._id} className="card" style={{ marginBottom: 0, opacity: deal.status === 'closed' ? 0.7 : 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{deal.name}</h3>
                      <span className="text-muted text-sm">Status: <strong style={{ color: deal.status === 'active' ? 'var(--primary)' : 'var(--danger)' }}>{deal.status.toUpperCase()}</strong></span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link href={`/admin/deals/${deal._id}/edit`} className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Edit</Link>
                      {deal.status === 'active' && (
                        <button 
                          onClick={() => deal._id && handleFreeze(deal._id)}
                          className="btn btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--danger)', color: 'var(--danger)' }}
                        >
                          Freeze
                        </button>
                      )}
                      {deal.status === 'closed' && (
                        <button 
                          onClick={() => deal._id && updateDeal(deal._id, { status: 'active' })}
                          className="btn btn-outline" 
                          style={{ padding: '6px 12px', fontSize: '0.75rem', borderColor: 'var(--primary)', color: 'var(--primary)' }}
                        >
                          Unfreeze
                        </button>
                      )}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span className="text-sm">Sold: {deal.bookedQuantity} / {deal.totalQuantity} {deal.unit}</span>
                    <span className="text-sm" style={{ fontWeight: 600 }}>{Math.round((deal.bookedQuantity / deal.totalQuantity) * 100) || 0}%</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${(deal.bookedQuantity / deal.totalQuantity) * 100 || 0}%` }} />
                  </div>
                  
                  <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                    <span className="text-sm text-muted">Delivery: {new Date(deal.deliveryDate).toLocaleDateString()}</span>
                    <button style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>View Buyers →</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
