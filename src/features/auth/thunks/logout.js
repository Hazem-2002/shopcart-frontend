import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutRequest } from "../../../api/auth/auth";
import { clearCart } from "../../cart/cartSlice";
import { clearWishlist } from "../../wishlist/wishlistSlice";

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const logoutResponse = await logoutRequest();

      // Clear cart and wishlist on logout
      dispatch(clearCart());
      dispatch(clearWishlist());

      return logoutResponse;
    } catch (error) {
      return rejectWithValue(
        console.log(error.response?.data || { message: error.message }),
        error.response?.data || { message: error.message },
      );
    }
  },
);
