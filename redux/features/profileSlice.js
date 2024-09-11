import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import userIcon from "../../assets/user.png";

const initialState = {
  username: "",
  fullNameCustomer: "",
  emailCustomer: "",
  phoneCustomer: "",
  addressCustomer: "",
  customerImage: {
    url: userIcon,
    name: "",
  },
  loading: false,
  error: null,
};

export const fetchProfileData = createAsyncThunk(
  "profile/fetchProfileData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/customers");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        const {
          username,
          fullNameCustomer,
          emailCustomer,
          phoneCustomer,
          addressCustomer,
          customerImage,
        } = action.payload;

        state.username = username || "";
        state.fullNameCustomer = fullNameCustomer || "";
        state.emailCustomer = emailCustomer || "";
        state.phoneCustomer = phoneCustomer || "";
        state.addressCustomer = addressCustomer || "";
        state.customerImage.url = customerImage?.url || userIcon;
        state.customerImage.name = customerImage?.name || "";
        state.loading = false;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;
