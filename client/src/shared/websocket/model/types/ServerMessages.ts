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

export interface ExecutionReport extends ServerMessage {
    orderId: string
    orderStatus: OrderStatus
    creationTime?: string
    changeTime?: string
}

export interface MarketDataUpdate extends ServerMessage {
    subscriptionId: string
    instrument: Instrument
    quotes: [Quote]
}
