import logging
from itsdangerous import URLSafeTimedSerializer
from app.settings import settings
import uuid
import jwt
from datetime import datetime, timedelta, timezone

serializer = URLSafeTimedSerializer(secret_key=settings.SECRET_KEY, salt="mail")


def _create_token(user_data: dict, token_type: str, expiry: int):
    payload = {
        "user": user_data,
        "exp": datetime.now(timezone.utc) + timedelta(seconds=expiry),
        "jti": str(uuid.uuid4()),
        "type": token_type,
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return token


def create_access_token(user_data: dict):
    return _create_token(
        user_data, token_type="access", expiry=settings.ACCESS_TOKEN_EXPIRE_SECONDS
    )


def create_refresh_token(user_data: dict):
    return _create_token(
        user_data, token_type="refresh", expiry=settings.REFRESH_TOKEN_EXPIRE_SECONDS
    )


def decode_token(token: str) -> dict:
    try:
        token_data = jwt.decode(
            jwt=token, key=settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        return token_data
    except jwt.PyJWTError as e:
        logging.exception(e)
        return None


def create_url_safe_token(data: dict):
    token = serializer.dumps(data)
    return token


def decode_url_safe_token(token: str):
    try:
        token_data = serializer.loads(token)
        return token_data
    except Exception as e:
        logging.error(str(e))
