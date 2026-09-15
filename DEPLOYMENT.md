# Deployment guide

This project has two independently deployed parts:

1. **Frontend:** Vite/React single-page application, built to `dist/`.
2. **Contact and projects API:** ASP.NET Core and MongoDB Atlas service under `ProjectsApi/`.

The repository includes `vercel.json`, so **Vercel** is the recommended frontend
deployment. The contact and projects API should run as a separate **Render Web
Service**. This keeps the existing SPA and the long-running ASP.NET Core process
on hosting models that match their actual runtime needs.

## Prerequisites

- Node.js version required by the installed Vite release (20.19–20.x or 22.12+)
- npm and the committed `package-lock.json`
- Git repository access
- A Vercel account/project for the frontend, if using the included configuration
- A Render Web Service and MongoDB Atlas for the contact API

## Local production test

Run these commands from a clean clone before deploying:

```bash
npm ci
npm run lint
npm test
npm run build
npm run preview
dotnet test ProjectsApi.Tests
docker build -t ivan-stroi-api ProjectsApi
docker build -f ProjectsApi.Tests/Dockerfile -t ivan-stroi-api-tests .
```

`npm run build` performs TypeScript checking and emits the static site in `dist/`.
Vite uses hashed JS and CSS filenames; public source maps are not emitted.

## Environment variables

### Frontend build-time variables

All variables beginning with `VITE_` are visible in the browser. They must never
contain database credentials, private API keys, or other secrets.

| Variable | Required | Purpose | Visibility |
| --- | --- | --- | --- |
| `VITE_SITE_URL` | Yes | Canonical HTTPS frontend URL; enables canonical tags and sitemap generation. | Public |
| `VITE_CONTACT_FORM_ENDPOINT` | Yes | Full HTTPS endpoint for `POST /api/contact`. | Public |
| `VITE_PROJECTS_API_URL` | Optional | Full projects API base URL; if empty, it is derived from the contact endpoint origin. | Public |
| `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION` | Optional | Search Console ownership token. | Public |

Changing a `VITE_` variable requires a new frontend build and deployment.

### C# API variables

Configure these only in the API host's secret/environment settings. Do not add them
to the frontend project settings or Git.

| Variable | Required | Purpose | Visibility |
| --- | --- | --- | --- |
| `MONGODB_URI` | Yes | MongoDB Atlas connection string. | Secret |
| `MONGODB_DATABASE` | Yes | Database name used by the C# API. | Server-only |
| `ASPNETCORE_ENVIRONMENT` | Yes | Set to `Production`. | Server-only |
| `PORT` | Host-provided | Render injects the API listening port. | Server-only |
| `ALLOWED_ORIGINS` | Yes | Exact comma-separated HTTPS frontend origins allowed by CORS. | Server-only |
| `CONTACT_EMAIL_ENABLED` | Yes for notifications | Set to `true` only after the sender domain is verified. | Server-only |
| `RESEND_API_KEY` | Yes for notifications | Private Resend API key. | Secret |
| `CONTACT_EMAIL_FROM` | Yes for notifications | Sender on the verified domain. | Server-only |
| `CONTACT_EMAIL_TO` | Yes for notifications | Recipient of new inquiries. | Server-only |

## Frontend deployment (Vercel)

The existing `vercel.json` already provides SPA routing and conservative security
headers. If Vercel is used:

1. **MANUAL STEP:** Push the reviewed repository state to the intended production branch.
2. **MANUAL STEP:** Import that repository into Vercel.
3. Set install command to `npm ci`, build command to `npm run build`, and output
   directory to `dist` if Vercel does not detect Vite automatically.
4. Add the frontend variables above in the Production environment.
5. Deploy a preview first, then inspect routes, assets, and headers.
6. Promote the verified deployment to Production.

The `/services/:serviceName` routes, gallery, about, and contact pages rely on the
included `/* → /index.html` SPA rewrite. Test direct loads and refreshes after deployment.

## Contact and projects API deployment (Render Web Service)

The retired Node service has been removed after the C# deployment passed staging
and production verification. Deploy only the ASP.NET Core API as a separate Render
Web Service from this repository.

1. Set the service root directory to `ProjectsApi` and choose **Docker**. Render
   will use the committed `ProjectsApi/Dockerfile`.
2. Set the Render health check path to `/ready`. `/health` is the lightweight
   process liveness endpoint; `/ready` additionally verifies MongoDB readiness so a
   new release is not routed before Atlas is connected.
3. Set `MONGODB_URI`, `MONGODB_DATABASE`, `ASPNETCORE_ENVIRONMENT=Production`,
   and `ALLOWED_ORIGINS` in Render's environment.
4. **MANUAL STEP:** In MongoDB Atlas, permit only the deployed API environment as
   required and confirm the API's connection succeeds.
5. Set `VITE_CONTACT_FORM_ENDPOINT` to the final HTTPS API URL in the frontend,
   then rebuild and redeploy the frontend.
