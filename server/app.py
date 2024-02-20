import mimetypes
import pathlib

import fastapi

import ntpro_server
from message_processors import place_order_processor, subscribe_market_data_processor, unsubscribe_market_data_processor
from enums import ClientMessageType

from contextlib import asynccontextmanager

from database import create_tables, delete_tables
from repository import OrderRepository

@asynccontextmanager
async def lifespan(app: fastapi.FastAPI):
    await delete_tables()
    print("База очищена")
    await create_tables()
    print("База запустилась")
    yield
    print("База отключена")

api = fastapi.FastAPI(lifespan=lifespan)
server = ntpro_server.NTProServer()
# html = pathlib.Path('test.html').read_text()

@api.get('/')
async def get():
    return fastapi.responses.JSONResponse(content={"message": "Connection established"}, status_code=200)


@api.get('/static/{path}')
async def get(path: pathlib.Path):
    static_file = (pathlib.Path('static') / path).read_text()
    mime_type, encoding = mimetypes.guess_type(path)
    return fastapi.responses.PlainTextResponse(static_file, media_type=mime_type)


@api.websocket('/ws/')
async def websocket_endpoint(websocket: fastapi.WebSocket):
    await server.connect(websocket)
    await websocket.send_json("Connection established")
    try:
        await server.serve(websocket)
        # while True:
        #     message = await websocket.receive_json()
        #     message_type = message.get("messageType")
        #     if message_type == ClientMessageType.subscribe_market_data:
        #         response = await subscribe_market_data_processor(server, websocket, message.get("message"))
        #     elif message_type == ClientMessageType.unsubscribe_market_data:
        #         response = await unsubscribe_market_data_processor(server, websocket, message.get("message"))
        #     elif message_type == ClientMessageType.place_order:
        #         response = await place_order_processor(server, websocket, message.get("message"))
        #     else:
        #         response = {"error": "Invalid message type"}
        #     await websocket.send_json(response.model_dump())
    except fastapi.WebSocketDisconnect:
        server.disconnect(websocket)
        await websocket.send_json("Connection disconnected")
