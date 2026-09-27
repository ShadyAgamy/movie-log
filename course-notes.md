# Notes

Rule: rewrite each term in **my own words**. If I can't fill a line, that's the
signal to ask.

---

## Day 1 — servers, databases, drivers

**server**
- claude: a program that receives HTTP requests and sends back responses
- me:

**database**
- claude: a separate program whose only job is storing data durably and answering questions about it
- me:

**request**
- claude: one visit to a URL. Not all of them need the database (a marketing page doesn't, the issues list does)
- me:

**connection**
- claude: an open line to the database that stays open, so you don't redial for every query
- me:

**connection pool**
- claude: a set of kept-open lines shared between requests — borrow one, use it, give it back
- me:

**serverless**
- claude: my app isn't one long-running process; each request wakes a fresh disposable copy that dies seconds later. That's why pools break on Vercel
- me:

**SQL**
- claude: the language the database actually understands (`SELECT * FROM issues WHERE user_id = 3`)
- me:

**ORM** (Object–Relational Mapping)
- claude: translator between TS objects and SQL tables, both directions. Drizzle is mine
- me:

**region**
- claude: the physical place the database machine lives. Mine is AWS us-east-2, Ohio — every local query flies there and back
- me:

---

## The three boxes

| | what it is |
|---|---|
| Postgres | the database software |
| Neon | company that runs Postgres for me |
| Vercel | company that runs my Next.js app |

Only Vercel is absent during `npm run dev`.

---

## Day 2 — auth: how the server knows who I am

Read `app/actions/auth.ts` + `lib/auth.ts`.

### The four sentences (if I remember nothing else, remember these)

1. HTTP forgets me between requests, so after login the server hands the browser
   a cookie to prove who I am on every request after that.
2. Passwords are stored **hashed**, never raw.
3. Never trust the browser — re-check everything on the server.
4. Auth is harder than it looks, so real apps usually buy it instead of writing it.

---

### Core terms

**stateless (HTTP)**
- claude: every request arrives as a stranger. The server handling `/dashboard`
  has no memory of the login request half a second earlier. Nothing in HTTP
  links them — that's the whole problem auth exists to solve
- me:

**cookie**
- claude: a small piece of text the server tells the browser to keep, and the
  browser then attaches **automatically** to every future request to that site.
  The wristband at a festival. I write no code to send it — the browser does it
- me:

**session**
- claude: the server's answer to "who is this?" for one logged-in stretch of
  time. In my repo it's not stored anywhere — it *is* the cookie
- me:

**hash (password)**
- claude: a one-way scramble. bcrypt turns `hunter2` into gibberish that can't
  be turned back. To check a login, hash the guess and compare the two
  gibberishes. So even if my DB leaks, the passwords don't
- me:

**JWT** (JSON Web Token, "jot")
- claude: the text written *on* the wristband. Three dot-separated chunks:
  header . payload . signature. Payload holds `{ userId }`
- me:

**the JWT payload is NOT secret**
- claude: base64 is encoding, not encryption. Anyone can paste my token into
  jwt.io and read it. So: never put anything secret in a JWT
- me:

**signature**
- claude: what makes the token unforgeable. A one-way function of the payload
  **plus** a secret only my server knows. Edit the payload → signature stops
  matching → rejected. Forge a new signature → need the secret
- me:

**JWT_SECRET**
- claude: the stamp that makes wristbands real. `lib/auth.ts:17` has a hardcoded
  fallback sitting in a public repo — anyone could mint a token for any user.
  Must be env-only in production
- me:

---

### The cookie flags in `lib/auth.ts:102` — each one blocks an attack

| flag | plain meaning | stops |
|---|---|---|
| `httpOnly` | JS literally cannot read this cookie | a script injected into my page stealing the session (**XSS**). This is why tokens don't go in `localStorage` — any script can read that |
| `secure` | HTTPS only | someone reading traffic on café wifi |
| `sameSite: 'lax'` | don't attach when *another* site triggers the request | evil.com auto-submitting a form to my site while my cookie rides along (**CSRF**) |
| `maxAge` | self-destruct after 7 days | a forgotten session living forever |

---

### Why both login errors say the same thing

`auth.ts:69` (no such user) and `auth.ts:81` (wrong password) return an
identical message on purpose.

- claude: if they differed, I could feed the app a list of emails and read the
  replies to learn **who has an account** — without ever guessing a password.
  That's **user enumeration**. Dangerous depending on the app (a therapy site
  just outed its patients), and it hands phishers a verified target list
