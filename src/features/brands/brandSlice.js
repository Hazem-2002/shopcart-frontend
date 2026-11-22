import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands } from "./thunks/fetchBrands";

const initialState = {
  brands: [],
  isLoading: false,
  success: false,
  error: null,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.brands = action.payload.data.brands;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
