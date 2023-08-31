import styles from "./ProductForm.module.css";

export const ProductForm = () => {
  return (
    <>
      <div className={styles.productForm}>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="Enter Name of product" className={styles.input} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="description">Description</label>
            <input type="text" placeholder="Enter About product" className={styles.input} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="price">Price</label>
            <input type="text" placeholder="Price " className={styles.input} />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="rating">Rating</label>
            <input type="text" placeholder="Rating" className={styles.input}  />
          </div>

          <button className={styles.addButton}>Add</button>
        </form>
      </div>
    </>
  );
};
