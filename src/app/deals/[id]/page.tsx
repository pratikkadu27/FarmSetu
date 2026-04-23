'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Deal } from '@/data/deals';
import { useAuth } from '@/context/AuthContext';
import { useDeals } from '@/context/DealContext';
import { useToast } from '@/context/ToastContext';

export default function DealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { deals, updateDeal } = useDeals();
  const { showToast } = useToast();
  const [deal, setDeal] = useState<Deal | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const foundDeal = deals.find(d => d._id === id);
    if (foundDeal) setDeal(foundDeal);
  }, [id, deals]);

  if (!deal) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading deal details...</div>;

  const savingsPerUnit = deal.marketPrice - deal.pricePerUnit;
  const totalSavings = savingsPerUnit * quantity;
  const remaining = deal.totalQuantity - deal.bookedQuantity;
  const percentBooked = (deal.bookedQuantity / deal.totalQuantity) * 100;

  const handleBooking = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (quantity > remaining) {
      showToast("Requested quantity exceeds available stock!", "error");
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealId: deal._id,
          userId: user.id || (user as any)._id,
          userName: user.name,
          userEmail: user.email,
          userCity: (user as any).city || 'Unknown',
          quantity,
          totalAmount: deal.pricePerUnit * quantity
        }),
      });

      if (!response.ok) throw new Error('Order failed');

      if (deal._id) {
        updateDeal(deal._id, { bookedQuantity: deal.bookedQuantity + quantity });
      }
      
      showToast(`Successfully booked ${quantity} ${deal.unit} of ${deal.name}!`, "success");
      router.push('/dashboard');
    } catch (err) {
      showToast("Failed to place booking. Please try again.", "error");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <>
      <main className="container" style={{ paddingTop: '20px', paddingBottom: '40px' }}>
        <button 
          onClick={() => router.back()} 
          style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary)', fontWeight: 600 }}
        >
          ← Back to Deals
        </button>

        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <img 
            src={deal.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800'} 
            alt={deal.name} 
            style={{ width: '100%', height: '240px', objectFit: 'cover' }} 
          />
          
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h1 style={{ marginBottom: '4px' }}>{deal.name}</h1>
                <span className="badge badge-active">{deal.category}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>₹{deal.pricePerUnit}</div>
                <div style={{ fontSize: '0.875rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>Market: ₹{deal.marketPrice}</div>
              </div>
            </div>

            <p style={{ color: 'var(--foreground)', marginBottom: '24px' }}>{deal.description}</p>

            <div style={{ backgroundColor: '#F0F4F1', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600 }}>Booking Status</span>
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{Math.round(percentBooked)}% Full</span>
              </div>
              <div className="progress-container" style={{ height: '12px' }}>
                <div className="progress-bar" style={{ width: `${percentBooked}%` }} />
              </div>
              <p className="text-sm text-muted" style={{ marginTop: '8px' }}>
                {deal.bookedQuantity} {deal.unit} booked of {deal.totalQuantity} {deal.unit} available.
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Reserve Your Quantity</h3>
              
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label className="text-sm" style={{ display: 'block', marginBottom: '6px' }}>Quantity ({deal.unit})</label>
                  <input 
                    type="number" 
                    min="1" 
                    max={remaining}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  />
                </div>
                <div style={{ flex: 1, backgroundColor: '#E8F5E9', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                  <span className="text-sm" style={{ display: 'block', color: 'var(--primary)' }}>Total Savings</span>
                  <span style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>₹{totalSavings}</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', fontSize: '0.875rem' }}>
                <div className="card" style={{ margin: 0, padding: '12px', textAlign: 'center' }}>
                  <span className="text-muted" style={{ display: 'block' }}>Ends On</span>
                  <strong>{new Date(deal.endDate).toLocaleDateString()}</strong>
                </div>
                <div className="card" style={{ margin: 0, padding: '12px', textAlign: 'center' }}>
                  <span className="text-muted" style={{ display: 'block' }}>Delivery</span>
                  <strong>{new Date(deal.deliveryDate).toLocaleDateString()}</strong>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={isBooking || remaining <= 0}
                className="btn btn-primary" 
                style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}
              >
                {isBooking ? 'Processing...' : remaining <= 0 ? 'Deal Closed' : `Confirm Booking • ₹${deal.pricePerUnit * quantity}`}
              </button>
              
              {remaining > 0 && remaining < 50 && (
                <div style={{ textAlign: 'center', marginTop: '12px', color: 'var(--danger)', fontSize: '0.875rem', fontWeight: 600 }}>
                  🔥 Almost sold out! Only {remaining} {deal.unit} left.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
