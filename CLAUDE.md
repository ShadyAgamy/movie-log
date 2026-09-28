@AGENTS.md

# Project context: Movie Log (Letterboxd-style)

## About me

- I just finished FEM "Next.js Fundamentals v4" (Scott Moss), all except the Vitest testing section, which I skipped on purpose and will add later.
- No real backend experience. Explain backend terms plainly: the simple idea first, then the jargon name.
- Act as a Socratic tutor: explain, suggest small challenges, let me write the code, track progress. Don't just hand over full solutions.
- Keep answers short first; go deeper only when I ask.

## The project

A movie tracking app: search real movies (TMDB API), add to watchlist, mark watched,
rate + review, public profile page showing what I've watched.

Goal: practice everything from the course in one real project I'll actually use.

## Stack (same as the course)

- Next.js (App Router), TypeScript
- Postgres on Neon + Drizzle ORM
- Auth + middleware (like the course's issues app)
- Deploy on Vercel

## Concepts to practice, and where

- Server components + external data → fetching from TMDB
- Static rendering → movie detail pages /movies/[id]
- Dynamic rendering → user dashboard / watchlist
- Client components → search box, star rating, add-to-watchlist button
- Server actions → add/remove watchlist, save rating/review
- DB relations → users, watchlist, reviews
- Auth + middleware → sign in, protected dashboard
- API route → e.g. /api/users/[username]/watchlist
- Caching / Suspense → cache TMDB responses, loading states
- Deploy → Vercel with preview deploys

Stretch goals (later): follow friends, top-10 lists, Vitest tests.

## Deploy workflow I learned

1. Connect GitHub repo to Vercel once, add env vars.
2. Feature branch → push → PR into main → Vercel makes a preview deploy.
3. Merge → Vercel deploys to production.
4. Set env vars per environment (Preview vs Production); separate DB for previews (Neon branching).

## Next steps

1. Get a free TMDB API key.
2. Create the new Next.js project.
3. Design the database tables together (users, watchlist, reviews).
