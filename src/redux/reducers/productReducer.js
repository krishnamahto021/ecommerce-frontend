import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseinit";
import { toast } from "react-toastify";

const productArray = [
  {
    name: "Aj4",
    url: "https://images.stockx.com/images/Air-Jordan-4-Retro-Messy-Room-GS-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1667976285",
    price: "2500",
    rating: "5",
    descrtiption: "hi",
  },
];

// to add the product to the database
export const addProductToDb = createAsyncThunk(
  "product/addProductToDb",
  async (data,thunkAPI)=>{
    try{
    const docRef = collection(db,'products');
    await addDoc(docRef,data);
    toast.success("Product Added Successfully!! ");
    }catch(err){
      console.log("Error in adding product to firestore",err);
      toast.error("Product Not Added!");
    }
  }
);

// fetch product from the database
export const fetchProduct = createAsyncThunk(
  "product/fetchProduct",
  async(_,thunkAPI)=>{
    

  }
)

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
});

export const productReducer = productSlice.reducer;
export const actions = productSlice.actions;
export const productSelector = (state) => state.productReducer;
