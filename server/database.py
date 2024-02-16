import datetime
import uuid
from decimal import Decimal
from sqlalchemy import Uuid
from sqlalchemy import func
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from enums import Instrument, OrderSide, OrderStatus

engine = create_async_engine(
	"sqlite+aiosqlite:///database.db"
)

new_session = async_sessionmaker(engine, expire_on_commit=False)

class Model(DeclarativeBase):
	pass

class OrderTable(Model):
	__tablename__ = "orders"

	id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
	creation_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now())
	change_time: Mapped[datetime.datetime] = mapped_column(server_default=func.now(), onupdate=datetime.datetime.now)
	status: Mapped[OrderStatus]
	side: Mapped[OrderSide]
	price: Mapped[Decimal]
	amount: Mapped[Decimal]
	instrument: Mapped[Instrument]

async def create_tables():
	async with engine.begin() as conn:
		await conn.run_sync(Model.metadata.create_all)

async def delete_tables():
	async with engine.begin() as conn:
		await conn.run_sync(Model.metadata.drop_all)