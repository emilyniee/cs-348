from fastapi import FastAPI
from database import init_db, get_all_users

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    users = get_all_users()
    return {"users": users}