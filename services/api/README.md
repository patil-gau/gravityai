# Gravity AI - API Service

Production-ready FastAPI service designed for Google Cloud Run deployment.

## Purpose

The API service provides the backend functionality for the Gravity AI platform, including AI processing, webhook handling, RAG operations, and insights generation. Built with production-grade patterns for scalability, observability, and Cloud-native deployment.

## Technology Stack

- **Runtime:** Python 3.11+
- **Framework:** FastAPI
- **ASGI Server:** Uvicorn with Gunicorn
- **Deployment:** Google Cloud Run
- **Logging:** Structured JSON logging
- **Security:** CORS, TrustedHost middleware
- **Testing:** pytest + httpx

## Development

### Prerequisites

- Python 3.11+ 
- pip or pipenv for dependency management
- Docker (for containerized development)

### Setup

```bash
# From the services/api/ directory
pip install -r requirements.txt

# Copy environment template
cp env.template .env
# Edit .env with your configuration
```

### Available Scripts

- `npm run dev` - Start development server with hot reload (port 8000)
- `npm run start` - Start production server
- `npm run test` - Run pytest tests
- `npm run lint` - Run flake8 and black checks
- `npm run format` - Format code with black
- `npm run type-check` - Run mypy type checking
- `npm run clean` - Remove Python cache files

### Environment Variables

Required environment variables:

- `ENVIRONMENT` - Environment mode (development/staging/production)
- `PORT` - Server port (default: 8000)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)
- `GOOGLE_CLOUD_PROJECT` - GCP project ID
- `GOOGLE_CLOUD_REGION` - GCP region (asia-south1)

### Project Structure

```
services/api/
├── main.py              # FastAPI application entry point
├── requirements.txt     # Python dependencies
├── env.template        # Environment configuration template
├── Dockerfile          # Production container
├── cloudbuild.yaml     # Google Cloud Build configuration
├── deployment/         # Cloud Run deployment files
│   ├── cloud-run.yaml  # Service configuration
│   └── deploy.sh       # Deployment script
└── tests/              # Test files (future)
```

### API Endpoints

**Health & Monitoring:**
- `GET /healthz` - Health check endpoint for load balancer

**WhatsApp Integration:**
- `POST /wa/webhook` - WhatsApp webhook for message processing

**RAG (Retrieval-Augmented Generation):**
- `POST /rag/embed` - Create text embeddings for document indexing
- `POST /rag/ask` - Answer questions using RAG system

**AI Insights:**
- `POST /insights/run` - Run AI analysis and generate insights

**Interactive API Documentation:**
- `GET /docs` - Swagger UI (development only)
- `GET /redoc` - ReDoc documentation (development only)

### Docker

Build and run the containerized application:

```bash
# Build
docker build -t gravity-ai-api .

# Run
docker run -p 8000:8000 -e ENVIRONMENT=production gravity-ai-api
```

## Cloud Run Deployment

The API service is designed for Google Cloud Run with the following deployment strategy:

### Deployment Plan

**Build & Deploy Process:**
1. **Source to Container:** Google Cloud Build automatically builds from source
2. **Container Registry:** Images stored in Google Container Registry
3. **Cloud Run Deployment:** Zero-downtime deployments with traffic splitting
4. **Auto-scaling:** Scales from 0 to 10 instances based on demand

**Environment-Specific Deployments:**
- **Development:** `gravity-ai-api-dev` service with minimal resources
- **Staging:** `gravity-ai-api-staging` service with production-like config  
- **Production:** `gravity-ai-api-prod` service with full scaling and monitoring

### Deployment Commands

```bash
# Deploy using Cloud Build
gcloud builds submit --config cloudbuild.yaml

# Deploy using deployment script
cd deployment/
./deploy.sh prod latest

# Manual deployment
gcloud run deploy gravity-ai-api \
  --image gcr.io/gravityai-64e30/gravity-ai-api:latest \
  --region asia-south1 \
  --allow-unauthenticated
```

## Firebase Hosting Integration

The API service is designed to work behind Firebase Hosting's `/api/*` rewrite rules.

### Hosting Configuration

