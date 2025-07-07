import { SelectAuth } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'redux/store';
import {
	setLoginModalStatus,
	setRegisterModalStatus,
	setRequestError,
} from 'redux/auth/slice';
import { useEffect } from 'react';
import { setMenuUrlValue } from 'redux/filters/slice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, RegisterSchema } from 'utils/yup';
import Login from 'components/Content/Blocks/Auth/Login';

import styles from './Modals.module.scss';
import Register from 'components/Content/Blocks/Auth/Register';
import { IRegisterData } from 'redux/auth/types';
import { registerUser } from 'redux/auth/thunks';
import { Success } from 'errors';

const AuthModal = () => {
	const dispatch = useAppDispatch();
	const { registerModalStatus, loginModalStatus } = useSelector(SelectAuth);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginModalStatus ? LoginSchema : RegisterSchema),
		mode: 'onChange',
	});

	useEffect(() => {
		dispatch(setMenuUrlValue(''));
	});

	const onSubmit = async (data: any) => {
		console.log('Форма отработала', data);
		// if (loginModalStatus) {
		// try {
		// 	const userData = {
		// 		email: data.email,
		// 		password: data.password,
		// 	};
		// 	dispatch(fetchReviewsInProfile(token));
		// 	dispatch(fetchCartInProfile(token));
		// 	dispatch(getUser());
		// 	dispatch(setRequestError(Success.successLogin));
		// 	const resultAction = await dispatch(loginUser(userData));
		// 	if (!('error' in resultAction)) {
		// 		setTimeout(() => {
		// 			dispatch(setLoginModalStatus(false));
		// 		}, 2000);
		// 	}
		// } catch (error: any) {
		// 	dispatch(
		// 		setRequestError(error.response?.data?.message || error.message)
		// 	);
		// }
		// } else if (registerModalStatus) {
		try {
			dispatch(setRequestError(''));
			const userData: IRegisterData = {
				firstName: data.name,
				userName: data.login,
				email: data.email,
				password: data.password,
			};
			const res = await dispatch(registerUser(userData));
			if ('error' in res) {
				const errorMessage = res.payload || res.error.message;
				dispatch(setRequestError(errorMessage as string));
			} else {
				dispatch(setRequestError(Success.successRegister));
				// setTimeout(() => {
				// 	dispatch(setRegisterModalStatus(false));
				// 	dispatch(setRequestError(''));
				// }, 2000);
			}
		} catch (error: any) {
			console.error('Ошибка при входе', error.message);
			dispatch(setRequestError(error.message));
		}
		// }
	};

	const modalClose = (e: React.MouseEvent) => {
		if (e.target && e.currentTarget.classList.contains('dismiss')) {
			dispatch(setLoginModalStatus(false));
			dispatch(setRegisterModalStatus(false));
			dispatch(setRequestError(''));
		}
	};

	return (
		<div
			className={
				registerModalStatus || loginModalStatus
					? `${styles.authModal} ${styles.active}`
					: `${styles.authModal}`
			}
			onClick={modalClose}
		>
			<div className={`${styles.authModal__overlay} dismiss`}>
				<form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
					{registerModalStatus && (
						<>
							<div className={`${styles.authModal__close} dismiss`}></div>
							<Register register={register} errors={errors} />
						</>
					)}
					{loginModalStatus && (
						<>
							<div className={`${styles.authModal__close} dismiss`}></div>
							<Login register={register} errors={errors} />
						</>
					)}
				</form>
			</div>
		</div>
	);
};

export default AuthModal;
