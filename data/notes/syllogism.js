// Revision note: syllogism (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "syllogism",
"en": {
"intro": "You get two or three statements and must find which conclusions surely follow. Accept the statements as true even if they sound wrong in real life.",
"concepts": [
{
"h": "The four kinds of statements",
"list": [
"All A are B: every A is inside B.",
"No A is B: A and B do not overlap at all.",
"Some A are B: at least one A is B (it may even be all of them).",
"Some A are not B: at least one A is outside B."
]
},
{
"h": "When does a conclusion follow?",
"list": [
"A conclusion follows only if it is true in every possible diagram of the statements.",
"If you can draw even one diagram where it is false, it does not follow.",
"Do not use real-world facts. If the statement says 'All cats are dogs', accept it."
]
},
{
"h": "What one statement gives directly",
"list": [
"All A are B ⇒ Some A are B, and Some B are A. (It does not give All B are A.)",
"No A is B ⇒ No B is A, Some A are not B, and Some B are not A.",
"Some A are B ⇒ Some B are A.",
"Some A are not B ⇒ nothing definite about B and A."
]
}
],
"formulas": [
[
"All A are B + All B are C",
"All A are C (and Some C are A)"
],
[
"All A are B + No B is C",
"No A is C"
],
[
"Some A are B + All B are C",
"Some A are C"
],
[
"Some A are B + No B is C",
"Some A are not C"
],
[
"No A is B + All B are C",
"Some C are not A (nothing definite about A and C the other way)"
],
[
"All A are B + Some B are C",
"No definite conclusion about A and C"
],
[
"Some + Some, or No + No",
"No definite conclusion"
],
[
"Either I or II",
"If neither conclusion follows on its own, but both are about the same two terms and one must be true (Some A are B / No A is B, or All A are B / Some A are not B), the answer is 'Either I or II follows'."
]
],
"examples": [
{
"q": "Statements: All doctors are teachers. No teacher is a singer.\nConclusions: I. No doctor is a singer. II. Some teachers are doctors.",
"s": [
"All + No gives 'No doctor is a singer', so I follows.",
"'All doctors are teachers' also gives 'Some teachers are doctors', so II follows."
],
"a": "Both I and II follow"
},
{
"q": "Statements: Some cups are plates. All plates are spoons.\nConclusions: I. Some cups are spoons. II. All spoons are cups.",
"s": [
"Some + All gives 'Some cups are spoons', so I follows.",
"Draw some spoons outside the cups circle. II can be false, so it does not follow."
],
"a": "Only I follows"
},
{
"q": "Statements: Some pens are books. Some books are bags.\nConclusions: I. Some pens are bags. II. No pen is a bag.",
"s": [
"Some + Some gives no definite conclusion, so neither I nor II follows on its own.",
"But both are about pens and bags, and one of them must be true: either some pens are bags, or none is.",
"So choose 'Either I or II follows' if it is an option; otherwise 'Neither I nor II follows'."
],
"a": "Either I or II follows"
}
],
"tricks": [
"First try to make the conclusion false with a diagram. If you can, it does not follow.",
"'Some' means at least one. It can also mean all.",
"Find the middle term: it appears in both statements but not in the conclusion. The two statements are joined through it.",
"A conclusion with 'All' can come only when both statements are 'All'.",
"If both statements are negative (No / Some … not), no definite conclusion follows."
],
"mistakes": [
"Reversing 'All': All A are B does not mean All B are A.",
"Reversing 'Some not': Some A are not B does not mean Some B are not A.",
"Using real-life facts instead of the given statements.",
"From All A are B and Some B are C, concluding Some A are C. It does not follow."
]
},
"hi": {
"intro": "इसमें दो या तीन कथन दिए जाते हैं और बताना होता है कि कौन-से निष्कर्ष पक्के तौर पर निकलते हैं। कथनों को सही मानें, चाहे वे असल ज़िंदगी में गलत लगें।",
"concepts": [
{
"h": "चार तरह के कथन",
"list": [
"सभी A, B हैं: हर A, B के अंदर है।",
"कोई भी A, B नहीं है: A और B बिल्कुल नहीं मिलते।",
"कुछ A, B हैं: कम से कम एक A, B है (सभी भी हो सकते हैं)।",
"कुछ A, B नहीं हैं: कम से कम एक A, B के बाहर है।"
]
},
{
"h": "निष्कर्ष कब निकलता है?",
"list": [
"निष्कर्ष तभी निकलता है जब वह कथनों के हर संभव चित्र में सही हो।",
"अगर एक भी ऐसा चित्र बन जाए जिसमें वह गलत हो, तो वह नहीं निकलता।",
"असल दुनिया की जानकारी न लगाएँ। कथन में 'सभी बिल्लियाँ कुत्ते हैं' लिखा है, तो वही मानें।"
]
},
{
"h": "एक कथन से सीधे क्या निकलता है",
"list": [
"सभी A, B हैं ⇒ कुछ A, B हैं, और कुछ B, A हैं। (इससे 'सभी B, A हैं' नहीं निकलता।)",
"कोई भी A, B नहीं है ⇒ कोई भी B, A नहीं है; कुछ A, B नहीं हैं; कुछ B, A नहीं हैं।",
"कुछ A, B हैं ⇒ कुछ B, A हैं।",
"कुछ A, B नहीं हैं ⇒ B और A के बारे में कुछ पक्का नहीं।"
]
}
],
"formulas": [
[
"सभी A, B हैं + सभी B, C हैं",
"सभी A, C हैं (और कुछ C, A हैं)"
],
[
"सभी A, B हैं + कोई भी B, C नहीं है",
"कोई भी A, C नहीं है"
],
[
"कुछ A, B हैं + सभी B, C हैं",
"कुछ A, C हैं"
],
[
"कुछ A, B हैं + कोई भी B, C नहीं है",
"कुछ A, C नहीं हैं"
],
[
"कोई भी A, B नहीं है + सभी B, C हैं",
"कुछ C, A नहीं हैं (उल्टी तरफ़ A और C के बारे में कुछ पक्का नहीं)"
],
[
"सभी A, B हैं + कुछ B, C हैं",
"A और C के बारे में कोई पक्का निष्कर्ष नहीं"
],
[
"कुछ + कुछ, या कोई नहीं + कोई नहीं",
"कोई पक्का निष्कर्ष नहीं"
],
[
"या तो I या II",
"अगर कोई भी निष्कर्ष अकेले नहीं निकलता, पर दोनों एक ही दो चीज़ों के बारे में हों और उनमें से एक का सही होना तय हो (कुछ A, B हैं / कोई भी A, B नहीं है; या सभी A, B हैं / कुछ A, B नहीं हैं), तो उत्तर है 'या तो I या II निकलता है'।"
]
],
"examples": [
{
"q": "कथन: सभी डॉक्टर टीचर हैं। कोई भी टीचर गायक नहीं है।\nनिष्कर्ष: I. कोई भी डॉक्टर गायक नहीं है। II. कुछ टीचर डॉक्टर हैं।",
"s": [
"सभी + कोई नहीं से 'कोई भी डॉक्टर गायक नहीं है' निकलता है, तो I निकलता है।",
"'सभी डॉक्टर टीचर हैं' से 'कुछ टीचर डॉक्टर हैं' भी निकलता है, तो II भी निकलता है।"
],
"a": "I और II दोनों निकलते हैं"
},
{
"q": "कथन: कुछ कप प्लेट हैं। सभी प्लेट चम्मच हैं।\nनिष्कर्ष: I. कुछ कप चम्मच हैं। II. सभी चम्मच कप हैं।",
"s": [
"कुछ + सभी से 'कुछ कप चम्मच हैं' निकलता है, तो I निकलता है।",
"कुछ चम्मच कप वाले घेरे के बाहर बनाकर देखें। II गलत हो सकता है, इसलिए नहीं निकलता।"
],
"a": "केवल I निकलता है"
},
{
"q": "कथन: कुछ पेन किताबें हैं। कुछ किताबें बैग हैं।\nनिष्कर्ष: I. कुछ पेन बैग हैं। II. कोई भी पेन बैग नहीं है।",
"s": [
"कुछ + कुछ से कोई पक्का निष्कर्ष नहीं निकलता, तो I और II अकेले नहीं निकलते।",
"पर दोनों पेन और बैग के बारे में हैं और इनमें से एक सही होगा ही: या तो कुछ पेन बैग हैं, या कोई भी नहीं।",
"इसलिए विकल्प में हो तो 'या तो I या II निकलता है' चुनें; नहीं तो 'न I, न II निकलता है'।"
],
"a": "या तो I या II निकलता है"
}
],
"tricks": [
"पहले चित्र बनाकर निष्कर्ष को गलत करने की कोशिश करें। गलत बन जाए, तो वह नहीं निकलता।",
"'कुछ' का मतलब कम से कम एक। इसका मतलब 'सभी' भी हो सकता है।",
"बीच वाला शब्द खोजें: वह दोनों कथनों में आता है पर निष्कर्ष में नहीं। दोनों कथन इसी से जुड़ते हैं।",
"'सभी' वाला निष्कर्ष तभी निकल सकता है जब दोनों कथन 'सभी' वाले हों।",
"अगर दोनों कथन नकारात्मक हों (कोई भी … नहीं / कुछ … नहीं), तो कोई पक्का निष्कर्ष नहीं निकलता।"
],
"mistakes": [
"'सभी' को उल्टा कर देना: सभी A, B हैं का मतलब सभी B, A हैं नहीं है।",
"'कुछ … नहीं' को उल्टा कर देना: कुछ A, B नहीं हैं का मतलब कुछ B, A नहीं हैं नहीं है।",
"दिए गए कथनों की जगह असल ज़िंदगी की जानकारी लगाना।",
"सभी A, B हैं और कुछ B, C हैं से 'कुछ A, C हैं' निकाल लेना। यह नहीं निकलता।"
]
}
});
