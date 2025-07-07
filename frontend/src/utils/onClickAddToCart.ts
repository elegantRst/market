import { addItemInCart, setCartModalStatus } from "redux/cart/slice";
import { pushCartToProfile } from "redux/cart/thunks";
import { ntfMessagePlusToCart, ntfTypePlusToCart } from "redux/notification/consts";
import { DispatchNotification } from "./notificationDispatch";
import { store } from "redux/store";

export const OnClickAddToCart = async (item, isLogged) => {
  const itemForCart = {
    productId: item.id,
    imageUrl: item.imageUrl,
    name: item.name,
    price: item.price,
    salePrice: item.salePrice,
    count: 1,
    currentTotalPrice: item.price,
    currentTotalSalePrice: item.salePrice,
  };

  if (isLogged) {
    store.dispatch(pushCartToProfile(itemForCart));
    DispatchNotification(true, itemForCart, ntfMessagePlusToCart, ntfTypePlusToCart);
  } else {
    store.dispatch(addItemInCart(itemForCart));
  }

  store.dispatch(setCartModalStatus(true));
};
