import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const fetchReports = createAsyncThunk(
  "report/fetchReports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/reports/customer");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState: {
    transactions: [],
    status: "idle",
    error: null,
  },
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactions = action.payload;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default reportSlice.reducer;
