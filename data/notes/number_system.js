// Revision note: number_system (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "number_system",
"en": {
"intro": "Types of numbers, divisibility rules, HCF-LCM and unit digits. Almost every RRB maths section has a question from here.",
"concepts": [
{
"h": "Types of numbers",
"list": [
"Natural numbers: 1, 2, 3, … (counting numbers)",
"Whole numbers: 0, 1, 2, 3, …",
"Integers: … −2, −1, 0, 1, 2, …",
"Rational numbers: can be written as p/q with q ≠ 0 (e.g. 3/4, −5, 0.333…)",
"Irrational numbers: the decimal never ends and never repeats (e.g. √2, √3, π)"
]
},
{
"h": "Prime, composite and co-prime",
"list": [
"Prime: exactly two factors, 1 and the number itself (2, 3, 5, 7, 11, …). 2 is the only even prime.",
"Composite: more than two factors (4, 6, 8, 9, …). 1 is neither prime nor composite.",
"There are 25 prime numbers from 1 to 100.",
"Co-prime: two numbers whose HCF is 1, e.g. 8 and 15. They need not be prime themselves."
]
},
{
"h": "Divisibility rules",
"list": [
"2: last digit is even (0, 2, 4, 6, 8)",
"3: sum of the digits is divisible by 3",
"4: number formed by the last two digits is divisible by 4",
"5: last digit is 0 or 5",
"6: divisible by both 2 and 3",
"8: number formed by the last three digits is divisible by 8",
"9: sum of the digits is divisible by 9",
"11: (sum of digits at odd places) − (sum of digits at even places) is 0 or a multiple of 11"
]
},
{
"h": "HCF and LCM",
"list": [
"HCF (Highest Common Factor): the largest number that divides all the given numbers.",
"LCM (Lowest Common Multiple): the smallest number that is divisible by all the given numbers.",
"Prime factor method: HCF = common primes with their lowest powers; LCM = all primes with their highest powers.",
"Example: 12 = 2² × 3 and 18 = 2 × 3², so HCF = 2 × 3 = 6 and LCM = 2² × 3² = 36."
]
}
],
"formulas": [
[
"Two numbers",
"HCF × LCM = first number × second number"
],
[
"HCF of fractions",
"HCF of numerators ÷ LCM of denominators"
],
[
"LCM of fractions",
"LCM of numerators ÷ HCF of denominators"
],
[
"Number of factors",
"If N = a^p × b^q × c^r (a, b, c prime), factors = (p+1)(q+1)(r+1)"
],
[
"Division",
"Dividend = Divisor × Quotient + Remainder"
],
[
"Sum of first n natural numbers",
"n(n+1) ÷ 2"
],
[
"Sum of squares of first n natural numbers",
"n(n+1)(2n+1) ÷ 6"
],
[
"Sum of cubes of first n natural numbers",
"[n(n+1) ÷ 2]²"
],
[
"Smallest number leaving remainder r when divided by a, b, c",
"LCM(a, b, c) + r"
],
[
"Largest number dividing x, y, z leaving the same remainder",
"HCF of (x − y), (y − z), (x − z)"
],
[
"Largest number dividing x and y leaving remainders r₁ and r₂",
"HCF(x − r₁, y − r₂)"
],
[
"Unit digit cycles",
"2, 3, 7, 8 repeat every 4 powers; 4 and 9 every 2; 0, 1, 5, 6 never change"
]
],
"examples": [
{
"q": "The HCF and LCM of two numbers are 11 and 792. One of the numbers is 88. Find the other number.",
"s": [
"HCF × LCM = product of the two numbers",
"Other number = (11 × 792) ÷ 88",
"= 8712 ÷ 88 = 99"
],
"a": "99"
},
{
"q": "How many factors does 360 have?",
"s": [
"Write 360 in prime factors: 360 = 2³ × 3² × 5¹",
"Number of factors = (3+1)(2+1)(1+1)",
"= 4 × 3 × 2 = 24"
],
"a": "24"
},
{
"q": "Find the unit digit of 7^95.",
"s": [
"Unit digits of 7¹, 7², 7³, 7⁴ are 7, 9, 3, 1 and then repeat (cycle of 4)",
"95 ÷ 4 leaves remainder 3",
"So the unit digit is the same as 7³ = 343, that is 3"
],
"a": "3"
}
],
"tricks": [
"HCF always divides LCM. If the given HCF does not divide the given LCM, no such pair of numbers exists.",
"If the HCF of two numbers is h, write them as h × a and h × b where a and b are co-prime. Very useful when their sum or product is given.",
"1001 = 7 × 11 × 13, so a number like abcabc (e.g. 253253) is divisible by 7, 11 and 13.",
"Unit digit: divide the power by 4 and use the remainder. If the remainder is 0, use the 4th power.",
"Only perfect squares have an odd number of factors (e.g. 36 has 9 factors)."
],
"mistakes": [
"Using HCF × LCM = product for three numbers. It works only for two numbers.",
"Calling 1 a prime number. It is neither prime nor composite.",
"In 'same remainder' questions, taking the HCF of the numbers instead of the HCF of their differences.",
"For the LCM of fractions, taking the LCM of the denominators. It should be the HCF of the denominators."
]
},
"hi": {
"intro": "संख्याओं के प्रकार, विभाज्यता के नियम, HCF-LCM और इकाई का अंक। RRB के गणित सेक्शन में लगभग हर बार यहाँ से प्रश्न आता है।",
"concepts": [
{
"h": "संख्याओं के प्रकार",
"list": [
"प्राकृत संख्याएँ: 1, 2, 3, … (गिनती वाली संख्याएँ)",
"पूर्ण संख्याएँ: 0, 1, 2, 3, …",
"पूर्णांक: … −2, −1, 0, 1, 2, …",
"परिमेय संख्याएँ: जिन्हें p/q के रूप में लिख सकें, q ≠ 0 (जैसे 3/4, −5, 0.333…)",
"अपरिमेय संख्याएँ: दशमलव कभी खत्म नहीं होता और दोहराता भी नहीं (जैसे √2, √3, π)"
]
},
{
"h": "अभाज्य, भाज्य और सह-अभाज्य संख्याएँ",
"list": [
"अभाज्य संख्या: जिसके ठीक दो गुणनखंड हों, 1 और वह खुद (2, 3, 5, 7, 11, …)। 2 अकेली सम अभाज्य संख्या है।",
"भाज्य संख्या: जिसके दो से ज़्यादा गुणनखंड हों (4, 6, 8, 9, …)। 1 न अभाज्य है, न भाज्य।",
"1 से 100 तक 25 अभाज्य संख्याएँ हैं।",
"सह-अभाज्य संख्याएँ: ऐसी दो संख्याएँ जिनका HCF 1 हो, जैसे 8 और 15। इनका खुद अभाज्य होना ज़रूरी नहीं।"
]
},
{
"h": "विभाज्यता के नियम",
"list": [
"2 से: आखिरी अंक सम हो (0, 2, 4, 6, 8)",
"3 से: सभी अंकों का जोड़ 3 से भाग हो",
"4 से: आखिरी दो अंकों से बनी संख्या 4 से भाग हो",
"5 से: आखिरी अंक 0 या 5 हो",
"6 से: 2 और 3 दोनों से भाग हो",
"8 से: आखिरी तीन अंकों से बनी संख्या 8 से भाग हो",
"9 से: सभी अंकों का जोड़ 9 से भाग हो",
"11 से: (विषम स्थानों के अंकों का जोड़) − (सम स्थानों के अंकों का जोड़) = 0 या 11 का गुणज"
]
},
{
"h": "HCF और LCM",
"list": [
"HCF (महत्तम समापवर्तक): वह सबसे बड़ी संख्या जो सभी दी गई संख्याओं को पूरा भाग दे।",
"LCM (लघुत्तम समापवर्त्य): वह सबसे छोटी संख्या जो सभी दी गई संख्याओं से पूरी भाग हो जाए।",
"अभाज्य गुणनखंड विधि: HCF = साझा अभाज्य संख्याएँ, सबसे छोटी घात के साथ; LCM = सभी अभाज्य संख्याएँ, सबसे बड़ी घात के साथ।",
"उदाहरण: 12 = 2² × 3 और 18 = 2 × 3², तो HCF = 2 × 3 = 6 और LCM = 2² × 3² = 36।"
]
}
],
"formulas": [
[
"दो संख्याएँ",
"HCF × LCM = पहली संख्या × दूसरी संख्या"
],
[
"भिन्नों का HCF",
"अंशों का HCF ÷ हरों का LCM"
],
[
"भिन्नों का LCM",
"अंशों का LCM ÷ हरों का HCF"
],
[
"गुणनखंडों की संख्या",
"अगर N = a^p × b^q × c^r (a, b, c अभाज्य), तो गुणनखंड = (p+1)(q+1)(r+1)"
],
[
"भाग",
"भाज्य = भाजक × भागफल + शेषफल"
],
[
"पहली n प्राकृत संख्याओं का जोड़",
"n(n+1) ÷ 2"
],
[
"पहली n प्राकृत संख्याओं के वर्गों का जोड़",
"n(n+1)(2n+1) ÷ 6"
],
[
"पहली n प्राकृत संख्याओं के घनों का जोड़",
"[n(n+1) ÷ 2]²"
],
[
"a, b, c से भाग देने पर हर बार शेष r बचे, ऐसी सबसे छोटी संख्या",
"LCM(a, b, c) + r"
],
[
"x, y, z को भाग देकर हर बार एक जैसा शेष छोड़ने वाली सबसे बड़ी संख्या",
"(x − y), (y − z), (x − z) का HCF"
],
[
"x और y को भाग देकर शेष r₁ और r₂ छोड़ने वाली सबसे बड़ी संख्या",
"HCF(x − r₁, y − r₂)"
],
[
"इकाई अंक का चक्र",
"2, 3, 7, 8 हर 4 घात पर दोहराते हैं; 4 और 9 हर 2 पर; 0, 1, 5, 6 कभी नहीं बदलते"
]
],
"examples": [
{
"q": "दो संख्याओं का HCF 11 और LCM 792 है। एक संख्या 88 है। दूसरी संख्या ज्ञात कीजिए।",
"s": [
"HCF × LCM = दोनों संख्याओं का गुणनफल",
"दूसरी संख्या = (11 × 792) ÷ 88",
"= 8712 ÷ 88 = 99"
],
"a": "99"
},
{
"q": "360 के कितने गुणनखंड हैं?",
"s": [
"360 को अभाज्य गुणनखंडों में लिखें: 360 = 2³ × 3² × 5¹",
"गुणनखंडों की संख्या = (3+1)(2+1)(1+1)",
"= 4 × 3 × 2 = 24"
],
"a": "24"
},
{
"q": "7^95 का इकाई अंक ज्ञात कीजिए।",
"s": [
"7¹, 7², 7³, 7⁴ के इकाई अंक 7, 9, 3, 1 हैं, फिर यही दोहराते हैं (4 का चक्र)",
"95 ÷ 4 पर शेष 3 बचता है",
"इसलिए इकाई अंक वही है जो 7³ = 343 का है, यानी 3"
],
"a": "3"
}
],
"tricks": [
"HCF हमेशा LCM को पूरा भाग देता है। अगर दिया गया HCF, LCM को भाग नहीं देता, तो ऐसी संख्याएँ हो ही नहीं सकतीं।",
"अगर दो संख्याओं का HCF h है, तो उन्हें h × a और h × b लिखें, जहाँ a और b सह-अभाज्य हों। जब जोड़ या गुणनफल दिया हो, तब बहुत काम आता है।",
"1001 = 7 × 11 × 13, इसलिए abcabc जैसी संख्या (जैसे 253253) 7, 11 और 13 तीनों से भाग होती है।",
"इकाई अंक: घात को 4 से भाग दें और शेष देखें। शेष 0 आए तो 4वीं घात लें।",
"सिर्फ़ पूर्ण वर्ग संख्याओं के गुणनखंडों की संख्या विषम होती है (जैसे 36 के 9 गुणनखंड)।"
],
"mistakes": [
"तीन संख्याओं के लिए HCF × LCM = गुणनफल लगाना। यह सिर्फ़ दो संख्याओं पर लागू होता है।",
"1 को अभाज्य संख्या मानना। 1 न अभाज्य है, न भाज्य।",
"'एक जैसा शेष' वाले प्रश्नों में संख्याओं का HCF लेना, जबकि उनके अंतरों का HCF लेना है।",
"भिन्नों के LCM में हरों का LCM लेना। सही है हरों का HCF।"
]
}
});
