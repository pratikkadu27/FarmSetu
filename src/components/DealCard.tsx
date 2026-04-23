'use client';

import Link from 'next/link';
import { Deal } from '@/data/deals';

interface DealCardProps {
  deal: Deal;
}

export default function DealCard({ deal }: DealCardProps) {
  const percentBooked = Math.min((deal.bookedQuantity / deal.totalQuantity) * 100, 100);
  const isSoldOut = deal.bookedQuantity >= deal.totalQuantity;
  const savings = deal.marketPrice - deal.pricePerUnit;
  const savingsPercent = Math.round((savings / deal.marketPrice) * 100);

  return (
    <div className="card animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '180px' }}>
        <img 
          src={deal.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'} 
          alt={deal.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'var(--accent)',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 700
        }}>
          Save {savingsPercent}%
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{deal.name}</h3>
            <span className="text-muted text-sm" style={{ textTransform: 'capitalize' }}>{deal.category}</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>₹{deal.pricePerUnit}</span>
            <span className="text-sm" style={{ color: 'var(--text-muted)' }}>/{deal.unit}</span>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span className="text-sm" style={{ fontWeight: 600 }}>
              {isSoldOut ? 'Sold Out!' : 'Booking Progress'}
            </span>
            <span className="text-sm text-muted">{Math.round(percentBooked)}%</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${percentBooked}%`,
                backgroundColor: isSoldOut ? 'var(--danger)' : 'var(--primary)'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
            <span className="text-sm text-muted">{deal.bookedQuantity} {deal.unit} booked</span>
            <span className="text-sm text-muted">{deal.totalQuantity - deal.bookedQuantity} {deal.unit} left</span>
          </div>
        </div>

        <Link 
          href={`/deals/${deal._id}`}
          className={`btn ${isSoldOut ? 'btn-outline' : 'btn-primary'}`}
          style={{ width: '100%' }}
        >
          {isSoldOut ? 'View Details' : 'Book Now'}
        </Link>
      </div>
    </div>
  );
}
