import LoadingButton from "@mui/lab/LoadingButton";
import { AlertColor, Checkbox, FormControlLabel, FormGroup, TextField } from "@mui/material";
import Alert from "components/Content/Elements/AlertComponent/AlertComponent";

import styles from "../../Auth/Auth.module.scss";
import { useState } from "react";
import { useAppDispatch } from "redux/store";
import { updateUserPassword } from "redux/auth/thunks";

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
    };
    dispatch(updateUserPassword(data));
  };

  return (
    <>
      <form className={`${styles.form} ${styles.formSettings}`} onSubmit={handleSubmit}>
        <h2 className={styles.subtitle}>Введите ваш новый пароль и сохраните изменения</h2>
        <TextField className={styles.input_box} onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} label="Введите ваш текущий пароль" variant="outlined" placeholder="" type="text" />
        <TextField className={styles.input_box} onChange={(e) => setNewPassword(e.target.value)} value={newPassword} label="Введите ваш новый пароль" variant="outlined" placeholder="" type="text" />
        <FormGroup className={styles.checkbox_box}>
          <FormControlLabel required control={<Checkbox />} label="Подтвердите изменения" />
        </FormGroup>
        <LoadingButton className={styles.button_box} variant="contained" type="submit">
          Сохранить
        </LoadingButton>
      </form>
      <Alert open={open} severity={severity} text="Пароль успешно изменён" />
    </>
  );
};

export default ChangePassword;
