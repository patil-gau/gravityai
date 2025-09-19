# Contributing to Gravity AI

This guide outlines the development workflow, coding standards, and practices for contributing to the Gravity AI platform.

## Development Environment Setup

### Prerequisites

- **Node.js** 18+ (use `nvm use` to match `.nvmrc`)
- **npm** 9+
- **Docker** and Docker Compose
- **Terraform** 1.0+ (for infrastructure changes)
- **Git** with SSH key configured

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone git@github.com:gravity-ai/gravity-ai.git
   cd gravity-ai
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.template .env
   # Edit .env with your local configuration
   ```

4. **Start development environment:**
   ```bash
   docker-compose up -d
   ```

## Naming Conventions

### Files and Directories

- **Files:** Use kebab-case for regular files (`user-service.ts`)
- **Components:** Use PascalCase for React components (`UserProfile.tsx`)
- **Directories:** Use kebab-case (`user-management/`)
- **Constants:** Use SCREAMING_SNAKE_CASE (`API_BASE_URL`)

### Code Naming

**TypeScript/JavaScript:**
- **Variables/Functions:** camelCase (`getUserData`, `isUserActive`)
- **Classes:** PascalCase (`UserService`, `ApiClient`)
- **Interfaces:** PascalCase with `I` prefix optional (`User` or `IUser`)
- **Types:** PascalCase (`UserRole`, `ApiResponse`)
- **Enums:** PascalCase (`UserStatus`, `LogLevel`)

**Database/Infrastructure:**
- **Tables:** snake_case (`user_profiles`, `api_keys`)
- **Columns:** snake_case (`created_at`, `user_id`)
- **Resources:** kebab-case with environment prefix (`dev-gravity-ai-vpc`)

### Git Naming

**Branches:**
- **Feature:** `feature/short-description` (`feature/user-authentication`)
- **Bugfix:** `bugfix/issue-description` (`bugfix/login-error-handling`)
- **Hotfix:** `hotfix/critical-issue` (`hotfix/security-patch`)
- **Infrastructure:** `infra/description` (`infra/add-monitoring`)

## Commit Message Style

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks
- `perf` - Performance improvements
- `ci` - CI/CD changes
- `infra` - Infrastructure changes

### Examples

```bash
# Feature
feat(api): add user authentication endpoint

# Bug fix
fix(web): resolve login form validation error

# Documentation
docs: update API integration guide

# Infrastructure
infra(terraform): add production ECS cluster

# Breaking change
feat(api)!: migrate to v2 authentication system

