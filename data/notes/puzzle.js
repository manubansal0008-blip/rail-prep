// Revision note: puzzle (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "puzzle",
"en": {
"intro": "Puzzles give several clues about people, boxes, floors or days, and you have to find the full arrangement. Make a table or a stack and fill the sure clues first.",
"concepts": [
{
"h": "Types asked in RRB",
"list": [
"Boxes or floors one above the other.",
"People matched with days, colours or cities (matching table).",
"Comparison puzzles: who is heavier, taller or older."
]
},
{
"h": "Boxes one above the other",
"list": [
"Number the places from the bottom (1) to the top.",
"'Only three boxes are below N' → N is 4th from the bottom.",
"'Only two boxes are between N and P' → P is 3 places above or below N; check both."
]
},
{
"h": "Matching table",
"list": [
"Make a grid: people in rows, items in columns.",
"Put ✓ for sure facts and ✗ for 'not' facts.",
"When a row or column has only one empty cell left, it must be ✓."
]
}
],
"formulas": [
[
"k boxes below X",
"X is at place k + 1 from the bottom"
],
[
"k boxes between X and Y",
"their places differ by k + 1"
],
[
"Only Z above Y",
"Y is second from the top"
],
[
"Boxes above X",
"total − X's place from the bottom"
],
[
"Two possible places",
"write both cases and test the other clues"
]
],
"examples": [
{
"q": "Six boxes A, B, C, D, E and F are kept one above the other. Only two boxes are below C. Only one box is between C and E. E is not at the bottom. A is kept just above E. F is kept somewhere below B. D is kept just above F. Which box is at the top, and which box is just below C?",
"s": [
"C is 3rd from the bottom; E is 2 places away, so E is 1st or 5th. E is not at the bottom, so E = 5",
"A is just above E, so A = 6. Places 1, 2 and 4 are left for B, D and F",
"D is just above F and F is below B, so F = 1, D = 2, B = 4. From the bottom: F, D, C, B, E, A"
],
"a": "A is at the top; D is just below C"
},
{
"q": "Amit, Bina and Charu each like a different fruit: mango, apple or banana. Amit does not like mango or banana. Bina does not like mango. Who likes mango?",
"s": [
"Amit is not mango or banana, so Amit likes apple",
"Bina is not mango, and apple is taken, so Bina likes banana",
"Charu likes mango"
],
"a": "Charu"
},
{
"q": "P is heavier than Q but lighter than R. S is heavier than R. Who is the second heaviest?",
"s": [
"P > Q and R > P, so R > P > Q",
"S > R, so S > R > P > Q",
"Second heaviest = R"
],
"a": "R"
}
],
"tricks": [
"Fix the clue that gives an exact place first ('only three below').",
"For 'between' clues, try both up and down, and strike out the case that breaks a later clue.",
"In a grid, ✗ marks are as useful as ✓ marks.",
"Use the options: sometimes testing each option is faster.",
"Read every clue again with your final arrangement."
],
"mistakes": [
"Counting the box itself in 'boxes below'.",
"Taking only one case for a 'between' clue.",
"Mixing 'just above' (next to) with 'somewhere above'.",
"Not checking the final arrangement against all the clues."
]
},
"hi": {
"intro": "पहेली में लोगों, डिब्बों, मंज़िलों या दिनों के बारे में कई संकेत दिए जाते हैं, और पूरा क्रम निकालना होता है। तालिका या ऊपर-नीचे का ढेर बनाएँ और पहले पक्के संकेत भरें।",
"concepts": [
{
"h": "RRB में आने वाले प्रकार",
"list": [
"एक के ऊपर एक रखे डिब्बे या मंज़िलें।",
"लोगों को दिन, रंग या शहर से मिलाना (मिलान तालिका)।",
"तुलना वाली पहेलियाँ: कौन भारी, लंबा या बड़ा है।"
]
},
{
"h": "एक के ऊपर एक डिब्बे",
"list": [
"नीचे से (1) ऊपर तक जगहों को नंबर दें।",
"'N के नीचे सिर्फ़ तीन डिब्बे हैं' → N नीचे से 4था है।",
"'N और P के बीच सिर्फ़ दो डिब्बे हैं' → P, N से 3 जगह ऊपर या नीचे है; दोनों जाँचें।"
]
},
{
"h": "मिलान तालिका",
"list": [
"ग्रिड बनाएँ: लाइनों में लोग, कॉलम में चीज़ें।",
"पक्की बात के लिए ✓ और 'नहीं' वाली बात के लिए ✗ लगाएँ।",
"किसी लाइन या कॉलम में सिर्फ़ एक ख़ाली खाना बचे, तो वहाँ ✓ होगा।"
]
}
],
"formulas": [
[
"X के नीचे k डिब्बे",
"X नीचे से k + 1 वीं जगह पर"
],
[
"X और Y के बीच k डिब्बे",
"दोनों की जगह में k + 1 का अंतर"
],
[
"Y के ऊपर सिर्फ़ Z",
"Y ऊपर से दूसरा"
],
[
"X के ऊपर डिब्बे",
"कुल − नीचे से X की जगह"
],
[
"दो संभव जगहें",
"दोनों मामले लिखें और बाकी संकेतों से जाँचें"
]
],
"examples": [
{
"q": "छह डिब्बे A, B, C, D, E और F एक के ऊपर एक रखे हैं। C के नीचे सिर्फ़ दो डिब्बे हैं। C और E के बीच सिर्फ़ एक डिब्बा है। E सबसे नीचे नहीं है। A, E के ठीक ऊपर है। F, B से कहीं नीचे है। D, F के ठीक ऊपर है। सबसे ऊपर कौन-सा डिब्बा है, और C के ठीक नीचे कौन-सा है?",
"s": [
"C नीचे से 3रा है; E उससे 2 जगह दूर है, तो E पहली या 5वीं जगह पर। E सबसे नीचे नहीं है, तो E = 5",
"A, E के ठीक ऊपर है, तो A = 6। B, D और F के लिए जगह 1, 2 और 4 बचीं",
"D, F के ठीक ऊपर और F, B से नीचे है, तो F = 1, D = 2, B = 4। नीचे से: F, D, C, B, E, A"
],
"a": "सबसे ऊपर A; C के ठीक नीचे D"
},
{
"q": "अमित, बीना और चारु को अलग-अलग फल पसंद हैं: आम, सेब या केला। अमित को आम या केला पसंद नहीं। बीना को आम पसंद नहीं। आम किसे पसंद है?",
"s": [
"अमित को आम या केला नहीं, तो अमित को सेब",
"बीना को आम नहीं और सेब जा चुका, तो बीना को केला",
"चारु को आम"
],
"a": "चारु"
},
{
"q": "P, Q से भारी है पर R से हल्का है। S, R से भारी है। दूसरा सबसे भारी कौन है?",
"s": [
"P > Q और R > P, तो R > P > Q",
"S > R, तो S > R > P > Q",
"दूसरा सबसे भारी = R"
],
"a": "R"
}
],
"tricks": [
"पहले वह संकेत लगाएँ जो पक्की जगह देता है ('नीचे सिर्फ़ तीन')।",
"'बीच में' वाले संकेत में ऊपर और नीचे दोनों आज़माएँ, और जो मामला बाद के संकेत से टूटे उसे काट दें।",
"ग्रिड में ✗ के निशान भी ✓ जितने ही काम के हैं।",
"विकल्पों का इस्तेमाल करें: कभी-कभी हर विकल्प जाँचना ज़्यादा जल्दी होता है।",
"आख़िरी क्रम के साथ हर संकेत दोबारा पढ़ें।"
],
"mistakes": [
"'नीचे के डिब्बों' में उस डिब्बे को भी गिन लेना।",
"'बीच में' वाले संकेत का सिर्फ़ एक मामला लेना।",
"'ठीक ऊपर' (बगल में) और 'कहीं ऊपर' में गड़बड़।",
"आख़िरी क्रम को सारे संकेतों से न मिलाना।"
]
}
});
