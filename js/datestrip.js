// Home "Important dates" strip from data/dates.js. A row shows Open now (N days left) / In N days / Closed by comparing with the clock,
// so past dates close by themselves. Tentative rows get a tentative tag.
(function () {
  var t = function (k, v) { return RRB.t(k, v); };
  function d(iso) { return new Date(iso).toLocaleDateString(RRB.locale(), RRB.dtOpts({ day: "numeric", month: "short", year: "numeric" })); }
  function dayDiff(iso) { // whole IST calendar days from today to iso
    var f = function (x) { return Date.parse(new Date(x).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })); };
    return Math.round((f(iso) - f(Date.now())) / 864e5);
  }
  RRB.dateState = function (r, now) {
    now = now || Date.now();
    if (!r.end) return "tentative";
    if (new Date(r.end) < now) return "closed";
    if (r.start && new Date(r.start) > now) return "upcoming";
    return "open"; // window started, or a single deadline that has not passed yet
  };
  function render() {
    var root = document.getElementById("dates"); if (!root || !RRB.DATES) return;
    var hi = RRB.lang() === "hi";
    root.innerHTML = RRB.DATES.groups.map(function (g) {
      return '<div class="card dt-card"><h3>' + RRB.esc(hi ? g.hi : g.en) + ' <span class="muted dt-cen">' + g.cen + "</span></h3><ul class=\"dt-list\">" + g.rows.map(function (r) {
        var st = RRB.dateState(r), when, tag;
        if (!r.end) when = RRB.esc(hi ? r.noteHi : r.noteEn);
        else if (r.start) when = d(r.start) + " – " + d(r.end);
        else when = d(r.end);
        if (st === "closed") tag = '<span class="tag dt-closed">' + t("dt.closed") + "</span>";
        else if (st === "open") { var n = dayDiff(r.end); tag = '<span class="tag ok">' + t("dt.open") + '</span> <span class="dt-left">' + (n > 0 ? t("dt.left", { n: n }) : t("dt.today")) + "</span>"; }
        else if (st === "upcoming") { var m = dayDiff(r.start || r.end); tag = '<span class="tag">' + (m > 0 ? t("dt.soonIn", { n: m }) : t("dt.today")) + "</span>"; }
        else tag = "";
        if (r.status === "tentative") tag += ' <span class="tag warn">' + t("dt.tentative") + "</span>";
        return '<li class="dt-row ' + st + '" title="' + RRB.esc(t("dt.src", { s: hi && r.srcHi ? r.srcHi : r.src })) + '"><span class="dt-what">' + RRB.esc(hi ? r.hi : r.en) + '</span><span class="dt-when">' + when + '</span><span class="dt-tags">' + tag + "</span></li>";
      }).join("") + "</ul></div>";
    }).join("") + '<p class="muted dt-note">' + t("dt.note", { d: d(RRB.DATES.checked + "T12:00:00+05:30") }) + "</p>";
  }
  document.addEventListener("DOMContentLoaded", function () { render(); setInterval(render, 60000); });
  document.addEventListener("rrb:lang", render);
})();
