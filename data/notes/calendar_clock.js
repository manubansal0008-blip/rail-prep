// Revision note: calendar_clock (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "calendar_clock",
"en": {
"intro": "Calendar questions use odd days to find the day of the week; clock questions use the angle between the hands. Both depend on a few fixed rules.",
"concepts": [
{
"h": "Odd days",
"list": [
"Odd days = days left over after full weeks (the remainder when days are divided by 7).",
"An ordinary year has 365 days = 52 weeks + 1 odd day; a leap year has 366 days = 2 odd days.",
"Leap year: divisible by 4; a century year (1900, 2000) is a leap year only if divisible by 400.",
"100 years = 5 odd days, 200 years = 3, 300 years = 1, 400 years = 0."
]
},
{
"h": "Odd days in months and day codes",
"table": [
[
"31-day months (Jan, Mar, May, Jul, Aug, Oct, Dec)",
"3 odd days"
],
[
"30-day months (Apr, Jun, Sep, Nov)",
"2 odd days"
],
[
"February",
"0 odd days (1 in a leap year)"
],
[
"Day codes",
"0 Sun, 1 Mon, 2 Tue, 3 Wed, 4 Thu, 5 Fri, 6 Sat"
]
]
},
{
"h": "Clock",
"list": [
"The minute hand moves 6° per minute; the hour hand moves ½° per minute (30° per hour).",
"So the minute hand gains 5½° on the hour hand every minute.",
"In a day (24 hours) the hands are together 22 times, opposite 22 times and at right angles 44 times."
]
}
],
"formulas": [
[
"Angle between the hands at H:M",
"|30H − 5.5M|; if it is more than 180°, take 360° minus it"
],
[
"Hands together between H and H + 1",
"at 60H ÷ 11 minutes past H"
],
[
"Same date next year",
"the day moves 1 forward (2 if 29 February comes in between)"
],
[
"Leap year rule",
"divisible by 4; century years only if divisible by 400"
],
[
"Odd days in n days",
"remainder of n ÷ 7"
],
[
"Mirror image of a time",
"11:60 − the given time (for times from 1:00 to 11:59)"
]
],
"examples": [
{
"q": "1 January 2026 was a Thursday. What day of the week will 1 January 2027 be?",
"s": [
"2026 is not a leap year, so it has 365 days = 1 odd day",
"Thursday + 1 day",
"= Friday"
],
"a": "Friday"
},
{
"q": "Find the angle between the hands of a clock at 3:40.",
"s": [
"Angle = |30H − 5.5M| with H = 3, M = 40",
"= |90 − 220| = 130°",
"130° is less than 180°, so the answer is 130°"
],
"a": "130°"
},
{
"q": "1 January 2026 was a Thursday. What day was 26 January 2026 (Republic Day)?",
"s": [
"26 January is 25 days after 1 January",
"25 ÷ 7 leaves a remainder of 4, so 4 odd days",
"Thursday + 4 days = Monday"
],
"a": "Monday"
}
],
"tricks": [
"Day after n days: move forward by the remainder of n ÷ 7.",
"Learn: angle at 3:00 = 90°, at 6:00 = 180°, at 9:00 = 90°.",
"Mirror time = 11:60 − time (3:15 → 8:45).",
"Century years: 1900 was not a leap year, 2000 was.",
"Every year the same date moves 1 day forward; if a 29 February comes in between, it moves 2 days."
],
"mistakes": [
"Treating every century year as a leap year.",
"Forgetting that the hour hand also moves with the minutes (at 3:30 it is not exactly on 3).",
"Counting the starting day itself when adding days.",
"Giving the larger (reflex) angle when the smaller angle is asked."
]
},
"hi": {
"intro": "कैलेंडर के प्रश्नों में विषम दिनों (odd days) से हफ़्ते का दिन निकाला जाता है; घड़ी के प्रश्नों में सुइयों के बीच का कोण। दोनों कुछ तय नियमों पर चलते हैं।",
"concepts": [
{
"h": "विषम दिन",
"list": [
"विषम दिन = पूरे हफ़्तों के बाद बचे दिन (दिनों को 7 से भाग देने पर शेषफल)।",
"साधारण साल में 365 दिन = 52 हफ़्ते + 1 विषम दिन; लीप साल में 366 दिन = 2 विषम दिन।",
"लीप साल: 4 से भाग हो; शताब्दी वाला साल (1900, 2000) तभी लीप है जब 400 से भाग हो।",
"100 साल = 5 विषम दिन, 200 साल = 3, 300 साल = 1, 400 साल = 0।"
]
},
{
"h": "महीनों के विषम दिन और दिनों के कोड",
"table": [
[
"31 दिन वाले महीने (जन, मार्च, मई, जुलाई, अगस्त, अक्टूबर, दिसंबर)",
"3 विषम दिन"
],
[
"30 दिन वाले महीने (अप्रैल, जून, सितंबर, नवंबर)",
"2 विषम दिन"
],
[
"फ़रवरी",
"0 विषम दिन (लीप साल में 1)"
],
[
"दिनों के कोड",
"0 रवि, 1 सोम, 2 मंगल, 3 बुध, 4 गुरु, 5 शुक्र, 6 शनि"
]
]
},
{
"h": "घड़ी",
"list": [
"मिनट की सुई हर मिनट 6° चलती है; घंटे की सुई हर मिनट ½° (हर घंटे 30°)।",
"इसलिए मिनट की सुई हर मिनट घंटे की सुई से 5½° आगे निकलती है।",
"एक दिन (24 घंटे) में सुइयाँ 22 बार साथ होती हैं, 22 बार आमने-सामने और 44 बार समकोण पर।"
]
}
],
"formulas": [
[
"H:M पर सुइयों के बीच कोण",
"|30H − 5.5M|; 180° से ज़्यादा हो तो 360° में से घटाएँ"
],
[
"H और H + 1 के बीच सुइयाँ साथ",
"H बजकर 60H ÷ 11 मिनट पर"
],
[
"अगले साल वही तारीख़",
"दिन 1 आगे खिसकता है (बीच में 29 फ़रवरी आए तो 2)"
],
[
"लीप साल का नियम",
"4 से भाग; शताब्दी वाले साल सिर्फ़ 400 से भाग होने पर"
],
[
"n दिनों में विषम दिन",
"n ÷ 7 का शेषफल"
],
[
"समय की दर्पण छवि",
"11:60 − दिया गया समय (1:00 से 11:59 तक के समय के लिए)"
]
],
"examples": [
{
"q": "1 जनवरी 2026 को गुरुवार था। 1 जनवरी 2027 को कौन-सा दिन होगा?",
"s": [
"2026 लीप साल नहीं है, तो 365 दिन = 1 विषम दिन",
"गुरुवार + 1 दिन",
"= शुक्रवार"
],
"a": "शुक्रवार"
},
{
"q": "3:40 पर घड़ी की सुइयों के बीच का कोण ज्ञात कीजिए।",
"s": [
"कोण = |30H − 5.5M|, जहाँ H = 3, M = 40",
"= |90 − 220| = 130°",
"130°, 180° से कम है, तो उत्तर 130°"
],
"a": "130°"
},
{
"q": "1 जनवरी 2026 को गुरुवार था। 26 जनवरी 2026 (गणतंत्र दिवस) को कौन-सा दिन था?",
"s": [
"26 जनवरी, 1 जनवरी के 25 दिन बाद है",
"25 ÷ 7 का शेषफल 4, तो 4 विषम दिन",
"गुरुवार + 4 दिन = सोमवार"
],
"a": "सोमवार"
}
],
"tricks": [
"n दिन बाद का दिन: n ÷ 7 के शेषफल जितने दिन आगे बढ़ें।",
"याद रखें: 3:00 पर कोण 90°, 6:00 पर 180°, 9:00 पर 90°।",
"दर्पण वाला समय = 11:60 − समय (3:15 → 8:45)।",
"शताब्दी वाले साल: 1900 लीप साल नहीं था, 2000 था।",
"हर साल वही तारीख़ 1 दिन आगे खिसकती है; बीच में 29 फ़रवरी आए तो 2 दिन।"
],
"mistakes": [
"हर शताब्दी वाले साल को लीप साल मान लेना।",
"भूल जाना कि मिनटों के साथ घंटे की सुई भी चलती है (3:30 पर वह ठीक 3 पर नहीं होती)।",
"दिन जोड़ते समय शुरू वाले दिन को भी गिन लेना।",
"छोटा कोण पूछा हो और बड़ा (180° से ज़्यादा) कोण लिख देना।"
]
}
});
