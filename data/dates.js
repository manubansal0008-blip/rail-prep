// Important dates shown on the home page strip. Edit here only.
// start/end: ISO times in IST (+05:30). A row with only "end" is a single date (deadline); "start"+"end" is a window.
// src/srcHi: where the date comes from (shown as a tooltip). url: official RRB page for the group (unified RRB website;
// the CEN 07/2026 notice is under any RRB -> CEN 07/2026 -> Notification, listed there on 14.10.2026).
// status: "official" = taken from an RRB notice (see src); "tentative" = not officially fixed yet (shown with a tentative tag, date may be empty).
// Rows whose end has passed show as closed automatically.
RRB.DATES = {
  checked: "2026-10-31",
  groups: [
    { exam: "ntpc", cen: "CEN 07/2026", url: "https://rrb.indianrailways.gov.in/", en: "NTPC UG", hi: "NTPC स्नातक-पूर्व", rows: [
      { key: "apply", en: "Online application", hi: "ऑनलाइन फ़ॉर्म", start: "2026-10-15T00:00:00+05:30", end: "2026-11-13T23:59:00+05:30", status: "official",
        src: "CEN 07/2026 detailed notice (14.10.2026), Important Dates; RRB FAQ on CEN 07/2026", srcHi: "CEN 07/2026 का पूरा नोटिफ़िकेशन (14.10.2026) और उसके सवाल-जवाब" },
      { key: "fee", en: "Last date for fee payment", hi: "फ़ीस भरने की आखिरी तारीख", end: "2026-11-15T23:59:00+05:30", status: "official",
        src: "CEN 07/2026 detailed notice (14.10.2026), Important Dates", srcHi: "CEN 07/2026 का पूरा नोटिफ़िकेशन (14.10.2026)" },
      { key: "edit", en: "Correction window (with fee)", hi: "फ़ॉर्म में सुधार (फ़ीस के साथ)", start: "2026-11-16T00:00:00+05:30", end: "2026-11-25T23:59:00+05:30", status: "official",
        src: "CEN 07/2026 detailed notice (14.10.2026), Important Dates", srcHi: "CEN 07/2026 का पूरा नोटिफ़िकेशन (14.10.2026)" },
      { key: "cbt", en: "CBT 1", hi: "CBT 1", status: "tentative", noteEn: "Expected in early 2027; date not announced yet.", noteHi: "2027 की शुरुआत में संभावित; तारीख़ अभी घोषित नहीं।",
        src: "CEN 07/2026 says CBT dates will be announced later on the RRB website", srcHi: "CEN 07/2026 के अनुसार CBT की तारीख बाद में RRB वेबसाइट पर आएगी" }
    ]},
    // Group D: no new Level-1 CEN after CEN 09/2025 as of 31.10.2026 (RRB notice lists checked: latest CENs are 06/2026, 07/2026 NTPC and 08/2026 Station Master).
    // When the new CEN comes out, replace these rows with its official dates.
    { exam: "gd", cen: "New recruitment notification awaited", url: "https://rrb.indianrailways.gov.in/", cenHi: "नई भर्ती का नोटिफ़िकेशन जल्द", en: "Group D", hi: "ग्रुप डी", rows: [
      { key: "notice", en: "New Group D (Level 1) notification", hi: "ग्रुप डी (लेवल 1) का नया नोटिफ़िकेशन", status: "tentative",
        noteEn: "Not announced yet. Expected Nov–Dec 2026.", noteHi: "अभी घोषित नहीं। नवंबर–दिसंबर 2026 में आने की उम्मीद।",
        src: "No new Level-1 CEN on RRB websites as of 31.10.2026; expected timing from news reports", srcHi: "31.10.2026 तक RRB वेबसाइट पर लेवल-1 का कोई नया CEN नहीं; समय की उम्मीद खबरों के आधार पर" },
      { key: "apply", en: "Online application", hi: "ऑनलाइन फ़ॉर्म", status: "tentative", noteEn: "Not announced yet.", noteHi: "अभी घोषित नहीं।",
        src: "Will be given in the new CEN", srcHi: "नए CEN में दी जाएगी" },
      { key: "cbt", en: "CBT", hi: "CBT", status: "tentative", noteEn: "Not announced yet.", noteHi: "अभी घोषित नहीं।",
        src: "Will be given by RRB later", srcHi: "RRB बाद में बताएगा" }
    ]}
  ]
};
