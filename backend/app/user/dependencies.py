from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Request
from abc import abstractmethod
from app.database.redis import check_token_in_blacklist
from app.user.auth import decode_token
from fastapi.exceptions import HTTPException
from fastapi import status


class TokenBearer(HTTPBearer):
    def __init__(self, auto_error=True, **kwargs):
        super().__init__(auto_error=auto_error, **kwargs)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials:
        credentials = await super().__call__(request)
        token = credentials.credentials
        token_data = decode_token(token)

        if not self.token_valid(token):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
            )
        if await check_token_in_blacklist(token_data["jti"]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
            )
        self.verify_token_data(token_data)
        return token_data

    def token_valid(self, token: str) -> bool:
        token_data = decode_token(token)
        return token_data is not None

    @abstractmethod
    def verify_token_data(self, token_data: dict) -> None:
        pass


class AccessTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and not token_data["type"] == "access":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Access token required"
            )


class RefreshTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and not token_data["type"] == "refresh":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Refresh token required"
            )
