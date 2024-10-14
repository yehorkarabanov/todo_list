from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from app.settings import settings
from app.user.dependencies import RefreshTokenBearer
from app.user.hash import get_password_hash
from app.user.schemas import UserSchema, UserRegister, URLToken
from app.user.auth import (
    create_access_token,
    create_refresh_token,
    create_url_safe_token,
    decode_url_safe_token,
)
from app.database import db_helper
from app.user import models
from app.celery.worker import user_verify_mail_event

router = APIRouter(prefix="/user")


@router.post("/mail_test")
async def send_mail(email: str):
    user_verify_mail_event.delay(
        [
            email,
        ],
        "Mail test",
        "https://localhost",
    )

    return {"message": "Email sent successfully"}


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
    if datetime.fromtimestamp(token_details["exp"], tz=timezone.utc) < datetime.now(
        timezone.utc
    ):
        raise Exception("Invalid token")

    new_access_token = create_access_token(token_details["user"])
    return JSONResponse(content={"access_token": new_access_token})


@router.post("/register")
async def register(
    user_data: UserRegister,
    session: AsyncSession = Depends(db_helper.get_scoped_session),
):
    user_exists = await models.User.find_by_email(session, user_data.email)

    if user_exists:
        raise Exception("This email is already registered")

    user_data = user_data.model_dump(exclude={"confirm_password"})
    user_data["password"] = get_password_hash(user_data["password"])

    user = models.User(**user_data)
    await user.save(session)

    token = create_url_safe_token({"email": user_data["email"], "id": str(user.id)})
    link = f"{settings.VERIFY_MAIL_URL}{token}"

    user_verify_mail_event.delay(
        [
            user_data["email"],
        ],
        "Verify Your email",
        link,
    )
    return {
        "message": "Account Created! Check email to verify your account",
    }


@router.post("/verify")
async def verify_user(
    token: URLToken, session: AsyncSession = Depends(db_helper.get_scoped_session)
):
    token_data = decode_url_safe_token(token.token)
    user_id = int(token_data.get("id"))
    if not user_id:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error accrued during verification",
        )
    user = await models.User.find_by_id(session, user_id)

    if not user:
        raise HTTPException(status_code=status.BAD_REQUEST, detail="User not found")

    user.is_verified = True
    await user.save(session)
    return {"message": "Account Verified"}
