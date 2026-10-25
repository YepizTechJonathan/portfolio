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

Direct dev URLs (built like production: nginx serving the Vite build, the API on 8080 inside):

```text
Frontend: http://127.0.0.1:8088
Backend:  http://127.0.0.1:5000
```

For hot reload, keep the dev API running and start Vite in `frontend/` (`npm run dev`, port 3000);
it proxies `/api` to `http://localhost:5000`.

## Dev site (Web Factory)

A push to `dev` is handed to Forgejo (`yepiztech/portfolio` on Kihon). Its
`.forgejo/workflows/deploy-dev.yml` builds the API and the frontend, then asks the Web Factory to
rebuild the dev containers on Kihon. The dev site is https://portfolio.yepiztech.dev (the frontend
joins the Web Factory's `dev-preview` network). Production only deploys from `main`.

Production is expected to run behind Pangolin, with Pangolin targeting:

```text
portfolio-prod-web:80
```
