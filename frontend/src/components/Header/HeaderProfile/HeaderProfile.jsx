import { Link, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { SelectAuth } from 'redux/auth/selectors';
import { useAppDispatch } from 'redux/store';
import {
	logout,
	setLoginModalStatus,
	setRegisterModalStatus,
} from 'redux/auth/slice';

import AccountBoxIcon from '@mui/icons-material/AccountBox';

import styles from '../Header.module.scss';
import { useState } from 'react'; 

const HeaderProfile = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { user, isLogged } = useSelector(SelectAuth);

	const [localCart, setLocalCart] = useState([]);
	const [userCart, setUserCart] = useState([]);

	const Register = () => {
		dispatch(setRegisterModalStatus(true));
	};

	const Login = () => {
		dispatch(setLoginModalStatus(true));
	};

	const Logout = () => {
		dispatch(logout());
		localStorage.removeItem('user');
		navigate('/');
		// window.location.reload();
	};

	return (
		<>
			<div className={styles.header__profile}>
				{isLogged ? (
					<div className={styles.header__profile_isauth}>
						<Link
							className={styles.header__profile_avatar}
							to={`profile/${user?.user?.id}`}
						>
							<AccountBoxIcon />
						</Link>
						<div
							className={styles.header__profile_btn}
							onClick={() => Logout()}
						>
							Выйти
						</div>
					</div>
				) : (
					<div className={styles.header__profile_notauth}>
						<button
							className={styles.header__profile_btn}
							onClick={() => Register()}
						>
							Регистрация
						</button>
						<button
							className={styles.header__profile_btn}
							onClick={() => Login()}
						>
							Войти
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default HeaderProfile;
