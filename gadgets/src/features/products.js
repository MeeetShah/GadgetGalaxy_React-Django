import { createSlice } from "@reduxjs/toolkit";
// import { storeProducts } from '../actions/productsActions';

const initialState = {
  products: [],
  login: localStorage.getItem("email"),
  specificproducts: [],
  cart: {},
  customerdetails:[]
};

export const todoSlice = createSlice({
  name: "Storeproducts",
  initialState,
  reducers: {
    storeProducts: (state, action) => {
      state.products = action.payload;
    },

    login: (state, action) => {
      state.login = action.payload;
      localStorage.setItem("email", action.payload);
    },
    logout: (state) => {
      state.login = null;
      localStorage.removeItem("email"); // Remove email from local storage
      state.products = [];
      state.cart = {};
    },

    specificproduct: (state, action) => {
      state.specificproducts = action.payload;
    },
    cart: (state, action) => {
      state.cart = action.payload;
    },
    customerdetails:(state,action)=>{
        state.customerdetails = action.payload
    }
  },
});

export const { storeProducts, specificproduct, cart, login, logout,customerdetails } =
  todoSlice.actions;

export default todoSlice.reducer;
