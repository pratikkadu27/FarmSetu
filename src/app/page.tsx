'use client';

import Navbar from "@/components/Navbar";
import DealCard from "@/components/DealCard";
import { useDeals } from "@/context/DealContext";

export default function Home() {
  const { deals } = useDeals();
  const activeDeals = deals.filter(d => d.status === 'active');

  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '80px' }}>
        <header style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--secondary)', marginBottom: '10px' }}>
            Fresh Harvest Deals 🌿
          </h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto' }}>
            Direct bulk sourcing from local farmers. High quality, lower prices, maximum savings.
          </p>
        </header>

        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Active Group Deals</h2>
            <span className="badge badge-active">{activeDeals.length} Available</span>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {activeDeals.map(deal => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        </section>

        {/* Categories / Benefits */}
        <section style={{ marginTop: '40px' }}>
          <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none' }}>
            <h3 style={{ color: 'white' }}>How it works?</h3>
            <ol style={{ paddingLeft: '20px', marginTop: '10px', fontSize: '0.9rem' }}>
              <li>Browse bulk deals sourced directly from farms.</li>
              <li>Book your required quantity before the deal closes.</li>
              <li>Wait for procurement and delivery updates.</li>
              <li>Get fresh produce at the best prices!</li>
            </ol>
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
