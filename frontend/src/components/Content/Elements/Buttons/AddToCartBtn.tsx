import styles from "./Buttons.module.scss";
import { OnClickAddToCart } from "utils/onClickAddToCart";
import { useSelector } from "react-redux";
import { SelectAuth } from "redux/auth/selectors";

const AddToCartBtn = ({ item }) => {
  const { isLogged } = useSelector(SelectAuth);

  return (
    <>
      <div className={`${styles.slide__info_link} icon_shopping_basket`} onClick={() => OnClickAddToCart(item, isLogged)}></div>
    </>
  );
};

export default AddToCartBtn;
