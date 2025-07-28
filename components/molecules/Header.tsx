"use client"

import Image from "next/image"
import { Car, Wrench } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-b border-gray-700/30 sticky top-0 z-50 shadow-2xl backdrop-blur-md">
      <div className="container mx-auto px-4 py-3 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Moto Club Automotive" width={140} height={42} className="h-9 w-auto sm:h-10" />
            <div className="border-l border-gray-600 pl-3">
              <div className="text-white">
                <h1 className="text-sm sm:text-lg font-bold tracking-wide">MOTOCLUB KOTTACKAL</h1>
                <p className="text-xs text-gray-400 tracking-wider">PREMIUM AUTO PARTS</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4" />
                <span>Quality Parts</span>
              </div>
              <div className="flex items-center gap-1">
                <Wrench className="h-4 w-4" />
                <span>Expert Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
