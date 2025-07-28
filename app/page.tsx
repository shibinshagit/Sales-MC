"use client"

import { Provider } from "react-redux"
import { store } from "@/lib/store"
import SearchAndFilter from "@/components/organisms/SearchAndFilter"
import ProductList from "@/components/organisms/ProductList"
import Header from "@/components/molecules/Header"

export default function HomePage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-4 max-w-7xl">
          <div className="space-y-4">
            <SearchAndFilter />
            <ProductList />
          </div>
        </main>
      </div>
    </Provider>
  )
}
