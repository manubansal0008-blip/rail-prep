// Daily Practice Problems (DPPs): 5 questions a day in the pattern of previous RRB papers (Rail Prep's own practice
// questions unless a question carries a past-paper label with exam + year). Data: data/dpp/index.js (RRB.DPP_DAYS,
// newest first) and one data/dpp/YYYY-MM-DD.js per day calling RRB.dppLoaded({date, items:[...]}).
// Used by the home page (#dpp: card for the newest day) and dpp.html (#dppRoot: quiz for one day + list of all days).
// Answers are kept in localStorage "rrb.dpp" = {"YYYY-MM-DD:i": chosenIndex}. dpp.html#YYYY-MM-DD opens a day.
(function () {
  var T = function (k, v) { return RRB.t(k, v); }, E = function (s) { return RRB.esc(s); }, KEY = "rrb.dpp";
  var cache = {}, wait = {};
  RRB.dppLoaded = function (d) { cache[d.date] = d; (wait[d.date] || []).forEach(function (f) { f[0](d); }); delete wait[d.date]; };
  RRB.dppLoad = function (date, ok, bad) {
    if (cache[date]) return ok(cache[date]);
    if (wait[date]) { wait[date].push([ok, bad]); return; }
    wait[date] = [[ok, bad]];
    var s = document.createElement("script"); s.src = "data/dpp/" + date + ".js?v=" + RRB.VER;
    s.onerror = function () { (wait[date] || []).forEach(function (f) { f[1] && f[1](); }); delete wait[date]; };
    document.head.appendChild(s);
  };
  function answers() { try { return JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { return {}; } }
  function save(id, j) { var a = answers(); if (j == null) delete a[id]; else a[id] = j; try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) {} }
  function L(o) { return RRB.lang() === "hi" && o.hi ? o.hi : o.en; }
  function fmtDay(date, short) {
    return new Date(date + "T12:00:00+05:30").toLocaleDateString(RRB.locale(), RRB.dtOpts(short ? { day: "numeric", month: "short", year: "numeric" } : { weekday: "long", day: "numeric", month: "long", year: "numeric" }));
  }
  function sub(it) { return T("dpp.sub." + it.subject); }
  function tally(d) {
    var a = answers(), done = 0, right = 0;
    d.items.forEach(function (it, i) { var g = a[d.date + ":" + i]; if (g != null) { done++; if (g === it.a) right++; } });
    return { done: done, right: right, n: d.items.length };
  }

  // One question card. The label ("Rail Prep practice (PYQ pattern)" or a past-paper label) is always visible.
  function card(d, it, i) {
    var x = L(it), id = d.date + ":" + i, got = answers()[id], done = got != null;
    var h = '<article class="card dpp-q" id="q' + (i + 1) + '"><div class="dpp-top"><span class="tag nw-cat">' + E(sub(it)) + "</span>" +
      (it.topic ? '<span class="muted dpp-topic">' + E(L(it.topic)) + "</span>" : "") + '<span class="muted nw-n">' + (i + 1) + "/" + d.items.length + "</span></div>" +
      '<p class="dpp-lbl"><span class="tag ' + (it.pyq ? "ok" : "new") + '">' + E(it.label) + "</span></p>" +
      '<p class="qtext"><strong>Q' + (i + 1) + ".</strong> " + E(x.q) + '</p><div class="opts" role="group" aria-label="' + E(T("dpp.opts", { n: i + 1 })) + '">' +
      x.o.map(function (o, j) {
        var cls = "opt" + (done ? (j === it.a ? " right" : j === got ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-i="' + i + '" data-j="' + j + '"' + (done ? " disabled" : "") + '><span class="ol">' + "ABCD"[j] + "</span><span>" + E(o) + "</span></button>";
      }).join("") + "</div>";
    if (done) {
      h += '<div class="pr-fb ' + (got === it.a ? "fb-ok" : "fb-bad") + '" role="status" tabindex="-1"><strong>' +
        (got === it.a ? "✓ " + T("qd.right") : "✗ " + T("dpp.wrong", { k: "ABCD"[it.a], o: x.o[it.a] })) + "</strong>" +
        '<p class="expl"><strong>' + T("dpp.expl") + "</strong> " + E(x.e) + "</p>" +
        (x.trick ? '<p class="expl dpp-trick"><strong>⚡ ' + T("dpp.trick") + "</strong> " + E(x.trick) + "</p>" : "") + "</div>";
    }
    return h + "</article>";
  }

  // Home: card for the newest day (subjects, how many done, button to dpp.html#day).
  function home() {
    var root = document.getElementById("dpp"); if (!root) return;
    var days = RRB.DPP_DAYS || [], st = { d: null, err: false };
    function draw() {
      if (!days.length) { root.innerHTML = '<p class="muted">' + T("dpp.none") + "</p>"; return; }
      var dateEl = document.getElementById("dppDate"); if (dateEl) dateEl.textContent = fmtDay(days[0]);
      if (st.err) { root.innerHTML = '<p class="muted">' + T("dpp.err") + "</p>"; return; }
      if (!st.d) { root.innerHTML = '<p class="muted">' + T("dpp.loading") + "</p>"; return; }
      var d = st.d, t = tally(d);
      root.innerHTML = '<div class="card dpp-home"><div class="dpp-home-txt"><p class="dpp-home-p">' + T("dpp.homeP") + "</p>" +
        '<div class="dpp-chips">' + d.items.map(function (it) { return '<span class="tag nw-cat">' + E(sub(it)) + "</span>"; }).join("") + "</div>" +
        '<p class="muted dpp-home-s">' + (t.done ? T("dpp.homeDone", { d: t.done, n: t.n, r: t.right }) : T("dpp.homeNew", { n: t.n })) + "</p></div>" +
        '<a class="btn" href="dpp.html#' + d.date + '">' + T(t.done === t.n ? "dpp.review" : t.done ? "dpp.continue" : "dpp.start") + "</a></div>";
    }
    function go() { RRB.dppLoad(days[0], function (d) { st.d = d; draw(); }, function () { st.err = true; draw(); }); }
    draw();
    if (!days.length) return;
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); go(); } }, { rootMargin: "300px" });
      io.observe(root);
    } else go();
    document.addEventListener("rrb:lang", draw);
  }

  // dpp.html: chosen day (from the #hash, else newest) as a quiz with score, then the list of all days.
  function page() {
    var root = document.getElementById("dppRoot"); if (!root) return;
    var days = RRB.DPP_DAYS || [], sel = null, d = null, err = false;
    if (!days.length) { root.innerHTML = '<p class="muted">' + T("dpp.none") + "</p>"; return; }
    function pick() { var h = location.hash.slice(1, 11); sel = days.indexOf(h) >= 0 ? h : days[0]; }
    function list() {
      return '<section class="dpp-arch" aria-labelledby="dppArchH"><h2 class="sec" id="dppArchH">' + T("dpp.archH") + '</h2><div class="card nt-list"><ul>' +
        days.map(function (x) {
          return '<li class="ok"><a href="#' + x + '"' + (x === sel ? ' aria-current="true"' : "") + "><span>" + E(fmtDay(x)) + "</span>" +
            '<span class="muted">' + (x === sel ? T("dpp.open") : T("dpp.static")) + "</span></a></li>";
        }).join("") + "</ul></div><p class=\"muted dpp-st\"><a href=\"dpp/index.html\">" + T("dpp.allStatic") + "</a></p></section>";
    }
    function draw() {
      var head = '<div class="dpp-dayhead"><h2 class="sec">' + E(fmtDay(sel)) + "</h2>" +
        '<a class="nw-all" href="dpp/' + sel + '.html">' + T("dpp.print") + "</a></div>";
      if (err) { root.innerHTML = head + '<p class="muted">' + T("dpp.err") + "</p>" + list(); return; }
      if (!d || d.date !== sel) { root.innerHTML = head + '<p class="muted">' + T("dpp.loading") + "</p>" + list(); return; }
      var t = tally(d);
      var score = '<div class="card dpp-score" role="status"><div><strong>' + T("dpp.score", { r: t.right, n: t.n }) + "</strong>" +
        '<span class="muted">' + T(t.done === t.n ? "dpp.allDone" : "dpp.left", { k: t.n - t.done }) + "</span></div>" +
        (t.done ? '<button type="button" class="btn ghost-btn" id="dppReset">' + T("dpp.again") + "</button>" : "") + "</div>";
      root.innerHTML = head + score + '<div class="dpp-list">' + d.items.map(function (it, i) { return card(d, it, i); }).join("") + "</div>" + (t.done ? score.replace('id="dppReset"', 'id="dppReset2"') : "") + list();
      root.querySelectorAll(".opt:not([disabled])").forEach(function (b) {
        b.onclick = function () {
          var i = +b.dataset.i; save(d.date + ":" + i, +b.dataset.j); draw();
          var fb = document.querySelector("#q" + (i + 1) + " .pr-fb"); if (fb) fb.focus({ preventScroll: true });
        };
      });
      ["dppReset", "dppReset2"].forEach(function (id) {
        var r = document.getElementById(id);
        if (r) r.onclick = function () { d.items.forEach(function (_, i) { save(d.date + ":" + i, null); }); draw(); var q = document.getElementById("q1"); if (q) q.scrollIntoView({ block: "start" }); };
      });
    }
    function load() {
      err = false; draw();
      RRB.dppLoad(sel, function (x) { if (x.date === sel) { d = x; draw(); } }, function () { err = true; draw(); });
    }
    window.addEventListener("hashchange", function () { var old = sel; pick(); if (sel !== old) { load(); window.scrollTo(0, 0); } });
    document.addEventListener("rrb:lang", draw);
    pick(); load();
  }
  document.addEventListener("DOMContentLoaded", function () { home(); page(); });
})();
