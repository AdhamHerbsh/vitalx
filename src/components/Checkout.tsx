import { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, Package, Truck } from 'lucide-react';
import { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface CheckoutProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onBack: () => void;
  cartCount: number;
}

export function Checkout({ cartItems, onUpdateQuantity, onRemoveItem, onBack, cartCount }: CheckoutProps) {
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Address
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    
    // Shipping Method
    shippingMethod: 'standard',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = formData.shippingMethod === 'express' ? 19.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    window.scrollTo(0, 0);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar 
          cartCount={0}
          onCartClick={() => {}}
          selectedCategory="all"
          onCategoryChange={() => {}}
        />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-[#1a1a1a] border border-[#DFCC8C] rounded-lg p-8 text-center">
            <div className="w-20 h-20 bg-[#DFCC8C] rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-[#DFCC8C] mb-4">Order Placed Successfully!</h1>
            <p className="text-[#9f9f9f] mb-8">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
              You will receive an email confirmation shortly.
            </p>
            <div className="bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg p-6 mb-8">
              <p className="text-[#868686] mb-2">Order Number</p>
              <p className="text-[#DFCC8C]">#IE{Date.now().toString().slice(-8)}</p>
            </div>
            <button
              onClick={onBack}
              className="bg-[#DFCC8C] hover:bg-[#DBC078] text-black px-8 py-3 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <Navbar 
          cartCount={cartCount}
          onCartClick={() => {}}
          selectedCategory="all"
          onCategoryChange={() => {}}
        />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Package className="w-16 h-16 text-[#6c6c6c] mx-auto mb-4" />
            <h2 className="text-white mb-4">Your cart is empty</h2>
            <p className="text-[#868686] mb-8">Add some products to your cart to proceed with checkout</p>
            <button
              onClick={onBack}
              className="bg-[#DFCC8C] hover:bg-[#DBC078] text-black px-8 py-3 rounded-lg transition-colors"
            >
              Browse Products
            </button>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar 
        cartCount={cartCount}
        onCartClick={() => {}}
        selectedCategory="all"
        onCategoryChange={() => {}}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Shopping
        </button>

        <h1 className="text-[#DFCC8C] mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
                <h2 className="text-white mb-6">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#9f9f9f] mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#9f9f9f] mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                      placeholder="(555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
                <h2 className="text-white mb-6">Shipping Address</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#9f9f9f] mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                      placeholder="Street address"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#9f9f9f] mb-2">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
                <h2 className="text-white mb-6">Shipping Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg cursor-pointer hover:border-[#DFCC8C] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#DFCC8C]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-[#DFCC8C]" />
                          <span className="text-white">Standard Shipping</span>
                        </div>
                        <p className="text-[#868686]">5-7 business days</p>
                      </div>
                    </div>
                    <span className="text-[#DFCC8C]">FREE</span>
                  </label>
                  <label className="flex items-center justify-between p-4 bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg cursor-pointer hover:border-[#DFCC8C] transition-colors">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#DFCC8C]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-5 h-5 text-[#DFCC8C]" />
                          <span className="text-white">Express Shipping</span>
                        </div>
                        <p className="text-[#868686]">2-3 business days</p>
                      </div>
                    </div>
                    <span className="text-[#DFCC8C]">$19.99</span>
                  </label>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-[#DFCC8C]" />
                  <h2 className="text-white">Payment Information</h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[#9f9f9f] mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#9f9f9f] mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                      placeholder="Name on card"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        placeholder="MM/YY"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[#9f9f9f] mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                        placeholder="123"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 p-3 bg-[#0a0a0a] rounded-lg">
                  <Lock className="w-4 h-4 text-[#DFCC8C]" />
                  <p className="text-[#868686]">Your payment information is secure and encrypted</p>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6 sticky top-24">
                <h2 className="text-white mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white truncate">{item.name}</p>
                        <p className="text-[#868686]">Qty: {item.quantity}</p>
                        <p className="text-[#DFCC8C]">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-6 border-t border-[#6c6c6c]">
                  <div className="flex justify-between text-[#9f9f9f]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#9f9f9f]">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-[#9f9f9f]">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white pt-3 border-t border-[#6c6c6c]">
                    <span>Total</span>
                    <span className="text-[#DFCC8C]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  className="w-full mt-6 bg-[#DFCC8C] hover:bg-[#DBC078] text-black py-4 rounded-lg transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
