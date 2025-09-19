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
   # 1. Copy Docker Compose environment file
   cp docker.env .env
   
   # 2. Copy Frontend environment file
   cp web/env.template.local web/.env.local
   
   # 3. Copy Backend environment file
   cp services/api/env.template.dev services/api/.env
   
   # 4. Edit the files with your actual values:
   # - .env: Docker ports and credentials path
   # - web/.env.local: Firebase configuration (public)
   # - services/api/.env: API keys and secrets (private)
   ```

3. **Start development services:**
   ```bash
   docker-compose up -d
   ```

4. **Access the applications:**
   - Web Frontend: http://localhost:3000
   - API Service: http://localhost:8000
   - API Documentation: http://localhost:8000/docs
   - Health Check: http://localhost:8000/healthz

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

## Firebase Hosting & API Routing

The application uses Firebase Hosting with a strategic rewrite configuration to serve both the Next.js web app and proxy API requests to Cloud Run.

### Hosting Rewrite Strategy

**Architecture Overview:**
- **Firebase Hosting** serves as the primary entry point for all traffic
- **Next.js App** handles all frontend routes (`/`, `/pricing`, `/app/*`, etc.)
- **Cloud Run API** handles backend processing through `/api/*` proxy
- **Seamless Integration** maintains single domain with unified SSL and CDN

**Rewrite Configuration Approach:**

1. **API Proxy Rules** (Highest Priority)
   - Pattern: `/api/**` 
   - Target: Cloud Run service `gravity-ai-api` in `asia-south1`
   - Behavior: Direct proxy with headers preserved

2. **Static Assets** (Medium Priority)
   - Pattern: `/_next/**`, `/favicon.ico`, etc.
   - Target: Firebase Hosting static files
   - Behavior: Standard static file serving with caching

3. **App Routes** (Fallback Priority)
   - Pattern: `**` (catch-all)
   - Target: Next.js app via Firebase Hosting SPA mode
   - Behavior: Single Page Application with client-side routing

### Routing Table

| Request Path | Route Type | Handled By | Behavior |
|--------------|------------|------------|----------|
| `/api/healthz` | API Endpoint | Cloud Run `gravity-ai-api` | Direct proxy to FastAPI `/healthz` |
| `/api/wa/webhook` | API Endpoint | Cloud Run `gravity-ai-api` | Direct proxy to FastAPI `/wa/webhook` |
| `/api/rag/ask` | API Endpoint | Cloud Run `gravity-ai-api` | Direct proxy to FastAPI `/rag/ask` |
| `/api/insights/run` | API Endpoint | Cloud Run `gravity-ai-api` | Direct proxy to FastAPI `/insights/run` |
| `/app/dashboard` | Protected Route | Next.js via Hosting | SPA route with AuthGate protection |
| `/app/journals` | Protected Route | Next.js via Hosting | SPA route with AuthGate protection |
| `/app/todos` | Protected Route | Next.js via Hosting | SPA route with AuthGate protection |
| `/app/calendar` | Protected Route | Next.js via Hosting | SPA route with AuthGate protection |
| `/app/documents` | Protected Route | Next.js via Hosting | SPA route with AuthGate protection |
| `/app/settings` | Protected Route | Next.js via Hosting | SPA route with AuthGate protection |
| `/pricing` | Marketing Page | Next.js via Hosting | Public marketing route |
| `/privacy` | Marketing Page | Next.js via Hosting | Public marketing route |
| `/` | Home Page | Next.js via Hosting | Public marketing route |
| `/_next/*` | Static Assets | Firebase Hosting | Cached static files |
| `/favicon.ico` | Static Assets | Firebase Hosting | Static file serving |

### Firebase Configuration Strategy

**Firebase.json Conceptual Structure:**

**Hosting Section:**
- Public directory pointing to Next.js build output
- SPA fallback enabled for client-side routing
- Headers configuration for security and caching
- Rewrites array with ordered precedence

**Rewrite Rules Priority Order:**
1. **API Proxying:** `/api/**` patterns to Cloud Run service
2. **Static Assets:** `/_next/**` and other static file patterns
3. **SPA Fallback:** All other routes to `index.html`

**Headers Configuration:**
- Security headers for all routes
- Cache headers for static assets
- CORS headers compatible with Cloud Run API

**Deployment Configuration:**
- Build commands for Next.js production build
- Pre-deploy hooks for environment validation
- Post-deploy hooks for health checks

### Regional Configuration

**Cloud Run Service Details:**
- Service Name: `gravity-ai-api`
- Region: `asia-south1` (Mumbai)
- Authentication: `allow-unauthenticated` for public API access
- Custom Domain: Managed through Firebase Hosting

**URL Structure:**
- Production: `https://gravity-ai.com/api/*` → Cloud Run
- Staging: `https://staging.gravity-ai.com/api/*` → Cloud Run staging
- Development: `https://dev.gravity-ai.com/api/*` → Cloud Run dev

### Security & Performance Considerations

**API Security:**
- Cloud Run service validates `Origin` headers from hosting domain
- CORS configured to only allow requests from Firebase Hosting
- No direct access to Cloud Run URLs (blocked by security groups)

**Performance Optimization:**
- Firebase CDN caches static assets globally
- API requests bypass CDN and go directly to regional Cloud Run
- Keep-alive connections between Hosting and Cloud Run

**SSL & Domain Management:**
- Single SSL certificate managed by Firebase Hosting
- Custom domain configuration through Firebase console
- Automatic HTTP to HTTPS redirection

### Routing Acceptance Tests

After deploying both Firebase Hosting and Cloud Run services, verify the complete routing strategy:

#### ✅ API Proxy Functionality
- [ ] **"Cloud Run healthz reachable through Hosting"** - `GET https://gravity-ai.com/api/healthz` returns 200 with service status
- [ ] **API endpoints accessible** - All 5 API routes (`/api/wa/webhook`, `/api/rag/ask`, etc.) respond through hosting
- [ ] **Request headers preserved** - `Origin`, `User-Agent`, and custom headers passed to Cloud Run
- [ ] **Response headers returned** - Cloud Run response headers (including CORS) returned to client
- [ ] **Error handling works** - API errors (4xx, 5xx) properly proxied back through hosting

#### ✅ Static Asset Serving
- [ ] **Next.js assets cached** - `/_next/static/*` files served with proper cache headers
- [ ] **Public assets accessible** - `/favicon.ico`, `/robots.txt` served from hosting
- [ ] **Asset optimization** - Images and static files compressed and CDN-cached
- [ ] **Source maps excluded** - Production builds don't expose source maps publicly

#### ✅ Frontend Route Handling
- [ ] **"Marketing pages render"** - `/`, `/pricing`, `/privacy` load without API calls
- [ ] **SPA routing works** - Client-side navigation between marketing pages functions
- [ ] **Direct URL access** - Refreshing on any frontend route serves correct page
- [ ] **404 handling** - Non-existent routes show appropriate error page

#### ✅ Protected Route Security
- [ ] **"Protected routes still protected"** - `/app/*` routes enforce AuthGate authentication
- [ ] **Auth redirection** - Unauthenticated users redirected to `/auth/signin`
- [ ] **Auth state persistence** - Authentication state maintained across route changes
- [ ] **Protected API calls** - `/app/*` pages can call API endpoints when authenticated

#### ✅ Cross-Origin & Security
- [ ] **CORS validation** - API only accepts requests from hosting domain origin
- [ ] **Direct Cloud Run blocked** - Direct requests to Cloud Run URL return CORS errors
- [ ] **Security headers present** - CSP, HSTS, and other security headers applied
- [ ] **HTTP redirects** - All HTTP requests automatically redirect to HTTPS

#### ✅ Performance & Caching
- [ ] **CDN caching active** - Static assets served from global Firebase CDN
- [ ] **API response times** - API calls through hosting have <200ms additional latency
- [ ] **Connection reuse** - Multiple API calls reuse connections to Cloud Run
- [ ] **Cache headers respected** - Different cache policies for assets vs. dynamic content

#### ✅ Environment-Specific Testing
- [ ] **Development routing** - Dev environment routes to dev Cloud Run service
- [ ] **Staging routing** - Staging environment routes to staging Cloud Run service  
- [ ] **Production routing** - Production environment routes to production Cloud Run service
- [ ] **Domain switching** - Each environment uses correct custom domain configuration

### Verification Commands

**Test API Proxy:**
```bash
curl -v https://gravity-ai.com/api/healthz
# Should return 200 with Cloud Run health status

curl -H "Origin: https://gravity-ai.com" https://gravity-ai.com/api/healthz
# Should return successful response with CORS headers
```

**Test Frontend Routes:**
```bash
curl -v https://gravity-ai.com/pricing
# Should return 200 with Next.js pricing page HTML

curl -v https://gravity-ai.com/app/dashboard
# Should return 200 with Next.js app shell (AuthGate will handle auth on client)
```

**Test Security:**
```bash
curl -H "Origin: https://malicious-site.com" https://gravity-ai.com/api/healthz
# Should return CORS error or be blocked

curl -v https://gravity-ai-api-xyz.run.app/healthz
# Should return CORS error when accessed directly
```

## Secrets & Environment Management

The platform implements a secure, production-grade secrets management strategy using Google Secret Manager as the single source of truth.

### Secrets Management Policy

**Source of Truth Hierarchy:**
1. **Production:** Google Secret Manager - All secrets centrally managed and encrypted
2. **Staging:** Google Secret Manager - Separate secrets from production  
3. **Development:** Local `.env` files - For developer convenience only

**Security Principles:**
- **Principle of Least Privilege:** Services only access secrets they require
- **Environment Isolation:** No cross-environment secret sharing
- **Audit Trail:** All secret access logged and monitored
- **Rotation Ready:** Secrets designed for regular rotation without downtime

### Required Environment Variables

**AI & ML Services:**
- `OPENAI_API_KEY` - OpenAI API authentication for GPT models
- `VERTEX_PROJECT_ID` - Google Cloud project for Vertex AI services
- `VERTEX_LOCATION` - Regional location for Vertex AI (asia-south1)

**Google Cloud Configuration:**
- `GOOGLE_CLOUD_PROJECT` - Primary GCP project identifier
- `REGION` - Default deployment region for all services

**WhatsApp Integration:**
- `WHATSAPP_PROVIDER` - WhatsApp service provider identifier
- `WATI_API_BASE_URL` - WATI service API endpoint base URL
- `WATI_TOKEN` - WATI authentication token
- `WATI_VERIFY_SECRET` - Webhook verification secret for WATI

**Additional Service Variables (Future):**
- `FIREBASE_ADMIN_KEY` - Firebase Admin SDK service account
- `PUBSUB_TOPIC_PREFIX` - Pub/Sub topic naming prefix
- `STORAGE_BUCKET_PREFIX` - Cloud Storage bucket naming prefix
- `JWT_SIGNING_KEY` - Application JWT token signing key

### Cloud Run Environment Configuration

**Secret Manager Integration:**
- Cloud Run services configured with Secret Manager volume mounts
- Secrets mounted as environment variables at container startup
- No secrets stored in container images or Cloud Build configurations
- Automatic secret version updates without service redeployment

**Deployment-Time Secret Injection:**
1. **Cloud Build Phase:** No secrets available during build
2. **Deployment Phase:** Secrets mounted from Secret Manager
3. **Runtime Phase:** Environment variables available to application
4. **Rotation Phase:** New secret versions automatically picked up

**Environment Variable Sources:**
- **Static Config:** `GOOGLE_CLOUD_PROJECT`, `REGION` set via Cloud Run service config
- **Secrets:** `OPENAI_API_KEY`, `WATI_TOKEN` mounted from Secret Manager
- **Computed:** Service URLs and internal endpoints generated at runtime

**Cloud Run Service Configuration Strategy:**
```
Environment Variables (Static):
- GOOGLE_CLOUD_PROJECT=gravityai-64e30
- REGION=asia-south1
- VERTEX_LOCATION=asia-south1

Secret Manager Mounts:
- OPENAI_API_KEY → projects/gravityai-64e30/secrets/openai-api-key/versions/latest
- WATI_TOKEN → projects/gravityai-64e30/secrets/wati-token/versions/latest
- WATI_VERIFY_SECRET → projects/gravityai-64e30/secrets/wati-verify-secret/versions/latest
```

### Web App Firebase Configuration

**Public Configuration Strategy:**
- Firebase config values are **not secrets** (project ID, API keys are public)
- Configuration injected at build time through environment variables
- No runtime secret fetching from browser applications

**Build-Time Environment Injection:**
- Next.js build process reads `NEXT_PUBLIC_*` variables
- Firebase configuration embedded in client-side bundle
- Values remain static across all user sessions

**Client-Side Security Principles:**
- **No Secret Storage:** Browser never stores or accesses sensitive secrets
- **Domain Restriction:** Firebase API keys restricted to hosting domains
- **CSP Headers:** Content Security Policy prevents unauthorized requests
- **Auth Token Management:** Firebase handles authentication token lifecycle

**Firebase Configuration Sources:**
```
Build Environment:
- NEXT_PUBLIC_FIREBASE_API_KEY (public, domain-restricted)
- NEXT_PUBLIC_FIREBASE_PROJECT_ID (public identifier)
- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN (public, hosting domain)

Runtime Configuration:
- Firebase Auth tokens managed by Firebase SDK
- No manual secret management required in browser
```

### Development Environment Setup

**Local Development Philosophy:**
- **Convenience Over Security:** Faster iteration for developers
- **Isolated Secrets:** Separate dev secrets that don't affect production
- **Easy Reset:** Ability to regenerate dev secrets without impact

**Developer Workflow:**
1. Copy `env.template` to `.env` in each service directory
2. Populate with development-specific values (non-production secrets)
3. Use separate dev/staging Google Cloud projects when possible
4. Never commit `.env` files to version control

**Development Secret Sources:**
- Personal OpenAI API keys with usage limits
- Development WhatsApp sandbox credentials
- Test Firebase projects separate from production

### Rotate & Audit Runbook

**Rotation Cadence:**

**High-Risk Secrets (Monthly):**
- `OPENAI_API_KEY` - External service access
- `WATI_TOKEN` - WhatsApp service authentication
- `WATI_VERIFY_SECRET` - Webhook verification

**Medium-Risk Secrets (Quarterly):**
- `JWT_SIGNING_KEY` - Application authentication
- `FIREBASE_ADMIN_KEY` - Service account credentials

**Low-Risk Configuration (Annually):**
- `VERTEX_PROJECT_ID` - Infrastructure identifiers
- `GOOGLE_CLOUD_PROJECT` - Project configuration

**Ownership & Responsibility:**

**Platform Team (DevOps):**
- **Secret Rotation:** Executing rotation procedures
- **Access Management:** Managing Secret Manager permissions
- **Audit Monitoring:** Reviewing access logs and alerts
- **Incident Response:** Handling secret compromise scenarios

**Security Team:**
- **Policy Definition:** Setting rotation schedules and procedures
- **Compliance Auditing:** Regular review of secret access patterns
- **Risk Assessment:** Evaluating secret exposure risks
- **Training:** Developer education on secret management

**Development Team:**
- **Usage Compliance:** Following secret access patterns
- **Incident Reporting:** Notifying of potential secret exposure
- **Testing Support:** Validating applications after rotation

**Rotation Procedure:**

**Pre-Rotation (24 hours before):**
1. **Notification:** Alert all stakeholders of upcoming rotation
2. **Backup Verification:** Ensure current secrets are backed up
3. **Service Health Check:** Verify all services are functioning normally
4. **Rollback Plan:** Prepare immediate rollback procedures

**Rotation Execution:**
1. **Generate New Secret:** Create new version in Secret Manager
2. **Update References:** Point Cloud Run services to new version
3. **Grace Period:** Maintain old version for 1 hour for rollback
4. **Validation Testing:** Execute post-rotation verification
5. **Old Version Cleanup:** Disable/delete previous secret version

**Post-Rotation Verification:**

**Immediate Checks (0-15 minutes):**
- [ ] **Service Health:** All Cloud Run services responding to health checks
- [ ] **API Functionality:** Test each API endpoint with new secrets
- [ ] **Authentication:** Verify Firebase and external service auth working
- [ ] **Webhook Processing:** Test WhatsApp webhook with new verification secret

**Extended Validation (15-60 minutes):**
- [ ] **End-to-End Flows:** Complete user journeys working properly
- [ ] **External Integrations:** OpenAI and Vertex AI calls succeeding
- [ ] **Error Rate Monitoring:** No increase in application error rates
- [ ] **Performance Impact:** No degradation in response times

**Audit Trail Requirements:**
- [ ] **Access Logs:** Review Secret Manager access logs
- [ ] **Service Logs:** Check Cloud Run logs for authentication errors
- [ ] **Monitoring Alerts:** Verify no security alerts triggered
- [ ] **Compliance Documentation:** Update rotation records

**Emergency Rotation Process:**

**Secret Compromise Response:**
1. **Immediate Revocation:** Disable compromised secret within 5 minutes
2. **Impact Assessment:** Identify affected services and data
3. **Emergency Rotation:** Generate and deploy new secrets within 15 minutes
4. **Incident Documentation:** Record timeline and root cause
5. **Post-Incident Review:** Update procedures based on learnings

**Rollback Scenarios:**
- Service failures after rotation trigger automatic rollback
- Performance degradation beyond thresholds requires investigation
- Authentication failures require immediate secret validation
- External service rejections indicate secret format or permission issues

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
z`qa.