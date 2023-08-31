import styles from "./NavBar.module.css";
import { MdAddCircleOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";

export const NavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <span className={styles.text}>ogStore</span> 
          <span >Products</span>
        </div>

        <div className={styles.product}>
          <span>Add a product</span>
          <MdAddCircleOutline className={styles.add}/>
        </div>

        <div className={styles.cart}>
          <AiOutlineShoppingCart className={styles.cartIcon} />
          <span className={styles.cartCount}>5</span>
        </div>
      </div>
    </>
  );
};
