"use client"

import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setSearchTerm, setSelectedCategory, fetchCategories } from "@/lib/slices/productSlice"
import { Search, Hash, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { debounce } from "@/lib/utils"

export default function SearchAndFilter() {
  const dispatch = useDispatch()
  const { categories, selectedCategory } = useSelector((state: RootState) => state.products)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    dispatch(fetchCategories() as any)
  }, [dispatch])

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.startsWith("@")) {
        // Category search - remove @ and search in categories
        const categoryQuery = value.slice(1)
        // This would filter categories in the UI, but for now we'll just search products
        dispatch(setSearchTerm(""))
      } else {
        // Product search (includes barcode search)
        dispatch(setSearchTerm(value))
      }
    }, 300),
    [dispatch],
  )

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    debouncedSearch(value)
  }

  const clearSearch = () => {
    setSearchInput("")
    dispatch(setSearchTerm(""))
  }

  // Check if search looks like a barcode (numbers only, typically 8-13 digits)
  const isBarcode = (search: string) => {
    return /^\d{8,13}$/.test(search.trim())
  }

  // Filter categories to exclude empty ones and show only non-empty categories
  const validCategories = categories.filter((category) => category && category.trim() !== "")

  const filteredCategories = searchInput.startsWith("@")
    ? validCategories.filter((category) => category.toLowerCase().includes(searchInput.slice(1).toLowerCase()))
    : validCategories

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isBarcode(searchInput) ? (
            <Hash className="text-blue-400 h-5 w-5" />
          ) : (
            <Search className="text-gray-400 h-5 w-5" />
          )}
        </div>
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder={
            searchInput.startsWith("@") ? "Search categories..." : "Search parts, brands, or scan barcode..."
          }
          className={`pl-12 pr-12 h-12 bg-gray-800/60 backdrop-blur-sm border-gray-600/40 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200 text-base ${
            isBarcode(searchInput) ? "border-blue-500/50 ring-2 ring-blue-500/20" : ""
          }`}
        />

        {/* Clear search button */}
        {searchInput && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Barcode indicator */}
        {isBarcode(searchInput) && (
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2">
            <span className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Barcode</span>
          </div>
        )}
      </div>

      {/* Categories - Horizontal Scroll without scrollbar */}
      <div className="relative">
        <div
          className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitScrollbar: { display: "none" },
          }}
        >
          <Button
            variant={selectedCategory === "" ? "default" : "outline"}
            size="sm"
            onClick={() => dispatch(setSelectedCategory(""))}
            className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === ""
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                : "bg-gray-700/60 border-gray-600/40 hover:bg-gray-600/60 text-gray-300 hover:text-white"
            }`}
          >
            All Categories
          </Button>
          {filteredCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => dispatch(setSelectedCategory(category))}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-700/60 border-gray-600/40 hover:bg-gray-600/60 text-gray-300 hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
