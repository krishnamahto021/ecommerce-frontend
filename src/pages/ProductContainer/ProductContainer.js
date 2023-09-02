import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Product/Product";
import { fetchProduct, productSelector } from "../../redux/reducers/productReducer";
import { useEffect } from "react";


export const ProductContainer = () => {
  const dispatch = useDispatch();

  let productArray = useSelector(productSelector);

  useEffect(()=>{
    dispatch(fetchProduct());   
  },[dispatch]);
  

  return (    
    <>
      {productArray.map((p, i) => {
        return (
          <Product
            name={p.name}
            url={p.url}
            rating={p.rating}
            descrtiption={p.descrtiption}
            price={p.price}
            key={i}
          />
        );
      })}
    </>
  );
};
