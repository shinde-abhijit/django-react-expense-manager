# Dockerfile.server
FROM python:3.13

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

# Set workdir
WORKDIR /app

COPY requirements.txt .

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# Copy Django app
COPY . .

EXPOSE 8000

RUN chmod +x ./entrypoint.sh

ENTRYPOINT [ "./entrypoint.sh" ]