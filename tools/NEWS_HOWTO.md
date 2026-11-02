# Daily "Today's 5 news" — how to add a day

The site does not fetch news by itself. Each day one file is written and published:

1. Write `data/news/YYYY-MM-DD.js` (IST date of the day it is published), copying the shape of the newest existing day:

```js
RRB.newsLoaded({
"date": "YYYY-MM-DD",
"items": [
{
 "cat": "sports",                       // one of: scheme sports awards appointments defence science railways states international economy days
 "en": {"title": "...", "summary": "2-3 plain sentences with dates, names, numbers", "facts": ["static/background fact 1", "fact 2"]},
 "hi": {"title": "...", "summary": "...", "facts": ["...", "..."]},
 "mcq": {"a": 1,                        // index 0-3 of the correct option (vary it across items)
  "en": {"q": "...", "o": ["A", "B", "C", "D"], "e": "one-line explanation"},
  "hi": {"q": "...", "o": ["...", "...", "...", "..."], "e": "..."}},
 "src": [{"name": "PIB (Ministry of X), 1 Nov 2026", "nameHi": "PIB (X मंत्रालय), 1 नवंबर 2026", "url": "https://..."}]
},
... exactly 5 items ...
]
});
```

2. Run `python3 tools/build_news.py YYYY-MM-DD` from the repo root. It validates the file, adds the day to
   `data/news/index.js`, writes the static page `news/YYYY-MM-DD.html`, links the previous day's page to it,
   updates `news/index.html`, `sitemap.xml` and the footer time in `data/updated.js`.
   (`--check` only validates.)

3. Commit as `News: YYYY-MM-DD` and push to `main`. GitHub Pages publishes in a minute or two.

## Content rules

- 5 different categories per day, picked for RRB NTPC / Group D general awareness: railways, appointments,
  sports, defence, science/space, schemes, economy/banking, awards, states, international, important days.
  Include a railways item whenever there is real railway news.
- Only news from the last 1-2 days, each fact checked against an official or reliable source
  (PIB, All India Radio/newsonair, DD News, ministry sites, The Hindu, Indian Express, The Tribune, etc.).
  Every item needs at least one working source link. Don't repeat a story already used on an earlier day.
- Facts: 2 short "remember for the exam" points (static GK linked to the news is good: HQ, founded, capital, etc.).
- MCQ: one clear correct answer, 3 believable wrong options, correct position varies (not always the same index).
- Hindi: natural, simple Hindi as used in Hindi newspapers — not word-for-word translation. Keep names,
  numbers and dates identical to the English.
