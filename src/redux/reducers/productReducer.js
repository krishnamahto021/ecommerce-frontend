import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseinit";
import { toast } from "react-toastify";

const productArray = [];

// to add the product to the database
export const addProductToDb = createAsyncThunk(
  "product/addProductToDb",
  async (data, thunkAPI) => {
    try {
      const docRef = collection(db, "products");
      await addDoc(docRef, data);
      toast.success("Product Added Successfully!! ");
    } catch (err) {
      console.log("Error in adding product to firestore", err);
      toast.error("Product Not Added!");
    }
  }
);

// fetch product from the database
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async (_, thunkAPI) => {
    const docRef = collection(db, "products");
    const snapShot = await getDocs(docRef);
    console.log("K");
    const products = snapShot.docs.map((p) => ({
      id: p.id,
      ...p.data(),
    }));
    return products;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: productArray,
  reducers: {
    // to add the product
    add: (state, action) => {
      const newProduct = {
        name: action.payload.name,
        url: action.payload.url,
        description: action.payload.description,
        rating: action.payload.rating,
        price: action.payload.price,
      };
      return [newProduct, ...state]; // avoid using state.push
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, actions) => {
      // state = [...actions.payload];
      // return state; // we can also do it but its not the best way as we are making extra copy

      return actions.payload; // return modified state
    });
  },
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer;
