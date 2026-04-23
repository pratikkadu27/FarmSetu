import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#f9fafb', 
      color: 'var(--foreground)', 
      padding: '40px 0 30px',
      marginTop: 'auto',
      borderTop: '1px solid var(--border)'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '40px',
          marginBottom: '30px'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 3' }}>
            <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem' }}>🌿</span> FarmSetu
            </Link>
            <p style={{ color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6', fontSize: '0.9rem' }}>
              Empowering communities by connecting them directly with local farmers. Fresh harvest, fair prices, and zero middlemen.
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'var(--foreground)', marginBottom: '16px', fontSize: '1rem' }}>Support</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.9rem' }}>
              <li style={{ marginBottom: '8px' }}><Link href="#" style={{ color: 'var(--text-muted)' }}>Help Center</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</Link></li>
              <li style={{ marginBottom: '8px' }}><Link href="#" style={{ color: 'var(--text-muted)' }}>Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--border)', 
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} FarmSetu. Built for sustainable agriculture.
          </p>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
            <Link href="#" style={{ color: 'var(--text-muted)' }}>Twitter</Link>
            <Link href="#" style={{ color: 'var(--text-muted)' }}>Instagram</Link>
            <Link href="#" style={{ color: 'var(--text-muted)' }}>LinkedIn</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
