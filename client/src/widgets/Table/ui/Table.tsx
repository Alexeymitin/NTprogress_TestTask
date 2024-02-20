import 'react-tabulator/lib/styles.css';
import cls from './Table.module.scss';
import { Order } from 'src/entities/Order';

interface Column {
	title: string;
}

export interface TableProps {
	data: Order[];
	columns: Column[];
}

export const Table = (props: TableProps) => {

	const {data, columns} = props;

	return (
		<table className={cls.tableWrapper}>
			<thead>
				<tr>
					{columns.map((column, index) => (
						<th key={index}>
							{column.title}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{data.map((value, index) => (
					<tr key={`${index}- ${value.id}`}>
						<td>
							{value.id}
						</td>
						<td>
							{value.creationTime}
						</td>
						<td>
							{value.changeTime}						</td>
						<td>
							{value.orderStatus}
						</td>
						<td>
							{value.side}
						</td>
						<td>
							{value.price.toString()}
						</td>
						<td>
							{value.amount.toString()}
						</td>
						<td>
							{value.instrument}
						</td>
					</tr>					
				))}
			</tbody>		
		</table>
	);
};