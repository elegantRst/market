import { useSelector } from 'react-redux';
import { SelectAuth } from 'redux/auth/selectors';
import {
	AlertColor,
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch } from 'redux/store';
import Alert from 'components/Content/Elements/AlertComponent/AlertComponent';

import styles from '../../Auth/Auth.module.scss';
import { getUser, updateUsername } from 'redux/auth/thunks';

const PersonalInfo = () => {
	const dispatch = useAppDispatch();
	const { user } = useSelector(SelectAuth);
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [open, setOpen] = useState(false);
	const [severity, setSeverity] = useState<AlertColor>('success');
	const [error, setError] = useState(false);

	useEffect(() => {
		if (user) {
			setEmail(user.user.email);
			setUserName(user.user.userName);
			setFirstName(user.user.firstName);
		}
	}, [user]);

	const handleSubmit = e => {
		e.preventDefault();
		try {
			const data = {
				email,
				userName,
				firstName,
			};
			if (
				email === user.user.email &&
				userName === user.user.userName &&
				firstName === user.user.firstName
			) {
				return;
			} else {
				setOpen(true);
				setSeverity('success');
				setError(false);
				dispatch(updateUsername(data));
				dispatch(getUser());
				setTimeout(() => {
					setOpen(false);
				}, 2000);
			}
		} catch (error) {
			setOpen(true);
			setSeverity('error');
			setError(true);
			setTimeout(() => {
				setOpen(false);
			}, 2000);
		}
	};

	return (
		<>
			<form
				className={`${styles.form} ${styles.formSettings}`}
				onSubmit={handleSubmit}
			>
				<h2 className={styles.subtitle}>
					Введите ваши новые данные и сохраните изменения
				</h2>
				<TextField
					className={styles.input_box}
					onChange={e => setEmail(e.target.value)}
					value={email}
					label='Введите ваш новый email'
					variant='outlined'
					placeholder=''
					type='email'
				/>
				<TextField
					className={styles.input_box}
					onChange={e => setUserName(e.target.value)}
					value={userName}
					label='Введите ваш новый логин'
					variant='outlined'
					placeholder=''
					type='text'
				/>
				<TextField
					className={styles.input_box}
					onChange={e => setFirstName(e.target.value)}
					value={firstName}
					label='Введите ваше новое имя'
					variant='outlined'
					placeholder=''
					type='text'
				/>
				<FormGroup className={styles.checkbox_box}>
					<FormControlLabel
						required
						control={<Checkbox />}
						label='Подтвердите изменения'
					/>
				</FormGroup>
				<LoadingButton
					className={styles.button_box}
					variant='contained'
					type='submit'
				>
					Сохранить
				</LoadingButton>
			</form>
			<Alert
				open={open}
				severity={severity}
				text={error ? 'Ошибка при изменении данных' : 'Данные успешно изменены'}
			/>
		</>
	);
};

export default PersonalInfo;
