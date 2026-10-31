// Revision note: algebra (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "algebra",
"en": {
"intro": "RRB algebra is mostly identities, x + 1/x type values and simple equations. Putting small values for the letters is a quick way to check answers.",
"concepts": [
{
"h": "Linear equations",
"list": [
"Do the same thing to both sides to keep the balance.",
"Two equations with two unknowns: use elimination (add or subtract the equations) or substitution.",
"a₁x + b₁y = c₁ and a₂x + b₂y = c₂ have exactly one answer if a₁/a₂ ≠ b₁/b₂."
]
},
{
"h": "Quadratic equations",
"list": [
"ax² + bx + c = 0 has roots x = [−b ± √(b² − 4ac)] ÷ 2a.",
"Sum of roots = −b/a and product of roots = c/a.",
"b² − 4ac > 0: two different real roots; = 0: two equal roots; < 0: no real roots."
]
},
{
"h": "x + 1/x results",
"list": [
"If x + 1/x = a, then x² + 1/x² = a² − 2.",
"If x + 1/x = a, then x³ + 1/x³ = a³ − 3a.",
"If x − 1/x = a, then x² + 1/x² = a² + 2."
]
}
],
"formulas": [
[
"(a + b)²",
"a² + b² + 2ab"
],
[
"(a − b)²",
"a² + b² − 2ab"
],
[
"(a + b)² − (a − b)²",
"4ab"
],
[
"a² − b²",
"(a + b)(a − b)"
],
[
"(a + b + c)²",
"a² + b² + c² + 2(ab + bc + ca)"
],
[
"a³ + b³",
"(a + b)³ − 3ab(a + b)"
],
[
"a³ − b³",
"(a − b)³ + 3ab(a − b)"
],
[
"a³ + b³ + c³ − 3abc",
"(a + b + c)(a² + b² + c² − ab − bc − ca)"
],
[
"If a + b + c = 0",
"a³ + b³ + c³ = 3abc"
],
[
"Quadratic ax² + bx + c = 0",
"sum of roots = −b/a, product of roots = c/a"
]
],
"examples": [
{
"q": "If x + 1/x = 5, find x² + 1/x².",
"s": [
"Square both sides: x² + 2 + 1/x² = 25",
"x² + 1/x² = 25 − 2",
"= 23"
],
"a": "23"
},
{
"q": "Solve: 2x + 3y = 12 and x − y = 1.",
"s": [
"From x − y = 1, x = y + 1",
"Put it in the first: 2(y + 1) + 3y = 12 → 5y = 10 → y = 2",
"x = 2 + 1 = 3 (check: 2 × 3 + 3 × 2 = 12)"
],
"a": "x = 3, y = 2"
},
{
"q": "If a + b = 10 and ab = 21, find a³ + b³.",
"s": [
"a³ + b³ = (a + b)³ − 3ab(a + b)",
"= 1000 − 3 × 21 × 10 = 1000 − 630",
"= 370 (check: a, b are 7 and 3 → 343 + 27 = 370)"
],
"a": "370"
}
],
"tricks": [
"Put values: if a result is true for every x, try x = 0 or 1 and check the options.",
"If a + b + c = 0, then a³ + b³ + c³ = 3abc. Example: 1, 2, −3 → 1 + 8 − 27 = −18 = 3 × 1 × 2 × (−3).",
"x + 1/x = 2 means x = 1, so xⁿ + 1/xⁿ = 2 for every power n.",
"x² − 5x + 6 = 0: sum of roots 5 and product 6, so the roots are 2 and 3.",
"For a² + b² when a + b and ab are given: a² + b² = (a + b)² − 2ab."
],
"mistakes": [
"Writing (a + b)² = a² + b² (the 2ab is missing).",
"Sign mistakes when moving a term to the other side.",
"Using a² + 2 for x + 1/x = a; it is a² − 2 (the + 2 is for x − 1/x).",
"Taking the sum of roots as b/a instead of −b/a."
]
},
"hi": {
"intro": "RRB में बीजगणित ज़्यादातर सूत्रों (सर्वसमिकाओं), x + 1/x वाले मान और आसान समीकरणों से आता है। अक्षरों की जगह छोटी संख्याएँ रखकर उत्तर जल्दी जाँचे जा सकते हैं।",
"concepts": [
{
"h": "रैखिक समीकरण",
"list": [
"बराबरी बनाए रखने के लिए दोनों तरफ़ एक ही काम करें।",
"दो अज्ञात, दो समीकरण: समीकरणों को जोड़ें/घटाएँ (विलोपन) या एक का मान दूसरे में रखें (प्रतिस्थापन)।",
"a₁x + b₁y = c₁ और a₂x + b₂y = c₂ का ठीक एक हल होता है अगर a₁/a₂ ≠ b₁/b₂।"
]
},
{
"h": "द्विघात समीकरण",
"list": [
"ax² + bx + c = 0 के मूल x = [−b ± √(b² − 4ac)] ÷ 2a।",
"मूलों का जोड़ = −b/a और मूलों का गुणा = c/a।",
"b² − 4ac > 0: दो अलग वास्तविक मूल; = 0: दो बराबर मूल; < 0: कोई वास्तविक मूल नहीं।"
]
},
{
"h": "x + 1/x वाले नतीजे",
"list": [
"अगर x + 1/x = a, तो x² + 1/x² = a² − 2।",
"अगर x + 1/x = a, तो x³ + 1/x³ = a³ − 3a।",
"अगर x − 1/x = a, तो x² + 1/x² = a² + 2।"
]
}
],
"formulas": [
[
"(a + b)²",
"a² + b² + 2ab"
],
[
"(a − b)²",
"a² + b² − 2ab"
],
[
"(a + b)² − (a − b)²",
"4ab"
],
[
"a² − b²",
"(a + b)(a − b)"
],
[
"(a + b + c)²",
"a² + b² + c² + 2(ab + bc + ca)"
],
[
"a³ + b³",
"(a + b)³ − 3ab(a + b)"
],
[
"a³ − b³",
"(a − b)³ + 3ab(a − b)"
],
[
"a³ + b³ + c³ − 3abc",
"(a + b + c)(a² + b² + c² − ab − bc − ca)"
],
[
"अगर a + b + c = 0",
"a³ + b³ + c³ = 3abc"
],
[
"द्विघात ax² + bx + c = 0",
"मूलों का जोड़ = −b/a, मूलों का गुणा = c/a"
]
],
"examples": [
{
"q": "अगर x + 1/x = 5 है, तो x² + 1/x² ज्ञात कीजिए।",
"s": [
"दोनों तरफ़ वर्ग करें: x² + 2 + 1/x² = 25",
"x² + 1/x² = 25 − 2",
"= 23"
],
"a": "23"
},
{
"q": "हल कीजिए: 2x + 3y = 12 और x − y = 1।",
"s": [
"x − y = 1 से x = y + 1",
"पहले समीकरण में रखें: 2(y + 1) + 3y = 12 → 5y = 10 → y = 2",
"x = 2 + 1 = 3 (जाँच: 2 × 3 + 3 × 2 = 12)"
],
"a": "x = 3, y = 2"
},
{
"q": "अगर a + b = 10 और ab = 21 है, तो a³ + b³ ज्ञात कीजिए।",
"s": [
"a³ + b³ = (a + b)³ − 3ab(a + b)",
"= 1000 − 3 × 21 × 10 = 1000 − 630",
"= 370 (जाँच: a, b = 7 और 3 → 343 + 27 = 370)"
],
"a": "370"
}
],
"tricks": [
"मान रखें: अगर कोई बात हर x के लिए सही है, तो x = 0 या 1 रखकर विकल्प जाँचें।",
"अगर a + b + c = 0, तो a³ + b³ + c³ = 3abc। उदाहरण: 1, 2, −3 → 1 + 8 − 27 = −18 = 3 × 1 × 2 × (−3)।",
"x + 1/x = 2 का मतलब x = 1, तो हर घात n के लिए xⁿ + 1/xⁿ = 2।",
"x² − 5x + 6 = 0: मूलों का जोड़ 5 और गुणा 6, तो मूल 2 और 3 हैं।",
"a + b और ab दिए हों तो a² + b² = (a + b)² − 2ab।"
],
"mistakes": [
"(a + b)² = a² + b² लिख देना (2ab छूट जाता है)।",
"पद को दूसरी तरफ़ ले जाते समय चिह्न की गलती।",
"x + 1/x = a में a² + 2 लगाना; सही a² − 2 है (+ 2 वाला x − 1/x के लिए है)।",
"मूलों का जोड़ −b/a की जगह b/a लेना।"
]
}
});
