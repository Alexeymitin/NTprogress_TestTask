/* eslint-disable max-len */
import cls from './Table.module.scss';
import { Order } from 'src/entities/Order';
import { OrderSide, OrderStatus } from 'src/shared/websocket/model/types/Enums';
import { useSortData } from 'src/shared/lib/hooks/useSortData';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';

interface Column {
	title: string;
}

export interface TableProps {
	data: Order[];
	columns: Column[];
}

export const Table = (props: TableProps) => {
	const {data, columns} = props;
	const {items, requestSortAsc, requestSortDesc, requestSort} = useSortData(data);

	// const getClassNamesFor = (name: string) => {
	// 	if (!sortConfig) {
	// 		return;
	// 	}
	// 	return sortConfig.key === name ? sortConfig.direction : undefined;
	// };

	return (
		<table className={cls.table}>
			<thead className={cls.header}>
				<tr>
					{columns.map((column, index) => (
						<th key={`${index} - ${column.title}`}>
							{column.title}
							<div className={cls.buttonWrapper}>
								<Button 
									onClick={() => requestSortDesc(column.title)} 
									theme={ButtonTheme.CLEAR}
								>
									▲
								</Button>
								<Button 
									onClick={() => requestSortAsc(column.title)} 
									theme={ButtonTheme.CLEAR}
								>
									▼
								</Button>
							</div>
						</th>
					))}
				</tr>
			</thead>
			<tbody className={cls.header}>
				{items.map((item, index) => (
					<tr key={`${index}- ${item.orderId}`}>
						<td>
							{index + 1}
						</td>
						<td>
							{item.creationTime}
						</td>
						<td>
							{item.changeTime}						</td>
						<td>
							{OrderStatus[item.orderStatus as unknown as keyof typeof OrderStatus]}
						</td>
						<td>
							{OrderSide[item.side as keyof typeof OrderSide]}
						</td>
						<td>
							{item.price}
						</td>
						<td>
							{item.amount}
						</td>
						<td>
							{item.instrument}
						</td>
					</tr>					
				))}
			</tbody>		
		</table>
	);
};