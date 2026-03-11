'use client'

import { useState, useEffect } from 'react'
import { ProductCard } from '@/components/ProductCard'
import { ProductFilters } from '@/components/ProductFilters'
import { Input } from '@/components/ui/input'

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        const data = await response.json()
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products
  useEffect(() => {
    let result = products

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by price
    result = result.filter((p) => p.price <= priceRange[1])

    // Filter by search query
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(result)
  }, [products, selectedCategory, priceRange, searchQuery])

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const handleReset = () => {
    setSelectedCategory(null)
    setPriceRange([0, 200000])
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sản phẩm</h1>
          
          {/* Search Bar */}
          <div className="max-w-md">
            <Input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-gray-300"
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

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-gray-500">Đang tải sản phẩm...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sản phẩm nào</p>
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
