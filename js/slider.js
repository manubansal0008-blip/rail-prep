// Home slider: 5 slides built only from real site content. Vanilla JS.
// Autoplay every 5 s, pauses on hover/focus, when the tab is hidden, or with the pause button;
// no autoplay or slide animation when the user prefers reduced motion. Swipe on touch screens.
(function () {
  var t = function (k, v) { return RRB.t(k, v); };
  var i = 0, timer = null, tick = null, paused = false, hold = false, N = 5;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  function row(exam, key) {
    var g = (RRB.DATES && RRB.DATES.groups || []).filter(function (x) { return x.exam === exam; })[0];
    return g && g.rows.filter(function (r) { return r.key === key; })[0];
  }
  function fmtD(iso) { return new Date(iso).toLocaleDateString(RRB.locale(), RRB.dtOpts({ day: "numeric", month: "short", year: "numeric" })); }
  function left() {
    var r = row("ntpc", "apply"), el = document.getElementById("slLeft");
    if (!r || !el) return;
    var ms = new Date(r.end) - Date.now();
    el.textContent = ms > 0 ? t("sl.1left", { d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24 }) : t("sl.1closed");
  }
  function slides() {
    var I = RRB.INDEX, ap = row("ntpc", "apply"), fee = row("ntpc", "fee");
    var tough = I.filter(function (p) { return p.tough; }).length, papers = I.filter(function (p) { return !p.mock; });
    var q = I.reduce(function (a, p) { return a + p.count; }, 0), notes = (RRB.NOTES_READY || []).length;
    var s = [];
    if (ap) s.push(["s1", "📅", t("sl.1tag"), t("sl.1h", { d: fmtD(ap.end) }), t("sl.1p", { f: fee ? fmtD(fee.end) : "" }) + '<span class="sl-live" id="slLeft" aria-live="off"></span>', "#datesH", t("sl.1btn")]);
    if (tough) s.push(["s2", "🔥", t("sl.2tag"), t("sl.2h", { n: tough }), t("sl.2p"), "mock.html", t("sl.2btn")]);
    s.push(["s3", "🎯", t("sl.3tag"), t("sl.3h", { q: q.toLocaleString(RRB.locale()) }), t("sl.3p"), "practice.html", t("sl.3btn")]);
    s.push(["s4", "🗂", t("sl.4tag"), t("sl.4h", { n: papers.length }), t("sl.4p"), "papers.html", t("sl.4btn")]);
    if (notes) s.push(["s5", "📘", t("sl.5tag"), t("sl.5h"), t("sl.5p", { n: notes }), "notes.html", t("sl.5btn")]);
    return s;
  }
  function render() {
    var root = document.getElementById("slider"); if (!root) return;
    var s = slides(); N = s.length; if (i >= N) i = 0;
    root.setAttribute("aria-label", t("sl.aria"));
    root.innerHTML = '<div class="sl-view"><div class="sl-track" id="slTrack">' + s.map(function (x, k) {
      return '<div class="sl-slide ' + x[0] + '" role="group" aria-roledescription="slide" aria-label="' + t("sl.of", { i: k + 1, n: N }) + '" id="sl' + k + '">' +
        '<div class="sl-ico" aria-hidden="true">' + x[1] + '</div><div class="sl-body"><span class="sl-tag">' + x[2] + "</span><h2>" + x[3] + "</h2><p>" + x[4] +
        '</p><a class="btn sl-btn" href="' + x[5] + '">' + x[6] + "</a></div></div>";
    }).join("") + '</div></div><div class="sl-ctl"><button type="button" class="sl-arrow" id="slPrev" aria-label="' + t("sl.prev") + '">‹</button>' +
      '<div class="sl-dots">' + s.map(function (x, k) { return '<button type="button" aria-label="' + t("sl.go", { i: k + 1 }) + '" aria-controls="sl' + k + '"></button>'; }).join("") +
      '</div><button type="button" class="sl-arrow" id="slNext" aria-label="' + t("sl.next") + '">›</button>' +
      (reduce ? "" : '<button type="button" class="sl-pp" id="slPP"></button>') + "</div>";
    document.getElementById("slPrev").onclick = function () { go(i - 1); };
    document.getElementById("slNext").onclick = function () { go(i + 1); };
    root.querySelectorAll(".sl-dots button").forEach(function (b, k) { b.onclick = function () { go(k); }; });
    var pp = document.getElementById("slPP");
    if (pp) pp.onclick = function () { paused = !paused; ppLabel(); auto(); };
    ppLabel(); go(i, true); left();
  }
  function ppLabel() { var pp = document.getElementById("slPP"); if (pp) { pp.textContent = paused ? "▶" : "❚❚"; pp.setAttribute("aria-label", t(paused ? "sl.play" : "sl.pause")); } }
  function go(k, quiet) {
    i = (k + N) % N;
    var tr = document.getElementById("slTrack"); if (!tr) return;
    tr.querySelectorAll(".sl-slide").forEach(function (el, n) {
      var on = n === i; el.classList.toggle("on", on); el.setAttribute("aria-hidden", !on);
      if ("inert" in el) el.inert = !on; else el.querySelectorAll("a").forEach(function (a) { a.tabIndex = on ? 0 : -1; });
    });
    document.querySelectorAll("#slider .sl-dots button").forEach(function (b, n) { b.setAttribute("aria-current", n === i ? "true" : "false"); });
    if (!quiet) auto();
  }
  function auto() {
    clearInterval(timer); timer = null;
    if (reduce || paused || hold || document.hidden || N < 2) return;
    timer = setInterval(function () { go(i + 1, true); }, 5000);
  }
  document.addEventListener("DOMContentLoaded", function () {
    var root = document.getElementById("slider"); if (!root) return;
    if (reduce) root.classList.add("still");
    root.addEventListener("mouseenter", function () { hold = true; auto(); });
    root.addEventListener("mouseleave", function () { hold = root.contains(document.activeElement); auto(); });
    root.addEventListener("focusin", function () { hold = true; auto(); });
    root.addEventListener("focusout", function (e) { if (!root.contains(e.relatedTarget)) { hold = root.matches(":hover"); auto(); } });
    root.addEventListener("keydown", function (e) { if (e.key === "ArrowLeft") go(i - 1); else if (e.key === "ArrowRight") go(i + 1); });
    var x0 = null, y0 = 0;
    root.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; hold = true; auto(); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      if (x0 !== null) { var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? i + 1 : i - 1, true); }
      x0 = null; hold = false; auto();
    });
    document.addEventListener("visibilitychange", auto);
    render(); auto();
    tick = setInterval(left, 30000);
  });
  document.addEventListener("rrb:lang", render);
})();
