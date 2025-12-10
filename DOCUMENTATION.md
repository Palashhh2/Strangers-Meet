## Strangers-Meet — Documentation

Last updated: 2025-12-10

### 1. Project Overview

Strangers-Meet is a lightweight AI-curated dinner matching web application built with Next.js (App Router), TypeScript, and Tailwind CSS. The app collects short applicant profiles, uses an AI model to evaluate each application, forms groups of compatible applicants, and schedules dinner times based on availability. The repo stores small JSON data files under `data/` for applicants, groups, and audit logs.

Primary goals:
- Help strangers meet in small, thoughtfully matched dinner groups.
- Use AI to evaluate compatibility and provide human-readable reasons for grouping.
- Keep the stack simple and self-hostable (file-based storage for initial prototyping).

### 2. High-level Workflow

1. Applicant visits the site and submits an application via the Apply form (`/apply`).
2. The server normalizes the payload (types, availability), calls an AI evaluation endpoint, and stores the record in `data/applicants.json` with `createdAt`.
3. Admins can review applicants via the admin dashboard (`/admin`). They can accept/reject or delete applicants; every admin action is recorded to the audit log (`data/audit.json`).
4. When the admin triggers group generation (GET `/api/group`), the backend loads accepted applicants, runs a grouping algorithm (compatibility scoring + greedy grouping), asks the AI for a short explanation per group, and computes a meeting time that fits all members.
5. Generated groups are saved to `data/groups.json` and are visible via `/matches` or `/admin/groups`.

### 3. Tech Stack

- Next.js 14 (App Router)
- React 18, TypeScript 5 (strict mode enabled)
- Tailwind CSS for styling
- Radix UI & shadcn/ui components for primitives
- Node fs-based JSON storage for prototypes (`data/*.json`)
- OpenAI `gpt-4-mini` for applicant evaluation and group explanation

### 4. Key Files & Structure

- `src/app/` — Next.js app routes and pages
  - `page.tsx` — Home/marketing landing page
  - `apply/page.tsx` — Applicant form page
  - `matches/page.tsx` — Display generated groups & scheduled times
  - `admin/` — Admin dashboard and management pages
  - `api/` — Server API routes (apply, group, groups, audit, override, evaluate)
- `src/components/` — Reusable UI components (Navbar, Toast, forms)
- `src/app/api/utils/` — Helper utilities (AI wrapper, file read/write, scoring)
- `src/lib/` — Grouping algorithm and group-reason generator
- `data/` — JSON data files used at runtime: `applicants.json`, `groups.json`, `group.json`, `audit.json`, `overrides.json`

### 5. Data Models

Applicant (object stored in `data/applicants.json`):
- `id` (string)
- `name`, `email` (string)
- `age` (number, optional)
- `location`, `bio`, `interests`, `dietary`, `profession` (strings, optional)
- `availability` (string[] — parsable time options)
- `AI` (object with `decision`, `confidence`, `reason`)
- `status` (string — `pending`, `accepted`, `rejected`)
- `createdAt`, `updatedAt` (ISO timestamps)

Group (object stored in `data/groups.json`):
- `id` (string)
- `members` (array of applicant ids or shallow objects)
- `explanation` (AI-generated text)
- `scheduledAt` (ISO timestamp string, optional)
- `createdAt` (ISO timestamp)

Audit log entry (stored in `data/audit.json`):
- `id`, `action`, `actor` (admin name or id), `targetId`, `targetName`, `from`, `to`, `timestamp`, `notes`

### 6. API Endpoints & What They Do

