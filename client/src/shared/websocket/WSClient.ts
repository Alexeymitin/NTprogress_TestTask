/* eslint-disable max-len */
import {ClientMessage} from './model/types/ClientMessages';
import {ClientMessageType, Instrument, OrderSide, ServerMessageType} from './model/types/Enums';
import Decimal from 'decimal.js';
import {ServerEnvelope} from './model/types/ServerMessages';

export default class WSConnector {
	connection: WebSocket | undefined;
	order: ServerEnvelope | undefined;
	
	orderR: ServerEnvelope | undefined = undefined;

	constructor() {
		this.connection = undefined;
	}

	connect = () => {
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
			console.log(message);
			switch (message.messageType) {
			case ServerMessageType.success:
				console.log(`success: ${message.message} и ${message.messageType}`);
				break;
			case ServerMessageType.error:
				console.log(`error: ${message.message} и ${message.messageType}`);
				break;
			case ServerMessageType.executionReport:
				console.log(`executionReport: ${message.message.orderStatus} и ${message.messageType} и ${message.message.creationTime} ${message.message.changeTime}`);
				this.orderR = message;
				break;
			case ServerMessageType.marketDataUpdate:
				console.log(`marketDataUpdate: ${message.message} и ${message.messageType}`);
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
