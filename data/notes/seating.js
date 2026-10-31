// Revision note: seating (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "seating",
"en": {
"intro": "Seating arrangement gives clues about people sitting in a row or around a table. Draw the seats first, fix the sure clues, and fill the rest one by one.",
"concepts": [
{
"h": "In a row (linear)",
"list": [
"If people face North, their right is your right; if they face South, their right is your left.",
"'Second to the right of A' means skip one seat on A's right.",
"The two end seats have only one neighbour each."
]
},
{
"h": "Around a table (circular)",
"list": [
"Facing the centre: right = anticlockwise, left = clockwise.",
"Facing outside: right = clockwise, left = anticlockwise.",
"With an even number n of seats, the person opposite is n ÷ 2 seats away."
]
},
{
"h": "How to solve",
"list": [
"Start with a definite clue (A sits at an end, B is opposite C).",
"If a clue gives two choices, draw both and cut one later.",
"Use 'not' clues (X does not sit next to Y) at the end."
]
}
],
"formulas": [
[
"Row facing North",
"the person's right = your right"
],
[
"Row facing South",
"the person's right = your left"
],
[
"Circle facing the centre",
"right = anticlockwise"
],
[
"Circle facing outside",
"right = clockwise"
],
[
"People between seats a and b in a row",
"(b − a) − 1"
],
[
"Circle of n, k-th to the right",
"same as (n − k)-th to the left"
]
],
"examples": [
{
"q": "P, Q, R, S and T sit in a row facing North. Q sits in the middle. R is second to the right of Q. P sits to the immediate left of Q. T does not sit at an end. Who sits at the left end?",
"s": [
"Seats 1 to 5 from the left: Q = 3, R = 5 (second to the right of Q), P = 2",
"S and T are left for seats 1 and 4",
"T is not at an end, so T = 4 and S = 1"
],
"a": "S"
},
{
"q": "Six people A, B, C, D, E and F sit around a round table facing the centre. A is opposite D. B is to the immediate right of A. C is to the immediate left of D. E does not sit next to A. Who sits to the immediate left of A?",
"s": [
"Facing the centre, right is anticlockwise. Put A, then B to the immediate right of A, and D opposite A",
"C is to the immediate left of D; the two empty seats are A's immediate left and the seat between it and D",
"E is not next to A, so E takes the seat next to C, and F sits to the immediate left of A"
],
"a": "F"
},
{
"q": "Seven children sit in a row facing North. How many children sit between the child who is 2nd from the left and the child who is 2nd from the right?",
"s": [
"2nd from the right in a row of 7 = 7 − 2 + 1 = 6th from the left",
"Between seat 2 and seat 6: (6 − 2) − 1",
"= 3"
],
"a": "3"
}
],
"tricks": [
"Draw the seats first (a line or a circle) before reading all the clues.",
"In a circle facing the centre, think 'right hand = anticlockwise'.",
"Start with the clues that fix a person exactly.",
"When two cases come up, keep both; a later clue usually cuts one.",
"Check the final picture against every clue before answering."
],
"mistakes": [
"Mixing your right with the right of a person who faces South.",
"Taking right as clockwise when people face the centre.",
"Taking 'second to the right' as the very next person.",
"Answering before checking every clue."
]
},
"hi": {
"intro": "बैठने के क्रम में लाइन में या मेज़ के चारों ओर बैठे लोगों के बारे में संकेत दिए जाते हैं। पहले सीटें बनाएँ, पक्के संकेत लगाएँ, फिर बाकी एक-एक करके भरें।",
"concepts": [
{
"h": "एक लाइन में",
"list": [
"लोगों का मुँह उत्तर की ओर हो तो उनका दायाँ आपका दायाँ है; दक्षिण की ओर हो तो उनका दायाँ आपका बायाँ है।",
"'A के दाएँ दूसरा' यानी A के दाईं तरफ़ एक सीट छोड़कर।",
"दोनों किनारे वाली सीटों के पास सिर्फ़ एक पड़ोसी होता है।"
]
},
{
"h": "गोल मेज़ के चारों ओर",
"list": [
"मुँह केंद्र की ओर: दायाँ = घड़ी की उल्टी दिशा, बायाँ = घड़ी की दिशा।",
"मुँह बाहर की ओर: दायाँ = घड़ी की दिशा, बायाँ = घड़ी की उल्टी दिशा।",
"सीटें n (सम) हों, तो ठीक सामने वाला n ÷ 2 सीट दूर होता है।"
]
},
{
"h": "कैसे हल करें",
"list": [
"पक्के संकेत से शुरू करें (A किनारे पर है, B, C के सामने है)।",
"किसी संकेत से दो रास्ते बनें तो दोनों बनाएँ, बाद में एक कट जाएगा।",
"'नहीं' वाले संकेत (X, Y के पास नहीं है) आख़िर में लगाएँ।"
]
}
],
"formulas": [
[
"लाइन, मुँह उत्तर की ओर",
"व्यक्ति का दायाँ = आपका दायाँ"
],
[
"लाइन, मुँह दक्षिण की ओर",
"व्यक्ति का दायाँ = आपका बायाँ"
],
[
"गोला, मुँह केंद्र की ओर",
"दायाँ = घड़ी की उल्टी दिशा"
],
[
"गोला, मुँह बाहर की ओर",
"दायाँ = घड़ी की दिशा"
],
[
"लाइन में सीट a और b के बीच लोग",
"(b − a) − 1"
],
[
"n लोगों के गोले में दाएँ k-वाँ",
"बाएँ (n − k)-वें जैसा"
]
],
"examples": [
{
"q": "P, Q, R, S और T एक लाइन में उत्तर की ओर मुँह करके बैठे हैं। Q बीच में है। R, Q के दाएँ दूसरा है। P, Q के ठीक बाएँ है। T किनारे पर नहीं है। सबसे बाएँ किनारे पर कौन है?",
"s": [
"बाएँ से सीट 1 से 5: Q = 3, R = 5 (Q के दाएँ दूसरा), P = 2",
"S और T के लिए सीट 1 और 4 बचीं",
"T किनारे पर नहीं है, तो T = 4 और S = 1"
],
"a": "S"
},
{
"q": "छह लोग A, B, C, D, E और F एक गोल मेज़ के चारों ओर केंद्र की ओर मुँह करके बैठे हैं। A, D के सामने है। B, A के ठीक दाएँ है। C, D के ठीक बाएँ है। E, A के पास नहीं बैठा। A के ठीक बाएँ कौन है?",
"s": [
"केंद्र की ओर मुँह में दायाँ = घड़ी की उल्टी दिशा। A रखें, B को A के ठीक दाएँ, और D को A के सामने",
"C, D के ठीक बाएँ है; दो ख़ाली सीटें हैं: A के ठीक बाएँ वाली और उसके व D के बीच वाली",
"E, A के पास नहीं है, तो E, C के बगल वाली सीट पर और F, A के ठीक बाएँ है"
],
"a": "F"
},
{
"q": "सात बच्चे एक लाइन में उत्तर की ओर मुँह करके बैठे हैं। बाएँ से दूसरे और दाएँ से दूसरे बच्चे के बीच कितने बच्चे हैं?",
"s": [
"7 की लाइन में दाएँ से दूसरा = 7 − 2 + 1 = बाएँ से 6वाँ",
"सीट 2 और सीट 6 के बीच: (6 − 2) − 1",
"= 3"
],
"a": "3"
}
],
"tricks": [
"सारे संकेत पढ़ने से पहले सीटें बना लें (लाइन या गोला)।",
"केंद्र की ओर मुँह वाले गोले में सोचें 'दायाँ हाथ = घड़ी की उल्टी दिशा'।",
"पहले वे संकेत लगाएँ जो किसी को पक्की जगह देते हैं।",
"दो रास्ते बनें तो दोनों रखें; बाद का कोई संकेत एक को काट देगा।",
"उत्तर देने से पहले आख़िरी चित्र को हर संकेत से मिलाएँ।"
],
"mistakes": [
"दक्षिण की ओर मुँह वाले व्यक्ति का दायाँ अपना दायाँ मान लेना।",
"केंद्र की ओर मुँह होने पर दायाँ घड़ी की दिशा में लेना।",
"'दाएँ दूसरा' को ठीक बगल वाला मान लेना।",
"हर संकेत जाँचे बिना उत्तर दे देना।"
]
}
});
