import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { useAppDispatch } from 'redux/store';

import { fetchBlog } from 'redux/getBlog/thunks';
import { fetchShowroom } from 'redux/getShowroom/thunks';
import { fetchProducts } from 'redux/getProducts/thunks';

import Content from './components/Content/Content';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

import AOS from 'aos';
import 'aos/dist/aos.css';
import 'aos/dist/aos.js';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './App.module.scss';
import './assets/scss/global.scss';
import { SelectAuth } from 'redux/auth/selectors';
import { useSelector } from 'react-redux';
import { isExpired } from 'react-jwt';
import { logout } from 'redux/auth/slice';

const App: React.FC = () => {
	const dispatch = useAppDispatch();
	const { user } = useSelector(SelectAuth);

	const isMyTokenExpired = user?.token ? isExpired(user?.token) : '';

	useEffect(() => {
		if (isMyTokenExpired) {
			dispatch(logout());
		}
	}, [dispatch, isMyTokenExpired]);

	const getProducts = async () => {
		await dispatch(fetchProducts());
	};
	const getShowroom = async () => {
		await dispatch(fetchShowroom());
	};
	const getBlog = async () => {
		await dispatch(fetchBlog());
	};
	// const getGrapichs = async () => {
	// 	await dispatch(fetchGraphics());
	// };
	useEffect(() => {
		AOS.init({
			duration: 2000,
		});
		getProducts();
		getShowroom();
		getBlog();
		// getGrapichs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<BrowserRouter>
			<div className={styles.wrapper}>
				<Header />
				<Content />
				<Footer />
			</div>
		</BrowserRouter>
	);
};

export default App;
