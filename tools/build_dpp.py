#!/usr/bin/env python3
"""Publish one day of "Daily Practice Problems (DPPs)" after data/dpp/YYYY-MM-DD.js has been written.

Usage:  python3 tools/build_dpp.py 2026-11-09          (run from anywhere; works on the repo root)
        python3 tools/build_dpp.py 2026-11-09 --check  (validate the data file only, change nothing)

What it does (idempotent, safe to re-run):
  1. validates data/dpp/DATE.js (5 questions, known subjects, EN + HI question / 4 options / explanation, answer 0-3,
     label "Rail Prep practice (PYQ pattern)" or, for a real past-paper question, a label with exam + year and a pyq ref)
  2. adds DATE to RRB.DPP_DAYS in data/dpp/index.js (newest first)
  3. writes the static SEO page dpp/DATE.html for every listed day (both languages, answers folded) and dpp/index.html
  4. adds dpp.html, dpp/index.html and dpp/DATE.html to sitemap.xml
  5. sets RRB.UPDATED in data/updated.js to the current India time (footer "Last updated")
"""
import datetime as dt
import json
import os
import re
import sys

sys.dont_write_bytecode = True  # importing build_news must not leave tools/__pycache__ in the repo
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_news import BASE, IST, share_bar, d_en, d_hi, esc, cut, read, write  # noqa: E402

LABEL = "Rail Prep practice (PYQ pattern)"
SUBJ = {"maths": ("Maths", "गणित"), "reasoning": ("Reasoning", "रीज़निंग"), "science": ("General Science", "सामान्य विज्ञान"),
        "gk": ("Static GK", "स्टैटिक GK"), "polity": ("Polity", "राजनीति और संविधान"), "history": ("History", "इतिहास"),
        "geography": ("Geography", "भूगोल"), "economy": ("Economy", "अर्थव्यवस्था"), "railway": ("Railways", "रेलवे"),
        "computer": ("Computer", "कंप्यूटर")}


def load_day(d):
    s = read(f"data/dpp/{d}.js")
    return json.loads(s[s.index("(") + 1:s.rindex(")")])


def validate(d, j):
    err = []
    if j.get("date") != d:
        err.append(f'"date" is {j.get("date")!r}, expected {d!r}')
    items = j.get("items") or []
    if len(items) != 5:
        err.append(f"expected 5 questions, found {len(items)}")
    for k, it in enumerate(items, 1):
        p = f"Q{k}: "
        if it.get("subject") not in SUBJ:
            err.append(p + f"unknown subject {it.get('subject')!r} (allowed: {', '.join(SUBJ)})")
        if it.get("a") not in (0, 1, 2, 3):
            err.append(p + '"a" must be 0-3')
        for lang in ("en", "hi"):
            L = it.get(lang) or {}
            if not L.get("q") or not L.get("e") or not isinstance(L.get("o"), list) or len(L["o"]) != 4:
                err.append(p + f"{lang} needs q, e and exactly 4 options")
        lab = it.get("label", "")
        if it.get("pyq"):
            if not (re.search(r"RRB", lab) and re.search(r"\b20\d\d\b", lab)):
                err.append(p + "a past-paper question needs a label with the exam and year, e.g. 'RRB NTPC 2021 (CBT 1)'")
        elif lab != LABEL:
            err.append(p + f"label must be exactly {LABEL!r}")
    if err:
        sys.exit("Data file problems:\n  - " + "\n  - ".join(err))


def questions(j, lang):
    hi = lang == "hi"
    n = len(j["items"])
    out = []
    for i, it in enumerate(j["items"]):
        L = it[lang]
        subj = SUBJ[it["subject"]][1 if hi else 0]
        topic = (it.get("topic") or {}).get(lang, "")
        opts = "".join(f"<li>{esc(o)}</li>" for o in L["o"])
        letter = "ABCD"[it["a"]]
        trick = (f'<p class="expl dpp-trick"><strong>⚡ {"शॉर्टकट ट्रिक:" if hi else "Shortcut:"}</strong> {esc(L["trick"])}</p>'
                 if L.get("trick") else "")
        out.append(
            f'<article class="card dpp-q" id="{lang}-q{i + 1}"><div class="dpp-top"><span class="tag nw-cat">{esc(subj)}</span>'
            + (f'<span class="muted dpp-topic">{esc(topic)}</span>' if topic else "")
            + f'<span class="muted nw-n">{i + 1}/{n}</span></div>'
            f'<p class="dpp-lbl"><span class="tag {"ok" if it.get("pyq") else "new"}">{esc(it["label"])}</span></p>'
            f'<p class="qtext"><strong>Q{i + 1}.</strong> {esc(L["q"])}</p><ol class="st-opts" type="A">{opts}</ol>'
            f'<details class="st-ans"><summary>{"उत्तर और व्याख्या देखें" if hi else "Show answer and explanation"}</summary>'
            f'<p><strong>({letter}) {esc(L["o"][it["a"]])}</strong></p><p class="expl"><strong>{"व्याख्या:" if hi else "Explanation:"}</strong> {esc(L["e"])}</p>{trick}</details></article>')
    return "".join(out)


