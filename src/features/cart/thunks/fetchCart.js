import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { accessToken } = getState().auth;

      const response = await axios.get(
        "https://e-commerce-backend-eight-umber.vercel.app/api/v1/carts/my-cart",
        {
          headers: {
            Authorization: `Bearer ${
              accessToken || localStorage.getItem("accessToken")
            }`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  },
);
