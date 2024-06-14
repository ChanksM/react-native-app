import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const functions = createSlice({
  name: "localStore",
  initialState,
  reducers: {
    setToCart: (state, action) => {
        const findItemInStore = state.cart.find(( product => product.id === action.payload.id));

        if (findItemInStore) {
            findItemInStore['amount'] += action.payload.amount;
        } else {
            state.cart.push(action.payload);
        }
    },
  },
});

export const { setToCart } = functions.actions;

export const getFromCart = (state) => state.localStoreReducer.cart;

export default functions.reducer;
