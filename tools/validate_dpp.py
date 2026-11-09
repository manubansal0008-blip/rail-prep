#!/usr/bin/env python3
"""Validate Rail Prep "Daily Practice Problems (DPPs)".
Usage: python3 tools/validate_dpp.py [site_dir]   (same file as /workspace/dpp/validate.py)
       default site_dir: the current directory if it has data/dpp, else the repo this script sits in, else /workspace/dpp-build
Checks data/dpp/index.js (newest first, unique, every day has a file and every file is listed) and every data/dpp/YYYY-MM-DD.js:
5 questions, known subjects (max 2 per subject, warn if < 4 different), EN + HI question / 4 different options / explanation,
answer 0-3, Hindi has Devanagari, label exactly "Rail Prep practice (PYQ pattern)" unless it is a real past-paper question
(then "pyq": {"paper": id, "n": 1-based} must exist in data/papers, its official answer must match and the label must name exam + year),
a practice question must not copy a real paper question word for word, no question repeated across days, answer positions varied,
static page dpp/DAY.html exists and sitemap.xml lists it. Exit 1 on any error."""
import json, os, re, sys
_repo = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = sys.argv[1] if len(sys.argv) > 1 else (os.getcwd() if os.path.isdir("data/dpp") else _repo if os.path.isdir(os.path.join(_repo, "data", "dpp")) else "/workspace/dpp-build")
D = os.path.join(SITE, "data", "dpp")
LABEL = "Rail Prep practice (PYQ pattern)"
SUBJ = {"maths", "reasoning", "science", "gk", "polity", "history", "geography", "economy", "railway", "computer"}
errs, warns = [], []
E, W = errs.append, warns.append
def load(path, fn):
    s = open(path, encoding="utf-8").read()
    m = re.search(re.escape(fn) + r"\((.*)\);?\s*$", s, re.S)
    if not m: E(f"{path}: does not call {fn}(...)"); return None
    try: return json.loads(m.group(1))
    except Exception as e: E(f"{path}: not valid JSON inside {fn}(): {e}"); return None
def norm(s): return re.sub(r"[\W_]+", " ", str(s).lower()).strip()
# real past-paper questions (not our mocks), for pyq checks and to catch practice questions copied word for word
papers, paper_q = {}, {}
pdir = os.path.join(SITE, "data", "papers")
for f in sorted(os.listdir(pdir)) if os.path.isdir(pdir) else []:
    if f.endswith(".js"):
        p = load(os.path.join(pdir, f), "RRB.load")
        if p:
            papers[p["id"]] = p
            for k, q in enumerate(p.get("questions", []), 1):
                if len(norm(q.get("q", ""))) > 25: paper_q[norm(q["q"])] = f"{p['id']} Q{k}"
idx = open(os.path.join(D, "index.js"), encoding="utf-8").read()
days = re.findall(r'"(\d{4}-\d{2}-\d{2})"', idx)
if "RRB.DPP_DAYS" not in idx or not days: E("index.js: RRB.DPP_DAYS missing or empty")
if days != sorted(days, reverse=True): E("index.js: days must be newest first")
if len(set(days)) != len(days): E("index.js: duplicate day")
for f in sorted(x[:-3] for x in os.listdir(D) if re.match(r"\d{4}-\d{2}-\d{2}\.js$", x)):
    if f not in days: E(f"{f}.js exists but is not listed in index.js")
sm = open(os.path.join(SITE, "sitemap.xml"), encoding="utf-8").read()
seen = {}
def txt(w, v, mn, mx):
    if not isinstance(v, str) or not (mn <= len(v.strip()) <= mx): E(f"{w}: text missing or wrong length")
