from __future__ import annotations
import decimal

import uuid
from typing import Optional, TypeVar

import bidict as bidict

import enums
from models.base import Envelope, Message, Quote


class ServerMessage(Message):
    def get_type(self: ServerMessageT) -> enums.ServerMessageType:
        return _SERVER_MESSAGE_TYPE_BY_CLASS[self.__class__]


class ErrorInfo(ServerMessage):
    reason: str


class SuccessInfo(ServerMessage):
    subscription_id: str


class ExecutionReport(ServerMessage):
    order_id: str
    creation_time: str
    change_time: str
    order_status: enums.OrderStatus
    side: str
    price: float
    amount: float
    instrument: enums.Instrument

class UpdateReport(ServerMessage):
    order_id: str
    change_time: str
    order_status: enums.OrderStatus
    

class MarketDataUpdate(ServerMessage):
    subscription_id: str
    # instrument: enums.Instrument
    # quotes: list[Quote]


class ServerEnvelope(Envelope):
    message_type: enums.ServerMessageType

    def get_parsed_message(self):
        return _SERVER_MESSAGE_TYPE_BY_CLASS.inverse[self.message_type].parse_obj(self.message)


_SERVER_MESSAGE_TYPE_BY_CLASS = bidict.bidict({
    SuccessInfo: enums.ServerMessageType.success,
    ErrorInfo: enums.ServerMessageType.error,
    ExecutionReport: enums.ServerMessageType.execution_report,
    MarketDataUpdate: enums.ServerMessageType.market_data_update,
    UpdateReport: enums.ServerMessageType.update_report
})
ServerMessageT = TypeVar('ServerMessageT', bound=ServerMessage)
