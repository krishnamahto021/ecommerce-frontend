import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseinit";
import { toast } from "react-toastify";
import { doc } from "firebase/firestore";

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
    const products = snapShot.docs.map((p) => ({
      id: p.id,
      ...p.data(),
    }));
    return products;
  }
);

// delete from database
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const productDocRef = doc(db, "products", id);
      await deleteDoc(productDocRef);
      toast.success("Product Deleted Successfully!");
      return id;
    } catch (err) {
      console.log("error in deleting the product", err);
      toast.error("Error in deleting Product");
    }
  }
);

// update from the database
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    const productDocRef = doc(db, "products", data.id);
    await updateDoc(productDocRef, {
      name: data.name,
      description: data.description,
      price: data.price,
    });
    return data;
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
    sortProduct:(state)=>{
      const sortedArray = state.sort((a,b)=>parseFloat(a.price)-parseFloat(b.price));
      console.log(sortedArray[0]);
      return sortedArray;
    }
  },
  extraReducers: (builder) => {
    // so that we can set the initial state based on the fetch items
    builder
      .addCase(fetchProduct.fulfilled, (state, actions) => {
        // state = [...actions.payload];
        // return state; // we can also do it but its not the best way as we are making extra copy

        return actions.payload; // return modified state
      })

      .addCase(deleteProduct.fulfilled, (state, actions) => {
        // delete the product
        const deltedProductId = actions.payload;
        return state.filter((p) => p.id !== deltedProductId);
      })

      .addCase(updateProduct.fulfilled, (state, actions) => {
        const { id, name, description, price } = actions.payload;
        const updatedState = state.map((p) =>
          p.id === id ? { ...p, name, description, price } : p
        );
        return updatedState;
      });
  },
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer;
