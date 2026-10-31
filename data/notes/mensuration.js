// Revision note: mensuration (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "mensuration",
"en": {
"intro": "Mensuration means area and perimeter of flat shapes (2D) and volume and surface area of solids (3D). RRB asks direct formula questions, so learn the formulas well and keep the units the same.",
"concepts": [
{
"h": "2D shapes",
"list": [
"Rectangle: area = l × b, perimeter = 2(l + b), diagonal = √(l² + b²).",
"Square: area = a², perimeter = 4a, diagonal = a√2.",
"Triangle: area = ½ × base × height; equilateral triangle area = (√3 ÷ 4)a².",
"Circle: area = πr², circumference = 2πr; semicircle perimeter = πr + 2r.",
"Parallelogram = base × height; trapezium = ½ × (sum of parallel sides) × height; rhombus = ½ × d₁ × d₂."
]
},
{
"h": "3D shapes",
"list": [
"Cube: volume a³, total surface 6a²",
"Cuboid: volume l × b × h, total surface 2(lb + bh + hl)",
"Cylinder: volume πr²h, curved surface 2πrh, total surface 2πr(r + h)",
"Cone: volume ⅓πr²h, curved surface πrl, where l = √(r² + h²)",
"Sphere: volume (4/3)πr³, surface 4πr²",
"Hemisphere: volume (2/3)πr³, curved surface 2πr², total surface 3πr²"
]
},
{
"h": "Units",
"list": [
"1 m = 100 cm, so 1 m² = 10,000 cm² and 1 m³ = 10,00,000 cm³.",
"1 litre = 1000 cm³ and 1 m³ = 1000 litres.",
"1 hectare = 10,000 m²."
]
}
],
"formulas": [
[
"Triangle with sides a, b, c (Heron's formula)",
"s = (a + b + c) ÷ 2, area = √[s(s − a)(s − b)(s − c)]"
],
[
"Equilateral triangle",
"area = (√3 ÷ 4)a², height = (√3 ÷ 2)a"
],
[
"Sector of angle θ",
"area = θ ÷ 360 × πr², arc length = θ ÷ 360 × 2πr"
],
[
"Path of width w outside a rectangle l × b",
"area of path = 2w(l + b + 2w)"
],
[
"Diagonal of a cube",
"a√3"
],
[
"Diagonal of a cuboid",
"√(l² + b² + h²)"
],
[
"Radius changes by r%",
"circle area changes by 2r + r²/100 %"
],
[
"Wheel",
"distance in one turn = circumference = 2πr"
],
[
"Melting and recasting",
"total volume stays the same"
]
],
"examples": [
{
"q": "Find the area of a triangle with sides 13 cm, 14 cm and 15 cm.",
"s": [
"s = (13 + 14 + 15) ÷ 2 = 21",
"Area = √(21 × 8 × 7 × 6) = √7056",
"= 84 cm²"
],
"a": "84 cm²"
},
{
"q": "A cylinder has radius 7 cm and height 10 cm. Find its volume (π = 22/7).",
"s": [
"V = πr²h = 22/7 × 7 × 7 × 10",
"= 22 × 7 × 10",
"= 1540 cm³"
],
"a": "1540 cm³"
},
{
"q": "A metal sphere of radius 6 cm is melted and made into small spheres of radius 2 cm. How many small spheres are made?",
"s": [
"Volume stays the same, so number = big volume ÷ small volume",
"= ((4/3)π × 6³) ÷ ((4/3)π × 2³) = 216 ÷ 8",
"= 27"
],
"a": "27"
}
],
"tricks": [
"Learn the triplets 3-4-5, 5-12-13, 8-15-17, 7-24-25; they give diagonals and heights at once.",
"If every length doubles, area becomes 4 times and volume becomes 8 times.",
"Small cubes from a big cube = (big side ÷ small side)³.",
"Take π = 22/7 when the radius is a multiple of 7, otherwise 3.14, unless the question says.",
"Radius up by 10% → circle area up by 21% (10 + 10 + 1)."
],
"mistakes": [
"Mixing units (cm and m) in one formula.",
"Using the diameter in place of the radius.",
"Confusing curved surface area with total surface area.",
"For a cone, using height h where slant height l is needed (curved surface = πrl)."
]
},
"hi": {
"intro": "क्षेत्रमिति यानी चपटी आकृतियों (2D) का क्षेत्रफल और परिमाप, और ठोस चीज़ों (3D) का आयतन और सतह का क्षेत्रफल। RRB में सीधे सूत्र वाले प्रश्न आते हैं, इसलिए सूत्र अच्छे से याद करें और इकाई एक जैसी रखें।",
"concepts": [
{
"h": "2D आकृतियाँ",
"list": [
"आयत: क्षेत्रफल = l × b, परिमाप = 2(l + b), विकर्ण = √(l² + b²)।",
"वर्ग: क्षेत्रफल = a², परिमाप = 4a, विकर्ण = a√2।",
"त्रिभुज: क्षेत्रफल = ½ × आधार × ऊँचाई; समबाहु त्रिभुज का क्षेत्रफल = (√3 ÷ 4)a²।",
"वृत्त: क्षेत्रफल = πr², परिधि = 2πr; अर्धवृत्त का परिमाप = πr + 2r।",
"समांतर चतुर्भुज = आधार × ऊँचाई; समलंब = ½ × (समांतर भुजाओं का जोड़) × ऊँचाई; समचतुर्भुज = ½ × d₁ × d₂।"
]
},
{
"h": "3D आकृतियाँ",
"list": [
"घन: आयतन a³, कुल सतह 6a²",
"घनाभ: आयतन l × b × h, कुल सतह 2(lb + bh + hl)",
"बेलन: आयतन πr²h, घुमावदार सतह 2πrh, कुल सतह 2πr(r + h)",
"शंकु: आयतन ⅓πr²h, घुमावदार सतह πrl, जहाँ l = √(r² + h²)",
"गोला: आयतन (4/3)πr³, सतह 4πr²",
"अर्धगोला: आयतन (2/3)πr³, घुमावदार सतह 2πr², कुल सतह 3πr²"
]
},
{
"h": "इकाइयाँ",
"list": [
"1 m = 100 cm, तो 1 m² = 10,000 cm² और 1 m³ = 10,00,000 cm³।",
"1 लीटर = 1000 cm³ और 1 m³ = 1000 लीटर।",
"1 हेक्टेयर = 10,000 m²।"
]
}
],
"formulas": [
[
"भुजाएँ a, b, c वाला त्रिभुज (हीरोन का सूत्र)",
"s = (a + b + c) ÷ 2, क्षेत्रफल = √[s(s − a)(s − b)(s − c)]"
],
[
"समबाहु त्रिभुज",
"क्षेत्रफल = (√3 ÷ 4)a², ऊँचाई = (√3 ÷ 2)a"
],
[
"θ कोण वाला त्रिज्यखंड",
"क्षेत्रफल = θ ÷ 360 × πr², चाप की लंबाई = θ ÷ 360 × 2πr"
],
[
"l × b आयत के बाहर w चौड़ा रास्ता",
"रास्ते का क्षेत्रफल = 2w(l + b + 2w)"
],
[
"घन का विकर्ण",
"a√3"
],
[
"घनाभ का विकर्ण",
"√(l² + b² + h²)"
],
[
"त्रिज्या r% बदले",
"वृत्त का क्षेत्रफल 2r + r²/100 % बदलता है"
],
[
"पहिया",
"एक चक्कर में दूरी = परिधि = 2πr"
],
[
"पिघलाकर नई चीज़ बनाना",
"कुल आयतन उतना ही रहता है"
]
],
"examples": [
{
"q": "13 cm, 14 cm और 15 cm भुजाओं वाले त्रिभुज का क्षेत्रफल ज्ञात कीजिए।",
"s": [
"s = (13 + 14 + 15) ÷ 2 = 21",
"क्षेत्रफल = √(21 × 8 × 7 × 6) = √7056",
"= 84 cm²"
],
"a": "84 cm²"
},
{
"q": "एक बेलन की त्रिज्या 7 cm और ऊँचाई 10 cm है। इसका आयतन ज्ञात कीजिए (π = 22/7)।",
"s": [
"V = πr²h = 22/7 × 7 × 7 × 10",
"= 22 × 7 × 10",
"= 1540 cm³"
],
"a": "1540 cm³"
},
{
"q": "6 cm त्रिज्या वाले धातु के गोले को पिघलाकर 2 cm त्रिज्या वाले छोटे गोले बनाए गए। कितने छोटे गोले बनेंगे?",
"s": [
"आयतन उतना ही रहता है, तो संख्या = बड़े का आयतन ÷ छोटे का आयतन",
"= ((4/3)π × 6³) ÷ ((4/3)π × 2³) = 216 ÷ 8",
"= 27"
],
"a": "27"
}
],
"tricks": [
"ये तिकड़ियाँ याद रखें: 3-4-5, 5-12-13, 8-15-17, 7-24-25; विकर्ण और ऊँचाई तुरंत मिलती है।",
"हर लंबाई दोगुनी हो तो क्षेत्रफल 4 गुना और आयतन 8 गुना हो जाता है।",
"बड़े घन से छोटे घन = (बड़ी भुजा ÷ छोटी भुजा)³।",
"त्रिज्या 7 का गुणज हो तो π = 22/7 लें, नहीं तो 3.14, जब तक प्रश्न में कुछ और न लिखा हो।",
"त्रिज्या 10% बढ़े → वृत्त का क्षेत्रफल 21% बढ़ता है (10 + 10 + 1)।"
],
"mistakes": [
"एक ही सूत्र में cm और m मिला देना।",
"त्रिज्या की जगह व्यास लगा देना।",
"घुमावदार सतह और कुल सतह के क्षेत्रफल में गड़बड़।",
"शंकु में तिरछी ऊँचाई l की जगह ऊँचाई h लगा देना (घुमावदार सतह = πrl)।"
]
}
});
