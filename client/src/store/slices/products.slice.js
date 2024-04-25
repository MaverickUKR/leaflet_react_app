import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  addProduct,
  updateProduct,
} from "../actionCreator/products.actionCreator";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: {},
    productsView: window.localStorage.getItem("productsView") || "grid",
    error: null,
  },
  reducers: {
    setProductsView: (state, action) => {
      state.productsView = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.products.products.push(action.payload);
      state.error = null;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.products.products = state.products.products.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export const { setProductsView } = productsSlice.actions;
export default productsSlice.reducer;