- me:

---

### The gaps in this repo (course code, not shippable)

**no rate limiting** ← the biggest one
- claude: nothing counts login attempts, so a script can try thousands a minute.
  Two flavors: **brute force** (one account, millions of guesses) and
  **credential stuffing** (replaying real email/password pairs leaked from
  *other* sites — works because people reuse passwords). Fix: cap attempts per
  IP *and* per account
- me:

**can't log out**
- claude: `deleteSession()` only tells **my browser** to drop the cookie.
  Nothing is stored server-side, so the token itself stays valid for its full
  7 days. Anyone holding a copy keeps access. Can't build "log out other
  devices", can't ban a user
- me:

**the trade-off that causes it**
- claude: stateless = fast (verify with math, zero DB hits) but **can't
  revoke**. Stateful (sessions in a DB table) = revocable instantly but costs a
  lookup per request. Middle ground most big apps use: short 15-min token +
  a refresh token that *is* in the DB — revocation within 15 min
- me:

**`mockDelay(700)`**
- claude: fake latency, teaching prop, delete in real code
- me:

---

### Hardening vs architecture

- claude: *architecture* = the shape (where code runs, what talks to what).
  This repo's shape is right. *Hardening* = everything added to survive people
  actively attacking it. Building the happy path is ~20% of auth; hardening is
  the other 80%
- me:

**why real teams don't hand-roll auth**
- claude: Auth.js (open source, free, I keep my own DB) / Clerk (hosted, drop-in
  components) / WorkOS (enterprise SSO). They arrive with rate limiting,
  revocable sessions, email verification, password reset, MFA, and a security
  team. Writing it myself means I own all 80% forever
- me:

**"quietly owned"**
- claude: a UI bug is loud — someone reports it, I fix it. A security hole is
  **silent**: no error, no failing test, everything looks fine, and I find out
  months later. That broken feedback loop is the real argument for buying auth,
  not "I couldn't write it"
- me:

---

### Server Action vs API route

- claude: an **API route** (`app/api/.../route.ts`) is a URL that returns data
  instead of a page — I own the URL, method, status codes, and I call it with
  `fetch`. A **Server Action** is the same HTTP POST with the plumbing hidden:
  Next generates the endpoint, I just call a function. Rule of thumb: my own
  forms and mutations → Server Action. Anything external (mobile app, Stripe
  webhook, third party) → API route. This repo has **zero** route.ts files
- me:

---

### Parked — NOT now

Real, but not my problem at this stage. Come back when I'm actually shipping.

- timing attacks (identical messages can still leak via *response time*, since
  bcrypt runs only on the found-user path)
- CSRF tokens, email verification, password reset, MFA
- breached-password checks (haveibeenpwned API)
- Redis / `@upstash/ratelimit` for rate limiting in serverless

### Do this once (5 min, proves `httpOnly` to myself)

1. Sign in → DevTools → Application → Cookies → copy `auth_token`
2. Paste it into jwt.io — see that I can read the payload
3. In the console, try `document.cookie` — see that the token is **not** there

Why step 3 comes back empty: _______

---

## Day 3 — forms: useActionState, server actions over the wire

Built the signup form in `app/(auth)/signup/page.tsx`.

### The one-sentence version

- claude: stop writing `onSubmit` + `useState` + `fetch`. Hand the form my
  server function directly and let React manage the input, the loading flag and
  the result
