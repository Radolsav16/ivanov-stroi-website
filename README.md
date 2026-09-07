# 🏗️ IVANOV STROI Website

Modern, responsive and performance-focused website developed for a construction company.

The project is designed to present the company's services, completed projects and expertise in a professional and trustworthy way while providing a fast, accessible and intuitive experience across desktop, tablet and mobile devices.

---

## ✨ Features

* 🏠 Modern and professional homepage
* 🛠️ Dedicated service pages
* 🏗️ Construction and renovation services presentation
* 📸 Project / portfolio showcase
* 📱 Fully responsive design
* ⚡ Performance optimized
* 🔍 SEO-friendly structure
* 🖼️ Optimized image delivery
* 🌐 Responsive navigation
* 📞 Contact and inquiry sections
* 🎨 Modern UI with consistent visual language
* ♿ Accessibility-conscious components
* 🔄 Reusable and maintainable components
* 📐 Mobile-first responsive layouts
* 🚀 Production-ready architecture

---

## 🧱 Main Sections

### Home

The homepage provides a quick overview of the company, its main services and key advantages.

Typical sections include:

* Hero section
* Company introduction
* Main services
* Why choose us
* Featured projects
* Call-to-action sections
* Contact information

---

### Services

The website provides dedicated pages for individual services.

Each service page can contain:

* Service hero section
* Service description
* Benefits
* Process / workflow
* Related projects
* Call-to-action
* Contact section

---


### Contact

The contact section is designed to make it easy for potential customers to get in touch.

Possible contact methods:

* Phone
* Email
* Contact form
* Social media
* Business location

---

# 🛠️ Tech Stack

## Frontend

* **React**
* **TypeScript**
* **Tailwind CSS**
* **Vite**

## UI / Styling

* Tailwind CSS
* Responsive CSS
* Custom reusable components
* Modern animations and transitions

## Images & Media

* Optimized responsive images
* WebP / AVIF where supported
* Lazy loading for below-the-fold images
* Cloud-based image delivery where applicable

## Development

* Git
* ESLint
* Vite
* TypeScript

---


```text
src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── navigation/
│   └── ui/
│
├── sections/
│   ├── home/
│   ├── services/
│   ├── projects/
│   └── contact/
│
├── pages/
│   ├── Home/
│   ├── Services/
│   ├── Projects/
│   └── Contact/
│
├── data/
│   ├── services/
│   └── projects/
│
├── hooks/
│
├── utils/
│
├── types/
│
├── layouts/
│
├── App.tsx
└── main.tsx
```

> The exact structure may vary depending on the current implementation.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm / yarn / pnpm
* Git

Recommended Node.js version:

```text
Node.js 20+
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd <project-name>
```

Install dependencies:

```bash
npm install
```

---

## Development

Start the local development server:

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

# 🏭 Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Before deploying, make sure the production build completes successfully and that there are no TypeScript, ESLint or runtime errors.

---

# ⚡ Performance

Performance is an important part of the project.

The website should follow modern performance best practices.

### Images

Images should be:

* Properly compressed
* Served in modern formats such as WebP or AVIF
* Resized according to their rendered dimensions
* Lazy-loaded when they are outside the initial viewport
* Loaded with appropriate responsive sizes

Example:

```html
<img
  src="/images/project.webp"
  alt="Modern house construction project"
  loading="lazy"
  decoding="async"
/>
```

Hero and above-the-fold images should generally **not** use lazy loading.

---

## JavaScript Optimization

The project should avoid unnecessarily large JavaScript bundles.

Recommended practices:

* Code splitting
* Lazy loading routes
* Dynamic imports
* Removing unused dependencies
* Avoiding unnecessary libraries
* Tree-shaking
* Keeping components focused and reusable

Example:

```tsx
const ServicesPage = lazy(() => import('./pages/Services'));
```

---

# 🔍 SEO

The website is intended to be optimized for search engines.

Important SEO considerations include:

* Unique page titles
* Meta descriptions
* Semantic HTML
* Correct heading hierarchy
* Descriptive image `alt` attributes
* SEO-friendly URLs
* Open Graph metadata
* Structured data where appropriate
* Sitemap
* Robots.txt
* Canonical URLs

Example:

```html
<title>Construction & Renovation Services | Company Name</title>

<meta
  name="description"
  content="Professional construction, renovation and finishing services."
/>
```

---

# 📱 Responsive Design

The website follows a responsive, mobile-first approach.

The UI should work correctly on:

* 📱 Mobile phones
* 📲 Tablets
* 💻 Laptops
* 🖥️ Desktop monitors
* 🖥️ Large screens

Special attention should be given to:

* Navigation
* Typography
* Hero sections
* Image sizes
* Buttons
* Forms
* Cards
* Spacing
* Touch interactions

---

# 🎨 Design Principles

The visual identity focuses on:

### Trust

The website should communicate professionalism, reliability and experience.

