// Notes page. notes.html = topic list grouped by subject; notes.html#<topicId> = one note.
// Topic ids/names come from data/topics.js; ready notes are listed in data/notes/index.js and each
// note (English + Hindi) is loaded on demand from data/notes/<topicId>.js via RRB.noteLoaded.
(function () {
  var T = function (k, v) { return RRB.t(k, v); }, E = RRB.esc, TP = RRB.TOPICS || { sections: {}, topics: [], map: {} };
  var READY = RRB.NOTES_READY || [], SUBJ = [["maths", "subj.maths"], ["reasoning", "subj.reasoning"], ["gs", "subj.science"], ["ga", "subj.ga"]];
  var TOP = {}, CNT = {}, cache = {};
  TP.topics.forEach(function (t) { TOP[t.k] = t; });
  Object.keys(TP.map).forEach(function (pid) { TP.map[pid].forEach(function (k) { CNT[k] = (CNT[k] || 0) + 1; }); });
  function hi() { return RRB.lang() === "hi"; }
  function nm(t) { return t ? (hi() && t.hi ? t.hi : t.en) : ""; }
  function subjKey(s) { for (var i = 0; i < SUBJ.length; i++) if (SUBJ[i][0] === s) return SUBJ[i][1]; return ""; }
  function isReady(k) { return READY.indexOf(k) >= 0; }
  // escape, then turn a^b / a^(…) into superscripts
  function fx(s) { return E(s).replace(/\^(\([^)]*\)|[\w]+)/g, function (m, p) { return "<sup>" + p + "</sup>"; }); }
  function practiceBtn(k, cls) { return '<a class="btn ' + (cls || "") + '" href="practice.html?topic=' + k + '">' + T("notes.practice") + "</a>"; }

  function list() {
    document.title = T("notes.doctitle");
    var h = '<div class="list-head"><h1>' + T("notes.h1") + '</h1></div><p class="muted">' + T("notes.intro") + "</p>";
    h += '<h2 class="sec">' + T("notes.readyH") + '</h2><div class="grid cols-3 nt-ready">' + READY.filter(function (k) { return TOP[k]; }).map(function (k) {
      var t = TOP[k];
      return '<a class="card nt-card" href="#' + k + '"><small>' + T(subjKey(t.s)) + "</small><h3>" + E(nm(t)) + "</h3><p>" + T("notes.qs", { n: CNT[k] || 0 }) +
        '</p><span class="more">' + T("notes.read") + "</span></a>";
    }).join("") + "</div>";
    SUBJ.forEach(function (s) {
      var ts = TP.topics.filter(function (t) { return t.s === s[0]; }); if (!ts.length) return;
      h += '<h2 class="sec">' + T(s[1]) + '</h2><div class="card nt-list"><ul>' + ts.map(function (t) {
        return isReady(t.k)
          ? '<li class="ok"><a href="#' + t.k + '"><span>' + E(nm(t)) + '</span><span class="tag ok">' + T("notes.read") + "</span></a></li>"
          : '<li><span class="nt-name">' + E(nm(t)) + '</span><span class="nt-right"><a class="nt-pr" href="practice.html?topic=' + t.k + '">' + T("notes.practiseShort") +
            '</a><span class="tag warn">' + T("notes.soon") + "</span></span></li>";
      }).join("") + "</ul></div>";
    });
    document.getElementById("nb").innerHTML = h;
  }

  function load(k, cb) {
    if (cache[k]) return cb(cache[k]);
    RRB.noteLoaded = function (d) { cache[k] = d; cb(d); };
    var s = document.createElement("script"); s.src = "data/notes/" + k + ".js?v=" + RRB.VER;
    s.onerror = function () { document.getElementById("nb").innerHTML = back() + '<div class="card"><p>' + T("notes.loadErr") + "</p></div>"; };
    document.head.appendChild(s);
  }
  function back() { return '<p class="nt-back"><a href="notes.html">' + T("notes.back") + "</a></p>"; }

  function note(k) {
    var t = TOP[k]; if (!t) { location.hash = ""; return list(); }
    document.title = T("notes.noteTitle", { t: nm(t) });
    var head = back() + '<div class="nt-head"><div><small>' + T(subjKey(t.s)) + "</small><h1>" + E(nm(t)) + "</h1><p class=\"muted\">" + T("notes.qs", { n: CNT[k] || 0 }) + "</p></div>";
    if (!isReady(k)) {
      document.getElementById("nb").innerHTML = head + "</div>" + '<div class="card nt-soon"><span class="tag warn">' + T("notes.soon") + "</span><p>" + T("notes.soonNote") + "</p>" + practiceBtn(k) + "</div>";
      return;
    }
    document.getElementById("nb").innerHTML = head + "</div><p class=\"muted\">" + T("notes.loading") + "</p>";
    load(k, function (d) {
      if (location.hash.slice(1) !== k) return;
      var n = d[hi() ? "hi" : "en"] || d.en;
      var h = head + '<div class="nt-act"><button type="button" class="btn ghost-btn" id="printBtn">🖨 ' + T("notes.print") + "</button>" + practiceBtn(k) + "</div></div>" +
        '<p class="nt-intro">' + E(n.intro) + "</p>";
      h += '<section class="card nt-sec"><h2>📌 ' + T("notes.concepts") + "</h2>" + n.concepts.map(function (c) {
        return "<h3>" + E(c.h) + "</h3>" + (c.list ? "<ul>" + c.list.map(function (x) { return "<li>" + fx(x) + "</li>"; }).join("") + "</ul>" : "") +
          (c.table ? '<div class="nt-table">' + c.table.map(function (r) { return "<div><b>" + E(r[0]) + "</b><span>" + E(r[1]) + "</span></div>"; }).join("") + "</div>" : "");
      }).join("") + "</section>";
      h += '<section class="card nt-sec"><h2>🧮 ' + T("notes.formulas") + '</h2><dl class="nt-fm">' + n.formulas.map(function (f) {
        return "<div><dt>" + E(f[0]) + "</dt><dd>" + fx(f[1]) + "</dd></div>";
      }).join("") + "</dl></section>";
      h += '<section class="nt-sec nt-exs"><h2>✍️ ' + T("notes.examples") + "</h2>" + n.examples.map(function (x, i) {
        return '<div class="card nt-ex"><h3>' + T("notes.ex", { n: i + 1 }) + '</h3><p class="nt-q">' + fx(x.q) + "</p><ol>" +
          x.s.map(function (s) { return "<li>" + fx(s) + "</li>"; }).join("") + '</ol><p class="nt-ans"><strong>' + T("notes.ans") + "</strong> " + fx(x.a) + "</p></div>";
      }).join("") + "</section>";
      h += '<div class="grid cols-2 nt-two"><section class="card nt-sec nt-tricks"><h2>⚡ ' + T("notes.tricks") + "</h2><ul>" + n.tricks.map(function (x) { return "<li>" + fx(x) + "</li>"; }).join("") +
        '</ul></section><section class="card nt-sec nt-mist"><h2>⚠ ' + T("notes.mistakes") + "</h2><ul>" + n.mistakes.map(function (x) { return "<li>" + fx(x) + "</li>"; }).join("") + "</ul></section></div>";
      h += '<div class="nt-end card"><p>' + T("notes.endP", { n: CNT[k] || 0 }) + "</p>" + practiceBtn(k) + "</div>";
      var nb = document.getElementById("nb"); nb.innerHTML = h;
      if (hi()) nb.querySelectorAll(".nt-sec,.nt-intro,.nt-ex").forEach(function (e) { e.setAttribute("lang", "hi"); });
      document.getElementById("printBtn").onclick = function () { window.print(); };
    });
  }
  function route() { var k = decodeURIComponent(location.hash.slice(1)); if (k) note(k); else list(); window.scrollTo(0, 0); }
  document.addEventListener("DOMContentLoaded", route);
  window.addEventListener("hashchange", route);
  document.addEventListener("rrb:lang", function () { var y = scrollY; var k = location.hash.slice(1); if (k) note(k); else list(); window.scrollTo(0, y); });
})();
