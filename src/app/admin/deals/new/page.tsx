'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useDeals } from '@/context/DealContext';
import { useToast } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';

export default function NewDealPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { addDeal } = useDeals();
  const { showToast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables',
    totalQuantity: 0,
    pricePerUnit: 0,
    marketPrice: 0,
    unit: 'kg',
    startDate: '',
    endDate: '',
    deliveryDate: '',
    description: '',
    image: ''
  });

  if (authLoading) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;
  if (!user || user.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDeal(formData as any);
    showToast('New deal published successfully! 🌿', 'success');
    router.push('/admin');
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    marginTop: '6px'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--secondary)',
    marginTop: '16px'
  };

  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <button 
          onClick={() => router.back()} 
          style={{ marginBottom: '16px', color: 'var(--primary)', fontWeight: 600 }}
        >
          ← Back to Dashboard
        </button>

        <div className="card">
          <h1>Create New Bulk Deal</h1>
          <p className="text-muted text-sm">Fill in the details to launch a new farm-to-consumer deal.</p>

          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Product Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Premium Sona Masuri Rice" 
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select 
                  style={inputStyle}
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                >
                  <option value="grains">Grains</option>
                  <option value="fruits">Fruits</option>
                  <option value="vegetables">Vegetables</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Unit (kg, dozen, etc.)</label>
                <input 
                  type="text" 
                  required 
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  placeholder="kg" 
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>Total Quantity Available</label>
                <input 
                  type="number" 
                  required 
                  value={formData.totalQuantity}
                  onChange={(e) => setFormData({...formData, totalQuantity: Number(e.target.value)})}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>Price Per Unit (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={formData.pricePerUnit}
                  onChange={(e) => setFormData({...formData, pricePerUnit: Number(e.target.value)})}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>Market Price (₹)</label>
                <input 
                  type="number" 
                  required 
                  value={formData.marketPrice}
                  onChange={(e) => setFormData({...formData, marketPrice: Number(e.target.value)})}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>Start Date</label>
                <input 
                  type="date" 
                  required 
                  value={formData.startDate}
                  onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>End Date</label>
                <input 
                  type="date" 
                  required 
                  value={formData.endDate}
                  onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  style={inputStyle} 
                />
              </div>

              <div>
                <label style={labelStyle}>Delivery Date</label>
                <input 
                  type="date" 
                  required 
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                  style={inputStyle} 
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Description</label>
                <textarea 
                  required 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the quality, source, and highlights..." 
                  style={{ ...inputStyle, fontFamily: 'inherit' }} 
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Product Image URL</label>
                <input 
                  type="url" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://images.unsplash.com/..." 
                  style={inputStyle} 
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '30px', fontSize: '1.1rem' }}>
              Publish Deal 🌿
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
