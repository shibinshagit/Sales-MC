import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

interface Product {
  id: number
  name: string
  company_name: string
  category: string
  category_id: number
  description: string
  price: number
  wholesale_price: number
  stock: number
  barcode: string
  shelf: string
  created_at: string
  updated_at: string
}

interface ProductState {
  products: Product[]
  categories: string[]
  loading: boolean
  error: string | null
  searchTerm: string
  selectedCategory: string
  page: number
  hasMore: boolean
}

const initialState: ProductState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  searchTerm: "",
  selectedCategory: "",
  page: 1,
  hasMore: true,
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ searchTerm, category, page = 1 }: { searchTerm: string; category: string; page?: number }) => {
    const params = new URLSearchParams()
    if (searchTerm) params.append("search", searchTerm)
    if (category) params.append("category", category)
    params.append("page", page.toString())
    params.append("limit", "5")

    const response = await fetch(`/api/products?${params}`)
    if (!response.ok) {
      throw new Error("Failed to fetch products")
    }
    return response.json()
  },
)

export const loadMoreProducts = createAsyncThunk(
  "products/loadMoreProducts",
  async ({ searchTerm, category, page }: { searchTerm: string; category: string; page: number }) => {
    const params = new URLSearchParams()
    if (searchTerm) params.append("search", searchTerm)
    if (category) params.append("category", category)
    params.append("page", page.toString())
    params.append("limit", "5")

    const response = await fetch(`/api/products?${params}`)
    if (!response.ok) {
      throw new Error("Failed to fetch more products")
    }
    return response.json()
  },
)

export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await fetch("/api/categories")
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
})

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload
      state.page = 1
      state.hasMore = true
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
      state.page = 1
      state.hasMore = true
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload
        state.page = 1
        state.hasMore = action.payload.length === 5
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to fetch products"
      })
      // Load more products
      .addCase(loadMoreProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadMoreProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = [...state.products, ...action.payload]
        state.page += 1
        state.hasMore = action.payload.length === 5
      })
      .addCase(loadMoreProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to load more products"
      })
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch categories"
      })
  },
})

export const { setSearchTerm, setSelectedCategory, clearError } = productSlice.actions
export default productSlice.reducer
