from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import select
from app.user.hash import verify_password
from app.database.base import Base


class User(Base):
    email: Mapped[str] = mapped_column(unique=True, index=True)
    password: Mapped[str]
    is_verified: Mapped[bool] = mapped_column(default=False)
    tasks: Mapped[list["Task"]] = relationship(back_populates="user")

    @classmethod
    async def find_by_email(cls, db: AsyncSession, email: str):
        query = select(cls).where(cls.email == email)
        result = await db.execute(query)
        return result.scalars().first()

    @classmethod
    async def authenticate(cls, db: AsyncSession, email: str, password: str):
        user = await cls.find_by_email(db, email)
        if not user or not verify_password(password, user.password):
            return False
        return user
