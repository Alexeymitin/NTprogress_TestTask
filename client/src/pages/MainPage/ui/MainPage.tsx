/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from 'src/widgets/Table';
import { Ticker } from 'src/widgets/Ticker';
import cls from './MainPage.module.scss';

const columns = [
	{title: 'orderId'},
	{title: 'creationTime'},
	{title: 'changeTime'},
	{title: 'orderStatus'},
	{title: 'side'},
	{title: 'price'},
	{title: 'amount'},
	{title: 'instrument'},
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
			console.log(`Orders - ${orders}`);
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