### Quality

Large project imagery and carefully designed layouts should highlight the quality of the company's work.

### Simplicity

Users should quickly understand:

1. What the company does
2. What services are available
3. Why they should choose the company
4. How they can request a quote

### Conversion

Important actions should always be easy to find.

Examples:

```text
Request a Quote
Contact Us
Call Now
View Projects
Explore Services
```

---

# 🧩 Component Architecture

Components should be:

* Reusable
* Small and focused
* Easy to understand
* Properly typed
* Independent where possible

Avoid creating large components that contain unrelated responsibilities.

Prefer:

```tsx
<ServiceHero />
<ServiceOverview />
<ServiceBenefits />
<ServiceProcess />
<RelatedProjects />
<CallToAction />
```

over a single large service page component.

---

# ♿ Accessibility

Accessibility should be considered throughout the application.

Important practices:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Proper button elements
* Accessible forms
* Meaningful `alt` text
* Sufficient color contrast
* Proper heading hierarchy
* Avoiding unnecessary motion
* ARIA attributes only when necessary

---

# 🔐 Environment Variables

Environment-specific configuration should be stored in environment variables.

The frontend uses only public build-time settings. See [`.env.example`](.env.example)
for the canonical URL and optional contact API endpoint.

Do not commit sensitive credentials or private API keys to the repository.

Use:

```text
.env
.env.local
```

and keep sensitive files out of version control.

---

# 🧪 Quality Checks

Before creating a production release, verify:

```bash
npm run lint
npm test
npm run server:test
npm run build
```

Additionally verify:

* No console errors
* No broken images
* No broken links
* No layout shifts
* Mobile responsiveness
* Contact forms
* Navigation
* SEO metadata
* Accessibility
* Production environment variables

---



# 🚀 Deployment

The project can be deployed to modern frontend hosting platforms such as:

* Vercel
* Netlify
* Cloudflare Pages
* AWS
* Traditional VPS / server

The deployment environment should provide:

* HTTPS
* Proper caching
* Compression
* SPA routing support
* Environment variables
* Production build execution

---


Recommended workflow:

```text
main
 │
 ├── develop
 │    │
 │    ├── feature/homepage
 │    ├── feature/services
 │    ├── feature/projects
 │    └── fix/responsive-navigation
 │
 └── release
```

Use descriptive commit messages:

```text
feat: add bathroom renovation service page
fix: improve mobile navigation
perf: optimize project images
refactor: extract reusable service card
style: improve hero section spacing
docs: update project documentation
```

---


When adding new functionality:

1. Reuse existing components where possible.
2. Avoid duplicating UI logic.
3. Keep components focused.
4. Use TypeScript types instead of `any`.
5. Keep styling consistent with the existing design system.
6. Optimize images before adding them.
7. Consider mobile layouts from the beginning.
8. Avoid unnecessary dependencies.
9. Test the feature on multiple screen sizes.
10. Run lint and production build before committing.

---


# 📈 Future Improvements

Potential future improvements include:

* Online quote request system
* CMS integration
* Admin dashboard
* Project filtering
* Advanced project gallery
* Testimonials
* Google Maps integration
* Analytics
* Cookie consent management
* Multilingual support
* Blog / construction guides
* Schema.org structured data
* Advanced SEO
* Automated image optimization
* Progressive Web App capabilities

---



The goal of this project is not simply to create a visually attractive website.

It should provide a **fast, maintainable, scalable and conversion-focused digital presence** for the construction company.

Every new feature should be evaluated based on:

```text
Performance
    ↓
Accessibility
    ↓
Maintainability
    ↓
SEO
    ↓
User Experience
    ↓
Business Value
```

The final product should feel professional to customers while remaining clean and easy to maintain for developers.

---

# 📄 License

This project is proprietary software developed for the construction company.

Unauthorized copying, redistribution or commercial reuse of the source code is not permitted without permission from the project owner.

---

## Local contact API

Copy [`server/.env.example`](server/.env.example) to `server/.env`, add the
MongoDB Atlas connection string, and start both processes in separate terminals:

```bash
npm run server:dev
npm run dev
```

The frontend uses `VITE_CONTACT_FORM_ENDPOINT` from the root `.env`. For local
development it should be `http://localhost:3001/api/contact`, and
`ALLOWED_ORIGINS` in `server/.env` should be `http://localhost:5173`.

For production, set `VITE_SITE_URL` to the public frontend URL and set
`VITE_CONTACT_FORM_ENDPOINT` to the HTTPS contact API URL before building. Add
the same frontend URL to `ALLOWED_ORIGINS` in `server/.env`.

If Node reports `querySrv ECONNREFUSED` for a valid Atlas hostname on Windows,
set `DNS_SERVERS=1.1.1.1,8.8.8.8` in `server/.env`. This changes DNS only for the
backend process. Atlas must also allow the IP address of the machine or hosting
provider that runs this API.
