"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Building2, Hash, X, Eye, ImageOff } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  name: string
  company_name: string
  category: string
  description: string
  price: number
  stock: number
  barcode: string
  shelf: string
  msp: number
  image_url?: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showImage, setShowImage] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const getStockDisplay = (stock: number) => {
    if (stock === 0) return { text: "Out of Stock", color: "bg-red-500/20 text-red-400 border-red-500/30" }
    if (stock <= 5) return { text: stock.toString(), color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" }
    return { text: stock.toString(), color: "bg-green-500/20 text-green-400 border-green-500/30" }
  }

  const stockInfo = getStockDisplay(product.stock)

  const handleCardClick = () => {
    if (product.image_url) {
      setShowImage(true)
      setImageLoading(true)
      setImageError(false)
    }
  }

  if (showImage && product.image_url) {
    return (
      <Card className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50">
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Header with close button */}
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white text-sm line-clamp-1">{product.name}</h3>
              <button onClick={() => setShowImage(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Image with skeleton loader */}
            <div className="relative h-48 bg-gray-700/50 rounded-lg overflow-hidden">
              {imageLoading && !imageError && (
                <div className="absolute inset-0 bg-gray-700/50 animate-pulse flex items-center justify-center">
                  <Package className="h-8 w-8 text-gray-500 animate-pulse" />
                </div>
              )}
              {imageError ? (
                <div className="absolute inset-0 bg-gray-700/50 flex flex-col items-center justify-center">
                  <ImageOff className="h-8 w-8 text-gray-500 mb-2" />
                  <span className="text-xs text-gray-500">Image not available</span>
                </div>
              ) : (
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onLoad={() => setImageLoading(false)}
                  onError={() => {
                    setImageLoading(false)
                    setImageError(true)
                  }}
                />
              )}
            </div>

            {/* Product details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Building2 className="h-3 w-3" />
                <span>{product.company_name}</span>
              </div>

              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-gray-600/50">
                  {product.category}
                </Badge>
                <div className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded">
                  Shelf: {product.shelf}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-green-400 text-lg">₹</span>
                  <span className="text-sm font-semibold text-green-400">{Number(product.price).toFixed(2)}</span>
                </div>
                <Badge className={`text-xs px-2 py-1 ${stockInfo.color}`}>{stockInfo.text}</Badge>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-700/50">
              <span className="font-mono">item:{product.barcode.slice(-6)}</span>
                <div className="flex items-center gap-1">
                  <span className="font-mono">  #MS0{String(product.msp).split(".")[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="bg-gray-800/40 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/60 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Circular Product Icon */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-gray-600/50">
              <Package className="h-7 w-7 text-blue-400" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">{product.name}</h3>
              <Badge className={`text-xs px-2 py-1 ${stockInfo.color}`}>{stockInfo.text}</Badge>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Building2 className="h-3 w-3" />
              <span className="truncate">{product.company_name}</span>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs bg-gray-700/50 text-gray-300 border-gray-600/50 w-fit">
                {product.category}
              </Badge>
              <div className="text-xs text-blue-400 font-medium bg-blue-500/10 px-2 py-1 rounded">
                Shelf: {product.shelf}
              </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1">
                <span className="text-green-400 text-lg">₹</span>
                <span className="text-sm font-semibold text-green-400">{Number(product.price).toFixed(2)}</span>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-1 border-t border-gray-700/50">
              <div className="flex items-center gap-1">
                {product.image_url ? (
                  <>
                    <Eye className="h-3 w-3" />
                    <span>Show Image</span>
                  </>
                ) : (
                  <>
                    <ImageOff className="h-3 w-3" />
                    <span>No Image Available</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                   <span className="font-mono">  #MS0{String(product.msp).split(".")[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
