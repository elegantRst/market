import { AlertColor, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAppDispatch } from "redux/store";
import { logout } from "redux/auth/slice";
import Alert from "components/Content/Elements/AlertComponent/AlertComponent";

import LoadingButton from "@mui/lab/LoadingButton";

import styles from "../../Auth/Auth.module.scss";
import { SelectAuth } from "redux/auth/selectors";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteAccount } from "redux/auth/thunks";

const DeleteAccount = () => {
  const dispatch = useAppDispatch();
  const { user } = useSelector(SelectAuth);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteAccount(user.user.id));
    setOpen(true);
    logout();
    localStorage.removeItem("user");
  };

  return (
    <>
      <form className={`${styles.form} ${styles.formSettings}`} onSubmit={handleSubmit}>
        <h2 className={styles.subtitle}>
          После удаления аккаунта, персональные данные <br /> восстановлению не подлежат
        </h2>
        <FormGroup className={styles.checkbox_box}>
          <FormControlLabel required control={<Checkbox />} label="Подтвердите удаление" />
        </FormGroup>
        <LoadingButton className={styles.button_box} variant="contained" type="submit">
          Удалить аккаунт
        </LoadingButton>
      </form>
      <Alert open={open} severity={severity} text="Аккаунт успешно удалён" />
    </>
  );
};

export default DeleteAccount;
