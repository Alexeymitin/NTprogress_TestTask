/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-explicit-any */
import WSConnector from './WSClient';
import { WebSocket } from 'mock-socket';
import { render, screen } from '@testing-library/react';
import App from 'src/app/App';
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended';
import { Order } from 'src/entities/Order';
import { MarketDataUpdate, UpdateReport } from './model/types/ServerMessages';
import { PlaceOrder, SubscribeMarketData } from './model/types/ClientMessages';
import { Instrument, OrderSide } from './model/types/Enums';
import Decimal from 'decimal.js';

jest.mock('react-tabulator', () => {
	const React = require('react');
	const MockReactTabulator = () => <div data-testid="mock-react-tabulator"></div>;
	const MockColumnDefinition = {};
	
	return {
		ReactTabulator: MockReactTabulator,
		ColumnDefinition: MockColumnDefinition
	};
});

jest.mock('./WSClient');

describe('WSConnector', () => {
	let mockWS: MockProxy<WebSocket> & WebSocket;
	let mockWSConnector: MockProxy<WSConnector> & WSConnector;
	beforeEach(() => {
		mockWS = mockDeep<WebSocket>();
		mockWSConnector = mockDeep<WSConnector>();
		(WSConnector as jest.MockedClass<typeof WSConnector>).mockReturnValue(
			mockWSConnector
		);
	
		jest.spyOn(window, 'WebSocket').mockImplementation(() => mockWS);
	});
	afterEach(() => {
		jest.restoreAllMocks();
		mockReset(mockWSConnector);
		mockReset(mockWS);
	});

	test('проверяем рендер App и установление соединения', () => {
		render(<App/>);
		expect(screen.getByTestId('test-app')).toBeInTheDocument();
		expect(mockWSConnector.connect).toHaveBeenCalled();
	});

	test('проверяем что Websocket вызывается с 3 функциями', () => {
		mockWSConnector.connect.mockImplementation((
			getOrder: (data: Order) => void,
			updateOrderStatus: (updatedData: UpdateReport) => void,
			subscribeMarketData: (subscribe: MarketDataUpdate) => void) => {
			expect(mockWSConnector.connect).toHaveBeenCalledWith(
				expect.any(getOrder),
				expect.any(updateOrderStatus),
				expect.any(subscribeMarketData),
			);	
		});
	});

	test('проверяем метод placeOrder', () => {
		const mockOrder: PlaceOrder = {
			instrument: Instrument.eur_usd,
			side: OrderSide.buy,
			amount: new Decimal(1000),
			price: new Decimal(1.12345),
		};

		const wsConnector = {
			placeOrder: jest.fn(),
		};

		const placeOrder = (order:PlaceOrder) => {
			if(wsConnector) {
				wsConnector.placeOrder(order.instrument, order.side, order.amount, order.price);
			}
		};

		placeOrder(mockOrder);

		expect(wsConnector.placeOrder).toHaveBeenCalledWith(
			mockOrder.instrument,
			mockOrder.side,
			mockOrder.amount,
			mockOrder.price
		);
	});

	test('проверяем метод subscribeMarketData', () => {
		const mockSubscribe: SubscribeMarketData = {
			instrument: Instrument.eur_usd,
		};

		const wsConnector = {
			subscribeMarketData: jest.fn(),
		};

		const subscribeMarketData = (data: SubscribeMarketData) => {
			if(wsConnector) {
				wsConnector.subscribeMarketData(data);
			}
		};

		subscribeMarketData(mockSubscribe);

		expect(wsConnector.subscribeMarketData).toHaveBeenCalledWith(
			mockSubscribe,
		);
	});

	test('send method should send message', () => {
		const message = { messageType: 'test', message: 'test message' };
		mockWSConnector.connect(jest.fn(), jest.fn(), jest.fn());
		mockWSConnector.send(message);
		expect(mockWSConnector.send).toHaveBeenCalledWith(
			message
		);
	});
});

