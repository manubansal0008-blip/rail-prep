#!/usr/bin/env python3
"""Publish one day of "Today's 5 news" after data/news/YYYY-MM-DD.js has been written.

Usage:  python3 tools/build_news.py 2026-11-02          (run from the repo root)
        python3 tools/build_news.py 2026-11-02 --check  (validate the data file only, change nothing)

What it does (all idempotent, safe to re-run for the same day):
  1. validates data/news/DATE.js (5 items, known categories, 4 options + answer in both languages, sources)
  2. adds DATE as the first line of RRB.NEWS_DAYS in data/news/index.js
  3. writes the static SEO page news/DATE.html (same layout as the older day pages) and links the
     previous day's page forward to it ("DATE →")
  4. adds DATE at the top of the list in news/index.html
  5. adds news/DATE.html to sitemap.xml and bumps news.html / home lastmod
  6. sets RRB.UPDATED in data/updated.js to the current India time (footer "Last updated")
"""
import datetime as dt
import html
import json
import os
import re
import sys
import urllib.parse

BASE = "https://manubansal0008-blip.github.io/rail-prep/"
CATS = ["scheme", "sports", "awards", "appointments", "defence", "science", "railways", "states",
        "international", "economy", "days"]
CAT_EN = {"scheme": "Government scheme", "sports": "Sports", "awards": "Awards", "appointments": "Appointments",
          "defence": "Defence", "science": "Science / Space", "railways": "Railways", "states": "States",
          "international": "International", "economy": "Economy / Banking", "days": "Summits / Days"}
CAT_HI = {"scheme": "सरकारी योजना", "sports": "खेल", "awards": "पुरस्कार", "appointments": "नियुक्ति", "defence": "रक्षा",
          "science": "विज्ञान/अंतरिक्ष", "railways": "रेलवे", "states": "राज्य", "international": "अंतरराष्ट्रीय",
          "economy": "अर्थव्यवस्था/बैंकिंग", "days": "सम्मेलन/दिवस"}
MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
             "November", "December"]
MONTHS_HI = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"]
IST = dt.timezone(dt.timedelta(hours=5, minutes=30))

WA_SVG = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>'


def esc(s):
    return html.escape(str(s), quote=True)


def cut(s, n):
    if len(s) <= n:
        return s
    t = s[:n]
    if " " in t and s[n] != " ":
        t = t.rsplit(" ", 1)[0]
    return t.rstrip() + "…"


def d_en(d):
    y, m, dd = map(int, d.split("-"))
    return f"{dd} {MONTHS_EN[m - 1]} {y}"


def d_hi(d):
    y, m, dd = map(int, d.split("-"))
    return f"{dd} {MONTHS_HI[m - 1]} {y}"


def read(p):
    with open(p, encoding="utf-8") as f:
        return f.read()


def write(p, s):
    with open(p, "w", encoding="utf-8") as f:
        f.write(s)


def load_day(d):
    s = read(f"data/news/{d}.js")
    return json.loads(s[s.index("(") + 1:s.rindex(")")])


def validate(d, j):
    err = []
    if j.get("date") != d:
        err.append(f'"date" is {j.get("date")!r}, expected {d!r}')
    items = j.get("items") or []
    if len(items) != 5:
        err.append(f"expected 5 items, found {len(items)}")
    for k, it in enumerate(items, 1):
        p = f"item {k}: "
        if it.get("cat") not in CATS:
            err.append(p + f"unknown cat {it.get('cat')!r} (allowed: {', '.join(CATS)})")
        for lang in ("en", "hi"):
            L = it.get(lang) or {}
            if not L.get("title") or not L.get("summary"):
                err.append(p + f"{lang}.title / {lang}.summary missing")
            if not isinstance(L.get("facts"), list) or not L["facts"]:
                err.append(p + f"{lang}.facts must be a non-empty list")
        m = it.get("mcq") or {}
        if m.get("a") not in (0, 1, 2, 3):
            err.append(p + "mcq.a must be 0-3")
        for lang in ("en", "hi"):
            L = m.get(lang) or {}
            if not L.get("q") or not L.get("e") or not isinstance(L.get("o"), list) or len(L["o"]) != 4:
                err.append(p + f"mcq.{lang} needs q, e and exactly 4 options")
        src = it.get("src") or []
        if not src or any(not (s.get("name") and s.get("nameHi") and str(s.get("url", "")).startswith("http")) for s in src):
            err.append(p + "src needs at least one {name, nameHi, url}")
    if err:
        sys.exit("Data file problems:\n  - " + "\n  - ".join(err))


