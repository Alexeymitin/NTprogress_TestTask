from __future__ import annotations
import json
import random

from typing import TYPE_CHECKING
import uuid

from enums import OrderStatus
from repository import OrderRepository


if TYPE_CHECKING:
    import fastapi

    from models import client_messages
    from ntpro_server import NTProServer


async def subscribe_market_data_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.SubscribeMarketData,
):
    from models import server_messages

    return server_messages.SuccessInfo(message="Successfully subscribed to market data")


async def unsubscribe_market_data_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.UnsubscribeMarketData,
):
    from models import server_messages

    # TODO ...

    return server_messages.SuccessInfo(message="Successfully unsubscribed from market data")


async def place_order_processor(
        server: NTProServer,
        websocket: fastapi.WebSocket,
        message: client_messages.PlaceOrder,
):
    from models import server_messages

    random_status = random.choice(list(OrderStatus))
    random_status_value = random_status.value
    random_status_name = random_status.name
    message["status"] = random_status_name 
    order_id = await OrderRepository.add_one(message)
    str_order_id = str(order_id)
    orders = await OrderRepository.get_all()
    for order in orders:
            print(f"Order ID: {order.id}, Status: {order.status}, Side: {order.side}, Price: {order.price}, Amount: {order.amount}, Instrument: {order.instrument}")
    # await websocket.send_json({"status": random_status_name, "order_id": str_order_id})
    return server_messages.ExecutionReport(order_id=str_order_id, order_status=random_status_value)
