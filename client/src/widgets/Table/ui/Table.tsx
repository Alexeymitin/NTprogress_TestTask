/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { Order } from 'src/entities/Order';
import { Button, ButtonTheme } from 'src/shared/ui/Button/Button';
import 'react-tabulator/lib/styles.css'; // required styles
import 'react-tabulator/lib/css/tabulator.min.css'; // theme
import { ColumnDefinition, ReactTabulator } from 'react-tabulator';
import { Options } from 'tabulator-tables';
import { useRef } from 'react';
import { Tabulator } from 'react-tabulator/lib/types/TabulatorTypes';
import { CellComponent } from 'tabulator-tables';

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
];

export interface TableProps {
	data: Order[];
}

export const Table = (props: TableProps) => {
	const {data} = props;
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
				columns={columns as unknown as ColumnDefinition[]} 
				data={data} 
				options={options} 
				
				dataChanged={(newData: any) => console.log('dataChanged', newData)}
			/>
			<Button theme={ButtonTheme.DOWNLOAD} onClick={downloadFile}>Скачать таблицу</Button>
		</>
	);
};