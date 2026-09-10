# IVANOV STROI

Production website for a construction company. The system consists of a React/Vite frontend deployed to Vercel and a modular ASP.NET Core API deployed to Render with MongoDB Atlas.

## Architecture

```text
src/
├── components/       # page sections and layout components
├── features/
│   ├── contact/      # form UI, validation and API integration
│   └── projects/     # projects loading and static fallback
├── pages/            # route-level pages
└── shared/
    ├── api/          # HTTP client, timeout and normalized errors
    └── ui/           # reusable visual primitives

ProjectsApi/
├── Common/           # error handling, headers and API options
├── Features/
│   ├── Contacts/     # endpoint, validation, service and repository
│   └── Projects/     # read-only endpoint, service and repository
└── Infrastructure/
    └── MongoDb/      # connection, readiness and indexes
```

The public API surface is intentionally limited to:

- `POST /api/contact`
- `GET /api/projects`
- `GET /health`
- `GET /ready`

The older Node API under `server/` is a temporary rollback implementation. Keep it only until the C# staging and production smoke tests pass; do not run both APIs as production writers.

## Local development

Requirements:

- Node.js `^20.19.0` or `>=22.12.0`
- npm
- .NET SDK 10
- MongoDB Atlas access

Install and start the frontend:

```bash
npm ci
npm run dev
```

Copy `.env.example` to `.env` and set the frontend URLs. Copy `ProjectsApi/.env.example` values into the API process environment, then start the API:

```bash
dotnet run --project ProjectsApi
```

For local development, use `VITE_CONTACT_FORM_ENDPOINT=http://localhost:8080/api/contact` and `ALLOWED_ORIGINS=http://localhost:5173`.

## Environment variables

Frontend values are public and embedded at build time:

- `VITE_SITE_URL` — canonical production frontend URL
- `VITE_CONTACT_FORM_ENDPOINT` — full contact endpoint URL
- `VITE_PROJECTS_API_URL` — optional projects endpoint; otherwise derived from the contact API origin
- `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION` — optional verification token

API values stay server-side:

- `MONGODB_URI`
- `MONGODB_DATABASE`
- `ALLOWED_ORIGINS`
- `ASPNETCORE_ENVIRONMENT=Production`
- `PORT` — normally supplied by Render

Never commit real credentials or local `.env` files.

## Quality checks

```bash
npm run lint
npx tsc -b
npm test
npm run build
dotnet test ProjectsApi.Tests
docker build -t ivan-stroi-api ProjectsApi
```

The API Docker image expects Render's service root to be `ProjectsApi`. Vercel continues to build the repository root with `npm run build` and publish `dist`.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the complete environment, staging, CORS, DNS, HTTPS, smoke-test and rollback procedure.

## License

This is proprietary software. Copying, redistribution or commercial reuse is not permitted without the project owner's authorization.
