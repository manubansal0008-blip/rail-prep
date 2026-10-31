(function () {
  var t = function (k, v) { return RRB.t(k, v); };
  function card(p) {
    return '<a class="card test-card" href="test.html?id=' + p.id + '"><div class="tc-top"><h3>' + RRB.esc(RRB.tLabel(p.label)) + "</h3>" +
      (p.mock ? '<span class="tag ok">' + t("mock.tagPractice") + "</span>" : '<span class="tag">' + t("mock.tagPaper") + "</span>") + "</div>" +
      '<div class="tc-meta"><span>📝 ' + t("mock.qs", { n: p.count }) + "</span><span>⏱ " + t("mock.min", { n: p.min }) + "</span>" +
      (p.dropped ? '<span title="' + t("mock.omittedT") + '">' + t("mock.omitted", { n: p.dropped }) + "</span>" : "") + "</div>" +
      "<p>" + p.sections.map(function (s) { return RRB.esc(RRB.tSec(s)); }).join(" · ") + '</p><span class="more">' + t("mock.start") + "</span></a>";
  }
  function render(x) {
    document.querySelectorAll(".switch button").forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.exam === x);
      b.textContent = RRB.t(b.dataset.exam === "gd" ? "prog.gd" : "prog.ntpc");
    });
    var list = RRB.INDEX.filter(function (p) { return p.exam === x; });
    document.getElementById("mocks").innerHTML = list.filter(function (p) { return p.mock; }).map(card).join("");
    document.getElementById("paperList").innerHTML = list.filter(function (p) { return !p.mock; }).map(card).join("");
    var a = JSON.parse(localStorage.getItem(RRB.ACTIVE) || "null"), r = document.getElementById("resume");
    var m = a && RRB.INDEX.filter(function (p) { return p.id === a.id; })[0];
    r.innerHTML = m ? '<a class="card resume" href="test.html?id=' + m.id + '"><strong>' + t("mock.resume") + "</strong> " + RRB.esc(RRB.tLabel(m.label)) + ' <span class="more">' + t("mock.continue") + "</span></a>" : "";
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".switch button").forEach(function (b) { b.onclick = function () { RRB.setExam(b.dataset.exam); render(b.dataset.exam); }; });
    render(RRB.getExam());
  });
  document.addEventListener("rrb:lang", function () { render(RRB.getExam()); });
})();
