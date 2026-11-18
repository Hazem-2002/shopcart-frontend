import { createAsyncThunk } from "@reduxjs/toolkit";
import { registerRequest } from "../../../api/auth/auth";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      return await registerRequest(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
