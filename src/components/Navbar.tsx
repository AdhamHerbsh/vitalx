import { ShoppingCart, Menu, Dumbbell } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onAdminClick?: () => void;
}

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'weights', name: 'Weights' },
  { id: 'equipment', name: 'Equipment' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
];

export function Navbar({ cartCount, onCartClick, selectedCategory, onCategoryChange, onAdminClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-[#6c6c6c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Dumbbell className="w-8 h-8" style={{ color: '#DFCC8C' }} />
            <span className="text-[#DFCC8C]">IRON ELITE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`transition-colors ${
                  selectedCategory === category.id
                    ? 'text-[#DFCC8C]'
                    : 'text-[#9f9f9f] hover:text-[#DFCC8C]'
                }`}
              >
                {category.name}
              </button>
            ))}
            {onAdminClick && (
              <button
                onClick={onAdminClick}
                className="text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors"
              >
                Admin
              </button>
            )}
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DFCC8C] text-black rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#9f9f9f] hover:text-[#DFCC8C]"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#6c6c6c]">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 transition-colors ${
                  selectedCategory === category.id
                    ? 'text-[#DFCC8C]'
                    : 'text-[#9f9f9f] hover:text-[#DFCC8C]'
                }`}
              >
                {category.name}
              </button>
            ))}
            {onAdminClick && (
              <button
                onClick={() => {
                  onAdminClick();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors"
              >
                Admin
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}