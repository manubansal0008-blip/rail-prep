// Revision note: direction (English + Hindi). Loaded on demand by js/notes.js.
RRB.noteLoaded({
"id": "direction",
"en": {
"intro": "Direction questions ask where a person ends up or which way he is facing. Draw the path with North at the top, and use Pythagoras for the shortest distance.",
"concepts": [
{
"h": "Basic directions",
"list": [
"North is up, South is down, East is right and West is left on paper.",
"In-between directions: North-East (NE), North-West (NW), South-East (SE), South-West (SW).",
"A right turn is 90° clockwise; a left turn is 90° anticlockwise."
]
},
{
"h": "Turns",
"list": [
"Facing North, turn right: East",
"Facing North, turn left: West",
"Facing East, turn right: South",
"Facing East, turn left: North",
"Facing South, turn right: West",
"Facing West, turn right: North"
]
},
{
"h": "Shadows",
"list": [
"In the morning the Sun is in the East, so shadows fall towards the West.",
"In the evening the Sun is in the West, so shadows fall towards the East.",
"Around noon the shadow is the shortest."
]
}
],
"formulas": [
[
"Shortest distance",
"√(x² + y²), where x = net East–West distance and y = net North–South distance"
],
[
"Moves in one line",
"subtract opposite moves (5 km North then 3 km South = 2 km North)"
],
[
"Right turn",
"90° clockwise"
],
[
"Left turn",
"90° anticlockwise"
],
[
"Turn 180°",
"faces the opposite direction"
],
[
"Clockwise order",
"N → E → S → W → N"
]
],
"examples": [
{
"q": "Ravi walks 6 km North, turns right and walks 8 km. How far is he from the starting point, and in which direction?",
"s": [
"Turning right from North means he walks East",
"Distance = √(6² + 8²) = √(36 + 64) = √100 = 10 km",
"He is North and East of the start, so the direction is North-East"
],
"a": "10 km, North-East"
},
{
"q": "A man is facing East. He turns right, then right again, and then left. Which direction is he facing now?",
"s": [
"East → right → South",
"South → right → West",
"West → left → South"
],
"a": "South"
},
{
"q": "Seema walks 10 m South, turns left and walks 5 m, turns left and walks 4 m, and turns left again and walks 5 m. How far and in which direction is she from the start?",
"s": [
"South 10 m; left from South is East, 5 m; left from East is North, 4 m; left from North is West, 5 m",
"East 5 and West 5 cancel; South 10 − North 4 = 6 m South",
"She is 6 m South of the start"
],
"a": "6 m, South"
}
],
"tricks": [
"Always draw with North at the top.",
"Keep a count: x (East +, West −) and y (North +, South −).",
"Right turns go N → E → S → W; left turns go the other way.",
"Shadow questions: morning shadow to the West, evening shadow to the East.",
"If the end point is on a straight line from the start, no √ is needed."
],
"mistakes": [
"Turning from the wrong direction: a turn depends on where the person is facing now, not on North.",
"Adding distances in opposite directions instead of subtracting.",
"Giving the direction of the start from the person when the question asks the person from the start (or the opposite).",
"Forgetting the in-between direction (NE, SW) when both x and y are not zero."
]
},
"hi": {
"intro": "दिशा के प्रश्नों में पूछा जाता है कि कोई व्यक्ति आख़िर में कहाँ पहुँचा या किस तरफ़ मुँह करके खड़ा है। उत्तर को ऊपर रखकर रास्ता बनाएँ, और सबसे छोटी दूरी के लिए पाइथागोरस लगाएँ।",
"concepts": [
{
"h": "मूल दिशाएँ",
"list": [
"काग़ज़ पर उत्तर ऊपर, दक्षिण नीचे, पूर्व दाएँ और पश्चिम बाएँ।",
"बीच की दिशाएँ: उत्तर-पूर्व (NE), उत्तर-पश्चिम (NW), दक्षिण-पूर्व (SE), दक्षिण-पश्चिम (SW)।",
"दाएँ मुड़ना = घड़ी की सुई की दिशा में 90°; बाएँ मुड़ना = घड़ी की उल्टी दिशा में 90°।"
]
},
{
"h": "मुड़ना",
"list": [
"उत्तर की ओर मुँह, दाएँ मुड़े: पूर्व",
"उत्तर की ओर मुँह, बाएँ मुड़े: पश्चिम",
"पूर्व की ओर मुँह, दाएँ मुड़े: दक्षिण",
"पूर्व की ओर मुँह, बाएँ मुड़े: उत्तर",
"दक्षिण की ओर मुँह, दाएँ मुड़े: पश्चिम",
"पश्चिम की ओर मुँह, दाएँ मुड़े: उत्तर"
]
},
{
"h": "परछाईं",
"list": [
"सुबह सूरज पूर्व में होता है, तो परछाईं पश्चिम की ओर पड़ती है।",
"शाम को सूरज पश्चिम में होता है, तो परछाईं पूर्व की ओर पड़ती है।",
"दोपहर के आसपास परछाईं सबसे छोटी होती है।"
]
}
],
"formulas": [
[
"सबसे छोटी दूरी",
"√(x² + y²), जहाँ x = पूर्व-पश्चिम की कुल दूरी और y = उत्तर-दक्षिण की कुल दूरी"
],
[
"एक ही लाइन में चलना",
"उल्टी दिशा वाली दूरी घटाएँ (5 km उत्तर फिर 3 km दक्षिण = 2 km उत्तर)"
],
[
"दाएँ मुड़ना",
"घड़ी की दिशा में 90°"
],
[
"बाएँ मुड़ना",
"घड़ी की उल्टी दिशा में 90°"
],
[
"180° मुड़ना",
"उल्टी दिशा में मुँह"
],
[
"घड़ी की दिशा का क्रम",
"उ → पू → द → प → उ"
]
],
"examples": [
{
"q": "रवि 6 km उत्तर चलता है, दाएँ मुड़कर 8 km चलता है। वह शुरू की जगह से कितनी दूर और किस दिशा में है?",
"s": [
"उत्तर से दाएँ मुड़ने पर वह पूर्व में चलता है",
"दूरी = √(6² + 8²) = √(36 + 64) = √100 = 10 km",
"वह शुरू की जगह से उत्तर और पूर्व में है, तो दिशा उत्तर-पूर्व"
],
"a": "10 km, उत्तर-पूर्व"
},
{
"q": "एक आदमी पूर्व की ओर मुँह करके खड़ा है। वह दाएँ मुड़ता है, फिर दाएँ, फिर बाएँ। अब उसका मुँह किस दिशा में है?",
"s": [
"पूर्व → दाएँ → दक्षिण",
"दक्षिण → दाएँ → पश्चिम",
"पश्चिम → बाएँ → दक्षिण"
],
"a": "दक्षिण"
},
{
"q": "सीमा 10 m दक्षिण चलती है, बाएँ मुड़कर 5 m, फिर बाएँ मुड़कर 4 m, और फिर बाएँ मुड़कर 5 m चलती है। वह शुरू की जगह से कितनी दूर और किस दिशा में है?",
"s": [
"दक्षिण 10 m; दक्षिण से बाएँ = पूर्व, 5 m; पूर्व से बाएँ = उत्तर, 4 m; उत्तर से बाएँ = पश्चिम, 5 m",
"पूर्व 5 और पश्चिम 5 कट गए; दक्षिण 10 − उत्तर 4 = 6 m दक्षिण",
"वह शुरू की जगह से 6 m दक्षिण में है"
],
"a": "6 m, दक्षिण"
}
],
"tricks": [
"हमेशा उत्तर को ऊपर रखकर चित्र बनाएँ।",
"हिसाब रखें: x (पूर्व +, पश्चिम −) और y (उत्तर +, दक्षिण −)।",
"दाएँ मुड़ना: उ → पू → द → प; बाएँ मुड़ना उल्टा।",
"परछाईं वाले प्रश्न: सुबह परछाईं पश्चिम में, शाम को पूर्व में।",
"आख़िरी जगह शुरू वाली जगह से एक सीधी लाइन में हो, तो √ की ज़रूरत नहीं।"
],
"mistakes": [
"गलत दिशा से मुड़ना: मुड़ना इस पर निर्भर है कि व्यक्ति अभी किधर देख रहा है, उत्तर पर नहीं।",
"उल्टी दिशा की दूरियाँ घटाने की जगह जोड़ देना।",
"प्रश्न 'शुरू की जगह से व्यक्ति' पूछे और उत्तर 'व्यक्ति से शुरू की जगह' देना (या उल्टा)।",
"x और y दोनों शून्य न हों, तब बीच की दिशा (NE, SW) भूल जाना।"
]
}
});
