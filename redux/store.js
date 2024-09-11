import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice.js";
import vendorProductReducer from "./features/vendorProductSlice.js";
import cartReducer from "./features/cartSlice.js";
import warehouseProductReducer from "./features/warehouseProductSlice.js";
import profileReducer from "./features/profileSlice.js";
import reportReducer from "./features/reportSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    vendorProducts: vendorProductReducer,
    cart: cartReducer,
    warehouseProducts: warehouseProductReducer,
    profile: profileReducer,
    report: reportReducer,
  },
});

export default store;
