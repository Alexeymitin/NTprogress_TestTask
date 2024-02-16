from database import OrderTable, new_session
from typing import TYPE_CHECKING
from sqlalchemy import select

if TYPE_CHECKING:
	from models import client_messages

class OrderRepository:
	@classmethod
	async def add_one(cls, data: 'client_messages.PlaceOrder'):
		async with new_session() as session:
			order = OrderTable(**data)
			session.add(order)
			await session.flush()
			await session.commit()
			return order.id




	@classmethod
	async def get_all(cls):
		async with new_session() as session:
			query = select(OrderTable)
			result = await session.execute(query)
			order_models = result.scalars().all()
			return order_models