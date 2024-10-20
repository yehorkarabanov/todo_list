from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import select, ForeignKey, update, delete
from app.database.base import Base


class Task(Base):
    content: Mapped[str]
    is_completed: Mapped[bool]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped["User"] = relationship("User", back_populates="tasks")

    @classmethod
    async def find_by_user(cls, db: AsyncSession, user: "User"):
        query = select(cls).where(cls.user_id == user.id)
        result = await db.execute(query)
        return result.scalars().all()

    @classmethod
    async def find_by_user_email(cls, db: AsyncSession, user: "User", email: str):
        query = select(cls).join(user, user.email == email)
        result = await db.execute(query)
        return result.scalars().all()

    @classmethod
    async def update_by_id(
        cls, db: AsyncSession, user: "User", id: int, user_email: str, data: dict
    ):
        query = update(cls).where(
            (cls.id == id) & (cls.user_id == user.get_query_id_from_email(user_email))
        )
        for key, value in data.items():
            if value is not None:
                query = query.values(**{key: value})
        await db.execute(query)
        await db.commit()

    @classmethod
    async def delete_by_id(
        cls, db: AsyncSession, user: "User", id: int, user_email: str
    ):
        query = delete(cls).where(
            (cls.id == id) & (cls.user_id == user.get_query_id_from_email(user_email))
        )
        await db.execute(query)
        await db.commit()
