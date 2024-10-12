from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse

from app.user.dependencies import RefreshTokenBearer
from app.user.schemas import UserSchema
from app.user.auth import create_access_token, create_refresh_token
from app.database import db_helper
from app.user import models

router = APIRouter(prefix="/user")


@router.post("/login")
async def login(
    login_data: UserSchema,
    session: AsyncSession = Depends(db_helper.get_scoped_session),
):
    user = await models.User.authenticate(
        session, login_data.email, login_data.password
    )

    if not user:
        raise HTTPException(
            status_code=status.BAD_REQUEST, detail="Incorrect email or password"
        )

    access_token = create_access_token(
        user_data={
            "email": user.email,
            "user_id": str(user.id),
        }
    )
    refresh_token = create_refresh_token(
        user_data={
            "email": user.email,
            "user_id": str(user.id),
        }
    )
    return JSONResponse(
        {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {"email": user.email, "id": user.id},
        }
    )


@router.post("/refresh")
async def refresh_token(token_details: dict = Depends(RefreshTokenBearer())):
    if datetime.fromtimestamp(token_details["exp"], tz=timezone.utc) < datetime.now(timezone.utc):
        raise Exception("Invalid token")

    new_access_token = create_access_token(token_details["user"])
    return JSONResponse(content={"access_token": new_access_token})
