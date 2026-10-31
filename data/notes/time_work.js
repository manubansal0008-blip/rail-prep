// Revision note: time_work (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "time_work",
"en": {
"intro": "Time & Work and Pipes & Cisterns use the same idea: find how much work is done in one day (or one hour). The LCM method turns most questions into one line.",
"concepts": [
{
"h": "One day's work",
"list": [
"If A finishes a job in n days, A does 1/n of it in one day.",
"Work done together in one day = sum of each person's one-day work.",
"Days needed = 1 ÷ (one day's work)."
]
},
{
"h": "LCM method (total work = LCM)",
"list": [
"Take total work = LCM of the given days (in units).",
"Efficiency (units per day) = total work ÷ days.",
"Example: A takes 10 days, B takes 15 days → total = 30 units; A = 3 units/day, B = 2 units/day; together 5 units/day → 6 days."
]
},
{
"h": "Pipes and cisterns",
"list": [
"A filling pipe does positive work; an outlet pipe or leak does negative work.",
"Net filling per hour = sum of filling pipes − sum of emptying pipes.",
"A leak that empties a full tank in n hours removes 1/n of the tank each hour."
]
}
],
"formulas": [
[
"A in a days, B in b days, together",
"ab ÷ (a + b) days"
],
[
"A, B, C in a, b, c days, together",
"abc ÷ (ab + bc + ca) days"
],
[
"A and B together in x days, A alone in a days",
"B alone = ax ÷ (a − x) days"
],
[
"Men-days rule",
"M₁ × D₁ × H₁ ÷ W₁ = M₂ × D₂ × H₂ ÷ W₂"
],
[
"Efficiency and time",
"time ∝ 1 ÷ efficiency; twice as efficient means half the time"
],
[
"Pipe fills in a hours, leak empties in b hours (b > a)",
"tank fills in ab ÷ (b − a) hours"
],
[
"Two pipes fill in a and b hours",
"together ab ÷ (a + b) hours"
],
[
"Wages",
"shared in the ratio of work done (efficiency × days)"
]
],
"examples": [
{
"q": "A can do a job in 12 days and B in 18 days. In how many days will they finish it together?",
"s": [
"Total work = LCM(12, 18) = 36 units",
"A = 3 units/day, B = 2 units/day; together 5 units/day",
"Days = 36 ÷ 5 = 7.2 days (7 1/5 days)"
],
"a": "7 1/5 days"
},
{
"q": "15 men can build a wall in 24 days. How many men are needed to build it in 18 days?",
"s": [
"Same work, so M₁ × D₁ = M₂ × D₂",
"15 × 24 = M₂ × 18",
"M₂ = 360 ÷ 18 = 20 men"
],
"a": "20 men"
},
{
"q": "Pipe A fills a tank in 6 hours. A leak empties the full tank in 10 hours. If both are open, how long will the tank take to fill?",
"s": [
"Total = LCM(6, 10) = 30 units",
"A fills 5 units/hour, the leak removes 3 units/hour; net 2 units/hour",
"Time = 30 ÷ 2 = 15 hours (check: 6 × 10 ÷ (10 − 6) = 15)"
],
"a": "15 hours"
}
],
"tricks": [
"Always try the LCM method; it avoids fractions.",
"Two people: together = product ÷ sum. 10 and 15 days → 150 ÷ 25 = 6 days.",
"If A + B take 6 days and A alone takes 10 days, B alone = 10 × 6 ÷ (10 − 6) = 15 days.",
"If A is x times as efficient as B, A takes 1/x of B's time, and both together take B's time ÷ (x + 1).",
"Wages: share the money in the ratio of work done, not in the ratio of days taken."
],
"mistakes": [
"Adding the days instead of adding one-day work.",
"Forgetting that a leak or outlet pipe is negative work.",
"In men-days questions, ignoring hours per day when they change.",
"Sharing wages in the ratio of days taken; it should be in the ratio of work done."
]
},
"hi": {
"intro": "समय और काम, और पाइप-टंकी दोनों एक ही सोच पर चलते हैं: एक दिन (या एक घंटे) में कितना काम होता है। LCM वाले तरीके से ज़्यादातर प्रश्न एक लाइन में हो जाते हैं।",
"concepts": [
{
"h": "एक दिन का काम",
"list": [
"अगर A कोई काम n दिन में करता है, तो एक दिन में काम का 1/n करता है।",
"साथ में एक दिन का काम = सबके एक दिन के काम का जोड़।",
"लगने वाले दिन = 1 ÷ (एक दिन का काम)।"
]
},
{
"h": "LCM तरीका (कुल काम = LCM)",
"list": [
"कुल काम = दिए गए दिनों का LCM (यूनिट में) मान लें।",
"क्षमता (हर दिन की यूनिट) = कुल काम ÷ दिन।",
"उदाहरण: A को 10 दिन, B को 15 दिन → कुल = 30 यूनिट; A = 3 यूनिट/दिन, B = 2 यूनिट/दिन; साथ में 5 यूनिट/दिन → 6 दिन।"
]
},
{
"h": "पाइप और टंकी",
"list": [
"भरने वाला पाइप प्लस काम करता है; ख़ाली करने वाला पाइप या छेद माइनस काम करता है।",
"एक घंटे में कुल भराव = भरने वाले पाइपों का जोड़ − ख़ाली करने वाले पाइपों का जोड़।",
"जो छेद भरी टंकी को n घंटे में ख़ाली करे, वह हर घंटे टंकी का 1/n निकालता है।"
]
}
],
"formulas": [
[
"A, a दिन में; B, b दिन में; साथ में",
"ab ÷ (a + b) दिन"
],
[
"A, B, C क्रमशः a, b, c दिन में; साथ में",
"abc ÷ (ab + bc + ca) दिन"
],
[
"A और B साथ में x दिन, A अकेले a दिन",
"B अकेले = ax ÷ (a − x) दिन"
],
[
"आदमी-दिन नियम",
"M₁ × D₁ × H₁ ÷ W₁ = M₂ × D₂ × H₂ ÷ W₂"
],
[
"क्षमता और समय",
"समय ∝ 1 ÷ क्षमता; दोगुनी क्षमता यानी आधा समय"
],
[
"पाइप a घंटे में भरे, छेद b घंटे में ख़ाली करे (b > a)",
"टंकी ab ÷ (b − a) घंटे में भरेगी"
],
[
"दो पाइप a और b घंटे में भरें",
"साथ में ab ÷ (a + b) घंटे"
],
[
"मज़दूरी",
"किए गए काम (क्षमता × दिन) के अनुपात में बँटती है"
]
],
"examples": [
{
"q": "A एक काम 12 दिन में और B 18 दिन में कर सकता है। दोनों मिलकर कितने दिन में करेंगे?",
"s": [
"कुल काम = LCM(12, 18) = 36 यूनिट",
"A = 3 यूनिट/दिन, B = 2 यूनिट/दिन; साथ में 5 यूनिट/दिन",
"दिन = 36 ÷ 5 = 7.2 दिन (7 1/5 दिन)"
],
"a": "7 1/5 दिन"
},
{
"q": "15 आदमी एक दीवार 24 दिन में बनाते हैं। इसे 18 दिन में बनाने के लिए कितने आदमी चाहिए?",
"s": [
"काम उतना ही है, तो M₁ × D₁ = M₂ × D₂",
"15 × 24 = M₂ × 18",
"M₂ = 360 ÷ 18 = 20 आदमी"
],
"a": "20 आदमी"
},
{
"q": "पाइप A एक टंकी 6 घंटे में भरता है। एक छेद भरी टंकी को 10 घंटे में ख़ाली कर देता है। दोनों खुले हों तो टंकी कितने समय में भरेगी?",
"s": [
"कुल = LCM(6, 10) = 30 यूनिट",
"A हर घंटे 5 यूनिट भरता है, छेद 3 यूनिट निकालता है; कुल 2 यूनिट/घंटा",
"समय = 30 ÷ 2 = 15 घंटे (जाँच: 6 × 10 ÷ (10 − 6) = 15)"
],
"a": "15 घंटे"
}
],
"tricks": [
"हमेशा पहले LCM तरीका आज़माएँ; भिन्नों से बचते हैं।",
"दो लोग: साथ में = गुणा ÷ जोड़। 10 और 15 दिन → 150 ÷ 25 = 6 दिन।",
"अगर A + B को 6 दिन और A अकेले को 10 दिन लगें, तो B अकेले = 10 × 6 ÷ (10 − 6) = 15 दिन।",
"अगर A की क्षमता B से x गुना है, तो A को B के समय का 1/x लगेगा, और दोनों साथ में B के समय ÷ (x + 1) में करेंगे।",
"मज़दूरी किए गए काम के अनुपात में बाँटें, लगे हुए दिनों के अनुपात में नहीं।"
],
"mistakes": [
"एक दिन के काम की जगह सीधे दिन जोड़ देना।",
"छेद या ख़ाली करने वाले पाइप को माइनस काम मानना भूल जाना।",
"आदमी-दिन वाले प्रश्नों में घंटे/दिन बदलें तो उन्हें छोड़ देना।",
"मज़दूरी को लगे दिनों के अनुपात में बाँटना; यह किए गए काम के अनुपात में बँटती है।"
]
}
});
