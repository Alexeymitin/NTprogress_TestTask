/* eslint-disable max-len */
import {ClientMessage} from './model/types/ClientMessages';
import {ClientMessageType, Instrument, OrderSide, ServerMessageType} from './model/types/Enums';
import Decimal from 'decimal.js';
import { ErrorInfo, ExecutionReport, MarketDataUpdate, ServerEnvelope, UpdateReport} from './model/types/ServerMessages';
import { Order } from 'src/entities/Order';

export default class WSConnector {
	connection: WebSocket | undefined;	

	constructor() {
		this.connection = undefined;
	}

	connect = (
		getOrder: (data: Order) => void,
		updateOrderStatus: (updatedData: UpdateReport) => void,
		subscribeMarketData: (subscribe: MarketDataUpdate) => void
	) => {
		this.connection = new WebSocket('ws://127.0.0.1:8000/ws/');
		this.connection.onclose = () => {
			this.connection = undefined;
			console.log('соединение закрыто');
		};

		this.connection.onerror = () => {

		};

		this.connection.onopen = () => {
			console.log	('соединение открыто');
		};

		this.connection.onmessage = (event) => {
			const message: ServerEnvelope = JSON.parse(event.data);
			let executionReport: ExecutionReport; 
			let updateReport: UpdateReport;
			let success: MarketDataUpdate;
			switch (message.messageType) {
			case ServerMessageType.success:
				success = message.message as MarketDataUpdate;
				subscribeMarketData(success);
				break;
			case ServerMessageType.error:

				console.log(`error: ${message.message} и ${message.messageType}`);
				break;
			case ServerMessageType.executionReport:
				executionReport = message.message as ExecutionReport;				
				getOrder(executionReport);
				break;
			case ServerMessageType.marketDataUpdate:
				console.log(`marketDataUpdate: ${message.message} и ${message.messageType}`);
				break;
			case ServerMessageType.updateReport:
				updateReport = message.message as UpdateReport;
				updateOrderStatus(updateReport);
				break;
			}
		};
	};


	disconnect = () => {
		this.connection?.close();
	};

	send = (message: ClientMessage) => {
		this.connection?.send(JSON.stringify(message));
	};

	subscribeMarketData = (instrument: Instrument) => {
		this.send({
			messageType: ClientMessageType.subscribeMarketData,
			message: {
				instrument,
			}
		});
	};

	unsubscribeMarketData = (subscriptionId: string) => {
		this.send({
			messageType: ClientMessageType.unsubscribeMarketData,
			message: {
				subscriptionId,
			}
		});
	};

	placeOrder = (instrument: Instrument, side: OrderSide, amount: Decimal, price: Decimal) => {
		this.send({
			messageType: ClientMessageType.placeOrder,
			message: {
				instrument,
				side,
				amount,
				price,
			}
		});
	};
}