**Firebase Hosting Setup:**
- Web app served from Firebase Hosting root (`/`)
- API requests proxied to Cloud Run via `/api/*` path
- CORS configured for hosting domain origins only
- No direct access to Cloud Run service URLs

**Request Flow:**
```
Web App (/) → Firebase Hosting → /api/* → Cloud Run Service
```

**URL Examples:**
- `https://gravity-ai.com/api/healthz` → Cloud Run `/healthz`
- `https://gravity-ai.com/api/rag/ask` → Cloud Run `/rag/ask`
- `https://gravity-ai.com/api/wa/webhook` → Cloud Run `/wa/webhook`

### Runtime Dependencies

The following Google Cloud and AI service clients will be integrated:

**Google Cloud Services:**
- **Pub/Sub Client** - Asynchronous message processing for webhooks and background jobs
- **Cloud Storage Client** - File storage, document uploads, and AI model artifacts
- **Firestore Client** - Document database for user data and application state
- **Secret Manager Client** - Secure storage of API keys and credentials

**AI/ML Services:**
- **Vertex AI Client** - Google's managed AI platform for embeddings and language models
- **OpenAI Client** - GPT models for advanced language processing and generation

**Authentication:**
- **Firebase Admin SDK** - Server-side Firebase authentication and user management

## Production Features

### Security & CORS

- **CORS Policy:** Closed by default, only allows configured origins
- **TrustedHost Middleware:** Validates request hosts
- **Input Validation:** Pydantic models for request/response validation
- **Authentication:** Firebase Auth token verification (when implemented)

### Monitoring & Health Checks

- **Health Endpoint:** `/healthz` for load balancer and monitoring
- **Structured Logging:** JSON format for Cloud Logging integration
- **Error Handling:** Graceful error responses without internal exposure
- **Request Tracking:** Request ID generation for distributed tracing

### Performance & Scaling

- **ASGI Server:** Uvicorn for high-performance async request handling
- **Container Optimization:** Multi-stage builds with minimal runtime image
- **Auto-scaling:** Cloud Run scales based on CPU utilization and concurrency
- **Connection Pooling:** Efficient database and external service connections

## Success Checks

After deployment, verify the following functionality:

### ✅ Health & Connectivity
- [ ] **"/healthz returns ok"** - Health endpoint responds with 200 status
- [ ] **Service accessibility** - Cloud Run service URL is reachable
- [ ] **Firebase Hosting proxy** - `/api/healthz` works through hosting

### ✅ API Structure & Documentation  
- [ ] **"Endpoint structure visible"** - All 5 endpoints return proper JSON responses
- [ ] **Swagger docs accessible** - `/docs` loads in development environment
- [ ] **Request/response validation** - Pydantic models validate input/output

### ✅ Security & CORS
- [ ] **"CORS policy defaults closed"** - Requests blocked from unauthorized origins
- [ ] **CORS allows hosting** - Requests succeed from Firebase Hosting domains
- [ ] **Error handling** - Internal errors don't expose sensitive information

### ✅ Deployment & Infrastructure
- [ ] **Container builds successfully** - Docker image builds without errors
- [ ] **Cloud Run deployment** - Service deploys and scales properly
- [ ] **Environment configuration** - All required environment variables set

### ✅ Endpoint Functionality (Stub Responses)
- [ ] **WhatsApp webhook** - `POST /wa/webhook` returns processing confirmation
- [ ] **RAG embedding** - `POST /rag/embed` returns embedding metadata
- [ ] **RAG query** - `POST /rag/ask` returns answer with confidence score
- [ ] **Insights analysis** - `POST /insights/run` returns analysis results

## Message Contracts

The API service uses Google Cloud Pub/Sub for asynchronous message processing and background job orchestration. The following topics define the message contracts for inter-service communication.

### Pub/Sub Topics

**Topic Structure:**
- **Environment Prefix:** `{environment}-gravity-ai-{topic-name}`
- **Naming Convention:** Kebab-case with logical grouping
- **Message Format:** JSON with standardized envelope structure

### Inbound Message Processing

#### `inbound.msg` - Normalized WhatsApp Messages

**Purpose:** Centralized processing of all incoming WhatsApp messages after normalization from various providers (WATI, Meta, etc.)

