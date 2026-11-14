import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./thunks/fetchProducts";
import { fetchProductsPriceRange } from "./thunks/fetchProductsPriceRange";

const initialState = {
  products: [],
  count: 0,
  priceRange: [0, 20000],
  isLoading: false,
  success: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.count = action.payload.totalResults;
        state.products = action.payload.data.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Handle fetchProductsPriceRange
      .addCase(fetchProductsPriceRange.fulfilled, (state, action) => {
        const { minPrice, maxPrice } = action.payload.data.priceRange;
        state.priceRange = [minPrice, maxPrice];
      });
  },
});

export default productSlice.reducer;
