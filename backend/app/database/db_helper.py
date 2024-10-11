from asyncio import current_task
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    create_async_engine,
    async_scoped_session,
    async_sessionmaker,
)
from app.config import settings


class DatabaseHelper:
    def __init__(self, url: str, echo: bool = False):
        self.engine = create_async_engine(url=url, echo=echo)
        self.session_factory = async_sessionmaker(
            bind=self.engine, expire_on_commit=False, autoflush=False, autocommit=False
        )

    def get_scoped_session(self):
        session = async_scoped_session(
            session_factory=self.session_factory, scopefunc=current_task
        )
        return session

    async def session_dependency(self) -> AsyncSession:
        async with self.session_dependency() as session:
            yield session
            await session.close()


db_helper = DatabaseHelper(settings.DATABASE_URL, settings.DEBUG)
