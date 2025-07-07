import { deleteItemInCart } from "redux/cart/slice";
import { useAppDispatch } from "redux/store";
import { setNotificatioType, setNotificationInfo, setNotificationStatus } from "redux/notification/slice";

import styles from "./Buttons.module.scss";
import { ntfMessageDeleteFromCart, ntfTypeDeleteFromCart } from "redux/notification/consts";

const DeleteFromCartBtn = ({ item }) => {
  const dispatch = useAppDispatch();

  const deleteItem = (item) => {
    dispatch(deleteItemInCart({ ...item }));
    dispatch(setNotificationStatus(true));
    dispatch(setNotificatioType(ntfTypeDeleteFromCart));
    dispatch(setNotificationInfo({ item: item, message: ntfMessageDeleteFromCart, type: ntfTypeDeleteFromCart }));
  };

  return <div className={`${styles.cart__item_delete} icon_trash`} onClick={() => deleteItem(item)}></div>;
};

export default DeleteFromCartBtn;
