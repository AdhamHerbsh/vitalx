import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import { AdminDashboard } from './components/AdminDashboard';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

type Page = 'home' | 'product' | 'checkout' | 'admin';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedProduct(null);
    window.scrollTo(0, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
    window.scrollTo(0, 0);
  };

  const handleAdminAccess = () => {
    setCurrentPage('admin');
    window.scrollTo(0, 0);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black">
      {currentPage === 'home' && (
        <>
          <Navbar 
            cartCount={cartCount} 
            onCartClick={() => setIsCartOpen(true)}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onAdminClick={handleAdminAccess}
          />
          <Hero />
          <ProductGrid 
            onAddToCart={addToCart}
            selectedCategory={selectedCategory}
            onProductClick={handleProductClick}
          />
          <Footer />
        </>
      )}

      {currentPage === 'product' && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onAddToCart={addToCart}
          onBack={handleBackToHome}
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
        />
      )}

      {currentPage === 'checkout' && (
        <Checkout
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onBack={handleBackToHome}
          cartCount={cartCount}
        />
      )}

      {currentPage === 'admin' && (
        <AdminDashboard
          onBack={handleBackToHome}
        />
      )}

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
