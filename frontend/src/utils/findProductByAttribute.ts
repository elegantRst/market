import { store } from 'redux/store';

export const findProductByAttribute = (value: string) => {
	const storeData = store.getState();
	const { productsAll } = storeData?.products;
	const result = productsAll?.find(item => {
		return item[value];
	});
	return result;
};
