// Site-wide English/Hindi UI strings. Language lives in localStorage "rrb.lang" ("en" default).
// RRB.t(key, vars) returns the string for the current language ({name} placeholders are filled from vars).
// Elements with data-i18n="key" get their text replaced; data-i18n-html="key" sets innerHTML;
// data-i18n-attr="attr:key;attr2:key2" sets attributes. RRB.setLang(l) saves, re-applies and fires "rrb:lang".
window.RRB = window.RRB || {};
(function () {
  var KEY = "rrb.lang";
  var S = {
    en: {
      "nav.dpp": "DPP", "card.dpp": "Daily Practice Problems (DPPs)", "dpp.doctitle": "Daily Practice Problems (DPPs) for RRB NTPC & Group D | रोज़ के 5 प्रैक्टिस प्रश्न | Rail Prep", "dpp.h1": "Daily Practice Problems (DPPs)", "dpp.h": "Daily Practice Problems (DPPs)",
      "dpp.intro": "5 new practice questions every day in the pattern of previous RRB NTPC and Group D papers: Maths, Reasoning, General Science and General Knowledge. Pick an answer to see if it is right, with an explanation.",
      "dpp.note": "These are Rail Prep's own practice questions written in the pattern of previous RRB papers (marked \"Rail Prep practice (PYQ pattern)\"). They are not real RRB past-paper questions. For real past papers with the official answer key see <a href=\"papers.html\">Past Papers</a>.",
      "dpp.sub.maths": "Maths", "dpp.sub.reasoning": "Reasoning", "dpp.sub.science": "General Science", "dpp.sub.gk": "Static GK", "dpp.sub.polity": "Polity", "dpp.sub.history": "History", "dpp.sub.geography": "Geography", "dpp.sub.economy": "Economy", "dpp.sub.railway": "Railways", "dpp.sub.computer": "Computer",
      "dpp.opts": "Options for question {n}", "dpp.wrong": "Not right. Correct answer: ({k}) {o}", "dpp.expl": "Explanation:", "dpp.trick": "Shortcut:", "dpp.score": "Score: {r} / {n}", "dpp.left": "{k} question(s) left", "dpp.allDone": "All done! Come back tomorrow for new DPPs.", "dpp.again": "Try again",
      "dpp.loading": "Loading questions…", "dpp.err": "Could not load the questions. Check your internet and try again.", "dpp.none": "No DPP added yet.", "dpp.archH": "All DPP days", "dpp.open": "Open now", "dpp.static": "Open →", "dpp.allStatic": "All days as simple pages (easy to print or share) →", "dpp.print": "Simple page · print →",
      "dpp.homeP": "5 exam-style questions for today, one from each subject, with explanations.", "dpp.homeNew": "{n} questions · about 5 minutes", "dpp.homeDone": "{d} of {n} done · {r} right", "dpp.start": "Start today's DPP →", "dpp.continue": "Continue →", "dpp.review": "See answers →", "dpp.all": "All days →",
      "site.title": "Rail Prep", "nav.home": "Home", "nav.notes": "Notes", "nav.papers": "Past Papers", "nav.mocks": "Mock Tests", "nav.progress": "Progress",
      "aria.menu": "Menu", "aria.theme": "Toggle dark mode", "aria.lang": "Language",
      "foot.disc": "Rail Prep is an effort to give you a real exam-like feel and practice in solving papers. It has no link with RRB or Indian Railways. Please check exam dates on your RRB's official website.",
      "foot.src": "Past paper questions and answers are as given by RRB; the questions in our mock tests are made by us.",
      "foot.copy": "© 2026 Rail Prep · All rights reserved · Copying without permission is not allowed",
      "foot.vis": "👥 Total visitors: {t} · Today: {d}", "foot.upd": "🕒 Last updated: {d}", "foot.ist": "(IST)",
      "share.lbl": "Share:", "share.aria": "Share", "share.wa": "WhatsApp", "share.tg": "Telegram", "share.waAria": "Share on WhatsApp", "share.tgAria": "Share on Telegram",
      "share.copy": "Copy link", "share.copied": "Link copied", "share.copyErr": "Could not copy. Please copy the link from the address bar.", "share.native": "Share",
      "share.qd": "Share today's question", "share.qdText": "Question of the day (Rail Prep):", "share.qdOpen": "Answer it here:", "share.news": "Share today's news", "share.newsText": "Today's 5 news for RRB NTPC & Group D ({d}):", "share.newsOpen": "Read here:",
      "q.scope": "NTPC UG: {a} · Group D: {b} · total {t} questions", "dt.cenT": "Official RRB website", "dt.offNotice": "Official notice", "dt.offNotices": "RRB notices", "dt.offT": "Opens the official RRB website (rrb.indianrailways.gov.in). Choose your RRB, then the CEN, then Notification.", "mock.orig": "All questions in our mock tests are original and made by us.",
      // home
      "home.doctitle": "RRB NTPC UG & Group D 2026 Free Practice | NTPC और ग्रुप डी की तैयारी | Rail Prep", "home.eyebrow": "Practice for RRB NTPC UG and Group D", "home.examsAria": "Choose exam",
      "home.countdown": "Countdown", "home.glance": "Exam at a glance", "home.start": "Start practising",
      "cd.days": "days", "cd.hrs": "hrs", "cd.min": "min", "cd.sec": "sec", "cd.passed": "This date has passed.", "cd.none": "No countdown yet: date not announced.",
      "tag.tentative": "Tentative", "tag.official": "Official", "tag.soon": "Coming soon", "home.target": "Target: {d}. ",
      "card.book": "Free book (Hindi PDF)", "card.free": "Free", "card.bookBtn": "Download PDF →",
      "card.bookP": "RRB NTPC UG 2026 complete preparation in Hindi: 46 chapters with notes, formulas, tricks and solved examples, 5 full practice sets (500 questions) with answer key. {p} pages · {mb} MB.",
      "card.bookPgd": "RRB Group D 2026 complete preparation in Hindi: 64 chapters with notes, formulas, tricks and solved examples (23 on General Science), 2026 current affairs and sports, 5 full practice sets (500 questions) with answer key. {p} pages · {mb} MB.",
      "card.notes": "Notes", "card.notesP": "Short notes with formulas, solved examples and tricks for all {n} topics.",
      "card.papers": "Past Papers", "card.papersP": "{x}: {n} real papers · {q} questions with RRB answer keys.",
      "card.mocks": "Mock Tests", "card.mocksP": "{x}: {n} timed mocks ({q} questions): a practice set, full 100-question mocks and a tough mock, plus every past paper in CBT mode.",
      "card.open": "Open →", "card.na": "Not available yet",
      // mock list
      "mock.doctitle": "RRB NTPC UG और Group D Mock Test 2026 Free | Rail Prep", "mock.h1": "Mock tests",
      "mock.intro": "CBT-style tests with a question palette, timer and 1/3 negative marking. Your progress is kept if you refresh mid-test.",
      "mock.practice": "Practice sets and tough mocks", "mock.papers": "Past papers (real questions, RRB answer keys)",
      "mock.tagPractice": "Practice", "mock.tagFull": "Full mock", "mock.tagNew": "New", "mock.mixed": "Mixed level", "mock.mixedT": "Easy, medium and tough questions, like the real exam", "mock.fullT": "Full-length mock in the real exam pattern", "mock.tagTough": "Tough", "mock.toughT": "Harder than the real exam level: 100 questions, 90 minutes", "mock.tagPaper": "Past paper", "mock.qs": "{n} questions", "mock.min": "{n} min", "mock.omitted": "{n} omitted",
      "mock.omittedT": "Figure/image questions left out", "mock.start": "Start test →",
      "mock.resume": "Resume unfinished test:", "mock.continue": "Continue →",
      // stubs
      "notes.doctitle": "RRB NTPC & Group D Notes in Hindi and English | नोट्स और ट्रिक | Rail Prep", "progress.doctitle": "My Test Progress | मेरी प्रोग्रेस | Rail Prep", "papers.doctitle": "RRB NTPC UG & Group D Previous Year Papers with Answer Key | पिछले साल के पेपर | Rail Prep",
      "stub.soon": "Coming soon. This section is being built.", "stub.back": "Back to Home",
      // test
      "test.doctitle": "RRB NTPC & Group D Online CBT Test | ऑनलाइन टेस्ट | Rail Prep", "test.loading": "Loading test…", "test.qsMarks": "{n} questions · +1 / −⅓", "test.qLang": "Question language",
      "test.palOpen": "Open question palette", "test.palClose": "Close palette", "test.palette": "Question palette",
      "test.mark": "Mark for Review &amp; Next", "test.clear": "Clear Response", "test.markS": "Mark for Review &amp; Next", "test.saveS": "Save &amp; Next ›", "test.prev": "‹ Previous", "test.save": "Save &amp; Next ›",
      "test.qof": "Question {i} of {n}", "test.qAria": "Question {i}, {st}", "test.submitTest": "Submit test",
      "test.fig": "Figure for this question", "test.optFig": "Option {k}", "test.expl": "Explanation:",
      "st.0": "Not visited", "st.1": "Not answered", "st.2": "Answered", "st.3": "Marked for review", "st.4": "Answered & marked",
      "ab.0": "Not vis.", "ab.1": "Not ans.", "ab.2": "Ans.", "ab.3": "Mkd.", "ab.4": "Ans.+ Mkd.",
      "sub.title": "Do you really want to submit the test?", "sub.left": "Time left: {t}. You can't change answers after submitting.", "sub.section": "Section", "sub.total": "Total",
      "sub.note": "Each question is counted once. Answers in \"Answered &amp; marked for review\" ({m}) are evaluated, so {s} of {n} answers will be scored.",
      "sub.back": "No, back to test", "sub.submit": "Yes, submit", "test.submit": "Submit",
      "sub.unans": "{u} of {n} questions are not answered yet.", "sub.allDone": "All {n} questions answered.",
      "pr.qTitle": "End this practice?", "pr.qLeft": "{u} of {n} questions are still left.", "pr.qNote": "Questions you haven't answered will be counted as skipped.", "pr.qKeep": "No, keep practising", "pr.qEnd": "Yes, end practice",
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
      "nav.news": "News", "mo.doctitle0": "Monthly Current Affairs 2026 for RRB NTPC & Group D | मासिक करंट अफ़ेयर्स | Rail Prep", "mo.doctitle": "Current Affairs {m} for RRB NTPC & Group D | Rail Prep", "mo.h1": "Monthly current affairs", "mo.intro": "The main events of each month for RRB general awareness, by topic, with the source for every line and a short quiz at the end. For daily news see the News page.", "mo.loading": "Loading…", "mo.err": "Could not load this month. Check your internet and try again.", "mo.sum": "{m}: {n} key events", "mo.toQuiz": "Jump to the quiz ↓", "mo.filter": "Filter by topic", "mo.all": "All", "mo.quizH": "Quiz: {m}", "mo.score": "You got {r} of {n} right.", "mo.again": "Try again", "nav.monthly": "Monthly current affairs", "news.monthly": "Monthly current affairs (Aug–Oct 2026) →", "tab.home": "Home", "tab.practice": "Practice", "tab.mocks": "Tests", "tab.news": "News", "tab.more": "More", "tab.aria": "Main sections", "app.h": "Install Rail Prep as an app", "app.p": "Opens from your home screen like an app, full screen, and pages you have opened also work without internet.", "app.ios": "In Safari tap the Share button ⬆️, then \"Add to Home Screen\".", "app.btn": "Install", "app.close": "Close", "news.more": "Read more · facts and quick question", "news.doctitle": "Daily Current Affairs 2026 for RRB NTPC & Group D | रोज़ की 5 ख़बरें | Rail Prep", "news.h": "Today's 5 news", "news.h1": "Current affairs: 5 news a day",
      "news.intro": "Five short news items every day, picked the way RRB asks general awareness questions, with facts to remember and one practice question each. Pick a day in the calendar.",
      "news.all": "See all days →", "news.remember": "Remember for the exam", "news.quiz": "Quick question:", "news.src": "Source:", "news.count": "{n} news",
      "news.loading": "Loading news…", "news.err": "Could not load the news.", "news.none": "No news added yet.",
      "news.cat.scheme": "Government scheme", "news.cat.sports": "Sports", "news.cat.awards": "Awards", "news.cat.appointments": "Appointments", "news.cat.defence": "Defence",
      "news.cat.science": "Science / Space", "news.cat.railways": "Railways", "news.cat.states": "States", "news.cat.international": "International",
      "news.cat.economy": "Economy / Banking", "news.cat.days": "Summits / Days",
      // home: slider, dates, question of the day; mock/paper lists
      "sl.aria": "What's new", "sl.prev": "Previous slide", "sl.next": "Next slide", "sl.pause": "Pause slides", "sl.play": "Play slides", "sl.of": "Slide {i} of {n}", "sl.go": "Go to slide {i}",
      "sl.1tag": "NTPC UG · CEN 07/2026", "sl.1h": "Form last date: {d}", "sl.1p": "Apply online till 11:59 pm. Fee payment till {f}.", "sl.1left": "Days left: {d} days {h} hrs", "sl.1closed": "The online form has closed.", "sl.1btn": "See important dates →",
      "sl.2tag": "New", "sl.2h": "{n} new tough mocks", "sl.2p": "100 questions, 90 minutes, harder than the real exam. One for NTPC UG, one for Group D.", "sl.2btn": "Try a tough mock →",
      "sl.3tag": "Topic practice", "sl.3h": "Topic-wise practice: {q} questions", "sl.3p": "Pick one topic and get the answer and explanation right after each question.", "sl.3btn": "Start practising →",
      "sl.4tag": "Past papers", "sl.4h": "{n} past papers, real 90-minute CBT", "sl.4p": "Real RRB papers with the RRB answer key, in the same CBT layout as the exam.", "sl.4btn": "Open past papers →",
      "sl.5tag": "Notes", "sl.5h": "Notes with formulas and solved examples", "sl.5p": "{n} topics ready in English and Hindi, with quick tricks and common mistakes.", "sl.5btn": "Read notes →",
      "dt.h": "Important dates", "dt.open": "Open now", "dt.closed": "Closed", "dt.soonIn": "In {n} days", "dt.today": "Today", "dt.tentative": "Tentative", "dt.left": "{n} days left",
      "dt.note": "Checked on {d} from RRB notices. Dates can change, so always confirm on the official RRB website.", "dt.src": "Source: {s}", "dt.till": "till {t}",
      "qd.h": "Question of the day", "qd.loading": "Loading today's question…", "qd.err": "Could not load today's question.", "qd.right": "Correct!", "qd.wrong": "Wrong. The right answer is ({k}).",
      "qd.src": "{p} · Q {q}", "qd.practice": "Practise {t} →", "qd.note": "Read the note →", "qd.again": "A new question comes every day at midnight (IST).", "qd.done": "You answered today's question.", "qd.fromNews": "From the news of {d}", "qd.newsLink": "Read the news →", "qd.againNews": "The question comes from today's 5 news and changes every day.", "news.mcqAbove": "This news item's question is in 'Question of the day' above.", "news.prevMonth": "Previous month", "news.nextMonth": "Next month", "news.calHas": "News available", "news.calNone": "No news", "news.calToday": "Today", "news.calDone": "{n} answered", "news.calAnswered": "Questions answered", "news.qdBadge": "Question of the day",
      "mock.filter": "Exam", "mock.all": "Both exams", "mock.intro2": "Our own practice sets, full mocks and tough mocks, in CBT style with a palette, timer and 1/3 negative marking. Real RRB papers are on the Past Papers page.",
      "mock.ownSets": "Practice sets and tough mocks", "mock.none": "No tests for this exam yet.", "mock.seePapers": "Looking for real RRB papers? Open past papers →",
      "papers.h1": "Past papers", "papers.intro": "Real RRB question papers with the RRB answer key. Each one runs as a full 90-minute CBT with 1/3 negative marking.", "papers.seeMocks": "Want our own practice sets and tough mocks? Open mock tests →",
      // notes
      "notes.h1": "Notes", "notes.loading": "Loading…", "notes.intro": "Short revision notes: key concepts, formulas, solved examples, quick tricks and common mistakes. More topics are being added.",
      "notes.readyH": "Ready to read", "notes.soon": "Coming soon", "notes.read": "Read →", "notes.qs": "{n} questions in papers and mocks", "notes.practiseShort": "Practise",
      "notes.back": "← All notes", "notes.noteTitle": "{t} · Notes · Rail Prep", "notes.concepts": "Key concepts", "notes.formulas": "Formulas and rules", "notes.facts": "Key facts", "notes.extraQs": "Practise with {t} ({n} questions)", "notes.examples": "Solved examples",
      "notes.ex": "Example {n}", "notes.ans": "Answer:", "notes.tricks": "Quick tricks", "notes.mistakes": "Common mistakes", "notes.practice": "Practice this topic →", "notes.print": "Print",
      "notes.loadErr": "Could not load this note. Please refresh the page.", "notes.soonNote": "The note for this topic is coming soon. Until then, practise its questions.",
      "notes.endP": "Done reading? Try {n} real questions on this topic.",
      // topic practice
      "nav.practice": "Topic Practice", "card.practice": "Topic Practice", "card.practiceP": "Practise one topic at a time, with instant answers and explanations. Past-paper and mock questions: {s}.",
      "practice.doctitle": "RRB NTPC & Group D Topic-wise Practice Questions | टॉपिक प्रैक्टिस | Rail Prep", "pr.h1": "Topic practice",
      "pr.intro": "Pick a topic and practise questions from the past papers and our mock tests. You see the right answer and the explanation right after each question. No negative marks here.",
      "pr.exam": "Exam", "pr.both": "Both", "pr.section": "Section", "pr.topic": "Topic", "pr.allTopics": "All topics", "pr.count": "Number of questions", "pr.all": "All ({n})",
      "pr.timer": "Timer", "pr.timerOff": "No timer", "pr.timerOn": "{s} sec per question", "pr.timerNote": "Total time {m} for {n} questions. The drill ends when time is up.",
      "pr.start": "Start drill →", "pr.avail": "{n} questions available", "pr.loading": "Loading questions…", "pr.err": "Could not load the questions. Please refresh the page.",
      "pr.qOf": "Question {i} of {n}", "pr.src": "{p} · Q {q}", "pr.right": "Correct!", "pr.wrongA": "Wrong. The right answer is ({k}).", "pr.skipped": "Skipped. The right answer is ({k}).",
      "pr.next": "Next →", "pr.finish": "See result →", "pr.skip": "Skip", "pr.quit": "End drill", "pr.timeLeft": "Time left", "pr.timeUp": "Time is up. Here is your result.",
      "pr.live": "{c} correct · {w} wrong", "pr.endH": "Drill complete", "pr.score": "Score", "pr.time": "Time taken", "pr.reviewH": "Review all questions",
      "pr.yours": "Your answer", "pr.notAns": "Not answered", "pr.again": "↻ Try again", "pr.new": "New drill", "pr.saved": "Saved to your progress.",
      "pr.mixed": "All {s} topics", "pr.keys": "Tip: press 1–4 to answer, Enter for next.", "pr.optLetter": "Option {k}",
      "prog.topics": "Topic practice", "prog.topicsP": "From your topic drills: {d} drills, {q} questions. Weakest topics first.",
      "prog.topicNone": "No topic drills yet. Practise one topic at a time and your topic-wise accuracy shows up here.", "prog.topicCta": "Start topic practice →",
      "prog.practise": "Practise →", "prog.clearP2": " Your {d} topic drills will also be deleted.",
      // chat
      "chat.fab": "Ask a doubt", "chat.title": "Doubt chat", "chat.replyLang": "Reply language",
      "chat.clear": "Clear", "chat.close": "Close chat", "chat.input": "Your doubt", "chat.send": "Send", "chat.hint": "Enter to send · Shift+Enter for new line",
      "chat.note": "AI answers can be wrong. Check important things in your book or on the official website.",
      "chat.hello": "Hi! Ask any doubt from Maths, Reasoning, General Science or General Awareness.", "chat.ph": "Type your doubt…",
      "chat.long": "Your message is too long. Please keep it under {n} characters.", "chat.typing": "Writing the answer",
      "chat.fail": "Could not get an answer right now. Please try again.", "chat.net": "Couldn't reach the doubt chat. Check your internet connection and try again."
    },
    hi: {
      "nav.dpp": "DPP", "card.dpp": "Daily Practice Problems (DPPs)", "dpp.doctitle": "Daily Practice Problems (DPPs) for RRB NTPC & Group D | रोज़ के 5 प्रैक्टिस प्रश्न | Rail Prep", "dpp.h1": "Daily Practice Problems (DPPs)", "dpp.h": "Daily Practice Problems (DPPs)",
      "dpp.intro": "हर दिन 5 नए प्रैक्टिस प्रश्न, RRB NTPC और ग्रुप डी के पिछले पेपरों के पैटर्न पर: गणित, रीज़निंग, सामान्य विज्ञान और सामान्य ज्ञान। उत्तर चुनें, तुरंत पता चलेगा कि सही है या नहीं, व्याख्या के साथ।",
      "dpp.note": "ये Rail Prep के अपने प्रैक्टिस प्रश्न हैं, जो RRB के पिछले पेपरों के पैटर्न पर बनाए गए हैं (इन पर \"Rail Prep practice (PYQ pattern)\" लिखा है)। ये RRB के असली पिछले पेपर के प्रश्न नहीं हैं। असली पिछले पेपर और आधिकारिक उत्तर कुंजी के लिए <a href=\"papers.html\">पिछले प्रश्न पत्र</a> देखें।",
      "dpp.sub.maths": "गणित", "dpp.sub.reasoning": "रीज़निंग", "dpp.sub.science": "सामान्य विज्ञान", "dpp.sub.gk": "स्टैटिक GK", "dpp.sub.polity": "राजनीति और संविधान", "dpp.sub.history": "इतिहास", "dpp.sub.geography": "भूगोल", "dpp.sub.economy": "अर्थव्यवस्था", "dpp.sub.railway": "रेलवे", "dpp.sub.computer": "कंप्यूटर",
      "dpp.opts": "प्रश्न {n} के विकल्प", "dpp.wrong": "सही नहीं। सही उत्तर: ({k}) {o}", "dpp.expl": "व्याख्या:", "dpp.trick": "शॉर्टकट ट्रिक:", "dpp.score": "स्कोर: {r} / {n}", "dpp.left": "{k} प्रश्न बाक़ी", "dpp.allDone": "सब हो गए! नए DPP के लिए कल फिर आएँ।", "dpp.again": "फिर से करें",
      "dpp.loading": "प्रश्न लोड हो रहे हैं…", "dpp.err": "प्रश्न लोड नहीं हो सके। इंटरनेट देखकर फिर कोशिश करें।", "dpp.none": "अभी कोई DPP नहीं जोड़ा गया।", "dpp.archH": "सभी दिनों के DPP", "dpp.open": "अभी खुला है", "dpp.static": "खोलें →", "dpp.allStatic": "सभी दिन सादे पेज के रूप में (प्रिंट या शेयर के लिए आसान) →", "dpp.print": "सादा पेज · प्रिंट →",
      "dpp.homeP": "आज के 5 परीक्षा जैसे प्रश्न, हर विषय से एक, व्याख्या के साथ।", "dpp.homeNew": "{n} प्रश्न · लगभग 5 मिनट", "dpp.homeDone": "{n} में से {d} किए · {r} सही", "dpp.start": "आज का DPP शुरू करें →", "dpp.continue": "आगे करें →", "dpp.review": "उत्तर देखें →", "dpp.all": "सभी दिन →",
      "site.title": "Rail Prep", "nav.home": "होम", "nav.notes": "नोट्स", "nav.papers": "पिछले प्रश्न पत्र", "nav.mocks": "मॉक टेस्ट", "nav.progress": "प्रोग्रेस",
      "aria.menu": "मेन्यू", "aria.theme": "डार्क मोड बदलें", "aria.lang": "भाषा",
      "foot.disc": "Rail Prep एक प्रयास है, जिसमें आपको परीक्षा जैसा माहौल और पेपर हल करने का अनुभव मिलता है। इसका RRB या भारतीय रेलवे से कोई संबंध नहीं है। परीक्षा की तारीखें अपनी RRB की वेबसाइट पर ज़रूर देख लें।",
      "foot.src": "पिछले प्रश्न पत्र के सवाल और उत्तर RRB के दिए हुए हैं; हमारे मॉक टेस्ट के सवाल हमने खुद बनाए हैं।",
      "foot.copy": "© 2026 Rail Prep · सर्वाधिकार सुरक्षित · बिना अनुमति कॉपी करना मना है",
      "foot.vis": "👥 कुल विज़िटर: {t} · आज: {d}", "foot.upd": "🕒 आख़िरी अपडेट: {d}", "foot.ist": "(IST)",
      "share.lbl": "शेयर करें:", "share.aria": "शेयर करें", "share.wa": "WhatsApp", "share.tg": "Telegram", "share.waAria": "WhatsApp पर शेयर करें", "share.tgAria": "Telegram पर शेयर करें",
      "share.copy": "लिंक कॉपी करें", "share.copied": "लिंक कॉपी हो गया", "share.copyErr": "कॉपी नहीं हो सका। ऊपर एड्रेस बार से लिंक कॉपी करें।", "share.native": "शेयर करें",
      "share.qd": "आज का सवाल शेयर करें", "share.qdText": "आज का सवाल (Rail Prep):", "share.qdOpen": "जवाब यहाँ दें:", "share.news": "आज की ख़बरें शेयर करें", "share.newsText": "RRB NTPC और ग्रुप डी के लिए आज की 5 ख़बरें ({d}):", "share.newsOpen": "यहाँ पढ़ें:",
      "q.scope": "NTPC स्नातक-पूर्व: {a} · ग्रुप डी: {b} · कुल {t} प्रश्न", "dt.cenT": "RRB की ऑफ़िशियल वेबसाइट", "dt.offNotice": "ऑफ़िशियल नोटिस", "dt.offNotices": "RRB की सूचनाएँ", "dt.offT": "RRB की ऑफ़िशियल वेबसाइट (rrb.indianrailways.gov.in) खुलेगी। अपना RRB चुनें, फिर CEN, फिर Notification।", "mock.orig": "हमारे मॉक टेस्ट के सभी सवाल हमने खुद बनाए हैं।",
      "home.doctitle": "RRB NTPC UG & Group D 2026 Free Practice | NTPC और ग्रुप डी की तैयारी | Rail Prep", "home.eyebrow": "RRB NTPC UG और ग्रुप डी की तैयारी", "home.examsAria": "परीक्षा चुनें",
      "home.countdown": "कितने दिन बाकी", "home.glance": "परीक्षा एक नज़र में", "home.start": "प्रैक्टिस शुरू करें",
      "cd.days": "दिन", "cd.hrs": "घंटे", "cd.min": "मिनट", "cd.sec": "सेकंड", "cd.passed": "यह तारीख निकल चुकी है।", "cd.none": "अभी तारीख घोषित नहीं हुई है।",
      "tag.tentative": "संभावित", "tag.official": "आधिकारिक", "tag.soon": "जल्द आ रहा है", "home.target": "तारीख: {d}। ",
      "card.book": "मुफ़्त किताब (हिंदी PDF)", "card.free": "फ़्री", "card.bookBtn": "PDF डाउनलोड करें →",
      "card.bookP": "RRB NTPC स्नातक-पूर्व 2026 की संपूर्ण तैयारी हिंदी में: 46 अध्याय (नोट्स, सूत्र, ट्रिक, हल किए उदाहरण), 5 पूरे प्रैक्टिस सेट (500 प्रश्न) उत्तर कुंजी के साथ। {p} पेज · {mb} MB।",
      "card.bookPgd": "RRB ग्रुप डी 2026 की संपूर्ण तैयारी हिंदी में: 64 अध्याय (नोट्स, सूत्र, ट्रिक, हल किए उदाहरण), इनमें सामान्य विज्ञान के 23 अध्याय, 2026 के करंट अफ़ेयर्स और खेल, 5 पूरे प्रैक्टिस सेट (500 प्रश्न) उत्तर कुंजी के साथ। {p} पेज · {mb} MB।",
      "card.notes": "नोट्स", "card.notesP": "सभी {n} टॉपिक के छोटे नोट्स: फ़ॉर्मूले, हल किए उदाहरण और शॉर्टकट ट्रिक।",
      "card.papers": "पिछले प्रश्न पत्र", "card.papersP": "{x}: {n} असली प्रश्न पत्र · RRB आंसर की के साथ {q} प्रश्न।",
      "card.mocks": "मॉक टेस्ट", "card.mocksP": "{x}: {n} टाइम वाले मॉक टेस्ट ({q} प्रश्न): प्रैक्टिस सेट, 100 प्रश्नों वाले फुल मॉक और टफ मॉक, और सभी पिछले प्रश्न पत्र CBT मोड में।",
      "card.open": "खोलें →", "card.na": "अभी उपलब्ध नहीं",
      "mock.doctitle": "RRB NTPC UG और Group D Mock Test 2026 Free | Rail Prep", "mock.h1": "मॉक टेस्ट",
      "mock.intro": "CBT जैसे टेस्ट: प्रश्न पैलेट, टाइमर और 1/3 नेगेटिव मार्किंग के साथ। टेस्ट के बीच पेज रीफ़्रेश हो जाए तो भी आपके उत्तर सेव रहते हैं।",
      "mock.practice": "प्रैक्टिस सेट और टफ मॉक", "mock.papers": "पिछले प्रश्न पत्र (असली प्रश्न, RRB आंसर की)",
      "mock.tagPractice": "प्रैक्टिस", "mock.tagFull": "फुल मॉक", "mock.tagNew": "नया", "mock.mixed": "मिला-जुला स्तर", "mock.mixedT": "असली परीक्षा की तरह आसान, मध्यम और कठिन प्रश्न", "mock.fullT": "असली परीक्षा के पैटर्न पर पूरा मॉक", "mock.tagTough": "टफ", "mock.toughT": "असली परीक्षा से कठिन स्तर: 100 प्रश्न, 90 मिनट", "mock.tagPaper": "पिछला प्रश्न पत्र", "mock.qs": "{n} प्रश्न", "mock.min": "{n} मिनट", "mock.omitted": "{n} छोड़े गए",
      "mock.omittedT": "चित्र वाले प्रश्न हटाए गए हैं", "mock.start": "टेस्ट शुरू करें →",
      "mock.resume": "अधूरा टेस्ट जारी रखें:", "mock.continue": "जारी रखें →",
      "notes.doctitle": "RRB NTPC & Group D Notes in Hindi and English | नोट्स और ट्रिक | Rail Prep", "progress.doctitle": "My Test Progress | मेरी प्रोग्रेस | Rail Prep", "papers.doctitle": "RRB NTPC UG & Group D Previous Year Papers with Answer Key | पिछले साल के पेपर | Rail Prep",
      "stub.soon": "जल्द आ रहा है। यह हिस्सा अभी बन रहा है।", "stub.back": "होम पर वापस जाएँ",
      "test.doctitle": "RRB NTPC & Group D Online CBT Test | ऑनलाइन टेस्ट | Rail Prep", "test.loading": "टेस्ट लोड हो रहा है…", "test.qsMarks": "{n} प्रश्न · +1 / −⅓", "test.qLang": "प्रश्न की भाषा",
      "test.palOpen": "प्रश्न पैलेट खोलें", "test.palClose": "पैलेट बंद करें", "test.palette": "प्रश्न पैलेट",
      "test.mark": "समीक्षा के लिए चिह्नित करें और आगे बढ़ें", "test.clear": "उत्तर मिटाएँ", "test.markS": "चिह्नित करें और आगे", "test.saveS": "सेव करें और आगे ›", "test.prev": "‹ पिछला", "test.save": "सेव करें और आगे बढ़ें ›",
      "test.qof": "प्रश्न {i} / {n}", "test.qAria": "प्रश्न {i}, {st}", "test.submitTest": "टेस्ट सबमिट करें",
      "test.fig": "इस प्रश्न का चित्र", "test.optFig": "विकल्प {k}", "test.expl": "व्याख्या:",
      "st.0": "नहीं देखा", "st.1": "उत्तर नहीं दिया", "st.2": "उत्तर दिया", "st.3": "समीक्षा के लिए चिह्नित", "st.4": "उत्तर दिया व चिह्नित",
      "ab.0": "नहीं देखा", "ab.1": "उत्तर नहीं", "ab.2": "उत्तर दिया", "ab.3": "चिह्नित", "ab.4": "उत्तर+ चिह्नित",
      "sub.title": "क्या आप सच में टेस्ट सबमिट करना चाहते हैं?", "sub.left": "बचा समय: {t}। सबमिट करने के बाद उत्तर नहीं बदल सकेंगे।", "sub.section": "सेक्शन", "sub.total": "कुल",
      "sub.note": "हर प्रश्न एक ही बार गिना गया है। \"उत्तर दिया व चिह्नित\" वाले ({m}) उत्तर भी जाँचे जाएँगे, यानी {n} में से {s} उत्तरों के नंबर मिलेंगे।",
      "sub.back": "नहीं, टेस्ट पर लौटें", "sub.submit": "हाँ, सबमिट करें", "test.submit": "सबमिट",
      "sub.unans": "{n} में से {u} प्रश्नों का उत्तर अभी नहीं दिया है।", "sub.allDone": "सभी {n} प्रश्नों के उत्तर दे दिए हैं।",
      "pr.qTitle": "क्या प्रैक्टिस खत्म करनी है?", "pr.qLeft": "{n} में से {u} प्रश्न अभी बाकी हैं।", "pr.qNote": "जिन प्रश्नों का उत्तर नहीं दिया, वे छोड़े गए माने जाएँगे।", "pr.qKeep": "नहीं, प्रैक्टिस जारी रखें", "pr.qEnd": "हाँ, खत्म करें",
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
      "nav.news": "ख़बरें", "mo.doctitle0": "Monthly Current Affairs 2026 for RRB NTPC & Group D | मासिक करंट अफ़ेयर्स | Rail Prep", "mo.doctitle": "{m} का करंट अफ़ेयर्स – RRB NTPC व ग्रुप डी | Rail Prep", "mo.h1": "मासिक करंट अफ़ेयर्स", "mo.intro": "हर महीने की ख़ास घटनाएँ, RRB सामान्य ज्ञान के हिसाब से विषय-वार, हर बात के स्रोत के साथ, और आख़िर में एक छोटा क्विज़। रोज़ की ख़बरों के लिए ख़बरें पेज देखें।", "mo.loading": "लोड हो रहा है…", "mo.err": "यह महीना लोड नहीं हो सका। इंटरनेट देखकर फिर कोशिश करें।", "mo.sum": "{m}: {n} ख़ास घटनाएँ", "mo.toQuiz": "क्विज़ पर जाएँ ↓", "mo.filter": "विषय चुनें", "mo.all": "सभी", "mo.quizH": "क्विज़: {m}", "mo.score": "आपके {n} में से {r} सही हुए।", "mo.again": "फिर से करें", "nav.monthly": "मासिक करंट अफ़ेयर्स", "news.monthly": "मासिक करंट अफ़ेयर्स (अगस्त–अक्टूबर 2026) →", "tab.home": "होम", "tab.practice": "प्रैक्टिस", "tab.mocks": "टेस्ट", "tab.news": "ख़बरें", "tab.more": "और", "tab.aria": "मुख्य हिस्से", "app.h": "Rail Prep को ऐप की तरह इंस्टॉल करें", "app.p": "होम स्क्रीन से ऐप की तरह पूरी स्क्रीन में खुलेगा, और खोले गए पेज बिना इंटरनेट के भी चलेंगे।", "app.ios": "Safari में नीचे शेयर बटन ⬆️ दबाएँ, फिर \"Add to Home Screen\" चुनें।", "app.btn": "इंस्टॉल करें", "app.close": "बंद करें", "news.more": "और पढ़ें · याद रखने वाली बातें और सवाल", "news.doctitle": "Daily Current Affairs 2026 for RRB NTPC & Group D | रोज़ की 5 ख़बरें | Rail Prep", "news.h": "आज की 5 ख़बरें", "news.h1": "करंट अफ़ेयर्स: हर दिन 5 ख़बरें",
      "news.intro": "हर दिन पाँच छोटी ख़बरें, उसी तरह चुनी गईं जैसे RRB सामान्य ज्ञान के प्रश्न पूछता है। हर ख़बर के साथ याद रखने लायक बातें और एक प्रैक्टिस प्रश्न। कैलेंडर में दिन चुनें।",
      "news.all": "सभी दिन देखें →", "news.remember": "परीक्षा के लिए याद रखें", "news.quiz": "छोटा सवाल:", "news.src": "स्रोत:", "news.count": "{n} ख़बरें",
      "news.loading": "ख़बरें लोड हो रही हैं…", "news.err": "ख़बरें लोड नहीं हो सकीं।", "news.none": "अभी कोई ख़बर नहीं जोड़ी गई।",
      "news.cat.scheme": "सरकारी योजना", "news.cat.sports": "खेल", "news.cat.awards": "पुरस्कार", "news.cat.appointments": "नियुक्ति", "news.cat.defence": "रक्षा",
      "news.cat.science": "विज्ञान/अंतरिक्ष", "news.cat.railways": "रेलवे", "news.cat.states": "राज्य", "news.cat.international": "अंतरराष्ट्रीय",
      "news.cat.economy": "अर्थव्यवस्था/बैंकिंग", "news.cat.days": "सम्मेलन/दिवस",
      "sl.aria": "नया क्या है", "sl.prev": "पिछली स्लाइड", "sl.next": "अगली स्लाइड", "sl.pause": "स्लाइड रोकें", "sl.play": "स्लाइड चलाएँ", "sl.of": "स्लाइड {i} / {n}", "sl.go": "स्लाइड {i} पर जाएँ",
      "sl.1tag": "NTPC स्नातक-पूर्व · CEN 07/2026", "sl.1h": "फ़ॉर्म की आखिरी तारीख: {d}", "sl.1p": "रात 11:59 बजे तक ऑनलाइन फ़ॉर्म भरें। फ़ीस {f} तक भरें।", "sl.1left": "कितने दिन बाकी: {d} दिन {h} घंटे", "sl.1closed": "ऑनलाइन फ़ॉर्म बंद हो चुका है।", "sl.1btn": "ज़रूरी तारीखें देखें →",
      "sl.2tag": "नया", "sl.2h": "{n} नए टफ मॉक", "sl.2p": "100 प्रश्न, 90 मिनट, असली परीक्षा से कठिन। एक NTPC स्नातक-पूर्व के लिए, एक ग्रुप डी के लिए।", "sl.2btn": "टफ मॉक दें →",
      "sl.3tag": "टॉपिक प्रैक्टिस", "sl.3h": "टॉपिक-वाइज़ प्रैक्टिस: {q} प्रश्न", "sl.3p": "एक टॉपिक चुनें, हर प्रश्न के बाद तुरंत उत्तर और व्याख्या देखें।", "sl.3btn": "प्रैक्टिस शुरू करें →",
      "sl.4tag": "पिछले प्रश्न पत्र", "sl.4h": "{n} पिछले प्रश्न पत्र, असली 90 मिनट का CBT", "sl.4p": "RRB आंसर की के साथ असली RRB पेपर, परीक्षा जैसे CBT लेआउट में।", "sl.4btn": "पिछले प्रश्न पत्र खोलें →",
      "sl.5tag": "नोट्स", "sl.5h": "सूत्र और हल किए गए उदाहरणों वाले नोट्स", "sl.5p": "{n} टॉपिक हिंदी और अंग्रेज़ी में तैयार, शॉर्टकट ट्रिक और आम गलतियों के साथ।", "sl.5btn": "नोट्स पढ़ें →",
      "dt.h": "ज़रूरी तारीखें", "dt.open": "अभी चालू", "dt.closed": "बंद", "dt.soonIn": "{n} दिन में", "dt.today": "आज", "dt.tentative": "संभावित", "dt.left": "{n} दिन बाकी",
      "dt.note": "{d} को RRB के नोटिस से जाँची गईं। तारीखें बदल सकती हैं, इसलिए RRB की ऑफ़िशियल वेबसाइट पर ज़रूर देखें।", "dt.src": "स्रोत: {s}", "dt.till": "{t} तक",
      "qd.h": "आज का सवाल", "qd.loading": "आज का सवाल लोड हो रहा है…", "qd.err": "आज का सवाल लोड नहीं हो सका।", "qd.right": "सही!", "qd.wrong": "गलत। सही उत्तर ({k}) है।",
      "qd.src": "{p} · प्रश्न {q}", "qd.practice": "{t} की प्रैक्टिस करें →", "qd.note": "नोट पढ़ें →", "qd.again": "हर दिन रात 12 बजे (IST) नया सवाल आता है।", "qd.done": "आपने आज का सवाल कर लिया।", "qd.fromNews": "{d} की ख़बर", "qd.newsLink": "ख़बर पढ़ें →", "qd.againNews": "यह सवाल आज की 5 ख़बरों में से है और हर दिन बदलता है।", "news.mcqAbove": "इस ख़बर का सवाल ऊपर 'आज का सवाल' में है।", "news.prevMonth": "पिछला महीना", "news.nextMonth": "अगला महीना", "news.calHas": "ख़बरें हैं", "news.calNone": "ख़बर नहीं", "news.calToday": "आज", "news.calDone": "{n} सवाल किए", "news.calAnswered": "सवाल किए", "news.qdBadge": "उस दिन का सवाल",
      "mock.filter": "परीक्षा", "mock.all": "दोनों परीक्षाएँ", "mock.intro2": "हमारे अपने प्रैक्टिस सेट, फुल मॉक और टफ मॉक, CBT जैसे: पैलेट, टाइमर और 1/3 नेगेटिव मार्किंग के साथ। असली RRB पेपर 'पिछले प्रश्न पत्र' पेज पर हैं।",
      "mock.ownSets": "प्रैक्टिस सेट और टफ मॉक", "mock.none": "इस परीक्षा के लिए अभी कोई टेस्ट नहीं है।", "mock.seePapers": "असली RRB पेपर चाहिए? पिछले प्रश्न पत्र खोलें →",
      "papers.h1": "पिछले प्रश्न पत्र", "papers.intro": "RRB आंसर की के साथ असली RRB प्रश्न पत्र। हर पेपर पूरे 90 मिनट के CBT की तरह चलता है, 1/3 नेगेटिव मार्किंग के साथ।", "papers.seeMocks": "हमारे अपने प्रैक्टिस सेट और टफ मॉक चाहिए? मॉक टेस्ट खोलें →",
      "notes.h1": "नोट्स", "notes.loading": "लोड हो रहा है…", "notes.intro": "छोटे रिवीजन नोट्स: ज़रूरी बातें, सूत्र, हल किए गए उदाहरण, शॉर्टकट ट्रिक और आम गलतियाँ। और टॉपिक जोड़े जा रहे हैं।",
      "notes.readyH": "पढ़ने के लिए तैयार", "notes.soon": "जल्द आएगा", "notes.read": "पढ़ें →", "notes.qs": "पेपर और मॉक में {n} प्रश्न", "notes.practiseShort": "प्रैक्टिस",
      "notes.back": "← सभी नोट्स", "notes.noteTitle": "{t} · नोट्स · Rail Prep", "notes.concepts": "ज़रूरी बातें", "notes.formulas": "सूत्र और नियम", "notes.facts": "मुख्य तथ्य", "notes.extraQs": "{t} के प्रश्नों से प्रैक्टिस ({n} प्रश्न)", "notes.examples": "हल किए गए उदाहरण",
      "notes.ex": "उदाहरण {n}", "notes.ans": "उत्तर:", "notes.tricks": "शॉर्टकट ट्रिक", "notes.mistakes": "आम गलतियाँ", "notes.practice": "इस टॉपिक की प्रैक्टिस करें →", "notes.print": "प्रिंट करें",
      "notes.loadErr": "यह नोट लोड नहीं हो सका। कृपया पेज रिफ्रेश करें।", "notes.soonNote": "इस टॉपिक का नोट जल्द आएगा। तब तक इसके प्रश्नों की प्रैक्टिस करें।",
      "notes.endP": "पढ़ लिया? अब इस टॉपिक के {n} असली प्रश्न हल करें।",
      "nav.practice": "टॉपिक प्रैक्टिस", "card.practice": "टॉपिक प्रैक्टिस", "card.practiceP": "एक-एक टॉपिक की प्रैक्टिस करें, तुरंत उत्तर और व्याख्या के साथ। पिछले पेपर और मॉक के प्रश्न: {s}।",
      "practice.doctitle": "RRB NTPC & Group D Topic-wise Practice Questions | टॉपिक प्रैक्टिस | Rail Prep", "pr.h1": "टॉपिक प्रैक्टिस",
      "pr.intro": "एक टॉपिक चुनें और पिछले पेपरों व हमारे मॉक टेस्ट के प्रश्नों की प्रैक्टिस करें। हर प्रश्न के बाद तुरंत सही उत्तर और व्याख्या दिखेगी। यहाँ नेगेटिव अंक नहीं हैं।",
      "pr.exam": "परीक्षा", "pr.both": "दोनों", "pr.section": "सेक्शन", "pr.topic": "टॉपिक", "pr.allTopics": "सभी टॉपिक", "pr.count": "कितने प्रश्न", "pr.all": "सभी ({n})",
      "pr.timer": "टाइमर", "pr.timerOff": "टाइमर नहीं", "pr.timerOn": "हर प्रश्न {s} सेकंड", "pr.timerNote": "{n} प्रश्नों के लिए कुल समय {m}। समय खत्म होते ही प्रैक्टिस खत्म हो जाएगी।",
      "pr.start": "प्रैक्टिस शुरू करें →", "pr.avail": "{n} प्रश्न उपलब्ध", "pr.loading": "प्रश्न लोड हो रहे हैं…", "pr.err": "प्रश्न लोड नहीं हो सके। कृपया पेज रिफ्रेश करें।",
      "pr.qOf": "प्रश्न {i} / {n}", "pr.src": "{p} · प्रश्न {q}", "pr.right": "सही!", "pr.wrongA": "गलत। सही उत्तर ({k}) है।", "pr.skipped": "छोड़ा गया। सही उत्तर ({k}) है।",
      "pr.next": "अगला →", "pr.finish": "रिज़ल्ट देखें →", "pr.skip": "छोड़ें", "pr.quit": "प्रैक्टिस खत्म करें", "pr.timeLeft": "बचा समय", "pr.timeUp": "समय खत्म। यह रहा आपका रिज़ल्ट।",
      "pr.live": "{c} सही · {w} गलत", "pr.endH": "प्रैक्टिस पूरी हुई", "pr.score": "स्कोर", "pr.time": "लगा समय", "pr.reviewH": "सभी प्रश्न दोबारा देखें",
      "pr.yours": "आपका उत्तर", "pr.notAns": "उत्तर नहीं दिया", "pr.again": "↻ फिर से करें", "pr.new": "नई प्रैक्टिस", "pr.saved": "आपकी प्रोग्रेस में सेव हो गया।",
      "pr.mixed": "{s} के सभी टॉपिक", "pr.keys": "सुझाव: उत्तर के लिए 1–4 दबाएँ, अगले के लिए Enter।", "pr.optLetter": "विकल्प {k}",
      "prog.topics": "टॉपिक प्रैक्टिस", "prog.topicsP": "आपकी टॉपिक प्रैक्टिस से: {d} प्रैक्टिस, {q} प्रश्न। सबसे कमज़ोर टॉपिक पहले।",
      "prog.topicNone": "अभी तक कोई टॉपिक प्रैक्टिस नहीं की। एक-एक टॉपिक की प्रैक्टिस करें, टॉपिक वार सटीकता यहाँ दिखेगी।", "prog.topicCta": "टॉपिक प्रैक्टिस शुरू करें →",
      "prog.practise": "प्रैक्टिस करें →", "prog.clearP2": " आपकी {d} टॉपिक प्रैक्टिस भी हट जाएँगी।",
      "chat.fab": "डाउट पूछें", "chat.title": "डाउट चैट", "chat.replyLang": "जवाब की भाषा",
      "chat.clear": "साफ़ करें", "chat.close": "चैट बंद करें", "chat.input": "आपका डाउट", "chat.send": "भेजें", "chat.hint": "भेजने के लिए Enter · नई लाइन के लिए Shift+Enter",
      "chat.note": "AI के जवाब गलत भी हो सकते हैं, ज़रूरी बातें किताब/आधिकारिक साइट से जाँचें।",
      "chat.hello": "नमस्ते! गणित, रीज़निंग, सामान्य विज्ञान या सामान्य ज्ञान का कोई भी डाउट पूछें।", "chat.ph": "अपना डाउट लिखें…",
      "chat.long": "आपका संदेश बहुत लंबा है। कृपया {n} अक्षरों से कम रखें।", "chat.typing": "जवाब लिखा जा रहा है",
      "chat.fail": "अभी जवाब नहीं मिल सका। दोबारा कोशिश करें।", "chat.net": "डाउट चैट से जुड़ नहीं सके। इंटरनेट देखें और दोबारा कोशिश करें।"
    }
  };
  // Section names and paper-label words (data stays English; only the display changes).
  var SEC = { "General Science": "सामान्य विज्ञान", "Science": "विज्ञान", "Mathematics": "गणित", "Maths": "गणित",
    "General Intelligence and Reasoning": "सामान्य बुद्धि और रीज़निंग", "Reasoning": "रीज़निंग",
    "General Awareness and Current Affairs": "सामान्य ज्ञान और समसामयिकी", "General Awareness": "सामान्य ज्ञान", "GA": "सामान्य ज्ञान" };
  var LBL = [[/ tough mock (\d+) \((\d+) Q\)/, " टफ मॉक $1 ($2 प्रश्न)"], [/ Full Mock (\d+) \((\d+) Q\)/, " फुल मॉक $1 ($2 प्रश्न)"], [/NTPC UG practice set \((\d+) Q\)/, "NTPC स्नातक-पूर्व प्रैक्टिस सेट ($1 प्रश्न)"], [/NTPC UG/g, "NTPC स्नातक-पूर्व"], [/Group D practice set \((\d+) Q\)/, "ग्रुप डी प्रैक्टिस सेट ($1 प्रश्न)"],
    [/Group D/g, "ग्रुप डी"], [/CBT 1/g, "CBT 1"], [/Shift (\d)/g, "शिफ्ट $1"],
    [/\bJan\b/g, "जनवरी"], [/\bFeb\b/g, "फ़रवरी"], [/\bMar\b/g, "मार्च"], [/\bApr\b/g, "अप्रैल"], [/\bMay\b/g, "मई"], [/\bJun\b/g, "जून"],
    [/\bJul\b/g, "जुलाई"], [/\bAug\b/g, "अगस्त"], [/\bSep\b/g, "सितंबर"], [/\bOct\b/g, "अक्टूबर"], [/\bNov\b/g, "नवंबर"], [/\bDec\b/g, "दिसंबर"]];

  RRB.lang = function () { return localStorage.getItem(KEY) === "hi" ? "hi" : "en"; };
  var FB = new WeakMap(); // element -> its original English text, used when a key is missing
  // RRB.t(key, vars, fallback): current language, else English, else the given fallback, else the key itself.
  RRB.t = function (k, v, fb) {
    var s = S[RRB.lang()][k]; if (s == null) s = S.en[k]; if (s == null) s = fb != null ? fb : k;
    return v ? s.replace(/\{(\w+)\}/g, function (m, n) { return v[n] != null ? v[n] : m; }) : s;
  };
  RRB.tSec = function (s) { return RRB.lang() === "hi" && SEC[s] ? SEC[s] : s; };
  RRB.tLabel = function (l) { if (RRB.lang() !== "hi") return l; LBL.forEach(function (r) { l = l.replace(r[0], r[1]); }); return l; };
  RRB.locale = function () { return RRB.lang() === "hi" ? "hi-IN" : "en-IN"; };
  // Date/time options for the current language (Hindi uses a 24-hour clock so no stray "am/pm").
  RRB.dtOpts = function (o) { o = o || {}; o.timeZone = "Asia/Kolkata"; if (RRB.lang() === "hi") o.hour12 = false; return o; };
  RRB.applyI18n = function (root) {
    root = root || document;
    // If a key is missing (e.g. an old cached copy of this file), keep the English text written in the page instead of showing the raw key.
    root.querySelectorAll("[data-i18n]").forEach(function (e) { var k = e.getAttribute("data-i18n"); if (!FB.has(e)) FB.set(e, e.textContent); e.textContent = RRB.t(k, null, FB.get(e)); });
    root.querySelectorAll("[data-i18n-html]").forEach(function (e) { var k = e.getAttribute("data-i18n-html"); if (!FB.has(e)) FB.set(e, e.innerHTML); e.innerHTML = RRB.t(k, null, FB.get(e)); });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (e) {
      e.getAttribute("data-i18n-attr").split(";").forEach(function (p) {
        var kv = p.split(":"); if (!kv[1]) return; var a = kv[0].trim(), fk = "data-i18n-fb-" + a;
        if (!e.hasAttribute(fk)) e.setAttribute(fk, e.getAttribute(a) || "");
        e.setAttribute(a, RRB.t(kv[1].trim(), null, e.getAttribute(fk) || undefined));
      });
    });
    if (root === document) {
      document.documentElement.lang = RRB.lang();
      var dt = document.documentElement.getAttribute("data-title"); if (dt) { if (!FB.has(document)) FB.set(document, document.title); document.title = RRB.t(dt, null, FB.get(document)); }
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
