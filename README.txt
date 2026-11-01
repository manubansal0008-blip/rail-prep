Rail Prep: unofficial static practice site for RRB NTPC UG and Group D.
Open index.html directly, or serve: python3 -m http.server 8000
No build step, no external CDNs or fonts. The site itself is static (GitHub Pages).
Status: home (slider, important dates, today's 5 news, question of the day), news archive, mock tests (our own sets), past papers, Progress, topic practice, notes (3 topics so far), English/Hindi, doubt chat.

FILES
  index.html, mock.html, test.html, ...   the site
  practice.html, js/practice.js, css/practice.css   topic-wise practice drills
  data/mocks/tough-*.js   100-question tough mocks (questions carry their own topic in field t)
  notes.html, js/notes.js, css/notes.css   revision notes (list + one note per topic, print-friendly)
  data/notes/       index.js lists topics that have a note; <topicId>.js holds one note in English + Hindi
  data/news/        daily current affairs: index.js (RRB.NEWS_DAYS, newest first) + YYYY-MM-DD.js per day; js/news.js, css/news.css, news.html (see /workspace/news/HOWTO.md)
  data/dates.js     important dates on the home page (official/tentative, source per row; past rows close by themselves)
  js/slider.js, js/datestrip.js, js/qotd.js, css/home.css   home slider, dates strip, question of the day (localStorage rrb.qotd)
  mock.html / papers.html   both use js/mock.js: mock.html = our practice sets + tough mocks, papers.html = the 12 real past papers
  data/topics.js    topic tag for every past-paper / practice-set question (map[paperId][qIndex])
  js/chat.js, css/chat.css   doubt chat. RRB.CHAT_URL at the top of js/chat.js is the Worker URL; while it contains
                    REPLACE the chat is off (no button). Floating button on every page and the static notes/news
                    pages; test.html has no button (only "Ask doubt" in the result review). Chat history is in
                    sessionStorage (cleared when the tab closes).
  worker/           Cloudflare Worker that talks to Google Gemini. Not part of the website:
                    _config.yml tells GitHub Pages to skip it (it holds no secrets, so it would be
                    harmless anyway). The API key is never in these files.

DOUBT CHAT: HOW TO SWITCH IT ON (all free)
  Full steps and commands: worker/README.md. In short:
    cd worker && npm install
    npx wrangler login
    npx wrangler kv namespace create RL        (paste the printed id into wrangler.toml, replacing REPLACE_WITH_KV_ID)
    npx wrangler secret put GEMINI_API_KEY     (key from https://aistudio.google.com/apikey; never put it in site files)
    npx wrangler deploy                        (prints https://rail-prep-chat.<subdomain>.workers.dev)
  Then set RRB.CHAT_URL in js/chat.js to that URL + "/chat", bump ?v= / RRB.VER and push.

Notes
  - Model: gemini-2.5-flash, then gemini-flash-lite-latest when it is busy or out of free quota (GEMINI_MODEL /
    GEMINI_FALLBACK_MODEL in worker/wrangler.toml). A free key gave only ~20 gemini-2.5-flash requests a day in testing. Last 8 messages are sent as context,
    800 characters per message.
  - Limits (KV namespace RL): 20 messages per IP per hour, 60 per IP per day, 1,200 per day for the whole site
    (RL_HOUR / RL_DAY / RL_GLOBAL in wrangler.toml). Gemini's own free-tier quota also applies.
  - CORS: only https://manubansal0008-blip.github.io (plus http://localhost for testing) can use the Worker.
  - Free-tier Gemini prompts may be used by Google to improve its products; students should not
    type personal details. Answers are AI-generated and can be wrong.
  - Worker tests (no key, no network):  cd worker && npm test
