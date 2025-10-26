
NBA Rookie Rankings — v2 (live composite + daily stats)

This package contains a static frontend and two Vercel serverless API endpoints in /api:
- /api/rankings  : fetches and aggregates rankings from ESPN, Bleacher Report, CBS, NBA.com (best-effort scrapers with fallbacks)
- /api/stats     : fetches season averages (PPG/RPG/APG) for players using balldontlie.io

How to deploy:
1. Create a GitHub repo and push these files (keep the api/ folder at repo root).
2. Connect the repo to Vercel and deploy. Vercel will detect serverless functions automatically.
3. Set up scheduled calls (Vercel Cron Jobs or GitHub Actions) to call /api/stats daily and /api/rankings weekly and cache results if desired.

Important notes:
- The scrapers are best-effort and may need tuning; prefer caching and scheduled runs rather than scraping on every request.
- balldontlie is free but may not have full coverage for every rookie/season.
