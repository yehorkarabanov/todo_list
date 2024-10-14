from typing import List, Dict, Any

from fastapi_mail import FastMail, ConnectionConfig, MessageSchema, MessageType
from app.settings import settings

mail_config = ConnectionConfig(
    MAIL_USERNAME=settings.SMTP_USER,
    MAIL_PASSWORD=settings.SMTP_PASSWORD,
    MAIL_FROM=settings.SMTP_USER,
    MAIL_PORT=settings.SMTP_PORT,
    MAIL_SERVER=settings.SMTP_HOST,
    MAIL_FROM_NAME=settings.EMAIL_FROM_NAME,
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER=settings.ROOT_DIR / "templates",
)

mail = FastMail(mail_config)


def create_message(recipients: List[str], subject: str, body: Dict[str, Any]):
    message = MessageSchema(
        recipients=recipients,
        subject=subject,
        template_body=body,
        subtype=MessageType.html,
    )
    return message
