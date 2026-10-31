// Test lists. mock.html (<main data-kind="mock">) shows only our own practice sets and tough mocks;
// papers.html (<main data-kind="paper">) shows only the real RRB past papers. Both are grouped by exam,
// with an exam filter (Both / NTPC UG / Group D). The filter always starts at "Both" so no exam is hidden by an old choice.
(function () {
  var t = function (k, v) { return RRB.t(k, v); }, F = "all";
  function kind() { var m = document.querySelector("main[data-kind]"); return m ? m.getAttribute("data-kind") : "mock"; }
  function card(p) {
    return '<a class="card test-card" href="test.html?id=' + p.id + '"><div class="tc-top"><h3>' + RRB.esc(RRB.tLabel(p.label)) + "</h3>" +
      (p.tough ? '<span class="tag tough" title="' + t("mock.toughT") + '">🔥 ' + t("mock.tagTough") + "</span>" : p.mock ? '<span class="tag ok">' + t("mock.tagPractice") + "</span>" : '<span class="tag">' + t("mock.tagPaper") + "</span>") + "</div>" +
      '<div class="tc-meta"><span>📝 ' + t("mock.qs", { n: p.count }) + "</span><span>⏱ " + t("mock.min", { n: p.min }) + "</span>" +
      (p.dropped ? '<span title="' + t("mock.omittedT") + '">' + t("mock.omitted", { n: p.dropped }) + "</span>" : "") + "</div>" +
      "<p>" + p.sections.map(function (s) { return RRB.esc(RRB.tSec(s)); }).join(" · ") + '</p><span class="more">' + t("mock.start") + "</span></a>";
  }
  function cur() { return F; }
  function render() {
    var k = kind(), f = cur(), mock = k === "mock";
    document.querySelectorAll("#examFilter button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.v === f);
      b.textContent = t(b.dataset.v === "all" ? "mock.all" : "prog." + b.dataset.v);
    });
    var html = ["ntpc", "gd"].filter(function (x) { return f === "all" || f === x; }).map(function (x) {
      var list = RRB.INDEX.filter(function (p) { return p.exam === x && !!p.mock === mock; });
      if (mock) list.sort(function (a, b) { return (a.tough ? 1 : 0) - (b.tough ? 1 : 0); });
      return '<section class="exam-group" data-exam="' + x + '"><h2 class="sec">' + t("prog." + x) + ' <span class="muted cnt">(' + list.length + ")</span></h2>" +
        (list.length ? '<div class="grid cols-2">' + list.map(card).join("") + "</div>" : '<p class="muted">' + t("mock.none") + "</p>") + "</section>";
    }).join("");
    document.getElementById("lists").innerHTML = html;
    var a = null; try { a = JSON.parse(localStorage.getItem(RRB.ACTIVE) || "null"); } catch (e) {}
    var r = document.getElementById("resume"), m = a && RRB.INDEX.filter(function (p) { return p.id === a.id; })[0];
    r.innerHTML = m ? '<a class="card resume" href="test.html?id=' + m.id + '"><strong>' + t("mock.resume") + "</strong> " + RRB.esc(RRB.tLabel(m.label)) + ' <span class="more">' + t("mock.continue") + "</span></a>" : "";
  }
  document.addEventListener("DOMContentLoaded", function () {
    if (location.hash === "#papers" && kind() === "mock") { location.replace("papers.html"); return; }
    document.querySelectorAll("#examFilter button").forEach(function (b) {
      b.onclick = function () { F = b.dataset.v; render(); };
    });
    render();
  });
  window.addEventListener("hashchange", function () { if (location.hash === "#papers" && kind() === "mock") location.replace("papers.html"); });
  document.addEventListener("rrb:lang", render);
})();
