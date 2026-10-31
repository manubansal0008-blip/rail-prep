// Important dates shown on the home page strip. Edit here only.
// start/end: ISO times in IST (+05:30). A row with only "end" is a single date (deadline); "start"+"end" is a window.
// src/srcHi: where the date comes from (shown as a tooltip).
// status: "official" = taken from an RRB notice (see src); "tentative" = not officially fixed yet (shown with a tentative tag, date may be empty).
// Rows whose end has passed show as closed automatically.
RRB.DATES = {
  checked: "2026-10-31",
  groups: [
    { exam: "ntpc", cen: "CEN 07/2026", en: "NTPC UG", hi: "NTPC स्नातक-पूर्व", rows: [
      { key: "apply", en: "Online application", hi: "ऑनलाइन फ़ॉर्म", start: "2026-10-15T00:00:00+05:30", end: "2026-11-13T23:59:00+05:30", status: "official",
        src: "CEN 07/2026 detailed notice (14.10.2026), Important Dates; RRB FAQ on CEN 07/2026", srcHi: "CEN 07/2026 का पूरा नोटिफ़िकेशन (14.10.2026) और उसके सवाल-जवाब" },
      { key: "fee", en: "Last date for fee payment", hi: "फ़ीस भरने की आखिरी तारीख", end: "2026-11-15T23:59:00+05:30", status: "official",
        src: "CEN 07/2026 detailed notice (14.10.2026), Important Dates", srcHi: "CEN 07/2026 का पूरा नोटिफ़िकेशन (14.10.2026)" },
      { key: "edit", en: "Correction window (with fee)", hi: "फ़ॉर्म में सुधार (फ़ीस के साथ)", start: "2026-11-16T00:00:00+05:30", end: "2026-11-25T23:59:00+05:30", status: "official",
        src: "CEN 07/2026 detailed notice (14.10.2026), Important Dates", srcHi: "CEN 07/2026 का पूरा नोटिफ़िकेशन (14.10.2026)" },
      { key: "cbt", en: "CBT 1", hi: "CBT 1", status: "tentative", noteEn: "Not announced yet. Expected early 2027.", noteHi: "अभी घोषित नहीं। 2027 की शुरुआत में होने की उम्मीद।",
        src: "CEN 07/2026 says CBT dates will be announced later on the RRB website", srcHi: "CEN 07/2026 के अनुसार CBT की तारीख बाद में RRB वेबसाइट पर आएगी" }
    ]},
    { exam: "gd", cen: "CEN 09/2025", en: "Group D", hi: "ग्रुप डी", rows: [
      { key: "apply", en: "Online application", hi: "ऑनलाइन फ़ॉर्म", start: "2026-01-31T00:00:00+05:30", end: "2026-03-09T23:59:00+05:30", status: "official",
        src: "CEN 09/2025 Corrigendum No. 4 (02.03.2026), revised dates", srcHi: "CEN 09/2025 शुद्धिपत्र (कोरिजेंडम) 4 (02.03.2026)" },
      { key: "fee", en: "Last date for fee payment", hi: "फ़ीस भरने की आखिरी तारीख", end: "2026-03-11T23:59:00+05:30", status: "official",
        src: "CEN 09/2025 Corrigendum No. 4 (02.03.2026)", srcHi: "CEN 09/2025 शुद्धिपत्र (कोरिजेंडम) 4 (02.03.2026)" },
      { key: "edit", en: "Correction window (with fee)", hi: "फ़ॉर्म में सुधार (फ़ीस के साथ)", start: "2026-03-12T00:00:00+05:30", end: "2026-03-21T23:59:00+05:30", status: "official",
        src: "CEN 09/2025 Corrigendum No. 4 (02.03.2026)", srcHi: "CEN 09/2025 शुद्धिपत्र (कोरिजेंडम) 4 (02.03.2026)" },
      { key: "cbt", en: "CBT", hi: "CBT", start: "2026-08-03T00:00:00+05:30", end: "2026-08-21T23:59:00+05:30", status: "official",
        src: "RRB notice on tentative CBT schedule under CEN 09/2025 (03.07.2026)", srcHi: "CEN 09/2025 के CBT के संभावित शेड्यूल पर RRB का नोटिस (03.07.2026)" },
      { key: "result", en: "CBT result", hi: "CBT रिज़ल्ट", status: "tentative", noteEn: "Not announced yet.", noteHi: "अभी घोषित नहीं।",
        src: "No official result date yet", srcHi: "रिज़ल्ट की कोई ऑफ़िशियल तारीख अभी नहीं" }
    ]}
  ]
};
