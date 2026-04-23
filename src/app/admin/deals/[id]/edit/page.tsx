'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useDeals } from '@/context/DealContext';
import { useToast } from '@/context/ToastContext';
import Navbar from '@/components/Navbar';
import { Deal } from '@/data/deals';

export default function EditDealPage() {
  const { id } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const { deals, updateDeal } = useDeals();
  const { showToast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState<Deal | null>(null);

  useEffect(() => {
    const deal = deals.find(d => d._id === id);
    if (deal) {
      setFormData(deal);
    }
  }, [id, deals]);

  if (authLoading || !formData) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading deal...</div>;
  
  if (!user || user.role !== 'admin') {
    router.push('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      updateDeal(formData._id, formData);
      showToast('Deal updated successfully! 🌿', 'success');
      router.push('/admin');
    }
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
          <h1>Edit Deal: {formData.name}</h1>
          
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Product Name</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                <label style={labelStyle}>Status</label>
                <select 
                  style={inputStyle}
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                >
                  <option value="active">Active</option>
                  <option value="closed">Closed (Frozen)</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Total Quantity</label>
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

              <div style={{ gridColumn: 'span 2' }}>
                <label style={labelStyle}>Description</label>
                <textarea 
                  required 
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{ ...inputStyle, fontFamily: 'inherit' }} 
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
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', marginTop: '30px', fontSize: '1.1rem' }}>
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
