import { Table } from 'src/widgets/Table';
import { Ticker } from 'src/widgets/Ticker';
import cls from './MainPage.module.scss';

const columns = [
	{title: 'id'},
	{title: 'creation_time'},
	{title: 'change_time'},
	{title: 'status'},
	{title: 'side'},
	{title: 'price'},
	{title: 'amount'},
	{title: 'instrument'},
];

import { useState } from 'react';
import { Order } from 'src/entities/Order';
import { ServerEnvelope } from 'src/shared/websocket/model/types/ServerMessages';

const MainPage = () => {
	const [orders, setOrders] = useState<Order[]>([]);

	const addOrderInTable = (message: Order) => {
		setOrders([...orders, message]);
	};
	
	return (
		<main className={cls.main}>
			<Ticker saveData={(addOrderInTable as unknown as (message: ServerEnvelope) => void)}/>
			<Table data={orders} columns={columns}/>
		</main>
	);
};

export default MainPage;