- me:

---

### The old way vs the new way

| old | new |
|---|---|
| `useState` per field (controlled inputs) | `name="email"` on the input, nothing else |
| `useState(loading)` | `isPending` from the hook |
| `useState(errors)` | `state` from the hook |
| `onSubmit` + `e.preventDefault()` | `<form action={formAction}>` |
| hand-written `fetch` + JSON stringify/parse | Next generates it |

**form `action`**
- claude: super OG HTML. Before Ajax, `<form action="/signup.php">` meant "the
  URL this form POSTs to" and the page reloaded. React 19 brought it back but
  the value is a **function**, not a URL. No reload, and the browser still
  gathers every input with a `name` for free
- me:

**FormData**
- claude: the object the **browser** builds from the inputs at submit time.
  That's why the action starts with `formData.get('email')` — reading the input
  whose `name` is "email". Sent as `multipart/form-data`
- me:

**`name` vs `id`** ← got this wrong first try
- claude: `name` is for the **server** (the key `formData.get()` reads). `id` is
  for the **browser/DOM** (what `htmlFor` and a11y tools target). Two different
  namespaces. Every input needs both
- me:

---

### useActionState

```tsx
const [state, formAction, isPending] = useActionState(signUp, initialState)
```

| | what it is | replaces |
|---|---|---|
| `state` | whatever the action **returned** last time | my errors/result useState |
| `formAction` | the wrapped handler for `<form action={...}>` | my onSubmit |
| `isPending` | true while in flight | my loading useState |

**the two-argument signature** ← the gotcha
- claude: the hook calls my function as `(prevState, formData)`, NOT
  `(formData)`. Forget the first param and formData lands in the wrong slot and
  `.get` blows up
- me:

**why `ActionResponse` looks the way it does**
- claude: `{ success, message, errors }` **is** `state`. The action returns
  error objects instead of throwing precisely so the hook can hand them to my
  JSX. `errors` values are **arrays** (`fieldErrors`) — one field can fail
  several rules — so index `[0]` or map
- me:

---

### "I'm importing a handler, not the code"

- claude: `import { signUp }` in a client component does NOT ship the bcrypt/DB
  code to the browser. `'use server'` makes the build keep the body on the
  server, generate a secret URL for it, and replace my import with a tiny stub
  that does the fetch. Same trick as CSS modules generating `button_x7f2a`
- me:

**proved it in DevTools:**
- `Request URL: localhost:3000/signup` — no `/api/` route, it POSTs to the page
- `Next-Action: 60d74a64…` header — the generated function id
- `Content-Type: text/x-component` response — RSC format, not JSON
- `Status 200 OK` even when the action "failed" — action failure is **data**,
  not an HTTP error

**prevState is client-controlled** ← real security point
- claude: the payload contained `$ACTION_1:1 → [{"success":false,...}]` — the
  browser sends prevState UP to the server. So it's untrusted input, same as
  formData. Never `if (prevState.isAdmin)`
- me:

**a server action IS a public endpoint**
- claude: hidden name ≠ protected. Anyone can curl it. Every auth/validation
  check has to live INSIDE the function
- me:

---

### 'use client'

- claude: does NOT mean "only in the browser". It means **"also send this to the
  browser"** — the boundary where my JS bundle starts. Required for any hook,
  because hooks run in the browser
- me:

| | runs where | gets |
|---|---|---|
| Server Component (default) | server only | async/await, direct DB, secrets. No hooks, no onClick |
| Client Component (`'use client'`) | server first render, then browser | useState, useEffect, events, window |

**donut pattern**
- claude: server components on the outside (they fetch data), push `'use client'`
  as deep as possible. Everything inside a client boundary ships as JS — a
  `'use client'` in the root layout would send the whole app to the browser
- me:

---

### redirect() throws — the big one

- claude: `redirect()` does not return, it **throws** a special NEXT_REDIRECT
  error. That's the only way to abort my function mid-flight. Next catches it
  at the top and turns it into a real HTTP redirect
