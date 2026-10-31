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
      // progress
      "prog.h1": "Your progress", "prog.intro": "Based on the tests you have submitted on this device. Nothing is uploaded.", "prog.loading": "Loading…",
      "prog.emptyH": "No tests yet", "prog.emptyP": "Take a mock test or a past paper and your scores, accuracy and weak subjects will show up here.",
      "prog.emptyCta": "Start a mock test", "prog.emptyCta2": "Try a past paper",
      "prog.f.exam": "Exam", "prog.f.type": "Type", "prog.all": "All", "prog.ntpc": "NTPC UG", "prog.gd": "Group D", "prog.paper": "Past paper", "prog.mock": "Mock",
      "prog.noMatch": "No tests match these filters.",
      "prog.taken": "Tests taken", "prog.best": "Best score", "prog.avg": "Average score", "prog.acc": "Overall accuracy", "prog.cw": "{c} right · {w} wrong",
      "prog.attempted": "Questions attempted", "prog.ofQ": "of {n} asked", "prog.time": "Time spent", "prog.timePart": "from {k} of {n} tests",
      "prog.hm": "{h} h {m} min", "prog.m": "{m} min", "prog.s": "{s} sec", "prog.scoreOf": "{s} / {n}",
      "prog.trend": "Score trend", "prog.chartAria": "Score trend over {n} tests", "prog.chartNote": "Score as % of total marks, oldest to newest",
      "prog.subjects": "Subject-wise", "subj.maths": "Mathematics", "subj.reasoning": "Reasoning", "subj.ga": "General Awareness", "subj.science": "General Science",
      "prog.accShort": "accuracy", "prog.barLine": "{c} correct · {w} wrong · {k} unanswered", "prog.unans": "Unanswered",
      "prog.noSec": "{n} older test(s) had no subject data and are left out here.",
      "prog.weakH": "Weakest subjects", "prog.weakLine": "{s}: {a}% accuracy", "prog.weakDo": "Practise more:", "prog.or": "or",
      "prog.recent": "Recent tests", "prog.date": "Date", "prog.test": "Test", "prog.score": "Score", "prog.review": "Review →", "prog.noReview": "Not available",
      "prog.auto": "auto-submitted", "prog.more": "Show all {n}", "prog.less": "Show fewer",
      "prog.clear": "Clear my progress", "prog.clearH": "Clear all progress?",
      "prog.clearP": "This deletes all {n} saved test results on this device. It can't be undone. A test you are in the middle of is kept.",
      "prog.cancel": "Cancel", "prog.clearYes": "Yes, clear",
      "card.progress": "Progress", "card.progressP": "Score trend, subject-wise accuracy and weak areas from your tests.", "card.progressN": "{n} tests taken · best {b}. See your trend and weak subjects.",
      // chat
      "chat.fab": "Ask a doubt", "chat.title": "Doubt chat", "chat.sub": "AI tutor · may make mistakes, verify key facts", "chat.replyLang": "Reply language",
      "chat.clear": "Clear", "chat.close": "Close chat", "chat.input": "Your doubt", "chat.send": "Send", "chat.hint": "Enter to send · Shift+Enter for new line",
      "chat.offline": "The doubt chat will be switched on soon.", "chat.offPh": "Doubt chat coming soon",
      "chat.long": "Your message is too long. Please keep it under {n} characters.", "chat.typing": "Tutor is typing",
      "chat.fail": "The tutor could not answer right now. Please try again.", "chat.net": "Couldn't reach the doubt chat. Check your internet connection and try again."
    },
    hi: {
      "site.title": "Rail Prep", "nav.home": "होम", "nav.notes": "नोट्स", "nav.papers": "पिछले प्रश्न पत्र", "nav.mocks": "मॉक टेस्ट", "nav.progress": "प्रोग्रेस",
      "aria.menu": "मेन्यू", "aria.theme": "डार्क मोड बदलें", "aria.lang": "भाषा",
      "foot.disc": "<strong>ज़रूरी सूचना:</strong> Rail Prep एक प्राइवेट प्रैक्टिस वेबसाइट है। इसका रेलवे भर्ती बोर्ड (RRB) या भारतीय रेलवे से कोई लेना-देना नहीं है। यहाँ दी गई तारीखों पर, खासकर जिन पर \"संभावित\" लिखा है, भरोसा करने से पहले RRB की ऑफ़िशियल वेबसाइट पर ज़रूर जाँच लें।",
      "foot.src": "पिछले प्रश्न पत्रों के प्रश्न वैसे ही दिए गए हैं जैसे परीक्षा में आए थे, RRB की आंसर की के साथ। प्रैक्टिस सेट के प्रश्न हमने खुद बनाए हैं।",
      "home.doctitle": "Rail Prep · NTPC स्नातक-पूर्व और ग्रुप डी प्रैक्टिस", "home.eyebrow": "रेलवे परीक्षा की प्रैक्टिस", "home.examsAria": "परीक्षा चुनें",
      "home.countdown": "कितने दिन बाकी", "home.glance": "परीक्षा एक नज़र में", "home.start": "प्रैक्टिस शुरू करें",
      "cd.days": "दिन", "cd.hrs": "घंटे", "cd.min": "मिनट", "cd.sec": "सेकंड", "cd.passed": "यह तारीख निकल चुकी है।", "cd.none": "अभी तारीख घोषित नहीं हुई है।",
      "tag.tentative": "संभावित", "tag.official": "आधिकारिक", "tag.soon": "जल्द आ रहा है", "home.target": "तारीख: {d}। ",
      "card.notes": "नोट्स", "card.notesP": "{exam} के विषयवार रिवीजन नोट्स बन रहे हैं। तब तक पिछले प्रश्न पत्रों और मॉक टेस्ट से प्रैक्टिस करें।",
      "card.papers": "पिछले प्रश्न पत्र", "card.papersP": "{n} असली प्रश्न पत्र · RRB आंसर की के साथ {q} प्रश्न।",
      "card.mocks": "मॉक टेस्ट", "card.mocksP": "{n} टाइम वाला प्रैक्टिस सेट ({q} प्रश्न) और सभी पिछले प्रश्न पत्र CBT मोड में।",
      "card.open": "खोलें →", "card.na": "अभी उपलब्ध नहीं",
      "mock.doctitle": "मॉक टेस्ट · Rail Prep", "mock.h1": "मॉक टेस्ट",
      "mock.intro": "CBT जैसे टेस्ट: प्रश्न पैलेट, टाइमर और 1/3 नेगेटिव मार्किंग के साथ। टेस्ट के बीच पेज रीफ़्रेश हो जाए तो भी आपके उत्तर सेव रहते हैं।",
      "mock.practice": "प्रैक्टिस सेट", "mock.papers": "पिछले प्रश्न पत्र (असली प्रश्न, RRB आंसर की)",
      "mock.tagPractice": "प्रैक्टिस", "mock.tagPaper": "पिछला प्रश्न पत्र", "mock.qs": "{n} प्रश्न", "mock.min": "{n} मिनट", "mock.omitted": "{n} छोड़े गए",
      "mock.omittedT": "चित्र वाले प्रश्न हटाए गए हैं", "mock.start": "टेस्ट शुरू करें →",
      "mock.resume": "अधूरा टेस्ट जारी रखें:", "mock.continue": "जारी रखें →",
      "notes.doctitle": "नोट्स · Rail Prep", "progress.doctitle": "प्रोग्रेस · Rail Prep", "papers.doctitle": "पिछले प्रश्न पत्र · Rail Prep",
      "stub.soon": "जल्द आ रहा है। यह हिस्सा अभी बन रहा है।", "stub.back": "होम पर वापस जाएँ",
      "test.doctitle": "टेस्ट · Rail Prep", "test.loading": "टेस्ट लोड हो रहा है…", "test.qsMarks": "{n} प्रश्न · +1 / −⅓", "test.qLang": "प्रश्न की भाषा",
      "test.palOpen": "प्रश्न पैलेट खोलें", "test.palClose": "पैलेट बंद करें", "test.palette": "प्रश्न पैलेट",
      "test.mark": "समीक्षा के लिए चिह्नित करें और आगे बढ़ें", "test.clear": "उत्तर मिटाएँ", "test.markS": "चिह्नित करें और आगे", "test.saveS": "सेव करें और आगे ›", "test.prev": "‹ पिछला", "test.save": "सेव करें और आगे बढ़ें ›",
      "test.qof": "प्रश्न {i} / {n}", "test.qAria": "प्रश्न {i}, {st}", "test.submitTest": "टेस्ट सबमिट करें",
      "test.fig": "इस प्रश्न का चित्र", "test.optFig": "विकल्प {k}", "test.expl": "व्याख्या:",
      "st.0": "नहीं देखा", "st.1": "उत्तर नहीं दिया", "st.2": "उत्तर दिया", "st.3": "समीक्षा के लिए चिह्नित", "st.4": "उत्तर दिया व चिह्नित",
      "ab.0": "नहीं देखा", "ab.1": "उत्तर नहीं", "ab.2": "उत्तर दिया", "ab.3": "चिह्नित", "ab.4": "उत्तर+ चिह्नित",
      "sub.title": "टेस्ट सबमिट करें?", "sub.left": "बचा समय: {t}। सबमिट करने के बाद उत्तर नहीं बदल सकेंगे।", "sub.section": "सेक्शन", "sub.total": "कुल",
      "sub.note": "हर प्रश्न एक ही बार गिना गया है। \"उत्तर दिया व चिह्नित\" वाले ({m}) उत्तर भी जाँचे जाएँगे, यानी {n} में से {s} उत्तरों के नंबर मिलेंगे।",
      "sub.back": "टेस्ट पर लौटें", "sub.submit": "सबमिट करें",
      "test.unknown": "यह टेस्ट नहीं मिला", "test.loadErr": "टेस्ट लोड नहीं हो सका", "test.backTests": "टेस्ट सूची पर लौटें",
      "res.notFound": "रिज़ल्ट नहीं मिला।", "res.seeAll": "सभी टेस्ट देखें",
      "res.auto": "समय खत्म · अपने-आप सबमिट हो गया", "res.result": "रिज़ल्ट", "res.scoreAria": "{n} में से {s} अंक", "res.of": "{n} में से",
      "res.correct": "सही", "res.wrong": "गलत", "res.skipped": "छोड़े गए", "res.nv": "नहीं देखे", "res.attempted": "हल किए", "res.accuracy": "सटीकता",
      "res.time": "लगा समय", "res.neg": "नेगेटिव अंक", "res.sections": "सेक्शन के हिसाब से", "res.skipNv": "छोड़े गए / नहीं देखे",
      "res.barLine": "{c} सही · {w} गलत · {k} छोड़े गए", "res.barNv": " · {v} नहीं देखे", "res.barAria": "{c} सही, {w} गलत, {k} छोड़े गए", "res.barAriaNv": ", {v} नहीं देखे",
      "res.review": "अपने उत्तर देखें", "f.all": "सभी", "f.wrong": "गलत", "f.skipped": "छोड़े गए", "f.nv": "नहीं देखे",
      "res.loadingQ": "प्रश्न लोड हो रहे हैं…", "res.tagRight": "सही +1", "res.tagWrong": "गलत −⅓", "res.tagNv": "नहीं देखा 0", "res.tagSkip": "छोड़ा 0",
      "res.your": "आपका उत्तर", "res.ask": "💬 डाउट पूछें", "res.none": "इस फ़िल्टर में दिखाने के लिए कुछ नहीं है।", "res.retake": "टेस्ट दोबारा दें", "res.allTests": "सभी टेस्ट",
      "prog.h1": "आपकी प्रोग्रेस", "prog.intro": "इस डिवाइस पर दिए गए टेस्ट के आधार पर। कुछ भी अपलोड नहीं होता।", "prog.loading": "लोड हो रहा है…",
      "prog.emptyH": "अभी कोई टेस्ट नहीं दिया", "prog.emptyP": "कोई मॉक टेस्ट या पिछला प्रश्न पत्र दीजिए, फिर आपका स्कोर, सटीकता और कमज़ोर विषय यहाँ दिखेंगे।",
      "prog.emptyCta": "मॉक टेस्ट शुरू करें", "prog.emptyCta2": "पिछला प्रश्न पत्र दें",
      "prog.f.exam": "परीक्षा", "prog.f.type": "टेस्ट का प्रकार", "prog.all": "सभी", "prog.ntpc": "NTPC स्नातक-पूर्व", "prog.gd": "ग्रुप डी", "prog.paper": "पिछला प्रश्न पत्र", "prog.mock": "मॉक",
      "prog.noMatch": "इन फ़िल्टर में कोई टेस्ट नहीं है।",
      "prog.taken": "दिए गए टेस्ट", "prog.best": "सबसे अच्छा स्कोर", "prog.avg": "औसत स्कोर", "prog.acc": "कुल सटीकता", "prog.cw": "{c} सही · {w} गलत",
      "prog.attempted": "हल किए गए प्रश्न", "prog.ofQ": "कुल {n} में से", "prog.time": "लगा समय", "prog.timePart": "{n} में से {k} टेस्ट का",
      "prog.hm": "{h} घंटे {m} मिनट", "prog.m": "{m} मिनट", "prog.s": "{s} सेकंड", "prog.scoreOf": "{s} / {n}",
      "prog.trend": "स्कोर का ग्राफ़", "prog.chartAria": "{n} टेस्ट के स्कोर का ग्राफ़", "prog.chartNote": "कुल अंकों में स्कोर %, पुराने से नए टेस्ट तक",
      "prog.subjects": "विषयवार", "subj.maths": "गणित", "subj.reasoning": "रीज़निंग", "subj.ga": "सामान्य ज्ञान", "subj.science": "सामान्य विज्ञान",
      "prog.accShort": "सटीकता", "prog.barLine": "{c} सही · {w} गलत · {k} बिना उत्तर", "prog.unans": "बिना उत्तर",
      "prog.noSec": "{n} पुराने टेस्ट में विषय की जानकारी नहीं थी, इसलिए वे यहाँ नहीं गिने गए।",
      "prog.weakH": "कमज़ोर विषय", "prog.weakLine": "{s}: {a}% सटीकता", "prog.weakDo": "और प्रैक्टिस करें:", "prog.or": "या",
      "prog.recent": "हाल के टेस्ट", "prog.date": "तारीख", "prog.test": "टेस्ट", "prog.score": "स्कोर", "prog.review": "उत्तर देखें →", "prog.noReview": "उपलब्ध नहीं",
      "prog.auto": "अपने-आप सबमिट", "prog.more": "सभी {n} दिखाएँ", "prog.less": "कम दिखाएँ",
      "prog.clear": "मेरी प्रोग्रेस मिटाएँ", "prog.clearH": "पूरी प्रोग्रेस मिटाएँ?",
      "prog.clearP": "इससे इस डिवाइस पर सेव सभी {n} टेस्ट रिज़ल्ट हट जाएँगे। यह वापस नहीं होगा। जो टेस्ट अभी अधूरा है, वह बना रहेगा।",
      "prog.cancel": "रद्द करें", "prog.clearYes": "हाँ, मिटाएँ",
      "card.progress": "प्रोग्रेस", "card.progressP": "आपके टेस्ट से स्कोर ग्राफ़, विषयवार सटीकता और कमज़ोर विषय।", "card.progressN": "{n} टेस्ट दिए · सबसे अच्छा {b}। अपना ग्राफ़ और कमज़ोर विषय देखें।",
      "chat.fab": "डाउट पूछें", "chat.title": "डाउट चैट", "chat.sub": "AI ट्यूटर · गलती कर सकता है, ज़रूरी बातें खुद जाँच लें", "chat.replyLang": "जवाब की भाषा",
      "chat.clear": "साफ़ करें", "chat.close": "चैट बंद करें", "chat.input": "आपका डाउट", "chat.send": "भेजें", "chat.hint": "भेजने के लिए Enter · नई लाइन के लिए Shift+Enter",
      "chat.offline": "डाउट चैट जल्द शुरू होगी।", "chat.offPh": "डाउट चैट जल्द शुरू होगी",
      "chat.long": "आपका संदेश बहुत लंबा है। कृपया {n} अक्षरों से कम रखें।", "chat.typing": "ट्यूटर लिख रहा है",
      "chat.fail": "ट्यूटर अभी जवाब नहीं दे सका। कृपया दोबारा कोशिश करें।", "chat.net": "डाउट चैट से कनेक्ट नहीं हो सका। अपना इंटरनेट कनेक्शन जाँचें और दोबारा कोशिश करें।"
    }
  };
  // Section names and paper-label words (data stays English; only the display changes).
  var SEC = { "General Science": "सामान्य विज्ञान", "Science": "विज्ञान", "Mathematics": "गणित", "Maths": "गणित",
    "General Intelligence and Reasoning": "सामान्य बुद्धि और रीज़निंग", "Reasoning": "रीज़निंग",
    "General Awareness and Current Affairs": "सामान्य ज्ञान और समसामयिकी", "General Awareness": "सामान्य ज्ञान", "GA": "सामान्य ज्ञान" };
  var LBL = [[/NTPC UG practice set \((\d+) Q\)/, "NTPC स्नातक-पूर्व प्रैक्टिस सेट ($1 प्रश्न)"], [/NTPC UG/g, "NTPC स्नातक-पूर्व"], [/Group D practice set \((\d+) Q\)/, "ग्रुप डी प्रैक्टिस सेट ($1 प्रश्न)"],
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
