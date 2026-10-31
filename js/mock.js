(function () {
  function card(p) {
    return '<a class="card test-card" href="test.html?id=' + p.id + '"><div class="tc-top"><h3>' + RRB.esc(p.label) + "</h3>" +
      (p.mock ? '<span class="tag ok">Practice</span>' : '<span class="tag">Past paper</span>') + "</div>" +
      '<div class="tc-meta"><span>📝 ' + p.count + " questions</span><span>⏱ " + p.min + " min</span>" +
      (p.dropped ? '<span title="Figure/image questions left out">' + p.dropped + " omitted</span>" : "") + "</div>" +
      "<p>" + p.sections.join(" · ") + '</p><span class="more">Start test →</span></a>';
  }
  function render(x) {
    document.querySelectorAll(".switch button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.exam === x); });
    var list = RRB.INDEX.filter(function (p) { return p.exam === x; });
    document.getElementById("mocks").innerHTML = list.filter(function (p) { return p.mock; }).map(card).join("");
    document.getElementById("paperList").innerHTML = list.filter(function (p) { return !p.mock; }).map(card).join("");
    var a = JSON.parse(localStorage.getItem(RRB.ACTIVE) || "null"), r = document.getElementById("resume");
    var m = a && RRB.INDEX.filter(function (p) { return p.id === a.id; })[0];
    r.innerHTML = m ? '<a class="card resume" href="test.html?id=' + m.id + '"><strong>Resume unfinished test:</strong> ' + RRB.esc(m.label) + ' <span class="more">Continue →</span></a>' : "";
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".switch button").forEach(function (b) { b.onclick = function () { RRB.setExam(b.dataset.exam); render(b.dataset.exam); }; });
    render(RRB.getExam());
  });
})();
