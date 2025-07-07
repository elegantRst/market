import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { SelectAuth } from "redux/auth/selectors";
import { SelectNotification } from "redux/notification/selectors";
import { useAppDispatch } from "redux/store";
import moment from "moment";
import { useState } from "react";
import { setNotificationInfo, setNotificationStatus } from "redux/notification/slice";

import styles from "./Profile.module.scss";
import { NotificationInfo } from "redux/notification/types";

const TopBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState<boolean>(false);
  const { user } = useSelector(SelectAuth);
  const { notificationStatus, notificationInfo } = useSelector(SelectNotification);
  const userInfo = user ? user.user : {};
  const formatCreatedAt = moment(userInfo.createdAt).format("DD.MM.YY");
  const formatUpdatedAt = moment(userInfo.createdAt).format("DD.MM.YY");

  const notificationBtn = () => {
    dispatch(setNotificationStatus(false));
    setModal(!modal);
  };

  const notificationClose = (e) => {
    if (e.target.classList.contains("dismiss")) {
      setModal(!modal);
      localStorage.setItem("notification", "");
      dispatch(setNotificationInfo(""));
    }
  };

  return (
    <div className={styles.topbar}>
      <div className={styles.topbar__info}>
        <div className={styles.author_name}>Здравствуйте, {userInfo?.firstName}</div>
        <div className={styles.date}>
          <span>
            Дата регистрации <strong>{formatCreatedAt}</strong>
          </span>
          {formatCreatedAt !== formatUpdatedAt && (
            <span>
              Дата смены пароля <strong>{formatUpdatedAt}</strong>
            </span>
          )}
        </div>
      </div>
      <div className={styles.topbar__form}>
        <div className={styles.notification}>
          <IconButton onClick={() => notificationBtn()}>
            <NotificationsIcon />
          </IconButton>
          <div className={modal ? `${styles.layout} ${styles.active} dismiss` : `${styles.layout} dismiss`} onClick={notificationClose}></div> {notificationStatus && <div className={styles.notification_status}></div>}
          <div className={modal ? `${styles.notification_info} ${styles.active} isNftModal` : `${styles.notification_info} isNftModal`}>
            {notificationInfo.length > 0 ? (
              [...notificationInfo].reverse().map((element: NotificationInfo, index: number) => (
                <div className={styles.notificationInfo__item} key={index}>
                  <span>{element?.message}</span>
                  <strong>{element?.item?.name}</strong>
                </div>
              ))
            ) : (
              <span>Уведомлений нет</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
