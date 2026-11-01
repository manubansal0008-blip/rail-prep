// Doubt chat: floating "Ask a doubt" button + panel. Talks to the Cloudflare Worker at RRB.CHAT_URL (see chat-worker/README).
// The conversation lives in sessionStorage (gone when the tab closes). Replies are HTML-escaped first, then a small
// markdown subset (bold, italic, code, lists, line breaks) is applied, so model text can never inject HTML.
window.RRB = window.RRB || {};

// The one setting: the Worker URL. While it still contains REPLACE, the chat stays switched off (no button).
RRB.CHAT_URL = "https://rail-prep-chat.manubansal0008.workers.dev/chat";

(function () {
  var KEY = "rrb.chat", KEY_LANG = "rrb.chatLang", MAX_INPUT = 800, MAX_TURNS = 8, MAX_STORE = 40;
  var hist = [], lang, busy = false, el = {};
  function url() { return String(RRB.CHAT_URL || "").trim(); }
  function on() { var u = url(); return !!u && u.indexOf("REPLACE") < 0; }
  var ss = { get: function (k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} } };
  var ls = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  try { hist = JSON.parse(ss.get(KEY) || "[]").filter(function (h) { return h && typeof h.text === "string"; }).slice(-MAX_STORE); } catch (e) { hist = []; }
  function siteLang() { return RRB.lang ? RRB.lang() : "en"; }
  lang = ls.get(KEY_LANG) || siteLang();
  var T = function (k, v) { return RRB.t ? RRB.t(k, v) : k; };
  function esc(t) { return String(t).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  // Safe markdown on already-escaped text.
  function inline(t) {
    return t.replace(/`([^`\n]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*\n]+)\*\*/g, "<strong>$1</strong>")
      .replace(/__([^_\n]+)__/g, "<strong>$1</strong>")
      .replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
  }
  // Models sometimes write LaTeX ($48 \div 36$); turn the common bits into plain symbols.
  function deTex(t) {
    return String(t).replace(/\$\$?([^$\n]{1,200})\$\$?/g, function (m, x) { return /[\\^=_{}×÷+*\/-]/.test(x) ? x : m; })
      .replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, function (m, a, b) { var w = function (x) { return /^[\w.]+$/.test(x) ? x : "(" + x + ")"; }; return w(a) + "/" + w(b); }).replace(/\\sqrt\{([^{}]*)\}/g, "√($1)")
      .replace(/\\times/g, "×").replace(/\\div/g, "÷").replace(/\\cdot/g, "·").replace(/\\pi/g, "π").replace(/\\(le|leq)\b/g, "≤")
      .replace(/\\(ge|geq)\b/g, "≥").replace(/\\(ne|neq)\b/g, "≠").replace(/\\approx/g, "≈").replace(/\\%/g, "%")
      .replace(/\\text\{([^{}]*)\}/g, "$1").replace(/\^\{?2\}?/g, "²").replace(/\^\{?3\}?/g, "³").replace(/\\[,;! ]/g, " ");
  }
  function md(src) {
    var lines = esc(deTex(src)).split(/\r?\n/), out = [], para = [], stack = []; // stack of open lists {t, ind}
    function flushP() { if (para.length) { out.push("<p>" + para.map(inline).join("<br>") + "</p>"); para = []; } }
    function closeTo(n) { while (stack.length > n) { out.push("</li></" + stack.pop().t + ">"); } }
    lines.forEach(function (ln) {
      var m = ln.match(/^(\s*)([-*•+]|\d{1,3}[.)])\s+(.*)$/);
      if (m) {
        flushP();
        var ind = m[1].replace(/\t/g, "    ").length, t = /\d/.test(m[2]) ? "ol" : "ul";
        while (stack.length && ind < stack[stack.length - 1].ind) closeTo(stack.length - 1);
        var top = stack[stack.length - 1];
        if (top && ind > top.ind) { stack.push({ t: t, ind: ind }); out.push("<" + t + ">"); }
        else if (top && top.t === t) out.push("</li>");
        else { if (top) closeTo(stack.length - 1); stack.push({ t: t, ind: ind });
          out.push("<" + t + (t === "ol" && parseInt(m[2], 10) > 1 ? ' start="' + parseInt(m[2], 10) + '"' : "") + ">"); }
        out.push("<li>" + inline(m[3])); return;
      }
      var h = ln.match(/^\s*#{1,6}\s+(.*)$/);
      if (h) { flushP(); closeTo(0); out.push("<p><strong>" + inline(h[1]) + "</strong></p>"); return; }
      if (!ln.trim()) { flushP(); return; }
      if (stack.length && /^\s+/.test(ln)) { out.push("<br>" + inline(ln.trim())); return; } // continuation of a list item
      closeTo(0); para.push(ln);
    });
    flushP(); closeTo(0);
    return out.join("");
  }
  RRB.chatMarkdown = md;

  function save() { ss.set(KEY, JSON.stringify(hist.slice(-MAX_STORE))); }
  function plain(t) { return "<p>" + esc(t).replace(/\n/g, "<br>") + "</p>"; }
  function bubble(role, html, cls) {
    var d = document.createElement("div");
    d.className = "cb-msg " + (role === "user" ? "me" : "bot") + (cls ? " " + cls : "");
    if (role === "user" || role === "model") d.setAttribute("lang", lang === "hi" ? "hi" : "en");
    d.innerHTML = html; el.log.appendChild(d); el.log.scrollTop = el.log.scrollHeight; return d;
  }
  function render() {
    el.log.innerHTML = "";
    if (!hist.length) bubble("bot", "<p>" + T("chat.hello") + "</p>", "note");
    hist.forEach(function (h) { bubble(h.role, h.role === "user" ? plain(h.text) : md(h.text)); });
    el.send.disabled = busy;
    el.input.placeholder = T("chat.ph");
    el.langBtns.forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === lang); });
    count();
  }
  function count() { var n = el.input.value.length; el.count.textContent = n + "/" + MAX_INPUT; el.count.classList.toggle("over", n > MAX_INPUT); }
  var lastFocus = null;
  function open(v) {
    var o = v == null ? el.panel.hidden : v;
    if (o && el.panel.hidden) lastFocus = document.activeElement;
    el.panel.hidden = !o; el.fab.setAttribute("aria-expanded", o);
    document.documentElement.classList.toggle("chat-open", o);
    if (o) { el.log.scrollTop = el.log.scrollHeight; el.input.focus(); }
    else if (lastFocus && lastFocus.focus && document.contains(lastFocus)) lastFocus.focus();
  }
  function send() {
    var text = el.input.value.trim();
    if (busy || !text) return;
    if (text.length > MAX_INPUT) { bubble("bot", "<p>" + esc(T("chat.long", { n: MAX_INPUT })) + "</p>", "err"); return; }
    hist.push({ role: "user", text: text }); save();
    el.input.value = ""; autosize(); count();
    bubble("user", plain(text));
    busy = true; el.send.disabled = true; el.log.setAttribute("aria-busy", "true");
    var typing = bubble("bot", '<span class="cb-dots" role="status" aria-label="' + esc(T("chat.typing")) + '"><i></i><i></i><i></i></span>', "typing");
    var done = function (reply, err) {
      busy = false; typing.remove(); el.send.disabled = false; el.log.removeAttribute("aria-busy");
      if (reply) { hist.push({ role: "model", text: reply }); save(); bubble("model", md(reply)); }
      else {
        // Drop the unanswered question from the history (so it is not sent twice) and give the text back to retry.
        if (hist.length && hist[hist.length - 1].role === "user" && hist[hist.length - 1].text === text) { hist.pop(); save(); }
        if (!el.input.value) { el.input.value = text; autosize(); count(); }
        bubble("bot", "<p>" + esc(err) + "</p>", "err");
      }
    };
    var msgs = hist.slice(-MAX_TURNS).map(function (h) { return { role: h.role === "model" ? "model" : "user", text: h.text }; });
    var ctl = "AbortController" in window ? new AbortController() : null, timer = setTimeout(function () { ctl && ctl.abort(); }, 60000);
    fetch(url(), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: msgs, lang: lang }), signal: ctl && ctl.signal })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
      .then(function (x) { clearTimeout(timer); if (x.ok && x.j.reply) done(String(x.j.reply)); else done(null, x.j.error || T("chat.fail")); })
      .catch(function () { clearTimeout(timer); done(null, T("chat.net")); });
  }
  function autosize() { el.input.style.height = "auto"; el.input.style.height = Math.min(el.input.scrollHeight, 140) + "px"; }

  function build() {
    if (!on() || document.querySelector(".cb")) return;
    document.documentElement.classList.add("chat-on");
    var w = document.createElement("div");
    w.className = "cb";
    // test.html: no floating button (the live CBT has no chat); the panel opens only from "Ask doubt" in the result review.
    if (/(^|\/)test\.html$/.test(location.pathname)) w.classList.add("cb-nofab");
    w.innerHTML =
      '<button class="cb-fab" type="button" aria-expanded="false" aria-controls="cbPanel"><span aria-hidden="true">💬</span><b data-i18n="chat.fab">' + T("chat.fab") + '</b></button>' +
      '<section class="cb-panel" id="cbPanel" role="dialog" aria-labelledby="cbTitle" hidden>' +
      '<div class="cb-head"><strong id="cbTitle" data-i18n="chat.title">' + T("chat.title") + '</strong>' +
      '<div class="cb-tools"><div class="cb-lang" role="group" data-i18n-attr="aria-label:chat.replyLang" aria-label="' + T("chat.replyLang") + '"><button type="button" data-l="en">EN</button><button type="button" data-l="hi" lang="hi">हिंदी</button></div>' +
      '<button type="button" class="cb-clear" data-i18n="chat.clear">' + T("chat.clear") + '</button><button type="button" class="cb-x" data-i18n-attr="aria-label:chat.close" aria-label="' + T("chat.close") + '"><span aria-hidden="true">✕</span></button></div></div>' +
      '<div class="cb-log" role="log" aria-live="polite"></div>' +
      '<p class="cb-note" data-i18n="chat.note">' + T("chat.note") + '</p>' +
      '<form class="cb-form"><textarea rows="1" maxlength="' + (MAX_INPUT + 200) + '" data-i18n-attr="aria-label:chat.input" aria-label="' + T("chat.input") + '"></textarea><button type="submit" class="cb-send" data-i18n-attr="aria-label:chat.send" aria-label="' + T("chat.send") + '"><span aria-hidden="true">➤</span></button></form>' +
      '<div class="cb-foot"><span data-i18n="chat.hint">' + T("chat.hint") + '</span><span class="cb-count" aria-hidden="true"></span></div></section>';
    document.body.appendChild(w);
    el = { fab: w.querySelector(".cb-fab"), panel: w.querySelector(".cb-panel"), log: w.querySelector(".cb-log"), input: w.querySelector("textarea"),
      send: w.querySelector(".cb-send"), count: w.querySelector(".cb-count"), langBtns: [].slice.call(w.querySelectorAll(".cb-lang button")) };
    el.fab.onclick = function () { open(); };
    w.querySelector(".cb-x").onclick = function () { open(false); };
    w.querySelector(".cb-clear").onclick = function () { if (busy) return; hist = []; save(); render(); el.input.focus(); };
    el.langBtns.forEach(function (b) { b.onclick = function () { lang = b.dataset.l; ls.set(KEY_LANG, lang); render(); }; });
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
    el.input.value = String(text).slice(0, MAX_INPUT); autosize(); count();
    el.input.focus(); el.input.setSelectionRange(el.input.value.length, el.input.value.length);
    el.input.scrollTop = 0;
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
  // Labels follow the site language (data-i18n is re-applied by RRB.setLang); the reply language follows too
  // unless the student picked one inside the chat.
  document.addEventListener("rrb:lang", function () { if (!ls.get(KEY_LANG)) lang = siteLang(); if (el.log) render(); });
})();
