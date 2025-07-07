import { CardTypeInCart } from "redux/cart/types";

export const calcTotalCount = (itemsInCartFromLS: CardTypeInCart[]) => {
  if (Array.isArray(itemsInCartFromLS)) {
    return itemsInCartFromLS && itemsInCartFromLS.reduce((count, item) => item.count + count, 0);
  }
};

export const calcTotalPrice = (itemsInCartFromLS: CardTypeInCart[]) => {
  if (Array.isArray(itemsInCartFromLS)) {
    return itemsInCartFromLS && itemsInCartFromLS.reduce((sum, item) => item.price * item.count + sum, 0);
  }
};

export const calcTotalSalePrice = (itemsInCartFromLS: CardTypeInCart[]) => {
  if (Array.isArray(itemsInCartFromLS)) {
    return itemsInCartFromLS && itemsInCartFromLS.reduce((sum, item) => item.salePrice * item.count + sum, 0);
  }
};
