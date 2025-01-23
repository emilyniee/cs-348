from fastapi import FastAPI
from database import init, get_all_users

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def get_users():
    users = get_all_users()
    return {"users": users}