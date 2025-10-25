
# NBA Rookie Rankings — Prototype (nbarookierankings.com)

This is a lightweight static prototype for a composite rookie leaderboard. It uses mocked ranking data and a simple composite calculation to show the concept.
Files included:
- index.html — main page
- styles.css — light, clean styles
- app.js — prototype logic + mock data
- README.md — this file

## How it works (prototype)
- Rankings are mocked in `app.js` (array `rookies`) with sample ranks from ESPN, Bleacher Report, CBS, and NBA.com.
- The page computes a simple average rank and a normalized composite score for display.
- Use the search box and sort dropdown to explore the table.

## Next steps (suggested)
1. Replace mock data with real rankings:
   - Create scripts to fetch rankings (scrape or use available APIs)
   - Normalize different list lengths (missing players, ties, etc.)
2. Add a backend or serverless functions to fetch and cache rankings daily
3. Integrate live player stats via APIs (e.g. balldontlie.io, nba_api)
4. Implement article generation workflows using the OpenAI API for AI written commentary under pseudonyms (ensure compliance with platform policies and clearly label AI-generated content if needed).

## Deploying to Vercel (quick)
1. Create a GitHub repo and push these files.
2. Sign up at https://vercel.com and connect your GitHub repo.
3. Import the project, use the default settings (it's a static site), and deploy.
4. Point your domain `nbarookierankings.com` to Vercel following their DNS instructions.

## Deploying to Netlify (quick)
1. Create a GitHub repo and push these files.
2. Sign up at https://www.netlify.com and link your repo.
3. Deploy — Netlify will serve the static site automatically.
4. Configure your custom domain in Netlify's dashboard.

