// Daily current affairs ("Today's 5 news"). Data: data/news/index.js (RRB.NEWS_DAYS, newest first) and one
// data/news/YYYY-MM-DD.js per day calling RRB.newsLoaded({date, items:[...]}), loaded only when needed.
// Used by the home page (#news: latest day) and news.html (#newsArchive: all days, newest first).
// MCQ answers are kept in localStorage "rrb.news" = {"YYYY-MM-DD:i": chosenIndex}.
(function () {
  var T = function (k, v) { return RRB.t(k, v); }, E = function (s) { return RRB.esc(s); }, KEY = "rrb.news";
  var cache = {}, wait = {};
  RRB.NEWS_CATS = ["scheme", "sports", "awards", "appointments", "defence", "science", "railways", "states", "international", "economy", "days"];
  RRB.newsLoaded = function (d) { cache[d.date] = d; (wait[d.date] || []).forEach(function (f) { f[0](d); }); delete wait[d.date]; };
  RRB.newsLoad = function (date, ok, bad) {
    if (cache[date]) return ok(cache[date]);
    if (wait[date]) { wait[date].push([ok, bad]); return; }
    wait[date] = [[ok, bad]];
    var s = document.createElement("script"); s.src = "data/news/" + date + ".js?v=" + RRB.VER;
    s.onerror = function () { (wait[date] || []).forEach(function (f) { f[1] && f[1](); }); delete wait[date]; };
    document.head.appendChild(s);
  };
  function answers() { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function L(o) { return RRB.lang() === "hi" && o.hi ? o.hi : o.en; }
  function fmtDay(date) { return new Date(date + "T12:00:00+05:30").toLocaleDateString(RRB.locale(), RRB.dtOpts({ weekday: "long", day: "numeric", month: "long", year: "numeric" })); }
  RRB.newsDay = fmtDay;
  function item(d, it, i) {
    var x = L(it), m = it.mcq, mq = L(m), id = d.date + ":" + i, got = answers()[id], done = got != null;
    var h = '<article class="card nw-item" id="nw-' + d.date + "-" + i + '"><div class="nw-top"><span class="tag nw-cat">' + E(T("news.cat." + it.cat)) + '</span><span class="muted nw-n">' + (i + 1) + "/" + d.items.length + "</span></div>" +
      "<h3>" + E(x.title) + '</h3><p class="nw-sum">' + E(x.summary) + "</p>" +
      '<div class="nw-facts"><strong>📌 ' + T("news.remember") + "</strong><ul>" + x.facts.map(function (f) { return "<li>" + E(f) + "</li>"; }).join("") + "</ul></div>" +
      '<div class="nw-mcq"><p class="nw-q"><strong>' + T("news.quiz") + "</strong> " + E(mq.q) + '</p><div class="opts" role="group" aria-label="' + E(T("news.quiz")) + '">' +
      mq.o.map(function (o, j) {
        var cls = "opt" + (done ? (j === m.a ? " right" : j === got ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-id="' + id + '" data-j="' + j + '"' + (done ? " disabled" : "") + '><span class="ol">' + (j + 1) + "</span><span>" + E(o) + "</span></button>";
      }).join("") + "</div>";
    if (done) h += '<div class="pr-fb ' + (got === m.a ? "fb-ok" : "fb-bad") + '" role="status"><strong>' + (got === m.a ? "✓ " + T("qd.right") : "✗ " + T("qd.wrong", { k: m.a + 1 })) + '</strong><p class="expl"><strong>' + T("test.expl") + "</strong> " + E(mq.e) + "</p></div>";
    h += '</div><p class="nw-src">' + T("news.src") + " " + it.src.map(function (s) { return '<a href="' + E(s.url) + '" target="_blank" rel="noopener">' + E(RRB.lang() === "hi" && s.nameHi ? s.nameHi : s.name) + "</a>"; }).join(" · ") + "</p></article>";
    return h;
  }
  RRB.newsRender = function (el, d) {
    el.innerHTML = d.items.map(function (it, i) { return item(d, it, i); }).join("");
    el.querySelectorAll(".opt:not([disabled])").forEach(function (b) {
      b.onclick = function () {
        var a = answers(); a[b.dataset.id] = +b.dataset.j; localStorage.setItem(KEY, JSON.stringify(a));
        RRB.newsRender(el, d);
        var fb = document.getElementById("nw-" + b.dataset.id.replace(":", "-")); fb = fb && fb.querySelector(".pr-fb");
        if (fb) { fb.setAttribute("tabindex", "-1"); fb.focus({ preventScroll: true }); }
      };
    });
  };
  // Home: latest day, loaded when the section comes into view.
  function home() {
    var root = document.getElementById("news"); if (!root) return;
    var days = RRB.NEWS_DAYS || [], st = { d: null, err: false };
    function draw() {
      var head = document.getElementById("newsDate");
      if (!days.length) { root.innerHTML = '<p class="muted">' + T("news.none") + "</p>"; return; }
      if (head) head.textContent = fmtDay(days[0]);
      if (st.err) { root.innerHTML = '<p class="muted">' + T("news.err") + "</p>"; return; }
      if (!st.d) { root.innerHTML = '<p class="muted">' + T("news.loading") + "</p>"; return; }
      RRB.newsRender(root, st.d);
    }
    function go() { RRB.newsLoad(days[0], function (d) { st.d = d; draw(); }, function () { st.err = true; draw(); }); }
    draw();
    if (!days.length) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); go(); } }, { rootMargin: "300px" });
      io.observe(root);
    } else go();
    document.addEventListener("rrb:lang", draw);
  }
  // Archive page: every day newest first; a day's file loads when it is opened. The newest (or #YYYY-MM-DD) opens first.
  function archive() {
    var root = document.getElementById("newsArchive"); if (!root) return;
    var days = RRB.NEWS_DAYS || [];
    if (!days.length) { root.innerHTML = '<p class="muted">' + T("news.none") + "</p>"; return; }
    var want = location.hash.slice(1); if (days.indexOf(want) < 0) want = days[0];
    root.innerHTML = days.map(function (d) {
      return '<details class="card nw-day" id="' + d + '"' + (d === want ? " open" : "") + '><summary><span class="nw-dlabel">' + E(fmtDay(d)) + '</span> <span class="muted"></span></summary><div class="nw-list" data-day="' + d + '"></div></details>';
    }).join("");
    function fill(det) {
      var box = det.querySelector(".nw-list"), d = box.dataset.day;
      if (!det.open) return;
      box.innerHTML = '<p class="muted">' + T("news.loading") + "</p>";
      RRB.newsLoad(d, function (data) {
        RRB.newsRender(box, data);
        det.querySelector("summary .muted").textContent = T("news.count", { n: data.items.length });
      }, function () { box.innerHTML = '<p class="muted">' + T("news.err") + "</p>"; });
    }
    root.querySelectorAll("details").forEach(function (det) { det.addEventListener("toggle", function () { fill(det); }); if (det.open) fill(det); });
    document.addEventListener("rrb:lang", function () {
      root.querySelectorAll("details").forEach(function (det) { det.querySelector(".nw-dlabel").textContent = fmtDay(det.id); if (det.open) fill(det); });
    });
  }
  document.addEventListener("DOMContentLoaded", function () { home(); archive(); });
})();
