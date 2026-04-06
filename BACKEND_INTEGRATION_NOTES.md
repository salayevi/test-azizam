# Website backend integration notes

This package keeps the original UI/UX and updates only the backend-facing pieces.

## What changed
- Homepage now loads the public snapshot from the backend.
- Remote media hosts are allowed in `next.config.ts`.
- Missing-content states show a setup screen instead of crashing.
- Auth modal stays in guest mode until real customer auth endpoints are implemented.
- Product/media components use the backend snapshot model and fallback placeholders.

## Required backend endpoints
- `GET /api/v1/public/snapshot/`
- `GET /api/v1/public/preview/<uuid>/snapshot/` (optional)

## Required frontend env
Copy `.env.local.example` to `.env.local` and fill values.

## Server dev start example
```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 3000
```
