import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ReviewSection } from './ReviewSection';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface ProductDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  cartCount: number;
  onCartClick: () => void;
}

// Mock additional product images
const getProductImages = (product: Product) => {
  return [
    product.image,
    product.image,
    product.image,
  ];
};

// Mock product specifications
const getProductSpecs = (category: string) => {
  const specs: Record<string, string[]> = {
    weights: [
      'Material: Premium rubber-coated steel',
      'Weight Range: 5-50 lbs',
      'Grip: Ergonomic knurled handles',
      'Warranty: 5 years',
    ],
    equipment: [
      'Construction: Heavy-duty steel frame',
      'Max Weight Capacity: 500 lbs',
      'Dimensions: 48" x 24" x 52"',
      'Warranty: 10 years',
    ],
    apparel: [
      'Material: Moisture-wicking polyester blend',
      'Fit: Athletic cut',
      'Care: Machine washable',
      'Sizes: S, M, L, XL, XXL',
    ],
    accessories: [
      'Material: High-quality synthetic',
      'Durability: Commercial grade',
      'Care: Easy to clean',
      'Warranty: 2 years',
    ],
  };
  return specs[category] || specs.accessories;
};

export function ProductDetails({ product, onAddToCart, onBack, cartCount, onCartClick }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const images = getProductImages(product);
  const specs = getProductSpecs(product.category);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar 
        cartCount={cartCount}
        onCartClick={onCartClick}
        selectedCategory="all"
        onCategoryChange={() => {}}
      />

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="aspect-square mb-4 rounded-lg overflow-hidden bg-[#1a1a1a] border border-[#6c6c6c]">
              <ImageWithFallback
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-[#DFCC8C]'
                      : 'border-[#6c6c6c] hover:border-[#9f9f9f]'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-[#DFCC8C]/10 border border-[#DFCC8C]/30 rounded-full text-[#DFCC8C]">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= 4 ? 'fill-[#DFCC8C] text-[#DFCC8C]' : 'text-[#6c6c6c]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[#9f9f9f]">4.0 (127 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-[#DFCC8C]">${product.price}</span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-white mb-3">Description</h3>
              <p className="text-[#9f9f9f] leading-relaxed">
                {product.description}. Built with premium materials and engineered for 
                professional athletes. This product represents the pinnacle of gym equipment 
                design and functionality, ensuring you get the most out of every workout.
              </p>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h3 className="text-white mb-3">Specifications</h3>
              <ul className="space-y-2">
                {specs.map((spec, index) => (
                  <li key={index} className="flex items-start gap-2 text-[#9f9f9f]">
                    <span className="text-[#DFCC8C] mt-1">•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-[#6c6c6c] text-[#9f9f9f] hover:border-[#DFCC8C] hover:text-[#DFCC8C] transition-colors"
                >
                  -
                </button>
                <span className="text-white w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-[#6c6c6c] text-[#9f9f9f] hover:border-[#DFCC8C] hover:text-[#DFCC8C] transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-3 bg-[#DFCC8C] hover:bg-[#DBC078] text-black py-4 rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-[#6c6c6c]">
              <div className="text-center">
                <div className="text-[#DFCC8C] mb-1">✓</div>
                <p className="text-[#868686]">Free Shipping</p>
              </div>
              <div className="text-center">
                <div className="text-[#DFCC8C] mb-1">✓</div>
                <p className="text-[#868686]">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <div className="text-[#DFCC8C] mb-1">✓</div>
                <p className="text-[#868686]">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <ReviewSection productId={product.id} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
