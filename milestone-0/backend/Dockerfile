FROM python:3.10

WORKDIR /app

RUN pip install pip-tools
COPY requirements.in .

RUN pip-compile requirements.in > requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

ENTRYPOINT ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