def nav(prev, nxt):
    parts = []
    if prev:
        parts.append(f'<a href="{prev}.html">← {d_en(prev)}</a>')
    if nxt:
        parts.append(f'<a href="{nxt}.html">{d_en(nxt)} →</a>')
    return '<p class="st-nav">' + " · ".join(parts) + "</p>" if parts else ""


def set_head(tpl, title, desc, url):
    head = re.sub(r"<title>.*?</title>", lambda _: f"<title>{esc(title)}</title>", tpl, count=1)
    for attr, val in (('name="description"', desc), ('property="og:title"', title), ('property="og:description"', desc),
                      ('property="og:url"', url)):
        head = re.sub(r'(<meta ' + re.escape(attr) + r' content=")[^"]*(")', lambda m: m.group(1) + esc(val) + m.group(2), head, count=1)
    return re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda m: m.group(1) + esc(url) + m.group(2), head, count=1)


def head_template():
    # news/index.html head (style, chat, notes, news CSS at the current ?v=) + dpp.css, nav highlights "DPP"
    s = read("news/index.html")
    h = s[:s.index("<main")]
    h = h.replace('data-nav="news.html"', 'data-nav="dpp.html"', 1)
    if "css/dpp.css" not in h:
        h = re.sub(r'(<link rel="stylesheet" href="\.\./css/news\.css(\?v=[^"]*)">)', r'\1\n<link rel="stylesheet" href="../css/dpp.css\2">', h, count=1)
    h = h.replace('<meta property="og:type" content="website">', '<meta property="og:type" content="article">', 1)
    return h


def day_page(d, j, tpl, prev, nxt):
    subs = ", ".join(SUBJ[it["subject"]][0] for it in j["items"])
    title = f"Daily Practice Problems (DPPs) {d_en(d)} for RRB NTPC & Group D | {d_hi(d)} के 5 प्रश्न | Rail Prep"
    desc = (f"DPP {d_en(d)}: 5 practice questions in the pattern of previous RRB NTPC and Group D papers ({subs}) with answers "
            f"and explanations. {cut(j['items'][0]['hi']['q'], 70)}")
    url = f"{BASE}dpp/{d}.html"
    body = (f'<main class="wrap st-page">\n<p class="nt-back"><a href="index.html">← All days · सभी दिन</a></p>'
            f'<div class="nt-head"><div><small>RRB NTPC · Group D</small><h1>Daily Practice Problems (DPPs): {d_en(d)} '
            f'<span class="st-sub" lang="hi">{d_hi(d)} के 5 प्रैक्टिस प्रश्न</span></h1></div>'
            f'<div class="nt-act"><a class="btn" href="../dpp.html#{d}">Interactive quiz · इंटरैक्टिव क्विज़</a></div></div>'
            f'<p class="dpp-note">Rail Prep practice questions in the pattern of previous RRB papers, not real past-paper questions. '
            f'<span lang="hi">ये Rail Prep के अपने प्रैक्टिस प्रश्न हैं, RRB के असली पिछले पेपर के प्रश्न नहीं।</span> '
            f'<a href="../papers.html">Real past papers · असली पिछले पेपर →</a></p>'
            f'<div class="st-both st-dpp"><section class="st-hi" lang="hi"><p class="st-lang">हिंदी</p><div class="dpp-list">{questions(j, "hi")}</div></section>'
            f'<section class="st-en" lang="en"><p class="st-lang">English</p><div class="dpp-list">{questions(j, "en")}</div></section></div>'
            f'{nav(prev, nxt)}{share_bar(title, url)}\n</main>\n</body>\n</html>\n')
    return set_head(tpl, title, desc, url) + body