**Message Shape:**
```
{
  uid: string           // Unique user identifier in our system
  msgId: string         // Original message ID from WhatsApp provider
  type: string          // Message type: "text", "image", "audio", "video", "document", "location"
  text: string          // Message text content (for text messages)
  mediaUrl?: string     // Media file URL (for media messages)
  mimeType?: string     // Media MIME type (for media messages)
  ts: number            // Unix timestamp (milliseconds) when message was received
  phoneNumber: string   // User's WhatsApp phone number (E.164 format)
  providerMsgId: string // Provider-specific message ID for tracking
  provider: string      // WhatsApp provider: "wati", "meta", etc.
  isFromUser: boolean   // true for user messages, false for automated responses
  metadata?: object     // Additional provider-specific metadata
}
```

**Consumers:**
- **Message Processor Service** - Main message analysis and response generation
- **Analytics Service** - User engagement and conversation metrics
- **Audit Service** - Message logging and compliance tracking
- **AI Context Service** - Building user conversation context for RAG system

**Processing Flow:**
1. WhatsApp webhook receives raw message
2. Provider adapter normalizes to standard format
3. Message published to `inbound.msg` topic
4. Multiple services process asynchronously
5. Response generation and analytics occur in parallel

### Scheduled Insight Generation

#### `digests.daily` - Daily User Insights

**Purpose:** Trigger daily insight generation for active users, analyzing conversation patterns, mood, and actionable recommendations.

**Message Shape:**
```
{
  uid: string           // User identifier for insight generation
  date: string          // Date for analysis (YYYY-MM-DD format)
  timeZone: string      // User's timezone for accurate date boundaries
  messageCount: number  // Number of messages sent by user on this date
  analysisType: string  // Type of analysis: "mood", "productivity", "goals", "summary"
  priority: string      // Processing priority: "high", "normal", "low"
  retryCount?: number   // Number of retry attempts (for failed processing)
  scheduledAt: number   // Unix timestamp when job was scheduled
  contextWindow: number // Days of message history to include in analysis
}
```

**Consumers:**
- **Insights Engine** - Main AI-powered analysis service
- **User Notification Service** - Sends daily digest notifications
- **Data Pipeline** - Updates user analytics and progress tracking
- **Recommendation Engine** - Generates personalized suggestions

**Scheduling Logic:**
- Triggered daily at user's preferred time (default: 9 AM local time)
- Only for users with messages in the last 7 days
- Includes configurable analysis types based on user preferences

#### `digests.weekly` - Weekly User Analytics

**Purpose:** Generate comprehensive weekly summaries and trend analysis for user productivity, goal progress, and behavioral patterns.

**Message Shape:**
```
{
  uid: string           // User identifier for weekly analysis
  weekStart: string     // Start of week (YYYY-MM-DD, Monday)
  weekEnd: string       // End of week (YYYY-MM-DD, Sunday)
  timeZone: string      // User's timezone for accurate week boundaries
  weeklyStats: object   // Pre-calculated stats from daily data
  analysisDepth: string // Analysis level: "basic", "detailed", "comprehensive"
  includeComparisons: boolean // Whether to include week-over-week comparisons
  goalTracking: boolean // Whether user has active goals to analyze
  priority: string      // Processing priority based on user tier
  retryCount?: number   // Number of retry attempts
  scheduledAt: number   // Unix timestamp when job was scheduled
}
```

**Weekly Stats Object:**
```
weeklyStats: {
  totalMessages: number     // Total messages sent during week
  activeDays: number       // Number of days user was active
  avgMessagesPerDay: number // Average daily message count
  peakActivityDay: string   // Day with most activity
  moodTrend: string        // Overall mood trend: "improving", "stable", "declining"
  topTopics: string[]      // Most discussed topics/categories
}
```

**Consumers:**
- **Weekly Insights Engine** - Advanced AI analysis for trends and patterns
- **Goal Tracking Service** - Progress assessment and milestone detection
- **User Engagement Service** - Retention and engagement scoring
- **Reporting Service** - Generate weekly summary reports
- **Coaching Service** - Personalized coaching recommendations

