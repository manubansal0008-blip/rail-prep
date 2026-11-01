# rail-prep-chat — Rail Prep doubt chat backend

A Cloudflare Worker that takes a student's doubt from the Rail Prep site and asks Google Gemini (`gemini-2.5-flash`).
The Gemini key is stored only as a Worker secret. It never goes into the website code.

- Endpoint: `POST https://rail-prep-chat.<your-subdomain>.workers.dev/chat`
- Request: `{ "messages": [{ "role": "user" | "model", "text": "..." }], "lang": "hi" | "en" }`
- Reply: `{ "reply": "..." }` (if Gemini is busy it retries once, then tries `GEMINI_FALLBACK_MODEL`), or on error `{ "error": "friendly Hindi/English text", "code": "..." }`
- The Worker keeps the last 8 turns. Each student message can be up to 800 characters.
- CORS: only `https://manubansal0008-blip.github.io` (and `http://localhost:<port>` for testing; set `ALLOW_LOCALHOST = "false"` to block it).
- Limits, counted in the KV namespace `RL` on India time: 20 messages per IP per hour, 60 per IP per day, and 1,200 per day for the whole site.
  You can change these with `RL_HOUR`, `RL_DAY` and `RL_GLOBAL` in `wrangler.toml`. If KV is missing or fails, the chat keeps working without limits and logs a warning.

## Links to Rail Prep pages in answers

The model gets a compact page list (`src/sitemap-catalog.js`: 60 notes with their practice topic, plus mock, practice, papers, notes, news pages)
and is asked to end a study answer with 1–2 links like `और पढ़ें: [प्रतिशत के नोट्स](https://manubansal0008-blip.github.io/rail-prep/notes/percentage.html)`.
Before replying, the Worker checks every link (`fixLinks` in `src/chat.js`): a markdown link whose URL is not in the list keeps only its text,
and invented `manubansal0008-blip.github.io` URLs are removed. Current affairs link to `news.html`, so daily news needs no change here.
The site (`js/chat.js`) turns only `https://manubansal0008-blip.github.io/rail-prep/...` links into clickable links; any other URL stays plain text.

When notes are added or renamed, rebuild the list and redeploy:

```bash
npm run catalog            # = node scripts/build-catalog.mjs ..   (reads ../data/topics.js and ../data/notes/)
npm test && npx wrangler deploy
```

## Visitor counter (`/visit`, since 1 Nov 2026)

- `GET /visit` -> `{ "total": 123, "today": 7, "date": "2026-11-01" }`, `POST /visit` counts one visit and returns the same plus `"counted": true|false`.
- Counts live in one Durable Object (`VisitCounter`, SQLite-backed, works on the free plan), so numbers are exact. Code: `src/visits.js`.
- The site footer (`js/app.js`) POSTs once per browser per India-time day (localStorage `rrb.visitDay`), otherwise GETs.
  So "today" is roughly today's visitors and "total" is the sum of daily visitors since the counter started (1 Nov 2026).
- One IP can add at most `VISIT_IP_DAY` (default 20) visits a day. IPs are stored only as a hash and are deleted after the day.
- Same CORS rule as the chat (only the github.io site). If the counter fails, the site just hides the numbers.
- Quick check: `curl -s -H "Origin: https://manubansal0008-blip.github.io" https://rail-prep-chat.manubansal0008.workers.dev/visit`

## Gemini free-tier quota (important)

Google's free tier is counted per Google Cloud project and per model, and it resets at midnight Pacific time (about 1:30 PM India time).
In testing on 1 Nov 2026, `gemini-2.5-flash` on a free key stopped at **20 requests per day**. So on a free key, the 1,200/day site cap is not the real limit.
When `gemini-2.5-flash` runs out (HTTP 429), the Worker moves to the models in `GEMINI_FALLBACK_MODEL` (default `gemini-flash-lite-latest`), which have their own quota.
If students still see "अभी बहुत लोग पूछ रहे हैं", add more fallback models (comma-separated), or turn on billing in AI Studio for much higher limits.
Check your project's real limits at https://aistudio.google.com/rate-limit.

## Deploy (one time, about 5 minutes)

```bash
cd chat-worker
npm install                                  # installs wrangler locally
npx wrangler login                           # opens the browser: log in to Cloudflare (free account)
npx wrangler kv namespace create RL          # prints:  id = "xxxxxxxx..."
#   -> paste that id into wrangler.toml, replacing REPLACE_WITH_KV_ID
npx wrangler secret put GEMINI_API_KEY       # paste the key from https://aistudio.google.com/apikey when asked
npx wrangler deploy                          # prints the URL, e.g. https://rail-prep-chat.<subdomain>.workers.dev
```

Then switch the chat on in the site: in `js/chat.js` set
`RRB.CHAT_URL = "https://rail-prep-chat.<subdomain>.workers.dev/chat";` and push.
While the URL still contains `REPLACE`, the chat button stays hidden.

Quick check after deploy (the reply should be JSON with "reply"):

```bash
curl -s -X POST https://rail-prep-chat.<subdomain>.workers.dev/chat \
  -H "Origin: https://manubansal0008-blip.github.io" -H "Content-Type: application/json" \
  -d '{"lang":"hi","messages":[{"role":"user","text":"LCM of 12 and 18?"}]}'
```

## Local testing

```bash
printf 'GEMINI_API_KEY=%s\n' "$GEMINI_API_KEY" > .dev.vars   # never commit this file (it is in .gitignore)
npx wrangler dev --local --port 8787                         # no Cloudflare login needed; KV is simulated
rm .dev.vars                                                 # when done
npm test                                                     # unit tests, no network and no real key
```

Useful: `npx wrangler tail` shows live logs after deploy. `npx wrangler secret put GEMINI_API_KEY` again replaces the key.
