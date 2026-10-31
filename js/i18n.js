// Site-wide English/Hindi UI strings. Language lives in localStorage "rrb.lang" ("en" default).
// RRB.t(key, vars) returns the string for the current language ({name} placeholders are filled from vars).
// Elements with data-i18n="key" get their text replaced; data-i18n-html="key" sets innerHTML;
// data-i18n-attr="attr:key;attr2:key2" sets attributes. RRB.setLang(l) saves, re-applies and fires "rrb:lang".
window.RRB = window.RRB || {};
(function () {
  var KEY = "rrb.lang";
  var S = {
    en: {
      "site.title": "Rail Prep", "nav.home": "Home", "nav.notes": "Notes", "nav.papers": "Past Papers", "nav.mocks": "Mock Tests", "nav.progress": "Progress",
      "aria.menu": "Menu", "aria.theme": "Toggle dark mode", "aria.lang": "Language",
      "foot.disc": "<strong>Disclaimer:</strong> Rail Prep is an unofficial, independent practice resource. It is not affiliated with the Railway Recruitment Boards or Indian Railways. Dates shown here, especially those marked tentative or expected, must be confirmed on the official RRB websites before you rely on them.",
      "foot.src": "Past-paper questions are reproduced as published, with RRB-marked answers. Practice sets are original questions.",
      // home
      "home.doctitle": "Rail Prep · NTPC UG and Group D practice", "home.eyebrow": "Unofficial practice hub", "home.examsAria": "Choose exam",
      "home.countdown": "Countdown", "home.glance": "Exam at a glance", "home.start": "Start practising",
      "cd.days": "days", "cd.hrs": "hrs", "cd.min": "min", "cd.sec": "sec", "cd.passed": "This date has passed.", "cd.none": "No countdown yet: date not announced.",
      "tag.tentative": "Tentative", "tag.official": "Official", "tag.soon": "Coming soon", "home.target": "Target: {d}. ",
      "card.notes": "Notes", "card.notesP": "Topic-wise revision notes for {exam} are being prepared. Until then, practise with the past papers and mocks.",
      "card.papers": "Past Papers", "card.papersP": "{n} real papers · {q} questions with RRB answer keys.",
      "card.mocks": "Mock Tests", "card.mocksP": "{n} timed practice set ({q} Q) plus every past paper in CBT mode.",
      "card.open": "Open →", "card.na": "Not available yet",
      // mock list
      "mock.doctitle": "Mock Tests · Rail Prep", "mock.h1": "Mock tests",
      "mock.intro": "CBT-style tests with a question palette, timer and 1/3 negative marking. Your progress is kept if you refresh mid-test.",
      "mock.practice": "Practice set", "mock.papers": "Past papers (real questions, RRB answer keys)",
      "mock.tagPractice": "Practice", "mock.tagPaper": "Past paper", "mock.qs": "{n} questions", "mock.min": "{n} min", "mock.omitted": "{n} omitted",
      "mock.omittedT": "Figure/image questions left out", "mock.start": "Start test →",
      "mock.resume": "Resume unfinished test:", "mock.continue": "Continue →",
      // stubs
      "notes.doctitle": "Notes · Rail Prep", "progress.doctitle": "Progress · Rail Prep", "papers.doctitle": "Past Papers · Rail Prep",
      "stub.soon": "Coming soon. This section is being built.", "stub.back": "Back to Home",
      // test
      "test.doctitle": "Test · Rail Prep", "test.loading": "Loading test…", "test.qsMarks": "{n} questions · +1 / −⅓", "test.qLang": "Question language",
      "test.palOpen": "Open question palette", "test.palClose": "Close palette", "test.palette": "Question palette",
      "test.mark": "Mark for Review &amp; Next", "test.clear": "Clear Response", "test.markS": "Mark for Review &amp; Next", "test.saveS": "Save &amp; Next ›", "test.prev": "‹ Previous", "test.save": "Save &amp; Next ›",
      "test.qof": "Question {i} of {n}", "test.qAria": "Question {i}, {st}", "test.submitTest": "Submit test",
      "test.fig": "Figure for this question", "test.optFig": "Option {k}", "test.expl": "Explanation:",
      "st.0": "Not visited", "st.1": "Not answered", "st.2": "Answered", "st.3": "Marked for review", "st.4": "Answered & marked",
      "ab.0": "Not vis.", "ab.1": "Not ans.", "ab.2": "Ans.", "ab.3": "Mkd.", "ab.4": "Ans.+ Mkd.",
      "sub.title": "Submit the test?", "sub.left": "Time left: {t}. You can't change answers after submitting.", "sub.section": "Section", "sub.total": "Total",
      "sub.note": "Each question is counted once. Answers in \"Answered &amp; marked for review\" ({m}) are evaluated, so {s} of {n} answers will be scored.",
      "sub.back": "Back to test", "sub.submit": "Submit",
      "test.unknown": "Unknown test", "test.loadErr": "Could not load test data", "test.backTests": "Back to tests",
      "res.notFound": "Result not found.", "res.seeAll": "See all tests",
      // results
      "res.auto": "Time up · auto-submitted", "res.result": "Result", "res.scoreAria": "Score {s} of {n}", "res.of": "of {n}",
      "res.correct": "Correct", "res.wrong": "Wrong", "res.skipped": "Skipped", "res.nv": "Not visited", "res.attempted": "Attempted", "res.accuracy": "Accuracy",
      "res.time": "Time taken", "res.neg": "Negative marks", "res.sections": "Section-wise", "res.skipNv": "Skipped / not visited",
      "res.barLine": "{c} correct · {w} wrong · {k} skipped", "res.barNv": " · {v} not visited", "res.barAria": "{c} correct, {w} wrong, {k} skipped", "res.barAriaNv": ", {v} not visited",
      "res.review": "Answer review", "f.all": "All", "f.wrong": "Wrong", "f.skipped": "Skipped", "f.nv": "Not visited",
      "res.loadingQ": "Loading questions…", "res.tagRight": "Correct +1", "res.tagWrong": "Wrong −⅓", "res.tagNv": "Not visited 0", "res.tagSkip": "Skipped 0",
      "res.your": "your answer", "res.ask": "💬 Ask doubt", "res.none": "Nothing to show for this filter.", "res.retake": "Retake", "res.allTests": "All tests",
      // chat
      "chat.fab": "Ask a doubt", "chat.title": "Doubt chat", "chat.sub": "AI tutor · may make mistakes, verify key facts", "chat.replyLang": "Reply language",
      "chat.clear": "Clear", "chat.close": "Close chat", "chat.input": "Your doubt", "chat.send": "Send", "chat.hint": "Enter to send · Shift+Enter for new line",
      "chat.offline": "Doubt chat works once the site is online.", "chat.offPh": "Available once the site is online",
      "chat.long": "Your message is too long. Please keep it under {n} characters.", "chat.typing": "Tutor is typing",
      "chat.fail": "The tutor could not answer right now. Please try again.", "chat.net": "Couldn't reach the doubt chat. Check your internet connection and try again."
    },
    hi: {
      "site.title": "Rail Prep", "nav.home": "होम", "nav.notes": "नोट्स", "nav.papers": "पिछले प्रश्न पत्र", "nav.mocks": "मॉक टेस्ट", "nav.progress": "प्रगति",
      "aria.menu": "मेन्यू", "aria.theme": "डार्क मोड बदलें", "aria.lang": "भाषा",
      "foot.disc": "<strong>अस्वीकरण:</strong> Rail Prep एक अनौपचारिक, स्वतंत्र अभ्यास संसाधन है। इसका रेलवे भर्ती बोर्ड या भारतीय रेलवे से कोई संबंध नहीं है। यहाँ दी गई तिथियों, विशेषकर संभावित या अपेक्षित चिह्नित तिथियों, की पुष्टि भरोसा करने से पहले आधिकारिक RRB वेबसाइटों पर अवश्य करें।",
      "foot.src": "पिछले प्रश्न पत्रों के प्रश्न प्रकाशित रूप में, RRB द्वारा चिह्नित उत्तरों के साथ दिए गए हैं। अभ्यास सेट के प्रश्न मौलिक हैं।",
      "home.doctitle": "Rail Prep · NTPC UG और ग्रुप डी अभ्यास", "home.eyebrow": "अनौपचारिक अभ्यास केंद्र", "home.examsAria": "परीक्षा चुनें",
      "home.countdown": "उलटी गिनती", "home.glance": "परीक्षा एक नज़र में", "home.start": "अभ्यास शुरू करें",
      "cd.days": "दिन", "cd.hrs": "घंटे", "cd.min": "मिनट", "cd.sec": "सेकंड", "cd.passed": "यह तिथि बीत चुकी है।", "cd.none": "अभी उलटी गिनती नहीं: तिथि घोषित नहीं हुई है।",
      "tag.tentative": "संभावित", "tag.official": "आधिकारिक", "tag.soon": "जल्द आ रहा है", "home.target": "लक्ष्य: {d}। ",
      "card.notes": "नोट्स", "card.notesP": "{exam} के लिए विषयवार रिवीजन नोट्स तैयार किए जा रहे हैं। तब तक पिछले प्रश्न पत्रों और मॉक टेस्ट से अभ्यास करें।",
      "card.papers": "पिछले प्रश्न पत्र", "card.papersP": "{n} वास्तविक प्रश्न पत्र · RRB उत्तर कुंजी सहित {q} प्रश्न।",
      "card.mocks": "मॉक टेस्ट", "card.mocksP": "{n} समयबद्ध अभ्यास सेट ({q} प्रश्न) और CBT मोड में सभी पिछले प्रश्न पत्र।",
      "card.open": "खोलें →", "card.na": "अभी उपलब्ध नहीं",
      "mock.doctitle": "मॉक टेस्ट · Rail Prep", "mock.h1": "मॉक टेस्ट",
      "mock.intro": "प्रश्न पैलेट, टाइमर और 1/3 नेगेटिव मार्किंग वाले CBT जैसे टेस्ट। टेस्ट के बीच पेज रीफ़्रेश करने पर भी आपकी प्रगति सुरक्षित रहती है।",
      "mock.practice": "अभ्यास सेट", "mock.papers": "पिछले प्रश्न पत्र (वास्तविक प्रश्न, RRB उत्तर कुंजी)",
      "mock.tagPractice": "अभ्यास", "mock.tagPaper": "पिछला प्रश्न पत्र", "mock.qs": "{n} प्रश्न", "mock.min": "{n} मिनट", "mock.omitted": "{n} छोड़े गए",
      "mock.omittedT": "चित्र/इमेज वाले प्रश्न शामिल नहीं", "mock.start": "टेस्ट शुरू करें →",
      "mock.resume": "अधूरा टेस्ट जारी रखें:", "mock.continue": "जारी रखें →",
      "notes.doctitle": "नोट्स · Rail Prep", "progress.doctitle": "प्रगति · Rail Prep", "papers.doctitle": "पिछले प्रश्न पत्र · Rail Prep",
      "stub.soon": "जल्द आ रहा है। यह भाग तैयार किया जा रहा है।", "stub.back": "होम पर वापस जाएँ",
      "test.doctitle": "टेस्ट · Rail Prep", "test.loading": "टेस्ट लोड हो रहा है…", "test.qsMarks": "{n} प्रश्न · +1 / −⅓", "test.qLang": "प्रश्न की भाषा",
      "test.palOpen": "प्रश्न पैलेट खोलें", "test.palClose": "पैलेट बंद करें", "test.palette": "प्रश्न पैलेट",
      "test.mark": "समीक्षा के लिए चिह्नित करें और आगे बढ़ें", "test.clear": "उत्तर मिटाएँ", "test.markS": "चिह्नित करें और आगे", "test.saveS": "सेव करें और आगे ›", "test.prev": "‹ पिछला", "test.save": "सेव करें और आगे बढ़ें ›",
      "test.qof": "प्रश्न {i} / {n}", "test.qAria": "प्रश्न {i}, {st}", "test.submitTest": "टेस्ट सबमिट करें",
      "test.fig": "इस प्रश्न का चित्र", "test.optFig": "विकल्प {k}", "test.expl": "व्याख्या:",
      "st.0": "नहीं देखा", "st.1": "उत्तर नहीं दिया", "st.2": "उत्तर दिया", "st.3": "समीक्षा के लिए चिह्नित", "st.4": "उत्तर दिया व चिह्नित",
      "ab.0": "नहीं देखा", "ab.1": "अनुत्तरित", "ab.2": "उत्तरित", "ab.3": "चिह्नित", "ab.4": "उत्तरित+ चिह्नित",
      "sub.title": "टेस्ट सबमिट करें?", "sub.left": "शेष समय: {t}। सबमिट करने के बाद उत्तर नहीं बदले जा सकते।", "sub.section": "खंड", "sub.total": "कुल",
      "sub.note": "हर प्रश्न एक ही बार गिना गया है। \"उत्तर दिया व समीक्षा के लिए चिह्नित\" ({m}) वाले उत्तरों का भी मूल्यांकन होगा, इसलिए {n} में से {s} उत्तर जाँचे जाएँगे।",
      "sub.back": "टेस्ट पर लौटें", "sub.submit": "सबमिट करें",
      "test.unknown": "अज्ञात टेस्ट", "test.loadErr": "टेस्ट डेटा लोड नहीं हो सका", "test.backTests": "टेस्ट सूची पर लौटें",
      "res.notFound": "परिणाम नहीं मिला।", "res.seeAll": "सभी टेस्ट देखें",
      "res.auto": "समय समाप्त · स्वतः सबमिट", "res.result": "परिणाम", "res.scoreAria": "{n} में से {s} अंक", "res.of": "{n} में से",
      "res.correct": "सही", "res.wrong": "गलत", "res.skipped": "छोड़े गए", "res.nv": "नहीं देखे", "res.attempted": "प्रयास किए", "res.accuracy": "सटीकता",
      "res.time": "लिया गया समय", "res.neg": "नेगेटिव अंक", "res.sections": "खंडवार", "res.skipNv": "छोड़े गए / नहीं देखे",
      "res.barLine": "{c} सही · {w} गलत · {k} छोड़े गए", "res.barNv": " · {v} नहीं देखे", "res.barAria": "{c} सही, {w} गलत, {k} छोड़े गए", "res.barAriaNv": ", {v} नहीं देखे",
      "res.review": "उत्तरों की समीक्षा", "f.all": "सभी", "f.wrong": "गलत", "f.skipped": "छोड़े गए", "f.nv": "नहीं देखे",
      "res.loadingQ": "प्रश्न लोड हो रहे हैं…", "res.tagRight": "सही +1", "res.tagWrong": "गलत −⅓", "res.tagNv": "नहीं देखा 0", "res.tagSkip": "छोड़ा 0",
      "res.your": "आपका उत्तर", "res.ask": "💬 डाउट पूछें", "res.none": "इस फ़िल्टर में दिखाने के लिए कुछ नहीं है।", "res.retake": "दोबारा दें", "res.allTests": "सभी टेस्ट",
      "chat.fab": "डाउट पूछें", "chat.title": "डाउट चैट", "chat.sub": "AI ट्यूटर · गलती हो सकती है, मुख्य तथ्य जाँच लें", "chat.replyLang": "जवाब की भाषा",
      "chat.clear": "साफ़ करें", "chat.close": "चैट बंद करें", "chat.input": "आपका डाउट", "chat.send": "भेजें", "chat.hint": "भेजने के लिए Enter · नई पंक्ति के लिए Shift+Enter",
      "chat.offline": "साइट ऑनलाइन होने पर डाउट चैट काम करेगी।", "chat.offPh": "साइट ऑनलाइन होने पर उपलब्ध",
      "chat.long": "आपका संदेश बहुत लंबा है। कृपया {n} अक्षरों से कम रखें।", "chat.typing": "ट्यूटर लिख रहा है",
      "chat.fail": "ट्यूटर अभी जवाब नहीं दे सका। कृपया दोबारा कोशिश करें।", "chat.net": "डाउट चैट से कनेक्ट नहीं हो सका। अपना इंटरनेट कनेक्शन जाँचें और दोबारा कोशिश करें।"
    }
  };
  // Section names and paper-label words (data stays English; only the display changes).
  var SEC = { "General Science": "सामान्य विज्ञान", "Science": "विज्ञान", "Mathematics": "गणित", "Maths": "गणित",
    "General Intelligence and Reasoning": "सामान्य बुद्धिमत्ता और तर्कशक्ति", "Reasoning": "तर्कशक्ति",
    "General Awareness and Current Affairs": "सामान्य जागरूकता और समसामयिकी", "General Awareness": "सामान्य जागरूकता", "GA": "सामान्य जागरूकता" };
  var LBL = [[/NTPC UG practice set \((\d+) Q\)/, "NTPC UG अभ्यास सेट ($1 प्रश्न)"], [/Group D practice set \((\d+) Q\)/, "ग्रुप डी अभ्यास सेट ($1 प्रश्न)"],
    [/Group D/g, "ग्रुप डी"], [/CBT 1/g, "CBT 1"], [/Shift (\d)/g, "शिफ्ट $1"],
    [/\bJan\b/g, "जनवरी"], [/\bFeb\b/g, "फ़रवरी"], [/\bMar\b/g, "मार्च"], [/\bApr\b/g, "अप्रैल"], [/\bMay\b/g, "मई"], [/\bJun\b/g, "जून"],
    [/\bJul\b/g, "जुलाई"], [/\bAug\b/g, "अगस्त"], [/\bSep\b/g, "सितंबर"], [/\bOct\b/g, "अक्टूबर"], [/\bNov\b/g, "नवंबर"], [/\bDec\b/g, "दिसंबर"]];

  RRB.lang = function () { return localStorage.getItem(KEY) === "hi" ? "hi" : "en"; };
  RRB.t = function (k, v) {
    var s = S[RRB.lang()][k]; if (s == null) s = S.en[k]; if (s == null) s = k;
    return v ? s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }) : s;
  };
  RRB.tSec = function (s) { return RRB.lang() === "hi" && SEC[s] ? SEC[s] : s; };
  RRB.tLabel = function (l) { if (RRB.lang() !== "hi") return l; LBL.forEach(function (r) { l = l.replace(r[0], r[1]); }); return l; };
  RRB.locale = function () { return RRB.lang() === "hi" ? "hi-IN" : "en-IN"; };
  // Date/time options for the current language (Hindi uses a 24-hour clock so no stray "am/pm").
  RRB.dtOpts = function (o) { o = o || {}; o.timeZone = "Asia/Kolkata"; if (RRB.lang() === "hi") o.hour12 = false; return o; };
  RRB.applyI18n = function (root) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (e) { e.textContent = RRB.t(e.getAttribute("data-i18n")); });
    root.querySelectorAll("[data-i18n-html]").forEach(function (e) { e.innerHTML = RRB.t(e.getAttribute("data-i18n-html")); });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (e) {
      e.getAttribute("data-i18n-attr").split(";").forEach(function (p) { var kv = p.split(":"); if (kv[1]) e.setAttribute(kv[0].trim(), RRB.t(kv[1].trim())); });
    });
    if (root === document) {
      document.documentElement.lang = RRB.lang();
      var dt = document.documentElement.getAttribute("data-title"); if (dt) document.title = RRB.t(dt);
      document.querySelectorAll(".lang:not(.cb-lang) button").forEach(function (b) { b.setAttribute("aria-pressed", b.dataset.l === RRB.lang()); });
    }
  };
  RRB.setLang = function (l) {
    l = l === "hi" ? "hi" : "en"; if (l === RRB.lang()) { RRB.applyI18n(); return; }
    localStorage.setItem(KEY, l); RRB.applyI18n();
    document.dispatchEvent(new CustomEvent("rrb:lang", { detail: l }));
  };
  // Another tab changed the language: follow it.
  window.addEventListener("storage", function (e) { if (e.key === KEY) { RRB.applyI18n(); document.dispatchEvent(new CustomEvent("rrb:lang", { detail: RRB.lang() })); } });
  document.documentElement.lang = RRB.lang();
  document.addEventListener("DOMContentLoaded", function () { RRB.applyI18n(); });
})();
