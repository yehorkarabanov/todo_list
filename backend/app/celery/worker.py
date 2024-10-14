from celery import Celery
from app.settings import settings
from typing import List
from asgiref.sync import async_to_sync
from app.mail.mail import mail, create_message

celery_app = Celery("tasks", broker=settings.REDIS_URL, backend=settings.REDIS_URL)


@celery_app.task(name="user_verify_mail_event")
def user_verify_mail_event(recipients: List[str], subject: str, link: str):
    message = create_message(
        recipients=recipients, subject=subject, body={"link": link}
    )
    async_to_sync(mail.send_message)(message, "mail/verify.html")