**Scheduling Logic:**
- Triggered every Monday at 10 AM user local time
- Only for users active in the previous week
- Analysis depth varies by user subscription tier

### Message Processing Patterns

**Delivery Guarantees:**
- **At-least-once delivery** for all message types
- **Idempotency keys** in message metadata to handle duplicates
- **Dead letter queues** for failed message processing
- **Exponential backoff** retry strategy with maximum 3 attempts

**Message Ordering:**
- **inbound.msg** - Order not guaranteed (parallel processing acceptable)
- **digests.daily** - Order not critical (per-user processing)
- **digests.weekly** - Order not critical (independent weekly jobs)

**Message Retention:**
- **7 days** for inbound.msg (rapid processing expected)
- **14 days** for digest topics (longer processing windows for AI analysis)
- **Dead letter retention:** 30 days for debugging and replay

### Topic Configuration Strategy

**Subscription Patterns:**

**Push Subscriptions (Real-time Processing):**
- `inbound.msg` → Message Processor Service (immediate response generation)
- `inbound.msg` → Real-time Analytics Service (live user engagement tracking)

**Pull Subscriptions (Batch Processing):**
- `digests.daily` → Insights Engine (AI analysis can be batched)
- `digests.weekly` → Analytics Pipeline (longer processing acceptable)
- `inbound.msg` → Audit Service (batch logging for compliance)

**Scaling Configuration:**
- **inbound.msg** - High throughput, multiple parallel subscribers
- **digests.daily** - Medium throughput, time-sensitive processing
- **digests.weekly** - Low throughput, resource-intensive processing

### Error Handling & Monitoring

**Message Validation:**
- JSON schema validation for all message shapes
- Required field enforcement at subscription level
- Malformed message routing to dead letter queues

**Processing Monitoring:**
- Message processing latency tracking
- Subscription backlog monitoring and alerting
- Failed message analysis and automatic retry logic
- Consumer health checks and auto-scaling triggers

**Observability:**
- Structured logging for all message processing events
- Distributed tracing across message lifecycle
- Custom metrics for business logic (user engagement, insight generation success rates)
- Alert thresholds for message processing delays and failures

## Observability Baseline

The API service implements comprehensive observability practices for production monitoring, debugging, and performance analysis.

### Structured JSON Logging

**Log Format Standard:**
All logs use structured JSON format with consistent field naming and hierarchical organization for optimal searchability in Cloud Logging.

**Core Log Structure:**
```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "INFO",
  "service": "gravity-ai-api",
  "version": "1.2.3",
  "environment": "production",
  "requestId": "req_abc123def456",
  "correlationId": "corr_xyz789abc123",
  "message": "Request processed successfully",
  "context": {
    "endpoint": "/api/rag/ask",
    "method": "POST",
    "userAgent": "Mozilla/5.0...",
    "userId": "user_123",
    "duration": 245,
    "statusCode": 200
  }
}
```

**Request Logging Fields:**
- `requestId` - Unique identifier for each HTTP request (UUID v4)
- `correlationId` - Cross-service correlation identifier for distributed tracing
- `userAgent` - Client user agent string for debugging and analytics
- `endpoint` - API endpoint path accessed
- `method` - HTTP method (GET, POST, etc.)
- `duration` - Request processing time in milliseconds
- `statusCode` - HTTP response status code
- `userId` - Authenticated user ID (when available)
- `clientIp` - Client IP address (respecting proxy headers)

**Business Logic Logging:**
```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "INFO",
  "service": "gravity-ai-api",
  "requestId": "req_abc123def456",
  "correlationId": "corr_xyz789abc123",
  "message": "RAG query processed",
  "context": {
    "operation": "rag_query",
    "queryLength": 156,
    "documentsFound": 12,
    "confidenceScore": 0.87,
    "model": "gemini-pro",
    "processingTime": 1240
  }
}
```

### Health Check Endpoints

#### `/healthz` - Basic Health Check

**Purpose:** Quick availability check for load balancers and monitoring systems

