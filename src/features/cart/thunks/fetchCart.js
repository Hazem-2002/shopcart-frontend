import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { accessToken } = getState().auth;

      const response = await axios.get("/api/v1/carts/my-cart", {
        headers: {
          Authorization: `Bearer ${
            accessToken || localStorage.getItem("accessToken")
          }`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
