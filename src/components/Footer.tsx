import { Dumbbell, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#6c6c6c] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell className="w-6 h-6" style={{ color: '#DFCC8C' }} />
              <span className="text-[#DFCC8C]">IRON ELITE</span>
            </div>
            <p className="text-[#868686] mb-4">
              Premium gym equipment for athletes who demand excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Weights
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Equipment
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Apparel
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#868686] hover:text-[#DFCC8C] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#6c6c6c] text-center">
          <p className="text-[#868686]">
            © 2025 IRON ELITE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
