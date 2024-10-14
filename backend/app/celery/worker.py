from celery import Celery
from app.settings import settings
from asgiref.sync import async_to_sync
from app.mail.mail import mail, create_message

celery_app = Celery("tasks", broker=settings.REDIS_URL, backend=settings.REDIS_URL)


@celery_app.task(name="user_verify_mail_event")
def user_verify_mail_event(recipient: str, subject: str, link: str):
    message = create_message(
        recipients=[
            recipient,
        ],
        subject=subject,
        body={"link": link},
    )
    async_to_sync(mail.send_message)(message, "mail/verify.html")


@celery_app.task(name="user_password_reset_event")
def user_password_reset_mail(recipient: str, subject: str, link: str):
    message = create_message(
        recipients=[
            recipient,
        ],
        subject=subject,
        body={"link": link},
    )
    async_to_sync(mail.send_message)(message, "mail/password_reset.html")
