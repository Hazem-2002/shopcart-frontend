import { createAsyncThunk } from "@reduxjs/toolkit";
import { logoutRequest } from "../../../api/auth/auth";

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const logoutResponse = await logoutRequest();

      return logoutResponse;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
