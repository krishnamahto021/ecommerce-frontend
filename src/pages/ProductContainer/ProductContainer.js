import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Product/Product";
import { fetchProduct, productSelector } from "../../redux/reducers/productReducer";
import { useEffect } from "react";
import { cartSelector, fetchCartProductFromDb } from "../../redux/reducers/cartReducer";
import { Sort } from "../../components/Sort/Sort";


export const ProductContainer = () => {
  const dispatch = useDispatch();

  let productArray = useSelector(productSelector);
  let cartArray = useSelector(cartSelector);

  useEffect(()=>{
    dispatch(fetchProduct());  
  },[dispatch]);

  useEffect(()=>{
    dispatch(fetchCartProductFromDb()); 
  },[dispatch,cartArray]);
  

  return (    
    <>
    <Sort/>
      {productArray.map((p, i) => {
        return (
          <Product
            name={p.name}
            url={p.url}
            rating={p.rating}
            description={p.description}
            price={p.price}
            id={p.id}
            key={i}
          />
        );
      })}
    </>
  );
};
