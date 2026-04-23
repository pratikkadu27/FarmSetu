'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/context/ToastContext';

interface UserItem {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'suspended';
  city: string;
}

export default function UserManagementPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [users, setUsers] = useState<UserItem[]>([
    { id: '1', name: 'Sarah Jenkins', email: 'sarah@example.com', status: 'pending', city: 'Mumbai' },
    { id: '2', name: 'Michael Chen', email: 'mike@example.com', status: 'active', city: 'Pune' },
    { id: '3', name: 'Almas Khan', email: 'almas@example.com', status: 'pending', city: 'Delhi' },
  ]);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== 'admin') {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading user data...</div>;
  }

  const handleStatusChange = (id: string, newStatus: 'active' | 'suspended') => {
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    showToast(`User ${newStatus === 'active' ? 'approved' : 'suspended'} successfully!`, 'success');
  };

  return (
    <>
      <Navbar />
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1>User Management</h1>
          <p className="text-muted">Approve new registrations and manage member access.</p>
        </header>

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#F0F4F1', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '16px', fontSize: '0.875rem' }}>User Details</th>
                <th style={{ padding: '16px', fontSize: '0.875rem' }}>City</th>
                <th style={{ padding: '16px', fontSize: '0.875rem' }}>Status</th>
                <th style={{ padding: '16px', fontSize: '0.875rem' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 600 }}>{u.name}</div>
                    <div className="text-sm text-muted">{u.email}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '0.9rem' }}>{u.city}</td>
                  <td style={{ padding: '16px' }}>
                    <span className={`badge ${u.status === 'active' ? 'badge-active' : ''}`} style={{
                      backgroundColor: u.status === 'pending' ? '#FFD54F' : u.status === 'suspended' ? '#EF9A9A' : '',
                      color: u.status === 'pending' ? '#827717' : u.status === 'suspended' ? '#C62828' : '',
                    }}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px' }}>
                    {u.status === 'pending' && (
                      <button 
                        onClick={() => handleStatusChange(u.id, 'active')}
                        className="btn btn-primary" 
                        style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                      >
                        Approve
                      </button>
                    )}
                    {u.status === 'active' && (
                      <button 
                         onClick={() => handleStatusChange(u.id, 'suspended')}
                         style={{ color: 'var(--danger)', fontWeight: 600, fontSize: '0.875rem' }}
                      >
                        Suspend
                      </button>
                    )}
                    {u.status === 'suspended' && (
                      <button 
                        onClick={() => handleStatusChange(u.id, 'active')}
                        style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}
                      >
                        Reactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
