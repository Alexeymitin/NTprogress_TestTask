import {Instrument, OrderStatus, ServerMessageType} from './Enums';
import {Envelope, Message, Quote} from './Base';

export interface ServerEnvelope extends Envelope {
    messageType: ServerMessageType
    message: ExecutionReport 
}

export interface ServerMessage extends Message {

}

export interface ErrorInfo extends ServerMessage {
    reason: string
}

export interface SuccessInfo extends ServerMessage {

}

export interface UpdateReport extends ServerMessage {
    orderId: string
    changeTime?: string
    orderStatus: OrderStatus  
}

export interface ExecutionReport extends ServerMessage {
    orderId: string
    creationTime: string
    changeTime?: string
    orderStatus: OrderStatus
    side: string
    price: number
    amount: number
    instrument: Instrument 
}

export interface MarketDataUpdate extends ServerMessage {
    subscriptionId: string
    instrument: Instrument
    quotes: [Quote]
}
