import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (otp, { rejectWithValue }) => {
    try {
      const API_URL = "/api/v1";

      const { data } = await axios.post(`${API_URL}/auth/verify-email`, {
        otp,
      });

      return data;
    } catch (error) {
      console.log(error.response?.data);

      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
