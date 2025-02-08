from fastapi import FastAPI
import os
from database import init, get_table_name

app = FastAPI()

@app.on_event("startup")
def on_startup():
    init()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/{table_name}")
def get_table(table_name):
    table = get_table_name(table_name)
    return {table_name: table}


