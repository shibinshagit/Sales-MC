"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { setSelectedCategory, fetchCategories } from "@/lib/slices/productSlice"
import SearchInput from "@/components/atoms/SearchInput"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CategoryFilter() {
  const dispatch = useDispatch()
  const { categories, selectedCategory } = useSelector((state: RootState) => state.products)
  const [categorySearch, setCategorySearch] = useState("")

  useEffect(() => {
    dispatch(fetchCategories() as any)
  }, [dispatch])

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(categorySearch.toLowerCase()),
  )

  return (
    <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 shadow-xl">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Categories</h2>
            <div className="w-64">
              <SearchInput
                value={categorySearch}
                onChange={setCategorySearch}
                placeholder="Search categories..."
                className="w-full"
              />
            </div>
          </div>

          <ScrollArea className="w-full">
            <div className="flex gap-3 pb-2">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => dispatch(setSelectedCategory(""))}
                className={`flex-shrink-0 ${
                  selectedCategory === ""
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 text-gray-300"
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
                  className={`flex-shrink-0 ${
                    selectedCategory === category
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-700/50 border-gray-600/50 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}
