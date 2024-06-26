import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/products.slice";

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default store;
