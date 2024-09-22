from celery import Celery

celery_app = Celery('tasks', broker='redis://redis/0', backend='redis://redis/0')
