Rail Prep: unofficial static practice site for RRB NTPC UG and Group D.
Open index.html directly, or serve: python3 -m http.server 8000
No build step, no external CDNs or fonts. The site itself is static (GitHub Pages).
Status: home (slider, important dates, today's 5 news, question of the day), news archive, mock tests (our own sets), past papers, Progress, topic practice, notes (3 topics so far), English/Hindi, doubt chat.

FILES
  index.html, mock.html, test.html, ...   the site
  js/config.js      one setting: CHAT_URL (the doubt-chat endpoint). Empty = chat shows
                    "The doubt chat will be switched on soon."
  practice.html, js/practice.js, css/practice.css   topic-wise practice drills
  data/mocks/tough-*.js   100-question tough mocks (questions carry their own topic in field t)
  notes.html, js/notes.js, css/notes.css   revision notes (list + one note per topic, print-friendly)
  data/notes/       index.js lists topics that have a note; <topicId>.js holds one note in English + Hindi
  data/news/        daily current affairs: index.js (RRB.NEWS_DAYS, newest first) + YYYY-MM-DD.js per day; js/news.js, css/news.css, news.html (see /workspace/news/HOWTO.md)
  data/dates.js     important dates on the home page (official/tentative, source per row; past rows close by themselves)
  js/slider.js, js/datestrip.js, js/qotd.js, css/home.css   home slider, dates strip, question of the day (localStorage rrb.qotd)
  mock.html / papers.html   both use js/mock.js: mock.html = our practice sets + tough mocks, papers.html = the 12 real past papers
  data/topics.js    topic tag for every past-paper / practice-set question (map[paperId][qIndex])
  js/chat.js, css/chat.css   doubt chat (floating button on every page, hidden during a running test)
  worker/           Cloudflare Worker that talks to Google Gemini. Not part of the website:
                    _config.yml tells GitHub Pages to skip it (it holds no secrets, so it would be
                    harmless anyway). The API key is never in these files.

DOUBT CHAT: HOW TO PUT THE SITE ONLINE (all free)

1) Get a Gemini API key
   - Go to https://aistudio.google.com/apikey, sign in with a Google account,
     click "Create API key" and copy it. Free tier, no card needed.
   - Keep it private. Never paste it into the website files.

2) Put the website on GitHub Pages
   - Create a GitHub account and a new public repository, e.g. "rail-prep".
   - Upload the CONTENTS of this folder (index.html at the top level, plus css/, js/, data/,
     worker/, _config.yml) via "Add file > Upload files", or with git:
       git init && git add . && git commit -m "Rail Prep" && git branch -M main
       git remote add origin https://github.com/YOUR-USERNAME/rail-prep.git && git push -u origin main
   - In the repo: Settings > Pages > Build and deployment > Source: "Deploy from a branch",
     Branch: main, folder: / (root). Save.
   - After a minute the site is at https://YOUR-USERNAME.github.io/rail-prep/

3) Deploy the chat backend on Cloudflare Workers
   - Create a free account at https://dash.cloudflare.com/sign-up
   - Install Node.js 18+ (https://nodejs.org). Then in a terminal:
       cd worker
       (edit wrangler.toml: ALLOWED_ORIGIN = "https://YOUR-USERNAME.github.io"
        - the origin only, no /rail-prep path, no trailing slash)
       npx wrangler login
       npx wrangler deploy
       npx wrangler secret put GEMINI_API_KEY      (paste the key from step 1 when asked)
   - "deploy" prints the Worker URL, e.g. https://rail-prep-chat.YOUR-SUBDOMAIN.workers.dev

4) Switch the chat on
   - Edit js/config.js:  RRB.CHAT_URL = "https://rail-prep-chat.YOUR-SUBDOMAIN.workers.dev";
   - Commit/upload that file to GitHub. Pages updates in about a minute.

Notes
  - Model: gemini-3.8-flash (set GEMINI_MODEL in wrangler.toml to change it).
  - Limits: 2,000 characters per message; the last 10 messages are kept in the browser
    (Clear button wipes them) and sent as context. About 10 questions/minute per visitor IP
    (Cloudflare rate-limit binding, approximate). Gemini's free-tier daily quota also applies;
    when it runs out, students see "The tutor is busy right now".
  - Only the GitHub Pages address in ALLOWED_ORIGIN can use the Worker (CORS). Using a custom
    domain too? List both, comma-separated.
  - Free-tier Gemini prompts may be used by Google to improve its products; students should not
    type personal details. Answers are AI-generated and can be wrong.
  - Worker tests (no key, no network):  cd worker && node --test worker.test.mjs
