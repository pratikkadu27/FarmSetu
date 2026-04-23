export interface Deal {
  _id: string;
  id?: string; // Keep for compatibility
  name: string;
  category: 'fruits' | 'vegetables' | 'grains';
  totalQuantity: number;
  bookedQuantity: number;
  pricePerUnit: number;
  marketPrice: number;
  unit: string;
  startDate: string;
  endDate: string;
  deliveryDate: string;
  status: 'active' | 'closed' | 'completed';
  image?: string;
  description: string;
}

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Organic Basmati Rice',
    category: 'grains',
    totalQuantity: 1000,
    bookedQuantity: 750,
    pricePerUnit: 85,
    marketPrice: 120,
    unit: 'kg',
    startDate: '2026-04-20',
    endDate: '2026-04-25',
    deliveryDate: '2026-04-28',
    status: 'active',
    description: 'Direct from the Himalayan foothills. Premium quality long-grain Basmati rice.',
    image: 'https://images.unsplash.com/photo-1586201375761-83865003e31c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    name: 'Fresh Alphonso Mangoes',
    category: 'fruits',
    totalQuantity: 500,
    bookedQuantity: 480,
    pricePerUnit: 600,
    marketPrice: 900,
    unit: 'dozen',
    startDate: '2026-04-21',
    endDate: '2026-04-24',
    deliveryDate: '2026-04-26',
    status: 'active',
    description: 'Devgad A-grade Alphonso mangoes. Naturally ripened and carbide-free.',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400'
  }
];
