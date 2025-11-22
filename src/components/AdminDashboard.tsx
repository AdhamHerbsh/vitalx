import { useState } from 'react';
import { ArrowLeft, Package, DollarSign, ShoppingBag, TrendingUp, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { productsWithAdminData, ProductData } from '../data/products';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [products] = useState<ProductData[]>(productsWithAdminData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Calculate statistics
  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  const lowStockProducts = products.filter(p => p.status === 'low-stock' || p.status === 'out-of-stock').length;

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-500 bg-green-500/10 border-green-500/30';
      case 'low-stock':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
      case 'out-of-stock':
        return 'text-red-500 bg-red-500/10 border-red-500/30';
      default:
        return 'text-[#868686] bg-[#868686]/10 border-[#868686]/30';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar 
        cartCount={0}
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
          Back to Store
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#DFCC8C] mb-2">Admin Dashboard</h1>
          <p className="text-[#9f9f9f]">Manage your products and view sales statistics</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#DFCC8C]/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-[#DFCC8C]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-[#868686] mb-1">Total Products</p>
            <p className="text-white">{totalProducts}</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#DFCC8C]/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#DFCC8C]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-[#868686] mb-1">Total Revenue</p>
            <p className="text-white">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#DFCC8C]/10 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-[#DFCC8C]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-[#868686] mb-1">Total Sales</p>
            <p className="text-white">{totalSales.toLocaleString()}</p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-yellow-500" />
              </div>
              {lowStockProducts > 0 && <span className="text-yellow-500">!</span>}
            </div>
            <p className="text-[#868686] mb-1">Low/Out of Stock</p>
            <p className="text-white">{lowStockProducts}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#868686]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
            >
              <option value="all">All Categories</option>
              <option value="weights">Weights</option>
              <option value="equipment">Equipment</option>
              <option value="apparel">Apparel</option>
              <option value="accessories">Accessories</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-[#0a0a0a] border border-[#6c6c6c] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#DFCC8C] transition-colors"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>

            {/* Add Product Button */}
            <button className="flex items-center justify-center gap-2 bg-[#DFCC8C] hover:bg-[#DBC078] text-black px-6 py-3 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-[#1a1a1a] border border-[#6c6c6c] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#6c6c6c]">
                  <th className="text-left p-4 text-[#DFCC8C]">Product</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Category</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Price</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Stock</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Sales</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Revenue</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Status</th>
                  <th className="text-left p-4 text-[#DFCC8C]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#6c6c6c] hover:bg-[#0a0a0a] transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#0a0a0a] flex-shrink-0">
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-white">{product.name}</p>
                          <p className="text-[#868686]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2 py-1 bg-[#DFCC8C]/10 border border-[#DFCC8C]/30 rounded text-[#DFCC8C]">
                        {product.category}
                      </span>
                    </td>
                    <td className="p-4 text-white">${product.price}</td>
                    <td className="p-4 text-white">{product.stock}</td>
                    <td className="p-4 text-white">{product.sales}</td>
                    <td className="p-4 text-white">${product.revenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td className="p-4">
                      <span className={`inline-block px-2 py-1 rounded border ${getStatusColor(product.status)}`}>
                        {product.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-[#0a0a0a] rounded-lg transition-colors text-[#9f9f9f] hover:text-[#DFCC8C]">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-[#0a0a0a] rounded-lg transition-colors text-[#868686] hover:text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 mx-auto mb-4 text-[#6c6c6c]" />
              <p className="text-[#868686]">No products found</p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 text-center">
          <p className="text-[#868686]">
            Showing {filteredProducts.length} of {totalProducts} products
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}