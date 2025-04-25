# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Copy source code and prisma schema
COPY . .

RUN echo "honk"
# Install dependencies
RUN pnpm install --frozen-lockfile
RUN pnpm approve-builds argon2 && pnpm install --frozen-lockfile

# Generate Prisma client
WORKDIR /app/backend

# Build the application
RUN pnpm db:generate
RUN pnpm build

# Production stage
FROM node:22-alpine

RUN apk add openssl curl

RUN mkdir -p /app/backend
WORKDIR /app/backend

# Copy package files
COPY backend/package.json pnpm-lock.yaml ./

# Copy built files and Prisma schema
COPY --from=builder /app/node_modules/ /app/node_modules
COPY --from=builder /app/backend/node_modules/ ./node_modules
COPY --from=builder /app/backend/dist/ ./dist
COPY --from=builder /app/backend/prisma/ ./prisma

RUN rm -rf node_modules backend/node_modules && npx pnpm install corepack prisma argon2
RUN npx pnpm install

# Set environment variables
ENV NODE_ENV=production

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
