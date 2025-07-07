import { DataGrid, GridColDef, ruRU } from '@mui/x-data-grid';

import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categoriesList } from 'redux/filters/consts';
import styles from './Tables.module.scss';
import { SelectGetProducts } from 'redux/getProducts/selectors';
import { ProductType } from 'redux/getProducts/types';

const TopPrice: React.FC = () => {
	const { productsAll } = useSelector(SelectGetProducts);
	const [array, setArray] = useState<ProductType[]>([]);

	useEffect(() => {
		const changedArray = productsAll?.map(item => {
			for (let i = 0; i < categoriesList.length; i++) {
				if (item?.category === i) {
					return { ...item, category: categoriesList[i].name };
				}
			}
		});
		// @ts-ignore
		setArray(changedArray);
	}, [productsAll]);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', minWidth: 30 },
		{ field: 'name', headerName: 'Название', minWidth: 200 },
		{ field: 'salePrice', headerName: 'Цена', minWidth: 70 },
		{ field: 'rating', headerName: 'Рейтинг', minWidth: 30 },
		{ field: 'category', headerName: 'Категория', minWidth: 100 },
		{
			field: 'link',
			headerName: 'Ссылка',
			minWidth: 100,
			renderCell: params => (
				<Link to={`/product/${params.row.id}`}>Смотреть</Link>
			),
		},
	];

	return (
		<>
			<h3 className={styles.title}>Каталог товаров</h3>
			<div className={styles.tableBox}>
				<DataGrid
					localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
					className={styles.table}
					rows={array}
					columns={columns}
					initialState={{
						pagination: {
							paginationModel: { page: 0, pageSize: 5 },
						},
					}}
					pageSizeOptions={[5, 10]}
				/>
			</div>
		</>
	);
};

export default TopPrice;
