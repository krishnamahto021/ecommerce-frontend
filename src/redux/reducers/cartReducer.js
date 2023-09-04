import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  setDoc,
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
      const { id, name, url, price } = data; 
      const docRef = doc(db, "cart", id); // Use 'id' for the document ID
      const cartProductSnapshot = await getDocs(collection(db, "cart"));
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
          id, // Use 'id' as the document ID field
          qty: 1,
        };
        await setDoc(docRef, newCartProduct); // Use 'setDoc' to set a document
        toast.success("New Product Added to Cart!");
      }
    } catch (err) {
      console.log(`error in adding product to the cart ${err}`);
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
    try {
      const { qty, id } = data;
      const cartProducts = doc(db,'cart',id);
      if(qty>1){
        await updateDoc(cartProducts,{
          qty:qty-1
        })
      }else{
        await deleteDoc(cartProducts);
        
      }
    } catch (err) {
      console.log("Error in deleting product from cart", err);
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
    deleteCartProduct: (state, action) => {
      const { qty, id } = action.payload;
      const cartProductIndex = state.findIndex((p) => p.id === id);
    
      if (cartProductIndex !== -1) {
        const updatedState = state.map((product) => {
          if (product.id === id && qty > 1) {
            return {
              ...product,
              qty: qty - 1,
            };
          }
          return product;
        });
    
        return qty > 1 ? updatedState : updatedState.filter((product) => product.id !== id);
      }
    
      return state; // Return the original state if the product is not found
    },
    
    
    
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProductFromDb.fulfilled, (state, action) => {
        return action.payload; // return modified state
      })
      .addCase(deleteCartProductFromDb.fulfilled(),(state,action)=>{

      })
  },
});

export const { addToCart,deleteCartProduct} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
