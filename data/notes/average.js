// Revision note: average (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "average",
"en": {
"intro": "Average questions become quick when you think 'total = average × number'. Basic mean, median and mode are also asked.",
"concepts": [
{
"h": "Average (mean)",
"list": [
"Average = sum of the values ÷ number of values.",
"Total = average × number. Most questions are solved by finding totals.",
"If every value goes up by k, the average also goes up by k (the same is true for ×, ÷ and −)."
]
},
{
"h": "Median and mode",
"list": [
"Median: arrange the values in order; it is the middle value (odd count) or the average of the two middle values (even count).",
"Mode: the value that comes most often.",
"Range = largest value − smallest value."
]
},
{
"h": "Consecutive numbers",
"list": [
"Average of consecutive numbers = (first + last) ÷ 2.",
"Average of the first n natural numbers = (n + 1) ÷ 2.",
"Average of the first n even numbers = n + 1; of the first n odd numbers = n."
]
}
],
"formulas": [
[
"Average",
"sum ÷ number"
],
[
"Combined average of two groups",
"(n₁a₁ + n₂a₂) ÷ (n₁ + n₂)"
],
[
"New person replaces one in a group of n, average goes up by d",
"new person = old person + n × d"
],
[
"A person joins a group of n, average goes up by d",
"new person = old average + (n + 1) × d"
],
[
"Average speed, equal distances at x and y",
"2xy ÷ (x + y)"
],
[
"Average of the first n natural numbers",
"(n + 1) ÷ 2"
],
[
"Average of squares of the first n natural numbers",
"(n + 1)(2n + 1) ÷ 6"
],
[
"Mean, median and mode (rough rule)",
"Mode = 3 × Median − 2 × Mean"
],
[
"One value read wrongly",
"change in average = (correct value − wrong value) ÷ n"
]
],
"examples": [
{
"q": "The average of 5 numbers is 24. If one number is removed, the average of the rest becomes 22. Find the removed number.",
"s": [
"Total of 5 = 5 × 24 = 120",
"Total of 4 = 4 × 22 = 88",
"Removed number = 120 − 88 = 32"
],
"a": "32"
},
{
"q": "The average age of 30 students is 14 years. When the teacher's age is added, the average becomes 15 years. Find the teacher's age.",
"s": [
"Teacher = old average + (n + 1) × rise",
"= 14 + 31 × 1",
"= 45 years (check: 31 × 15 − 30 × 14 = 465 − 420 = 45)"
],
"a": "45 years"
},
{
"q": "Find the median of 7, 3, 9, 12, 5, 10.",
"s": [
"Arrange in order: 3, 5, 7, 9, 10, 12 (6 values)",
"The two middle values are 7 and 9",
"Median = (7 + 9) ÷ 2 = 8"
],
"a": "8"
}
],
"tricks": [
"Use a base value: average of 47, 52, 49, 56 → take 50; differences −3, +2, −1, +6 add to +4; 4 ÷ 4 = 1; average = 51.",
"For consecutive numbers, the average is simply the middle number (or the middle of the two middle numbers).",
"Average speed for equal distances is never the simple average: 40 and 60 km/h give 48 km/h, not 50.",
"If one value was read wrongly, change in average = (correct − wrong) ÷ n.",
"Average of the first 50 natural numbers = 51 ÷ 2 = 25.5."
],
"mistakes": [
"Adding the averages of two groups of different sizes and dividing by 2.",
"Finding the median without arranging the values in order.",
"Using n instead of n + 1 when a person joins the group.",
"Taking the simple average of two speeds for equal distances."
]
},
"hi": {
"intro": "औसत के प्रश्न तब जल्दी होते हैं जब आप सोचें 'कुल = औसत × संख्या'। माध्य, माध्यिका और बहुलक के आसान प्रश्न भी आते हैं।",
"concepts": [
{
"h": "औसत (माध्य)",
"list": [
"औसत = सभी मानों का जोड़ ÷ मानों की संख्या।",
"कुल = औसत × संख्या। ज़्यादातर प्रश्न कुल निकालकर ही हल होते हैं।",
"हर मान k बढ़े तो औसत भी k बढ़ता है (×, ÷ और − पर भी यही नियम)।"
]
},
{
"h": "माध्यिका और बहुलक",
"list": [
"माध्यिका: मानों को क्रम में लगाएँ; बीच वाला मान (संख्या विषम हो) या बीच वाले दो मानों का औसत (संख्या सम हो)।",
"बहुलक: जो मान सबसे ज़्यादा बार आए।",
"परिसर (रेंज) = सबसे बड़ा मान − सबसे छोटा मान।"
]
},
{
"h": "लगातार संख्याएँ",
"list": [
"लगातार संख्याओं का औसत = (पहली + आख़िरी) ÷ 2।",
"पहली n प्राकृत संख्याओं का औसत = (n + 1) ÷ 2।",
"पहली n सम संख्याओं का औसत = n + 1; पहली n विषम संख्याओं का औसत = n।"
]
}
],
"formulas": [
[
"औसत",
"जोड़ ÷ संख्या"
],
[
"दो समूहों का मिला हुआ औसत",
"(n₁a₁ + n₂a₂) ÷ (n₁ + n₂)"
],
[
"n लोगों के समूह में एक की जगह नया आए, औसत d बढ़े",
"नया व्यक्ति = पुराना व्यक्ति + n × d"
],
[
"n लोगों के समूह में एक नया जुड़े, औसत d बढ़े",
"नया व्यक्ति = पुराना औसत + (n + 1) × d"
],
[
"बराबर दूरी x और y चाल से, औसत चाल",
"2xy ÷ (x + y)"
],
[
"पहली n प्राकृत संख्याओं का औसत",
"(n + 1) ÷ 2"
],
[
"पहली n प्राकृत संख्याओं के वर्गों का औसत",
"(n + 1)(2n + 1) ÷ 6"
],
[
"माध्य, माध्यिका और बहुलक (मोटा नियम)",
"बहुलक = 3 × माध्यिका − 2 × माध्य"
],
[
"एक मान गलत पढ़ा गया",
"औसत में बदलाव = (सही मान − गलत मान) ÷ n"
]
],
"examples": [
{
"q": "5 संख्याओं का औसत 24 है। एक संख्या हटाने पर बाकी का औसत 22 हो जाता है। हटाई गई संख्या ज्ञात कीजिए।",
"s": [
"5 का कुल = 5 × 24 = 120",
"4 का कुल = 4 × 22 = 88",
"हटाई गई संख्या = 120 − 88 = 32"
],
"a": "32"
},
{
"q": "30 छात्रों की औसत आयु 14 साल है। टीचर की आयु जोड़ने पर औसत 15 साल हो जाता है। टीचर की आयु ज्ञात कीजिए।",
"s": [
"टीचर = पुराना औसत + (n + 1) × बढ़ोतरी",
"= 14 + 31 × 1",
"= 45 साल (जाँच: 31 × 15 − 30 × 14 = 465 − 420 = 45)"
],
"a": "45 साल"
},
{
"q": "7, 3, 9, 12, 5, 10 की माध्यिका ज्ञात कीजिए।",
"s": [
"क्रम में लगाएँ: 3, 5, 7, 9, 10, 12 (6 मान)",
"बीच वाले दो मान 7 और 9 हैं",
"माध्यिका = (7 + 9) ÷ 2 = 8"
],
"a": "8"
}
],
"tricks": [
"एक आधार मान लें: 47, 52, 49, 56 का औसत → 50 लें; अंतर −3, +2, −1, +6 का जोड़ +4; 4 ÷ 4 = 1; औसत = 51।",
"लगातार संख्याओं का औसत सीधे बीच वाली संख्या है (या बीच वाली दो संख्याओं का बीच)।",
"बराबर दूरी की औसत चाल कभी सीधा औसत नहीं होती: 40 और 60 km/h से 48 km/h, 50 नहीं।",
"अगर एक मान गलत पढ़ा गया, तो औसत में बदलाव = (सही − गलत) ÷ n।",
"पहली 50 प्राकृत संख्याओं का औसत = 51 ÷ 2 = 25.5।"
],
"mistakes": [
"अलग-अलग साइज़ के दो समूहों के औसत जोड़कर 2 से भाग देना।",
"मानों को क्रम में लगाए बिना माध्यिका निकालना।",
"समूह में नया व्यक्ति जुड़े तो n + 1 की जगह n लेना।",
"बराबर दूरी के लिए दो चालों का सीधा औसत लेना।"
]
}
});
