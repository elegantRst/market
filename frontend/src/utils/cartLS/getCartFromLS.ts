import { CardTypeInCart } from "redux/cart/types";

export const getCartFromLS = () => {
  const data = localStorage.getItem("cart");
  const itemsInCartFromLS: CardTypeInCart[] = data ? JSON.parse(data) : [];
  return {
    itemsInCartFromLS,
  };
};

export const getCartFromProfileLS = () => {
  const data = localStorage.getItem("userCart");
  const itemsInCartFromProfileLS: CardTypeInCart[] = data ? JSON.parse(data) : [];
  return {
    itemsInCartFromProfileLS,
  };
};
