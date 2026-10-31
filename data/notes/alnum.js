// Revision note: alnum (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "alnum",
"en": {
"intro": "A long line of numbers, letters and symbols is given. You count positions or find elements that meet a condition. Read the condition slowly and mark the line.",
"concepts": [
{
"h": "Position from left and right",
"list": [
"Position from right = total − position from left + 1.",
"'5th to the left of the 12th from the left' = (12 − 5) = 7th from the left.",
"'5th to the right of the 12th from the left' = (12 + 5) = 17th from the left."
]
},
{
"h": "Immediately before / after",
"list": [
"'Immediately preceded by X' means X is just before it (on its left).",
"'Immediately followed by Y' means Y is just after it (on its right).",
"Check each element one by one and tick the ones that match."
]
},
{
"h": "Dropping elements",
"list": [
"If the question says 'all numbers are dropped', first rewrite the series without them.",
"Then count positions in the new series.",
"Counting is from left to right unless the question says otherwise."
]
}
],
"formulas": [
[
"Position from right",
"total − left position + 1"
],
[
"k to the left of the n-th from left",
"(n − k)-th from left"
],
[
"k to the right of the n-th from left",
"(n + k)-th from left"
],
[
"k to the left of the n-th from right",
"(n + k)-th from right"
],
[
"k to the right of the n-th from right",
"(n − k)-th from right"
],
[
"Middle element (total N is odd)",
"(N + 1) ÷ 2 th from either end"
]
],
"examples": [
{
"q": "Series: 4 # A 7 % B 9 @ 2 C & 5 $ D 8 * 3\nWhich element is 4th to the left of the 12th element from the left?",
"s": [
"4th to the left of the 12th from the left = (12 − 4) = 8th from the left",
"Count: 4, #, A, 7, %, B, 9, @",
"8th from the left is @"
],
"a": "@"
},
{
"q": "In the same series, how many symbols are immediately followed by a number?",
"s": [
"Symbols and the element just after them: # A, % B, @ 2, & 5, $ D, * 3",
"Followed by a number: @ 2, & 5, * 3",
"So there are 3 such symbols"
],
"a": "3"
},
{
"q": "If all the letters are dropped from the same series, which element will be 5th from the right?",
"s": [
"New series: 4 # 7 % 9 @ 2 & 5 $ 8 * 3 (13 elements)",
"5th from the right = 13 − 5 + 1 = 9th from the left",
"9th from the left is 5"
],
"a": "5"
}
],
"tricks": [
"Write position numbers under the series before you start.",
"Change 'from right' to 'from left' with total + 1 − position.",
"For 'preceded by a number and followed by a symbol', look only at the middle type of element.",
"Drop elements on paper first, then count; do not count in your head.",
"Underline the condition words: preceded = before, followed = after."
],
"mistakes": [
"Mixing up 'preceded' (before) and 'followed' (after).",
"Counting from the wrong end.",
"Counting the starting element itself when moving k places.",
"Forgetting to count again after dropping elements."
]
},
"hi": {
"intro": "संख्याओं, अक्षरों और चिह्नों की एक लंबी लाइन दी जाती है। स्थान गिनने होते हैं या ऐसे तत्व खोजने होते हैं जो शर्त पूरी करें। शर्त धीरे पढ़ें और लाइन पर निशान लगाएँ।",
"concepts": [
{
"h": "बाएँ और दाएँ से स्थान",
"list": [
"दाएँ से स्थान = कुल − बाएँ से स्थान + 1।",
"'बाएँ से 12वें के बाएँ 5वाँ' = (12 − 5) = बाएँ से 7वाँ।",
"'बाएँ से 12वें के दाएँ 5वाँ' = (12 + 5) = बाएँ से 17वाँ।"
]
},
{
"h": "ठीक पहले / ठीक बाद",
"list": [
"'ठीक पहले X है' यानी X उसके ठीक बाएँ है।",
"'ठीक बाद Y है' यानी Y उसके ठीक दाएँ है।",
"हर तत्व को एक-एक करके जाँचें और जो फ़िट हों उन पर ✓ लगाएँ।"
]
},
{
"h": "तत्व हटाना",
"list": [
"प्रश्न कहे 'सभी संख्याएँ हटा दी जाएँ', तो पहले उनके बिना नई सीरीज़ लिखें।",
"फिर नई सीरीज़ में स्थान गिनें।",
"जब तक प्रश्न में कुछ और न लिखा हो, गिनती बाएँ से दाएँ करें।"
]
}
],
"formulas": [
[
"दाएँ से स्थान",
"कुल − बाएँ से स्थान + 1"
],
[
"बाएँ से n-वें के बाएँ k-वाँ",
"बाएँ से (n − k)-वाँ"
],
[
"बाएँ से n-वें के दाएँ k-वाँ",
"बाएँ से (n + k)-वाँ"
],
[
"दाएँ से n-वें के बाएँ k-वाँ",
"दाएँ से (n + k)-वाँ"
],
[
"दाएँ से n-वें के दाएँ k-वाँ",
"दाएँ से (n − k)-वाँ"
],
[
"बीच वाला तत्व (कुल N विषम)",
"किसी भी तरफ़ से (N + 1) ÷ 2 वाँ"
]
],
"examples": [
{
"q": "सीरीज़: 4 # A 7 % B 9 @ 2 C & 5 $ D 8 * 3\nबाएँ से 12वें तत्व के बाएँ 4था तत्व कौन-सा है?",
"s": [
"बाएँ से 12वें के बाएँ 4था = (12 − 4) = बाएँ से 8वाँ",
"गिनें: 4, #, A, 7, %, B, 9, @",
"बाएँ से 8वाँ @ है"
],
"a": "@"
},
{
"q": "इसी सीरीज़ में कितने चिह्नों के ठीक बाद एक संख्या है?",
"s": [
"चिह्न और उनके ठीक बाद वाला तत्व: # A, % B, @ 2, & 5, $ D, * 3",
"जिनके बाद संख्या है: @ 2, & 5, * 3",
"तो ऐसे 3 चिह्न हैं"
],
"a": "3"
},
{
"q": "इसी सीरीज़ से सभी अक्षर हटा दिए जाएँ, तो दाएँ से 5वाँ तत्व कौन-सा होगा?",
"s": [
"नई सीरीज़: 4 # 7 % 9 @ 2 & 5 $ 8 * 3 (13 तत्व)",
"दाएँ से 5वाँ = 13 − 5 + 1 = बाएँ से 9वाँ",
"बाएँ से 9वाँ 5 है"
],
"a": "5"
}
],
"tricks": [
"शुरू करने से पहले सीरीज़ के नीचे स्थान नंबर लिख लें।",
"'दाएँ से' को 'बाएँ से' में बदलें: कुल + 1 − स्थान।",
"'पहले संख्या और बाद में चिह्न' जैसे प्रश्न में सिर्फ़ बीच वाले तरह के तत्व देखें।",
"पहले काग़ज़ पर तत्व हटाएँ, फिर गिनें; मन में न गिनें।",
"शर्त वाले शब्दों पर लाइन खींचें: पहले = बाएँ, बाद = दाएँ।"
],
"mistakes": [
"'ठीक पहले' और 'ठीक बाद' में गड़बड़।",
"गलत तरफ़ से गिनना।",
"k स्थान खिसकते समय शुरू वाले तत्व को भी गिन लेना।",
"तत्व हटाने के बाद दोबारा न गिनना।"
]
}
});
