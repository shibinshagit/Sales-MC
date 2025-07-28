"use client"

import { Button } from "@/components/ui/button"

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "" ? "default" : "outline"}
        size="sm"
        onClick={() => onCategoryChange("")}
        className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
      >
        All
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
