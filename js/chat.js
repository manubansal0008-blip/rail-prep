// Doubt chat: floating button + panel on every page. Talks to the Cloudflare Worker at RRB.CHAT_URL.
// History (last 10 messages) lives in localStorage. Replies are escaped, then a tiny markdown subset is applied.
window.RRB = window.RRB || {};
(function () {
  var KEY = "rrb.chat", KEY_LANG = "rrb.chatLang", MAX_INPUT = 2000, MAX_TURNS = 10;
  var hist = [], lang, busy = false, el = {};
  try { hist = JSON.parse(localStorage.getItem(KEY) || "[]").slice(-MAX_TURNS); } catch (e) { hist = []; }
  lang = localStorage.getItem(KEY_LANG) || (localStorage.getItem("rrb.lang") === "hi" ? "hi" : "en");
  function url() { return String(RRB.CHAT_URL || "").trim(); }
  var T = function (k, v) { return RRB.t ? RRB.t(k, v) : k; };
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // Safe markdown: escape everything first, then add bold/italic/code, lists and line breaks.
  function inline(t) {
    return t.replace(/`([^`\n]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  }
  function md(src) {
    var lines = esc(src).split(/\r?\n/), out = [], list = null, para = [];
    function flushP() { if (para.length) { out.push("<p>" + para.map(inline).join("<br>") + "</p>"); para = []; } }
    function flushL() { if (list) { out.push("<" + list.t + ">" + list.items.map(function (i) { return "<li>" + inline(i) + "</li>"; }).join("") + "</" + list.t + ">"); list = null; } }
    lines.forEach(function (ln) {
      var m = ln.match(/^\s*([-*•]|\d+[.)])\s+(.*)$/);
      if (m) { flushP(); var t = /\d/.test(m[1]) ? "ol" : "ul"; if (!list || list.t !== t) { flushL(); list = { t: t, items: [] }; } list.items.push(m[2]); return; }
      var h = ln.match(/^\s*#{1,6}\s+(.*)$/);
      if (h) { flushP(); flushL(); out.push("<p><strong>" + inline(h[1]) + "</strong></p>"); return; }
      if (!ln.trim()) { flushP(); flushL(); return; }
      flushL(); para.push(ln);
    });
    flushP(); flushL();
    return out.join("");
  }
  RRB.chatMarkdown = md;

  function save() { localStorage.setItem(KEY, JSON.stringify(hist.slice(-MAX_TURNS))); }
  function bubble(role, html, cls) {
    var d = document.createElement("div");
    d.className = "cb-msg " + (role === "user" ? "me" : "bot") + (cls ? " " + cls : "");
    d.innerHTML = html; el.log.appendChild(d); el.log.scrollTop = el.log.scrollHeight; return d;
  }
  function render() {
    el.log.innerHTML = "";
    if (!url()) bubble("bot", "<p>" + T("chat.offline") + "</p>", "note");
    else if (!hist.length) bubble("bot", lang === "hi"
      ? '<p lang="hi">नमस्ते! गणित, रीज़निंग, सामान्य विज्ञान या सामान्य जागरूकता का कोई भी डाउट पूछें।</p>'
      : "<p>Hi! Ask me any doubt from Maths, Reasoning, General Science or General Awareness.</p>", "note");
    hist.forEach(function (h) { bubble(h.role, h.role === "user" ? "<p>" + esc(h.text).replace(/\n/g, "<br>") + "</p>" : md(h.text)); });
    var off = !url();
    el.input.disabled = off; el.send.disabled = off || busy;
    el.input.placeholder = off ? T("chat.offPh") : lang === "hi" ? "अपना डाउट लिखें…" : "Type your doubt…";
    el.langBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === lang); });
    count();
  }
  function count() { var n = el.input.value.length; el.count.textContent = n + "/" + MAX_INPUT; el.count.classList.toggle("over", n > MAX_INPUT); }
  function open(v) {
    var o = v == null ? el.panel.hidden : v;
    el.panel.hidden = !o; el.fab.setAttribute("aria-expanded", o);
    document.body.classList.toggle("chat-open", o);
    if (o) { el.log.scrollTop = el.log.scrollHeight; if (!el.input.disabled) el.input.focus(); }
  }
  function send() {
    var text = el.input.value.trim();
    if (busy || !text) return;
    if (!url()) return;
    if (text.length > MAX_INPUT) { bubble("bot", "<p>" + T("chat.long", { n: MAX_INPUT }) + "</p>", "err"); return; }
    var past = hist.slice(-MAX_TURNS);
    hist.push({ role: "user", text: text }); save();
    el.input.value = ""; autosize(); count();
    bubble("user", "<p>" + esc(text).replace(/\n/g, "<br>") + "</p>");
    busy = true; el.send.disabled = true;
    var typing = bubble("bot", '<span class="cb-dots" aria-label="' + T("chat.typing") + '"><i></i><i></i><i></i></span>', "typing");
    var done = function (reply, err) {
      busy = false; typing.remove(); el.send.disabled = false;
      if (reply) { hist.push({ role: "model", text: reply }); save(); bubble("model", md(reply)); }
      else bubble("bot", "<p>" + esc(err) + "</p>", "err");
    };
    var ctl = "AbortController" in window ? new AbortController() : null, timer = setTimeout(function () { ctl && ctl.abort(); }, 45000);
    fetch(url(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: past, lang: lang }), signal: ctl && ctl.signal })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) { clearTimeout(timer); if (x.ok && x.j.reply) done(x.j.reply); else done(null, x.j.error || T("chat.fail")); })
      .catch(function () { clearTimeout(timer); done(null, T("chat.net")); });
  }
  function autosize() { el.input.style.height = "auto"; el.input.style.height = Math.min(el.input.scrollHeight, 180) + "px"; }

  function build() {
    var w = document.createElement("div");
    w.className = "cb";
    w.innerHTML =
      '<button class="cb-fab" type="button" data-i18n-attr="aria-label:chat.fab" aria-label="' + T("chat.fab") + '" aria-expanded="false" aria-controls="cbPanel"><span aria-hidden="true">💬</span><b data-i18n="chat.fab">' + T("chat.fab") + '</b></button>' +
      '<section class="cb-panel" id="cbPanel" role="dialog" data-i18n-attr="aria-label:chat.title" aria-label="' + T("chat.title") + '" hidden>' +
      '<div class="cb-head"><div><strong data-i18n="chat.title">' + T("chat.title") + '</strong><small data-i18n="chat.sub">' + T("chat.sub") + '</small></div>' +
      '<div class="cb-tools"><div class="lang cb-lang" role="group" data-i18n-attr="aria-label:chat.replyLang" aria-label="' + T("chat.replyLang") + '"><button type="button" data-l="en">EN</button><button type="button" data-l="hi" lang="hi">हिंदी</button></div>' +
      '<button type="button" class="cb-clear" data-i18n="chat.clear">' + T("chat.clear") + '</button><button type="button" class="cb-x" data-i18n-attr="aria-label:chat.close" aria-label="' + T("chat.close") + '">✕</button></div></div>' +
      '<div class="cb-log" aria-live="polite"></div>' +
      '<form class="cb-form"><textarea rows="1" data-i18n-attr="aria-label:chat.input" aria-label="' + T("chat.input") + '"></textarea><button type="submit" class="cb-send" data-i18n-attr="aria-label:chat.send" aria-label="' + T("chat.send") + '">➤</button></form>' +
      '<div class="cb-foot"><span data-i18n="chat.hint">' + T("chat.hint") + '</span><span class="cb-count"></span></div></section>';
    document.body.appendChild(w);
    el = { fab: w.querySelector(".cb-fab"), panel: w.querySelector(".cb-panel"), log: w.querySelector(".cb-log"), input: w.querySelector("textarea"),
      send: w.querySelector(".cb-send"), count: w.querySelector(".cb-count"), langBtns: [].slice.call(w.querySelectorAll(".cb-lang button")) };
    el.fab.onclick = function () { open(); };
    w.querySelector(".cb-x").onclick = function () { open(false); el.fab.focus(); };
    w.querySelector(".cb-clear").onclick = function () { hist = []; save(); render(); };
    el.langBtns.forEach(function (b) { b.onclick = function () { lang = b.dataset.l; localStorage.setItem(KEY_LANG, lang); render(); }; });
    w.querySelector("form").onsubmit = function (e) { e.preventDefault(); send(); };
    el.input.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); } });
    el.input.addEventListener("input", function () { autosize(); count(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !el.panel.hidden) open(false); });
    render();
  }

  // Open the chat with a prefilled (not sent) message. Used by "Ask doubt" on the test review.
  RRB.askDoubt = function (text) {
    if (!el.input) return;
    open(true);
    if (el.input.disabled) return;
    el.input.value = String(text).slice(0, MAX_INPUT); autosize(); count();
    el.input.focus(); el.input.setSelectionRange(el.input.value.length, el.input.value.length);
    el.input.scrollTop = 0; // show the question first; the caret stays at the end
  };

  document.addEventListener("DOMContentLoaded", build);
  // Panel labels follow the site language (data-i18n is re-applied by RRB.setLang); the reply language
  // follows too unless the student picked one inside the chat.
  document.addEventListener("rrb:lang", function () { if (!localStorage.getItem(KEY_LANG)) lang = RRB.lang(); if (el.log) render(); });
})();
