'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [isLoading, setIsLoading] = useState(true)
  const [showSortMenu, setShowSortMenu] = useState(false)

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data.products || [])
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let result = products

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by price range
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by search query
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name, 'vi'))
        break
      case 'newest':
      default:
        break
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, priceRange, searchQuery, sortBy])

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const handleReset = () => {
    setSelectedCategory(null)
    setPriceRange([0, 200000])
    setSearchQuery('')
    setSortBy('newest')
  }

  const getSortLabel = () => {
    const labels: Record<SortOption, string> = {
      'newest': 'Mới nhất',
      'price-low': 'Giá: Thấp → Cao',
      'price-high': 'Giá: Cao → Thấp',
      'name': 'Tên A-Z'
    }
    return labels[sortBy]
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sản phẩm</h1>
              <p className="text-gray-600">Khám phá bộ sưu tập gia vị chất lượng cao của chúng tôi</p>
            </div>
            {!isLoading && (
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Đang hiển thị <span className="font-bold text-violet-600">{filteredProducts.length}</span> sản phẩm
                </p>
              </div>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm theo tên..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 border-gray-300 bg-white text-base rounded-lg shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setPriceRange}
              onReset={handleReset}
            />
          </div>

          {/* Products Section */}
          <div className="lg:col-span-3">
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div className="relative">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <span className="text-sm">Sắp xếp: <span className="font-semibold">{getSortLabel()}</span></span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                </Button>
                
                {/* Sort Menu */}
                {showSortMenu && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {(
                      [
                        { value: 'newest', label: 'Mới nhất' },
                        { value: 'price-low', label: 'Giá: Thấp → Cao' },
                        { value: 'price-high', label: 'Giá: Cao → Thấp' },
                        { value: 'name', label: 'Tên A-Z' }
                      ] as Array<{ value: SortOption; label: string }>
                    ).map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value)
                          setShowSortMenu(false)
                        }}
                        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          sortBy === option.value
                            ? 'bg-violet-50 text-violet-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Filters Badge */}
              {(selectedCategory || searchQuery || sortBy !== 'newest' || priceRange[0] > 0 || priceRange[1] < 200000) && (
                <button
                  onClick={handleReset}
                  className="text-xs font-medium text-violet-600 hover:text-violet-700 hover:underline"
                >
                  Xóa tất cả bộ lọc
                </button>
              )}
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
                  <p className="text-gray-500 mt-4">Đang tải sản phẩm...</p>
                </div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600 mb-6">
                  Vui lòng thử lại với các bộ lọc khác hoặc từ khóa tìm kiếm
                </p>
                <Button
                  onClick={handleReset}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