def index_page(days, data, tpl):
    title = "Daily Practice Problems (DPPs) for RRB NTPC & Group D: all days | रोज़ के 5 प्रैक्टिस प्रश्न | Rail Prep"
    desc = ("All Daily Practice Problems (DPPs) for RRB NTPC UG and Group D: 5 questions a day in the pattern of previous papers, "
            "with answers and explanations in Hindi and English. सभी दिनों के DPP।")
    url = f"{BASE}dpp/index.html"
    lis = "".join(
        f'<li class="ok"><a href="{x}.html"><span>{d_en(x)} · <span lang="hi">{d_hi(x)}</span></span>'
        f'<span class="muted">{esc(", ".join(SUBJ[it["subject"]][0] for it in data[x]["items"]))}</span></a></li>' for x in days)
    body = (f'<main class="wrap st-page">\n<div class="list-head"><h1>Daily Practice Problems (DPPs) <span class="st-sub" lang="hi">रोज़ के 5 प्रैक्टिस प्रश्न</span></h1></div>'
            f'<p class="muted">5 questions every day for RRB NTPC UG and Group D, in the pattern of previous papers (Rail Prep practice, not real past-paper questions). '
            f'<a href="../dpp.html">Interactive quiz · इंटरैक्टिव क्विज़ →</a></p><div class="card nt-list"><ul>{lis}</ul></div>'
            f'{share_bar(title, url)}\n</main>\n</body>\n</html>\n')
    h = set_head(tpl, title, desc, url).replace('<meta property="og:type" content="article">', '<meta property="og:type" content="website">', 1)
    return h + body


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1 or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", args[0]):
        sys.exit(__doc__)
    d = args[0]
    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    j = load_day(d)
    validate(d, j)
    if "--check" in sys.argv:
        print(f"{d}: DPP data file OK")
        return

    idx = read("data/dpp/index.js")
    days = sorted(set(re.findall(r'"(\d{4}-\d{2}-\d{2})"', idx) + [d]), reverse=True)
    idx = re.sub(r"RRB\.DPP_DAYS = \[[^\]]*\];", lambda _: "RRB.DPP_DAYS = [\n" + "".join(f'"{x}",\n' for x in days) + "];", idx, count=1)
    write("data/dpp/index.js", idx)

    data = {x: load_day(x) for x in days}
    tpl = head_template()
    os.makedirs("dpp", exist_ok=True)
    for k, x in enumerate(days):
        nxt = days[k - 1] if k > 0 else None
        prev = days[k + 1] if k + 1 < len(days) else None
        write(f"dpp/{x}.html", day_page(x, data[x], tpl, prev, nxt))
    write("dpp/index.html", index_page(days, data, tpl))

    sm = read("sitemap.xml")
    today = dt.datetime.now(IST).strftime("%Y-%m-%d")

    def add(loc, freq, prio, before_re):
        nonlocal sm
        if f"<loc>{loc}</loc>" in sm:
            return
        e = f"  <url><loc>{loc}</loc><lastmod>{today}</lastmod><changefreq>{freq}</changefreq><priority>{prio}</priority></url>\n"
        m = re.search(before_re, sm)
        sm = sm[:m.start()] + e + sm[m.start():] if m else sm.replace("</urlset>", e + "</urlset>")
    add(f"{BASE}dpp.html", "daily", "0.8", r"  <url><loc>" + re.escape(BASE) + r"monthly\.html</loc>")
    add(f"{BASE}dpp/index.html", "daily", "0.6", r"  <url><loc>" + re.escape(BASE) + r"dpp/\d{4}-\d{2}-\d{2}\.html</loc>|  <url><loc>" + re.escape(BASE) + r"news/index\.html</loc>")
    add(f"{BASE}dpp/{d}.html", "yearly", "0.6", r"  <url><loc>" + re.escape(BASE) + r"dpp/\d{4}-\d{2}-\d{2}\.html</loc>|  <url><loc>" + re.escape(BASE) + r"news/index\.html</loc>")
    for p in ("dpp.html", "dpp/index.html"):
        sm = re.sub(r"(<loc>" + re.escape(BASE + p) + r"</loc><lastmod>)[^<]*", lambda m: m.group(1) + today, sm)
    write("sitemap.xml", sm)

    up = read("data/updated.js")
    now = dt.datetime.now(IST).strftime("%Y-%m-%dT%H:%M:00+05:30")
    write("data/updated.js", re.sub(r'RRB\.UPDATED = "[^"]*"', f'RRB.UPDATED = "{now}"', up))
    print(f"Published DPP {d}: data/dpp/index.js, dpp/*.html ({len(days)} day(s)), dpp/index.html, sitemap.xml "
          f"({sm.count('<url>')} urls), data/updated.js")


if __name__ == "__main__":
    main()
