import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebaseinit";

const initialState = [];

// add cart product to databse
export const addCartProductToDb = createAsyncThunk(
  "product/addCartProductToDb",
  async (data, thunkAPI) => {
    try{
        const {name,url,price} = data; 
        const newCartProduct = {
            name,
            url,
            price
        }
        const docRef = collection(db,"cart");
        await addDoc(docRef,newCartProduct);
    }catch(err){
        console.log(`errror in adding product to the cart {err}`);
        toast.error("Cart Product Not Added!!");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // add to cart
    addToCart: (state, action) => {
      const { name, url, price } = action.payload;
      const cartProduct = {
        name,
        price,
        url,
        qty: 1,
      };
      return [cartProduct, ...state];
    },
  },
});

export const { addToCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const cartSelector = (state) => state.cartReducer;
