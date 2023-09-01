import styles from "./Cart.module.css";

export const Cart = () => {
  return (
    <>
      <div className={styles.container}>
      <div className={styles.productContainer}>
          <div className={styles.image}>
            <img
              src="https://images.stockx.com/images/Air-Jordan-4-Retro-Messy-Room-GS-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1667976285"
              alt="jordan 4"
              className={styles.img}
            />
          </div>
          <div className={styles.name}>Air jordan 4</div>
          <div className={styles.qty}>Quantity : 4</div>

          <div className={styles.actionButtons}>
            <button className={styles.buyNow}>Buy Now</button>
            <button className={styles.remove}>Remove</button>
          </div>
        </div>
        
      </div>
    </>
  );
};
