import { setNotificatioType, setNotificationInfo, setNotificationStatus } from "redux/notification/slice";
import { store } from "redux/store";

export const DispatchNotification = (status, item, message, type) => {
  store.dispatch(setNotificationStatus(status));
  store.dispatch(setNotificatioType(message));
  store.dispatch(setNotificationInfo({ item, message, type }));
};
