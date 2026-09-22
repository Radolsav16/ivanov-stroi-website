# Production release checklist

The production architecture is a React/Vite frontend on Vercel and one ASP.NET
Core API on Render backed by MongoDB Atlas.

## 1. Build and automated checks

- [ ] `npm ci`
- [ ] `npm run lint`
- [ ] `npm test`
- [ ] `npm run build`
- [ ] `dotnet test ProjectsApi.Tests`
- [ ] `docker build -t ivan-stroi-api ProjectsApi`
- [ ] `npm audit --omit=dev` reviewed

## 2. Production configuration

### Vercel

- [ ] `VITE_SITE_URL` is the final canonical HTTPS domain
- [ ] `VITE_PROJECTS_API_URL` is empty (static gallery) or the explicit Render projects URL
- [ ] no secrets are stored in a `VITE_` variable

### Render

- [ ] service root is `ProjectsApi`
- [ ] deployment uses `ProjectsApi/Dockerfile`
- [ ] health check path is `/ready`
- [ ] `MONGODB_URI` and `MONGODB_DATABASE` are configured
- [ ] `ASPNETCORE_ENVIRONMENT=Production`
- [ ] `ALLOWED_ORIGINS` contains only the active frontend origins

### MongoDB Atlas

- [ ] a dedicated least-privilege database user is used
- [ ] network access is restricted to the deployed API requirements
- [ ] backups and retention are configured by the account owner
- [ ] production credentials are not committed or shared in documents

## 3. Domain and HTTPS

- [ ] custom domain is owned by the client
- [ ] apex and `www` are added to Vercel
- [ ] one host is canonical and the other redirects to it
- [ ] DNS is verified
- [ ] Vercel SSL certificate is active and renews automatically
- [ ] HTTP redirects to the canonical HTTPS URL
- [ ] `VITE_SITE_URL` and Render `ALLOWED_ORIGINS` were updated after the domain change
- [ ] the frontend and API were redeployed after environment changes

## 4. Production smoke test

- [ ] `/`, `/gallery`, `/about-us`, `/contact-us` and every service route load directly
- [ ] desktop and mobile navigation work
- [ ] phone, email and Google Maps links work
- [ ] required images and fonts load without console errors
- [ ] `/health`, `/ready` and `/api/projects` return valid responses
- [ ] CORS rejects an unapproved origin
- [ ] `robots.txt` and `sitemap.xml` use the final domain
- [ ] Lighthouse and Core Web Vitals are reviewed on the final domain

## 5. Privacy and legal content

The public site currently offers direct telephone and email links only. It does
not expose a contact form or a write API for inquiries. A form must not be
reintroduced until the controller and the processing rules are documented.

- [ ] privacy notice identifies the data controller
- [ ] purposes and legal basis are stated
- [ ] retention period or retention criteria are stated
- [ ] processors and international transfers are described where applicable
- [ ] data-subject rights and a contact channel are stated
- [ ] Google Maps is consent-gated or its loading is covered by the approved policy
- [ ] analytics or advertising scripts are not added without an appropriate consent flow
- [ ] company identity and public contact information are approved by the client
- [ ] the provider information required for the public website is approved
- [ ] the legal/tax status for regularly offered paid services is confirmed by a qualified professional
- [ ] qualifications and permitted scope for electrical and regulated construction work are documented

Use `docs/LEGAL-CONTENT-INPUTS.md` to collect the information required from the
client. Legal text should be reviewed by a qualified Bulgarian professional.

## 6. Search and launch

- [ ] a Google Search Console Domain property is verified through DNS
- [ ] the final `/sitemap.xml` is submitted
- [ ] the home page and important service pages are inspected and indexing requested
- [ ] canonical, Open Graph and structured-data URLs use the final domain
- [ ] search indexing is monitored after launch

## 7. Client handover

- [ ] client gives written acceptance of design, text and functionality
- [ ] ownership and access are documented for domain, Vercel, Render, Atlas, Cloudinary and GitHub
- [ ] recovery methods and two-factor authentication belong to the correct owner
- [ ] temporary or shared credentials are rotated
- [ ] recurring hosting costs and billing owner are documented
- [ ] maintenance, backups, incident response and future changes have an agreed owner
- [ ] a final release tag or commit is recorded

The project is complete only after the required items above are either checked or
explicitly accepted as a documented client responsibility.
