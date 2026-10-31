// Shared shell: header, nav, footer, theme switch. No external dependencies.
window.RRB = window.RRB || {};
(function () {
  var KEY_THEME = "rrb.theme", KEY_EXAM = "rrb.exam";
  var saved = localStorage.getItem(KEY_THEME);
  var theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  RRB.getExam = function () { return localStorage.getItem(KEY_EXAM) || "ntpc"; };
  RRB.setExam = function (x) { localStorage.setItem(KEY_EXAM, x); };

  var PAGES = [["index.html", "Home"], ["notes.html", "Notes"], ["mock.html#papers", "Past Papers"], ["mock.html", "Mock Tests"], ["progress.html", "Progress"]];

  function header() {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = PAGES.map(function (p) {
      return '<a href="' + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : "") + ">" + p[1] + "</a>";
    }).join("");
    var h = document.createElement("header");
    h.className = "top";
    h.innerHTML = '<div class="wrap">' +
      '<a class="brand" href="index.html"><span class="brand-mark">RP</span><span>Rail Prep</span></a>' +
      '<button class="icon-btn menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">☰</button>' +
      '<nav class="nav" id="nav">' + links + "</nav>" +
      '<button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode"></button></div>';
    document.body.prepend(h);
    var tb = h.querySelector("#themeBtn");
    function paint() { tb.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀" : "☾"; }
    paint();
    tb.onclick = function () {
      var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", t); localStorage.setItem(KEY_THEME, t); paint();
    };
    var mb = h.querySelector("#menuBtn"), nav = h.querySelector("#nav");
    mb.onclick = function () { var o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); };
  }

  function footer() {
    var f = document.createElement("footer");
    f.innerHTML = '<div class="wrap"><p><strong>Disclaimer:</strong> Rail Prep is an unofficial, independent practice resource. ' +
      "It is not affiliated with the Railway Recruitment Boards or Indian Railways. Dates shown here, especially those marked tentative or expected, " +
      "must be confirmed on the official RRB websites before you rely on them.</p>" +
      "<p>Past-paper questions are reproduced as published, with RRB-marked answers. Practice sets are original questions.</p></div>";
    document.body.append(f);
  }

  document.addEventListener("DOMContentLoaded", function () { header(); footer(); });
})();

// Load one paper/practice-set data file on demand. Calls cb(data).
RRB.loadTest = function (id, cb, err) {
  var meta = (RRB.INDEX || []).filter(function (p) { return p.id === id; })[0];
  if (!meta) { err && err("Unknown test"); return; }
  RRB.load = function (d) { d.meta = meta; cb(d); };
  var s = document.createElement("script");
  s.src = "data/" + (meta.mock ? "mocks/" : "papers/") + id + ".js";
  s.onerror = function () { err && err("Could not load test data"); };
  document.head.appendChild(s);
};
RRB.esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
RRB.ATTEMPTS = "rrb.attempts"; RRB.ACTIVE = "rrb.active";
