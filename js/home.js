// Home dashboard: exam switcher, countdowns, quick facts, feature cards.
(function () {
  var timers = [];
  function pad(n) { return String(n).padStart(2, "0"); }
  function fmtIST(iso) {
    return new Date(iso).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) + " IST";
  }
  function countdown(el, iso) {
    function tick() {
      var ms = new Date(iso) - Date.now();
      if (ms <= 0) { el.innerHTML = '<div class="cd-none">This date has passed.</div>'; return false; }
      var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
      el.innerHTML = '<div class="cd" role="timer"><div><b>' + d + "</b><span>days</span></div><div><b>" + pad(h) + "</b><span>hrs</span></div><div><b>" +
        pad(m) + "</b><span>min</span></div><div><b>" + pad(s) + "</b><span>sec</span></div></div>";
      return true;
    }
    if (tick()) timers.push(setInterval(tick, 1000));
  }
  function render(x) {
    timers.forEach(clearInterval); timers = [];
    var E = RRB.EXAMS[x], idx = RRB.INDEX.filter(function (p) { return p.exam === x; });
    var papers = idx.filter(function (p) { return !p.mock; }), mocks = idx.filter(function (p) { return p.mock; });
    var qn = papers.reduce(function (a, p) { return a + p.count; }, 0);
    document.querySelectorAll(".switch button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.exam === x); });
    document.getElementById("examName").textContent = E.name;
    document.getElementById("examTag").textContent = E.cen + " · " + E.tagline;

    var cds = document.getElementById("countdowns");
    cds.innerHTML = "";
    E.events.forEach(function (ev) {
      var c = document.createElement("div");
      c.className = "card fade";
      c.innerHTML = '<span class="cd-label">' + ev.label + "</span>" +
        (ev.tentative ? '<span class="tag warn">Tentative</span>' : '<span class="tag ok">Official</span>') +
        '<div class="slot"></div><p>' + (ev.at ? "Target: " + fmtIST(ev.at) + ". " : "") + ev.note + "</p>";
      cds.append(c);
      var slot = c.querySelector(".slot");
      if (ev.at) countdown(slot, ev.at); else slot.innerHTML = '<div class="cd-none">No countdown yet: date not announced.</div>';
    });

    document.getElementById("facts").innerHTML = E.facts.map(function (f) {
      return "<div><small>" + f[0] + "</small><strong>" + f[1] + "</strong></div>";
    }).join("");

    document.getElementById("cards").innerHTML = [
      [null, "📘", "Notes", "Topic-wise revision notes for " + E.short + " are being prepared. Until then, practise with the past papers and mocks."],
      ["mock.html#papers", "🗂", "Past Papers", papers.length + " real papers · " + qn + " questions with RRB answer keys."],
      ["mock.html", "⏱", "Mock Tests", mocks.length + " timed practice set (" + (mocks[0] ? mocks[0].count : 0) + " Q) plus every past paper in CBT mode."]
    ].map(function (c) {
      if (!c[0]) return '<div class="card fade soon" aria-disabled="true"><div class="ico" aria-hidden="true">' + c[1] + "</div><h3>" + c[2] +
        ' <span class="tag warn">Coming soon</span></h3><p>' + c[3] + '</p><span class="more muted">Not available yet</span></div>';
      return '<a class="card fade" href="' + c[0] + '"><div class="ico" aria-hidden="true">' + c[1] + "</div><h3>" + c[2] +
        '</h3><p>' + c[3] + '</p><span class="more">Open →</span></a>';
    }).join("");
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".switch button").forEach(function (b) {
      b.onclick = function () { RRB.setExam(b.dataset.exam); render(b.dataset.exam); };
    });
    var q = new URLSearchParams(location.search).get("exam");
    if (q && RRB.EXAMS[q]) RRB.setExam(q);
    render(RRB.getExam());
  });
})();
