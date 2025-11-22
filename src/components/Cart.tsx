import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50"
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black border-l border-[#6c6c6c] z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#6c6c6c]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#DFCC8C]" />
            <h2 className="text-[#DFCC8C]">Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors text-[#9f9f9f] hover:text-[#DFCC8C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[#6c6c6c]" />
              <p className="text-[#868686]">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-[#1a1a1a] rounded-lg border border-[#6c6c6c]"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white mb-1 truncate">{item.name}</h3>
                    <p className="text-[#DFCC8C] mb-2">${item.price}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-[#0a0a0a] rounded text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white px-3">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-[#0a0a0a] rounded text-[#9f9f9f] hover:text-[#DFCC8C] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 hover:bg-[#0a0a0a] rounded-lg transition-colors text-[#868686] hover:text-red-500 self-start"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#6c6c6c] bg-[#0a0a0a]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#9f9f9f]">Subtotal</span>
              <span className="text-[#DFCC8C]">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-[#DFCC8C] hover:bg-[#DBC078] text-black py-3 rounded-lg transition-colors"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}