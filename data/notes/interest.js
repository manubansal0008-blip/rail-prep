// Revision note: interest (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "interest",
"en": {
"intro": "Simple Interest (SI) and Compound Interest (CI) come in almost every shift. Learn the basic formulas, the CI − SI shortcuts and the doubling rules.",
"concepts": [
{
"h": "Simple interest",
"list": [
"Interest is charged only on the original money (principal, P) every year.",
"So SI is the same every year.",
"Amount = Principal + Interest."
]
},
{
"h": "Compound interest",
"list": [
"At the end of each period the interest is added to the principal, and the next interest is on this new amount.",
"For 1 year (compounded yearly), SI and CI are equal.",
"Half-yearly: rate becomes R/2 and time becomes 2n. Quarterly: R/4 and 4n."
]
},
{
"h": "Total CI as % of the principal",
"table": [
[
"5% for 2 years",
"10.25%"
],
[
"10% for 2 years",
"21%"
],
[
"20% for 2 years",
"44%"
],
[
"10% for 3 years",
"33.1%"
]
]
}
],
"formulas": [
[
"Simple interest",
"SI = P × R × T ÷ 100"
],
[
"Amount at SI",
"A = P + SI = P × (100 + RT) ÷ 100"
],
[
"Compound amount",
"A = P(1 + R/100)^n"
],
[
"Compound interest",
"CI = A − P"
],
[
"CI − SI for 2 years",
"P × (R/100)^2"
],
[
"CI − SI for 3 years",
"P × (R/100)^2 × (3 + R/100)"
],
[
"Sum doubles in T years at SI",
"R = 100 ÷ T"
],
[
"Sum becomes n times at SI",
"R × T = (n − 1) × 100"
],
[
"Sum doubles in T years at CI",
"it becomes 4 times in 2T years and 8 times in 3T years"
],
[
"Half-yearly compounding",
"A = P(1 + R/200)^(2n)"
]
],
"examples": [
{
"q": "Find the simple interest on ₹5,000 at 8% per year for 3 years.",
"s": [
"SI = P × R × T ÷ 100",
"= 5000 × 8 × 3 ÷ 100",
"= ₹1,200"
],
"a": "₹1,200"
},
{
"q": "Find the compound interest on ₹10,000 at 10% per year for 2 years, compounded yearly.",
"s": [
"A = 10000 × (1.1)² = 10000 × 1.21",
"A = ₹12,100",
"CI = 12100 − 10000 = ₹2,100 (that is 21% of ₹10,000)"
],
"a": "₹2,100"
},
{
"q": "The difference between CI and SI on a sum for 2 years at 5% per year is ₹25. Find the sum.",
"s": [
"Difference = P × (R/100)²",
"25 = P × (5/100)² = P ÷ 400",
"P = 25 × 400 = ₹10,000"
],
"a": "₹10,000"
}
],
"tricks": [
"SI for 1 year = CI for 1 year (compounded yearly).",
"CI for 2 years at R% = 2R + R²/100 % of P: at 10% it is 21%, at 20% it is 44%.",
"Sum doubles in 8 years at SI → R = 100 ÷ 8 = 12.5%.",
"At CI, money that doubles in 5 years becomes 4 times in 10 years and 8 times in 15 years.",
"Year-wise CI at 10%: 10% of P in year 1, 11% in year 2, 12.1% in year 3. Add them for the total."
],
"mistakes": [
"Using the CI formula when the question says simple interest (or the opposite).",
"In half-yearly compounding, forgetting to halve the rate and double the time.",
"Giving the amount when the question asks for the interest.",
"Putting time in months into the SI formula; change it to years first (6 months = 1/2 year)."
]
},
"hi": {
"intro": "साधारण ब्याज (SI) और चक्रवृद्धि ब्याज (CI) लगभग हर शिफ़्ट में आते हैं। मूल सूत्र, CI − SI के शॉर्टकट और रकम दोगुनी होने वाले नियम याद करें।",
"concepts": [
{
"h": "साधारण ब्याज",
"list": [
"हर साल ब्याज सिर्फ़ शुरू की रकम (मूलधन, P) पर लगता है।",
"इसलिए SI हर साल बराबर रहता है।",
"मिश्रधन (कुल रकम) = मूलधन + ब्याज।"
]
},
{
"h": "चक्रवृद्धि ब्याज",
"list": [
"हर अवधि के आख़िर में ब्याज मूलधन में जुड़ जाता है, और अगला ब्याज इस नई रकम पर लगता है।",
"1 साल के लिए (सालाना जोड़ने पर) SI और CI बराबर होते हैं।",
"छमाही: दर R/2 और समय 2n हो जाता है। तिमाही: R/4 और 4n।"
]
},
{
"h": "कुल CI, मूलधन के % में",
"table": [
[
"5% पर 2 साल",
"10.25%"
],
[
"10% पर 2 साल",
"21%"
],
[
"20% पर 2 साल",
"44%"
],
[
"10% पर 3 साल",
"33.1%"
]
]
}
],
"formulas": [
[
"साधारण ब्याज",
"SI = P × R × T ÷ 100"
],
[
"SI में मिश्रधन",
"A = P + SI = P × (100 + RT) ÷ 100"
],
[
"चक्रवृद्धि मिश्रधन",
"A = P(1 + R/100)^n"
],
[
"चक्रवृद्धि ब्याज",
"CI = A − P"
],
[
"2 साल का CI − SI",
"P × (R/100)^2"
],
[
"3 साल का CI − SI",
"P × (R/100)^2 × (3 + R/100)"
],
[
"SI पर रकम T साल में दोगुनी",
"R = 100 ÷ T"
],
[
"SI पर रकम n गुना",
"R × T = (n − 1) × 100"
],
[
"CI पर रकम T साल में दोगुनी",
"2T साल में 4 गुना और 3T साल में 8 गुना"
],
[
"छमाही चक्रवृद्धि",
"A = P(1 + R/200)^(2n)"
]
],
"examples": [
{
"q": "₹5,000 पर 8% सालाना दर से 3 साल का साधारण ब्याज ज्ञात कीजिए।",
"s": [
"SI = P × R × T ÷ 100",
"= 5000 × 8 × 3 ÷ 100",
"= ₹1,200"
],
"a": "₹1,200"
},
{
"q": "₹10,000 पर 10% सालाना दर से 2 साल का चक्रवृद्धि ब्याज ज्ञात कीजिए (ब्याज सालाना जुड़ता है)।",
"s": [
"A = 10000 × (1.1)² = 10000 × 1.21",
"A = ₹12,100",
"CI = 12100 − 10000 = ₹2,100 (यानी ₹10,000 का 21%)"
],
"a": "₹2,100"
},
{
"q": "किसी रकम पर 5% सालाना दर से 2 साल के CI और SI का अंतर ₹25 है। रकम ज्ञात कीजिए।",
"s": [
"अंतर = P × (R/100)²",
"25 = P × (5/100)² = P ÷ 400",
"P = 25 × 400 = ₹10,000"
],
"a": "₹10,000"
}
],
"tricks": [
"1 साल का SI = 1 साल का CI (सालाना जोड़ने पर)।",
"R% पर 2 साल का CI = P का 2R + R²/100 %: 10% पर 21%, 20% पर 44%।",
"SI पर रकम 8 साल में दोगुनी → R = 100 ÷ 8 = 12.5%।",
"CI पर जो रकम 5 साल में दोगुनी होती है, वह 10 साल में 4 गुना और 15 साल में 8 गुना हो जाती है।",
"10% पर साल-दर-साल CI: पहले साल P का 10%, दूसरे साल 11%, तीसरे साल 12.1%। कुल के लिए इन्हें जोड़ें।"
],
"mistakes": [
"प्रश्न में साधारण ब्याज हो और CI का सूत्र लगा देना (या उल्टा)।",
"छमाही वाले प्रश्न में दर आधी और समय दोगुना करना भूल जाना।",
"प्रश्न ब्याज पूछे और उत्तर में मिश्रधन लिख देना।",
"SI के सूत्र में महीनों वाला समय सीधे डाल देना; पहले साल में बदलें (6 महीने = 1/2 साल)।"
]
}
});
