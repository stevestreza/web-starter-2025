# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml tsconfig.base.json ./
COPY frontend/package.json ./frontend/

# Copy source code
COPY ./frontend ./frontend/

# Install dependencies
RUN npm install -g pnpm typescript && pnpm install --no-hoist --frozen-lockfile

# Build the application
WORKDIR /app/frontend
RUN ls node_modules/@types
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy nginx configuration
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
