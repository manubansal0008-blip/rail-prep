// Revision note: ranking (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "ranking",
"en": {
"intro": "Order and ranking questions ask about a person's place from the top or bottom, or from the left or right, in a row or class. Most of them use one rule: total = rank from left + rank from right − 1.",
"concepts": [
{
"h": "Rank from both ends",
"list": [
"Total = rank from left + rank from right − 1.",
"Rank from right = total − rank from left + 1.",
"The same works for top and bottom."
]
},
{
"h": "People between two persons",
"list": [
"If A is a-th and B is b-th from the same end, people between = (difference) − 1.",
"If A is a-th from the left and B is b-th from the right and they do not cross: between = total − (a + b).",
"If they cross (a + b is more than the total): between = a + b − total − 2."
]
},
{
"h": "Comparison (tallest, heaviest)",
"list": [
"Write people in order with > signs: A > B > C.",
"Join all the clues into one line.",
"Then read off the 2nd tallest, the lightest and so on."
]
}
],
"formulas": [
[
"Total",
"left rank + right rank − 1"
],
[
"Rank from right",
"total − left rank + 1"
],
[
"Between (a from left, b from right, no crossing)",
"total − (a + b)"
],
[
"Between (crossing, a + b > total)",
"a + b − total − 2"
],
[
"Two people swap places",
"change in one person's rank = number of places moved"
],
[
"Least number of people",
"when ranks cross, take the smallest total that fits all clues"
]
],
"examples": [
{
"q": "In a row, Rohan is 12th from the left and 17th from the right. How many people are there in the row?",
"s": [
"Total = left rank + right rank − 1",
"= 12 + 17 − 1",
"= 28"
],
"a": "28"
},
{
"q": "In a class of 40 students, Neha is 15th from the top. What is her rank from the bottom?",
"s": [
"Rank from bottom = total − rank from top + 1",
"= 40 − 15 + 1",
"= 26"
],
"a": "26th"
},
{
"q": "In a row of 30 people, A is 10th from the left and B is 12th from the right. How many people sit between A and B?",
"s": [
"10 + 12 = 22, which is less than 30, so they do not cross",
"Between = 30 − (10 + 12)",
"= 8 (check: B is 30 − 12 + 1 = 19th from the left; seats 11 to 18 = 8 people)"
],
"a": "8"
}
],
"tricks": [
"Draw a line and put the person on it with the ranks written on both sides.",
"Remember the '− 1': the person is counted from both ends.",
"In 'swap' questions, the change in one person's rank tells you the places moved; use it to find the total.",
"For tallest or shortest questions, write one chain like A > C > B > D.",
"If the question says 'at least how many', try the crossing case."
],
"mistakes": [
"Forgetting to subtract 1 (or add 1) in the total rule.",
"Using the rank from the top as the rank from the bottom.",
"Missing the crossing case when a + b is more than the total.",
"Writing the comparison chain the wrong way round."
]
},
"hi": {
"intro": "क्रम और रैंकिंग के प्रश्नों में किसी व्यक्ति का स्थान ऊपर-नीचे या बाएँ-दाएँ से पूछा जाता है। ज़्यादातर प्रश्न एक ही नियम से हल होते हैं: कुल = बाएँ से रैंक + दाएँ से रैंक − 1।",
"concepts": [
{
"h": "दोनों तरफ़ से रैंक",
"list": [
"कुल = बाएँ से रैंक + दाएँ से रैंक − 1।",
"दाएँ से रैंक = कुल − बाएँ से रैंक + 1।",
"ऊपर और नीचे के लिए भी यही नियम है।"
]
},
{
"h": "दो लोगों के बीच कितने",
"list": [
"अगर A और B एक ही तरफ़ से a-वें और b-वें हैं, तो बीच में = (अंतर) − 1।",
"अगर A बाएँ से a-वाँ और B दाएँ से b-वाँ है और वे एक-दूसरे को पार नहीं करते: बीच में = कुल − (a + b)।",
"अगर पार करते हैं (a + b कुल से ज़्यादा): बीच में = a + b − कुल − 2।"
]
},
{
"h": "तुलना (सबसे लंबा, सबसे भारी)",
"list": [
"लोगों को > चिह्न से क्रम में लिखें: A > B > C।",
"सारे संकेत जोड़कर एक ही लाइन बनाएँ।",
"फिर दूसरा सबसे लंबा, सबसे हल्का वगैरह पढ़ लें।"
]
}
],
"formulas": [
[
"कुल",
"बाएँ से रैंक + दाएँ से रैंक − 1"
],
[
"दाएँ से रैंक",
"कुल − बाएँ से रैंक + 1"
],
[
"बीच में (बाएँ से a, दाएँ से b, पार नहीं)",
"कुल − (a + b)"
],
[
"बीच में (पार करें, a + b > कुल)",
"a + b − कुल − 2"
],
[
"दो लोग जगह बदलें",
"एक व्यक्ति की रैंक में बदलाव = खिसके हुए स्थान"
],
[
"कम से कम कितने लोग",
"रैंक पार करें तो सबसे छोटा कुल लें जो सारे संकेतों पर फ़िट हो"
]
],
"examples": [
{
"q": "एक लाइन में रोहन बाएँ से 12वाँ और दाएँ से 17वाँ है। लाइन में कितने लोग हैं?",
"s": [
"कुल = बाएँ से रैंक + दाएँ से रैंक − 1",
"= 12 + 17 − 1",
"= 28"
],
"a": "28"
},
{
"q": "40 छात्रों की कक्षा में नेहा ऊपर से 15वीं है। नीचे से उसकी रैंक क्या है?",
"s": [
"नीचे से रैंक = कुल − ऊपर से रैंक + 1",
"= 40 − 15 + 1",
"= 26"
],
"a": "26वीं"
},
{
"q": "30 लोगों की लाइन में A बाएँ से 10वाँ और B दाएँ से 12वाँ है। A और B के बीच कितने लोग हैं?",
"s": [
"10 + 12 = 22, जो 30 से कम है, तो वे पार नहीं करते",
"बीच में = 30 − (10 + 12)",
"= 8 (जाँच: B बाएँ से 30 − 12 + 1 = 19वाँ; सीट 11 से 18 = 8 लोग)"
],
"a": "8"
}
],
"tricks": [
"एक लाइन बनाकर व्यक्ति को उस पर रखें और दोनों तरफ़ की रैंक लिखें।",
"'− 1' याद रखें: व्यक्ति दोनों तरफ़ से गिना जाता है।",
"जगह बदलने वाले प्रश्नों में एक व्यक्ति की रैंक का बदलाव बताता है कि कितने स्थान खिसके; इससे कुल निकालें।",
"सबसे लंबे या छोटे वाले प्रश्नों में एक ही कड़ी लिखें, जैसे A > C > B > D।",
"प्रश्न 'कम से कम कितने' पूछे, तो पार करने वाला मामला आज़माएँ।"
],
"mistakes": [
"कुल वाले नियम में 1 घटाना (या जोड़ना) भूल जाना।",
"ऊपर से रैंक को नीचे से रैंक मान लेना।",
"a + b कुल से ज़्यादा हो तब पार करने वाला मामला न देखना।",
"तुलना की कड़ी उल्टी लिख देना।"
]
}
});
