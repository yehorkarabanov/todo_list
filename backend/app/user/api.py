from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.responses import JSONResponse
from app.settings import settings
from app.user.dependencies import AccessTokenBearer
from app.user.hash import get_password_hash
from app.user.schemas import (
    UserSchema,
    UserRegister,
    URLToken,
    EmailData,
    PasswordReset,
    RefreshToken,
)
from app.user.auth import (
    create_access_token,
    create_refresh_token,
    create_url_safe_token,
    decode_url_safe_token,
    decode_token,
)
from app.database import db_helper
from app.database.models import User
from app.celery.worker import user_verify_mail_event
from app.database.redis import add_token_jti_to_blacklist, check_token_in_blacklist

router = APIRouter(prefix="/user", tags=["users"])


@router.post("/login")
async def login(
    login_data: UserSchema,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    user = await User.authenticate(session, login_data.email, login_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
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
        }
    )


@router.post("/refresh")
async def refresh_token(token: RefreshToken):
    token_data = decode_token(token.refresh_token)
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
        )
    if token_data and not token_data["type"] == "refresh":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Refresh token required"
        )
    if await check_token_in_blacklist(token_data["jti"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
        )
    new_access_token = create_access_token(token_data["user"])
    return JSONResponse(content={"access_token": new_access_token})


@router.post("/register")
async def register(
    user_data: UserRegister,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    user_exists = await User.find_by_email(session, user_data.email)

    if user_exists:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This email is already registered",
        )

    user_data = user_data.model_dump(exclude={"confirm_password"})
    user_data["password"] = get_password_hash(user_data["password"])

    user = User(**user_data)
    await user.save(session)

    token = create_url_safe_token({"email": user_data["email"], "id": str(user.id)})
    link = f"{settings.VERIFY_MAIL_URL}/{token}"

    user_verify_mail_event.delay(
        user_data["email"],
        "Verify Your email",
        link,
    )
    return {
        "message": "Account Created! Check email to verify your account",
    }


@router.post("/verify")
async def verify_user(
    token: URLToken, session: AsyncSession = Depends(db_helper.session_dependency)
):
    token_data = decode_url_safe_token(token.token)
    user_id = int(token_data.get("id"))
    if not user_id:
        return HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error accrued during verification",
        )
    user = await User.find_by_id(session, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User not found"
        )

    user.is_verified = True
    await user.save(session)
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
        }
    )


@router.post("/logout")
async def logout(
    refresh: RefreshToken, access_token_details: dict = Depends(AccessTokenBearer())
):
    refresh_token_details = decode_token(refresh.refresh_token)
    await add_token_jti_to_blacklist(
        (access_token_details["jti"], refresh_token_details["jti"])
    )
    return {"message": "Logged out"}


@router.post("/password-reset")
async def password_reset_request(
    email: EmailData, session: AsyncSession = Depends(db_helper.session_dependency)
):
    email = email.email

    if not (user := await User.find_by_email(session, email)):
        raise HTTPException(
            detail="No user with this email", status_code=status.HTTP_400_BAD_REQUEST
        )

    token = create_url_safe_token({"email": email})
    link = f"{settings.PASSWORD_RESET_URL}/{token}"

    user_verify_mail_event.delay(
        email,
        "Reset Your Password",
        link,
    )
    return {"message": "Password Reset Requested"}


@router.post("/password-reset/token")
async def password_reset_token(
    data: PasswordReset, session: AsyncSession = Depends(db_helper.session_dependency)
):
    token_data = decode_url_safe_token(data.token)
    if not (user_email := token_data.get("email")):
        raise HTTPException(
            detail="Invalid token, no email", status_code=status.HTTP_400_BAD_REQUEST
        )
    if not (user := await User.find_by_email(session, user_email)):
        raise HTTPException(
            detail="No user with this email", status_code=status.HTTP_400_BAD_REQUEST
        )
    password_hash = get_password_hash(data.password)
    user.password = password_hash
    await user.save(session)
    return {"message": "Password reset successful"}