6. Verify `GET /health`, `GET /ready`, `GET /api/projects`, a valid contact request,
   validation errors, and rate limiting. The projects API is intentionally read-only.

## Contact email notifications

Contact requests are stored before an email is attempted, so a temporary email
provider problem cannot lose the inquiry or encourage duplicate submissions.
MongoDB records `notificationStatus`, `notificationAttempts`,
`notificationLastError` and `notifiedAt` for operational checks.

1. Create a Resend account owned by the client or explicitly delegated to the operator.
2. Add a sending subdomain such as `notifications.example.com`.
3. Add the exact SPF and DKIM records shown by Resend to the domain DNS.
4. Wait until the sending domain is verified.
5. Create a restricted sending API key and store it only in Render.
6. Configure `CONTACT_EMAIL_FROM`, for example
   `IVANOV STROI <zapitvane@notifications.example.com>`.
7. Set `CONTACT_EMAIL_TO` to the public client address from `src/data/contact.ts`.
8. Set `CONTACT_EMAIL_ENABLED=true`, redeploy and submit one authorized test request.

The API uses a unique idempotency key for each inquiry. Provider failures are
logged and recorded in MongoDB while the frontend still confirms that the inquiry
itself was safely accepted.

The obsolete SQL Server project, EF migrations and demo seed code have been removed.
There were no SQL Server records to migrate. New project records are stored in the
MongoDB `projects` collection.

Render provides managed HTTPS, logs, deploy health checks, Git-based deploys, and
dashboard rollback for this stateless API. No persistent local filesystem, worker,
WebSocket, or scheduled-job support is required by the current implementation.
See [Render Web Services](https://render.com/docs/web-services),
[health checks](https://render.com/docs/health-checks), and
[rollbacks](https://render.com/docs/rollbacks).

## Custom domain, DNS, and HTTPS

No domain is configured in this repository.

1. **MANUAL STEP:** Add the actual domain in the frontend hosting provider.
2. **MANUAL STEP:** Choose one canonical host — apex or `www` — in the provider.
   Redirect the other host to it over HTTPS.
3. **MANUAL STEP:** Obtain the exact DNS records from the hosting provider dashboard.
   Do not use generic values from this document.

| Record | Host | Value | Purpose |
| --- | --- | --- | --- |
| Provider-specified record | TODO from provider | TODO from provider | Verifies/routes the apex domain |
| Provider-specified record | TODO from provider | TODO from provider | Verifies/routes the `www` host if used |
| Provider-provided TXT record | TODO from provider | TODO from provider | Optional domain verification |

4. **MANUAL STEP:** Wait for DNS verification and automatic SSL certificate issuance.
5. **MANUAL STEP:** Confirm HTTP redirects to the chosen HTTPS canonical host.
6. Set `VITE_SITE_URL` to that exact canonical HTTPS URL and deploy again.

The host should manage certificate renewal. Do not enable HSTS until the final
HTTPS domain and redirects have been verified in production.

## Caching and security

- Keep hosting compression enabled.
- Keep the host's immutable caching for Vite's hashed `assets/*` files.
- Avoid an overly long cache for `index.html` so deployments become visible promptly.
- Cloudinary already delivers image assets via its CDN.
- The included Vercel headers add `nosniff`, referrer policy, clickjacking
  protection, and a restricted permissions policy.
- Add a Content-Security-Policy only after the final API host is known; it must
  allow the production API, `res.cloudinary.com`, and Google Maps.

## First production smoke test

### Public pages

- [ ] `/`
- [ ] `/gallery`
- [ ] `/about-us`
- [ ] `/contact-us`
- [ ] Every `/services/<service-slug>` URL
- [ ] Direct-load and refresh each route
- [ ] Mobile and desktop navigation

### Functionality

- [ ] Contact form success, validation, timeout, and rate-limit states
- [ ] Phone, email, and external Google Maps links
- [ ] Cloudinary images and Google Maps embed
- [ ] No browser-console errors or failed required network requests

### SEO and platform

- [ ] `https://<canonical-host>/robots.txt`
- [ ] `https://<canonical-host>/sitemap.xml`
- [ ] Canonical, Open Graph, and structured-data URLs use the chosen host
- [ ] HTTP redirects to canonical HTTPS host
- [ ] Unknown URLs return custom UI **and HTTP 404**
- [ ] Hosting headers and compression are present

### Performance

- [ ] Run Lighthouse against the real production domain
- [ ] Check Core Web Vitals, caching, and compression on mobile and desktop

## Rollback

### Frontend

With Vercel, use the dashboard to promote the previous verified deployment. Keep
preview deployments until the production smoke test passes.

### Contact API

Use Render's previous successful deployment rollback or redeploy the last known
good Git revision. Keep the previous release available until health/readiness and
contact-form tests pass.

Do not roll back by deleting databases, DNS records, or production resources.
