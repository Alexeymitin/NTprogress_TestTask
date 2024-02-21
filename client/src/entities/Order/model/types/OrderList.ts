import Decimal from 'decimal.js';
import { ExecutionReport } from 'src/shared/websocket/model/types/ServerMessages';

export type OrderStatus = 'Active' | 'Filled' | 'Rejected' | 'Cancelled';

export type OrderSide = 'Buy' | 'Sell';

export interface Order extends ExecutionReport {
	// price: Decimal;
	// amount: Decimal;
}