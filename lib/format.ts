// Small display helpers: raw TMDB values → text for the UI.

export const getYear = (date?: string | null) => (date ? date.slice(0, 4) : "");

export const formatRuntime = (minutes?: number | null) => {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
};

export const formatRating = (vote: number) => vote.toFixed(1);

export const formatCount = (n: number) =>
  new Intl.NumberFormat("en-US").format(n);

// timeZone UTC: "1999-10-15" is a date, not a moment — without it some
// timezones would show Oct 14.
export const formatDate = (date?: string | null) =>
  date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      })
    : null;

const languageNames = new Intl.DisplayNames(["en"], { type: "language" });
export const formatLanguage = (code: string) => languageNames.of(code) ?? code;
