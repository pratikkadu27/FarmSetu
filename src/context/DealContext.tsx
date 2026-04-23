'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Deal } from '@/data/deals';

interface DealContextType {
  deals: Deal[];
  isLoading: boolean;
  addDeal: (deal: Omit<Deal, '_id' | 'bookedQuantity' | 'status'>) => Promise<void>;
  updateDeal: (id: string, updates: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export function DealProvider({ children }: { children: React.ReactNode }) {
  const [deals, setDeals] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDeals = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/deals');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDeals(data);
      }
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const addDeal = async (newDeal: any) => {
    try {
      const res = await fetch('/api/deals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDeal),
      });
      if (res.ok) fetchDeals();
    } catch (error) {
      console.error('Failed to add deal:', error);
    }
  };

  const updateDeal = async (id: string, updates: Partial<any>) => {
    try {
      const res = await fetch(`/api/deals/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) fetchDeals();
    } catch (error) {
      console.error('Failed to update deal:', error);
    }
  };

  const deleteDeal = async (id: string) => {
    try {
      const res = await fetch(`/api/deals/${id}`, { method: 'DELETE' });
      if (res.ok) fetchDeals();
    } catch (error) {
      console.error('Failed to delete deal:', error);
    }
  };

  return (
    <DealContext.Provider value={{ deals, isLoading, addDeal, updateDeal, deleteDeal }}>
      {children}
    </DealContext.Provider>
  );
}

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) throw new Error('useDeals must be used within DealProvider');
  return context;
};
