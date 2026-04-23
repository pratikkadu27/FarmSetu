'use client';

import Link from 'next/link';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover Bulk Deals",
      description: "Browse curated harvest deals directly from verified local farms. We group demand to unlock wholesale pricing for you.",
      icon: "🌾"
    },
    {
      number: "02",
      title: "Join the Group",
      description: "Select the quantity you need and reserve your spot in the deal. The more people join, the more certain the harvest collection becomes.",
      icon: "🤝"
    },
    {
      number: "03",
      title: "Quality Inspection",
      description: "Once the deal goal is reached, our team inspects the harvest at the farm to ensure it meets our premium quality standards.",
      icon: "✅"
    },
    {
      number: "04",
      title: "Doorstep Delivery",
      description: "Fresh produce is packed and delivered directly to your doorstep or community collection point within 48 hours of harvest.",
      icon: "🚚"
    }
  ];

  return (
    <main style={{ backgroundColor: 'var(--background-alt)', minHeight: '100vh' }}>
      {/* Header section */}
      <section style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '20px' }}>How FarmSetu Works</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
            A transparent and sustainable way to source fresh produce while supporting local farmers.
          </p>
        </div>
      </section>

      {/* Steps section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {steps.map((step, index) => (
              <div key={index} className="card" style={{ padding: '40px', position: 'relative' }}>
                <span style={{ 
                  position: 'absolute', 
                  top: '20px', 
                  right: '20px', 
                  fontSize: '3rem', 
                  fontWeight: 900, 
                  opacity: 0.05,
                  userSelect: 'none'
                }}>
                  {step.number}
                </span>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{step.icon}</div>
                <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{step.title}</h3>
                <p className="text-muted" style={{ lineHeight: '1.6' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits section */}
      <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Why it matters?</h2>
              <div style={{ display: 'grid', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>🌟</div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>Higher Earnings for Farmers</h4>
                    <p className="text-muted text-sm">Farmers get up to 2x more value by selling directly to consumers through grouped demand.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>🍃</div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}> fresher Produce</h4>
                    <p className="text-muted text-sm">Reduced travel time means produce stays nutrient-rich and reaches you faster than retail stores.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '1.5rem' }}>📉</div>
                  <div>
                    <h4 style={{ marginBottom: '4px' }}>Lower Carbon Footprint</h4>
                    <p className="text-muted text-sm">Efficient logistics and less packaging mean a significantly lower environmental impact.</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: '1 1 400px', backgroundColor: 'var(--secondary)', padding: '50px', borderRadius: '24px', color: 'white' }}>
              <h2 style={{ color: 'white', marginBottom: '20px' }}>Ready to start?</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
                Join thousands of families saving on high-quality produce while building a better food system.
              </p>
              <Link href="/" className="btn btn-primary" style={{ width: '100%', padding: '16px', textAlign: 'center', backgroundColor: 'var(--primary-light)', color: 'var(--secondary)' }}>
                Browse Active Deals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
