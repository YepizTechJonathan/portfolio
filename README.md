# Portfolio Site

Standard Hermes full-stack app for Jonathan's portfolio.

## Structure

```text
portfolio/
├── backend/
├── frontend/
├── docs/
├── scripts/
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.example
└── .github/workflows/
```

## Local development

```bash
./scripts/up-dev.sh
```

Direct dev URLs:

```text
Frontend: http://127.0.0.1:3000
Backend:  http://127.0.0.1:5000
```

Production is expected to run behind Pangolin, with Pangolin targeting:

```text
portfolio-prod-web:80
```
