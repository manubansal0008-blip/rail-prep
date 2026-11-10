// Home dashboard: exam switcher, countdowns, quick facts, feature cards. Re-renders on language change.
(function () {
  var timers = [], t = function (k, v) { return RRB.t(k, v); };
  function pad(n) { return String(n).padStart(2, "0"); }
  function fmtIST(iso) {
    return new Date(iso).toLocaleString(RRB.locale(), RRB.dtOpts({ day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })) + " IST";
  }
  function countdown(el, iso) {
    function tick() {
      var ms = new Date(iso) - Date.now();
      if (ms <= 0) { el.innerHTML = '<div class="cd-none">' + t("cd.passed") + "</div>"; return false; }
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      el.innerHTML = '<div class="cd" role="timer"><div><b>' + d + "</b><span>" + t("cd.days") + "</span></div><div><b>" + pad(h) + "</b><span>" + t("cd.hrs") + "</span></div><div><b>" +
        pad(m) + "</b><span>" + t("cd.min") + "</span></div><div><b>" + pad(s) + "</b><span>" + t("cd.sec") + "</span></div></div>";
      return true;
    }
    if (tick()) timers.push(setInterval(tick, 1000));
  }
  function progLine() {
    var at; try { at = JSON.parse(localStorage.getItem(RRB.ATTEMPTS) || "[]"); } catch (e) { at = []; }
    at = (Array.isArray(at) ? at : []).filter(function (a) { return a && isFinite(a.score) && a.total; });
    if (!at.length) return t("card.progressP");
    var b = Math.max.apply(null, at.map(function (a) { return a.score / a.total * 100; }));
    return t("card.progressN", { n: at.length, b: Math.round(b * 10) / 10 + "%" });
  }
  function render(x) {
    timers.forEach(clearInterval); timers = [];
    var E0 = RRB.EXAMS[x], H = RRB.lang() === "hi" && E0.hi ? E0.hi : null, E = H || E0;
    var idx = RRB.INDEX.filter(function (p) { return p.exam === x; });
    var papers = idx.filter(function (p) { return !p.mock; }), mocks = idx.filter(function (p) { return p.mock; });
    var qn = papers.reduce(function (a, p) { return a + p.count; }, 0);
    var mq = mocks.reduce(function (a, p) { return a + p.count; }, 0);
    document.querySelectorAll(".switch button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.exam === x); var X = RRB.EXAMS[b.dataset.exam]; b.textContent = RRB.lang() === "hi" && X.hi ? X.hi.short : X.short; });
    document.getElementById("examName").textContent = E.name;
    var tag = document.getElementById("examTag"); tag.textContent = E.cen + " · " + E.tagline;
    if (E0.url) { var a = document.createElement("a"); a.className = "ex-off"; a.href = E0.url; a.target = "_blank"; a.rel = "noopener"; a.title = t("dt.offT"); a.textContent = t(x === "ntpc" ? "dt.offNotice" : "dt.offNotices") + " ↗"; tag.append(" · ", a); }

    var cds = document.getElementById("countdowns");
    cds.innerHTML = "";
    E0.events.forEach(function (ev, i) {
      var hv = H && H.events[i] || ev, c = document.createElement("div");
      c.className = "card fade";
      c.innerHTML = '<span class="cd-label">' + hv.label + "</span>" +
        (ev.tentative ? '<span class="tag warn">' + t("tag.tentative") + "</span>" : '<span class="tag ok">' + t("tag.official") + "</span>") +
        '<div class="slot"></div>' + (ev.at && !ev.tentative ? "<p>" + t("home.target", { d: fmtIST(ev.at) }) + hv.note + "</p>" : "");
      cds.append(c);
      var slot = c.querySelector(".slot");
      if (ev.at && !ev.tentative) countdown(slot, ev.at); else slot.innerHTML = '<div class="cd-none">' + hv.note + "</div>"; // no countdown to a date that is not announced
    });

    document.getElementById("facts").innerHTML = E.facts.map(function (f) {
      return "<div><small>" + f[0] + "</small><strong>" + f[1] + "</strong></div>";
    }).join("");

    var book = RRB.BOOKS && RRB.BOOKS[x];
    var cardsEl = document.getElementById("cards");
    cardsEl.innerHTML = [
      book ? [book.url, "📕", t("card.book"), t(book.p || "card.bookP", { p: book.pages, mb: book.mb }), t("card.bookBtn")] : null,
      ["papers.html", "🗂", t("card.papers"), t("card.papersP", { x: E.short, n: papers.length, q: qn.toLocaleString(RRB.locale()) })],
      ["mock.html", "⏱", t("card.mocks"), t("card.mocksP", { x: E.short, n: mocks.length, q: mq.toLocaleString(RRB.locale()) })],
      ["practice.html", "🎯", t("card.practice"), t("card.practiceP", { s: RRB.qScope() })],
      ["progress.html", "📈", t("card.progress"), progLine()],
      (RRB.NOTES_READY || []).length ? ["notes.html", "📘", t("card.notes"), t("card.notesP", { n: RRB.NOTES_READY.length })] : [null, "📘", t("card.notes"), t("card.notesP", { n: 0 })]
    ].filter(Boolean).map(function (c) {
      if (c[4]) return '<a class="card fade book-card" href="' + c[0] + '" target="_blank" rel="noopener" download><div class="ico" aria-hidden="true">' + c[1] + "</div><h3>" + c[2] +
        '</h3><p>' + c[3] + '</p><span class="more">' + c[4] + "</span></a>";
      if (!c[0]) return '<div class="card fade soon" aria-disabled="true"><div class="ico" aria-hidden="true">' + c[1] + "</div><h3>" + c[2] +
        ' <span class="tag warn">' + t("tag.soon") + '</span></h3><p>' + c[3] + '</p><span class="more muted">' + t("card.na") + "</span></div>";
      return '<a class="card fade" href="' + c[0] + '"><div class="ico" aria-hidden="true">' + c[1] + "</div><h3>" + c[2] +
        '</h3><p>' + c[3] + '</p><span class="more">' + t("card.open") + "</span></a>";
    }).join("");
    cardsEl.classList.toggle("cards6", cardsEl.children.length === 6); cardsEl.classList.toggle("cards5", cardsEl.children.length === 5);
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".switch button").forEach(function (b) {
      b.onclick = function () { RRB.setExam(b.dataset.exam); render(b.dataset.exam); };
    });
    var q = new URLSearchParams(location.search).get("exam");
    if (q && RRB.EXAMS[q]) RRB.setExam(q);
    render(RRB.getExam());
  });
  document.addEventListener("rrb:lang", function () { render(RRB.getExam()); });
})();
