from fastapi import FastAPI
from app.routes import router
from app.database import create_db
from routes import chapters
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Thirukkural API")

app.include_router(router)
app.include_router(chapters.router)

@app.on_event("startup")
def startup():
    create_db()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specify "http://localhost:3000" for local frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