- `POST /api/apply` — Submits an application. Normalizes types, parses availability strings into arrays, calls AI evaluation, then saves to `data/applicants.json`.
- `GET /api/applicants` — Returns all applicants.
- `POST /api/override` — Admin accept/reject an applicant; updates `applicants.json` and appends a record to `audit.json`.
- `DELETE /api/override` — Deletes an applicant and logs the action.
- `GET /api/group` — Generates groups from accepted applicants. Key steps:
  1. Reads accepted applicants.
  2. Computes pairwise compatibility scores using shared interests, dietary compatibility, profession diversity.
  3. Builds groups of up to 6 using a greedy algorithm that favors high compatibility.
  4. For each group, the server calls AI to generate a short human-readable explanation.
  5. Attempts to pick a meeting slot common to all members' availability.
  6. Saves groups to `data/groups.json` and returns them.
- `GET /api/groups` — Fetches saved groups.
- `GET /api/audit` — Returns the audit log entries.

### 7. Core Logic & Algorithms

1) Applicant normalization
- Availability is supplied as free-form text in the form (semi-colon/comma/newline separated). The server normalizes into an array of ISO-parsable strings.

2) AI evaluation
- On submit, the server sends a prompt to the AI to evaluate applicant fit. The result is stored as `AI: { decision, confidence, reason }` on the applicant record.

3) Compatibility scoring
- A small deterministic scoring implementation rewards shared interests (+1 per overlapping interest), dietary match (+2), and diversity in professions (+1.5). The resulting score is used by the grouping algorithm.

4) Group building
- Groups are assembled by sorting applicants by score and greedily building groups up to size 6, prioritizing candidates with higher mutual compatibility. This is intentionally simple and deterministic to keep reasoning traceable.

5) Scheduling
- The server inspects members' availability arrays and picks the first intersection slot (simple common-slot selection). For more advanced scheduling, integrate a calendar/availability service.

6) Audit logging
- Admin actions (accept/reject/delete) are appended to `data/audit.json` with timestamps and before/after status to provide traceability.

### 8. UI & UX Notes

- Navbar: logo left, nav centered, Home button on the right (always visible). Admin navigation appears centered when on admin routes and an `Admin` link appears on public pages.
- Home page: hero CTA for Apply and View Groups. The redundant Home CTA was removed to rely on the header Home button.
- Admin: Tabbed interface with Overview and Audit Log; applicants and groups pages include dialogs, confirmation modals, and toasts for feedback.

### 9. Running Locally

Prereqs: Node.js 18+, npm

1. Install:
```powershell
cd c:\Users\Documents\strangers-meet
npm install
```
2. Environment variables (development):
- `OPENAI_API_KEY` — required for AI evaluation and group explanation calls. If not set, AI-related features will gracefully fail with server-side errors.

3. Start dev server:
```powershell
npm run dev
```

4. Type-check:
```bash
npx tsc --noEmit
```

5. Quick checks:
- `http://localhost:3000` — landing page
- `http://localhost:3000/apply` — application form
- `http://localhost:3000/admin` — admin dashboard

### 10. Deployment Notes

- The application is a standard Next.js app and can be deployed to Vercel, Netlify (with Next support), or a self-hosted Node environment. Ensure `data/` files are persisted by selecting a backing store (file-storage is fine for prototyping; for production use a database).
- Add `OPENAI_API_KEY` to your deployment environment.

### 11. Security & Privacy

- The app stores applicant data in plaintext JSON files under `data/`. For production, migrate to an encrypted or managed database with access controls.
- Do not commit secret keys to the repository. Use environment variables.

### 12. Recommended Next Steps

1. Replace file-based storage with a proper DB (Postgres/SQLite) and use Prisma or ORM migrations.
2. Add authentication + role-based admin access.
3. Strengthen scheduling by integrating with external calendars (Google Calendar) and timezone-aware parsing.
4. Add unit/integration tests for grouping logic and API routes.
5. Add a GitHub Actions workflow to run `npm ci && npx tsc --noEmit` on PRs.

### 13. Contact / Contribution

If you'd like me to expand this doc into a README or generate automated tests and CI, tell me which tasks to prioritize.

---
Generated and committed by the project maintainer tools on 2025-12-10.
