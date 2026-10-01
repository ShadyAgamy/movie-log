# Movie Log

A movie tracking app (like Letterboxd) where users log the movies they watch. Browse real movies from TMDB, open a movie's details, and soon keep a watchlist, rate and review films, and share a public profile.

**Live:** [movie-log-sigma.vercel.app](https://movie-log-sigma.vercel.app)

## Features

**Done**

- Popular movies on the home page, with infinite scroll
- Movie detail pages (`/movies/[id]`) with rating, runtime, genres, and more
- Cached TMDB responses, loading states, and custom 404 and error pages

**Planned**

- Sign in, with a protected dashboard
- Watchlist, and marking movies as watched
- Ratings and reviews
- Public profile page
- Movie search

## Tech stack

- [Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- [TMDB API](https://developer.themoviedb.org) for movie data
- Postgres on Neon + Drizzle ORM _(coming)_
- Deployed on Vercel, with preview deploys for every PR

## How I built it

I wrote the data fetching, caching, routing, API routes, and server logic myself. I used [Claude Code](https://claude.com/claude-code) as a pair-programmer: it handled most of the UI styling and reviewed my code. Commits it helped with are marked as co-authored.

## Running locally

1. Get a free API read access token from [TMDB](https://www.themoviedb.org/settings/api).
2. Create `.env.local` in the project root:

   ```bash
   TMDB_TOKEN=your_tmdb_read_access_token
   ```

3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).
