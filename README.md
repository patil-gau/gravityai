# Gravity AI

Production-ready AI platform built as a scalable mono-repository.

## Architecture

This mono-repository contains the following components:

- **`web/`** - Next.js frontend application
- **`services/api/`** - Node.js/Express API service
- **`infra/`** - Infrastructure as Code (Terraform)

## Quick Start

### Prerequisites

- Node.js 18+ (`nvm use` or check `.nvmrc`)
- Docker and Docker Compose
- Terraform (for infrastructure deployment)

### Development Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.template .env
   # Edit .env with your configuration
   ```

3. **Start development services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the applications:**
   - Web Frontend: http://localhost:3000
   - API Service: http://localhost:8000
   - Health Check: http://localhost:8000/health

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all applications
- `npm run test` - Run tests across all workspaces
- `npm run lint` - Lint all code
- `npm run clean` - Clean build artifacts

## Project Structure

```
gravity-ai/
├── web/                    # Frontend application
├── services/
│   └── api/               # Backend API service
├── infra/                 # Infrastructure as Code
│   ├── terraform/         # Terraform configurations
│   └── scripts/          # Deployment scripts
├── docs/                  # Documentation
├── package.json          # Root package.json (workspaces)
├── docker-compose.yml    # Local development
├── .env.template         # Environment variables template
└── CONTRIBUTING.md       # Development guidelines
```

## Environments

- **Development** (`dev`) - Local development and testing
- **Staging** (`staging`) - Pre-production testing environment  
- **Production** (`prod`) - Live production environment

## Infrastructure

Infrastructure is managed using Terraform and deployed to Google Cloud Platform. See `infra/` directory for details.

## Operator Runbook

### Required GCP APIs

The following Google Cloud APIs must be enabled for the Gravity AI platform to function correctly:

#### Core Services
- **Cloud Run API** - Container deployment and auto-scaling
  - *Why needed:* Hosts both web frontend and API service containers
  - *Success criterion:* Cloud Run endpoint reachable and serving traffic

- **Cloud Build API** - CI/CD pipeline and container builds
  - *Why needed:* Automated building and deployment of Docker containers
  - *Success criterion:* Build triggers execute successfully and produce container images

#### Data & Storage
- **Firestore API** - NoSQL document database
  - *Why needed:* Primary data storage for user data, configurations, and application state
  - *Success criterion:* Database queries execute successfully from API service

- **Cloud Storage API** - Object storage for files and assets
  - *Why needed:* Storage for user uploads, model artifacts, and static assets
  - *Success criterion:* File uploads and downloads work through API endpoints

#### Security & Configuration
- **Secret Manager API** - Secure configuration and credentials management
  - *Why needed:* Storage of API keys, database credentials, and sensitive configuration
  - *Success criterion:* API service can retrieve secrets without errors

#### Communication & AI
- **Pub/Sub API** - Asynchronous messaging and event processing
  - *Why needed:* Background job processing and service-to-service communication
  - *Success criterion:* Messages publish and subscribe successfully

- **Vertex AI API** - Machine learning model deployment and inference
  - *Why needed:* Core AI functionality for the platform's machine learning capabilities
  - *Success criterion:* Model predictions return successfully through API calls

### Project Configuration

- **Firebase Project:** `gravityai-64e30`
- **GCP Project ID:** `gravityai-64e30`
- **Primary Region:** `asia-south1` (Mumbai)

### Regions & Latency

**Why asia-south1 (Mumbai) is chosen:**
- Optimized for South Asian user base with lowest latency
- Full service availability for all required GCP services
- Cost-effective region for the target market
- Strong compliance and data residency options

**To change regions later:**
1. Update Terraform variables in `infra/terraform/variables.tf`
2. Modify environment-specific `.tfvars` files in `infra/terraform/environments/`
3. Update Firebase configuration if using Firebase services
4. Consider data migration requirements for stateful services
5. Test latency impact on target user base before switching

**Alternative regions to consider:**
- `asia-southeast1` (Singapore) - Regional hub with excellent connectivity
- `us-central1` (Iowa) - Cost-effective with broad service availability
- `europe-west1` (Belgium) - GDPR compliance for European users

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines, coding standards, and deployment procedures.

## License

Private - Gravity AI Team
