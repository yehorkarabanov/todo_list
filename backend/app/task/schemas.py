from typing import Optional

from pydantic import BaseModel, Field


class TaskUpdate(BaseModel):
    is_completed: Optional[bool] = Field(None)
    content: Optional[str] = Field(None)


class TaskContent(BaseModel):
    content: str


class TaskRespond(BaseModel):
    id: int
    content: str
    is_completed: bool


class TasksRespond(BaseModel):
    data: list[TaskRespond]
