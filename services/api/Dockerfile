FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 apiuser
RUN adduser --system --uid 1001 apiuser

# Copy built application
COPY --from=builder --chown=apiuser:apiuser /app/dist ./dist
COPY --from=builder --chown=apiuser:apiuser /app/node_modules ./node_modules
COPY --from=builder --chown=apiuser:apiuser /app/package.json ./package.json

USER apiuser

EXPOSE 8000

ENV PORT=8000

CMD ["npm", "start"]
