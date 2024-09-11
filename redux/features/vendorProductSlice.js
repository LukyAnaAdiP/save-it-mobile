import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchVendorProducts = createAsyncThunk(
  "vendorProduct/fetchVendorProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/vendor-product?size=100");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vendorProductSlice = createSlice({
  name: "vendorProduct",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVendorProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchVendorProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default vendorProductSlice.reducer;
