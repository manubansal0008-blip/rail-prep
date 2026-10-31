// "Question of the day" on the home page.
// First choice: one MCQ from the latest daily news file (data/news/index.js → newest day). The item is picked by the
// IST day of the year of that news day (index = dayOfYear % number of items), so the category changes every day and new day files
// are used automatically. That item's MCQ is then not repeated in the home news list (see RRB.qotdNewsIndex).
// Fallback (no news list, or the file fails to load): a question from the past-paper/practice bank picked by IST date.
// Data files load only when the card comes into view.
// Today's answer is kept in localStorage "rrb.qotd" = {d:"YYYY-MM-DD", src:"news", nd:newsDay, i:item, a:chosen}
// (or {d, p:paperId, i:index, a} for the bank). News answers are also written to "rrb.news" so news.html shows them.
(function () {
  var KEY = "rrb.qotd", T = function (k, v) { return RRB.t(k, v); }, E = function (s) { return RRB.esc(s); };
  var Q = null, started = false;
  function today() { return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); }
  // Deterministic pick: day number since 1970 (IST date) times a large prime, mod bank size.
  RRB.qotdPick = function (day) {
    var bank = RRB.INDEX, total = bank.reduce(function (a, p) { return a + p.count; }, 0);
    var n = Math.round(Date.parse(day + "T00:00:00Z") / 864e5), k = (n * 7919) % total;
    for (var j = 0; j < bank.length; j++) { if (k < bank[j].count) return { p: bank[j].id, i: k }; k -= bank[j].count; }
  };
  // Item of the latest news day used as the question of the day: rotates by that news day's IST day of the year (see RRB.newsQotdIndex).
  RRB.qotdNewsIndex = function (nd) { return nd && nd.items && nd.items.length && RRB.newsQotdIndex ? RRB.newsQotdIndex(nd.date, nd.items.length) : undefined; };
  function saved() { try { var s = JSON.parse(localStorage.getItem(KEY) || "null"); return s && s.d === today() ? s : null; } catch (e) { return null; } }
  function hi() { return RRB.lang() === "hi"; }
  function has(v) { return hi() && v != null && v !== ""; }
  function txt(q) { return has(q.qh) ? '<p class="qtext" lang="hi">' + E(q.qh) + "</p>" : q.q ? '<p class="qtext">' + E(q.q) + "</p>" : ""; }
  function opt(q, k) { return RRB.optImg(q, k) + (has(q.oh && q.oh[k]) ? '<span lang="hi">' + E(q.oh[k]) + "</span>" : E(q.o[k])); }
  function ex(q) { return has(q.eh) ? '<p class="expl" lang="hi"><strong>' + T("test.expl") + "</strong> " + E(q.eh) + "</p>" : q.e ? '<p class="expl"><strong>' + T("test.expl") + "</strong> " + E(q.e) + "</p>" : ""; }
  function render() {
    var root = document.getElementById("qotd"); if (!root) return;
    if (!Q) { root.innerHTML = '<p class="muted">' + T(started === "err" ? "qd.err" : "qd.loading") + "</p>"; return; }
    if (Q.news) return renderNews(root);
    var q = Q.q, s = saved(), done = s && s.p === Q.p && s.i === Q.i ? s : null, a = done ? done.a : null;
    var tp = RRB.TOPICS && RRB.TOPICS.map[Q.p] && RRB.TOPICS.map[Q.p][Q.i], to = tp && RRB.TOPICS.topics.filter(function (x) { return x.k === tp; })[0];
    var h = '<div class="qpane qd-pane"><div class="qhead"><span>' + E(T("qd.src", { p: RRB.tLabel(Q.meta.label), q: Q.i + 1 })) + "</span>" +
      (to ? '<span class="tag">' + E(hi() ? to.hi : to.en) + "</span>" : "") + "</div>" + txt(q) + RRB.figs(q) +
      '<div class="opts" role="group" aria-label="' + E(T("qd.h")) + '">' + q.o.map(function (o, j) {
        var cls = "opt" + (done ? (j === q.a ? " right" : j === a ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-j="' + j + '"' + (done ? " disabled" : "") + ' aria-label="' + E(T("pr.optLetter", { k: j + 1 })) + '"><span class="ol">' + (j + 1) + "</span><span>" + opt(q, j) + "</span></button>";
      }).join("") + "</div>";
    if (done) {
      var ok = a === q.a;
      h += '<div class="pr-fb ' + (ok ? "fb-ok" : "fb-bad") + '" role="status"><strong>' + (ok ? "✓ " + T("qd.right") : "✗ " + T("qd.wrong", { k: q.a + 1 })) + "</strong>" + ex(q) + "</div>" +
        '<div class="qd-act">' + (to ? '<a class="btn" href="practice.html?exam=' + Q.meta.exam + "&topic=" + tp + '">' + E(T("qd.practice", { t: hi() ? to.hi : to.en })) + "</a>" : "") +
        ((RRB.NOTES_READY || []).indexOf(tp) >= 0 ? ' <a class="btn ghost-btn" href="notes.html#' + tp + '">' + T("qd.note") + "</a>" : "") +
        '<p class="muted qd-again">' + T("qd.again") + "</p></div>";
    }
    h += "</div>";
    root.innerHTML = h;
    root.querySelectorAll(".opt:not([disabled])").forEach(function (b) {
      b.onclick = function () {
        localStorage.setItem(KEY, JSON.stringify({ d: today(), p: Q.p, i: Q.i, a: +b.dataset.j }));
        render();
        var fb = root.querySelector(".pr-fb"); if (fb) { fb.setAttribute("tabindex", "-1"); fb.focus({ preventScroll: true }); }
      };
    });
  }
  function renderNews(root) {
    var d = Q.news, i = Q.i, it = d.items[i], m = it.mcq, mq = hi() && m.hi ? m.hi : m.en, x = hi() && it.hi ? it.hi : it.en;
    var s = saved(), got = s && s.src === "news" && s.nd === d.date && s.i === i ? s.a : null;
    if (got == null && RRB.newsAnswers) { var g = RRB.newsAnswers()[d.date + ":" + i]; if (g != null) got = g; }
    var done = got != null;
    var h = '<div class="qpane qd-pane"><div class="qhead"><span>' + E(T("qd.fromNews", { d: RRB.newsDay ? RRB.newsDay(d.date) : d.date, i: i + 1, n: d.items.length })) + "</span>" +
      '<span class="tag">' + E(T("news.cat." + it.cat)) + "</span></div>" +
      '<p class="qd-ctx muted">' + E(x.title) + "</p>" +
      '<p class="qtext">' + E(mq.q) + '</p><div class="opts" role="group" aria-label="' + E(T("qd.h")) + '">' + mq.o.map(function (o, j) {
        var cls = "opt" + (done ? (j === m.a ? " right" : j === got ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-j="' + j + '"' + (done ? " disabled" : "") + ' aria-label="' + E(T("pr.optLetter", { k: j + 1 })) + '"><span class="ol">' + (j + 1) + "</span><span>" + E(o) + "</span></button>";
      }).join("") + "</div>";
    if (done) h += '<div class="pr-fb ' + (got === m.a ? "fb-ok" : "fb-bad") + '" role="status"><strong>' + (got === m.a ? "✓ " + T("qd.right") : "✗ " + T("qd.wrong", { k: m.a + 1 })) + '</strong><p class="expl"><strong>' + T("test.expl") + "</strong> " + E(mq.e) + "</p></div>";
    h += '<div class="qd-act"><a class="btn' + (done ? "" : " ghost-btn") + '" href="news.html#' + d.date + "-" + i + '">' + T("qd.newsLink") + '</a><p class="muted qd-again">' + T("qd.againNews") + "</p></div></div>";
    root.innerHTML = h;
    root.querySelectorAll(".opt:not([disabled])").forEach(function (b) {
      b.onclick = function () {
        var j = +b.dataset.j;
        localStorage.setItem(KEY, JSON.stringify({ d: today(), src: "news", nd: d.date, i: i, a: j }));
        if (RRB.newsSave) RRB.newsSave(d.date + ":" + i, j);
        render();
        var fb = root.querySelector(".pr-fb"); if (fb) { fb.setAttribute("tabindex", "-1"); fb.focus({ preventScroll: true }); }
      };
    });
  }
  function script(src, ok, bad) { var s = document.createElement("script"); s.src = src + "?v=" + RRB.VER; s.onload = ok; s.onerror = bad; document.head.appendChild(s); }
  function start() {
    if (started) return; started = true; render();
    var days = RRB.NEWS_DAYS || [];
    if (days.length && RRB.newsLoad) {
      RRB.newsLoad(days[0], function (d) {
        var i = RRB.qotdNewsIndex(d);
        if (i == null || !d.items[i].mcq) return startBank();
        Q = { news: d, i: i }; render();
      }, startBank);
    } else startBank();
  }
  function startBank() {
    var pick = RRB.qotdPick(today()), fail = function () { started = "err"; render(); };
    var gotT = !!RRB.TOPICS, gotQ = false;
    function both() { if (gotT && gotQ) render(); }
    if (!gotT) script("data/topics.js", function () { gotT = true; both(); }, function () { gotT = true; both(); });
    RRB.loadTest(pick.p, function (d) {
      var qs = d.questions, i = pick.i;
      // skip a question with no usable options (should not happen); figure questions use the shared figure helpers
      for (var n = 0; n < qs.length && !(qs[i] && qs[i].o && qs[i].o.length && qs[i].a != null); n++) i = (i + 1) % qs.length;
      Q = { p: pick.p, i: i, q: qs[i], meta: d.meta }; gotQ = true; both();
    }, fail);
  }
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("qotd"); if (!root) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); start(); } }, { rootMargin: "300px" });
      io.observe(root);
    } else setTimeout(start, 800);
  });
  document.addEventListener("rrb:lang", function () { if (started) render(); });
})();
