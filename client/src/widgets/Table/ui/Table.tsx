/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Order } from 'src/entities/Order';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ReactTabulator } from 'react-tabulator';
import { Options } from 'tabulator-tables';
import { useRef } from 'react';
import { Tabulator } from 'react-tabulator/lib/types/TabulatorTypes';

interface Column {
	title: string;
}

export interface TableProps {
	data: Order[];
	columns: Column[];
}

export const Table = (props: TableProps) => {
	const {data, columns} = props;
	let tableRef = useRef<Tabulator>(null);

	const options: Options  = {
		// downloadDataFormatter: (data) => data,
		// downloadReady: (fileContents, blob) => blob,
		pagination: true, 
		paginationSize:5, 
		paginationSizeSelector:[10, 20, 30],
		layout:'fitDataFill',
	};

	const downloadFile = () => {
		if (tableRef.current) {
			tableRef.current.download('csv', 'table.csv');
		}
	};

	return (
		<>
			<ReactTabulator 
				onRef={(ref) => (tableRef = ref)}
				columns={columns} 
				data={data} 
				options={options} 
				
				dataChanged={(newData: any) => console.log('dataChanged', newData)}
			/>
			<Button theme={ButtonTheme.DOWNLOAD} onClick={downloadFile}>Скачать таблицу</Button>
		</>
		// <table className={cls.table}>
		// 	<thead className={cls.header}>
		// 		<tr>
		// 			{columns.map((column, index) => (
		// 				<th key={`${index} - ${column.title}`}>
		// 					{column.title}
		// 					<div className={cls.buttonWrapper}>
		// 						<Button 
		// 							onClick={() => requestSortDesc(column.title)} 
		// 							theme={ButtonTheme.CLEAR}
		// 						>
		// 							▲
		// 						</Button>
		// 						<Button 
		// 							onClick={() => requestSortAsc(column.title)} 
		// 							theme={ButtonTheme.CLEAR}
		// 						>
		// 							▼
		// 						</Button>
		// 					</div>
		// 				</th>
		// 			))}
		// 		</tr>
		// 	</thead>
		// 	<tbody className={cls.header}>
		// 		{items.map((item, index) => (
		// 			<tr key={`${index}- ${item.orderId}`}>
		// 				<td>
		// 					{index + 1}
		// 				</td>
		// 				<td>
		// 					{item.creationTime}
		// 				</td>
		// 				<td>
		// 					{item.changeTime}						</td>
		// 				<td>
		// 					{OrderStatus[item.orderStatus as unknown as keyof typeof OrderStatus]}
		// 				</td>
		// 				<td>
		// 					{OrderSide[item.side as keyof typeof OrderSide]}
		// 				</td>
		// 				<td>
		// 					{item.price}
		// 				</td>
		// 				<td>
		// 					{item.amount}
		// 				</td>
		// 				<td>
		// 					{item.instrument}
		// 				</td>
		// 			</tr>					
		// 		))}
		// 	</tbody>		
		// </table>
	);
};