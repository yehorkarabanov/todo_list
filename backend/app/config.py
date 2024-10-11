from pydantic_settings import BaseSettings
import os


class Settings(BaseSettings):
    REDIS_PORT: int = os.getenv("REDIS_PORT", 6379)
    SECRET_KEY: str = os.getenv("SECRET_KEY", "secret")
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "todo-todo_list")

    SMTP_USER: str = os.getenv("SMTP_USER", "test@test.com")
    SMTP_PASSWORD: str = os.getenv("SMTP_PASSWORD", "password")
    EMAILS_FROM_EMAIL: str = os.getenv("EMAILS_FROM_EMAIL", "test@out.com")
    SMTP_PORT: int = os.getenv("SMTP_PORT", 1025)
    SMTP_HOST: str = os.getenv("SMTP_HOST", "mailhog")
    EMAIL_FROM_NAME: str = os.getenv("EMAIL_FROM_NAME", "No reply")

    POSTGRES_PORT: int = os.getenv("POSTGRES_PORT", 5432)
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "todolist")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "admin")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "admin")
    DATABASE_URL: str = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@postgres:{POSTGRES_PORT}/{POSTGRES_DB}"

    DEBUG: bool = os.getenv("DEBUG", False)


settings = Settings()
