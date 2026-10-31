// Progress page: everything is computed from submitted attempts in localStorage (RRB.ATTEMPTS).
// Older attempts may lack st / notVisited / sections / exam / timeTaken; each stat skips what it can't use.
(function () {
  var T = function (k, v) { return RRB.t(k, v); }, E = RRB.esc;
  var F = { exam: "all", type: "all" }, showAll = false, chartW = 0;
  var SUBJ = ["maths", "reasoning", "ga", "science"];
  function subjOf(s) {
    s = String(s || "");
    if (/reason/i.test(s)) return "reasoning";
    if (/math/i.test(s)) return "maths";
    if (/science/i.test(s)) return "science";
    if (/aware|^GA$/i.test(s)) return "ga";
    return null;
  }
  function meta(id) { return (RRB.INDEX || []).filter(function (p) { return p.id === id; })[0]; }
  function load() {
    var raw; try { raw = JSON.parse(localStorage.getItem(RRB.ATTEMPTS) || "[]"); } catch (e) { raw = []; }
    if (!Array.isArray(raw)) raw = [];
    return raw.filter(function (a) { return a && typeof a === "object" && isFinite(a.score); }).map(function (a) {
      var m = meta(a.id), total = +a.total || (m && m.count) || (a.ans && a.ans.length) || 100;
      var exam = a.exam || (m && m.exam) || (/ntpc/i.test(a.id || "") ? "ntpc" : /gd/i.test(a.id || "") ? "gd" : "");
      var mock = m ? !!m.mock : /^mock/i.test(a.id || "");
      var c = +a.correct || 0, w = +a.wrong || 0;
      return { a: a, m: m, ts: +a.ts || 0, exam: exam, mock: mock, total: total, c: c, w: w,
        pct: Math.round(a.score / total * 1000) / 10, acc: c + w ? Math.round(c / (c + w) * 100) : null, time: isFinite(a.timeTaken) ? +a.timeTaken : null };
    }).sort(function (x, y) { return x.ts - y.ts; });
  }
  function fmtDur(sec) {
    var h = Math.floor(sec / 3600), m = Math.round(sec / 60) % 60;
    if (h >= 1 && Math.round(sec / 60) % 60 === 0 && sec % 3600 >= 3570) { h++; m = 0; }
    return h ? T("prog.hm", { h: h, m: m }) : sec < 60 && sec > 0 ? T("prog.s", { s: Math.round(sec) }) : T("prog.m", { m: Math.round(sec / 60) });
  }
  function fmtDate(ts) { return new Date(ts).toLocaleString(RRB.locale(), RRB.dtOpts({ day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })); }
  function pct(v) { return (Math.round(v * 10) / 10) + "%"; }
  function btns(key, opts) {
    return '<div class="filters" role="group" aria-label="' + T("prog.f." + key) + '">' + opts.map(function (o) {
      return '<button type="button" data-k="' + key + '" data-v="' + o[0] + '" aria-pressed="' + (F[key] === o[0]) + '">' + T(o[1]) + "</button>";
    }).join("") + "</div>";
  }

  function chart(list) {
    var el = document.getElementById("chart"); if (!el) return;
    var W = Math.max(280, el.clientWidth || 600), H = W < 500 ? 200 : 240, L = 38, R = 12, Tp = 12, B = 28;
    var vals = list.map(function (x) { return x.pct; }), lo = Math.min(0, Math.floor(Math.min.apply(null, vals) / 25) * 25), hi = 100;
    var X = function (i) { return list.length === 1 ? L + (W - L - R) / 2 : L + i * (W - L - R) / (list.length - 1); };
    var Y = function (v) { return Tp + (hi - v) * (H - Tp - B) / (hi - lo); };
    var s = '<svg viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="' + E(T("prog.chartAria", { n: list.length })) + '">';
    for (var g = lo; g <= hi; g += 25) s += '<line class="' + (g === 0 && lo < 0 ? "zero" : "gl") + '" x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(g) + '" y2="' + Y(g) + '"/><text class="ax" x="' + (L - 6) + '" y="' + (Y(g) + 4) + '" text-anchor="end">' + g + "%</text>";
    var step = Math.ceil(list.length / Math.max(2, Math.floor((W - L - R) / 34)));
    list.forEach(function (x, i) { if (i % step === 0 || i === list.length - 1) s += '<text class="ax" x="' + X(i) + '" y="' + (H - 8) + '" text-anchor="middle">' + (i + 1) + "</text>"; });
    if (list.length > 1) {
      var pts = list.map(function (x, i) { return X(i).toFixed(1) + "," + Y(x.pct).toFixed(1); });
      s += '<polygon class="ar" points="' + X(0).toFixed(1) + "," + Y(Math.max(lo, 0)) + " " + pts.join(" ") + " " + X(list.length - 1).toFixed(1) + "," + Y(Math.max(lo, 0)) + '"/>';
      s += '<polyline class="ln" points="' + pts.join(" ") + '"/>';
    }
    list.forEach(function (x, i) {
      s += '<circle class="pt ' + (x.mock ? "m" : "p") + '" cx="' + X(i).toFixed(1) + '" cy="' + Y(x.pct).toFixed(1) + '" r="5.5"><title>' +
        E("#" + (i + 1) + " · " + RRB.tLabel(x.a.label || x.a.id || "") + " · " + fmtDate(x.ts) + " · " + T("prog.scoreOf", { s: x.a.score, n: x.total }) + " (" + pct(x.pct) + ")") + "</title></circle>";
    });
    el.innerHTML = s + "</svg>"; chartW = el.clientWidth;
  }

  function render() {
    var all = load(), body = document.getElementById("pbody");
    if (!all.length) {
      body.innerHTML = '<div class="card pg-empty fade"><div class="ico" aria-hidden="true">📈</div><h3>' + T("prog.emptyH") + "</h3><p>" + T("prog.emptyP") +
        '</p><a class="btn" href="mock.html">' + T("prog.emptyCta") + '</a> <a class="btn ghost-btn" href="mock.html#papers">' + T("prog.emptyCta2") + "</a></div>";
      return;
    }
    var list = all.filter(function (x) { return (F.exam === "all" || x.exam === F.exam) && (F.type === "all" || (F.type === "mock") === x.mock); });
    var h = '<div class="pg-filters"><div class="fl"><small>' + T("prog.f.exam") + "</small>" + btns("exam", [["all", "prog.all"], ["ntpc", "prog.ntpc"], ["gd", "prog.gd"]]) + "</div>" +
      '<div class="fl"><small>' + T("prog.f.type") + "</small>" + btns("type", [["all", "prog.all"], ["paper", "prog.paper"], ["mock", "prog.mock"]]) + "</div></div>";
    if (!list.length) {
      body.innerHTML = h + '<div class="card pg-empty"><p>' + T("prog.noMatch") + "</p></div>" + clearBtn(); bind(); return;
    }
    var n = list.length, best = list.reduce(function (b, x) { return x.pct > b.pct ? x : b; }, list[0]);
    var avg = list.reduce(function (s, x) { return s + x.pct; }, 0) / n;
    var C = list.reduce(function (s, x) { return s + x.c; }, 0), W = list.reduce(function (s, x) { return s + x.w; }, 0);
    var Q = list.reduce(function (s, x) { return s + x.total; }, 0);
    var timed = list.filter(function (x) { return x.time != null; }), secs = timed.reduce(function (s, x) { return s + x.time; }, 0);
    h += '<div class="facts pg-stats">' +
      "<div><small>" + T("prog.taken") + "</small><strong>" + n + "</strong></div>" +
      "<div><small>" + T("prog.best") + "</small><strong>" + pct(best.pct) + "</strong><em>" + T("prog.scoreOf", { s: best.a.score, n: best.total }) + "</em></div>" +
      "<div><small>" + T("prog.avg") + "</small><strong>" + pct(avg) + "</strong></div>" +
      "<div><small>" + T("prog.acc") + "</small><strong>" + (C + W ? Math.round(C / (C + W) * 100) + "%" : "–") + "</strong><em>" + T("prog.cw", { c: C, w: W }) + "</em></div>" +
      "<div><small>" + T("prog.attempted") + "</small><strong>" + (C + W) + "</strong><em>" + T("prog.ofQ", { n: Q }) + "</em></div>" +
      "<div><small>" + T("prog.time") + "</small><strong>" + (timed.length ? fmtDur(secs) : "–") + "</strong>" + (timed.length && timed.length < n ? "<em>" + T("prog.timePart", { k: timed.length, n: n }) + "</em>" : "") + "</div></div>";

    h += '<h2 class="sec">' + T("prog.trend") + '</h2><div class="card chart-card"><div class="chart" id="chart"></div>' +
      '<div class="ch-legend"><span><i></i>' + T("prog.paper") + '</span><span><i class="m"></i>' + T("prog.mock") + "</span><span>" + T("prog.chartNote") + "</span></div></div>";

    // Subject-wise
    var S = {}, noSec = 0;
    list.forEach(function (x) {
      var secs = x.a.sections; if (!secs || typeof secs !== "object") { noSec++; return; }
      Object.keys(secs).forEach(function (k) {
        var id = subjOf(k), v = secs[k]; if (!id || !v) return;
        var o = S[id] = S[id] || { n: 0, c: 0, w: 0 }; o.n += +v.n || 0; o.c += +v.c || 0; o.w += +v.w || 0;
      });
    });
    var subs = SUBJ.filter(function (k) { return S[k] && S[k].n; });
    h += '<h2 class="sec">' + T("prog.subjects") + '</h2><div class="card">' + subs.map(function (k) {
      var o = S[k], u = o.n - o.c - o.w, a = o.c + o.w ? Math.round(o.c / (o.c + o.w) * 100) : null;
      return '<div class="sbar"><div class="sbar-h"><span>' + T("subj." + k) + "</span><strong>" + (a == null ? "–" : a + "%") + " <small>" + T("prog.accShort") + "</small></strong></div>" +
        '<div class="bar" role="img" aria-label="' + E(T("prog.barLine", { c: o.c, w: o.w, k: u })) + '"><i class="c" style="width:' + o.c / o.n * 100 + '%"></i><i class="w" style="width:' + o.w / o.n * 100 + '%"></i></div>' +
        '<small class="muted">' + T("prog.barLine", { c: o.c, w: o.w, k: u }) + "</small></div>";
    }).join("") + '<div class="bar-legend"><span><i class="c"></i>' + T("res.correct") + '</span><span><i class="w"></i>' + T("res.wrong") + "</span><span><i></i>" + T("prog.unans") + "</span></div>" +
      (noSec ? '<p class="pg-note">' + T("prog.noSec", { n: noSec }) + "</p>" : "") + "</div>";

    // Weakest subjects: lowest accuracy among subjects with at least 3 answered questions.
    var ranked = subs.filter(function (k) { return S[k].c + S[k].w >= 3; }).map(function (k) { return { k: k, acc: S[k].c / (S[k].c + S[k].w) }; })
      .sort(function (x, y) { return x.acc - y.acc; });
    if (ranked.length >= 2) {
      var weak = ranked.slice(0, ranked.length > 2 ? 2 : 1);
      var ex = F.exam !== "all" ? F.exam : (list.filter(function (x) { return x.exam === "gd"; }).length > n / 2 ? "gd" : "ntpc");
      var tried = {}; all.forEach(function (x) { tried[x.a.id] = 1; });
      var papers = RRB.INDEX.filter(function (p) { return p.exam === ex && !p.mock; }), mk = RRB.INDEX.filter(function (p) { return p.exam === ex && p.mock; })[0];
      var fresh = papers.filter(function (p) { return !tried[p.id]; })[0] || papers[0];
      h += '<div class="card weak"><h3>⚠ ' + T("prog.weakH") + "</h3><ul>" + weak.map(function (w) {
        return "<li>" + T("prog.weakLine", { s: "<strong>" + T("subj." + w.k) + "</strong>", a: Math.round(w.acc * 100) }) + "</li>";
      }).join("") + "</ul><p>" + T("prog.weakDo") + " " +
        (fresh ? '<a href="test.html?id=' + fresh.id + '">' + E(RRB.tLabel(fresh.label)) + " →</a>" : "") +
        (mk ? " " + T("prog.or") + ' <a href="test.html?id=' + mk.id + '">' + E(RRB.tLabel(mk.label)) + " →</a>" : "") + "</p></div>";
    }

    // Recent attempts (newest first)
    var rec = list.slice().reverse(), shown = showAll ? rec : rec.slice(0, 8);
    h += '<h2 class="sec">' + T("prog.recent") + '</h2><div class="card att-card"><table class="att"><thead><tr><th>' + T("prog.date") + "</th><th>" + T("prog.test") +
      '</th><th class="n">' + T("prog.score") + '</th><th class="n">' + T("res.accuracy") + "</th><th></th></tr></thead><tbody>" + shown.map(function (x) {
        var review = x.m ? '<a href="test.html?result=' + encodeURIComponent(x.a.ts) + '">' + T("prog.review") + "</a>" : '<span class="muted">' + T("prog.noReview") + "</span>";
        return '<tr><td class="d">' + fmtDate(x.ts) + '</td><td class="t">' + E(RRB.tLabel(x.a.label || x.a.id || "")) + "<small>" + T(x.mock ? "prog.mock" : "prog.paper") + (x.a.auto ? " · " + T("prog.auto") : "") + "</small></td>" +
          '<td class="n s" data-l="' + E(T("prog.score")) + '">' + x.a.score + " / " + x.total + " <small>" + pct(x.pct) + "</small></td>" +
          '<td class="n a" data-l="' + E(T("res.accuracy")) + '">' + (x.acc == null ? "–" : x.acc + "%") + '</td><td class="r">' + review + "</td></tr>";
      }).join("") + "</tbody></table>" +
      (rec.length > 8 ? '<button type="button" class="b ghost pg-more" id="moreBtn">' + T(showAll ? "prog.less" : "prog.more", { n: rec.length }) + "</button>" : "") + "</div>";
    body.innerHTML = h + clearBtn();
    chart(list); bind();
  }
  function clearBtn() { return '<div class="pg-actions"><button type="button" class="b danger" id="clearBtn">🗑 ' + T("prog.clear") + "</button></div>"; }
  function bind() {
    document.querySelectorAll(".pg-filters button").forEach(function (b) { b.onclick = function () { F[b.dataset.k] = b.dataset.v; render(); }; });
    var mb = document.getElementById("moreBtn"); if (mb) mb.onclick = function () { showAll = !showAll; render(); };
    var cb = document.getElementById("clearBtn"); if (cb) cb.onclick = confirmClear;
  }
  function confirmClear() {
    var m = document.getElementById("modal"), n = load().length, last = document.activeElement;
    m.hidden = false;
    m.innerHTML = '<div class="dialog fade" role="dialog" aria-modal="true" aria-labelledby="ct"><h2 id="ct">' + T("prog.clearH") + '</h2><p class="muted">' + T("prog.clearP", { n: n }) +
      '</p><div class="dlg-act"><button class="b ghost" id="clNo">' + T("prog.cancel") + '</button><button class="b danger-fill" id="clYes">' + T("prog.clearYes") + "</button></div></div>";
    var close = function () { m.hidden = true; m.innerHTML = ""; document.removeEventListener("keydown", esc); last && last.focus && last.focus(); };
    var esc = function (e) { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", esc);
    m.onclick = function (e) { if (e.target === m) close(); };
    document.getElementById("clNo").onclick = close;
    document.getElementById("clYes").onclick = function () { localStorage.removeItem(RRB.ATTEMPTS); close(); F = { exam: "all", type: "all" }; render(); };
    document.getElementById("clNo").focus();
  }
  document.addEventListener("DOMContentLoaded", render);
  document.addEventListener("rrb:lang", function () { var m = document.getElementById("modal"); render(); if (m && !m.hidden) confirmClear(); });
  window.addEventListener("storage", function (e) { if (e.key === RRB.ATTEMPTS) render(); });
  window.addEventListener("resize", function () { var el = document.getElementById("chart"); if (el && Math.abs(el.clientWidth - chartW) > 20) render(); });
})();
