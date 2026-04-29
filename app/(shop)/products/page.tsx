'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, ChevronDown, LayoutGrid, List } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  stock: number
  unit?: string
}

interface Category {
  id: string
  name: string
}

type SortOption = 'newest' | 'price-low' | 'price-high' | 'name'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [isLoading, setIsLoading] = useState(true)
  const [showSortMenu, setShowSortMenu] = useState(false)

  // Fetch products and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ])

        const productsData = await productsRes.json()
        setProducts(productsData.products || [])

        if (categoriesRes.ok) {
          setCategories(await categoriesRes.json())
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and sort products
  useEffect(() => {
    let result = [...products]

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

  const handleReset = () => {
    setSelectedCategory(null)
    setPriceRange([0, 500000])
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

  const getCategoryName = (id: string) => {
    return categories.find(c => c.id === id)?.name || id
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="bg-[#a08679] py-12 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-[0.3em] mb-4 rounded-sm border border-white/20">
              Thủy Hương Food
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
              Danh Mục <br /> <span className="text-amber-400 underline decoration-white/20 underline-offset-8">Sản Phẩm</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
              Khám phá nguồn nguyên liệu và gia vị thượng hạng, mang tinh hoa ẩm thực đến gian bếp của bạn.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
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
          <div className="lg:col-span-3 space-y-8">
            {/* Search & Sort Bar */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm sản phẩm bạn cần..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 border-gray-200 focus-visible:ring-[#a08679] text-sm font-bold rounded-xl w-full"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-none">
                  <Button
                    variant="outline"
                    className="w-full md:w-56 h-12 border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center justify-between px-4 rounded-xl font-bold"
                    onClick={() => setShowSortMenu(!showSortMenu)}
                  >
                    <span className="text-xs uppercase tracking-wider opacity-50">Sắp xếp:</span>
                    <span className="text-sm">{getSortLabel()}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                  </Button>

                  {showSortMenu && (
                    <div className="absolute top-full right-0 mt-2 w-full md:w-56 bg-white border border-gray-100 rounded-xl shadow-2xl z-20 overflow-hidden">
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
                          className={`block w-full text-left px-5 py-3 text-sm font-bold transition-colors ${
                            sortBy === option.value
                              ? 'bg-[#a08679] text-white'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="hidden sm:flex border border-gray-100 rounded-xl p-1 bg-gray-50">
                  <Button size="icon" variant="ghost" className="h-10 w-10 bg-white shadow-sm text-[#a08679]">
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-10 w-10 text-gray-400">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {(selectedCategory || searchQuery || sortBy !== 'newest') && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest mr-2">Đang lọc:</span>
                {selectedCategory && (
                  <span className="px-3 py-1.5 bg-[#a08679]/10 text-[#a08679] text-[10px] font-black uppercase rounded-full border border-[#a08679]/20">
                    {getCategoryName(selectedCategory)}
                  </span>
                )}
                {searchQuery && (
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase rounded-full border border-blue-100">
                    Từ khóa: {searchQuery}
                  </span>
                )}
                <button
                  onClick={handleReset}
                  className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline ml-auto"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="text-center py-32 flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#a08679] border-t-transparent"></div>
                <p className="text-gray-400 font-bold uppercase tracking-widest mt-6 text-xs">Đang tải tinh hoa ẩm thực...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="text-6xl mb-6 opacity-20">🛒</div>
                <h3 className="text-2xl font-black text-gray-900 mb-2 uppercase italic">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-500 font-medium mb-8">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm để tìm thấy thứ bạn cần.
                </p>
                <Button
                  onClick={handleReset}
                  className="bg-[#a08679] hover:bg-[#8c756a] text-white px-8 h-12 rounded-xl font-bold"
                >
                  Đặt lại toàn bộ
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={product.image}
                    category={getCategoryName(product.category)}
                    stock={product.stock}
                    unit={product.unit}
                  />
                ))}
              </div>
            )}

            {/* Pagination Placeholder */}
            {!isLoading && filteredProducts.length > 0 && (
              <div className="flex justify-center pt-12 border-t border-gray-100 mt-12">
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl font-bold disabled:opacity-30" disabled>Trước</Button>
                  <Button className="rounded-xl font-bold bg-[#a08679] hover:bg-[#8c756a] w-10 p-0">1</Button>
                  <Button variant="ghost" className="rounded-xl font-bold w-10 p-0 text-gray-400">2</Button>
                  <Button variant="ghost" className="rounded-xl font-bold w-10 p-0 text-gray-400">3</Button>
                  <Button variant="outline" className="rounded-xl font-bold">Sau</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
