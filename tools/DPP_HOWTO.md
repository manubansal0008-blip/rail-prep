# Daily job: "Daily Practice Problems (DPPs)"

5 exam-style practice questions per day on https://manubansal0008-blip.github.io/rail-prep/dpp.html
(home card "Daily Practice Problems (DPPs)", nav "DPP", static pages dpp/YYYY-MM-DD.html + dpp/index.html in the sitemap).
Repo copy of this file: tools/DPP_HOWTO.md. Validator: tools/validate_dpp.py (= /workspace/dpp/validate.py).

## Golden rules
1. **Rail Prep's own questions, in PYQ pattern.** Every question carries `"label": "Rail Prep practice (PYQ pattern)"`,
   shown on the site. Never call them real RRB past-paper questions anywhere (page, share text, chat message).
2. **Real past-paper question (optional, rare):** only verbatim from the site's own `data/papers/*.js`, with the
   **official answer unchanged** (`"a"` = the paper's `"a"`), `"pyq": {"paper": "<paper id>", "n": <1-based question no.>}`
   and a label naming exam + year, e.g. `"RRB Group D 2025 (12 Dec, Shift 1)"`. Never edit past papers or their answer keys.
3. **Every fact and every calculation verified** (work the maths out fully, check each distractor is really wrong,
   check static facts on NCERT / Indian Railways / official sites). If unsure, drop the question and write another.
4. **Simple everyday Hindi** (JJ's terms: व्याख्या, शॉर्टकट ट्रिक, मात्रक, अनुच्छेद, क्रय/विक्रय मूल्य ...), English where useful
   (e.g. "शक्ति (Power)"). EN and HI versions must say the same thing and have the options in the same order.
5. **No repeats:** do not reuse a question (or the same fact asked the same way) from any earlier DPP day.
   `grep -h '"q"' data/dpp/*.js` before writing. The validator rejects exact repeats.

## Subject rotation (5 questions a day, max 2 from one subject; aim for 5 different)
Every day: 1 `maths`, 1 `reasoning`, 1 `science`, plus 2 from the GK side, rotating by weekday:
| Day | GK slot 1 | GK slot 2 |
|-----|-----------|-----------|
| Mon | `gk` (static GK / railway) | `polity` |
| Tue | `history` | `geography` |
| Wed | `railway` | `economy` |
| Thu | `gk` (awards, books, sports, days) | `polity` |
| Fri | `history` (modern / freedom struggle) | `geography` (India) |
| Sat | `computer` (NTPC) | `economy` |
| Sun | `gk` (culture, dances, festivals) | `science` 2nd (biology/chemistry; Group D heavy) |
Across a week cover the NTPC and Group D syllabus: Maths (percentage, profit-loss, SI/CI, ratio, average, time-work,
time-distance, mensuration, number system, simplification, ages), Reasoning (series, analogy, coding-decoding, blood
relation, direction, syllogism, seating, odd one out, calendar/clock, Venn), Science (physics units/laws, light,
electricity, chemistry acids/bases/periodic table, biology human body/plants/diseases). Rotate science between
physics / chemistry / biology. Allowed subject keys: maths, reasoning, science, gk, polity, history, geography, economy, railway, computer.
`"exams"`: `["ntpc","gd"]` normally; `["ntpc"]` for NTPC-only topics (computer, higher maths), `["gd"]` for Group D-only.

## Difficulty and style
Like real CBT questions: one line or two, 4 options of the same type, one clearly right answer, distractors that a
careless student would pick (common mistakes). Maths/reasoning solvable in ~45-60 s; give a `trick` (शॉर्टकट) when there is one.
**Vary the correct option position** (not all the same letter; validator warns if one letter is used more than twice).

## File (one per day, IST date)
`data/dpp/YYYY-MM-DD.js` — the content between `RRB.dppLoaded(` and `);` must be valid JSON:
```js
RRB.dppLoaded({
"date": "YYYY-MM-DD",
"items": [
{
 "subject": "maths",
 "topic": {"en": "Percentage / Profit and loss", "hi": "प्रतिशत / लाभ-हानि"},
 "exams": ["ntpc", "gd"],
 "label": "Rail Prep practice (PYQ pattern)",
 "a": 1,
 "en": {"q": "…", "o": ["…", "…", "…", "…"], "e": "explanation", "trick": "optional shortcut"},
 "hi": {"q": "…", "o": ["…", "…", "…", "…"], "e": "व्याख्या", "trick": "वैकल्पिक शॉर्टकट ट्रिक"}
}
// … exactly 5 items
]
});
```

## Steps (from a FRESH clone of origin/main)
1. `git clone -q https://github.com/manubansal0008-blip/rail-prep.git /tmp/rpdpp && cd /tmp/rpdpp`
   If `data/dpp/<today>.js` already exists on main, do not write a new one; just validate and report.
2. Read the last 7 days of `data/dpp/*.js` (subjects used, questions asked) and pick today's subjects from the table.
3. Write `data/dpp/<today>.js`. Re-check every answer and calculation.
4. `python3 tools/build_dpp.py <today>` → prints `Published DPP …` (adds the day to data/dpp/index.js, writes
   dpp/<today>.html, rewrites dpp/*.html nav + dpp/index.html, adds sitemap URL, updates data/updated.js).
5. `python3 tools/validate_dpp.py` must end with `OK` (fix every ERROR, read WARNs).
   Also run `python3 tools/validate_dpp.py` after a news build if both happen in one run (they share sitemap.xml/updated.js).
6. No `?v=` bump is needed for a normal day (new day file = new URL). Do not commit `__pycache__`.
7. Commit together with (or right after) the day's news: message `DPP: YYYY-MM-DD`, author AND committer only
   `manubansal0008-blip <296032542+manubansal0008-blip@users.noreply.github.com>`, no co-author trailers, no force-push.
8. After the Pages deploy (~1 min) check `https://manubansal0008-blip.github.io/rail-prep/dpp/<today>.html` and
   `.../data/dpp/<today>.js` return 200, and `.../data/dpp/index.js` lists the day.

## Local browser test (only when JS/CSS changed)
`cd <repo> && python3 -m http.server 18437 --bind 127.0.0.1` then `python3 /workspace/dpp/dpptest.py`
(home card, nav, quiz right/wrong + व्याख्या, score, reset, static pages, EN/HI, desktop + 390 px mobile, no console errors
apart from the visit-counter CORS error on localhost).
