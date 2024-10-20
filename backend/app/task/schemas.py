from typing import Optional

from pydantic import BaseModel, Field


class TaskBase(BaseModel):
    id: int


class TaskUpdate(TaskBase):
    is_completed: Optional[bool] = Field(None)
    content: Optional[str] = Field(None)
