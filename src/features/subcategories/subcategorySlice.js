import { createSlice } from "@reduxjs/toolkit";
import { fetchSubcategories } from "./thunks/fetchSubcategories";

const initialState = {
  subcategories: [],
  isLoading: false,
  success: false,
  error: null,
};

const subcategorySlice = createSlice({
  name: "subcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.subcategories = action.payload.data.subcategories;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export default subcategorySlice.reducer;
