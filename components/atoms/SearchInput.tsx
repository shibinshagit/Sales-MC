"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search parts...",
  className = "",
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 h-12 bg-gray-800/50 backdrop-blur-sm border-gray-600/50 text-white placeholder-gray-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 rounded-xl transition-all duration-200"
      />
    </div>
  )
}
