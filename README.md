# IVANOV STROI

Production website for a construction and renovation company serving Sofia and
the surrounding area.

## Architecture

- `src/` — React 19, TypeScript, Vite and Tailwind CSS frontend
- `ProjectsApi/` — modular ASP.NET Core API
- `ProjectsApi.Tests/` — backend unit and endpoint tests
- MongoDB Atlas — optional API-managed projects
- Vercel — frontend hosting
- Render — Docker-hosted C# API

The former Node.js API has been retired. The only production backend is
`ProjectsApi/`.

## Public API

- `GET /api/projects` — returns the public projects collection
- `GET /health` — process liveness
- `GET /ready` — MongoDB readiness

The projects API is intentionally read-only. There is no public administration
API or admin key.

## Local development

Requirements:

- Node.js 20.19–20.x or 22.12+
- .NET SDK matching `ProjectsApi/ProjectsApi.csproj`
- a MongoDB connection for API development

Frontend:

```bash
npm ci
npm run dev
```

API:

```bash
dotnet run --project ProjectsApi
```

Copy `.env.example` to an untracked frontend environment file and
`ProjectsApi/.env.example` to an untracked API environment file. Never commit
real credentials.

## Environment variables

Frontend build-time variables are public:

- `VITE_SITE_URL` — canonical HTTPS website URL
- `VITE_PROJECTS_API_URL` — optional read-only projects endpoint
- `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION` — optional ownership token

API variables are server-only:

- `MONGODB_URI`
- `MONGODB_DATABASE`
- `ALLOWED_ORIGINS`
- `ASPNETCORE_ENVIRONMENT=Production`

## Quality checks

```bash
npm run lint
npm test
npm run build
dotnet test ProjectsApi.Tests
docker build -t ivan-stroi-api ProjectsApi
docker build -f ProjectsApi.Tests/Dockerfile -t ivan-stroi-api-tests .
```

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete Vercel, Render, custom-domain
and smoke-test procedure. See [PRODUCTION.md](PRODUCTION.md) for the final release
and client handover checklist.

## Ownership

This repository contains proprietary project code. Hosting accounts, domain,
content, legal notices and production credentials must be owned or explicitly
delegated by the client.
