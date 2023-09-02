import { useRef } from "react";
import styles from "./ProductForm.module.css";
import { useDispatch} from "react-redux";
import { actions, addProductToDb } from "../../redux/reducers/productReducer";


export const ProductForm = () => {
  const nameInput = useRef();
  const urlInput = useRef();
  const ratingInput = useRef();
  const priceInput = useRef();
  const descriptionInput = useRef();

  const dispatch = useDispatch();
  const {add} = actions;


  function clearInput(){
    nameInput.current.value = "";
    descriptionInput.current.value = "";
    urlInput.current.value = "";
    ratingInput.current.value = "";
    priceInput.current.value = "";
  }

  async function handleSubmit (e){
    e.preventDefault();
    const name = nameInput.current.value;
    const url = urlInput.current.value;
    const description = descriptionInput.current.value;
    const rating = ratingInput.current.value;
    const price = priceInput.current.value;
    dispatch(add({name,url,description,rating,price}));
    dispatch(addProductToDb({name,url,description,rating,price}));
    clearInput();
  }


  return (
    <>
      <div className={styles.productForm}>
        <form className={styles.form}>
          <div className={styles.inputBox}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Name of product"
              required
              ref={nameInput}
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              placeholder="Enter About product"
              required
              ref={descriptionInput}
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              placeholder="Price "
              required
              ref={priceInput}
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="rating">Rating</label>
            <input
              type="text"
              placeholder="Rating out of 5"
              required
              ref={ratingInput}
              className={styles.input}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="rating">Image url</label>
            <input
              type="text"
              placeholder="Url"
              required
              ref={urlInput}
              className={styles.input}
            />
          </div>

          <button className={styles.addButton} onClick={handleSubmit} >Add</button>
        </form>
      </div>
    </>
  );
};
