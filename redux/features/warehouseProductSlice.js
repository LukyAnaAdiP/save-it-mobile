import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchWarehouseProducts = createAsyncThunk(
  "warehouseProduct/fetchWarehouseProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/warehouses/customer");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const warehouseProductSlice = createSlice({
  name: "warehouseProduct",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWarehouseProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWarehouseProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchWarehouseProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default warehouseProductSlice.reducer;
