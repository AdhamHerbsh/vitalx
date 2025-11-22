import { ProductCard } from './ProductCard';
import { Product } from '../App';
import { products } from '../data/products';

interface ProductGridProps {
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onProductClick: (product: Product) => void;
}

export function ProductGrid({ onAddToCart, selectedCategory, onProductClick }: ProductGridProps) {
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h2 className="text-[#DFCC8C] mb-2">Our Products</h2>
        <p className="text-[#9f9f9f]">
          {selectedCategory === 'all' 
            ? 'Browse our complete collection' 
            : `${filteredProducts.length} products in ${selectedCategory}`}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onProductClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
}
