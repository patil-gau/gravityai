# Use Python 3.11 slim image for smaller size
FROM python:3.11-slim

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PORT=8000

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Create non-root user
RUN groupadd --gid 1001 apiuser && \
    useradd --uid 1001 --gid apiuser --shell /bin/bash --create-home apiuser

# Set work directory
WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create entrypoint script to handle base64 credentials
RUN echo '#!/bin/bash\n\
# Decode base64 credentials if provided\n\
if [ ! -z "$GOOGLE_CLOUD_CREDENTIALS_BASE64" ]; then\n\
    echo "$GOOGLE_CLOUD_CREDENTIALS_BASE64" | base64 -d > /app/service-account.json\n\
    export GOOGLE_APPLICATION_CREDENTIALS=/app/service-account.json\n\
fi\n\
\n\
# Start the application\n\
exec "$@"\n\
' > /app/entrypoint.sh && chmod +x /app/entrypoint.sh

# Change ownership to non-root user
RUN chown -R apiuser:apiuser /app

# Switch to non-root user
USER apiuser

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/healthz')"

# Set entrypoint and command
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
