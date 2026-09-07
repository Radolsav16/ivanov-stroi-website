# Production deployment

## Requirements

- Node.js 20.19–20.x or 22.12+
- npm with the lockfile from this repository
- A static frontend host with SPA routing (the included configuration targets Vercel)
- A separately deployed Node.js environment for the contact API and MongoDB Atlas

## Required environment configuration

### Frontend

Copy `.env.example` to a local, untracked `.env` file and set the values supplied
by the deployment environment.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | Yes | Absolute public HTTPS URL. Enables canonical URLs and sitemap generation. |
| `VITE_CONTACT_FORM_ENDPOINT` | Recommended | Absolute HTTPS API endpoint for contact form requests. Omit only to use the email-client fallback. |
| `VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION` | Optional | Google Search Console ownership token. |

All `VITE_` variables are public build-time configuration. Never place database
credentials, API secrets, private keys, or Cloudinary API secrets in them.

### Contact API

Copy `server/.env.example` to `server/.env` in the API runtime only.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | Yes | Private MongoDB Atlas connection string. |
| `PORT` | Depends on host | Port exposed by the Node.js process. |
| `ALLOWED_ORIGINS` | Yes | Exact comma-separated frontend HTTPS origins allowed by CORS. |
| `TRUST_PROXY` | Depends on host | Set to `true` only behind one trusted reverse proxy. |
| `DNS_SERVERS` | Optional | DNS resolvers for environments with Atlas SRV lookup issues. |

Set `NODE_ENV=production` in the API runtime. Keep this file out of Git.

## Local production check

```bash
npm ci
npm run lint
npm test
npm run server:test
npm run build
npm run preview
```

Test the frontend with an HTTPS contact endpoint or without
`VITE_CONTACT_FORM_ENDPOINT`; a production build intentionally rejects configured
HTTP or localhost API endpoints.

## Hosting configuration

The included `vercel.json` provides SPA routing and conservative headers:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- a restricted `Permissions-Policy`

Configure HTTPS and domain redirects in the hosting provider. Enable compression
and leave hashed static assets on the provider's immutable cache policy. Do not add
a Content-Security-Policy without first including the final contact API endpoint,
Cloudinary, and Google Maps in the policy.

The frontend host must not expose backend environment variables. Configure the API
as a separate service and add the final frontend domain to `ALLOWED_ORIGINS`.

## External services

- **Cloudinary:** only public image delivery URLs are used by the frontend. No
  upload preset, API key, or API secret is stored in this repository.
- **Google Maps:** a lazy-loaded Sofia embed is used on the contacts page.
- **MongoDB Atlas:** used only by the contact API. Allow the API host's egress IP
  in Atlas and keep the connection string in the API environment.
- **Google Search Console:** submit `/sitemap.xml` only after `VITE_SITE_URL` is
  configured and the production build has generated it.

## Release checklist

### Environment

- [ ] Public frontend URL is set in `VITE_SITE_URL`.
- [ ] Contact API endpoint is HTTPS, not localhost, and configured when used.
- [ ] API has `MONGODB_URI` and exact production `ALLOWED_ORIGINS`.
- [ ] No `.env` or credential files are tracked by Git.

### Build and application

- [ ] `npm run lint`, `npm test`, `npm run server:test`, and `npm run build` pass.
- [ ] Production preview has no console errors, broken routes, or broken images.
- [ ] Contact form success, failure, and rate-limit states are tested.
- [ ] Health (`/health`) and readiness (`/ready`) endpoints are checked on the API.
- [ ] Unknown URLs return an HTTP 404 at the hosting layer, not only the React 404 UI.

### Security and operations

- [ ] HTTPS and preferred-domain redirects are enabled by the host.
- [ ] Hosting security headers are confirmed in the deployed response.
- [ ] `npm audit --omit=dev` is reviewed before release.
- [ ] MongoDB Atlas permits only the deployed API environment as required.
- [ ] Backup, log retention, and error monitoring policies are defined by the operator.
