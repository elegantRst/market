export type ProductType = {
	art: string;
	category: number;
	color: string;
	description: string;
	featured: boolean;
	id: number;
	imageUrl: string;
	inStock: string;
	name: string;
	price: number;
	rating: string;
	salePrice: number;
	slides?: string[] | undefined;
	recommend?: boolean;
	salehit?: boolean;
	saler?: boolean;
	bestRating?: boolean;
};
export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}
export type activeSort = {
	name: string;
	value: string;
};
export type Search = {
	Search: string;
};
export type FetchProductsArgs = {
	activeCategory?: string;
	activeColor?: string;
	activeRating?: number;
	activeShow?: number;
	activeSort?: activeSort;
	currentPage?: number;
	priceMinMax?: [number, number];
	searchValue?: any;
};
export interface GetProductsSliceState {
	productsCount: number;
	products: ProductType[];
	productsAll: ProductType[];
	status: string;
	statusAll: string;
}
