# Docker Setup for CanadaGPT

This project includes Docker configuration for both development and production environments.

## Quick Start

### Production Build

```bash
# Build and run the production container
docker-compose up --build

# Or build manually
docker build -t canadagpt .
docker run -p 8080:8080 canadagpt
```

### Development Build

```bash
# Run development environment with hot reloading
docker-compose --profile dev up --build

# Or run manually
docker build -f Dockerfile.dev -t canadagpt-dev .
docker run -p 3000:3000 -v $(pwd):/app canadagpt-dev
```

## Docker Commands

### Build Images

```bash
# Production build
docker build -t canadagpt .

# Development build
docker build -f Dockerfile.dev -t canadagpt-dev .
```

### Run Containers

```bash
# Production
docker run -p 8080:8080 canadagpt

# Development (with volume mounting for hot reload)
docker run -p 3000:3000 -v $(pwd):/app canadagpt-dev
```

### Using Docker Compose

```bash
# Production
docker-compose up

# Development
docker-compose --profile dev up

# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

## Environment Variables

You can set environment variables in the `docker-compose.yml` file:

```yaml
environment:
  - NODE_ENV=production
  - PORT=8080
  - API_URL=http://your-api-url.com
```

## Health Checks

The production container includes health checks that verify the application is running:

```bash
# Check container health
docker ps

# View health check logs
docker inspect <container-id> | grep Health -A 10
```

## Multi-stage Build

The production Dockerfile uses a multi-stage build:

1. **Builder Stage**: Installs dependencies and builds the application
2. **Production Stage**: Creates a minimal runtime image with only production dependencies

This results in a smaller, more secure production image.

## Security Features

- Non-root user (`nextjs`) for running the application
- Minimal Alpine Linux base image
- Only production dependencies in final image
- Health checks for monitoring

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port mapping in `docker-compose.yml`
2. **Build fails**: Ensure all dependencies are in `package.json`
3. **Permission issues**: The container runs as non-root user

### Debug Commands

```bash
# View container logs
docker logs <container-id>

# Access container shell
docker exec -it <container-id> sh

# Check container resources
docker stats <container-id>
```

## Production Deployment

For production deployment, consider:

1. **Environment Variables**: Set production environment variables
2. **Reverse Proxy**: Use nginx or similar for SSL termination
3. **Monitoring**: Add logging and monitoring solutions
4. **Backup**: Implement database and file backups

Example production deployment:

```bash
# Build for production
docker build -t canadagpt:latest .

# Run with environment variables
docker run -d \
  -p 8080:8080 \
  -e NODE_ENV=production \
  -e API_URL=https://your-api.com \
  --name canadagpt \
  canadagpt:latest
``` 