BREAKING CHANGE: The authentication endpoint now requires API key in header
```

### Scope Guidelines

- `api` - Backend API changes
- `web` - Frontend application changes
- `infra` - Infrastructure/deployment changes
- `ci` - CI/CD pipeline changes
- `deps` - Dependency updates

## Environments

### Development (`dev`)
- **Purpose:** Local development and testing
- **URL:** http://localhost:3000 (web), http://localhost:8000 (api)
- **Database:** Local Docker containers
- **Deployment:** Automatic on merge to `develop` branch

### Staging (`staging`)
- **Purpose:** Pre-production testing and QA
- **URL:** https://staging.gravity-ai.com
- **Database:** Staging RDS instances
- **Deployment:** Manual deployment from `staging` branch
- **Access:** Internal team and stakeholders

### Production (`prod`)
- **Purpose:** Live production environment
- **URL:** https://gravity-ai.com
- **Database:** Production RDS with backups
- **Deployment:** Manual deployment from `main` branch with approval
- **Access:** End users

## Workflow Process

### Branch Strategy

1. **Main branches:**
   - `main` - Production-ready code
   - `develop` - Integration branch for features

2. **Supporting branches:**
   - `feature/*` - New features
   - `bugfix/*` - Bug fixes
   - `hotfix/*` - Critical production fixes
   - `release/*` - Release preparation

### Development Workflow

1. **Create feature branch:**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make changes and commit:**
   ```bash
   # Make your changes
   npm run lint
   npm run test
   npm run build
   
   git add .
   git commit -m "feat(scope): description of change"
   ```

3. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   # Create Pull Request through GitHub/GitLab
   ```

4. **Code review and merge:**
   - Address review feedback
   - Ensure all checks pass
   - Squash and merge to `develop`

### Release Process

1. **Create release branch:**
   ```bash
   git checkout develop
   git checkout -b release/v1.2.0
   ```

2. **Prepare release:**
   - Update version numbers
   - Update CHANGELOG.md
   - Final testing

3. **Deploy to staging:**
   ```bash
   # Deploy to staging for final validation
   ```

4. **Merge to main:**
   ```bash
   git checkout main
   git merge release/v1.2.0
   git tag v1.2.0
   git push origin main --tags
   ```

5. **Deploy to production:**
   ```bash
   # Production deployment with approval process
   ```

## Code Quality Standards

### TypeScript

- **Strict mode:** Always enabled
- **Type coverage:** Aim for 100% typed code
- **No `any` types:** Use proper typing or `unknown`
- **Interface segregation:** Keep interfaces focused and small

### Testing

**Test Requirements:**
- **Unit tests:** All business logic functions
- **Integration tests:** API endpoints and database interactions
- **E2E tests:** Critical user workflows
- **Coverage:** Minimum 80% code coverage

**Test Naming:**
```typescript
describe('UserService', () => {
  describe('getUserById', () => {
    it('should return user when valid ID provided', () => {
      // Test implementation
    })
    
    it('should throw error when user not found', () => {
      // Test implementation
    })
  })
})
```

### Linting and Formatting

**Automated checks:**
- **ESLint:** Code quality and consistency
- **Prettier:** Code formatting
- **TypeScript:** Type checking
- **Pre-commit hooks:** Run checks before commits

**Configuration:**
```bash
# Run all checks
npm run lint
npm run type-check
npm run test

# Auto-fix formatting
npm run lint:fix
```

## Documentation

### README Requirements

Each major component must have a README containing:
- Purpose and description
- Prerequisites and setup instructions
- Available scripts and commands
- Environment variables
- API documentation (for services)
- Deployment instructions

### Code Documentation

- **JSDoc comments** for all public functions
- **Inline comments** for complex business logic
- **Type definitions** with descriptions
- **API documentation** with examples

### Changelog

Maintain `CHANGELOG.md` following [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [1.2.0] - 2024-01-15

### Added
- User authentication system
- API rate limiting

### Changed
- Updated login UI design

### Fixed
- Memory leak in data processing

### Removed
- Deprecated v1 endpoints
```

## Security Guidelines

### Code Security

- **Input validation:** Validate all user inputs
- **SQL injection:** Use parameterized queries
- **XSS prevention:** Sanitize user content
- **Authentication:** Implement proper session management
- **Authorization:** Use role-based access control

### Secrets Management

- **Never commit secrets** to version control
- **Use environment variables** for configuration
- **AWS Systems Manager** for production secrets
- **Rotate credentials** regularly

### Dependencies

- **Regular updates:** Keep dependencies current
- **Security scanning:** Run `npm audit` regularly
- **Minimal dependencies:** Only add what's necessary
- **License compliance:** Verify license compatibility

## Performance Guidelines

### Web Frontend

- **Bundle size:** Monitor and optimize bundle size
- **Loading performance:** Implement code splitting
- **SEO:** Ensure proper meta tags and structured data
- **Accessibility:** Follow WCAG guidelines

### API Service

- **Response times:** Target < 200ms for most endpoints
- **Database queries:** Optimize N+1 queries
- **Caching:** Implement appropriate caching strategies
- **Rate limiting:** Protect against abuse

### Infrastructure

- **Auto-scaling:** Configure based on metrics
- **Monitoring:** Set up comprehensive monitoring
- **Cost optimization:** Use appropriate instance types
- **Backup strategies:** Implement automated backups

## Getting Help

### Resources

- **Team Slack:** #gravity-ai-dev channel
- **Documentation:** Internal wiki and this repository
- **Code reviews:** Request reviews for complex changes
- **Architecture decisions:** Discuss in team meetings

### Common Issues

1. **Environment setup:** Check Docker logs and port conflicts
2. **Build failures:** Verify Node.js version and dependencies
3. **Test failures:** Ensure database is running and seeded
4. **Deployment issues:** Check environment variables and permissions

---

**Questions?** Reach out to the team lead or create an issue in the repository.
