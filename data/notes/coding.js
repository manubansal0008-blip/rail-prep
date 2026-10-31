// Revision note: coding (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "coding",
"en": {
"intro": "In coding-decoding, a word or number is written in a secret code using a rule. Find the rule from the given example and use it on the new word.",
"concepts": [
{
"h": "Letter shifting",
"list": [
"Each letter moves forward or backward by a fixed number (CAT → DBU is +1).",
"The shift can also change with the position (+1, +2, +3 …).",
"Opposite letters: A ↔ Z, B ↔ Y …; their positions add up to 27."
]
},
{
"h": "Other common types",
"list": [
"Reverse order: the word is written backwards (ROAD → DAOR).",
"Number coding: letters are replaced by their positions (BAD = 2 1 4) or by the sum of positions.",
"Sentence coding: 'pit na ko' = 'sun is hot'; match the words common to two sentences with the codes common to them."
]
},
{
"h": "How to find the rule",
"list": [
"Write the position numbers of the word and of its code.",
"Find the change for each letter.",
"Check the rule on every letter before using it."
]
}
],
"formulas": [
[
"Letter positions",
"A = 1 … Z = 26 (EJOTY = 5, 10, 15, 20, 25)"
],
[
"Reverse positions",
"A = 26 … Z = 1 (reverse value = 27 − position)"
],
[
"Opposite letter",
"position + opposite position = 27 (D ↔ W)"
],
[
"Shift past Z",
"subtract 26 (Y + 3 = 25 + 3 = 28 → 2 = B)"
],
[
"Sentence codes",
"a word common to two sentences has the code common to both"
],
[
"Sum coding",
"word = sum of letter positions (CAB = 3 + 1 + 2 = 6)"
]
],
"examples": [
{
"q": "If CAT is coded as DBU, how is DOG coded?",
"s": [
"C → D, A → B, T → U: each letter moves +1",
"D → E, O → P, G → H",
"Code = EPH"
],
"a": "EPH"
},
{
"q": "If MANGO is coded as OCPIQ, how is APPLE coded?",
"s": [
"M → O, A → C, N → P, G → I, O → Q: each letter moves +2",
"A → C, P → R, P → R, L → N, E → G",
"Code = CRRNG"
],
"a": "CRRNG"
},
{
"q": "In a code language, 'pit na ko' means 'sun is hot' and 'ko ra pit' means 'hot and sun'. What is the code for 'is'?",
"s": [
"Common words in both: 'sun' and 'hot'; common codes: 'pit' and 'ko'",
"So 'sun' and 'hot' are 'pit' and 'ko' (in some order)",
"The word left in the first sentence is 'is', and the code left is 'na'"
],
"a": "na"
}
],
"tricks": [
"Write A to Z with positions at the top of your rough work.",
"EJOTY helps: E 5, J 10, O 15, T 20, Y 25.",
"If the code has the same length as the word, first check a shift or a reverse.",
"Opposite pairs: AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN.",
"For sentence codes, compare two sentences at a time and strike off matched words."
],
"mistakes": [
"Checking the rule on only the first letter.",
"Going past Z and not starting again from A.",
"Mixing up a forward shift and a backward shift.",
"In sentence codes, thinking the codes are in the same order as the words."
]
},
"hi": {
"intro": "कोडिंग-डीकोडिंग में किसी शब्द या संख्या को एक नियम से गुप्त कोड में लिखा जाता है। दिए गए उदाहरण से नियम खोजें और उसे नए शब्द पर लगाएँ।",
"concepts": [
{
"h": "अक्षर खिसकाना",
"list": [
"हर अक्षर एक तय संख्या आगे या पीछे खिसकता है (CAT → DBU में +1)।",
"खिसकाव स्थान के साथ बदल भी सकता है (+1, +2, +3 …)।",
"उल्टे अक्षर: A ↔ Z, B ↔ Y …; इनके स्थानों का जोड़ 27 होता है।"
]
},
{
"h": "दूसरे आम प्रकार",
"list": [
"उल्टा क्रम: शब्द पीछे से लिखा जाता है (ROAD → DAOR)।",
"संख्या कोडिंग: अक्षरों की जगह उनके स्थान (BAD = 2 1 4) या स्थानों का जोड़।",
"वाक्य कोडिंग: 'pit na ko' = 'sun is hot'; दो वाक्यों में साझा शब्दों को उनके साझा कोड से मिलाएँ।"
]
},
{
"h": "नियम कैसे खोजें",
"list": [
"शब्द और उसके कोड के अक्षरों के स्थान नंबर लिखें।",
"हर अक्षर में बदलाव निकालें।",
"नियम लगाने से पहले उसे हर अक्षर पर जाँचें।"
]
}
],
"formulas": [
[
"अक्षरों के स्थान",
"A = 1 … Z = 26 (EJOTY = 5, 10, 15, 20, 25)"
],
[
"उल्टे स्थान",
"A = 26 … Z = 1 (उल्टा मान = 27 − स्थान)"
],
[
"उल्टा अक्षर",
"स्थान + उल्टे अक्षर का स्थान = 27 (D ↔ W)"
],
[
"Z से आगे खिसकना",
"26 घटाएँ (Y + 3 = 25 + 3 = 28 → 2 = B)"
],
[
"वाक्य कोड",
"दो वाक्यों में साझा शब्द का कोड दोनों में साझा होता है"
],
[
"जोड़ वाली कोडिंग",
"शब्द = अक्षरों के स्थानों का जोड़ (CAB = 3 + 1 + 2 = 6)"
]
],
"examples": [
{
"q": "अगर CAT को DBU लिखा जाता है, तो DOG को कैसे लिखेंगे?",
"s": [
"C → D, A → B, T → U: हर अक्षर +1",
"D → E, O → P, G → H",
"कोड = EPH"
],
"a": "EPH"
},
{
"q": "अगर MANGO को OCPIQ लिखा जाता है, तो APPLE को कैसे लिखेंगे?",
"s": [
"M → O, A → C, N → P, G → I, O → Q: हर अक्षर +2",
"A → C, P → R, P → R, L → N, E → G",
"कोड = CRRNG"
],
"a": "CRRNG"
},
{
"q": "एक कोड भाषा में 'pit na ko' का मतलब 'sun is hot' और 'ko ra pit' का मतलब 'hot and sun' है। 'is' का कोड क्या है?",
"s": [
"दोनों में साझा शब्द: 'sun' और 'hot'; साझा कोड: 'pit' और 'ko'",
"तो 'sun' और 'hot' का कोड 'pit' और 'ko' है (किसी भी क्रम में)",
"पहले वाक्य में बचा शब्द 'is' है, और बचा कोड 'na'"
],
"a": "na"
}
],
"tricks": [
"रफ़ काम में सबसे ऊपर A से Z तक स्थान के साथ लिख लें।",
"EJOTY काम आता है: E 5, J 10, O 15, T 20, Y 25।",
"कोड की लंबाई शब्द जितनी हो, तो पहले खिसकाव या उल्टा क्रम जाँचें।",
"उल्टे जोड़े: AZ, BY, CX, DW, EV, FU, GT, HS, IR, JQ, KP, LO, MN।",
"वाक्य कोड में एक बार में दो वाक्य मिलाएँ और मिल चुके शब्द काट दें।"
],
"mistakes": [
"नियम सिर्फ़ पहले अक्षर पर जाँचना।",
"Z के बाद फिर A से शुरू न करना।",
"आगे और पीछे खिसकाने में गड़बड़।",
"वाक्य कोड में यह मान लेना कि कोड भी शब्दों के क्रम में ही हैं।"
]
}
});
