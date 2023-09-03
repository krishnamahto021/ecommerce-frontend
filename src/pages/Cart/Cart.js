import { useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { cartSelector } from "../../redux/reducers/cartReducer";

export const Cart = () => {
  let cartArray = useSelector(cartSelector);
  return (
    <>
      <div className={styles.container}>
        {cartArray.map((cartProduct, i) => {
          return (
            <>
              <div className={styles.productContainer}>
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
                  <div className={styles.qty}>Quantity : 4</div>
                  <div className={styles.qty}>
                    Total : ₹ {parseFloat(cartProduct.price) * parseFloat(4)}
                  </div>
                </div>

                <div className={styles.actionButtons}>
                  <button className={styles.buyNow}>Buy Now</button>
                  <button className={styles.remove}>Remove</button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
