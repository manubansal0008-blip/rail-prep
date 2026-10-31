// Revision note: profit_loss (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "profit_loss",
"en": {
"intro": "Profit, loss and discount questions come in every RRB paper. Profit and loss are always worked out on the cost price, and discount on the marked price.",
"concepts": [
{
"h": "CP, SP and MP",
"list": [
"Cost Price (CP): the price at which an item is bought.",
"Selling Price (SP): the price at which it is sold.",
"Marked Price (MP): the price written on the tag (list price).",
"SP more than CP means profit; SP less than CP means loss."
]
},
{
"h": "Which base to use",
"list": [
"Profit % = profit ÷ CP × 100 and Loss % = loss ÷ CP × 100.",
"Discount % = discount ÷ MP × 100. Discount is always on the marked price.",
"Selling price after discount is the SP used for profit or loss."
]
},
{
"h": "Profit/loss % as a fraction of CP",
"list": [
"10% profit: SP = 11/10 of CP",
"20% profit: SP = 6/5 of CP",
"25% profit: SP = 5/4 of CP",
"50% profit: SP = 3/2 of CP",
"10% loss: SP = 9/10 of CP",
"20% loss: SP = 4/5 of CP",
"25% loss: SP = 3/4 of CP"
]
}
],
"formulas": [
[
"Profit",
"SP − CP"
],
[
"Loss",
"CP − SP"
],
[
"Profit %",
"(SP − CP) ÷ CP × 100"
],
[
"SP at r% profit",
"CP × (100 + r) ÷ 100"
],
[
"SP at r% loss",
"CP × (100 − r) ÷ 100"
],
[
"CP when SP and r% are known",
"SP × 100 ÷ (100 + r) for profit, SP × 100 ÷ (100 − r) for loss"
],
[
"Discount",
"MP − SP"
],
[
"SP after d% discount",
"MP × (100 − d) ÷ 100"
],
[
"Two discounts a% and b%",
"single discount = a + b − (a × b ÷ 100)"
],
[
"Two items sold at the same SP, one at x% profit, the other at x% loss",
"always a loss of x² ÷ 100 %"
],
[
"Dishonest dealer (false weight)",
"profit % = (true weight − false weight) ÷ false weight × 100"
],
[
"CP of x items = SP of y items",
"profit % = (x − y) ÷ y × 100"
]
],
"examples": [
{
"q": "A shopkeeper buys a fan for ₹1,200 and sells it for ₹1,500. Find the profit %.",
"s": [
"Profit = 1500 − 1200 = ₹300",
"Profit % = 300 ÷ 1200 × 100",
"= 25%"
],
"a": "25%"
},
{
"q": "The marked price of a shirt is ₹800. Two discounts of 20% and 10% are given one after the other. Find the selling price.",
"s": [
"After 20% off: 800 × 80 ÷ 100 = ₹640",
"After 10% off: 640 × 90 ÷ 100 = ₹576",
"Check: single discount = 20 + 10 − 2 = 28%, and 72% of 800 = 576"
],
"a": "₹576"
},
{
"q": "Two watches are sold for ₹990 each. One is sold at 10% profit and the other at 10% loss. Find the overall profit or loss %.",
"s": [
"Same SP with the same % profit and loss → always a loss of x² ÷ 100 %",
"Loss = 10² ÷ 100 = 1%",
"Check: CPs are 990 × 100 ÷ 110 = 900 and 990 × 100 ÷ 90 = 1100; total CP 2000, total SP 1980, loss ₹20 = 1%"
],
"a": "1% loss"
}
],
"tricks": [
"Turn % into fractions: 25% profit means SP = 5/4 of CP, so CP = 4/5 of SP.",
"Take CP = ₹100 when no amount is given; the answer comes out directly in %.",
"Cost of 20 items = selling price of 16 items → profit = (20 − 16) ÷ 16 × 100 = 25%.",
"A dealer who gives 900 g in place of 1 kg gains (1000 − 900) ÷ 900 × 100 = 11 1/9%.",
"To earn r% profit even after a d% discount, mark the price at CP × (100 + r) ÷ (100 − d)."
],
"mistakes": [
"Taking profit % on SP instead of CP.",
"Taking discount on CP; discount is always on the marked price.",
"Adding two discounts directly: 20% and 10% together is 28%, not 30%.",
"In 'same SP, x% profit and x% loss', thinking there is no profit and no loss. It is always a loss."
]
},
"hi": {
"intro": "लाभ, हानि और छूट के प्रश्न RRB के हर पेपर में आते हैं। लाभ और हानि हमेशा ख़रीद मूल्य पर निकलते हैं, और छूट अंकित मूल्य पर।",
"concepts": [
{
"h": "CP, SP और MP",
"list": [
"ख़रीद मूल्य (CP): जिस कीमत पर सामान ख़रीदा गया।",
"बिक्री मूल्य (SP): जिस कीमत पर सामान बेचा गया।",
"अंकित मूल्य (MP): सामान पर लिखी हुई कीमत (लिस्ट प्राइस)।",
"SP, CP से ज़्यादा हो तो लाभ; SP, CP से कम हो तो हानि।"
]
},
{
"h": "किस पर निकालें",
"list": [
"लाभ % = लाभ ÷ CP × 100 और हानि % = हानि ÷ CP × 100।",
"छूट % = छूट ÷ MP × 100। छूट हमेशा अंकित मूल्य पर होती है।",
"छूट के बाद की कीमत ही वह SP है जिससे लाभ या हानि निकलती है।"
]
},
{
"h": "लाभ/हानि % को CP की भिन्न में",
"list": [
"10% लाभ: SP = CP का 11/10",
"20% लाभ: SP = CP का 6/5",
"25% लाभ: SP = CP का 5/4",
"50% लाभ: SP = CP का 3/2",
"10% हानि: SP = CP का 9/10",
"20% हानि: SP = CP का 4/5",
"25% हानि: SP = CP का 3/4"
]
}
],
"formulas": [
[
"लाभ",
"SP − CP"
],
[
"हानि",
"CP − SP"
],
[
"लाभ %",
"(SP − CP) ÷ CP × 100"
],
[
"r% लाभ पर SP",
"CP × (100 + r) ÷ 100"
],
[
"r% हानि पर SP",
"CP × (100 − r) ÷ 100"
],
[
"SP और r% पता हो तो CP",
"लाभ में SP × 100 ÷ (100 + r), हानि में SP × 100 ÷ (100 − r)"
],
[
"छूट",
"MP − SP"
],
[
"d% छूट के बाद SP",
"MP × (100 − d) ÷ 100"
],
[
"दो छूट a% और b%",
"एक छूट = a + b − (a × b ÷ 100)"
],
[
"दो चीज़ें एक ही SP पर, एक पर x% लाभ, दूसरी पर x% हानि",
"हमेशा x² ÷ 100 % की हानि"
],
[
"बेईमान दुकानदार (कम तौल)",
"लाभ % = (सही वज़न − कम वज़न) ÷ कम वज़न × 100"
],
[
"x चीज़ों का CP = y चीज़ों का SP",
"लाभ % = (x − y) ÷ y × 100"
]
],
"examples": [
{
"q": "एक दुकानदार ₹1,200 में पंखा ख़रीदकर ₹1,500 में बेचता है। लाभ % ज्ञात कीजिए।",
"s": [
"लाभ = 1500 − 1200 = ₹300",
"लाभ % = 300 ÷ 1200 × 100",
"= 25%"
],
"a": "25%"
},
{
"q": "एक कमीज़ का अंकित मूल्य ₹800 है। इस पर एक के बाद एक 20% और 10% की छूट दी जाती है। बिक्री मूल्य ज्ञात कीजिए।",
"s": [
"20% छूट के बाद: 800 × 80 ÷ 100 = ₹640",
"10% छूट के बाद: 640 × 90 ÷ 100 = ₹576",
"जाँच: एक छूट = 20 + 10 − 2 = 28%, और 800 का 72% = 576"
],
"a": "₹576"
},
{
"q": "दो घड़ियाँ ₹990 में एक-एक करके बेची गईं। एक पर 10% लाभ और दूसरी पर 10% हानि हुई। कुल लाभ या हानि % ज्ञात कीजिए।",
"s": [
"एक ही SP, बराबर % लाभ और हानि → हमेशा x² ÷ 100 % हानि",
"हानि = 10² ÷ 100 = 1%",
"जाँच: CP = 990 × 100 ÷ 110 = 900 और 990 × 100 ÷ 90 = 1100; कुल CP 2000, कुल SP 1980, हानि ₹20 = 1%"
],
"a": "1% हानि"
}
],
"tricks": [
"% को भिन्न में बदलें: 25% लाभ यानी SP = CP का 5/4, तो CP = SP का 4/5।",
"कोई रकम न दी हो तो CP = ₹100 मान लें; उत्तर सीधे % में आ जाता है।",
"20 चीज़ों का CP = 16 चीज़ों का SP → लाभ = (20 − 16) ÷ 16 × 100 = 25%।",
"1 kg की जगह 900 g तौलने वाला दुकानदार (1000 − 900) ÷ 900 × 100 = 11 1/9% कमाता है।",
"d% छूट देकर भी r% लाभ चाहिए, तो अंकित मूल्य = CP × (100 + r) ÷ (100 − d) रखें।"
],
"mistakes": [
"लाभ % को CP की जगह SP पर निकालना।",
"छूट को CP पर निकालना; छूट हमेशा अंकित मूल्य पर होती है।",
"दो छूट सीधे जोड़ देना: 20% और 10% मिलकर 28% है, 30% नहीं।",
"'एक ही SP, x% लाभ और x% हानि' में यह मान लेना कि न लाभ हुआ न हानि। इसमें हमेशा हानि होती है।"
]
}
});
