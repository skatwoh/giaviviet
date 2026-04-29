'use client'

import { useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RotateCcw, Filter } from 'lucide-react'

interface Category {
  id: string
  name: string
}

interface ProductFiltersProps {
  categories: Category[]
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

  return (
    <Card className="sticky top-24 h-fit border-[#a08679]/20 shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="bg-[#a08679]/5 border-b border-[#a08679]/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#a08679]" />
            <CardTitle className="text-lg font-bold text-gray-900 uppercase italic">Bộ lọc</CardTitle>
          </div>
          <button
            onClick={onReset}
            className="p-1.5 hover:bg-[#a08679]/10 rounded-full transition-colors text-[#a08679]"
            title="Xóa tất cả bộ lọc"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-8 pt-6">
        {/* Category Filter */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#a08679]">Danh mục</span>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </h3>
          <div className="space-y-1.5">
            <label className={`group flex items-center px-4 py-2.5 rounded-xl cursor-pointer transition-all border ${
              selectedCategory === null
                ? 'bg-[#a08679] border-[#a08679] text-white shadow-lg shadow-[#a08679]/20'
                : 'border-transparent hover:bg-gray-50 text-gray-700'
            }`}>
              <input
                type="radio"
                name="category"
                checked={selectedCategory === null}
                onChange={() => onCategoryChange(null)}
                className="hidden"
              />
              <span className="font-bold text-sm">Tất cả sản phẩm</span>
            </label>
            {categories.map((category) => (
              <label
                key={category.id}
                className={`group flex items-center px-4 py-2.5 rounded-xl cursor-pointer transition-all border ${
                  selectedCategory === category.id
                    ? 'bg-[#a08679] border-[#a08679] text-white shadow-lg shadow-[#a08679]/20'
                    : 'border-transparent hover:bg-gray-50 text-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === category.id}
                  onChange={() => onCategoryChange(category.id)}
                  className="hidden"
                />
                <span className="font-bold text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#a08679]">Khoảng giá</span>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-black uppercase tracking-tighter block ml-1">Từ (đ)</label>
                <Input
                  type="number"
                  value={priceRange[0]}
                  onChange={handleMinPriceChange}
                  placeholder="0"
                  className="border-gray-200 focus-visible:ring-[#a08679] text-sm h-10 font-bold rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-gray-400 font-black uppercase tracking-tighter block ml-1">Đến (đ)</label>
                <Input
                  type="number"
                  value={priceRange[1]}
                  onChange={handleMaxPriceChange}
                  placeholder="200k"
                  className="border-gray-200 focus-visible:ring-[#a08679] text-sm h-10 font-bold rounded-xl"
                />
              </div>
            </div>

            <div className="bg-[#a08679]/5 px-4 py-3 rounded-xl border border-[#a08679]/10 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-500 uppercase">Đang chọn:</span>
              <p className="text-sm font-black text-[#a08679]">
                {priceRange[0].toLocaleString('vi-VN')}đ - {priceRange[1].toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>
        </div>

        {/* Quick Price Filters */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#a08679]">Giá phổ biến</span>
            <div className="flex-1 h-[1px] bg-gray-100"></div>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: '< 50K', min: 0, max: 50000 },
              { label: '50K - 100K', min: 50000, max: 100000 },
              { label: '100K - 150K', min: 100000, max: 150000 },
              { label: '> 150K', min: 150000, max: 500000 }
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => onPriceChange([range.min, range.max])}
                className="text-xs font-black px-2 py-2 rounded-xl transition-all border border-gray-100 hover:border-[#a08679] hover:bg-[#a08679]/5 text-gray-600 hover:text-[#a08679]"
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
          className="w-full border-[#a08679] text-[#a08679] hover:bg-[#a08679] hover:text-white font-black text-xs uppercase tracking-widest h-12 rounded-xl shadow-sm transition-all"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Xóa tất cả
        </Button>
      </CardContent>
    </Card>
  )
}
