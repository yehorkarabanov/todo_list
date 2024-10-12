from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import select, ForeignKey
from app.user.hash import verify_password
from app.database.base import Base


class User(Base):
    email: Mapped[str] = mapped_column(unique=True, index=True)
    password: Mapped[str]
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


class Task(Base):
    content: Mapped[str]
    is_finished: Mapped[bool]
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    user: Mapped["User"] = relationship("User", back_populates="tasks")

    @classmethod
    async def find_by_user(cls, db: AsyncSession, user: User):
        query = select(cls).where(cls.user_id == user.id)
        result = await db.execute(query)
        return result.scalars().all()