**Response Format:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "version": "1.2.3",
  "environment": "production",
  "uptime": 86400,
  "checks": {
    "database": "healthy",
    "pubsub": "healthy",
    "storage": "healthy"
  }
}
```

**Health Check Logic:**
- **Response Time:** < 100ms target
- **Status Codes:** 200 (healthy), 503 (unhealthy)
- **Basic Checks:** Service startup, configuration loaded
- **Dependency Checks:** Database connectivity, external service availability

#### `/readyz` - Readiness Check (Future Implementation)

**Purpose:** Comprehensive readiness validation before accepting traffic

**Response Format:**
```json
{
  "ready": true,
  "timestamp": "2024-01-15T10:30:45.123Z",
  "version": "1.2.3",
  "checks": {
    "database": {
      "status": "ready",
      "latency": 45,
      "lastCheck": "2024-01-15T10:30:44.890Z"
    },
    "pubsub": {
      "status": "ready",
      "subscriptions": 3,
      "backlog": 0
    },
    "aiServices": {
      "status": "ready",
      "openai": "available",
      "vertex": "available"
    },
    "secrets": {
      "status": "ready",
      "lastRotation": "2024-01-10T09:00:00.000Z"
    }
  }
}
```

**Readiness Criteria:**
- All required environment variables loaded
- Database connections established and verified
- Pub/Sub subscriptions active and consuming
- AI service credentials validated
- Secret Manager access confirmed

### Structured Error Handling

**Error Response Format:**
```json
{
  "error": {
    "type": "ValidationError",
    "message": "Invalid request format",
    "correlationId": "corr_xyz789abc123",
    "timestamp": "2024-01-15T10:30:45.123Z",
    "details": {
      "field": "query",
      "reason": "Field is required",
      "code": "MISSING_REQUIRED_FIELD"
    },
    "requestId": "req_abc123def456"
  }
}
```

**Error Categories:**
- **ValidationError** - Request validation failures
- **AuthenticationError** - Authentication/authorization issues
- **ExternalServiceError** - AI service or external API failures
- **RateLimitError** - Rate limiting violations
- **InternalError** - Unexpected server errors

**Error Logging:**
```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "level": "ERROR",
  "service": "gravity-ai-api",
  "requestId": "req_abc123def456",
  "correlationId": "corr_xyz789abc123",
  "message": "OpenAI API request failed",
  "error": {
    "type": "ExternalServiceError",
    "code": "OPENAI_API_ERROR",
    "statusCode": 429,
    "retryAfter": 60,
    "stack": "...",
    "context": {
      "model": "gpt-4",
      "tokens": 1500,
      "attempt": 2
    }
  }
}
```

### Deployment Markers

**Startup Logging:**
Every service startup logs deployment information for tracking and debugging:

```json
{
  "timestamp": "2024-01-15T10:00:00.000Z",
  "level": "INFO",
  "service": "gravity-ai-api",
  "message": "Service starting",
  "deployment": {
    "buildSha": "a1b2c3d4e5f6789012345678901234567890abcd",
    "buildTime": "2024-01-15T09:45:30.000Z",
    "deployedAt": "2024-01-15T10:00:00.000Z",
    "version": "1.2.3",
    "environment": "production",
    "region": "asia-south1",
    "containerImage": "gcr.io/gravityai-64e30/gravity-ai-api:a1b2c3d4",
    "nodeInfo": {
      "platform": "linux",
      "arch": "x64",
      "runtime": "python-3.11.5"
    }
  }
}
```

**Deployment Marker Fields:**
- `buildSha` - Git commit SHA of deployed code
- `buildTime` - When container image was built (UTC)
- `deployedAt` - When service started in production (UTC)
- `version` - Semantic version number
- `environment` - Deployment environment (dev/staging/prod)
- `region` - GCP region where service is running
- `containerImage` - Full container image reference
- `nodeInfo` - Runtime platform information

**Configuration Logging:**
```json
{
  "timestamp": "2024-01-15T10:00:01.000Z",
  "level": "INFO",
  "service": "gravity-ai-api",
  "message": "Configuration loaded",
  "config": {
    "environment": "production",
    "logLevel": "INFO",
    "corsOrigins": ["https://gravity-ai.com"],
    "features": {
      "aiServices": true,
      "pubsubEnabled": true,
      "rateLimiting": true
    },
    "secrets": {
      "openaiConfigured": true,
      "watiConfigured": true,
      "firebaseConfigured": true
    }
  }
}
```

### Request Correlation

**Correlation ID Generation:**
- **Source:** Generated at API gateway/load balancer or first service entry
- **Format:** `corr_` prefix + 16-character alphanumeric string
- **Propagation:** Passed through all service calls and logged consistently
- **Headers:** `X-Correlation-ID` header for external service calls

**Request ID Generation:**
- **Source:** Generated per HTTP request at service entry
- **Format:** `req_` prefix + UUID v4
- **Scope:** Single service request/response cycle
- **Purpose:** Debugging specific API calls

### Monitoring Integration

**Cloud Logging Integration:**
- Structured logs automatically indexed by Cloud Logging
- Custom log-based metrics for business KPIs
- Log-based alerting for error patterns and thresholds
- Log export to BigQuery for analysis and reporting

**Trace Integration:**
- Request correlation IDs compatible with Cloud Trace
- Distributed tracing spans for external service calls
- Performance profiling data collection
- Trace sampling configuration per environment

**Metrics Collection:**
- Custom metrics for business operations (RAG queries, insights generated)
- System metrics (request latency, error rates, throughput)
- Resource utilization (CPU, memory, network)
- AI service usage and performance metrics

### Verification Checklist

After deployment, verify observability implementation:

#### ✅ Structured Logging Verification
- [ ] **"Health logs visible in Cloud Run logs"** - Health check requests appear in Cloud Logging console
- [ ] **JSON format validation** - All log entries use structured JSON format
- [ ] **Request ID presence** - All request logs include unique `requestId` field
- [ ] **User agent logging** - Client user agent strings captured in request context
- [ ] **Timestamp consistency** - All timestamps in UTC ISO 8601 format

#### ✅ Error Handling Verification
- [ ] **"Errors include correlationId"** - All error responses contain correlation ID
- [ ] **Error categorization** - Errors properly classified by type and code
- [ ] **Stack trace logging** - Internal errors log full stack traces (development only)
- [ ] **External error handling** - AI service failures properly categorized and logged
- [ ] **Rate limit responses** - Rate limiting returns proper error format

#### ✅ Deployment Tracking Verification
- [ ] **"Build SHA appears on startup"** - Service startup logs include Git commit SHA
- [ ] **Deployment timestamp** - Service logs deployment time in UTC
- [ ] **Version information** - Semantic version appears in startup and health logs
- [ ] **Environment identification** - Environment clearly identified in all logs
- [ ] **Container image tracking** - Full container image reference logged

#### ✅ Health Check Verification
- [ ] **Health endpoint response** - `/healthz` returns 200 with proper JSON format
- [ ] **Health check performance** - Health checks respond in < 100ms
- [ ] **Dependency status** - Health checks validate external service connectivity
- [ ] **Uptime tracking** - Service uptime accurately reported in health response
- [ ] **Load balancer integration** - Health checks work with Cloud Run health checking

#### ✅ Correlation & Tracing Verification
- [ ] **Correlation ID propagation** - Same correlation ID across service boundaries
- [ ] **Request tracing** - Individual requests trackable through logs
- [ ] **Error correlation** - Failed requests traceable through correlation ID
- [ ] **Performance tracking** - Request duration logged for all endpoints
- [ ] **Cross-service tracking** - External API calls include correlation headers

#### ✅ Monitoring Integration Verification
- [ ] **Cloud Logging ingestion** - Logs appear in Google Cloud Logging console
- [ ] **Log filtering** - Logs filterable by service, level, and correlation ID
- [ ] **Metric generation** - Key business metrics derived from logs
- [ ] **Alert configuration** - Error thresholds trigger monitoring alerts
- [ ] **Dashboard visibility** - Key metrics visible in monitoring dashboards

## Development Guidelines

- Use Python type hints for all functions and parameters
- Follow FastAPI best practices for async/await patterns  
- Implement comprehensive error handling with custom exception classes
- Add request validation using Pydantic models for all endpoints
- Write tests using pytest for all business logic
- Use structured JSON logging for Cloud Logging compatibility
- Implement proper dependency injection for Google Cloud services
