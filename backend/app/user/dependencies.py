from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import Request
from abc import abstractmethod

from app.user.auth import decode_token


class TokenBearer(HTTPBearer):
    def __init__(self, auto_error=True, **kwargs):
        super().__init__(auto_error=auto_error, **kwargs)

    async def __call__(self, request: Request) -> HTTPAuthorizationCredentials:
        credentials = await super().__call__(request)
        token = credentials.credentials
        token_data = decode_token(token)

        if not self.token_valid(token):
            raise Exception("Invalid token")
        # if await token_in_blacklist(token_data["jti"]): # TODO redis token blacklist
        #     raise Exception("Invalid token")
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
            raise Exception("Access token is required")


class RefreshTokenBearer(TokenBearer):
    def verify_token_data(self, token_data: dict) -> None:
        if token_data and not token_data["type"] == "refresh":
            raise Exception("Refresh token is required")
