import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop"
          alt="Gym equipment"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="inline-block px-4 py-2 bg-[#DFCC8C]/10 border border-[#DFCC8C] rounded-full mb-6">
            <span className="text-[#DFCC8C]">Premium Quality Equipment</span>
          </div>
          <h1 className="text-white mb-6">
            Elevate Your Training
          </h1>
          <p className="text-[#9f9f9f] mb-8 max-w-xl">
            Professional-grade gym equipment designed for athletes who demand excellence. 
            Build your perfect home gym with IRON ELITE.
          </p>
          <button className="group bg-[#DFCC8C] hover:bg-[#DBC078] text-black px-8 py-4 rounded-lg transition-all flex items-center gap-2">
            Shop Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
