import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const API_URL = "/api/v1";

      const registerResponse = await axios.post(
        `${API_URL}/auth/register`,
        userData,
      );

      return registerResponse.data;
    } catch (error) {
      console.log(error.response?.data);

      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
