'use client'

import { useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ProductFiltersProps {
  categories: string[]
  selectedCategory: string | null
  priceRange: [number, number]
  onCategoryChange: (category: string | null) => void
  onPriceChange: (range: [number, number]) => void
  onReset: () => void
}

export function ProductFilters({
  categories,
  selectedCategory,
  priceRange,
  onCategoryChange,
  onPriceChange,
  onReset,
}: ProductFiltersProps) {
  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxPrice = Math.max(e.target.valueAsNumber || 0, priceRange[0])
      onPriceChange([priceRange[0], maxPrice])
    },
    [priceRange, onPriceChange]
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bộ lọc</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Danh mục</h3>
          <div className="space-y-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                selectedCategory === null
                  ? 'bg-amber-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}
            >
              Tất cả
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                  selectedCategory === category
                    ? 'bg-amber-700 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                {category === 'spices' && 'Gia vị'}
                {category === 'condiments' && 'Gia vị nêm'}
                {category === 'oils' && 'Dầu'}
              </button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Giá tối đa</h3>
          <div className="space-y-2">
            <Input
              type="number"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              placeholder="Nhập giá tối đa"
              className="border-gray-300"
            />
            <p className="text-sm text-gray-500">
              {priceRange[1].toLocaleString('vi-VN')} đ
            </p>
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full border-amber-700 text-amber-700 hover:bg-amber-50"
        >
          Xóa bộ lọc
        </Button>
      </CardContent>
    </Card>
  )
}
