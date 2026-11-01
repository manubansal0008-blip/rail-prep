// Revision note: venn (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "venn",
"en": {
"intro": "Venn diagram questions are of two kinds: (1) choose the diagram that shows how three groups are related, and (2) count numbers in overlapping circles. Draw small circles quickly – the picture gives the answer.",
"concepts": [
{
"h": "Choosing the right diagram",
"list": [
"One group inside another: all dogs are animals → small circle inside a big circle.",
"Two groups that partly overlap: some doctors are women → two crossing circles.",
"Groups with nothing common: men and women → separate circles.",
"Example sets: India, Delhi, Asia → three circles one inside the other (Delhi ⊂ India ⊂ Asia).",
"Doctors, men, women → men and women separate; the doctors circle crosses both."
]
},
{
"h": "Counting with circles",
"list": [
"Two sets: n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
"People in neither = total − n(A ∪ B).",
"Only A = n(A) − n(A ∩ B).",
"Three sets: n(A ∪ B ∪ C) = A + B + C − (A∩B) − (B∩C) − (A∩C) + (A∩B∩C).",
"In a figure question, a number in the region inside two shapes but outside the third means 'both these, not that'."
]
}
],
"formulas": [
[
"Union of two sets",
"n(A) + n(B) − n(A ∩ B)"
],
[
"Only A",
"n(A) − n(A ∩ B)"
],
[
"Neither",
"total − n(A ∪ B)"
],
[
"Three sets",
"A + B + C − (pairs) + (all three)"
]
],
"examples": [
{
"q": "In a class of 50, 30 like tea, 25 like coffee and 10 like both. How many like neither?",
"s": [
"Tea or coffee = 30 + 25 − 10 = 45",
"Neither = 50 − 45",
"= 5"
],
"a": "5 students"
},
{
"q": "Choose the diagram for: Animals, Dogs, Cats.",
"s": [
"Dogs and cats are both animals, so both circles are inside the Animals circle.",
"No dog is a cat, so the two small circles do not touch.",
"Answer: one big circle with two separate small circles inside it."
],
"a": "Two separate circles inside one big circle"
},
{
"q": "In a group, 40 read Hindi papers, 35 read English papers, 20 read both, and every person reads at least one. How many people are there, and how many read only English?",
"s": [
"Total = 40 + 35 − 20 = 55",
"Only English = 35 − 20",
"= 15"
],
"a": "55 people; 15 read only English"
}
],
"tricks": [
"'All A are B' → A inside B; 'Some' → overlap; 'No' → separate.",
"Always subtract the 'both' part once when adding two groups.",
"For figure-counting, find the region that is inside exactly the shapes named.",
"Common sets: Earth ⊂ Solar system ⊂ Universe; Delhi ⊂ India ⊂ Asia."
],
"mistakes": [
"Adding both groups and forgetting to subtract the common part.",
"Drawing women inside men (they are separate groups).",
"Counting 'only A' as all of A.",
"In three-set sums, forgetting to add back the 'all three' part."
]
},
"hi": {
"intro": "वेन आरेख के प्रश्न दो तरह के होते हैं: (1) वह आरेख चुनना जो तीन समूहों का संबंध दिखाए, और (2) एक-दूसरे पर चढ़े गोलों में संख्याएँ गिनना। जल्दी से छोटे गोले बनाएँ – चित्र से ही उत्तर मिल जाता है।",
"concepts": [
{
"h": "सही आरेख चुनना",
"list": [
"एक समूह दूसरे के अंदर: सभी कुत्ते जानवर हैं → बड़े गोले के अंदर छोटा गोला।",
"दो समूह जो थोड़े मिलते हैं: कुछ डॉक्टर महिलाएँ हैं → एक-दूसरे को काटते दो गोले।",
"जिन समूहों में कुछ भी साझा नहीं: पुरुष और महिलाएँ → अलग-अलग गोले।",
"उदाहरण: भारत, दिल्ली, एशिया → एक के अंदर एक तीन गोले (दिल्ली ⊂ भारत ⊂ एशिया)।",
"डॉक्टर, पुरुष, महिलाएँ → पुरुष और महिलाएँ अलग; डॉक्टर वाला गोला दोनों को काटता है।"
]
},
{
"h": "गोलों से गिनती",
"list": [
"दो समूह: n(A ∪ B) = n(A) + n(B) − n(A ∩ B)।",
"जो किसी में नहीं = कुल − n(A ∪ B)।",
"सिर्फ़ A = n(A) − n(A ∩ B)।",
"तीन समूह: n(A ∪ B ∪ C) = A + B + C − (A∩B) − (B∩C) − (A∩C) + (A∩B∩C)।",
"आकृति वाले प्रश्न में, जो संख्या दो आकृतियों के अंदर पर तीसरी के बाहर है, उसका मतलब 'ये दोनों, पर वह नहीं'।"
]
}
],
"formulas": [
[
"दो समूहों का योग (यूनियन)",
"n(A) + n(B) − n(A ∩ B)"
],
[
"सिर्फ़ A",
"n(A) − n(A ∩ B)"
],
[
"किसी में नहीं",
"कुल − n(A ∪ B)"
],
[
"तीन समूह",
"A + B + C − (जोड़ियाँ) + (तीनों)"
]
],
"examples": [
{
"q": "50 छात्रों की कक्षा में 30 को चाय, 25 को कॉफ़ी और 10 को दोनों पसंद हैं। कितनों को दोनों में से कुछ पसंद नहीं?",
"s": [
"चाय या कॉफ़ी = 30 + 25 − 10 = 45",
"कुछ नहीं = 50 − 45",
"= 5"
],
"a": "5 छात्र"
},
{
"q": "इनके लिए आरेख चुनिए: जानवर, कुत्ते, बिल्लियाँ।",
"s": [
"कुत्ते और बिल्लियाँ दोनों जानवर हैं, इसलिए दोनों गोले 'जानवर' के गोले के अंदर हैं।",
"कोई कुत्ता बिल्ली नहीं है, इसलिए दोनों छोटे गोले एक-दूसरे को नहीं छूते।",
"उत्तर: एक बड़ा गोला, उसके अंदर दो अलग छोटे गोले।"
],
"a": "एक बड़े गोले के अंदर दो अलग गोले"
},
{
"q": "एक समूह में 40 लोग हिंदी अख़बार, 35 अंग्रेज़ी अख़बार और 20 दोनों पढ़ते हैं, और हर व्यक्ति कम से कम एक पढ़ता है। कुल कितने लोग हैं, और कितने सिर्फ़ अंग्रेज़ी पढ़ते हैं?",
"s": [
"कुल = 40 + 35 − 20 = 55",
"सिर्फ़ अंग्रेज़ी = 35 − 20",
"= 15"
],
"a": "55 लोग; 15 सिर्फ़ अंग्रेज़ी"
}
],
"tricks": [
"'सभी A, B हैं' → A, B के अंदर; 'कुछ' → मिलते गोले; 'कोई नहीं' → अलग।",
"दो समूह जोड़ते समय 'दोनों' वाला हिस्सा एक बार ज़रूर घटाएँ।",
"आकृति वाली गिनती में वही हिस्सा ढूँढें जो ठीक बताई गई आकृतियों के अंदर हो।",
"आम समूह: पृथ्वी ⊂ सौरमंडल ⊂ ब्रह्मांड; दिल्ली ⊂ भारत ⊂ एशिया।"
],
"mistakes": [
"दोनों समूह जोड़कर साझा हिस्सा घटाना भूल जाना।",
"महिलाओं का गोला पुरुषों के अंदर बना देना (ये अलग समूह हैं)।",
"'सिर्फ़ A' को पूरा A गिन लेना।",
"तीन समूहों के योग में 'तीनों' वाला हिस्सा वापस जोड़ना भूल जाना।"
]
}
});
