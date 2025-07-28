"use client"

import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setSearchTerm } from "@/lib/slices/productSlice"
import SearchInput from "@/components/atoms/SearchInput"
import { Card, CardContent } from "@/components/ui/card"
import { debounce } from "@/lib/utils"

export default function ProductSearch() {
  const dispatch = useDispatch()
  const { searchTerm } = useSelector((state: RootState) => state.products)

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearchTerm(value))
    }, 500),
    [dispatch],
  )

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 shadow-xl">
      <CardContent className="p-6">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-white mb-4">Search Products</h2>
          <SearchInput
            value={searchTerm}
            onChange={debouncedSearch}
            placeholder="Search vehicle parts, brands, or descriptions..."
          />
        </div>
      </CardContent>
    </Card>
  )
}
