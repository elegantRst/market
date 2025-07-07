export type CardTypeInCart = {
  productId: number;
  imageUrl: string;
  name: string;
  price: number;
  salePrice: number;
  count: number;
  currentTotalPrice: number;
  currentTotalSalePrice: number;
};

export interface CartSliceState {
  itemsInCart: CardTypeInCart[];
  cartInProfile: CardTypeInCart[];
  totalCount?: number;
  totalPrice?: number;
  totalSalePrice?: number;
  status: boolean;
  cartModalStatus: boolean;
  orderModalStatus: boolean;
  totalCountInProfile?: number;
  totalPriceInProfile?: number;
  totalSalePriceInProfile?: number;
  fetchCartInProfileStatus: string;
  postCartInProfileStatus: string;
}
