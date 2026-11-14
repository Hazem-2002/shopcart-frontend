import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const loginResponse = await axios.post(
        "https://e-commerce-backend-eight-umber.vercel.app/api/v1/auth/login",
        credentials,
        {
          withCredentials: true,
        },
      );

      const { accessToken } = loginResponse.data.data;

      const CSRFResponse = await axios.get(
        "https://e-commerce-backend-eight-umber.vercel.app/api/v1/auth/csrf-token",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        },
      );

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("csrfToken", CSRFResponse.data.data.csrfToken);

      return {
        ...loginResponse.data,
        csrfToken: CSRFResponse.data.data.csrfToken,
      };
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(
        error.response?.data || { message: error.message },
      );
    }
  },
);
