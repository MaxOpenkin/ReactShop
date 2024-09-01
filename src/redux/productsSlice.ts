import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface IProducts {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface IProductsState {
  products: IProducts[];
  selectedProduct: IProducts | null;
  categories: string[];
  status: "loading" | "success" | "error";
  categoriesStatus: "loading" | "success" | "error";
}

const initialState: IProductsState = {
  products: [],
  selectedProduct: null,
  categories: [],
  status: "loading",
  categoriesStatus: "loading",
};

const fetchProducts = async (): Promise<IProducts[]> => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};

const fetchCategories = async (): Promise<string[]> => {
    const response = await axios.get("https://fakestoreapi.com/products/categories");
    return response.data;
  };

  const fetchProductById = async (id: number): Promise<IProducts> => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  };

export const fetchProductsThunk = createAsyncThunk<IProducts[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetchProducts();
    return response;
  }
);

export const fetchProductsByIdThunk = createAsyncThunk<IProducts, number>(
  "products/fetchProductById",
  async (id) => {
    const response = await fetchProductById(id);
    return response;
  }
);

export const fetchCategoriesThunk = createAsyncThunk<string[]>(
    "products/fetchCategories",
    async () => {
      const response = await fetchCategories();
      return response;
    }
  );

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchProductsByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIdThunk.fulfilled, (state, action) => {
        state.status = "success";
        state.selectedProduct = action.payload; // Сохраняем результат в selectedProduct
      })
      .addCase(fetchProductsByIdThunk.rejected, (state) => {
        state.status = "error";
        state.selectedProduct = null; // Если ошибка, сбрасываем selectedProduct
      })
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.categoriesStatus = "loading";
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.categoriesStatus = "success";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state) => {
        state.categoriesStatus = "error";
      });
  },
});

//   export const { } = productsSlice.actions;

export default productsSlice.reducer;
