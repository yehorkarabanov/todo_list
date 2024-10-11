from fastapi import FastAPI

from config import settings
app = FastAPI(root_path="/api/")

@app.get("/")
async def root():
    return {"message": settings.POSTGRES_PORT}
