import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebaseinit";

const initialState = [];

// add cart product to databse
export const addCartProductToDb = createAsyncThunk(
  "product/addCartProductToDb",
  async (data, thunkAPI) => {
    try {
      const { name, url, price, id } = data;
      const docRef = collection(db, "cart");
      const cartProductSnapshot = await getDocs(docRef);
      const existingProduct = cartProductSnapshot.docs.find(
        (p) => p.data().id === id.toString()
      );
      if (existingProduct) {
        const existingProductId = existingProduct.id;
        const existingProductData = existingProduct.data();
        await updateDoc(doc(db, "cart", existingProductId), {
          qty: existingProductData.qty + 1,
        });
        toast.success("Increased Quantity!");
      } else {
        const newCartProduct = {
          name,
          url,
          price,
          id,
          qty: 1,
        };
        await addDoc(docRef, newCartProduct);
        toast.success("New Product Added to Cart!");
      }
    } catch (err) {
      console.log(`errror in adding product to the cart ${err}`);
      toast.error("Cart Product Not Added!!");
    }
  }
);

// fetch cart product from database
export const fetchCartProductFromDb = createAsyncThunk(
  "product/fetchCartProductFromDb",
  async (_, thunkAPI) => {
    const docRef = collection(db, "cart");
    const productsSnapshot = await getDocs(docRef);
    const cartProducts = productsSnapshot.docs.map((p) => ({
      id: p.id,
      ...p.data(),
    }));
    return cartProducts;
  }
);

// delete cart product from database
export const deleteCartProductFromDb = createAsyncThunk(
  "product/deleteCartProductFromDb",
  async (data, thunkAPI) => {
    try{

      const { qty} = data;
      const collectionRef = collection(db, "cart");
      const snapShot = await getDocs(collectionRef);
      const cartProductId = snapShot.docs.map((p)=>(p.id));
      const cartProductRef = doc(db,'cart',cartProductId[0]);
      if(qty>1){
        updateDoc(cartProductRef,{
          qty:qty-1
        });
      }else{
      await deleteDoc(cartProductRef);
      }
    }catch(err){
      console.log("Error in deleting product from cart",err);
      toast.error("Error in Deleting Product from Cart!");
    }
      
    
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const { name, url, price, id } = action.payload;
      const existingProduct = state.find((p) => p.id === id);
      if (existingProduct) {
        // product is there
        console.log(existingProduct);
        const cartProduct = {
          ...existingProduct,
          qty: existingProduct.qty + 1,
        };
        return state.map((product) =>
          product.id === id ? cartProduct : product
        );
      } else {
        const cartProduct = {
          // product is not there
          name,
          price,
          url,
          id,
          qty: 1,
        };

        return [cartProduct, ...state];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProductFromDb.fulfilled, (state, action) => {
        return action.payload; // return modified state
      })
      .addCase(deleteCartProductFromDb.fulfilled, (state, action) => {});
  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
