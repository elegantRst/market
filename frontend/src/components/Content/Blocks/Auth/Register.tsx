import {
	Checkbox,
	CircularProgress,
	FormControlLabel,
	FormGroup,
	TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import styles from './Auth.module.scss';
import { useSelector } from 'react-redux';
import { SelectAuth } from 'redux/auth/selectors';
import { Success } from 'errors';
import { useAppDispatch } from 'redux/store';
import { setLoginModalStatus, setRegisterModalStatus } from 'redux/auth/slice';
import { FieldErrors, FieldValues } from 'react-hook-form';

export type RegisterProps<TFieldValues extends FieldValues = FieldValues> = {
	register: any;
	errors: FieldErrors<TFieldValues>;
};

const Register: React.FC<RegisterProps> = ({ register, errors }) => {
	const dispatch = useAppDispatch();
	const { requestError, isLoading } = useSelector(SelectAuth);

	const Login = () => {
		dispatch(setLoginModalStatus(true));
		dispatch(setRegisterModalStatus(false));
	};

	return (
		<form className={styles.form}>
			<h2 className={styles.title}>Регистрация</h2>
			<h2 className={styles.subtitle}>Зарегистрируйте ваш логин</h2>
			<TextField
				className={styles.input_box}
				label='Введите ваш email'
				variant='outlined'
				placeholder=''
				type='email'
				{...register('email')}
				error={!!errors.email}
				helperText={errors.email ? `${errors.email.message}` : ''}
			/>
			<TextField
				className={styles.input_box}
				label='Введите ваш логин'
				variant='outlined'
				type='text'
				{...register('login')}
				error={!!errors.login}
				helperText={errors.login ? `${errors.login.message}` : ''}
			/>
			<TextField
				className={styles.input_box}
				label='Введите ваше имя'
				variant='outlined'
				type='text'
				{...register('name')}
				error={!!errors.name}
				helperText={errors.name ? `${errors.name.message}` : ''}
			/>
			<TextField
				className={styles.input_box}
				label='Введите ваш пароль'
				variant='outlined'
				type='password'
				{...register('password')}
				error={!!errors.password}
				helperText={errors.password ? `${errors.password.message}` : ''}
			/>
			<TextField
				className={styles.input_box}
				label='Подтвердите ваш пароль'
				variant='outlined'
				type='password'
				{...register('passwordRepeat')}
				error={!!errors.passwordRepeat}
				helperText={
					errors.passwordRepeat ? `${errors.passwordRepeat.message}` : ''
				}
			/>
			<FormGroup className={styles.checkbox_box}>
				<FormControlLabel
					required
					control={<Checkbox />}
					label='Соглашаюсь с правилами'
				/>
			</FormGroup>
			{requestError && (
				<div
					className={`${
						requestError === Success.successRegister
							? styles.success
							: styles.error
					} ${styles.message}`}
				>
					{requestError}
					{requestError === Success.successRegister ? (
						<CircularProgress className={styles.progressIcon} color='success' />
					) : (
						''
					)}
				</div>
			)}
			<LoadingButton
				loading={isLoading}
				className={styles.button_box}
				variant='contained'
				type='submit'
			>
				Регистрация
			</LoadingButton>
			<div className={styles.text}>
				У вас уже есть аккаунт?
				<span
					style={{ color: '#5151e8', cursor: 'pointer' }}
					onClick={() => Login()}
				>
					Войти
				</span>
			</div>
		</form>
	);
};

export default Register;
