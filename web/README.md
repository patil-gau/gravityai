# Gravity AI - Web Frontend

Next.js-based frontend application for the Gravity AI platform.

## Purpose

The web frontend provides the user interface for the Gravity AI platform, built with modern React patterns and Next.js for optimal performance and SEO.

## Technology Stack

- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** CSS Modules (ready for Tailwind/styled-components)
- **Testing:** Jest + React Testing Library
- **Build:** Next.js built-in bundler (Turbopack in dev)

## Development

### Prerequisites

- Node.js 18+ (see root `.nvmrc`)
- npm 9+

### Setup

```bash
# From the web/ directory
npm install
```

### Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run test` - Run Jest tests
- `npm run test:watch` - Run tests in watch mode

### Environment Variables

The web application uses the following environment variables:

- `API_URL` - Backend API URL (default: http://localhost:8000)
- `NODE_ENV` - Environment mode (development/production)

### Project Structure

```
web/
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # Reusable React components
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── Dockerfile          # Production container
├── next.config.js      # Next.js configuration
└── tsconfig.json       # TypeScript configuration
```

### Docker

Build and run the containerized application:

```bash
# Build
docker build -t gravity-ai-web .

# Run
docker run -p 3000:3000 -e API_URL=http://localhost:8000 gravity-ai-web
```

## Production Considerations

- Built with `output: 'standalone'` for optimal container deployment
- Security headers configured in `next.config.js`
- Structured logging for observability
- TypeScript strict mode enabled
- Performance optimizations with SWC compiler

## Firebase Setup

The web application integrates with Firebase for authentication, database, storage, and hosting services.

### Firebase Baseline Plan

**Project Configuration:**
- **Project ID:** `gravityai-64e30`
- **Region:** `asia-south1` (Mumbai)
- **Billing:** Spark Plan (free tier) with upgrade path to Blaze Plan for production

**Enabled Services:**
- **Authentication** - Email link, Google OAuth, Phone (SMS)
- **Firestore** - Native mode for real-time data
- **Cloud Storage** - File uploads and asset management
- **Hosting** - Static site deployment for web application

### Initial Configuration Steps

#### 1. Firebase Console Setup

**Authentication Configuration:**
1. Enable Email/Password provider with email link sign-in
2. Enable Google provider with OAuth 2.0
3. Enable Phone provider with SMS verification
4. Configure authorized domains for development and production
5. Set up email templates for verification and password reset

**Firestore Database:**
1. Create database in Native mode (not Datastore mode)
2. Start in test mode for development
3. Configure security rules for production deployment
4. Set up composite indexes as needed

**Cloud Storage:**
1. Create default storage bucket
2. Configure CORS rules for web access
3. Set up security rules for authenticated uploads
4. Configure lifecycle policies for file retention

**Hosting:**
1. Initialize hosting for the web application
2. Configure custom domain (if applicable)
3. Set up SSL certificates
4. Configure caching rules for static assets

#### 2. Local Environment Configuration

**Required Environment Variables (.env.local):**
```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=[from Firebase console]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=gravityai-64e30.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=gravityai-64e30
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=gravityai-64e30.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[from Firebase console]
NEXT_PUBLIC_FIREBASE_APP_ID=[from Firebase console]
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=[from Firebase console - Analytics]

# Authentication Configuration
NEXT_PUBLIC_AUTH_REDIRECT_URL=http://localhost:3000/auth/callback
NEXT_PUBLIC_AUTH_SIGN_OUT_URL=http://localhost:3000

# Storage Configuration
NEXT_PUBLIC_STORAGE_BASE_URL=https://firebasestorage.googleapis.com/v0/b/gravityai-64e30.appspot.com/o
```

**Firebase Console Configuration Values:**
- Web app registration with nickname "gravity-ai-web"
- API key restrictions for HTTP referrers
- OAuth consent screen configuration
- Phone authentication test numbers (development)
- Firestore security rules deployment
- Storage bucket CORS configuration
- Hosting site configuration

#### 3. Firebase SDK Integration

**Package Dependencies:**
- Add Firebase SDK to package.json
- Install Firebase Authentication, Firestore, and Storage modules
- Configure Firebase initialization in application

**Authentication Setup:**
- Initialize Firebase Auth with persistence
- Configure sign-in methods (email link, Google, phone)
- Set up authentication state listeners
- Implement protected route guards

**Firestore Integration:**
- Initialize Firestore with persistence
- Configure real-time listeners for data synchronization
- Implement offline support for mobile users
- Set up data validation and type safety

**Storage Configuration:**
- Initialize Cloud Storage with proper references
- Configure upload progress tracking
- Implement file type and size validation
- Set up thumbnail generation (future enhancement)

### Success Criteria & Testing

#### Authentication Tests
**Success Check: "Auth sign-in screen loads"**
- Sign-in component renders without errors
- All three authentication methods are visible
- Email input validation works correctly
- Google sign-in button redirects properly
- Phone number input accepts valid formats

**Verification Steps:**
1. Navigate to `/auth/signin` route
2. Verify email link option displays input field
3. Confirm Google sign-in button triggers OAuth flow
4. Test phone number input with country code selector
5. Check error handling for invalid inputs

#### Firestore Tests
**Success Check: "Firestore connection test"**
- Database connection establishes successfully
- Read operations return expected data structure
- Write operations save data correctly
- Real-time listeners receive updates
- Offline mode caches data properly

**Verification Steps:**
1. Open browser developer tools network tab
2. Monitor Firestore connection establishment
3. Test basic CRUD operations on test collection
4. Verify real-time updates across browser tabs
5. Test offline functionality by disabling network

#### Storage Tests
**Success Check: "Storage upload test"**
- File upload component accepts files
- Upload progress indicator displays correctly
- Files are stored in correct bucket structure
- Download URLs generate successfully
- File metadata is accessible

**Verification Steps:**
1. Select and upload a test image file
2. Monitor upload progress in UI
3. Verify file appears in Firebase Storage console
4. Test download URL accessibility
5. Confirm file metadata (size, type, timestamp)

#### Hosting Tests
**Success Check: "Hosting preview works"**
- Application builds successfully for deployment
- Static assets are served correctly
- Routing works for all application pages
- Firebase configuration loads properly
- Performance metrics meet baseline requirements

**Verification Steps:**
1. Run production build command
2. Deploy to Firebase Hosting preview channel
3. Test all major application routes
4. Verify Firebase services load correctly
5. Check Lighthouse performance scores

### Environment-Specific Configuration

**Development Environment:**
- Use Firebase emulators for local testing
- Configure test data and mock users
- Enable debug logging for Firebase services
- Use relaxed security rules for development

**Staging Environment:**
- Deploy to Firebase Hosting preview channel
- Use production Firebase project with staging data
- Implement moderate security rules
- Configure staging-specific authentication domains

**Production Environment:**
- Deploy to main Firebase Hosting channel
- Enable production security rules
- Configure custom domain and SSL
- Set up monitoring and alerting for Firebase services

## API Integration

The frontend communicates with the backend API service. API URL is configurable via environment variables and defaults to `http://localhost:8000` for development.
