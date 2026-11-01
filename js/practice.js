// Topic practice: a drill of random past-paper / practice-set questions from one topic, with instant feedback.
// Topic tags come from data/topics.js (RRB.TOPICS.map[paperId][qIndex]); questions load from the unchanged data files.
// Finished drills are saved to localStorage RRB.DRILLS ("rrb.drills") and shown on the Progress page.
(function () {
  var T = function (k, v) { return RRB.t(k, v); }, E = RRB.esc, TP = RRB.TOPICS || { sections: {}, topics: [], map: {} };
  var SECS = ["maths", "reasoning", "gs", "ga"], PERQ = 36, NS = [10, 20, 30];
  var P = { exam: "ntpc", sec: "maths", topic: "all", n: 10, timer: 0 };
  var view = "setup", D = null, cache = {}, tick = null, busy = false;
  var TOP = {}; TP.topics.forEach(function (t) { TOP[t.k] = t; });

  function hiOn() { return RRB.lang() === "hi"; }
  function nm(o) { return o ? (hiOn() && o.hi ? o.hi : o.en) : ""; }
  function secName(s) { return nm(TP.sections[s]); }
  function topicName(k) { return k === "all" ? T("pr.mixed", { s: secName(P.sec) }) : nm(TOP[k]); }
  function meta(id) { return (RRB.INDEX || []).filter(function (p) { return p.id === id; })[0]; }
  function examOf(id) { var m = meta(id); return m ? m.exam : ""; }
  function pool(exam, sec, topic) {
    var out = [];
    Object.keys(TP.map).forEach(function (pid) {
      if (!meta(pid) || (exam !== "both" && examOf(pid) !== exam)) return;
      TP.map[pid].forEach(function (t, i) { var o = TOP[t]; if (o && o.s === sec && (topic === "all" || t === topic)) out.push([pid, i, t]); });
    });
    return out;
  }
  function secsFor(exam) { return SECS.filter(function (s) { return pool(exam, s, "all").length; }); }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function fmt(sec) { sec = Math.max(0, Math.round(sec)); return Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0"); }
  function fmtLong(sec) { var m = Math.floor(sec / 60), s = Math.round(sec % 60); return m ? T("prog.m", { m: m }) + (s ? " " + T("prog.s", { s: s }) : "") : T("prog.s", { s: s }); }

  // Question text in the page language (Hindi qh/oh/eh when present, English otherwise), as in the test page.
  function has(v) { return hiOn() && v != null && v !== ""; }
  function txt(q) { return has(q.qh) ? '<p class="qtext" lang="hi">' + E(q.qh) + "</p>" : q.q ? '<p class="qtext">' + E(q.q) + "</p>" : ""; }
  function opt(q, k) { return RRB.optImg(q, k) + (has(q.oh && q.oh[k]) ? '<span lang="hi">' + E(q.oh[k]) + "</span>" : E(q.o[k])); }
  function ex(q) { return has(q.eh) ? '<p class="expl" lang="hi"><strong>' + T("test.expl") + "</strong> " + E(q.eh) + "</p>" : q.e ? '<p class="expl"><strong>' + T("test.expl") + "</strong> " + E(q.e) + "</p>" : ""; }
  function src(it) { var m = meta(it.p); return T("pr.src", { p: E(RRB.tLabel(m ? m.label : it.p)), q: it.i + 1 }); }

  function btns(key, opts, cur) {
    cur = cur === undefined ? P[key] : cur;
    return '<div class="filters" role="group">' + opts.map(function (o) {
      return '<button type="button" data-k="' + key + '" data-v="' + o[0] + '" aria-pressed="' + (String(cur) === String(o[0])) + '"' + (o[2] ? " disabled" : "") + ">" + o[1] + "</button>";
    }).join("") + "</div>";
  }
  function fixP() {
    if (["ntpc", "gd", "both"].indexOf(P.exam) < 0) P.exam = "ntpc";
    var ss = secsFor(P.exam); if (ss.indexOf(P.sec) < 0) P.sec = ss[0];
    if (P.topic !== "all" && (!TOP[P.topic] || TOP[P.topic].s !== P.sec || !pool(P.exam, P.sec, P.topic).length)) P.topic = "all";
  }

  function setup() {
    view = "setup"; fixP(); stopTick();
    var avail = pool(P.exam, P.sec, P.topic).length, ss = secsFor(P.exam);
    var tops = TP.topics.filter(function (t) { return t.s === P.sec; }).map(function (t) { return [t.k, pool(P.exam, P.sec, t.k).length]; }).filter(function (x) { return x[1]; });
    var nOpts = NS.filter(function (n) { return n < avail; }).map(function (n) { return [n, n]; }).concat([["all", T("pr.all", { n: avail })]]);
    var eff = effN(avail), n = eff === "all" ? avail : eff;
    var h = '<div class="list-head"><h1>' + T("pr.h1") + '</h1></div><p class="muted">' + T("pr.intro") + '</p><p class="muted pr-scope">' + RRB.qScope() + "</p>" +
      '<div class="card pr-setup">' +
      '<div class="pr-row"><small>' + T("pr.exam") + "</small>" + btns("exam", [["ntpc", T("prog.ntpc")], ["gd", T("prog.gd")], ["both", T("pr.both")]]) + "</div>" +
      '<div class="pr-row"><small>' + T("pr.section") + "</small>" + btns("sec", ss.map(function (s) { return [s, secName(s)]; })) + "</div>" +
      '<div class="pr-row"><small>' + T("pr.topic") + '</small><div class="pr-topics" role="group">' +
      [["all", pool(P.exam, P.sec, "all").length]].concat(tops).map(function (x) {
        return '<button type="button" class="pr-topic" data-k="topic" data-v="' + x[0] + '" aria-pressed="' + (P.topic === x[0]) + '"><span>' +
          (x[0] === "all" ? T("pr.allTopics") : E(nm(TOP[x[0]]))) + "</span><b>" + x[1] + "</b></button>";
      }).join("") + "</div></div>" +
      '<div class="pr-row"><small>' + T("pr.count") + "</small>" + btns("n", nOpts, eff) + "</div>" +
      '<div class="pr-row"><small>' + T("pr.timer") + "</small>" + btns("timer", [[0, T("pr.timerOff")], [1, T("pr.timerOn", { s: PERQ })]]) + "</div>" +
      (P.timer ? '<p class="pg-note">' + T("pr.timerNote", { m: fmtLong(n * PERQ), n: n }) + "</p>" : "") +
      '<div class="pr-go"><span class="muted">' + E(topicName(P.topic)) + " · " + T("pr.avail", { n: avail }) + '</span><button type="button" class="b primary" id="goBtn"' + (avail ? "" : " disabled") + ">" + T("pr.start") + "</button></div></div>";
    document.getElementById("pr").innerHTML = h;
    document.querySelectorAll("#pr [data-k]").forEach(function (b) {
      b.onclick = function () {
        var k = b.dataset.k, v = b.dataset.v; P[k] = k === "timer" ? +v : k === "n" && v !== "all" ? +v : v;
        if (k === "exam" && v !== "both") RRB.setExam(v);
        if (k === "exam" || k === "sec") P.topic = k === "sec" ? "all" : P.topic;
        try { localStorage.setItem("rrb.drillPrefs", JSON.stringify(P)); } catch (e) {}
        setup();
        var f = document.querySelector('#pr [data-k="' + k + '"][data-v="' + v + '"]'); if (f) f.focus();
      };
    });
    document.getElementById("goBtn").onclick = function () { start(); };
  }

  function effN(avail) { return P.n === "all" || +P.n >= avail ? "all" : +P.n; }
  function need(ids, cb) {
    var todo = ids.filter(function (id, i) { return !cache[id] && ids.indexOf(id) === i; });
    (function next() {
      if (!todo.length) return cb();
      var id = todo.shift();
      RRB.loadTest(id, function (d) { cache[id] = d; next(); }, function () { busy = false; document.getElementById("pr").innerHTML = '<div class="card pg-empty"><p>' + T("pr.err") + "</p></div>"; });
    })();
  }
  function start(items) {
    if (busy) return;
    var pick = items || shuffle(pool(P.exam, P.sec, P.topic)); var en = effN(pick.length); if (!items && en !== "all") pick = pick.slice(0, en);
    var cfg = { exam: P.exam, sec: P.sec, topic: P.topic, timer: P.timer };
    busy = true; document.getElementById("pr").innerHTML = '<p class="muted pr-wait">' + T("pr.loading") + "</p>";
    need(pick.map(function (x) { return x[0]; }), function () {
      busy = false;
      D = { cfg: cfg, items: pick.map(function (x) { var q = cache[x[0]].questions[x[1]]; return { p: x[0], i: x[1], t: x[2], q: q, ans: null, done: false }; }).filter(function (x) { return x.q && x.q.o; }),
        idx: 0, t0: Date.now(), saved: false };
      if (cfg.timer) D.deadline = D.t0 + D.items.length * PERQ * 1000;
      question(true);
    });
  }
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function startTick() {
    stopTick(); if (!D || !D.deadline) return;
    var paint = function () {
      var left = (D.deadline - Date.now()) / 1000, el = document.getElementById("prTime");
      if (el) { el.textContent = fmt(left); el.parentNode.classList.toggle("low", left <= 30); }
      if (left <= 0) { stopTick(); D.timeUp = true; finish(); }
    };
    paint(); tick = setInterval(paint, 1000);
  }
  function counts() {
    var c = 0, w = 0; D.items.forEach(function (x) { if (x.done && x.ans != null) { if (x.ans === x.q.a) c++; else w++; } });
    return { c: c, w: w, s: D.items.length - c - w };
  }

  function question(top) {
    view = "q";
    var it = D.items[D.idx], q = it.q, n = D.items.length, k = counts(), last = D.idx === n - 1;
    var h = '<div class="pr-bar"><div><strong>' + E(topicName(D.cfg.topic === "all" ? "all" : it.t)) + "</strong><small>" + E(secName(D.cfg.sec)) + "</small></div>" +
      '<span class="pr-live">' + T("pr.live", { c: k.c, w: k.w }) + "</span>" +
      (D.deadline ? '<span class="pr-time" role="timer"><small>' + T("pr.timeLeft") + '</small> <b id="prTime"></b></span>' : "") +
      '<button type="button" class="b ghost-btn" id="quitBtn">' + T("pr.quit") + "</button></div>" +
      '<div class="pr-prog" aria-hidden="true"><i style="width:' + (D.idx + (it.done ? 1 : 0)) / n * 100 + '%"></i></div>' +
      '<div class="qpane pr-q"><div class="qhead"><span>' + T("pr.qOf", { i: D.idx + 1, n: n }) + '</span><span class="pr-src">' + src(it) + "</span></div>" +
      txt(q) + RRB.figs(q) + '<div class="opts" role="group" aria-label="' + E(T("pr.qOf", { i: D.idx + 1, n: n })) + '">' +
      q.o.map(function (o, j) {
        var cls = "opt pr-opt" + (it.done ? (j === q.a ? " right" : j === it.ans ? " wrong" : " dim") : "");
        return '<button type="button" class="' + cls + '" data-j="' + j + '"' + (it.done ? " disabled" : "") + ' aria-label="' + E(T("pr.optLetter", { k: j + 1 })) + '"><span class="ol">' + (j + 1) + "</span><span>" + opt(q, j) + "</span></button>";
      }).join("") + "</div>";
    if (it.done) {
      var ok = it.ans === q.a;
      h += '<div class="pr-fb ' + (it.ans == null ? "fb-skip" : ok ? "fb-ok" : "fb-bad") + '" role="status"><strong>' +
        (it.ans == null ? T("pr.skipped", { k: q.a + 1 }) : ok ? "✓ " + T("pr.right") : "✗ " + T("pr.wrongA", { k: q.a + 1 })) + "</strong>" + ex(q) + "</div>" +
        '<div class="pr-act"><button type="button" class="b primary" id="nextBtn">' + T(last ? "pr.finish" : "pr.next") + "</button></div>";
    } else {
      h += '<div class="pr-act"><span class="muted pr-keys">' + T("pr.keys") + '</span><button type="button" class="b" id="skipBtn">' + T("pr.skip") + "</button></div>";
    }
    h += "</div>";
    var root = document.getElementById("pr"); root.innerHTML = h;
    root.querySelectorAll(".pr-opt:not([disabled])").forEach(function (b) { b.onclick = function () { answer(+b.dataset.j); }; });
    var nb = document.getElementById("nextBtn"); if (nb) { nb.onclick = next; if (!top) nb.focus({ preventScroll: true }); }
    var sb = document.getElementById("skipBtn"); if (sb) sb.onclick = function () { answer(null); };
    document.getElementById("quitBtn").onclick = finish;
    if (top) window.scrollTo(0, 0);
    else if (nb) {
      // keep the feedback and the Next button in view, clear of the floating "Ask a doubt" button
      var r = nb.getBoundingClientRect(); if (r.bottom > innerHeight - 90) window.scrollBy(0, r.bottom - innerHeight + 100);
    }
    if (D.deadline && !tick) startTick(); else if (D.deadline) { var el = document.getElementById("prTime"); if (el) el.textContent = fmt((D.deadline - Date.now()) / 1000); }
  }
  function answer(j) { var it = D.items[D.idx]; if (it.done) return; it.ans = j; it.done = true; question(false); }
  function next() { if (D.idx < D.items.length - 1) { D.idx++; question(true); } else finish(); }

  function finish() {
    stopTick(); view = "end";
    if (!D.saved) {
      D.saved = true; D.time = Math.round((Date.now() - D.t0) / 1000);
      var k = counts(), rec = { ts: Date.now(), exam: D.cfg.exam, sec: D.cfg.sec, topic: D.cfg.topic, timed: !!D.cfg.timer, n: D.items.length, c: k.c, w: k.w, sk: k.s, time: D.time,
        items: D.items.map(function (x) { return [x.p, x.i, x.t, x.done && x.ans != null ? x.ans : -1, x.done && x.ans === x.q.a ? 1 : 0]; }) };
      var all; try { all = JSON.parse(localStorage.getItem(RRB.DRILLS) || "[]"); } catch (e) { all = []; }
      if (!Array.isArray(all)) all = [];
      all.push(rec); if (all.length > 300) all = all.slice(-300);
      try { localStorage.setItem(RRB.DRILLS, JSON.stringify(all)); } catch (e) {}
    }
    end();
  }
  function end() {
    var k = counts(), n = D.items.length, acc = k.c + k.w ? Math.round(k.c / (k.c + k.w) * 100) : null;
    var h = '<div class="card pr-end fade">' + (D.timeUp ? '<p class="tag warn">' + T("pr.timeUp") + "</p>" : "") +
      '<h1>' + T("pr.endH") + '</h1><p class="muted">' + E(topicName(D.cfg.topic)) + " · " + E(secName(D.cfg.sec)) + " · " + (D.cfg.exam === "both" ? T("pr.both") : T("prog." + D.cfg.exam)) + "</p>" +
      '<div class="facts pr-stats"><div><small>' + T("pr.score") + "</small><strong>" + k.c + " / " + n + "</strong></div>" +
      "<div><small>" + T("res.accuracy") + "</small><strong>" + (acc == null ? "–" : acc + "%") + "</strong></div>" +
      "<div><small>" + T("res.correct") + '</small><strong class="okc">' + k.c + "</strong></div>" +
      "<div><small>" + T("res.wrong") + '</small><strong class="bad">' + k.w + "</strong></div>" +
      "<div><small>" + T("res.skipped") + "</small><strong>" + k.s + "</strong></div>" +
      "<div><small>" + T("pr.time") + "</small><strong>" + fmtLong(D.time) + "</strong></div></div>" +
      '<p class="pg-note">✓ ' + T("pr.saved") + ' <a href="progress.html">' + T("nav.progress") + " →</a></p>" +
      '<div class="pr-act"><button type="button" class="b" id="newBtn">' + T("pr.new") + '</button><button type="button" class="b primary" id="againBtn">' + T("pr.again") + "</button></div></div>" +
      '<h2 class="sec">' + T("pr.reviewH") + "</h2>" + D.items.map(function (it, idx) {
        var q = it.q, got = it.done && it.ans != null, ok = got && it.ans === q.a;
        return '<div class="card rev ' + (ok ? "right" : got ? "wrong" : "") + '"><div class="qhead"><span>' + (idx + 1) + ". " + (ok ? '<span class="tag ok">' + T("res.correct") + "</span>" : got ? '<span class="tag bad">' + T("res.wrong") + "</span>" : '<span class="tag">' + T("res.skipped") + "</span>") +
          '</span><span class="pr-src">' + src(it) + "</span></div>" + txt(q) + RRB.figs(q) + '<ol class="ropts">' + q.o.map(function (o, j) {
            return '<li class="' + (j === q.a ? "ans" : j === it.ans ? "your" : "") + '">' + opt(q, j) + (j === q.a ? " ✓" : j === it.ans ? " ✗ (" + T("pr.yours") + ")" : "") + "</li>";
          }).join("") + "</ol>" + (got ? "" : '<p class="pg-note">' + T("pr.notAns") + "</p>") + ex(q) + "</div>";
      }).join("");
    document.getElementById("pr").innerHTML = h;
    document.getElementById("againBtn").onclick = function () { var c = D.cfg; P.exam = c.exam; P.sec = c.sec; P.topic = c.topic; P.timer = c.timer; start(shuffle(D.items.map(function (x) { return [x.p, x.i, x.t]; }))); };
    document.getElementById("newBtn").onclick = function () { D = null; setup(); window.scrollTo(0, 0); };
    window.scrollTo(0, 0);
  }

  function render() { if (view === "q" && D) question(true); else if (view === "end" && D) end(); else setup(); }
  document.addEventListener("keydown", function (e) {
    if (view !== "q" || !D || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA/.test((e.target || {}).tagName || "")) return;
    var it = D.items[D.idx];
    if (!it.done && /^[1-4]$/.test(e.key) && +e.key <= it.q.o.length) { e.preventDefault(); answer(+e.key - 1); }
    else if (it.done && e.key === "Enter" && !(e.target && e.target.id === "nextBtn")) { e.preventDefault(); next(); }
  });
  document.addEventListener("DOMContentLoaded", function () {
    try { var s = JSON.parse(localStorage.getItem("rrb.drillPrefs") || "null"); if (s && typeof s === "object") Object.keys(P).forEach(function (k) { if (s[k] != null) P[k] = s[k]; }); else P.exam = RRB.getExam(); } catch (e) {}
    var u = new URLSearchParams(location.search);
    if (u.get("exam")) P.exam = u.get("exam");
    if (u.get("topic") && TOP[u.get("topic")]) { P.topic = u.get("topic"); P.sec = TOP[P.topic].s; }
    else if (u.get("sec")) { P.sec = u.get("sec"); P.topic = "all"; }
    if (NS.indexOf(+P.n) < 0 && P.n !== "all") P.n = 10;
    setup();
  });
  document.addEventListener("rrb:lang", render);
})();
