export type RequestStatus = 'Active' | 'Filled' | 'Rejected' | 'Cancelled';

export type RequestSide = 'Buy' | 'Sell';

export interface Request {
	id: number;
	creation_time: string;
	change_time: string;
	status: RequestStatus;
	side: RequestSide;
	price: number;
	amount: number;
	instrument: string;
}