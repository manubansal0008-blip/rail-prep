// Shared shell: header, nav, footer, theme switch. No external dependencies.
window.RRB = window.RRB || {};
(function () {
  var KEY_THEME = "rrb.theme", KEY_EXAM = "rrb.exam";
  var saved = localStorage.getItem(KEY_THEME);
  var theme = saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);

  RRB.getExam = function () { return localStorage.getItem(KEY_EXAM) || "ntpc"; };
  RRB.setExam = function (x) { localStorage.setItem(KEY_EXAM, x); };

  var PAGES = [["index.html", "nav.home"], ["notes.html", "nav.notes"], ["news.html", "nav.news"], ["papers.html", "nav.papers"], ["mock.html", "nav.mocks"], ["practice.html", "nav.practice"], ["progress.html", "nav.progress"]];

  function header() {
    var here = location.pathname.split("/").pop() || "index.html";
    var links = PAGES.map(function (p) {
      return '<a href="' + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : "") + ' data-i18n="' + p[1] + '">' + RRB.t(p[1]) + "</a>";
    }).join("");
    var h = document.createElement("header");
    h.className = "top";
    h.innerHTML = '<div class="wrap">' +
      '<a class="brand" href="index.html"><span class="brand-mark">RP</span><span data-i18n="site.title">' + RRB.t("site.title") + '</span></a>' +
      '<button class="icon-btn menu-btn" id="menuBtn" data-i18n-attr="aria-label:aria.menu" aria-label="' + RRB.t("aria.menu") + '" aria-expanded="false">☰</button>' +
      '<nav class="nav" id="nav">' + links + "</nav>" +
      '<div class="lang top-lang" role="group" data-i18n-attr="aria-label:aria.lang" aria-label="' + RRB.t("aria.lang") + '"><button type="button" data-l="en" aria-pressed="' + (RRB.lang() === "en") + '">EN</button>' +
      '<button type="button" data-l="hi" lang="hi" aria-pressed="' + (RRB.lang() === "hi") + '">हिंदी</button></div>' +
      '<button class="icon-btn" id="themeBtn" data-i18n-attr="aria-label:aria.theme" aria-label="' + RRB.t("aria.theme") + '"></button></div>';
    document.body.prepend(h);
    h.querySelectorAll(".top-lang button").forEach(function (b) { b.onclick = function () { RRB.setLang(b.dataset.l); }; });
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
    f.innerHTML = '<div class="wrap"><p data-i18n-html="foot.disc">' + RRB.t("foot.disc") + '</p><p data-i18n="foot.src">' + RRB.esc(RRB.t("foot.src")) + "</p></div>";
    document.body.append(f);
  }

  document.addEventListener("DOMContentLoaded", function () { header(); footer(); });
})();

// Cache-busting version for files loaded on demand. Keep in step with the ?v= on <script>/<link> tags in the HTML pages.
RRB.VER = "20261101e";
// Load one paper/practice-set data file on demand. Calls cb(data).
RRB.loadTest = function (id, cb, err) {
  var meta = (RRB.INDEX || []).filter(function (p) { return p.id === id; })[0];
  if (!meta) { err && err(RRB.t("test.unknown")); return; }
  RRB.load = function (d) { d.meta = meta; cb(d); };
  var s = document.createElement("script");
  s.src = "data/" + (meta.mock ? "mocks/" : "papers/") + id + ".js?v=" + RRB.VER;
  s.onerror = function () { err && err(RRB.t("test.loadErr")); };
  document.head.appendChild(s);
};
RRB.esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
RRB.ATTEMPTS = "rrb.attempts"; RRB.ACTIVE = "rrb.active"; RRB.DRILLS = "rrb.drills";
// Question figures (shared by the test and topic-practice pages). Image paths in the data are already data/img/<paper>/...
RRB.imgW = 'onload="this.style.width=Math.min(this.naturalWidth,Math.max(this.naturalWidth/2,680))+\'px\'"';
RRB.figs = function (q) { var a = q.img ? [].concat(q.img) : []; return a.map(function (src) { return '<img class="qimg" loading="lazy" ' + RRB.imgW + ' src="' + src + '" alt="' + RRB.t("test.fig") + '">'; }).join(""); };
RRB.optImg = function (q, k) { return q.oi && q.oi[k] ? '<img class="oimg" loading="lazy" ' + RRB.imgW + ' src="' + q.oi[k] + '" alt="' + RRB.t("test.optFig", { k: k + 1 }) + '">' : ""; };
