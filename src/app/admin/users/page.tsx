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

  const [users, setUsers] = useState<UserItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    } else if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user, authLoading, router]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok) {
        // Map _id from MongoDB to id for frontend
        const mappedUsers = data.map((u: any) => ({
          ...u,
          id: u._id
        }));
        setUsers(mappedUsers);
      }
    } catch (err) {
      showToast('Failed to load users', 'error');
    } finally {
      setDataLoading(false);
    }
  };

  if (authLoading || !user || user.role !== 'admin' || dataLoading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading user data...</div>;
  }

  const handleStatusChange = async (id: string, newStatus: 'active' | 'suspended') => {
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setUsers(users.map(u => u.id === id || (u as any)._id === id ? { ...u, status: newStatus } : u));
        showToast(`User ${newStatus === 'active' ? 'approved' : 'suspended'} successfully!`, 'success');
      }
    } catch (err) {
      showToast('Action failed', 'error');
    }
  };

  return (
    <>
      <main className="container" style={{ paddingTop: '30px', paddingBottom: '40px' }}>
        <header style={{ marginBottom: '30px' }}>
          <h1>User Management</h1>
          <p className="text-muted">Approve new registrations and manage member access.</p>
        </header>

        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '20px', padding: '0 16px', borderBottom: '1px solid var(--border)' }}>
            <Link href="/admin" style={{ padding: '10px 0', fontWeight: 600, color: 'var(--text-muted)' }}>Deals Management</Link>
            <Link href="/admin/users" style={{ padding: '10px 0', borderBottom: '3px solid var(--primary)', fontWeight: 700, color: 'var(--primary)' }}>User Management</Link>
            <Link href="/admin/founders" style={{ padding: '10px 0', fontWeight: 600, color: 'var(--text-muted)' }}>Founder Profiles</Link>
          </div>
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
