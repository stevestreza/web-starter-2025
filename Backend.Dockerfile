# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Copy source code and prisma schema
COPY . .

# Install dependencies
RUN pnpm install --no-hoist --frozen-lockfile

# Generate Prisma client
WORKDIR /app/backend

# Build the application
RUN pnpm db:generate
RUN pnpm build

# Production stage
FROM node:22-alpine

RUN apk add openssl

RUN mkdir -p /app/backend
WORKDIR /app/backend

# Copy package files
COPY backend/package.json pnpm-lock.yaml ./

# Copy built files and Prisma schema
COPY --from=builder /app/node_modules/ /app/node_modules
COPY --from=builder /app/backend/node_modules/ ./node_modules
COPY --from=builder /app/backend/dist/ ./dist
COPY --from=builder /app/backend/prisma/ ./prisma
# COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

RUN npx pnpm install corepack prisma

# Set environment variables
ENV NODE_ENV=production

# Expose port
EXPOSE 3000

# Start the application
CMD ["node", "dist/app.js"]
