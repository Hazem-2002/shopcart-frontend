import { createSlice } from "@reduxjs/toolkit";

import { fetchWishlist } from "./thunks/fetchWishlist";
import { addToWishlist } from "./thunks/addToWishlist";
import { deleteFromWishlist } from "./thunks/deleteFromWishlist";

const initialState = {
  wishlist: [],
  count: 0,
  isLoading: false,
  success: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    clearWishlist: (state) => {
      state.wishlist = [];
      state.count = 0;
      state.error = null;
      state.success = false;
      state.isLoading = false;
    },

    optimisticToggleWishlist: (state, action) => {
      const productId = action.payload;

      const exists = state.wishlist.some((item) => item._id === productId);

      if (exists) {
        state.wishlist = state.wishlist.filter(
          (item) => item._id !== productId,
        );
      } else {
        state.wishlist.push({
          _id: productId,
        });
      }

      state.count = state.wishlist.length;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.isLoading = true;
        state.success = false;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;

        state.wishlist = action.payload.data.wishlist;
        state.count = action.payload.totalResults;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload;
      })

      // Add To Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.success = true;

        const updatedWishlist = action.payload.data.wishlist;

        state.wishlist = state.wishlist.map((item) => {
          const updatedItem = updatedWishlist.find(
            (updated) => updated._id === item._id,
          );

          return updatedItem ? updatedItem : item;
        });
      })

      // Delete From Wishlist
      .addCase(deleteFromWishlist.fulfilled, (state, action) => {
        state.success = true;

        const updatedWishlist = action.payload.data.wishlist;

        state.wishlist = state.wishlist.map((item) => {
          const updatedItem = updatedWishlist.find(
            (updated) => updated._id === item._id,
          );

          return updatedItem ? updatedItem : item;
        });
      })

      // Add / Delete Rejected
      .addMatcher(
        (action) =>
          [
            addToWishlist.rejected.type,
            deleteFromWishlist.rejected.type,
          ].includes(action.type),
        (state, action) => {
          state.success = false;
          state.error = action.payload;
        },
      );
  },
});

export const { clearWishlist, optimisticToggleWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
