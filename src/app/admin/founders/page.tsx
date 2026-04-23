'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

export default function AdminFoundersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  
  const [founders, setFounders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFounder, setEditingFounder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    image: '',
    linkedIn: ''
  });

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    } else {
      fetchFounders();
    }
  }, [user, authLoading, router]);

  const fetchFounders = async () => {
    try {
      const res = await fetch('/api/founders');
      const data = await res.json();
      if (res.ok) setFounders(data);
    } catch (err) {
      showToast('Failed to load founders', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingFounder ? 'PATCH' : 'POST';
    const url = editingFounder ? `/api/founders/${editingFounder._id}` : '/api/founders';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        showToast(`Founder ${editingFounder ? 'updated' : 'added'} successfully`, 'success');
        setIsModalOpen(false);
        setEditingFounder(null);
        setFormData({ name: '', role: '', bio: '', image: '', linkedIn: '' });
        fetchFounders();
      }
    } catch (err) {
      showToast('Operation failed', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this founder?')) return;
    
    try {
      const res = await fetch(`/api/founders/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Founder removed', 'info');
        fetchFounders();
      }
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  const openEdit = (founder: any) => {
    setEditingFounder(founder);
    setFormData({
      name: founder.name,
      role: founder.role,
      bio: founder.bio,
      image: founder.image || '',
      linkedIn: founder.linkedIn || ''
    });
    setIsModalOpen(true);
  };

  if (authLoading || loading) return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/admin" style={{ padding: '10px 0', fontWeight: 600, color: 'var(--text-muted)' }}>Deals Management</Link>
        <Link href="/admin/users" style={{ padding: '10px 0', fontWeight: 600, color: 'var(--text-muted)' }}>User Management</Link>
        <Link href="/admin/founders" style={{ padding: '10px 0', borderBottom: '3px solid var(--primary)', fontWeight: 700, color: 'var(--primary)' }}>Founder Profiles</Link>
      </div>

      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Manage Founders</h1>
        <button className="btn btn-primary" onClick={() => { setEditingFounder(null); setIsModalOpen(true); }}>+ Add Founder</button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {founders.map(f => (
          <div key={f._id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#eee', overflow: 'hidden' }}>
                  {f.image ? <img src={f.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ textAlign: 'center', lineHeight: '50px' }}>👤</div>}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>{f.name}</h3>
                  <span className="text-sm text-muted">{f.role}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => openEdit(f)} style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(f._id)} style={{ color: 'var(--danger)', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
            <p className="text-sm text-muted" style={{ lineHeight: '1.5' }}>{f.bio.slice(0, 100)}...</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ marginBottom: '20px' }}>{editingFounder ? 'Edit Founder' : 'Add New Founder'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label className="text-sm">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label className="text-sm">Role</label>
                <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="input" style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label className="text-sm">Bio</label>
                <textarea required value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={4} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid var(--border)', fontFamily: 'inherit' }} />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label className="text-sm">Image URL (Optional)</label>
                <input value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label className="text-sm">LinkedIn URL (Optional)</label>
                <input value={formData.linkedIn} onChange={e => setFormData({...formData, linkedIn: e.target.value})} style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '8px', border: '1px solid var(--border)' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">{editingFounder ? 'Save Changes' : 'Add Founder'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
