'use client'

import { useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCcw } from 'lucide-react'

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
  const handleMinPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const minPrice = Math.min(e.target.valueAsNumber || 0, priceRange[1])
      onPriceChange([minPrice, priceRange[1]])
    },
    [priceRange, onPriceChange]
  )

  const handleMaxPriceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const maxPrice = Math.max(e.target.valueAsNumber || 0, priceRange[0])
      onPriceChange([priceRange[0], maxPrice])
    },
    [priceRange, onPriceChange]
  )

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'gia-vi': 'Gia vị',
      'rau-cu': 'Rau củ',
      'dau-bo': 'Dầu, Bơ',
      'do-hop': 'Đồ hộp',
      'do-kho': 'Đồ khô',
      'bot-nau-an': 'Bột nấu ăn',
      'mien-banh-da': 'Miến, Bánh đa',
      'dung-cu-bep': 'Dụng cụ bếp'
    }
    return labels[category] || category
  }

  return (
    <Card className="sticky top-24 h-fit border-red-200 shadow-sm">
      <CardHeader className="border-b border-red-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-gray-900">Bộ lọc</CardTitle>
          <button
            onClick={onReset}
            className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
            title="Xóa tất cả bộ lọc"
          >
            <RotateCcw className="w-4 h-4 text-red-600" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-sm uppercase tracking-wide">Danh mục</span>
            <span className="text-xs text-gray-400">({categories.length + 1})</span>
          </h3>
          <div className="space-y-2">
            <label className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all border-2 ${
              selectedCategory === null
                ? 'bg-red-50 border-red-300 text-red-700'
                : 'border-transparent hover:bg-gray-50 text-gray-900'
            }`}>
              <input
                type="radio"
                name="category"
                checked={selectedCategory === null}
                onChange={() => onCategoryChange(null)}
                className="w-4 h-4 accent-red-600"
              />
              <span className="ml-2 font-medium text-sm">Tất cả danh mục</span>
            </label>
            {categories.map((category) => (
              <label
                key={category}
                className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-all border-2 ${
                  selectedCategory === category
                    ? 'bg-red-50 border-red-300 text-red-700'
                    : 'border-transparent hover:bg-gray-50 text-gray-900'
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="w-4 h-4 accent-red-600"
                />
                <span className="ml-2 font-medium text-sm">{getCategoryLabel(category)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Khoảng giá</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-600 font-medium mb-1.5 block">Giá tối thiểu</label>
              <Input
                type="number"
                value={priceRange[0]}
                onChange={handleMinPriceChange}
                placeholder="0"
                className="border-gray-300 text-sm h-9"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 font-medium mb-1.5 block">Giá tối đa</label>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={handleMaxPriceChange}
                placeholder="200000"
                className="border-gray-300 text-sm h-9"
              />
            </div>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 px-3 py-2.5 rounded-lg border border-red-100">
              <p className="text-sm font-semibold text-red-900">
                {priceRange[0].toLocaleString('vi-VN')} - {priceRange[1].toLocaleString('vi-VN')} đ
              </p>
            </div>
          </div>
        </div>

        {/* Quick Price Filters */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Giá phổ biến</h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Dưới 50K', min: 0, max: 50000 },
              { label: '50K - 100K', min: 50000, max: 100000 },
              { label: '100K - 150K', min: 100000, max: 150000 },
              { label: 'Trên 150K', min: 150000, max: 200000 }
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => onPriceChange([range.min, range.max])}
                className="text-xs font-medium px-2 py-1.5 rounded-lg transition-all border border-gray-200 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-700"
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <Button
          onClick={onReset}
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Xóa bộ lọc
        </Button>
      </CardContent>
    </Card>
  )
}
