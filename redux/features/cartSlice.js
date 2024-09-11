import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.vendorProductId === item.vendorProductId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { vendorProductId, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.vendorProductId === vendorProductId
      );
      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.vendorProductId !== vendorProductId
          );
        } else {
          item.quantity = quantity;
        }
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
