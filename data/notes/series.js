// Revision note: series (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "series",
"en": {
"intro": "Series questions give numbers or letters that follow a rule, and ask for the next or missing term (or the wrong one). Check the gaps first, then multiplication, squares and cubes.",
"concepts": [
{
"h": "Number series patterns",
"list": [
"Difference: find the gaps between terms; if the gaps are not equal, find the gaps of the gaps.",
"Multiply or divide: each term is × or ÷ a fixed or changing number (×2, ×3, …).",
"Mixed: × then + (×2 + 1), or squares and cubes ± a number (n² + 1, n³ − 1).",
"Alternate: two series mixed together (1st, 3rd, 5th … and 2nd, 4th, 6th …).",
"Prime numbers: 2, 3, 5, 7, 11, 13, 17, …"
]
},
{
"h": "Letter positions (EJOTY)",
"table": [
[
"E",
"5"
],
[
"J",
"10"
],
[
"O",
"15"
],
[
"T",
"20"
],
[
"Y",
"25"
],
[
"Opposite letter",
"A ↔ Z, B ↔ Y, C ↔ X … (positions add up to 27)"
]
]
},
{
"h": "Letter series",
"list": [
"Change letters to numbers and look for the gap (+1, +2, +3 …).",
"For letter groups (like ACE, BDF), check each place of the group separately.",
"After Z, start again from A (Z + 1 = A)."
]
}
],
"formulas": [
[
"Equal difference",
"3, 7, 11, 15 (+4 each time)"
],
[
"Second difference",
"2, 3, 5, 8, 12 (gaps +1, +2, +3, +4)"
],
[
"Multiply",
"3, 6, 12, 24 (×2)"
],
[
"× and +",
"2, 5, 11, 23, 47 (×2 + 1)"
],
[
"Squares",
"1, 4, 9, 16, 25 … or n² ± k"
],
[
"Cubes",
"1, 8, 27, 64, 125 … or n³ ± k"
],
[
"Sum of two before (Fibonacci type)",
"1, 1, 2, 3, 5, 8, 13"
],
[
"Letter positions",
"EJOTY = 5, 10, 15, 20, 25"
],
[
"Opposite letters",
"position + opposite position = 27"
]
],
"examples": [
{
"q": "Find the next number: 2, 6, 12, 20, 30, ?",
"s": [
"Gaps: 4, 6, 8, 10, so the next gap is 12",
"30 + 12 = 42",
"Check: the terms are 1×2, 2×3, 3×4, 4×5, 5×6, so next is 6×7 = 42"
],
"a": "42"
},
{
"q": "Find the next number: 3, 7, 15, 31, 63, ?",
"s": [
"Each term = previous × 2 + 1: 3 × 2 + 1 = 7, 7 × 2 + 1 = 15",
"63 × 2 + 1",
"= 127"
],
"a": "127"
},
{
"q": "Find the next term: B, E, H, K, ?",
"s": [
"Positions: B = 2, E = 5, H = 8, K = 11",
"The gap is +3 each time: 11 + 3 = 14",
"14th letter = N"
],
"a": "N"
}
],
"tricks": [
"Check the gaps first; if they grow fast, try ×, squares or cubes.",
"If the series is long (7–8 terms) or goes up and down, check alternate terms.",
"Learn EJOTY to find letter positions quickly.",
"Your answer must fit every term, not just the last two.",
"Wrong-term questions: the one term that breaks the pattern is the answer."
],
"mistakes": [
"Stopping at a pattern that fits only two or three terms.",
"Counting letter positions wrongly; use EJOTY as checkpoints.",
"Forgetting that after Z the letters start again from A.",
"Missing an alternate (two-series) pattern."
]
},
"hi": {
"intro": "सीरीज़ के प्रश्नों में संख्याएँ या अक्षर किसी नियम से चलते हैं, और अगला, छूटा हुआ या गलत पद पूछा जाता है। पहले अंतर देखें, फिर गुणा, वर्ग और घन।",
"concepts": [
{
"h": "संख्या सीरीज़ के पैटर्न",
"list": [
"अंतर: पदों के बीच का अंतर निकालें; अंतर बराबर न हों तो अंतरों का अंतर देखें।",
"गुणा या भाग: हर पद किसी तय या बदलती संख्या से × या ÷ होता है (×2, ×3, …)।",
"मिला-जुला: पहले × फिर + (×2 + 1), या वर्ग और घन ± कोई संख्या (n² + 1, n³ − 1)।",
"एक छोड़कर: दो सीरीज़ आपस में मिली होती हैं (पहला, तीसरा, पाँचवाँ … और दूसरा, चौथा, छठा …)।",
"अभाज्य संख्याएँ: 2, 3, 5, 7, 11, 13, 17, …"
]
},
{
"h": "अक्षरों के स्थान (EJOTY)",
"table": [
[
"E",
"5"
],
[
"J",
"10"
],
[
"O",
"15"
],
[
"T",
"20"
],
[
"Y",
"25"
],
[
"उल्टा अक्षर",
"A ↔ Z, B ↔ Y, C ↔ X … (स्थानों का जोड़ 27)"
]
]
},
{
"h": "अक्षर सीरीज़",
"list": [
"अक्षरों को संख्या में बदलें और अंतर देखें (+1, +2, +3 …)।",
"अक्षरों के समूह (जैसे ACE, BDF) में हर जगह का अक्षर अलग से जाँचें।",
"Z के बाद फिर A से शुरू करें (Z + 1 = A)।"
]
}
],
"formulas": [
[
"बराबर अंतर",
"3, 7, 11, 15 (हर बार +4)"
],
[
"अंतरों का अंतर",
"2, 3, 5, 8, 12 (अंतर +1, +2, +3, +4)"
],
[
"गुणा",
"3, 6, 12, 24 (×2)"
],
[
"× और +",
"2, 5, 11, 23, 47 (×2 + 1)"
],
[
"वर्ग",
"1, 4, 9, 16, 25 … या n² ± k"
],
[
"घन",
"1, 8, 27, 64, 125 … या n³ ± k"
],
[
"पिछले दो का जोड़ (फ़िबोनाची जैसा)",
"1, 1, 2, 3, 5, 8, 13"
],
[
"अक्षरों के स्थान",
"EJOTY = 5, 10, 15, 20, 25"
],
[
"उल्टे अक्षर",
"स्थान + उल्टे अक्षर का स्थान = 27"
]
],
"examples": [
{
"q": "अगली संख्या ज्ञात कीजिए: 2, 6, 12, 20, 30, ?",
"s": [
"अंतर: 4, 6, 8, 10, तो अगला अंतर 12",
"30 + 12 = 42",
"जाँच: पद 1×2, 2×3, 3×4, 4×5, 5×6 हैं, तो अगला 6×7 = 42"
],
"a": "42"
},
{
"q": "अगली संख्या ज्ञात कीजिए: 3, 7, 15, 31, 63, ?",
"s": [
"हर पद = पिछला × 2 + 1: 3 × 2 + 1 = 7, 7 × 2 + 1 = 15",
"63 × 2 + 1",
"= 127"
],
"a": "127"
},
{
"q": "अगला पद ज्ञात कीजिए: B, E, H, K, ?",
"s": [
"स्थान: B = 2, E = 5, H = 8, K = 11",
"हर बार +3: 11 + 3 = 14",
"14वाँ अक्षर = N"
],
"a": "N"
}
],
"tricks": [
"पहले अंतर देखें; अंतर तेज़ी से बढ़ें तो ×, वर्ग या घन आज़माएँ।",
"सीरीज़ लंबी हो (7–8 पद) या ऊपर-नीचे हो, तो एक छोड़कर पद देखें।",
"अक्षरों के स्थान जल्दी निकालने के लिए EJOTY याद करें।",
"उत्तर हर पद पर फ़िट होना चाहिए, सिर्फ़ आख़िरी दो पर नहीं।",
"गलत पद वाले प्रश्न: जो पद पैटर्न तोड़ता है, वही उत्तर है।"
],
"mistakes": [
"ऐसे पैटर्न पर रुक जाना जो सिर्फ़ दो-तीन पदों पर फ़िट हो।",
"अक्षरों के स्थान गलत गिनना; EJOTY से जाँचें।",
"भूल जाना कि Z के बाद फिर A आता है।",
"एक छोड़कर (दो सीरीज़) वाला पैटर्न न पकड़ना।"
]
}
});
