from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.settings import settings
from app.user.api import router as user_router

app = FastAPI(root_path="/api/")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],

)

app.include_router(user_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == '__main__':
    import uvicorn
    uvicorn.run("main:app", host='0.0.0.0', port=8080, reload=True, proxy_headers=True)