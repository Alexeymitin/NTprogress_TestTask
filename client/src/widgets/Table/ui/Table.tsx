/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Order } from 'src/entities/Order';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ColumnDefinition, ReactTabulator } from 'react-tabulator';
import { Options } from 'tabulator-tables';
import { memo, useRef } from 'react';
import { Tabulator } from 'react-tabulator/lib/types/TabulatorTypes';
import { CellComponent } from 'tabulator-tables';

export interface TableProps {
	data: Order[];
	cancelOrder: (orderId: string) => void
}

export const Table = memo((props: TableProps) => {
	const {data, cancelOrder} = props;
	let tableRef = useRef<Tabulator>(null);

	const options: Options  = {
		pagination: true, 
		paginationSize:5, 
		paginationSizeSelector:[10, 20, 30],
		layout:'fitDataFill',
	};

	// : ColumnDefinition

	const columns = [
		{title: 'Id', field: 'orderId', formatter: 'rownum'},
		{title: 'Creation time', field: 'creationTime'},
		{title: 'Change time', field: 'changeTime'},
		{title: 'Status', field: 'orderStatus', formatter: function(cell: CellComponent) {
			switch (cell.getValue()) {
			case 1:
				cell.getElement().style.backgroundColor = 'rgb(112, 112, 245)';
				return 'active';
			case 2:
				cell.getElement().style.backgroundColor = 'rgba(122, 243, 122, 0.884)';
				return 'filled';
			case 3:
				cell.getElement().style.backgroundColor = 'rgba(245, 96, 96, 0.904)';
				return 'rejected';
			case 4:
				cell.getElement().style.backgroundColor = 'red';
				return 'cancelled';
			}
		}},
		{title: 'Side', field: 'side', formatter: function(cell: CellComponent) {
			switch (cell.getValue()) {
			case '1':
				return 'buy';
			case '2':
				return 'sell';
			}
		}},
		{title: 'Price', field: 'price'},
		{title: 'Amount', field: 'amount'},
		{title: 'Instrument', field: 'instrument', formatter: function(cell: CellComponent) {
			switch (cell.getValue()) {
			case 1:
				return 'EUR/USD';
			case 2:
				return 'EUR/RUB';
			case 3:
				return 'USD/RUB';
			}
		}},
		{title: 'Cancel', field: 'false', hozAlign: 'center', formatter: 'tickCross',
			cellClick: function (e: UIEvent, cell: CellComponent) {
				const orderId = cell.getRow().getCells()[0].getValue();
				const currentStatus = cell.getRow().getCells()[4].getValue();
				if (currentStatus !== 4) {
					cancelOrder(orderId);
					cell.setValue(true);
				}
			},
		},
	];

	const downloadFile = () => {
		if (tableRef.current) {
			tableRef.current.download('csv', 'table.csv');
		}
	};

	return (
		<>
			<ReactTabulator 
				onRef={(ref) => (tableRef = ref)}
				columns={columns as unknown as ColumnDefinition[]} 
				data={data} 
				options={options} 				
			/>
			<Button theme={ButtonTheme.DOWNLOAD} onClick={downloadFile}>Скачать таблицу</Button>
		</>
	);
});