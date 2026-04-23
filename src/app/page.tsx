'use client';

import Link from 'next/link';
import Navbar from "@/components/Navbar";
import DealCard from "@/components/DealCard";
import { useDeals } from "@/context/DealContext";

export default function Home() {
  const { deals, isLoading } = useDeals();
  const activeDeals = deals.filter(d => d.status === 'active');

  return (
    <>
      {/* Hero Section */}
      <section style={{ 
        background: 'var(--secondary)', 
        color: 'white', 
        padding: '80px 0 60px', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")',
          pointerEvents: 'none'
        }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="badge" style={{ background: 'var(--primary-light)', color: 'var(--secondary)', marginBottom: '16px' }}>Direct from Farmers</span>
          <h1 style={{ fontSize: '3.5rem', color: 'white', marginBottom: '20px', letterSpacing: '-1px' }}>
            Fresh Harvest Deals 🌿
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 32px', fontSize: '1.1rem' }}>
            Join community-led group deals to source high-quality produce directly from local farms at wholesale prices.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <Link href="#deals" className="btn btn-primary" style={{ background: 'var(--primary-light)', color: 'var(--secondary)' }}>Explore Deals</Link>
            <Link href="/how-it-works" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>How it Works</Link>
          </div>
        </div>
      </section>

      <main className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }} id="deals">
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>Active Group Deals</h2>
              <p className="text-muted text-sm">Real-time opportunities to save on fresh produce</p>
            </div>
            <span className="badge badge-active">{activeDeals.length} Available Now</span>
          </div>

          <div className="deals-grid">
            {isLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="card" style={{ height: '320px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.02)' }}>
                  <p className="text-muted animate-pulse">⏳ Loading...</p>
                </div>
              ))
            ) : activeDeals.length === 0 ? (
              <div className="card" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', borderStyle: 'dashed' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌿</div>
                <h3>No active deals at the moment</h3>
                <p className="text-muted">Farmers are preparing their next harvest. Check back soon!</p>
              </div>
            ) : (
              activeDeals.map(deal => (
                <DealCard key={deal._id} deal={deal} />
              ))
            )}
          </div>
        </section>

        {/* Features / Benefits */}
        <section style={{ marginTop: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2rem' }}>Why Choose FarmSetu?</h2>
            <p className="text-muted">Bridging the gap between rural farms and urban demand.</p>
          </div>
          
          <div className="deals-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div className="card glass card-hover" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🚜</div>
              <h4>Direct Sourcing</h4>
              <p className="text-sm text-muted">Eliminate middlemen and get produce straight from the source.</p>
            </div>
            <div className="card glass card-hover" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>💰</div>
              <h4>Wholesale Prices</h4>
              <p className="text-sm text-muted">Save up to 40% compared to local retail market prices.</p>
            </div>
            <div className="card glass card-hover" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🌱</div>
              <h4>Verified Quality</h4>
              <p className="text-sm text-muted">Every harvest is inspected to ensure premium quality standards.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action for PWA feel on mobile */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 40px)',
        maxWidth: '560px',
        display: 'none' /* Will show on mobile if needed */
      }}>
        {/* Mobile Navigation or CTA */}
      </div>
    </>
  );
}
