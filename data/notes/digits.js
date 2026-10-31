// Revision note: digits (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "digits",
"en": {
"intro": "These questions give a number (or a few 3-digit numbers) and ask you to rearrange digits, change them by a rule, or work with certain digits. Write the new number down at every step.",
"concepts": [
{
"h": "Arranging digits",
"list": [
"Ascending order: smallest to largest from the left (1234678).",
"Descending order: largest to smallest from the left.",
"After arranging, pick digits from the new number, not the old one."
]
},
{
"h": "Changing digits by a rule",
"list": [
"'Add 1 to each odd digit' → change only the odd digits; even digits stay the same.",
"Do the change digit by digit and write the new number below the old one.",
"Then answer the question (count, sum, position) from the new number."
]
},
{
"h": "Groups of 3-digit numbers",
"list": [
"A rule like 'swap the first and third digits' is applied to each number separately.",
"To find the largest or second smallest, arrange the new numbers in order.",
"'Difference of digits' is usually larger − smaller."
]
}
],
"formulas": [
[
"Ascending",
"smallest digit first"
],
[
"Descending",
"largest digit first"
],
[
"k-th from left in an N-digit number",
"= (N − k + 1)-th from right"
],
[
"Odd digits",
"1, 3, 5, 7, 9"
],
[
"Even digits",
"0, 2, 4, 6, 8"
],
[
"Prime digits",
"2, 3, 5, 7 (1 is not prime)"
],
[
"Perfect square digits",
"0, 1, 4, 9"
]
],
"examples": [
{
"q": "The digits of 5829163 are arranged in ascending order. What is the sum of the digits that are second from the left and second from the right in the new number?",
"s": [
"Ascending order: 1235689",
"Second from the left = 2, second from the right = 8",
"2 + 8 = 10"
],
"a": "10"
},
{
"q": "In 7346281, 1 is added to each odd digit and 1 is subtracted from each even digit. How many digits of the new number are even?",
"s": [
"7 → 8, 3 → 4, 4 → 3, 6 → 5, 2 → 1, 8 → 7, 1 → 2",
"New number: 8435172",
"Even digits: 8, 4, 2, so the count is 3"
],
"a": "3"
},
{
"q": "Numbers: 473, 829, 516, 362, 958. If the first and third digits of each number are swapped, which number becomes the largest?",
"s": [
"New numbers: 374, 928, 615, 263, 859",
"The largest new number is 928",
"It came from 829"
],
"a": "829 (it becomes 928)"
}
],
"tricks": [
"Write the new number below the old one; most mistakes happen when it is done in the head.",
"For 'how many digits …', put a tick on each digit that fits and count the ticks.",
"When digits of 3-digit numbers are swapped, the new first digit decides the order.",
"Remember: 1 is not prime, and 0 is even.",
"Read 'from the left' and 'from the right' carefully before picking digits."
],
"mistakes": [
"Treating 1 as a prime number.",
"Forgetting that 0 is an even number.",
"Changing digits that the rule did not mention.",
"Picking a digit from the old number instead of the new one."
]
},
"hi": {
"intro": "इन प्रश्नों में एक संख्या (या कुछ तीन अंकों वाली संख्याएँ) दी जाती हैं और अंकों को क्रम में लगाने, किसी नियम से बदलने या कुछ खास अंकों पर काम करने को कहा जाता है। हर कदम पर नई संख्या लिखें।",
"concepts": [
{
"h": "अंकों को क्रम में लगाना",
"list": [
"बढ़ता क्रम (आरोही): बाएँ से सबसे छोटा से सबसे बड़ा (1234678)।",
"घटता क्रम (अवरोही): बाएँ से सबसे बड़ा से सबसे छोटा।",
"क्रम में लगाने के बाद अंक नई संख्या से चुनें, पुरानी से नहीं।"
]
},
{
"h": "नियम से अंक बदलना",
"list": [
"'हर विषम अंक में 1 जोड़ें' → सिर्फ़ विषम अंक बदलें; सम अंक वैसे ही रहें।",
"एक-एक अंक बदलें और नई संख्या पुरानी के नीचे लिखें।",
"फिर प्रश्न का उत्तर (गिनती, जोड़, स्थान) नई संख्या से दें।"
]
},
{
"h": "तीन अंकों वाली संख्याओं के समूह",
"list": [
"'पहला और तीसरा अंक आपस में बदलें' जैसा नियम हर संख्या पर अलग से लगता है।",
"सबसे बड़ी या दूसरी सबसे छोटी के लिए नई संख्याओं को क्रम में लगाएँ।",
"'अंकों का अंतर' आमतौर पर बड़ा − छोटा होता है।"
]
}
],
"formulas": [
[
"बढ़ता क्रम",
"सबसे छोटा अंक पहले"
],
[
"घटता क्रम",
"सबसे बड़ा अंक पहले"
],
[
"N अंकों वाली संख्या में बाएँ से k-वाँ",
"= दाएँ से (N − k + 1)-वाँ"
],
[
"विषम अंक",
"1, 3, 5, 7, 9"
],
[
"सम अंक",
"0, 2, 4, 6, 8"
],
[
"अभाज्य अंक",
"2, 3, 5, 7 (1 अभाज्य नहीं है)"
],
[
"पूर्ण वर्ग अंक",
"0, 1, 4, 9"
]
],
"examples": [
{
"q": "5829163 के अंकों को बढ़ते क्रम में लगाया गया। नई संख्या में बाएँ से दूसरे और दाएँ से दूसरे अंक का जोड़ क्या है?",
"s": [
"बढ़ता क्रम: 1235689",
"बाएँ से दूसरा = 2, दाएँ से दूसरा = 8",
"2 + 8 = 10"
],
"a": "10"
},
{
"q": "7346281 में हर विषम अंक में 1 जोड़ा गया और हर सम अंक में से 1 घटाया गया। नई संख्या में कितने अंक सम हैं?",
"s": [
"7 → 8, 3 → 4, 4 → 3, 6 → 5, 2 → 1, 8 → 7, 1 → 2",
"नई संख्या: 8435172",
"सम अंक: 8, 4, 2, तो गिनती 3"
],
"a": "3"
},
{
"q": "संख्याएँ: 473, 829, 516, 362, 958। हर संख्या का पहला और तीसरा अंक आपस में बदल दिया जाए, तो कौन-सी संख्या सबसे बड़ी बनेगी?",
"s": [
"नई संख्याएँ: 374, 928, 615, 263, 859",
"सबसे बड़ी नई संख्या 928 है",
"यह 829 से बनी है"
],
"a": "829 (यह 928 बन जाती है)"
}
],
"tricks": [
"नई संख्या पुरानी के नीचे लिखें; ज़्यादातर गलतियाँ मन में करने से होती हैं।",
"'कितने अंक …' वाले प्रश्न में फ़िट होने वाले हर अंक पर ✓ लगाकर गिनें।",
"तीन अंकों की संख्याओं में अंक बदलने पर नया पहला अंक ही क्रम तय करता है।",
"याद रखें: 1 अभाज्य नहीं है, और 0 सम है।",
"अंक चुनने से पहले 'बाएँ से' और 'दाएँ से' ध्यान से पढ़ें।"
],
"mistakes": [
"1 को अभाज्य संख्या मान लेना।",
"भूल जाना कि 0 सम संख्या है।",
"ऐसे अंक बदल देना जिनका नियम में ज़िक्र नहीं था।",
"नई संख्या की जगह पुरानी संख्या से अंक उठा लेना।"
]
}
});
