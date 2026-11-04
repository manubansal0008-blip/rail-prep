// Monthly current affairs (monthly.html): month tabs, category filter, one-liners with sources, 10-question quiz.
// Data: data/monthly/index.js (RRB.MONTHS) + data/monthly/YYYY-MM.js (RRB.monthLoaded). Month in the URL hash (#2026-10).
(function () {
  var T = function (k, v) { return RRB.t(k, v); }, E = function (s) { return RRB.esc(s); };
  var cache = {}, cur = null, cat = "all", ans = {};
  var hi = function () { return RRB.lang() === "hi"; };
  function monthName(m) { return new Date(m + "-15T12:00:00+05:30").toLocaleDateString(RRB.locale(), { month: "long", year: "numeric" }); }
  function day(d) { return new Date(d + "T12:00:00+05:30").toLocaleDateString(RRB.locale(), { day: "numeric", month: "short" }); }
  RRB.monthLoaded = function (d) { cache[d.month] = d; if (d.month === cur) draw(); };
  function load(m) {
    cur = m; cat = "all"; ans = {};
    if (cache[m]) return draw();
    document.getElementById("mBody").innerHTML = '<p class="muted">' + T("mo.loading") + "</p>";
    var s = document.createElement("script"); s.src = "data/monthly/" + m + ".js?v=" + RRB.VER;
    s.onerror = function () { document.getElementById("mBody").innerHTML = '<p class="muted">' + T("mo.err") + "</p>"; };
    document.head.appendChild(s);
  }
  function tabs() {
    var el = document.getElementById("mTabs"); if (!el) return;
    el.innerHTML = (RRB.MONTHS || []).map(function (m) {
      return '<button type="button" role="tab" aria-selected="' + (m === cur) + '" data-m="' + m + '">' + E(monthName(m)) + "</button>";
    }).join("");
    el.querySelectorAll("button").forEach(function (b) { b.onclick = function () { location.hash = b.dataset.m; }; });
  }
  function draw() {
    tabs();
    var d = cache[cur], root = document.getElementById("mBody"); if (!d || !root) return;
    var cats = []; d.items.forEach(function (x) { if (cats.indexOf(x.cat) < 0) cats.push(x.cat); });
    var list = d.items.filter(function (x) { return cat === "all" || x.cat === cat; });
    var h = '<div class="mo-sum"><strong>' + E(T("mo.sum", { m: monthName(cur), n: d.items.length })) + '</strong> <a href="#moQuiz">' + T("mo.toQuiz") + "</a></div>" +
      '<div class="mo-chips" role="group" aria-label="' + E(T("mo.filter")) + '">' +
      ["all"].concat(cats).map(function (c) {
        return '<button type="button" class="chip" aria-pressed="' + (c === cat) + '" data-c="' + c + '">' + E(c === "all" ? T("mo.all") : T("news.cat." + c)) + "</button>";
      }).join("") + "</div>" +
      '<ol class="mo-list">' + list.map(function (x) {
        return '<li class="card mo-item"><div class="mo-top"><span class="tag nw-cat">' + E(T("news.cat." + x.cat)) + "</span>" +
          (x.nd ? "" : '<span class="muted mo-date">' + E(day(x.d)) + "</span>") + "</div><p>" + E(hi() ? x.hi : x.en) + "</p>" +
          '<p class="nw-src">' + T("news.src") + " " + x.src.map(function (s) { return '<a href="' + E(s.url) + '" target="_blank" rel="noopener">' + E(s.name) + "</a>"; }).join(" · ") + "</p></li>";
      }).join("") + "</ol>" + quiz(d);
    root.innerHTML = h;
    root.querySelectorAll(".mo-chips .chip").forEach(function (b) { b.onclick = function () { cat = b.dataset.c; draw(); }; });
    root.querySelectorAll(".mo-q .opt:not([disabled])").forEach(function (b) {
      b.onclick = function () { ans[b.dataset.q] = +b.dataset.j; var y = window.scrollY; draw(); window.scrollTo(0, y); };
    });
    var rb = document.getElementById("moReset"); if (rb) rb.onclick = function () { ans = {}; draw(); document.getElementById("moQuiz").scrollIntoView(); };
    document.title = T("mo.doctitle", { m: monthName(cur) });
  }
  function quiz(d) {
    var done = 0, right = 0;
    var h = '<section class="mo-quiz" id="moQuiz"><h2 class="sec">' + E(T("mo.quizH", { m: monthName(cur) })) + "</h2>" + d.quiz.map(function (q, i) {
      var L = hi() ? q.hi : q.en, a = ans[i], got = a != null;
      if (got) { done++; if (a === q.a) right++; }
      return '<div class="card mo-q"><p class="qtext"><strong>' + (i + 1) + ".</strong> " + E(L.q) + '</p><div class="opts">' + L.o.map(function (o, j) {
        var cls = "opt" + (got ? (j === q.a ? " right" : j === a ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-q="' + i + '" data-j="' + j + '"' + (got ? " disabled" : "") + '><span class="ol">' + (j + 1) + "</span><span>" + E(o) + "</span></button>";
      }).join("") + "</div>" + (got ? '<div class="pr-fb ' + (a === q.a ? "fb-ok" : "fb-bad") + '" role="status"><strong>' + (a === q.a ? "✓ " + T("qd.right") : "✗ " + T("qd.wrong", { k: q.a + 1 })) +
        '</strong><p class="expl">' + E(L.e) + "</p></div>" : "") + "</div>";
    }).join("");
    if (done === d.quiz.length) h += '<div class="card mo-score"><strong>' + E(T("mo.score", { r: right, n: d.quiz.length })) + '</strong> <button type="button" class="btn ghost-btn" id="moReset">' + T("mo.again") + "</button></div>";
    return h + "</section>";
  }
  function fromHash() { var m = location.hash.slice(1); return (RRB.MONTHS || []).indexOf(m) >= 0 ? m : (RRB.MONTHS || [])[0]; }
  document.addEventListener("DOMContentLoaded", function () { if (document.getElementById("mBody")) load(fromHash()); });
  window.addEventListener("hashchange", function () { var m = fromHash(); if (m !== cur) { load(m); window.scrollTo(0, 0); } });
  document.addEventListener("rrb:lang", function () { if (cache[cur]) draw(); });
})();