def share_bar(text, url):
    q = urllib.parse.quote
    wa = "https://wa.me/?text=" + q(text + "\n" + url, safe="")
    tg = "https://t.me/share/url?url=" + q(url, safe="") + "&text=" + q(text, safe="")
    copy_svg = ('<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" '
                'stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.2 1.2"/>'
                '<path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.2-1.2"/></svg>')
    tg_svg = ('<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M21.6 3.2 2.9 10.4c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.8c.3-1.3-.5-1.9-1.3-1.5zM9.4 13.1l8.6-5.4c.4-.3.8-.1.5.2l-7.2 6.5-.3 3.2-1.6-4.5z"/></svg>')
    return (f'<div class="share-bar" role="group" aria-label="शेयर करें" data-share="page" data-text="{esc(text)}" data-url="{esc(url)}">'
            '<span class="sh-lbl">शेयर करें:</span>'
            f'<a class="sh-btn sh-wa" href="{esc(wa)}" target="_blank" rel="noopener" aria-label="WhatsApp पर शेयर करें">{WA_SVG}<span>WhatsApp</span></a>'
            f'<a class="sh-btn sh-tg" href="{esc(tg)}" target="_blank" rel="noopener" aria-label="Telegram पर शेयर करें">{tg_svg}<span>Telegram</span></a>'
            f'<button type="button" class="sh-btn sh-copy" aria-label="लिंक कॉपी करें">{copy_svg}<span>लिंक कॉपी करें</span></button></div>')


def articles(j, lang):
    hi = lang == "hi"
    n = len(j["items"])
    out = []
    for i, it in enumerate(j["items"]):
        L, m = it[lang], it["mcq"]
        M = m[lang]
        cat = (CAT_HI if hi else CAT_EN)[it["cat"]]
        facts = "".join(f"<li>{esc(f)}</li>" for f in L["facts"])
        opts = "".join(f"<li>{esc(o)}</li>" for o in M["o"])
        letter = "ABCD"[m["a"]]
        srcs = " · ".join(f'<a href="{esc(s["url"])}" target="_blank" rel="noopener">{esc(s["nameHi"] if hi else s["name"])}</a>'
                          for s in it["src"])
        out.append(
            f'<article class="card nw-item" id="i{i}"><div class="nw-top"><span class="tag nw-cat">{esc(cat)}</span>'
            f'<span class="muted nw-n">{i + 1}/{n}</span></div><h3>{esc(L["title"])}</h3><p class="nw-sum">{esc(L["summary"])}</p>'
            f'<div class="nw-facts"><strong>📌 {"परीक्षा के लिए याद रखें" if hi else "Remember for the exam"}</strong><ul>{facts}</ul></div>'
            f'<div class="nw-mcq"><p class="nw-q"><strong>{"छोटा सवाल:" if hi else "Quick question:"}</strong> {esc(M["q"])}</p>'
            f'<ol class="st-opts" type="A">{opts}</ol><details class="st-ans"><summary>{"उत्तर देखें" if hi else "Show answer"}</summary>'
            f'<p><strong>({letter}) {esc(M["o"][m["a"]])}</strong> {esc(M["e"])}</p></details></div>'
            f'<p class="nw-src">{"स्रोत" if hi else "Source"}: {srcs}</p></article>')
    return "".join(out)


def nav(prev, nxt):
    parts = []
    if prev:
        parts.append(f'<a href="{prev}.html">← {d_en(prev)}</a>')
    if nxt:
        parts.append(f'<a href="{nxt}.html">{d_en(nxt)} →</a>')
    return '<p class="st-nav">' + " · ".join(parts) + "</p>" if parts else ""


