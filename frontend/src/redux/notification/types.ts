import { CardTypeInCart } from "redux/cart/types";

export type NotificationInfo = {
  item: CardTypeInCart;
  message: string;
  type: string;
};

export interface NotificationSliceState {
  notificationStatus: boolean;
  notificationMessage: string;
  notificationType: string;
  notificationInfo: NotificationInfo[];
}
