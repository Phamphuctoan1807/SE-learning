# Production Dockerfile for SE Learning Platform
# Works out-of-the-box on Hugging Face Spaces (port 7860), Render ($PORT), and Docker Compose
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    APP_ENV=production \
    PORT=7860

WORKDIR /app

RUN groupadd -r appgroup && useradd -r -g appgroup -d /app -s /sbin/nologin appuser

COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/
RUN mkdir -p /app/data && chown -R appuser:appgroup /app /tmp

USER appuser

EXPOSE 7860

CMD ["sh", "-c", "python3 -m uvicorn backend.app:app --host 0.0.0.0 --port ${PORT:-7860}"]