- me:

**the trap**
- claude: an exception travels outward and the **nearest** catch wins. A
  `redirect()` inside my own `try` gets eaten by my own `catch` — which assumes
  any throw = failure. Result: user created, cookie set, screen says "An error
  occurred". Everything worked, the UI lied
- me:

**the fix — after the try/catch, not inside**

```ts
  await createSession(user.id)
} catch (error) {
  return { success: false, ... }   // every failure path returns
}

redirect('/dashboard')             // only reachable on success
```

- claude: outside the try so nothing of mine catches it; reachable only on
  success because every failure path already returned. `finally` also escapes
  the try, but runs on EVERY path — wrong for signup, right for signOut
- me:

**can't return data AND redirect**
- claude: the throw wins, nothing after it runs. If I need the returned data,
  the redirect has to move to the client
- me:

---

### Client-side redirect (the other way)

```tsx
const router = useRouter()              // from 'next/navigation', NOT 'next/router'
useEffect(() => {
  if (state.success) router.replace('/dashboard')
}, [state.success, router])
```

- `useEffect` because I can't navigate during render
- depend on `state.success`, **not** `state` — the hook returns a new object
  every submit, so depending on `state` fires after failures too and kicks an
  unauthenticated user to /dashboard
- `replace` not `push` — don't leave a completed signup form in history

| | use |
|---|---|
| just navigate | `redirect()` in the action — 1 round trip, no flash, works without JS |
| do something *then* navigate, or navigate using returned data | return `{success}` + useEffect + router.replace |

---

### Passwords over the wire

Saw my own password in the Network payload. That's normal — the server needs
the plaintext to bcrypt it. What matters:

- claude: **HTTPS in production** (encrypts the body in transit) · **never log
  it** — a stray `console.log(data)` in a server action writes it to server
  logs that get shipped and backed up, one of the most common real leaks ·
  **never in a URL** — URLs land in access logs, proxy logs, history and the
  Referer header, which is a big reason login is POST not GET · **never store
  raw** (bcrypt)
- me:

---

### Headers — what to actually care about

**care:** `Content-Type` (how the body is encoded) · `Cookie` (the wristband,
automatic) · `Next-Action` (which server function) · `Origin`/`Host` — **Next
compares these on every server action and rejects mismatches = free CSRF
protection**

**know it exists:** `Sec-Fetch-Site`, `Referer`, `Accept*`

**ignore:** `User-Agent`, `Sec-Ch-Ua*`, `Accept-Language`, `Next-Router-State-Tree`

- claude: headers are metadata about the request — who's asking, what format,
  what credentials. I'll read them when debugging and set maybe four by hand
  ever. Don't memorise, look up when one shows in an error
- me:

---

### Gotchas that cost me time

- `} : ActionResponse` is not valid — annotation goes `const x: T = {...}`
  (or the `satisfies` keyword after)
- `method="post"` on a form with a function `action` does nothing — React owns
  the submission, `method` only matters when action is a URL string
- can't return a function from a server action — `state` is **data that
  travelled over HTTP**, not a live JS object. Nothing callable survives
- `lib/dal.ts` is an empty stub until a later lesson → "Failed to create
  account" is expected, not my bug
- **server `console.error` prints to the terminal, not the browser console**

---

## Open questions

- [~] What stops someone calling my Server Actions from DevTools with someone
      else's issue ID? (trace `lib/dal.ts`)
      → **partly answered Day 3.** Next compares `Origin` vs `Host` and rejects
      mismatches (free CSRF protection), but that only stops *other sites*. It
      does nothing against someone replaying the request from my own origin.
      The real answer is the ownership check inside the action itself — still
      need to trace `lib/dal.ts` once the course fills it in.
- [ ] Learn basic SQL: SELECT, WHERE, JOIN, indexes
- [ ] Try the client-side redirect version once, with the Network tab open, to
      see the extra round trip and the flash — then revert
