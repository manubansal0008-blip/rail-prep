// Revision note: geometry (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "geometry",
"en": {
"intro": "RRB geometry questions are about angles, triangles, circles and polygons. Most can be solved with a few properties and a rough figure.",
"concepts": [
{
"h": "Lines and angles",
"list": [
"Angles on a straight line add up to 180°; angles around a point add up to 360°.",
"Vertically opposite angles are equal.",
"Parallel lines cut by a transversal: corresponding angles are equal, alternate angles are equal, and co-interior angles add up to 180°.",
"Complementary angles add up to 90°; supplementary angles add up to 180°."
]
},
{
"h": "Triangles",
"list": [
"Sum of the three angles = 180°; an exterior angle = sum of the two opposite interior angles.",
"Sum of any two sides is more than the third side.",
"Pythagoras (right triangle): hypotenuse² = base² + height².",
"The centroid divides each median in the ratio 2 : 1, counting from the vertex.",
"Congruence rules: SSS, SAS, ASA, RHS. In similar triangles, ratio of areas = (ratio of sides)²."
]
},
{
"h": "Circles",
"list": [
"Angle at the centre = 2 × angle at the circle on the same arc.",
"Angle in a semicircle = 90°.",
"A tangent is perpendicular to the radius at the point where it touches.",
"Two tangents from an outside point are equal in length.",
"Opposite angles of a cyclic quadrilateral add up to 180°."
]
}
],
"formulas": [
[
"Sum of interior angles of an n-sided polygon",
"(n − 2) × 180°"
],
[
"Each exterior angle of a regular polygon",
"360° ÷ n"
],
[
"Each interior angle of a regular polygon",
"180° − 360° ÷ n"
],
[
"Number of diagonals of an n-sided polygon",
"n(n − 3) ÷ 2"
],
[
"Tangent from a point at distance d from the centre (radius r)",
"length = √(d² − r²)"
],
[
"Chord at distance d from the centre",
"length = 2√(r² − d²)"
],
[
"Equilateral triangle of side a",
"inradius = a ÷ (2√3), circumradius = a ÷ √3"
],
[
"Right triangle",
"circumradius = hypotenuse ÷ 2"
],
[
"Similar triangles",
"ratio of areas = (ratio of corresponding sides)²"
]
],
"examples": [
{
"q": "Each interior angle of a regular polygon is 144°. How many sides does it have?",
"s": [
"Exterior angle = 180° − 144° = 36°",
"n = 360° ÷ 36°",
"= 10"
],
"a": "10 sides"
},
{
"q": "In a circle of radius 13 cm, a chord is 5 cm away from the centre. Find the length of the chord.",
"s": [
"Half chord = √(13² − 5²) = √(169 − 25) = √144 = 12 cm",
"Chord = 2 × 12",
"= 24 cm"
],
"a": "24 cm"
},
{
"q": "The angles of a triangle are in the ratio 2 : 3 : 4. Find the largest angle.",
"s": [
"Total parts = 9 and the angles add up to 180°",
"1 part = 180° ÷ 9 = 20°",
"Largest angle = 4 × 20° = 80°"
],
"a": "80°"
}
],
"tricks": [
"Always draw a rough figure and mark what is given.",
"Find the exterior angle of a regular polygon first: n = 360 ÷ exterior angle.",
"Triplets 3-4-5, 5-12-13, 8-15-17 save time in right triangle and chord questions.",
"In an equilateral triangle, centroid, incentre, circumcentre and orthocentre are the same point, and circumradius = 2 × inradius.",
"In a right triangle, the midpoint of the hypotenuse is at the same distance from all three corners."
],
"mistakes": [
"Using the interior angle in place of the exterior angle in n = 360 ÷ angle.",
"Forgetting to double the half chord.",
"Taking the centroid ratio as 1 : 2 from the vertex; it is 2 : 1.",
"Trusting how the figure looks; use only the given facts."
]
},
"hi": {
"intro": "RRB में ज्यामिति के प्रश्न कोण, त्रिभुज, वृत्त और बहुभुज पर आते हैं। ज़्यादातर प्रश्न कुछ गुणों और एक कच्चे चित्र से हल हो जाते हैं।",
"concepts": [
{
"h": "रेखाएँ और कोण",
"list": [
"सीधी रेखा पर बने कोणों का जोड़ 180° है; एक बिंदु के चारों ओर के कोणों का जोड़ 360° है।",
"आमने-सामने के (शीर्षाभिमुख) कोण बराबर होते हैं।",
"समांतर रेखाओं को कोई रेखा काटे तो: संगत कोण बराबर, एकांतर कोण बराबर, और एक ही तरफ़ के अंदर वाले कोणों का जोड़ 180°।",
"पूरक कोणों का जोड़ 90° और संपूरक कोणों का जोड़ 180° होता है।"
]
},
{
"h": "त्रिभुज",
"list": [
"तीनों कोणों का जोड़ = 180°; बाहरी कोण = सामने के दो अंदर वाले कोणों का जोड़।",
"किन्हीं दो भुजाओं का जोड़ तीसरी भुजा से बड़ा होता है।",
"पाइथागोरस (समकोण त्रिभुज): कर्ण² = आधार² + लंब²।",
"केंद्रक (सेंट्रॉइड) हर माध्यिका को शीर्ष की तरफ़ से 2 : 1 में बाँटता है।",
"सर्वांगसमता के नियम: SSS, SAS, ASA, RHS। समरूप त्रिभुजों में क्षेत्रफलों का अनुपात = (भुजाओं का अनुपात)²।"
]
},
{
"h": "वृत्त",
"list": [
"केंद्र पर बना कोण = उसी चाप से वृत्त पर बने कोण का 2 गुना।",
"अर्धवृत्त में बना कोण = 90°।",
"स्पर्श रेखा, छूने वाले बिंदु पर त्रिज्या से 90° पर होती है।",
"बाहर के एक बिंदु से खींची गई दो स्पर्श रेखाएँ बराबर होती हैं।",
"चक्रीय चतुर्भुज के आमने-सामने के कोणों का जोड़ 180° होता है।"
]
}
],
"formulas": [
[
"n भुजाओं वाले बहुभुज के अंदर के कोणों का जोड़",
"(n − 2) × 180°"
],
[
"सम बहुभुज का हर बाहरी कोण",
"360° ÷ n"
],
[
"सम बहुभुज का हर अंदर का कोण",
"180° − 360° ÷ n"
],
[
"n भुजाओं वाले बहुभुज के विकर्ण",
"n(n − 3) ÷ 2"
],
[
"केंद्र से d दूरी वाले बिंदु से स्पर्श रेखा (त्रिज्या r)",
"लंबाई = √(d² − r²)"
],
[
"केंद्र से d दूरी पर जीवा",
"लंबाई = 2√(r² − d²)"
],
[
"a भुजा वाला समबाहु त्रिभुज",
"अंतःत्रिज्या = a ÷ (2√3), परित्रिज्या = a ÷ √3"
],
[
"समकोण त्रिभुज",
"परित्रिज्या = कर्ण ÷ 2"
],
[
"समरूप त्रिभुज",
"क्षेत्रफलों का अनुपात = (संगत भुजाओं का अनुपात)²"
]
],
"examples": [
{
"q": "एक सम बहुभुज का हर अंदर का कोण 144° है। इसकी कितनी भुजाएँ हैं?",
"s": [
"बाहरी कोण = 180° − 144° = 36°",
"n = 360° ÷ 36°",
"= 10"
],
"a": "10 भुजाएँ"
},
{
"q": "13 cm त्रिज्या वाले वृत्त में एक जीवा केंद्र से 5 cm दूर है। जीवा की लंबाई ज्ञात कीजिए।",
"s": [
"आधी जीवा = √(13² − 5²) = √(169 − 25) = √144 = 12 cm",
"जीवा = 2 × 12",
"= 24 cm"
],
"a": "24 cm"
},
{
"q": "एक त्रिभुज के कोण 2 : 3 : 4 के अनुपात में हैं। सबसे बड़ा कोण ज्ञात कीजिए।",
"s": [
"कुल हिस्से = 9 और कोणों का जोड़ 180°",
"1 हिस्सा = 180° ÷ 9 = 20°",
"सबसे बड़ा कोण = 4 × 20° = 80°"
],
"a": "80°"
}
],
"tricks": [
"हमेशा कच्चा चित्र बनाकर दी गई बातें उस पर लिखें।",
"सम बहुभुज में पहले बाहरी कोण निकालें: n = 360 ÷ बाहरी कोण।",
"3-4-5, 5-12-13, 8-15-17 तिकड़ियाँ समकोण त्रिभुज और जीवा वाले प्रश्नों में समय बचाती हैं।",
"समबाहु त्रिभुज में केंद्रक, अंतःकेंद्र, परिकेंद्र और लंबकेंद्र एक ही बिंदु होते हैं, और परित्रिज्या = 2 × अंतःत्रिज्या।",
"समकोण त्रिभुज में कर्ण का बीच वाला बिंदु तीनों कोनों से बराबर दूरी पर होता है।"
],
"mistakes": [
"n = 360 ÷ कोण में बाहरी कोण की जगह अंदर का कोण लगा देना।",
"आधी जीवा को दोगुना करना भूल जाना।",
"केंद्रक का अनुपात शीर्ष से 1 : 2 मान लेना; सही 2 : 1 है।",
"चित्र देखकर अंदाज़ा लगाना; सिर्फ़ दी गई जानकारी से हल करें।"
]
}
});
