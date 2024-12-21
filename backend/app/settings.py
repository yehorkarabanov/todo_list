from pathlib import Path
from typing import List

from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    REDIS_PORT: int = os.getenv("REDIS_PORT", 6379)
    REDIS_URL: str = f"redis://redis:{REDIS_PORT}/0"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "secret")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "todo-todo_list")
    BACKEND_CORS_ORIGINS: List[str] = os.getenv(
        "BACKEND_CORS_ORIGINS",
        ["*"],
    )
    ACCESS_TOKEN_EXPIRE_SECONDS: int = os.getenv("ACCESS_TOKEN_EXPIRE_SECONDS", 1800)
    REFRESH_TOKEN_EXPIRE_SECONDS: int = os.getenv("REFRESH_TOKEN_EXPIRE_SECONDS", 86400)
    DOMAIN: str = os.getenv("DOMAIN", "https://localhost")
    VERIFY_MAIL_PATH: str = os.getenv("VERIFY_MAIL_PATH", "/api/user/verify/")
    VERIFY_MAIL_URL: str = f"https://{DOMAIN}{VERIFY_MAIL_PATH}"
    PASSWORD_RESET_PATH: str = os.getenv(
        "PASSWORD_RESET_PATH", "/api/user/password-reset/"
    )
    PASSWORD_RESET_URL: str = f"https://{DOMAIN}{PASSWORD_RESET_PATH}"

    SMTP_USER: str = os.getenv("SMTP_USER", "test@test.com")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "password")
    EMAILS_FROM_EMAIL: str = os.getenv("EMAILS_FROM_EMAIL", "test@out.com")
    SMTP_PORT: int = os.getenv("SMTP_PORT", 1025)
    SMTP_HOST: str = os.getenv("SMTP_HOST", "mailhog")
    EMAIL_FROM_NAME: str = os.getenv("EMAIL_FROM_NAME", "No reply")

    POSTGRES_PORT: int = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "todolist")
    POSTGRES_TEST_DB: str = os.getenv("POSTGRES_TEST_DB", "todolisttest")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "admin")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "admin")
    DATABASE_URL: str = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:{POSTGRES_PORT}/{POSTGRES_DB}"
    TEST_DATABASE_URL: str = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:{POSTGRES_PORT}/{POSTGRES_TEST_DB}"

    DEBUG: bool = os.getenv("DEBUG", False)

    BASE_DIR: Path = Path(__file__).resolve().parent
    ROOT_DIR: Path = Path(__file__).resolve().parent.parent


settings = Settings()
