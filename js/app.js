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
    // Static pages in a sub-folder (notes/, news/) set data-root="../" and data-nav="<page>.html" on <html>.
    var R = document.documentElement.getAttribute("data-root") || "";
    var here = document.documentElement.getAttribute("data-nav") || location.pathname.split("/").pop() || "index.html";
    var links = PAGES.map(function (p) {
      return '<a href="' + R + p[0] + '"' + (p[0] === here ? ' aria-current="page"' : "") + ' data-i18n="' + p[1] + '">' + RRB.t(p[1]) + "</a>";
    }).join("");
    var h = document.createElement("header");
    h.className = "top";
    h.innerHTML = '<div class="wrap">' +
      '<a class="brand" href="' + R + 'index.html"><span class="brand-mark">RP</span><span data-i18n="site.title">' + RRB.t("site.title") + '</span></a>' +
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
    f.innerHTML = '<div class="wrap"><p class="site-meta" id="siteMeta" hidden><span id="visStat" hidden></span><span id="updStat" hidden></span></p>' +
      '<p data-i18n-html="foot.disc">' + RRB.t("foot.disc") + '</p><p data-i18n="foot.src">' + RRB.esc(RRB.t("foot.src")) + "</p>" +
      '<p class="site-copy" data-i18n="foot.copy">' + RRB.esc(RRB.t("foot.copy")) + "</p></div>";
    document.body.append(f);
    siteMeta();
  }

  // Footer line: visitor count (Cloudflare Worker /visit, same server as the doubt chat) and "last updated" (data/updated.js,
  // written by the daily news job via build_static.py). Not on test.html. If either fails it simply stays hidden.
  RRB.VISIT_URL = "https://rail-prep-chat.manubansal0008.workers.dev/visit";
  var KEY_VISIT = "rrb.visitDay", VIS = null;
  var MON_HI = ["जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
  var MON_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function istParts(ms) { var d = new Date(ms + 5.5 * 3600 * 1000); return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), h: d.getUTCHours(), mi: d.getUTCMinutes() }; }
  // "1 नवंबर 2026, सुबह 6:32 (IST)" / "1 Nov 2026, 6:32 AM (IST)"
  RRB.fmtStamp = function (iso) {
    var ms = Date.parse(iso); if (isNaN(ms)) return "";
    var p = istParts(ms), h12 = p.h % 12 || 12, mm = (p.mi < 10 ? "0" : "") + p.mi;
    if (RRB.lang() === "hi") {
      var part = p.h < 4 ? "रात" : p.h < 12 ? "सुबह" : p.h < 16 ? "दोपहर" : p.h < 20 ? "शाम" : "रात";
      return p.d + " " + MON_HI[p.m] + " " + p.y + ", " + part + " " + h12 + ":" + mm + " " + RRB.t("foot.ist");
    }
    return p.d + " " + MON_EN[p.m] + " " + p.y + ", " + h12 + ":" + mm + " " + (p.h < 12 ? "AM" : "PM") + " " + RRB.t("foot.ist");
  };
  function paintMeta() {
    var v = document.getElementById("visStat"), u = document.getElementById("updStat"), box = document.getElementById("siteMeta");
    if (!box) return;
    var f = function (n) { return Number(n).toLocaleString(RRB.locale()); };
    if (VIS && VIS.total >= 1) { v.textContent = RRB.t("foot.vis", { t: f(VIS.total), d: f(VIS.today) }); v.hidden = false; }
    var s = RRB.UPDATED && RRB.fmtStamp(RRB.UPDATED);
    if (s) { u.textContent = RRB.t("foot.upd", { d: s }); u.hidden = false; }
    box.hidden = v.hidden && u.hidden;
  }
  function siteMeta() {
    if ((location.pathname.split("/").pop() || "") === "test.html") return;
    var R = document.documentElement.getAttribute("data-root") || "";
    if (!RRB.UPDATED) {
      var s = document.createElement("script");
      s.src = R + "data/updated.js?t=" + Math.floor(Date.now() / 600000); // GitHub Pages caches ~10 min anyway
      s.onload = paintMeta; document.head.appendChild(s);
    }
    if (!window.fetch || !RRB.VISIT_URL) return;
    var today = new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10), counted = false;
    try { counted = localStorage.getItem(KEY_VISIT) === today; } catch (e) {}
    var ctl = window.AbortController ? new AbortController() : null; if (ctl) setTimeout(function () { ctl.abort(); }, 8000);
    fetch(RRB.VISIT_URL, { method: counted ? "GET" : "POST", signal: ctl && ctl.signal, credentials: "omit" })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || typeof d.total !== "number") return;
        if (!counted) try { localStorage.setItem(KEY_VISIT, today); } catch (e) {}
        VIS = d; paintMeta();
      }).catch(function () {});
  }
  document.addEventListener("rrb:lang", paintMeta);

  document.addEventListener("DOMContentLoaded", function () { header(); footer(); });
})();