for day in sorted(days):
    p = os.path.join(D, day + ".js")
    if not os.path.exists(p): E(f"index.js lists {day} but {day}.js is missing"); continue
    d = load(p, "RRB.dppLoaded")
    if not d: continue
    if d.get("date") != day: E(f"{day}.js: date field is {d.get('date')!r}")
    items = d.get("items", [])
    if len(items) != 5: E(f"{day}: needs exactly 5 questions, has {len(items)}")
    sc = {}
    for i, it in enumerate(items, 1):
        w = f"{day} Q{i}"
        s = it.get("subject"); sc[s] = sc.get(s, 0) + 1
        if s not in SUBJ: E(f"{w}: unknown subject {s!r}")
        if it.get("a") not in (0, 1, 2, 3): E(f"{w}: a must be 0-3")
        for L in ("en", "hi"):
            x = it.get(L) or {}
            txt(f"{w} {L}.q", x.get("q"), 8, 600); txt(f"{w} {L}.e", x.get("e"), 15, 700)
            if x.get("trick") is not None: txt(f"{w} {L}.trick", x.get("trick"), 5, 300)
            o = x.get("o")
            if not isinstance(o, list) or len(o) != 4 or len(set(map(str.strip, o))) != 4 or not all(isinstance(v, str) and v.strip() for v in o):
                E(f"{w} {L}.o: need 4 different options")
        hi = it.get("hi") or {}
        for k in ("q", "e"):
            if isinstance(hi.get(k), str) and not re.search(r"[\u0900-\u097F]", hi[k]): E(f"{w} hi.{k}: Hindi text has no Devanagari")
        if (it.get("hi") or {}).get("trick") and not (it.get("en") or {}).get("trick"): W(f"{w}: trick only in Hindi")
        lab, pyq = it.get("label", ""), it.get("pyq")
        if pyq:
            P = papers.get(pyq.get("paper"))
            if not P: E(f"{w}: pyq.paper {pyq.get('paper')!r} not found in data/papers")
            else:
                n = pyq.get("n")
                if not isinstance(n, int) or not 1 <= n <= len(P["questions"]): E(f"{w}: pyq.n out of range")
                else:
                    Q = P["questions"][n - 1]
                    if it.get("a") != Q.get("a"): E(f"{w}: answer {it.get('a')} differs from the official key {Q.get('a')} of {P['id']} Q{n}")
                    if norm(Q.get("q")) != norm((it.get("en") or {}).get("q")): W(f"{w}: en.q differs from {P['id']} Q{n}; past-paper questions must be verbatim")
            if not (re.search(r"RRB", lab) and re.search(r"\b20\d\d\b", lab)): E(f"{w}: past-paper label must name the exam and year, e.g. 'RRB NTPC 2021 (CBT 1)'")
        else:
            if lab != LABEL: E(f"{w}: label must be exactly {LABEL!r}")
            hit = paper_q.get(norm((it.get("en") or {}).get("q", "")))
            if hit: E(f"{w}: practice question copies real past-paper question {hit}; label it as a PYQ with pyq ref, or rewrite it")
        key = norm((it.get("en") or {}).get("q", ""))
        if key in seen: E(f"{w}: same question as {seen[key]}")
        else: seen[key] = w
    for s, n in sc.items():
        if n > 2: E(f"{day}: subject {s} used {n} times (max 2)")
    if len(sc) < 4: W(f"{day}: only {len(sc)} different subjects (aim for 5)")
    ans = [it.get("a") for it in items]
    if len(items) == 5 and max(ans.count(a) for a in set(ans)) > 2: W(f"{day}: one answer position used more than twice {ans}")
    if not os.path.exists(os.path.join(SITE, "dpp", day + ".html")): E(f"{day}: dpp/{day}.html missing (run tools/build_dpp.py {day})")
    if f"/dpp/{day}.html</loc>" not in sm: E(f"{day}: not in sitemap.xml (run tools/build_dpp.py {day})")
for w in warns: print("WARN", w)
for e in errs: print("ERROR", e)
print(f"checked {len(days)} DPP day(s), {len(papers)} past papers: {'OK' if not errs else str(len(errs)) + ' error(s)'}")
sys.exit(1 if errs else 0)
