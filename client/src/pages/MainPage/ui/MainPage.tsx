/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from 'src/widgets/Table';
import { Ticker } from 'src/widgets/Ticker';
import cls from './MainPage.module.scss';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Order } from 'src/entities/Order';
import { MarketDataUpdate, SuccessInfo, UpdateReport } from 'src/shared/websocket/model/types/ServerMessages';
import WSConnector from 'src/shared/websocket/WSClient';
import Decimal from 'decimal.js';
import { usePrevious } from 'src/shared/lib/hooks/usePrevious';
import { Instrument, OrderSide } from 'src/shared/websocket/model/types/Enums';


const MainPage = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [subscribeId, setSubscribeId] = useState('');
	const previousSubscribeId = usePrevious<string>(subscribeId);
	const ws = useMemo(() => new WSConnector('ws://127.0.0.1:8000/ws/'), []);

	useEffect(() => {
		ws.connect((data) => {
			setOrders(prev => [...prev, data]);
		},
		updateOrderStatus,
		getSubscribeId
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

	const getSubscribeId = (data: SuccessInfo) => {
		setSubscribeId(data.subscriptionId);		
	};

	useEffect(() => {
		if (previousSubscribeId) {
			console.log(`В useeffect ${previousSubscribeId}`);
			unSubscribeMarketData(previousSubscribeId);
		}
	},[previousSubscribeId]);

	const placeOrder = useCallback((instrument: Instrument, orderStatus: OrderSide, amount: Decimal, price: Decimal) => {
		if(ws.connection?.OPEN) {
			ws.placeOrder(instrument, orderStatus, amount, price);
		} else {
			throw Error('Соединение не установлено');
		}
		
	},[]);

	const cancelOrder = useCallback((orderId: string) => {
		if(ws.connection?.OPEN) {
			ws.cancelOrder(orderId);
		} else {
			throw Error('Соединение не установлено');
		}
		
	},[]);

	const subscribeMarketData = useCallback((instrument: Instrument) => {
		ws.subscribeMarketData(instrument);
	},[]);

	const unSubscribeMarketData = (subscribeId: string) => {
		ws.unsubscribeMarketData(subscribeId);
	};

	return (
		<main className={cls.main}>
			<Ticker onSubmit={placeOrder} onSubscribe={subscribeMarketData}/>
			<Table data={orders} cancelOrder={cancelOrder}/>
		</main>
	);
};

export default MainPage;

