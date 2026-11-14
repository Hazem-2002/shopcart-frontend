import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./thunks/fetchCategories";

const initialState = {
  categories: [],
  isLoading: false,
  success: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.categories = action.payload.data.categories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
