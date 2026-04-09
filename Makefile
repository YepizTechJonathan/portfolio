.PHONY: dev dev-docker prod prod-down prod-logs prod-rebuild clean

# Local development (no Docker)
dev:
    @echo "Starting backend..."
    cd backend && dotnet run --urls http://localhost:5000 &
    @echo "Starting frontend..."
    cd frontend && npm run dev
    @echo "Dev running at http://localhost:3000"

# Docker development (hot reload)
dev-docker:
    docker compose -f docker-compose.dev.yml up --build

dev-docker-down:
    docker compose -f docker-compose.dev.yml down

# Production
prod:
    docker compose -f docker-compose.prod.yml up -d --build
    @echo ""
    @echo "Production running at http://localhost:8080"
    @echo "Point yepiz.tech DNS to this server and add a reverse proxy (Nginx/Caddy) for HTTPS."

prod-down:
    docker compose -f docker-compose.prod.yml down

prod-logs:
    docker compose -f docker-compose.prod.yml logs -f

prod-rebuild:
    docker compose -f docker-compose.prod.yml down
    docker compose -f docker-compose.prod.yml up -d --build

# Cleanup
clean:
    docker compose -f docker-compose.prod.yml down -v
    docker compose -f docker-compose.dev.yml down -v
    docker system prune -f
