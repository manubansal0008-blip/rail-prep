// Revision note: blood (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "blood",
"en": {
"intro": "Blood relation questions ask how two people are related. Draw a small family tree: generations above and below, husband and wife side by side, and mark male (+) and female (−).",
"concepts": [
{
"h": "Family tree signs",
"list": [
"Draw each generation on one level: parents above, children below.",
"Use = for husband and wife, a line down for children, and a line across for brothers and sisters.",
"Mark gender: + for male, − for female."
]
},
{
"h": "Common relations",
"table": [
[
"Father's or mother's brother",
"Uncle"
],
[
"Father's or mother's sister",
"Aunt"
],
[
"Father's father",
"Grandfather"
],
[
"Brother's or sister's son",
"Nephew"
],
[
"Brother's or sister's daughter",
"Niece"
],
[
"Son's wife",
"Daughter-in-law"
],
[
"Husband's or wife's brother",
"Brother-in-law"
],
[
"Only son of my grandfather (father's side)",
"My father"
]
]
},
{
"h": "Coded relations",
"list": [
"Sometimes signs are used: 'A + B' means A is the wife of B, 'A × B' means A is the father of B, and so on.",
"Decode one sign at a time, from left to right.",
"Draw the tree as you decode."
]
}
],
"formulas": [
[
"Generations",
"grandparents +2, parents +1, self 0, children −1, grandchildren −2"
],
[
"'Only son of my father'",
"me (if I am male)"
],
[
"'Only daughter of my mother'",
"me (if I am female)"
],
[
"Gender not given",
"the answer may be 'cannot be determined'"
],
[
"Husband and wife",
"same generation level"
],
[
"Cousin",
"child of an uncle or aunt (same generation as you)"
]
],
"examples": [
{
"q": "Pointing to a man, Riya said, 'He is the son of my grandfather's only son.' How is the man related to Riya?",
"s": [
"Riya's grandfather's only son = Riya's father",
"The son of Riya's father = Riya's brother",
"So the man is Riya's brother"
],
"a": "Brother"
},
{
"q": "A is the brother of B. B is the daughter of C. D is the father of C. How is A related to D?",
"s": [
"B is C's daughter, and A is B's brother, so A is C's son",
"D is C's father, so D is A's grandfather",
"A is a male, so A is D's grandson"
],
"a": "Grandson"
},
{
"q": "If P + Q means P is the wife of Q, P × Q means P is the father of Q, and P − Q means P is the sister of Q, then what does A + B × C − D show about A and D?",
"s": [
"A + B: A is the wife of B; B × C: B is the father of C",
"C − D: C is the sister of D, so D is also a child of B",
"A is B's wife, so A is the mother of D"
],
"a": "A is the mother of D"
}
],
"tricks": [
"Start from the far end of the sentence ('my grandfather's only son') and work back to the speaker.",
"Always mark gender; many wrong answers come from guessing it.",
"Draw the tree even for short questions; it takes seconds.",
"If the gender of the person asked about is not known, 'cannot be determined' may be correct.",
"In coded questions, find the generation gap first (+1 means father, mother, uncle or aunt)."
],
"mistakes": [
"Guessing gender from a name.",
"Reversing the relation (A is B's uncle vs B is A's uncle).",
"Mixing up generations in long chains.",
"Forgetting that husband and wife are on the same level."
]
},
"hi": {
"intro": "रक्त संबंध के प्रश्नों में पूछा जाता है कि दो लोग आपस में क्या लगते हैं। छोटा-सा परिवार का पेड़ बनाएँ: पीढ़ियाँ ऊपर-नीचे, पति-पत्नी साथ-साथ, और पुरुष (+) व महिला (−) का निशान लगाएँ।",
"concepts": [
{
"h": "परिवार के पेड़ के निशान",
"list": [
"हर पीढ़ी एक लाइन पर बनाएँ: माता-पिता ऊपर, बच्चे नीचे।",
"पति-पत्नी के लिए =, बच्चों के लिए नीचे की ओर लाइन, और भाई-बहन के लिए सीधी लाइन।",
"लिंग का निशान: पुरुष के लिए +, महिला के लिए −।"
]
},
{
"h": "आम रिश्ते",
"table": [
[
"पिता / माँ के भाई",
"चाचा-ताऊ / मामा"
],
[
"पिता / माँ की बहन",
"बुआ / मौसी"
],
[
"पिता के पिता",
"दादा"
],
[
"भाई / बहन का बेटा",
"भतीजा / भांजा"
],
[
"भाई / बहन की बेटी",
"भतीजी / भांजी"
],
[
"बेटे की पत्नी",
"बहू"
],
[
"पति / पत्नी का भाई",
"देवर-जेठ / साला"
],
[
"मेरे दादा का इकलौता बेटा",
"मेरे पिता"
]
]
},
{
"h": "कोड वाले रिश्ते",
"list": [
"कभी-कभी चिह्न दिए जाते हैं: 'A + B' यानी A, B की पत्नी है; 'A × B' यानी A, B का पिता है, वगैरह।",
"एक बार में एक चिह्न, बाएँ से दाएँ खोलें।",
"खोलते-खोलते पेड़ बनाते जाएँ।"
]
}
],
"formulas": [
[
"पीढ़ियाँ",
"दादा-दादी +2, माता-पिता +1, खुद 0, बच्चे −1, पोते-पोती −2"
],
[
"'मेरे पिता का इकलौता बेटा'",
"मैं (अगर मैं पुरुष हूँ)"
],
[
"'मेरी माँ की इकलौती बेटी'",
"मैं (अगर मैं महिला हूँ)"
],
[
"लिंग न दिया हो",
"उत्तर 'तय नहीं किया जा सकता' भी हो सकता है"
],
[
"पति और पत्नी",
"एक ही पीढ़ी"
],
[
"चचेरा / ममेरा भाई-बहन",
"चाचा, मामा, बुआ या मौसी के बच्चे (आपकी ही पीढ़ी)"
]
],
"examples": [
{
"q": "एक आदमी की ओर इशारा करते हुए रिया ने कहा, 'यह मेरे दादा के इकलौते बेटे का बेटा है।' वह आदमी रिया का क्या लगता है?",
"s": [
"रिया के दादा का इकलौता बेटा = रिया के पिता",
"रिया के पिता का बेटा = रिया का भाई",
"तो वह आदमी रिया का भाई है"
],
"a": "भाई"
},
{
"q": "A, B का भाई है। B, C की बेटी है। D, C का पिता है। A, D का क्या लगता है?",
"s": [
"B, C की बेटी है और A, B का भाई है, तो A, C का बेटा है",
"D, C का पिता है, तो D, A का दादा/नाना है",
"A पुरुष है, तो A, D का पोता/नाती है"
],
"a": "पोता/नाती"
},
{
"q": "अगर P + Q का मतलब P, Q की पत्नी है; P × Q का मतलब P, Q का पिता है; और P − Q का मतलब P, Q की बहन है, तो A + B × C − D से A और D का क्या संबंध है?",
"s": [
"A + B: A, B की पत्नी है; B × C: B, C का पिता है",
"C − D: C, D की बहन है, तो D भी B का बच्चा है",
"A, B की पत्नी है, तो A, D की माँ है"
],
"a": "A, D की माँ है"
}
],
"tricks": [
"वाक्य के आख़िरी हिस्से से शुरू करें ('मेरे दादा का इकलौता बेटा') और बोलने वाले तक वापस आएँ।",
"हमेशा लिंग का निशान लगाएँ; बहुत-सी गलतियाँ लिंग का अंदाज़ा लगाने से होती हैं।",
"छोटे प्रश्न में भी पेड़ बनाएँ; कुछ सेकंड ही लगते हैं।",
"जिसके बारे में पूछा है उसका लिंग पता न हो, तो 'तय नहीं किया जा सकता' सही हो सकता है।",
"कोड वाले प्रश्नों में पहले पीढ़ी का अंतर निकालें (+1 यानी पिता, माँ, चाचा या बुआ)।"
],
"mistakes": [
"नाम देखकर लिंग मान लेना।",
"रिश्ता उल्टा कर देना (A, B का चाचा है या B, A का)।",
"लंबी कड़ी में पीढ़ियाँ गड़बड़ा देना।",
"भूल जाना कि पति और पत्नी एक ही पीढ़ी में हैं।"
]
}
});
