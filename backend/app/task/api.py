from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models import User, Task
from app.database import db_helper
from app.user.dependencies import AccessTokenBearer
from app.task.schemas import TaskUpdate

router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/")
async def get_all_tasks_for_user(
    access_token_details: dict = Depends(AccessTokenBearer()),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    task = await Task.find_by_user_email(
        db=session, user=User, email=access_token_details["user"]["email"]
    )
    return {"data": task}


@router.put("/")
async def update(
    task: TaskUpdate,
    access_token_details: dict = Depends(AccessTokenBearer()),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    res = await Task.update_by_id(session, User, task.id, task.model_dump())
    return {"message": "Task updated successfully"}
