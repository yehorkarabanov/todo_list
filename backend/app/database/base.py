from datetime import datetime

from fastapi import HTTPException, status
from sqlalchemy import Integer, func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncAttrs, AsyncSession
from sqlalchemy.orm import DeclarativeBase, declared_attr, Mapped, mapped_column


class Base(AsyncAttrs, DeclarativeBase):
    __abstract__ = True

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return f"{cls.__name__.lower()}s"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        server_default=func.now(), server_onupdate=func.now(), onupdate=func.now()
    )

    async def save(self, db: AsyncSession):
        try:
            db.add(self)
            return await db.commit()
        except SQLAlchemyError as ex:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=repr(ex)
            ) from ex

    @classmethod
    async def find_by_id(cls, db: AsyncSession, id: int):
        query = select(cls).where(cls.id == id)
        result = await db.execute(query)
        return result.scalars().first()
