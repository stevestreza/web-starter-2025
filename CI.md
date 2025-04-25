# Continuous Integration Setup

This project uses both GitHub Actions and Drone CI for continuous integration. Both configurations build the Docker images and perform basic health checks to ensure the application works correctly.

## GitHub Actions

The GitHub Actions workflow is defined in `.github/workflows/ci.yml` and performs the following steps:

1. Checks out the code
2. Sets up Docker Buildx
3. Builds the frontend Docker image
4. Builds the backend Docker image
5. Creates a test network for container communication
6. Starts a PostgreSQL container for testing
7. Starts the backend container and verifies it responds correctly to health checks
8. Starts the frontend container and verifies it responds with a 200 status code

The workflow is triggered on pushes and pull requests to the main, master, and develop branches.

## Drone CI

The Drone CI pipeline is defined in `.drone.yml` and performs similar steps:

1. Builds the frontend Docker image
2. Builds the backend Docker image
3. Creates a test network and starts containers for PostgreSQL, the backend, and the frontend
4. Verifies that both the backend and frontend respond correctly to health checks

The pipeline is triggered on pushes and pull requests to the main, master, and develop branches.

## Health Checks

- The backend exposes a `/api/health` endpoint that returns a JSON response with a status of "ok"
- The frontend is verified by checking for a 200 HTTP status code when accessing the root URL

## Running Locally

You can test the CI process locally by building and running the Docker images:

```bash
# Build images
docker build -t web-starter-frontend:latest -f Frontend.Dockerfile .
docker build -t web-starter-backend:latest -f Backend.Dockerfile .

# Create network
docker network create test-network

# Run containers
docker run -d --name postgres-test --network test-network -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=webstarter postgres:16-alpine
docker run -d --name backend-test --network test-network -e DATABASE_URL=postgresql://postgres:postgres@postgres-test:5432/webstarter -e NODE_ENV=production -p 3000:3000 web-starter-backend:latest
docker run -d --name frontend-test --network test-network -p 8080:80 web-starter-frontend:latest

# Test health endpoints
curl http://localhost:3000/api/health
curl -I http://localhost:8080
``` 