import styles from "./Product.module.css";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

export const Product = (props) => {
  const { name, url, price, rating, description } = props;
  function calculateRating(r) {
    r = parseFloat(r); // so that the value of string converts to integer
    let stars = [];
    for (let i = 0; i < 5; i++) {
      // Determine whether to use filled-star or AiOutlineStar based on the rating
      if (i < r) {
        stars.push(
          <AiFillStar
            className={`${styles.rating} ${styles["filled-star"]}`}
            key={i}
          />
        );
      } else {
        stars.push(<AiOutlineStar className={styles.rating} key={i} />);
      }
    }
    return stars;
  }

  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img src={url} alt={name} className={styles.img} />
        </div>
        <div className={styles.productAbout}>
          <div>{name}</div>
          <div>&#8377; {price}</div>
          <div className={styles.productRating}>{calculateRating(rating)}</div>
        </div>
        <div className={styles.productDescription}>{description}</div>
        <div className={styles.actionButtons}>
          <button className={styles.addToCart}>Add to Cart</button>
          <div className={styles.outer}>
            <LuEdit2 className={styles.edit} />
          </div>

          <div className={styles.outer}>
            <MdDeleteOutline className={styles.delete} />
          </div>
        </div>
      </div>
    </>
  );
};
