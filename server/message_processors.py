from __future__ import annotations
import asyncio
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

    order = await OrderRepository.add_one(dict(message))
    # all_orders = await OrderRepository.get_all()
    # print(all_orders)
    asyncio.create_task(update_order_status(order.id, server, websocket))
   
    return server_messages.ExecutionReport(
        orderId=str(order.id),
        creationTime=str(order.creation_time),
        changeTime=str(order.change_time),
        orderStatus=order.status, 
        side=order.side,
        price=str(order.price),
        amount=str(order.amount),
        instrument=order.instrument       
    )
    


async def update_order_status(
        order_id, 
        server: NTProServer,
        websocket: fastapi.WebSocket,
):
    from models import server_messages

    # Случайным образом выбираем новый статус для заявки (симуляция исполнения заявок)
    await asyncio.sleep(3)   
    new_status = random.choice([OrderStatus.filled, OrderStatus.rejected])

    updated_order = await OrderRepository.update_status(order_id, new_status)
    
    await server.send(server_messages.UpdateReport(
        orderId=str(updated_order.id),
        changeTime=str(updated_order.change_time),
        orderStatus=new_status       
    ), websocket)
   