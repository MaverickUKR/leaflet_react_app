import { createAsyncThunk } from "@reduxjs/toolkit";
import { updatedQueryString } from "../../utils/updatedQueryString";
import axios from "axios";

const request = async ({ url, method = "GET", body, headers } = {}) => {
  const fetchData = () => {
    if (method === "GET") return axios.get(url, { params: body });
    return axios({ url, method, data: body, headers });
  };
  try {
    const { data, status } = await fetchData();
    return { res: data, status };
  } catch ({ response }) {
    return { err: response };
  }
};

const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (queryStr) => {
    const parsedParams = updatedQueryString(queryStr);
    const { res, err } = await request({
      url: `/products/filter${parsedParams}`,
    });
    if (res) {
      return res;
    }
    throw new Error(`Couldn't get products: ${err.data}`);
  }
);

const addProduct = createAsyncThunk("products/addProduct", async (data) => {
  const { res, err } = await request({
    url: "/products",
    method: "POST",
    body: data,
  });
  if (res) {
    return res;
  }
  throw new Error(`Couldn't add product: ${JSON.stringify(err.data)}`);
});

const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }) => {
    const { res, err } = await request({
      url: `/products/${id}`,
      method: "PUT",
      body: data,
    });
    if (res) {
      return res;
    }
    throw new Error(`Couldn't update product: ${JSON.stringify(err.data)}`);
  }
);

export { fetchProducts, addProduct, updateProduct };
