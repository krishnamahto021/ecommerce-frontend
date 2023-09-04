import { useDispatch } from "react-redux";
import styles from "./sort.module.css";
import { actions } from "../../redux/reducers/productReducer";

export const Sort = () => {
  const dispatch = useDispatch();
  const { sortProduct } = actions;
  function sortPrice() {
    dispatch(sortProduct());
  }

  return (
    <>
      <button className={styles.sortButton} onClick={sortPrice}>
        Sort By Price
      </button>
    </>
  );
};
