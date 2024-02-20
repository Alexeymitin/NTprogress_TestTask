from database import OrderTable, new_session
from typing import TYPE_CHECKING
from sqlalchemy import select, update

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
			return order


	@classmethod
	async def get_all(cls):
		async with new_session() as session:
			query = select(OrderTable)
			result = await session.execute(query)
			order_models = result.scalars().all()
			return order_models
	
	@classmethod
	async def update_status(cls, order_id, new_status):
		async with new_session() as session:
			stmt = update(OrderTable).where(OrderTable.id == order_id).values(status=new_status)
			await session.execute(stmt)
			await session.commit()
			
			query = select(OrderTable).where(OrderTable.id == order_id)
			result = await session.execute(query)
			updated_order = result.scalar()

			return updated_order