'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Deal, mockDeals } from '@/data/deals';

interface DealContextType {
  deals: Deal[];
  addDeal: (deal: Omit<Deal, 'id' | 'bookedQuantity' | 'status'>) => void;
  updateDeal: (id: string, updates: Partial<Deal>) => void;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export function DealProvider({ children }: { children: React.ReactNode }) {
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const storedDeals = localStorage.getItem('fs_deals');
    if (storedDeals) {
      setDeals(JSON.parse(storedDeals));
    } else {
      setDeals(mockDeals);
      localStorage.setItem('fs_deals', JSON.stringify(mockDeals));
    }
  }, []);

  const addDeal = (newDeal: Omit<Deal, 'id' | 'bookedQuantity' | 'status'>) => {
    const deal: Deal = {
      ...newDeal,
      id: Math.random().toString(36).substr(2, 9),
      bookedQuantity: 0,
      status: 'active'
    };
    const updatedDeals = [...deals, deal];
    setDeals(updatedDeals);
    localStorage.setItem('fs_deals', JSON.stringify(updatedDeals));
  };

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    const updatedDeals = deals.map(d => d.id === id ? { ...d, ...updates } : d);
    setDeals(updatedDeals);
    localStorage.setItem('fs_deals', JSON.stringify(updatedDeals));
  };

  return (
    <DealContext.Provider value={{ deals, addDeal, updateDeal }}>
      {children}
    </DealContext.Provider>
  );
}

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) throw new Error('useDeals must be used within DealProvider');
  return context;
};
