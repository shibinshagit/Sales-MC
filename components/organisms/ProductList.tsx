"use client"

import { useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { fetchProducts, loadMoreProducts, setSelectedCategory } from "@/lib/slices/productSlice"
import ProductCard from "@/components/atoms/ProductCard"
import { Loader2, Package, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function ProductList() {
  const dispatch = useDispatch()
  const { products, loading, error, searchTerm, selectedCategory, hasMore, page } = useSelector(
    (state: RootState) => state.products,
  )
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(fetchProducts({ searchTerm, category: selectedCategory, page: 1 }) as any)
  }, [dispatch, searchTerm, selectedCategory])

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      dispatch(loadMoreProducts({ searchTerm, category: selectedCategory, page: page + 1 }) as any)
    }
  }, [dispatch, loading, hasMore, searchTerm, selectedCategory, page])

  const clearCategory = () => {
    dispatch(setSelectedCategory(""))
  }

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          handleLoadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [handleLoadMore, hasMore, loading])

  if (loading && products.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <span className="text-gray-400 text-lg">Loading parts...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-red-400 mb-2 text-lg font-semibold">Error loading products</div>
          <div className="text-gray-400 text-sm">{error}</div>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 max-w-md mx-auto">
          <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
          <div className="text-gray-300 mb-2 text-lg font-semibold">No products found</div>
          <div className="text-gray-500 text-sm">Try adjusting your search or category filters</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Active Category Indicator */}
      <div className="flex items-center justify-between">
        <div className="text-white">
          <span className="text-lg font-semibold">
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {selectedCategory ? (
            <button
              onClick={clearCategory}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700/50 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
          <Badge
            variant="secondary"
            className={`text-sm px-3 py-1 ${
              selectedCategory
                ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                : "bg-gray-700/50 text-gray-300 border-gray-600/50"
            }`}
          >
            {selectedCategory || "All Categories"}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More Section */}
      {hasMore && (
        <div ref={loadMoreRef} className="flex justify-center py-6">
          {loading ? (
            <div className="flex items-center gap-2 text-gray-400">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Loading more...</span>
            </div>
          ) : (
            <Button
              onClick={handleLoadMore}
              variant="outline"
              className="bg-gray-800/50 border-gray-600/50 hover:bg-gray-700 text-gray-300 hover:text-white"
            >
              <ChevronDown className="h-4 w-4 mr-2" />
              Load More
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
