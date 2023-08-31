import styles from "./Product.module.css";
import {AiOutlineStar} from 'react-icons/ai';



export const Product = () => {
    // function calculateRating (r){
    //     for(let i=0;i<r;i++){
    //         return(
    //             <>
    //                         <AiOutlineStar className={styles.rating}/>

    //             </>
    //         )
    //     }

    // }
  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImage}>
          <img
            src="https://images.stockx.com/images/Air-Jordan-4-Retro-Messy-Room-GS-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1667976285"
            alt="jordan 4"
            className={styles.img}
          />
        </div>
        <div className={styles.productAbout}>
          <div>Jordan 4</div>
          <div>&#8377; 4000</div>
          <div className={styles.productRating}>
            <AiOutlineStar className={styles.rating}/>
            <AiOutlineStar className={styles.rating}/>
            <AiOutlineStar className={styles.rating}/>
          </div>
        </div>
        <div className={styles.productDescription}>
          Hi this is productDescription
        </div>
      </div>
    </>
  );
};
