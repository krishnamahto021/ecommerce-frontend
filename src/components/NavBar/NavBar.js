import styles from "./NavBar.module.css";
import { MdAddCircleOutline } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";

export const NavBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <span className={styles.text}>ogStore</span>
          </Link>
          <span>Products</span>
        </div>

        <div className={styles.product}>
          <span>Add a product</span>
          <Link to={"/product-form"}>
            <MdAddCircleOutline className={styles.add} />
          </Link>
        </div>

        <div className={styles.cart}>
          <Link to={"/cart"}>
            <AiOutlineShoppingCart className={styles.cartIcon} />
          </Link>
          <span className={styles.cartCount}>5</span>
        </div>
      </div>
      <Outlet />
    </>
  );
};
