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
    <div className="card card-hover animate-fade-in" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: '160px' }}>
        <img 
          src={deal.image || 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=400'} 
          alt={deal.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'var(--primary)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '30px',
          fontSize: '0.7rem',
          fontWeight: 800,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Save {savingsPercent}%
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span className="text-xs" style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '0.5px', 
              color: 'var(--primary)', 
              fontWeight: 700 
            }}>
              {deal.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>₹{deal.pricePerUnit}</span>
              <span className="text-xs text-muted">/{deal.unit}</span>
            </div>
          </div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {deal.name}
          </h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '2px' }}>
            <span className="text-xs text-muted" style={{ textDecoration: 'line-through' }}>MRP: ₹{deal.marketPrice}</span>
            <span className="text-xs" style={{ color: 'var(--success)', fontWeight: 600 }}>Best Price</span>
          </div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span className="text-xs" style={{ fontWeight: 700, color: isSoldOut ? 'var(--danger)' : 'var(--foreground)' }}>
              {isSoldOut ? 'Sold Out!' : `${Math.round(percentBooked)}% Booked`}
            </span>
            <span className="text-xs text-muted">{deal.totalQuantity - deal.bookedQuantity} {deal.unit} left</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ 
                width: `${percentBooked}%`,
                background: isSoldOut ? 'var(--danger)' : undefined
              }}
            />
          </div>
        </div>

        <Link 
          href={`/deals/${deal._id}`}
          className={`btn ${isSoldOut ? 'btn-outline' : 'btn-primary'}`}
          style={{ width: '100%', padding: '10px 0', fontSize: '0.9rem' }}
        >
          {isSoldOut ? 'View Details' : 'Book Now'}
        </Link>
      </div>
    </div>
  );
}