def page(d, j, head_tpl, prev, nxt):
    en = "; ".join(it["en"]["title"] for it in j["items"])
    hi = "; ".join(it["hi"]["title"] for it in j["items"])
    title = f"Current Affairs {d_en(d)} for RRB NTPC & Group D | {d_hi(d)} की {len(j['items'])} ख़बरें | Rail Prep"
    desc = f"Current affairs {d_en(d)}: {cut(en, 128)} {d_hi(d)} की ख़बरें: {cut(hi, 64)}"
    url = f"{BASE}news/{d}.html"
    head = head_tpl
    head = re.sub(r"<title>.*?</title>", lambda _: f"<title>{esc(title)}</title>", head, count=1)
    for attr, val in (('name="description"', desc), ('property="og:title"', title), ('property="og:description"', desc),
                      ('property="og:url"', url)):
        head = re.sub(r'(<meta ' + re.escape(attr) + r' content=")[^"]*(")', lambda mm: mm.group(1) + esc(val) + mm.group(2), head, count=1)
    head = re.sub(r'(<link rel="canonical" href=")[^"]*(")', lambda mm: mm.group(1) + esc(url) + mm.group(2), head, count=1)
    body = (f'<main class="wrap st-page">\n<p class="nt-back"><a href="index.html">← All days · सभी दिन</a></p>'
            f'<div class="nt-head"><div><small>RRB NTPC · Group D</small><h1>Current affairs: {d_en(d)} '
            f'<span class="st-sub" lang="hi">{d_hi(d)} की {len(j["items"])} ख़बरें</span></h1></div>'
            f'<div class="nt-act"><a class="btn" href="../news.html#{d}">Interactive version · इंटरैक्टिव पेज</a></div></div>'
            f'<div class="st-both st-news"><section class="st-en" lang="en"><p class="st-lang">English</p><div class="nw-list">{articles(j, "en")}</div></section>'
            f'<section class="st-hi" lang="hi"><p class="st-lang">हिंदी</p><div class="nw-list">{articles(j, "hi")}</div></section></div>'
            f'{nav(prev, nxt)}{share_bar(title, url)}\n</main>\n</body>\n</html>\n')
    return head + body


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if len(args) != 1 or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", args[0]):
        sys.exit(__doc__)
    d = args[0]
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(root)
    j = load_day(d)
    validate(d, j)
    if "--check" in sys.argv:
        print(f"{d}: data file OK")
        return

    # 1. data/news/index.js
    idx_js = read("data/news/index.js")
    days = re.findall(r'"(\d{4}-\d{2}-\d{2})"', idx_js)
    days = sorted(set(days + [d]), reverse=True)  # always newest first, also when an older day is back-filled
    idx_js = re.sub(r"RRB\.NEWS_DAYS = \[[^\]]*\];", lambda _: "RRB.NEWS_DAYS = [\n" + "".join(f'"{x}",\n' for x in days) + "];", idx_js, count=1)
    write("data/news/index.js", idx_js)
    pos = days.index(d)
    nxt = days[pos - 1] if pos > 0 else None
    prev = days[pos + 1] if pos + 1 < len(days) else None

    # 2. static page (head copied from the newest other day page so CSS/JS versions stay current)
    tpl_day = next(x for x in days if x != d and os.path.exists(f"news/{x}.html"))
    tpl = read(f"news/{tpl_day}.html")
    head_tpl = tpl[:tpl.index("<main")]
    write(f"news/{d}.html", page(d, j, head_tpl, prev, nxt))
    for other, o_prev, o_next in ((prev, None, d), (nxt, d, None)):
        if other and os.path.exists(f"news/{other}.html"):
            s = read(f"news/{other}.html")
            op = days[days.index(other) + 1] if days.index(other) + 1 < len(days) else None
            on = days[days.index(other) - 1] if days.index(other) > 0 else None
            new_nav = nav(op, on)
            if '<p class="st-nav">' in s:
                s = re.sub(r'<p class="st-nav">.*?</p>', lambda _: new_nav, s, count=1)
            else:
                s = s.replace('<div class="share-bar"', new_nav + '<div class="share-bar"', 1)
            write(f"news/{other}.html", s)

    # 3. news/index.html list
    ni = read("news/index.html")
    if f'href="{d}.html"' not in ni:
        en = "; ".join(it["en"]["title"] for it in j["items"])
        li = (f'<li class="ok"><a href="{d}.html"><span>{d_en(d)} · <span lang="hi">{d_hi(d)}</span></span>'
              f'<span class="muted">{esc(cut(en, 90))}</span></a></li>')
        # keep the list newest first
        items = re.findall(r'<li class="ok"><a href="(\d{4}-\d{2}-\d{2})\.html">', ni)
        after = [x for x in items if x < d]
        if after:
            ni = ni.replace(f'<li class="ok"><a href="{after[0]}.html">', li + f'<li class="ok"><a href="{after[0]}.html">', 1)
        elif items:  # older than every listed day: goes at the end of the list
            a = ni.index('<div class="card nt-list"><ul>')
            b = ni.index("</ul>", a)
            ni = ni[:b] + li + ni[b:]
        else:
            ni = ni.replace('<div class="card nt-list"><ul>', '<div class="card nt-list"><ul>' + li, 1)
        write("news/index.html", ni)

    # 4. sitemap
    sm = read("sitemap.xml")
    today = dt.datetime.now(IST).strftime("%Y-%m-%d")
    loc = f"{BASE}news/{d}.html"
    if loc not in sm:
        entry = f"  <url><loc>{loc}</loc><lastmod>{today}</lastmod><changefreq>yearly</changefreq><priority>0.6</priority></url>\n"
        m = re.search(r"  <url><loc>" + re.escape(BASE) + r"news/\d{4}-\d{2}-\d{2}\.html</loc>", sm)
        sm = sm[:m.start()] + entry + sm[m.start():] if m else sm.replace("</urlset>", entry + "</urlset>")
    for p in ("", "news.html", "news/index.html"):
        sm = re.sub(r"(<loc>" + re.escape(BASE + p) + r"</loc><lastmod>)[^<]*", lambda mm: mm.group(1) + today, sm)
    write("sitemap.xml", sm)

    # 5. footer "Last updated"
    up = read("data/updated.js")
    now = dt.datetime.now(IST).strftime("%Y-%m-%dT%H:%M:00+05:30")
    write("data/updated.js", re.sub(r'RRB\.UPDATED = "[^"]*"', f'RRB.UPDATED = "{now}"', up))
    print(f"Published {d}: data/news/index.js, news/{d}.html, news/index.html, sitemap.xml, data/updated.js"
          + (f", news/{prev}.html (next link)" if prev else ""))


if __name__ == "__main__":
    main()
