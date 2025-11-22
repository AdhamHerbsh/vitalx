import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../App';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  return (
    <div className="group bg-[#000000] border border-[#6c6c6c] rounded-lg overflow-hidden hover:border-[#DFCC8C] transition-all duration-300">
      {/* Product Image */}
      <div 
        className="relative aspect-square overflow-hidden bg-[#1a1a1a] cursor-pointer"
        onClick={() => onProductClick(product)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-[#DFCC8C]/10 border border-[#DFCC8C]/30 rounded text-[#DFCC8C]">
            {product.category}
          </span>
        </div>
        <h3 
          className="text-white mb-2 cursor-pointer hover:text-[#DFCC8C] transition-colors"
          onClick={() => onProductClick(product)}
        >
          {product.name}
        </h3>
        <p className="text-[#868686] mb-4">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-[#DFCC8C]">${product.price}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="flex items-center gap-2 bg-[#DFCC8C] hover:bg-[#DBC078] text-black px-4 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}