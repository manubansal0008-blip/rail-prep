// Daily current affairs ("Today's 5 news"). Data: data/news/index.js (RRB.NEWS_DAYS, newest first) and one
// data/news/YYYY-MM-DD.js per day calling RRB.newsLoaded({date, items:[...]}), loaded only when needed.
// Used by the home page (#news: latest day) and news.html (#newsArchive: all days, newest first).
// MCQ answers are kept in localStorage "rrb.news" = {"YYYY-MM-DD:i": chosenIndex} (shared with the home Question of the day).
// news.html#YYYY-MM-DD opens a day; news.html#YYYY-MM-DD-i also scrolls to item i (0-based).
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
  RRB.newsAnswers = answers;
  RRB.newsSave = function (id, j) { var a = answers(); a[id] = j; localStorage.setItem(KEY, JSON.stringify(a)); };
  // compact (home page): headline + summary; facts, quick question and sources fold into "Read more".
  function item(d, it, i, skip, qd, compact) {
    var html = item0(d, it, i, skip, qd), cut = html.indexOf('<div class="nw-facts">');
    if (!compact || cut < 0) return html;
    var end = html.lastIndexOf("</article>");
    return html.slice(0, cut) + '<details class="nw-more" data-id="' + d.date + ":" + i + '"><summary>' + T("news.more") + "</summary>" + html.slice(cut, end) + "</details></article>";
  }
  function item0(d, it, i, skip, qd) {
    var x = L(it), m = it.mcq, mq = L(m), id = d.date + ":" + i, got = answers()[id], done = got != null;
    var h0 = '<article class="card nw-item" id="nw-' + d.date + "-" + i + '"><div class="nw-top"><span class="tag nw-cat">' + E(T("news.cat." + it.cat)) + '</span><span class="muted nw-n">' + (i + 1) + "/" + d.items.length + "</span></div>" + (qd ? '<span class="tag warn nw-qd">⭐ ' + T("news.qdBadge") + "</span>" : "") +
      "<h3>" + E(x.title) + '</h3><p class="nw-sum">' + E(x.summary) + "</p>" +
      '<div class="nw-facts"><strong>📌 ' + T("news.remember") + "</strong><ul>" + x.facts.map(function (f) { return "<li>" + E(f) + "</li>"; }).join("") + "</ul></div>";
    if (skip) return h0 + '<p class="nw-above"><a href="#qotdH">↑ ' + T("news.mcqAbove") + "</a></p>" + srcLine(it) + "</article>";
    var h = h0 + '<div class="nw-mcq"><p class="nw-q"><strong>' + T("news.quiz") + "</strong> " + E(mq.q) + '</p><div class="opts" role="group" aria-label="' + E(T("news.quiz")) + '">' +
      mq.o.map(function (o, j) {
        var cls = "opt" + (done ? (j === m.a ? " right" : j === got ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-id="' + id + '" data-j="' + j + '"' + (done ? " disabled" : "") + '><span class="ol">' + (j + 1) + "</span><span>" + E(o) + "</span></button>";
      }).join("") + "</div>";
    if (done) h += '<div class="pr-fb ' + (got === m.a ? "fb-ok" : "fb-bad") + '" role="status"><strong>' + (got === m.a ? "✓ " + T("qd.right") : "✗ " + T("qd.wrong", { k: m.a + 1 })) + '</strong><p class="expl"><strong>' + T("test.expl") + "</strong> " + E(mq.e) + "</p></div>";
    return h + "</div>" + srcLine(it) + "</article>";
  }
  function srcLine(it) {
    return '<p class="nw-src">' + T("news.src") + " " + it.src.map(function (s) { return '<a href="' + E(s.url) + '" target="_blank" rel="noopener">' + E(RRB.lang() === "hi" && s.nameHi ? s.nameHi : s.name) + "</a>"; }).join(" · ") + "</p>";
  }
  // skip: index of an item whose MCQ is shown as the home "Question of the day" (its MCQ is not repeated here).
  // qd: index of the day's "Question of the day" item, marked with a badge (news.html).
  RRB.newsRender = function (el, d, skip, qd) {
    var compact = el.id === "news", open = {};
    el.querySelectorAll("details.nw-more[open]").forEach(function (x) { open[x.dataset.id] = 1; });
    el.innerHTML = d.items.map(function (it, i) { return item(d, it, i, i === skip, i === qd, compact); }).join("");
    el.querySelectorAll("details.nw-more").forEach(function (x) { if (open[x.dataset.id]) x.open = true; });
    el.querySelectorAll(".opt:not([disabled])").forEach(function (b) {
      b.onclick = function () {
        RRB.newsSave(b.dataset.id, +b.dataset.j);
        RRB.newsRender(el, d, skip, qd);
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
      RRB.newsRender(root, st.d, RRB.qotdNewsIndex ? RRB.qotdNewsIndex(st.d) : undefined);
      shareNews(st.d);
    }
    // Share button next to the heading: the day's headlines + link to that day's static page (news/YYYY-MM-DD.html).
    function shareNews(d) {
      var el = document.getElementById("newsShare"); if (!el || !RRB.shareHTML) return;
      var text = T("share.newsText", { d: fmtDay(d.date) }) + "\n" + d.items.map(function (it, i) { return (i + 1) + ". " + L(it).title; }).join("\n") + "\n" + T("share.newsOpen");
      el.innerHTML = RRB.shareHTML({ text: text, url: RRB.BASE + "news/" + d.date + ".html", mini: true });
      var b = el.firstChild; if (b) b.setAttribute("aria-label", T("share.news"));
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
  // Which item of a day is that day's "Question of the day": rotate by the day of the year of the news date (IST),
  // so the category changes from day to day. Shared with js/qotd.js.
  RRB.newsQotdIndex = function (date, n) {
    if (!n) return undefined;
    var doy = Math.round((Date.parse(date + "T00:00:00Z") - Date.parse(date.slice(0, 4) + "-01-01T00:00:00Z")) / 864e5) + 1;
    return doy % n;
  };
  function istToday() { return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  // news.html: month calendar (days with a news file are clickable) + the chosen day's 5 news and MCQs below.
  // URL: news.html#YYYY-MM-DD (a day) or #YYYY-MM-DD-i (also scroll to item i). No hash = newest day.
  function archive() {
    var root = document.getElementById("newsArchive"); if (!root) return;
    var days = RRB.NEWS_DAYS || [];
    if (!days.length) { root.innerHTML = '<p class="muted">' + T("news.none") + "</p>"; return; }
    var has = {}; days.forEach(function (d) { has[d] = 1; });
    var sel, focusItem = null, scrolled = false, ym;
    var first = days[days.length - 1].slice(0, 7), last = [days[0], istToday()].sort()[1].slice(0, 7);
    function parse() {
      var hm = /^#(\d{4}-\d{2}-\d{2})(?:-(\d+))?$/.exec(location.hash);
      sel = hm && has[hm[1]] ? hm[1] : days[0];
      focusItem = hm && has[hm[1]] && hm[2] != null ? +hm[2] : null; scrolled = false;
      ym = sel.slice(0, 7);
    }
    root.innerHTML = '<section class="card nw-cal" aria-labelledby="calH"><div class="cal-head"><button type="button" class="cal-arrow" id="calPrev"></button>' +
      '<h2 id="calH" aria-live="polite"></h2><button type="button" class="cal-arrow" id="calNext"></button></div><div class="cal-grid" id="calGrid"></div>' +
      '<p class="muted cal-key" id="calKey"></p></section><h2 class="sec" id="dayH"></h2><div class="nw-list" id="dayList"></div>';
    function addMonth(k) { var y = +ym.slice(0, 4), m = +ym.slice(5, 7) - 1 + k; y += Math.floor(m / 12); m = ((m % 12) + 12) % 12; return y + "-" + pad(m + 1); }
    function answeredCount(d) { var a = answers(), n = 0; Object.keys(a).forEach(function (k) { if (k.slice(0, 10) === d) n++; }); return n; }
    function cal() {
      var y = +ym.slice(0, 4), m = +ym.slice(5, 7), loc = RRB.locale(), today = istToday();
      document.getElementById("calH").textContent = new Date(Date.UTC(y, m - 1, 15)).toLocaleDateString(loc, { month: "long", year: "numeric", timeZone: "UTC" });
      var pv = document.getElementById("calPrev"), nx = document.getElementById("calNext");
      pv.textContent = "‹"; nx.textContent = "›"; pv.setAttribute("aria-label", T("news.prevMonth")); nx.setAttribute("aria-label", T("news.nextMonth"));
      pv.disabled = ym <= first; nx.disabled = ym >= last;
      var h = "", start = new Date(Date.UTC(y, m - 1, 1)).getUTCDay(), dim = new Date(Date.UTC(y, m, 0)).getUTCDate();
      for (var w = 0; w < 7; w++) h += '<span class="cal-wd" aria-hidden="true">' + new Date(Date.UTC(2026, 10, 1 + w)).toLocaleDateString(loc, { weekday: "short", timeZone: "UTC" }) + "</span>"; // 1 Nov 2026 is a Sunday
      for (var b = 0; b < start; b++) h += '<span class="cal-pad"></span>';
      for (var d = 1; d <= dim; d++) {
        var iso = ym + "-" + pad(d), ok = !!has[iso], n = ok ? answeredCount(iso) : 0;
        var label = fmtDay(iso) + (ok ? " · " + T("news.calHas") + (n ? " · " + T("news.calDone", { n: n }) : "") : " · " + T("news.calNone")) + (iso === today ? " · " + T("news.calToday") : "");
        h += '<button type="button" class="cal-d' + (ok ? " has" : "") + (iso === sel ? " sel" : "") + (iso === today ? " today" : "") + '" data-d="' + iso + '"' +
          (ok ? "" : " disabled") + (iso === sel ? ' aria-current="date"' : "") + ' aria-label="' + E(label) + '"' + (ok && iso !== sel ? ' tabindex="-1"' : "") + ">" + d +
          (n ? '<span class="cal-tick" aria-hidden="true">✓</span>' : "") + "</button>";
      }
      var g = document.getElementById("calGrid"); g.innerHTML = h;
      // keep one day in the tab order (the chosen day, or the first news day of this month)
      if (!g.querySelector('.cal-d.has:not([tabindex="-1"])')) { var f = g.querySelector(".cal-d.has"); if (f) f.removeAttribute("tabindex"); }
      document.getElementById("calKey").innerHTML = '<span class="cal-sw has"></span> ' + T("news.calHas") + ' <span class="cal-sw today"></span> ' + T("news.calToday") + " <span>✓</span> " + T("news.calAnswered");
    }
    function show() {
      document.getElementById("dayH").textContent = fmtDay(sel);
      var box = document.getElementById("dayList"), want = sel;
      box.innerHTML = '<p class="muted">' + T("news.loading") + "</p>";
      RRB.newsLoad(want, function (data) {
        if (want !== sel) return;
        var q = RRB.newsQotdIndex(data.date, data.items.length);
        RRB.newsRender(box, data, undefined, q);
        if (focusItem != null) { var el = document.getElementById("nw-" + want + "-" + focusItem); if (el) { el.classList.add("nw-hl"); if (!scrolled) { scrolled = true; el.scrollIntoView({ block: "start" }); } } }
      }, function () { box.innerHTML = '<p class="muted">' + T("news.err") + "</p>"; });
    }
    function pick(d, focus) {
      sel = d; focusItem = null; ym = d.slice(0, 7);
      if (location.hash !== "#" + d) history.pushState(null, "", "#" + d);
      cal(); show();
      if (focus) { var b = document.querySelector('.cal-d[data-d="' + d + '"]'); if (b) b.focus(); }
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest(".cal-d.has"); if (b) { pick(b.dataset.d); return; }
      if (e.target.id === "calPrev" && !e.target.disabled) { ym = addMonth(-1); cal(); }
      if (e.target.id === "calNext" && !e.target.disabled) { ym = addMonth(1); cal(); }
    });
    // answering an MCQ below updates the ✓ on the calendar
    document.getElementById("dayList").addEventListener("click", function (e) { if (e.target.closest(".opt")) setTimeout(cal, 0); });
    root.addEventListener("keydown", function (e) {
      var b = e.target.closest && e.target.closest(".cal-d"); if (!b) return;
      var step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!step) return;
      e.preventDefault();
      var all = Array.prototype.slice.call(document.querySelectorAll(".cal-d")), k = all.indexOf(b) + step;
      // move to the nearest day with news in that direction
      var dir = step > 0 ? 1 : -1;
      for (; k >= 0 && k < all.length; k += (Math.abs(step) === 7 ? step : dir)) if (all[k].classList.contains("has")) { all[k].focus(); return; }
    });
    window.addEventListener("hashchange", function () { parse(); cal(); show(); });
    window.addEventListener("popstate", function () { parse(); cal(); show(); });
    document.addEventListener("rrb:lang", function () { cal(); show(); });
    parse(); cal(); show();
  }
  document.addEventListener("DOMContentLoaded", function () { home(); archive(); });
})();
