import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { LuEdit2 } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../../redux/reducers/productReducer";

import styles from "./Product.module.css";

export const Product = (props) => {
  const { name, url, price, rating, description, id } = props;
  const dispatch = useDispatch();

  const [showForm, setShowForm] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name,
    price,
    description,
  });

  const handleDelete = () => {
    dispatch(deleteProduct(id));
  };

  const toggleShowForm = () => {
    setShowForm(!showForm);
  };

  const calculateRating = (r) => {
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
  };

  const handleEdit = () => {
    // Dispatch an action to update the product with the edited data
    dispatch(updateProduct({ id, ...editedProduct }));
    toggleShowForm();
  };

  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img src={url} alt={name} className={styles.img} />
        </div>
        <div className={styles.productAbout}>
          <div>{showForm ? (
              <input
                type="text"
                value={editedProduct.name}
                className={styles.updateInput}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    name: e.target.value,
                  })
                }
              />
            ) : (
              name
            )}
          </div>
          <div>
            {showForm ? (
              <input
                type="text"
                className={styles.updateInput}
                value={editedProduct.price}
                onChange={(e) =>
                  setEditedProduct({
                    ...editedProduct,
                    price: e.target.value,
                  })
                }
              />
            ) : (
              `₹ ${price}`
            )}
          </div>
          <div className={styles.productRating}>
            {calculateRating(rating)}
          </div>
        </div>
        <div className={styles.productDescription}>
          {showForm ? (
            <input
              value={editedProduct.description}
              className={styles.updateInput}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  description: e.target.value,
                })
              }
            />
          ) : (
            description
          )}
        </div>
        <div className={styles.actionButtons}>
          {showForm ? (
            <button onClick={handleEdit} className={styles.save}>Save</button>
          ) : (
            <div className={styles.outer}>
              <LuEdit2 className={styles.edit} onClick={toggleShowForm} />
            </div>
          )}
          <div className={styles.outer}>
            <MdDeleteOutline className={styles.delete} onClick={handleDelete} />
          </div>
        </div>
      </div>
    </>
  );
};
