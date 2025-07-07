import styles from "./Auth.module.scss";
import { useSelector } from "react-redux";
import { SelectAuth } from "redux/auth/selectors";
import { Success } from "errors";
import { useAppDispatch } from "redux/store";
import { setLoginModalStatus, setRegisterModalStatus } from "redux/auth/slice";
import { FieldErrors, FieldValues } from "react-hook-form";
import { CircularProgress, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export type LoginProps<TFieldValues extends FieldValues = FieldValues> = {
  register: any;
  errors: FieldErrors<TFieldValues>;
};

const Login: React.FC<LoginProps> = ({ register, errors }) => {
  const dispatch = useAppDispatch();
  const { requestError, isLoading } = useSelector(SelectAuth);

  const Register = () => {
    dispatch(setRegisterModalStatus(true));
    dispatch(setLoginModalStatus(false));
  };

  return (
    <div className={styles.form}>
      <h2 className={styles.title}>Авторизация</h2>
      <h2 className={styles.subtitle}>Введите ваш логин и пароль</h2>
      <TextField className={styles.input_box} label="Введите ваш email" variant="outlined" {...register("email")} error={!!errors.email} helperText={errors.email ? `${errors.email.message}` : ""} />
      <TextField className={styles.input_box} label="Введите ваш пароль" variant="outlined" type="password" {...register("password")} error={!!errors.password} helperText={errors.password ? `${errors.password.message}` : ""} />
      {requestError && (
        <div className={`${requestError === Success.successLogin ? styles.success : styles.error} ${styles.message}`}>
          {requestError}
          {requestError === Success.successLogin ? <CircularProgress className={styles.progressIcon} color="success" /> : ""}
        </div>
      )}
      <LoadingButton loading={isLoading} className={styles.button_box} variant="contained" type="submit">
        Войти
      </LoadingButton>
      <div className={styles.text}>
        У вас нет аккаунта? <a onClick={() => Register()}>Регистрация</a>
      </div>
    </div>
  );
};

export default Login;
