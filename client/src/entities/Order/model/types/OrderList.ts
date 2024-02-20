import Decimal from 'decimal.js';

export type OrderStatus = 'Active' | 'Filled' | 'Rejected' | 'Cancelled';

export type OrderSide = 'Buy' | 'Sell';

export interface Order {
	id: number;
	creationTime: string;
	changeTime: string;
	orderStatus: OrderStatus;
	side: OrderSide;
	price: Decimal;
	amount: Decimal;
	instrument: string;
}