// Cache-busting version for files loaded on demand. Keep in step with the ?v= on <script>/<link> tags in the HTML pages.
RRB.VER = "20261102a";
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
// Question counts from data/index.js: per exam and total (past papers + our mocks). Used by the home cards and slider.
RRB.qCounts = function () {
  var c = { ntpc: 0, gd: 0 }; (RRB.INDEX || []).forEach(function (p) { if (c[p.exam] != null) c[p.exam] += p.count; });
  c.all = c.ntpc + c.gd; return c;
};
RRB.qScope = function () {
  var c = RRB.qCounts(), f = function (n) { return n.toLocaleString(RRB.locale()); };
  return RRB.t("q.scope", { a: f(c.ntpc), b: f(c.gd), t: f(c.all) });
};
RRB.esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
RRB.ATTEMPTS = "rrb.attempts"; RRB.ACTIVE = "rrb.active"; RRB.DRILLS = "rrb.drills";
// Question figures (shared by the test and topic-practice pages). Image paths in the data are already data/img/<paper>/...
RRB.imgW = 'onload="this.style.width=Math.min(this.naturalWidth,Math.max(this.naturalWidth/2,680))+\'px\'"';
RRB.figs = function (q) { var a = q.img ? [].concat(q.img) : []; return a.map(function (src) { return '<img class="qimg" loading="lazy" ' + RRB.imgW + ' src="' + src + '" alt="' + RRB.t("test.fig") + '">'; }).join(""); };
RRB.optImg = function (q, k) { return q.oi && q.oi[k] ? '<img class="oimg" loading="lazy" ' + RRB.imgW + ' src="' + q.oi[k] + '" alt="' + RRB.t("test.optFig", { k: k + 1 }) + '">' : ""; };
// Share bar: WhatsApp, Telegram, copy link and (on phones with a share sheet) the native share button. No external scripts.
// A page bar is added below <main> on every page except test.html (static pages built by build_static.py already have
// <div class="share-bar" data-share="page"> in the HTML; it is filled in again here). The URL shared is the page's canonical URL
// (no ?v= or other query) plus the #part (notes.html#topic, news.html#day). RRB.shareHTML({text, url}) makes a small bar
// for one item (home "Question of the day" and today's news); clicks on all bars are handled by one listener below.
RRB.BASE = "https://manubansal0008-blip.github.io/rail-prep/";
(function () {
  var I = {
    wa: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-1-1.1-1.3-1.7-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.1 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path fill="currentColor" d="M21.6 3.2 2.9 10.4c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.8.8.4 0 .6-.2.9-.4l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.8c.3-1.3-.5-1.9-1.3-1.5zM9.4 13.1l8.6-5.4c.4-.3.8-.1.5.2l-7.2 6.5-.3 3.2-1.6-4.5z"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.2 1.2"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.2-1.2"/></svg>',
    share: '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg>'
  };
  var T = function (k) { return RRB.t(k); }, E = function (s) { return RRB.esc(s); };
  function canNative() { return !!navigator.share && matchMedia("(pointer:coarse)").matches; }
  // Canonical URL of this page (production address, no query string) plus the current #part.
  RRB.shareUrl = function () {
    var c = document.querySelector('link[rel="canonical"]'), u = c ? c.href : location.origin + location.pathname;
    u = u.split("#")[0].split("?")[0];
    return u + (location.hash && location.hash.length > 1 ? location.hash : "");
  };
  function links(text, url) {
    return { wa: "https://wa.me/?text=" + encodeURIComponent(text + "\n" + url),
             tg: "https://t.me/share/url?url=" + encodeURIComponent(url) + "&text=" + encodeURIComponent(text) };
  }
  // Markup of one bar. mini: icons only (labels stay as aria-label), for cards.
  RRB.shareHTML = function (o) {
    var l = links(o.text, o.url), mini = !!o.mini, lbl = function (k) { return mini ? "" : "<span>" + T(k) + "</span>"; };
    var tt = function (k) { return mini ? ' title="' + E(T(k)) + '"' : ""; };
    return '<div class="share-bar' + (mini ? " sh-mini" : "") + '" role="group" aria-label="' + E(T("share.aria")) + '" data-share="' + (o.page ? "page" : "item") + '"' +
      ' data-text="' + E(o.text) + '" data-url="' + E(o.url) + '">' + (mini ? "" : '<span class="sh-lbl">' + T("share.lbl") + "</span>") +
      '<a class="sh-btn sh-wa" href="' + E(l.wa) + '" target="_blank" rel="noopener" aria-label="' + E(T("share.waAria")) + '"' + tt("share.waAria") + '>' + I.wa + lbl("share.wa") + "</a>" +
      '<a class="sh-btn sh-tg" href="' + E(l.tg) + '" target="_blank" rel="noopener" aria-label="' + E(T("share.tgAria")) + '"' + tt("share.tgAria") + '>' + I.tg + lbl("share.tg") + "</a>" +
      '<button type="button" class="sh-btn sh-copy" aria-label="' + E(T("share.copy")) + '"' + tt("share.copy") + '>' + I.link + lbl("share.copy") + "</button>" +
      (canNative() ? '<button type="button" class="sh-btn sh-native" aria-label="' + E(T("share.native")) + '"' + tt("share.native") + '>' + I.share + lbl("share.native") + "</button>" : "") + "</div>";
  };
  function pageBar(el) {
    var d = document.createElement("div"); d.innerHTML = RRB.shareHTML({ text: document.title, url: RRB.shareUrl(), page: true });
    var n = d.firstChild; el.replaceWith(n); return n;
  }
  function refreshPage() { document.querySelectorAll('.share-bar[data-share="page"]').forEach(pageBar); }
  function toast(msg) {
    var t = document.getElementById("shToast");
    if (!t) { t = document.createElement("div"); t.id = "shToast"; t.className = "sh-toast"; t.setAttribute("role", "status"); t.setAttribute("aria-live", "polite"); document.body.append(t); }
    t.textContent = msg; t.classList.add("show"); clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }
  function copy(s) {
    function old() {
      var a = document.createElement("textarea"); a.value = s; a.setAttribute("readonly", ""); a.style.position = "fixed"; a.style.opacity = "0";
      document.body.append(a); a.select(); var ok = false; try { ok = document.execCommand("copy"); } catch (e) {} a.remove();
      toast(T(ok ? "share.copied" : "share.copyErr"));
    }
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(s).then(function () { toast(T("share.copied")); }, old); else old();
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".sh-btn"); if (!b) return;
    var bar = b.closest(".share-bar"), page = bar.getAttribute("data-share") === "page";
    var text = page ? document.title : bar.getAttribute("data-text"), url = page ? RRB.shareUrl() : bar.getAttribute("data-url");
    if (b.classList.contains("sh-wa") || b.classList.contains("sh-tg")) { var l = links(text, url); b.href = b.classList.contains("sh-wa") ? l.wa : l.tg; return; }
    e.preventDefault();
    if (b.classList.contains("sh-copy")) copy(url);
    else if (b.classList.contains("sh-native") && navigator.share) navigator.share({ title: page ? document.title : "Rail Prep", text: text, url: url }).catch(function () {});
  });
  document.addEventListener("DOMContentLoaded", function () {
    var here = location.pathname.split("/").pop();
    if (here !== "test.html" && !document.querySelector('.share-bar[data-share="page"]')) {
      var m = document.querySelector("main"), w = document.createElement("div");
      if (m) { w.className = "wrap sh-wrap"; w.innerHTML = '<div class="share-bar" data-share="page"></div>'; m.after(w); }
    }
    refreshPage();
  });
  window.addEventListener("hashchange", refreshPage);
  document.addEventListener("rrb:lang", refreshPage);
})();
