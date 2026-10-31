// CBT-style test engine + results. Status: 0 not visited, 1 not answered, 2 answered, 3 marked, 4 answered & marked.
(function () {
  var E = RRB.esc, $ = function (s) { return document.querySelector(s); };
  var T = function (k, v) { return RRB.t(k, v); }, SEC = function (s) { return E(RRB.tSec(s)); };
  function stName(k) { return T("st." + k); }
  var D, Q, S, secs, timerId, app;

  function save() { localStorage.setItem(RRB.ACTIVE, JSON.stringify(S)); }
  function fmt(sec) { sec = Math.max(0, Math.round(sec)); var h = Math.floor(sec / 3600), m = Math.floor(sec / 60) % 60, s = sec % 60;
    return (h ? h + ":" : "") + String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0"); }
  function counts(list) { var c = [0, 0, 0, 0, 0]; list.forEach(function (i) { c[S.st[i]]++; }); return c; }
  function figs(q) { return RRB.figs(q); }
  function optHtml(q, k) { return RRB.optImg(q, k) + (hi(q.oh && q.oh[k]) ? '<span lang="hi">' + E(q.oh[k]) + "</span>" : E(q.o[k])); }
  var LANG = RRB.lang(), RES = null, RES_F = "all";
  function hi(v) { return LANG === "hi" && v != null && v !== ""; }
  function txt(q) { return hi(q.qh) ? '<p class="qtext" lang="hi">' + E(q.qh) + "</p>" : q.q ? '<p class="qtext">' + E(q.q) + "</p>" : ""; }
  function ex(q) { return hi(q.eh) ? '<p class="expl" lang="hi"><strong>' + T("test.expl") + '</strong> ' + E(q.eh) + "</p>" : q.e ? '<p class="expl"><strong>' + T("test.expl") + '</strong> ' + E(q.e) + "</p>" : ""; }
  function langSw() { return '<div class="lang" role="group" aria-label="' + T("test.qLang") + '" data-i18n-attr="aria-label:test.qLang"><button data-l="en" aria-pressed="' + (LANG === "en") + '">EN</button><button data-l="hi" lang="hi" aria-pressed="' + (LANG === "hi") + '">हिंदी</button></div>'; }
  // The test's EN/हिंदी switch drives the whole site language; the "rrb:lang" listener below redraws.
  function bindLang() { document.querySelectorAll(".lang:not(.cb-lang):not(.top-lang) button").forEach(function (b) { b.onclick = function () { RRB.setLang(b.dataset.l); }; }); }
  function idxOf(sec) { var r = []; Q.forEach(function (q, i) { if (q.s === sec) r.push(i); }); return r; }

  function start(d) {
    D = d; Q = d.questions; secs = [];
    Q.forEach(function (q) { if (secs.indexOf(q.s) < 0) secs.push(q.s); });
    var a = JSON.parse(localStorage.getItem(RRB.ACTIVE) || "null");
    if (a && a.id === d.id && a.st.length === Q.length) S = a;
    else S = { id: d.id, cur: 0, ans: Q.map(function () { return -1; }), st: Q.map(function () { return 0; }), startAt: Date.now(), endAt: Date.now() + d.meta.min * 60000 };
    S.sel = S.ans[S.cur];
    document.body.classList.add("testing");
    app.innerHTML =
      '<div class="cbt">' +
      '<div class="cbt-bar"><div class="cbt-title"><strong data-lbl="1">' + E(RRB.tLabel(d.meta.label)) + '</strong><small>' + T("test.qsMarks", { n: Q.length }) + "</small></div>" +
      langSw() + '<div class="timer" id="timer" aria-live="off">--:--</div>' +
      '<button class="icon-btn pal-btn" id="palBtn" aria-label="' + T("test.palOpen") + '" data-i18n-attr="aria-label:test.palOpen">▦</button></div>' +
      '<div class="tabs" id="tabs" role="tablist"></div>' +
      '<div class="cbt-body"><section class="qpane" id="qpane"></section>' +
      '<div class="overlay" id="overlay"></div><aside class="palette" id="palette" aria-label="' + T("test.palette") + '" data-i18n-attr="aria-label:test.palette"></aside></div>' +
      '<div class="actions">' +
      '<button class="b ghost" id="markBtn"><span class="lf" data-i18n-html="test.mark">' + T("test.mark") + '</span><span class="ls" data-i18n-html="test.markS">' + T("test.markS") + '</span></button>' +
      '<button class="b ghost" id="clearBtn" data-i18n="test.clear">' + T("test.clear") + '</button>' +
      '<span class="sp"></span><button class="b ghost" id="prevBtn" data-i18n="test.prev">' + T("test.prev") + '</button>' +
      '<button class="b primary" id="saveBtn"><span class="lf" data-i18n-html="test.save">' + T("test.save") + '</span><span class="ls" data-i18n-html="test.saveS">' + T("test.saveS") + '</span></button></div></div>' +
      '<div class="modal" id="modal" hidden></div>';
    bindLang();
    $("#saveBtn").onclick = function () { commit(false); next(); };
    $("#markBtn").onclick = function () { commit(true); next(); };
    $("#clearBtn").onclick = function () { S.sel = -1; S.ans[S.cur] = -1; S.st[S.cur] = 1; save(); draw(); };
    $("#prevBtn").onclick = function () { go(S.cur - 1); };
    $("#palBtn").onclick = function () { togglePal(); };
    $("#overlay").onclick = function () { togglePal(false); };
    tick(); timerId = setInterval(tick, 1000);
    go(S.cur);
  }
  function togglePal(force) { var o = $("#palette").classList.toggle("open", force); $("#overlay").classList.toggle("show", o); }
  function commit(mark) {
    var has = S.sel >= 0; S.ans[S.cur] = S.sel;
    S.st[S.cur] = mark ? (has ? 4 : 3) : (has ? 2 : 1); save();
  }
  function next() { if (S.cur < Q.length - 1) go(S.cur + 1); else { draw(); confirmSubmit(); } }
  function go(i) {
    if (i < 0 || i >= Q.length) return;
    S.cur = i; if (S.st[i] === 0) S.st[i] = 1; S.sel = S.ans[i]; save(); draw();
    $("#qpane").scrollTop = 0;
  }
  function draw() {
    var q = Q[S.cur], sec = q.s, inSec = idxOf(sec);
    $("#tabs").innerHTML = secs.map(function (s) {
      var c = counts(idxOf(s));
      return '<button role="tab" aria-selected="' + (s === sec) + '" data-s="' + E(s) + '">' + SEC(s) + ' <span>' + (c[2] + c[4]) + "/" + idxOf(s).length + "</span></button>";
    }).join("");
    $("#tabs").querySelectorAll("button").forEach(function (b) { b.onclick = function () { go(idxOf(b.dataset.s)[0]); }; });
    $("#qpane").innerHTML = '<div class="qhead"><span>' + T("test.qof", { i: S.cur + 1, n: Q.length }) + '</span><span class="muted">' + SEC(sec) + "</span></div>" +
      txt(q) + figs(q) + '<div class="opts" role="radiogroup">' +
      q.o.map(function (o, k) {
        return '<label class="opt' + (S.sel === k ? " sel" : "") + '"><input type="radio" name="opt" value="' + k + '"' + (S.sel === k ? " checked" : "") +
          '><span class="ol">' + (k + 1) + "</span><span>" + optHtml(q, k) + "</span></label>";
      }).join("") + "</div>";
    $("#qpane").querySelectorAll("input").forEach(function (r) { r.onchange = function () { S.sel = +r.value; save(); draw(); }; });
    var c = counts(inSec);
    $("#palette").innerHTML = '<div class="pal-head"><strong>' + SEC(sec) + '</strong><button class="icon-btn pal-close" aria-label="' + T("test.palClose") + '">✕</button></div>' +
      '<div class="legend">' + [2, 1, 0, 3, 4].map(function (k) { return '<span class="lg' + k + '"><i class="st s' + k + '">' + c[k] + "</i>" + stName(k) + "</span>"; }).join("") + "</div>" +
      '<div class="grid-q">' + inSec.map(function (i) {
        return '<button class="st s' + S.st[i] + (i === S.cur ? " cur" : "") + '" data-i="' + i + '" aria-label="' + T("test.qAria", { i: i + 1, st: stName(S.st[i]) }) + '">' + (i + 1) + "</button>";
      }).join("") + '</div><button class="b primary block" id="submitBtn">' + T("test.submitTest") + '</button>';
    $("#palette").querySelectorAll(".grid-q button").forEach(function (b) { b.onclick = function () { go(+b.dataset.i); togglePal(false); }; });
    $("#palette .pal-close").onclick = function () { togglePal(false); };
    $("#submitBtn").onclick = confirmSubmit;
    $("#prevBtn").disabled = S.cur === 0;
  }
  function tick() {
    var left = (S.endAt - Date.now()) / 1000, t = $("#timer");
    if (!t) return;
    t.textContent = "⏱ " + fmt(left); t.classList.toggle("low", left < 300);
    if (left <= 0) { clearInterval(timerId); finish(true); }
  }
  var SUM_COLS = [2, 1, 0, 3, 4];
  function sumRow(name, k, n, cls) { return "<tr" + cls + "><td>" + name + "</td>" + SUM_COLS.map(function (j) { return "<td>" + k[j] + "</td>"; }).join("") + "<td>" + n + "</td></tr>"; }
  function confirmSubmit() {
    var c = counts(Q.map(function (_, i) { return i; })), m = $("#modal");
    togglePal(false);
    m.hidden = false;
    m.innerHTML = '<div class="dialog fade" role="dialog" aria-modal="true" aria-labelledby="mt"><h2 id="mt">' + T("sub.title") + '</h2>' +
      '<p class="muted">' + T("sub.left", { t: fmt((S.endAt - Date.now()) / 1000) }) + "</p>" +
      '<div class="sum-wrap"><table class="sum"><tr><th>' + T("sub.section") + '</th>' + SUM_COLS.map(function (k) { return '<th title="' + stName(k) + '"><i class="st s' + k + '" aria-hidden="true"></i><span class="full">' + stName(k) + '</span><span class="ab" aria-hidden="true">' + T("ab." + k) + "</span></th>"; }).join("") + "<th>" + T("sub.total") + "</th></tr>" +
      secs.map(function (s) { var l = idxOf(s); return sumRow(SEC(s), counts(l), l.length, ""); }).join("") +
      sumRow(T("sub.total"), c, Q.length, ' class="tot"') + "</table></div>" +
      '<p class="muted small">' + T("sub.note", { m: c[4], s: c[2] + c[4], n: Q.length }) + "</p>" +
      '<div class="dlg-act"><button class="b ghost" id="cancelSub">' + T("sub.back") + '</button><button class="b primary" id="doSub">' + T("sub.submit") + '</button></div></div>';
    $("#cancelSub").onclick = function () { m.hidden = true; };
    $("#doSub").onclick = function () { finish(false); };
  }
  function finish(auto) {
    clearInterval(timerId);
    var end = Math.min(Date.now(), S.endAt), att = { ts: Date.now(), id: D.id, exam: D.exam, label: D.meta.label, auto: auto,
      timeTaken: Math.round((end - S.startAt) / 1000), limit: D.meta.min * 60, ans: S.ans.slice(), st: S.st.slice(), sections: {} };
    var c = 0, w = 0, nv = 0;
    Q.forEach(function (q, i) {
      var x = att.sections[q.s] = att.sections[q.s] || { n: 0, c: 0, w: 0, nv: 0 }; x.n++;
      if (S.ans[i] < 0) { if (S.st[i] === 0) { nv++; x.nv++; } return; }
      if (S.ans[i] === q.a) { c++; x.c++; } else { w++; x.w++; }
    });
    // Skipped = visited but not answered (incl. marked without answer); Not visited is counted separately.
    att.correct = c; att.wrong = w; att.notVisited = nv; att.skipped = Q.length - c - w - nv; att.total = Q.length;
    att.score = Math.round((c - w / 3) * 100) / 100;
    var all = JSON.parse(localStorage.getItem(RRB.ATTEMPTS) || "[]"); all.push(att);
    localStorage.setItem(RRB.ATTEMPTS, JSON.stringify(all)); localStorage.removeItem(RRB.ACTIVE);
    history.replaceState(null, "", "test.html?result=" + att.ts);
    results(att);
  }
  // Prefill text for the doubt chat: question, options, official answer, the student's answer, explanation (in the current language).
  function doubtText(d, a, i) {
    var q = d.questions[i], u = a.ans[i] == null ? -1 : a.ans[i], L = "ABCD", H = LANG === "hi";
    var pick = function (h, e) { return hi(h) ? h : e || ""; };
    var opt = function (k) { return L[k] + ") " + (pick(q.oh && q.oh[k], q.o[k]) || (q.oi && q.oi[k] ? "[figure]" : "")); };
    var qt = pick(q.qh, q.q) || "[question is a figure]", e = pick(q.eh, q.e);
    var lines = H
      ? ["मेरा डाउट: " + RRB.tLabel(a.label) + ", प्रश्न " + (i + 1) + " (" + RRB.tSec(q.s) + ")", qt, "विकल्प: " + q.o.map(function (_, k) { return opt(k); }).join(" | "),
         (d.meta.mock ? "आंसर की: " : "RRB का उत्तर: ") + opt(q.a), "मेरा उत्तर: " + (u < 0 ? "छोड़ा" : opt(u))]
      : ["My doubt: " + a.label + ", Q" + (i + 1) + " (" + q.s + ")", qt, "Options: " + q.o.map(function (_, k) { return opt(k); }).join(" | "),
         (d.meta.mock ? "Answer key: " : "RRB answer: ") + opt(q.a), "My answer: " + (u < 0 ? "skipped" : opt(u))];
    if (e) lines.push((H ? "दी गई व्याख्या: " : "Given explanation: ") + e);
    var ask = H ? "कृपया इसे स्टेप-बाय-स्टेप समझाइए।" : "Please explain this step by step.";
    var t = lines.join("\n");
    if (t.length + ask.length + 1 > 2000) t = t.slice(0, 2000 - ask.length - 2) + "…";
    return t + "\n" + ask;
  }
  function results(a) {
    document.body.classList.remove("testing"); RES = a;
    // Older saved attempts may miss fields: fill safe defaults so the result and review still open.
    a.correct = +a.correct || 0; a.wrong = +a.wrong || 0; a.total = +a.total || (a.ans && a.ans.length) || 100; a.sections = a.sections || {}; a.ans = a.ans || [];
    if (a.skipped == null) a.skipped = a.total - a.correct - a.wrong - (a.notVisited || 0);
    var tm = function (v) { return isFinite(v) ? fmt(v) : "–"; };
    var att = a.correct + a.wrong, acc = att ? Math.round(a.correct / att * 100) : 0, pct = Math.max(0, a.score / a.total * 100);
    var hasNv = a.notVisited != null;
    var bars = Object.keys(a.sections).map(function (s) {
      var x = a.sections[s], nv = x.nv || 0, sk = x.n - x.c - x.w - nv, sc = Math.round((x.c - x.w / 3) * 100) / 100;
      return '<div class="sbar"><div class="sbar-h"><span>' + SEC(s) + "</span><strong>" + sc + " / " + x.n + "</strong></div>" +
        '<div class="bar" role="img" aria-label="' + T("res.barAria", { c: x.c, w: x.w, k: sk }) + (hasNv ? T("res.barAriaNv", { v: nv }) : "") + '"><i class="c" style="width:' + x.c / x.n * 100 + '%"></i><i class="w" style="width:' + x.w / x.n * 100 + '%"></i></div>' +
        '<small class="muted">' + T("res.barLine", { c: x.c, w: x.w, k: sk }) + (hasNv ? T("res.barNv", { v: nv }) : "") + "</small></div>";
    }).join("");
    app.innerHTML = '<div class="fade"><div class="res-head"><div><span class="eyebrow dark">' + (a.auto ? T("res.auto") : T("res.result")) + "</span><h1>" + E(RRB.tLabel(a.label)) + "</h1>" +
      '<p class="muted">' + new Date(a.ts).toLocaleString(RRB.locale(), RRB.dtOpts()) + " IST</p></div>" +
      '<svg class="ring" viewBox="0 0 120 120" role="img" aria-label="' + T("res.scoreAria", { s: a.score, n: a.total }) + '"><circle cx="60" cy="60" r="50" class="trk"/>' +
      '<circle cx="60" cy="60" r="50" class="val" stroke-dasharray="' + (pct * 3.1416).toFixed(1) + ' 400"/><text x="60" y="58">' + a.score + '</text><text x="60" y="78" class="sub">' + T("res.of", { n: a.total }) + "</text></svg></div>" +
      '<div class="facts res-facts' + (hasNv ? " n8" : "") + '"><div><small>' + T("res.correct") + '</small><strong class="okc">' + a.correct + "</strong></div><div><small>" + T("res.wrong") + "</small><strong class=\"bad\">" + a.wrong +
      "</strong></div><div><small>" + T("res.skipped") + "</small><strong>" + a.skipped + "</strong></div>" + (hasNv ? "<div><small>" + T("res.nv") + "</small><strong>" + a.notVisited + "</strong></div>" : "") +
      "<div><small>" + T("res.attempted") + "</small><strong>" + att + " / " + a.total + "</strong></div><div><small>" + T("res.accuracy") + "</small><strong>" + acc + "%</strong></div>" +
      "<div><small>" + T("res.time") + "</small><strong>" + tm(a.timeTaken) + " / " + tm(a.limit) + "</strong></div><div><small>" + T("res.neg") + "</small><strong>−" + (Math.round(a.wrong / 3 * 100) / 100) + "</strong></div></div>" +
      '<h2 class="sec">' + T("res.sections") + '</h2><div class="card">' + bars + '<div class="bar-legend"><span><i class="c"></i>' + T("res.correct") + '</span><span><i class="w"></i>' + T("res.wrong") + '</span><span><i></i>' + (hasNv ? T("res.skipNv") : T("res.skipped")) + '</span></div></div>' +
      '<div class="rev-head"><h2 class="sec">' + T("res.review") + '</h2><div class="rev-tools">' + langSw() + '<div class="filters" role="group">' + [["all", "f.all"], ["wrong", "f.wrong"], ["skipped", "f.skipped"]].concat(hasNv ? [["notvisited", "f.nv"]] : []).map(function (x) { return '<button data-f="' + x[0] + '" aria-pressed="' + (x[0] === RES_F) + '">' + T(x[1]) + "</button>"; }).join("") + '</div></div></div>' +
      '<div id="review"><p class="muted">' + T("res.loadingQ") + '</p></div>' +
      '<div class="res-act"><a class="btn" href="test.html?id=' + a.id + '">' + T("res.retake") + '</a> <a class="btn ghost-btn" href="mock.html">' + T("res.allTests") + '</a></div></div>';
    var go = function (d) {
      D = d; var f = RES_F;
      function list() {
        $("#review").innerHTML = d.questions.map(function (q, i) {
          var u = a.ans[i] == null ? -1 : a.ans[i], kind = u < 0 ? (a.st && a.st[i] === 0 ? "notvisited" : "skipped") : u === q.a ? "right" : "wrong";
          if (f !== "all" && f !== kind) return "";
          return '<div class="rev card ' + kind + '"><div class="qhead"><span>Q' + (i + 1) + " · " + SEC(q.s) + '</span><span class="tag ' + (kind === "right" ? "ok" : kind === "wrong" ? "bad" : "") + '">' +
            T(kind === "right" ? "res.tagRight" : kind === "wrong" ? "res.tagWrong" : kind === "notvisited" ? "res.tagNv" : "res.tagSkip") + '</span></div>' + txt(q) + figs(q) + "<ol class=\"ropts\">" +
            q.o.map(function (o, k) { return '<li class="' + (k === q.a ? "ans" : k === u ? "your" : "") + '">' + optHtml(q, k) + (k === q.a ? " ✓" : k === u ? " ✗ " + T("res.your") : "") + "</li>"; }).join("") + "</ol>" +
            ex(q) + '<button type="button" class="ask-doubt" data-i="' + i + '">' + T("res.ask") + '</button></div>';
        }).join("") || '<p class="muted">' + T("res.none") + "</p>";
        $("#review").querySelectorAll(".ask-doubt").forEach(function (b) { b.onclick = function () { RRB.askDoubt && RRB.askDoubt(doubtText(d, a, +b.dataset.i)); }; });
      }
      document.querySelectorAll(".filters button").forEach(function (b) {
        b.onclick = function () { f = RES_F = b.dataset.f; document.querySelectorAll(".filters button").forEach(function (x) { x.setAttribute("aria-pressed", x === b); }); list(); };
      });
      list(); bindLang();
    };
    if (D && D.id === a.id) go(D); else RRB.loadTest(a.id, go, function (m) { $("#review").textContent = m; });
    window.scrollTo(0, 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    app = document.getElementById("app");
    var p = new URLSearchParams(location.search), r = p.get("result"), id = p.get("id");
    if (r) {
      var a = JSON.parse(localStorage.getItem(RRB.ATTEMPTS) || "[]").filter(function (x) { return x && String(x.ts) === r; })[0];
      if (a) return results(a);
      app.innerHTML = '<p class="muted">' + T("res.notFound") + ' <a href="mock.html">' + T("res.seeAll") + "</a></p>"; return;
    }
    if (!id) { location.replace("mock.html"); return; }
    RRB.loadTest(id, start, function (m) { app.innerHTML = '<p class="muted">' + E(m) + '. <a href="mock.html">' + T("test.backTests") + "</a></p>"; });
  });
  // Site language changed (test switch, header switch or another tab): redraw whatever is on screen, no reload.
  document.addEventListener("rrb:lang", function () {
    LANG = RRB.lang();
    if (S && document.body.classList.contains("testing")) {
      var t = app.querySelector("[data-lbl]"); if (t) t.textContent = RRB.tLabel(D.meta.label);
      var sm = app.querySelector(".cbt-title small"); if (sm) sm.textContent = T("test.qsMarks", { n: Q.length });
      RRB.applyI18n(app); draw();
      if (!$("#modal").hidden) confirmSubmit();
    } else if (RES) { var y = window.scrollY; results(RES); window.scrollTo(0, y); }
  });
  window.addEventListener("beforeunload", function () { if (S && document.body.classList.contains("testing")) save(); });
})();
