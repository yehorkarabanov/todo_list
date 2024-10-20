from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.models import User, Task
from app.database import db_helper
from app.user.dependencies import AccessTokenBearer
from app.task.schemas import TaskUpdate, TaskContent

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


@router.put("/{id}")
async def update(
        id: int,
        task: TaskUpdate,
        access_token_details: dict = Depends(AccessTokenBearer()),
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    await Task.update_by_id(
        session, User, id, access_token_details["user"]["email"], task.model_dump()
    )
    return {"message": "Task updated successfully"}


@router.post("/")
async def create(
        content: TaskContent,
        access_token_details: dict = Depends(AccessTokenBearer()),
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    task = Task()
    task.content = content.content
    task.is_completed = False
    task.user_id = User.get_query_id_from_email(access_token_details["user"]["email"])

    await task.save(session)

    return {"message": "Task created successfully"}


@router.delete("/{id}")
async def delete(
        id: int,
        access_token_details: dict = Depends(AccessTokenBearer()),
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    await Task.delete_by_id(session, User, id, access_token_details["user"]["email"])
    return {"message": "Task deleted successfully"}
