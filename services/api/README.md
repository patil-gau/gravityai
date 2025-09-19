# Gravity AI - API Service

Production-ready Node.js/Express API service for the Gravity AI platform.

## Purpose

The API service provides the backend functionality for the Gravity AI platform, including data processing, business logic, and external service integrations. Built with production-grade patterns for scalability, observability, and maintainability.

## Technology Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Logging:** Winston (structured JSON logging)
- **Security:** Helmet, CORS
- **Testing:** Jest + Supertest
- **Development:** tsx for fast TypeScript execution

## Development

### Prerequisites

- Node.js 18+ (see root `.nvmrc`)
- npm 9+

### Setup

```bash
# From the services/api/ directory
npm install
```

### Available Scripts

- `npm run dev` - Start development server with hot reload (port 8000)
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

### Environment Variables

Required environment variables:

- `NODE_ENV` - Environment mode (development/staging/production)
- `PORT` - Server port (default: 8000)
- `LOG_LEVEL` - Logging level (default: info)
- `ALLOWED_ORIGINS` - CORS allowed origins (comma-separated)

### Project Structure

```
services/api/
├── src/
│   ├── index.ts          # Application entry point
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.ts
│   │   └── requestLogger.ts
│   ├── utils/           # Utility functions
│   │   └── logger.ts    # Winston logger configuration
│   ├── routes/          # API route handlers (future)
│   └── types/           # TypeScript type definitions
├── dist/                # Compiled JavaScript (build output)
├── Dockerfile          # Production container
└── tsconfig.json       # TypeScript configuration
```

### API Endpoints

**Health & Status:**
- `GET /health` - Health check endpoint
- `GET /api/v1/status` - API status and version info

**Future endpoints will be documented here as they're implemented.**

### Docker

Build and run the containerized application:

```bash
# Build
docker build -t gravity-ai-api .

# Run
docker run -p 8000:8000 -e NODE_ENV=production gravity-ai-api
```

## Production Features

### Logging

- **Structured JSON logging** in production for log aggregation
- **Human-readable console logging** in development
- **Request/response logging** with timing and metadata
- **Error logging** with full context and stack traces
- **Log levels:** error, warn, info, debug

### Security

- **Helmet.js** for security headers
- **CORS** configuration with environment-specific origins
- **Input validation** ready for implementation
- **Error handling** that doesn't expose internals in production

### Monitoring & Observability

- Health check endpoint for load balancer integration
- Structured logging ready for centralized log management
- Request tracing with correlation IDs (ready for implementation)
- Metrics endpoints (ready for implementation)

### Graceful Shutdown

The application handles `SIGTERM` and `SIGINT` signals for graceful shutdown, ensuring:
- Active requests complete before shutdown
- Database connections close cleanly
- No data loss during deployments

## Development Guidelines

- Use TypeScript strict mode for type safety
- Follow Express.js best practices for middleware ordering
- Implement comprehensive error handling
- Add request validation for all endpoints
- Write tests for all business logic
- Use structured logging for observability
