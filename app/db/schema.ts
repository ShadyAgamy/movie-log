import {
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
  check,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  username: text().unique().notNull(),
});

export const watchList = pgTable(
  "watchlist",
  {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    movieId: integer().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (table) => [unique().on(table.userId, table.movieId)],
);

export const watched = pgTable(
  "watched",
  {
    id: uuid().primaryKey().defaultRandom(),
    movieId: integer().notNull(),
    userId: uuid()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    rating: smallint(),
    review: text(),
    watchedAt: timestamp().defaultNow().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp()
      .$onUpdate(() => new Date())
      .defaultNow()
      .notNull(),
  },
  (table) => [
    check("watched_rating_range", sql`${table.rating} BETWEEN 1 AND 10`),
    unique().on(table.userId, table.movieId),
    index("watched_movie_idx").on(table.movieId, table.watchedAt),
  ],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type WatchlistMovie = typeof watchList.$inferSelect;
export type NewWatchlistMovie = typeof watchList.$inferInsert;
export type WatchedMovie = typeof watched.$inferSelect;
export type NewWatchedMovie = typeof watched.$inferInsert;
