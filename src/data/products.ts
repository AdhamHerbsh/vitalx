import { Product } from '../App';

export const products: Product[] = [
  {
    id: '1',
    name: 'Professional Dumbbell Set',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&h=800&fit=crop',
    category: 'weights',
    description: 'Premium rubber-coated dumbbells, 5-50 lbs'
  },
  {
    id: '2',
    name: 'Olympic Barbell',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
    category: 'weights',
    description: '45 lb professional Olympic barbell'
  },
  {
    id: '3',
    name: 'Adjustable Bench',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1623874514711-0f321325f318?w=800&h=800&fit=crop',
    category: 'equipment',
    description: 'Multi-position adjustable workout bench'
  },
  {
    id: '4',
    name: 'Power Rack',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
    category: 'equipment',
    description: 'Heavy-duty squat and power rack'
  },
  {
    id: '5',
    name: 'Kettlebell Set',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
    category: 'weights',
    description: 'Cast iron kettlebells, 10-50 lbs'
  },
  {
    id: '6',
    name: 'Performance Tee',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop',
    category: 'apparel',
    description: 'Moisture-wicking training shirt'
  },
  {
    id: '7',
    name: 'Training Shorts',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&h=800&fit=crop',
    category: 'apparel',
    description: 'Premium athletic shorts'
  },
  {
    id: '8',
    name: 'Resistance Bands Set',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
    category: 'accessories',
    description: 'Complete resistance band kit'
  },
  {
    id: '9',
    name: 'Gym Gloves',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=800&fit=crop',
    category: 'accessories',
    description: 'Premium leather training gloves'
  },
  {
    id: '10',
    name: 'Weight Plates Set',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=800&fit=crop',
    category: 'weights',
    description: 'Olympic weight plates, 300 lbs total'
  },
  {
    id: '11',
    name: 'Yoga Mat Pro',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=800&fit=crop',
    category: 'accessories',
    description: 'Extra thick non-slip yoga mat'
  },
  {
    id: '12',
    name: 'Foam Roller',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&h=800&fit=crop',
    category: 'accessories',
    description: 'High-density muscle recovery roller'
  },
];

// Extended product data with admin information
export interface ProductData {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  sales: number;
  revenue: number;
  status: 'active' | 'low-stock' | 'out-of-stock';
}

export const productsWithAdminData: ProductData[] = [
  {
    ...products[0],
    stock: 45,
    sales: 127,
    revenue: 38098.73,
    status: 'active',
  },
  {
    ...products[1],
    stock: 28,
    sales: 89,
    revenue: 40049.11,
    status: 'active',
  },
  {
    ...products[2],
    stock: 15,
    sales: 156,
    revenue: 62398.44,
    status: 'active',
  },
  {
    ...products[3],
    stock: 8,
    sales: 67,
    revenue: 60299.33,
    status: 'low-stock',
  },
  {
    ...products[4],
    stock: 52,
    sales: 234,
    revenue: 46797.66,
    status: 'active',
  },
  {
    ...products[5],
    stock: 0,
    sales: 445,
    revenue: 17795.55,
    status: 'out-of-stock',
  },
  {
    ...products[6],
    stock: 123,
    sales: 389,
    revenue: 19446.11,
    status: 'active',
  },
  {
    ...products[7],
    stock: 76,
    sales: 312,
    revenue: 18716.88,
    status: 'active',
  },
  {
    ...products[8],
    stock: 5,
    sales: 567,
    revenue: 17004.33,
    status: 'low-stock',
  },
  {
    ...products[9],
    stock: 34,
    sales: 98,
    revenue: 34299.02,
    status: 'active',
  },
  {
    ...products[10],
    stock: 91,
    sales: 278,
    revenue: 22237.22,
    status: 'active',
  },
  {
    ...products[11],
    stock: 67,
    sales: 423,
    revenue: 19029.77,
    status: 'active',
  },
];
