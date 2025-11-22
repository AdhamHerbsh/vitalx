# IRON ELITE - Project Structure & Configuration

## Project Overview
A complete e-commerce website for gym supplies with admin dashboard, product management, checkout system, and customer reviews.

## Color Palette
- Primary Gold: `#DFCC8C`
- Secondary Gold: `#DBC078`
- Dark Gray: `#868686`
- Medium Gray: `#9f9f9f`
- Light Gray: `#6c6c6c`
- Black: `#000000`

## File Structure

### Root Level
- **App.tsx** - Main application component with routing logic
- **styles/globals.css** - Global styles and Tailwind configuration

### Data Layer
- **data/products.ts** - Centralized product data with admin information
  - `products[]` - Base product array
  - `productsWithAdminData[]` - Products with stock, sales, and revenue data
  - Interfaces: `Product`, `ProductData`

### Components

#### Core Pages
1. **Hero.tsx** - Landing page hero section with CTA
2. **ProductGrid.tsx** - Product listing with category filtering
3. **ProductDetails.tsx** - Full product page with reviews (standalone with header/footer)
4. **Checkout.tsx** - Complete checkout flow (standalone with header/footer)
5. **AdminDashboard.tsx** - Admin panel with product management (standalone with header/footer)

#### Shared Components
1. **Navbar.tsx** - Navigation bar with cart and admin access
2. **Footer.tsx** - Footer with links and social media
3. **Cart.tsx** - Sliding cart panel
4. **ProductCard.tsx** - Individual product display card
5. **ReviewSection.tsx** - Product reviews and rating system

#### UI Components
- Located in `/components/ui/`
- Shadcn/ui components for consistent design

#### Utility Components
- **ImageWithFallback.tsx** - Image component with fallback support

## Application Flow

### Page Navigation
```
Home (default)
├── Product Details (click product)
├── Checkout (from cart)
└── Admin Dashboard (from nav menu)
```

### State Management
- `currentPage`: Controls which page is displayed
- `cartItems`: Shopping cart state
- `selectedProduct`: Currently viewed product
- `selectedCategory`: Active product category filter

## Key Features

### Customer Features
1. **Product Browsing**
   - Category filtering (All, Weights, Equipment, Apparel, Accessories)
   - Product cards with images and pricing
   - Click to view details

2. **Product Details**
   - Image gallery with thumbnails
   - Specifications
   - Customer reviews (5-star system)
   - Write reviews
   - Quantity selector
   - Add to cart

3. **Shopping Cart**
   - Slide-out panel
   - Quantity adjustment
   - Remove items
   - Price calculations
   - Checkout button

4. **Checkout**
   - Contact information form
   - Shipping address
   - Shipping method selection (Standard Free / Express $19.99)
   - Payment information
   - Order summary
   - Tax calculation (8%)
   - Success confirmation

5. **Reviews**
   - 5-star rating system
   - Written reviews
   - Verified purchase badges
   - Helpful voting
   - Rating distribution

### Admin Features
1. **Dashboard Statistics**
   - Total Products: 12
   - Total Revenue: $418,171.15
   - Total Sales: 3,185
   - Low/Out of Stock alerts: 3

2. **Product Management**
   - Search products
   - Filter by category
   - Filter by status (Active/Low Stock/Out of Stock)
   - View product details
   - Stock levels
   - Sales data
   - Revenue tracking
   - Edit/Delete actions (UI ready)

3. **Data Display**
   - Comprehensive product table
   - Status indicators with color coding
   - Product images
   - Real-time filtering

## Component Props

### App.tsx
Main component managing global state and routing.

### Navbar
```typescript
interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAdminClick?: () => void;
}
```

### ProductGrid
```typescript
interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onProductClick: (product: Product) => void;
}
```

### ProductDetails
```typescript
interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  cartCount: number;
  onCartClick: () => void;
}
```

### Checkout
```typescript
interface CheckoutProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  cartCount: number;
}
```

### AdminDashboard
```typescript
interface AdminDashboardProps {
  onBack: () => void;
}
```

### Cart
```typescript
interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}
```

## Data Models

### Product
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}
```

### CartItem
```typescript
interface CartItem extends Product {
  quantity: number;
}
```

### ProductData (Admin)
```typescript
interface ProductData extends Product {
  stock: number;
  sales: number;
  revenue: number;
  status: 'active' | 'low-stock' | 'out-of-stock';
}
```

## Products Catalog

1. Professional Dumbbell Set - $299.99 (Weights)
2. Olympic Barbell - $449.99 (Weights)
3. Adjustable Bench - $399.99 (Equipment)
4. Power Rack - $899.99 (Equipment)
5. Kettlebell Set - $199.99 (Weights)
6. Performance Tee - $39.99 (Apparel)
7. Training Shorts - $49.99 (Apparel)
8. Resistance Bands Set - $59.99 (Accessories)
9. Gym Gloves - $29.99 (Accessories)
10. Weight Plates Set - $349.99 (Weights)
11. Yoga Mat Pro - $79.99 (Accessories)
12. Foam Roller - $44.99 (Accessories)

## Technical Stack

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4.0
- **Icons**: Lucide React
- **Images**: Unsplash (via ImageWithFallback component)
- **UI Components**: Shadcn/ui

## Responsive Design

- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- Mobile menu for navigation
- Responsive grid layouts
- Touch-friendly interfaces

## Notes

- All files are properly connected and imported
- Shared data source prevents duplication
- Standalone pages include their own header/footer
- Admin access via navigation menu
- Color scheme consistently applied throughout
- Form validation on checkout
- Mock data for reviews and admin statistics
