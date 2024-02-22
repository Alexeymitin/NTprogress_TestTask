/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from 'src/widgets/Table';
import { Ticker } from 'src/widgets/Ticker';
import cls from './MainPage.module.scss';
import { CellComponent, FormatterParams } from 'tabulator-tables';
const columns = [
	{title: 'Id', field: 'orderId', formatter: 'rownum'},
	{title: 'Creation time', field: 'creationTime'},
	{title: 'Change time', field: 'changeTime'},
	{title: 'Status', field: 'orderStatus', formatter: function(cell: CellComponent, formatterParams: FormatterParams) {
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
	{title: 'Instrument', field: 'instrument'},
];

import { useEffect, useMemo, useState } from 'react';
import { Order } from 'src/entities/Order';
import { UpdateReport } from 'src/shared/websocket/model/types/ServerMessages';
import WSConnector from 'src/shared/websocket/WSClient';
import Decimal from 'decimal.js';
import { Instrument, OrderSide } from 'src/shared/websocket/model/types/Enums';

const MainPage = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const ws = useMemo(() => new WSConnector(), []);

	useEffect(() => {
		ws.connect((data) => {
			setOrders(prev => [...prev, data]);
		},
		updateOrderStatus
		);
		
	}, []);

	const updateOrderStatus = (data: UpdateReport) => {
		setOrders(prev => {
			return prev.map(order => {
				if(order.orderId === data.orderId) {
					return {...order, ...data};
				}
				return order;
			});
		});
	};

	const placeOrder = (instrument: Instrument, side: OrderSide, amount: Decimal, price: Decimal) => {
		if(ws.connection) {
			ws.placeOrder(instrument, side, amount, price);
		} else {
			throw Error('Соединение не установлено');
		}
		
	};
	
	return (
		<main className={cls.main}>
			<Ticker onSubmit={placeOrder}/>
			<Table data={orders} columns={columns}/>
		</main>
	);
};

export default MainPage;

