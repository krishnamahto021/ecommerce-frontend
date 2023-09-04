import { useDispatch,useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { cartSelector, deleteCartProductFromDb, fetchCartProductFromDb,deleteCartProduct } from "../../redux/reducers/cartReducer";
import { useEffect } from "react";

export const Cart = () => {
  let cartArray = useSelector(cartSelector);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(fetchCartProductFromDb());   
  },[dispatch]);

  const handleDelete = (data)=>{
    dispatch(deleteCartProductFromDb(data));
    dispatch(deleteCartProduct(data));
  }

  return (
    <>
      <div className={styles.container}>
        {cartArray.map((cartProduct, i) => {
          return (
            <>
              <div className={styles.productContainer} key={i}>
                <div className={styles.image}>
                  <img
                    src={cartProduct.url}
                    alt={cartProduct.name}
                    className={styles.img}
                  />
                </div>
                <div className={styles.name}>{cartProduct.name}</div>

                <div className={styles.aboutCartProduct}>
                  <div className={styles.qty}>Price :  ₹ {cartProduct.price}</div>
                  <div className={styles.qty}>Quantity : {cartProduct.qty}</div>
                  <div className={styles.qty}>
                    Total : ₹ {parseFloat(cartProduct.price) * parseFloat(cartProduct.qty)}
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button className={styles.buyNow}>Buy Now</button>
                  <button className={styles.remove} onClick={()=>handleDelete(cartProduct)}>Remove</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
