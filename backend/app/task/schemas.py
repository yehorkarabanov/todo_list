from typing import Optional

from pydantic import BaseModel, Field


class TaskUpdate(BaseModel):
    is_completed: Optional[bool] = Field(None)
    content: Optional[str] = Field(None)


class TaskContent(BaseModel):
    content: str
