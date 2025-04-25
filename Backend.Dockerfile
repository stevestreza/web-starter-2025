# Build stage
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY . .

# Install dependencies
RUN apk add openssl curl && npm install -g pnpm && pnpm install --frozen-lockfile && pnpm -F backend db:generate && pnpm -F backend build

# Generate Prisma client
WORKDIR /app/backend

# Set environment variables
ENV NODE_ENV=production

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
