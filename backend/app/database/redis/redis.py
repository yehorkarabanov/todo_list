import redis.asyncio as redis
from app.settings import settings

token_blacklist = redis.from_url(settings.REDIS_URL)


async def add_token_jti_to_blacklist(jti) -> None:
    if isinstance(jti, str):
        await token_blacklist.set(
            name=jti, value="", ex=settings.ACCESS_TOKEN_EXPIRE_SECONDS
        )
    elif isinstance(jti, tuple):
        await token_blacklist.set(
            name=jti[0], value="", ex=settings.ACCESS_TOKEN_EXPIRE_SECONDS
        )
        await token_blacklist.set(
            name=jti[1], value="", ex=settings.REFRESH_TOKEN_EXPIRE_SECONDS
        )

async def check_token_in_blacklist(jti: str) -> bool:
    jti = await token_blacklist.get(jti)
    return jti is not None
