import LineGraphicBox from 'components/Content/Elements/Charts/GraphicBox/LineGraphicBox';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { SelectGetGraphics } from 'redux/getGraphics/selectors';
import { Status } from 'redux/getProducts/types';
import { useAppDispatch } from 'redux/store';
import AreaGraphicBox from '../../../Elements/Charts/GraphicBox/AreaGraphicBox';

import { getGraphics } from 'redux/getGraphics/thunks';
import styles from '../Profile.module.scss';

const Dashboard: React.FC = () => {
	const dispatch = useAppDispatch();
	const { status, favorites } = useSelector(SelectGetGraphics);

	const fetchDataRef = useRef(false);

	const filteredArray = useMemo(() => {
		return favorites?.filter(
			(value: any, index: number, self: any) =>
				index === self.findIndex((t: any) => t.name === value.name)
		);
	}, [favorites]);

	useEffect(() => {
		if (fetchDataRef.current) return;
		fetchDataRef.current = true;
		dispatch(getGraphics());
	}, []);

	return (
		<>
			<div className={styles.title}>Статистика</div>
			{status === Status.LOADING ? (
				'Идёт загрузка!'
			) : (
				<>
					<div className={styles.graphicBoxWrapper}>
						{filteredArray.map((item: any, index: number) => {
							return <AreaGraphicBox key={index} item={item} />;
						})}
						<LineGraphicBox array={filteredArray} />
					</div>
				</>
			)}
		</>
	);
};

export default Dashboard;
