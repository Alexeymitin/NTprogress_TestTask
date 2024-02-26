/* eslint-disable max-len */
import {ClientMessage} from './model/types/ClientMessages';
import {ClientMessageType, Instrument, OrderSide, ServerMessageType} from './model/types/Enums';
import Decimal from 'decimal.js';
import { ErrorInfo, ExecutionReport, MarketDataUpdate, ServerEnvelope, SuccessInfo, UpdateReport} from './model/types/ServerMessages';
import { Order } from 'src/entities/Order';

export default class WSConnector {
	connection: WebSocket | undefined;	
	url: string | URL;

	constructor(url: string) {
		console.log('WSConnector instance created');
		this.connection = undefined;
		this.url = url;
	}

	connect = (
		getOrder: (data: Order) => void,
		updateOrderStatus: (updatedData: UpdateReport) => void,
		subscribeMarketData: (subscribe: MarketDataUpdate) => void
	) => {
		this.connection = new WebSocket(this.url);
		this.connection.onclose = (event) => {
			this.connection = undefined;
			console.log('WebSocket closed:', event);
		};

		this.connection.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		this.connection.onopen = () => {
			console.log	('соединение открыто');
		};

		this.connection.onmessage = (event) => {
			const message: ServerEnvelope = JSON.parse(event.data);
			let executionReport: ExecutionReport; 
			let updateReport: UpdateReport;
			let success: SuccessInfo;
			let error: ErrorInfo;
			switch (message.messageType) {
			case ServerMessageType.success:			
				success = message.message as SuccessInfo;
				console.log(`success: ${success.subscriptionId}}`);
				subscribeMarketData(success);
				break;
			case ServerMessageType.error:
				error = message.message as ErrorInfo;
				console.log(`success: ${error.reason}}`);
				throw Error(error.reason);
			case ServerMessageType.executionReport:
				executionReport = message.message as ExecutionReport;				
				getOrder(executionReport);
				break;
			case ServerMessageType.marketDataUpdate:
				console.log(`marketDataUpdate: ${message.message} и ${message.messageType}`);
				
				break;
			case ServerMessageType.updateReport:
				updateReport = message.message as UpdateReport;
				console.log(`updateReport ${updateReport}`);
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

	cancelOrder = (orderId: string) => {
		this.send({
			messageType: ClientMessageType.cancelOrder,
			message: {
				orderId
			}
		});
	};
}
