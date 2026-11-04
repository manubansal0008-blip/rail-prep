#!/usr/bin/env python3
"""Source of the monthly current-affairs pages. Run:  python3 tools/monthly_src.py  → writes data/monthly/YYYY-MM.js + index.js
Each item: d (date), cat (same keys as daily news), en/hi one-liners, src [name, url]. quiz: 10 MCQs, a = index of the right option."""
import json, os

NODAY = {("2026-10-15", "international"), ("2026-08-31", "scheme")}  # date known only to the month

def I(d, cat, en, hi, *src):
    x = {"d": d, "cat": cat, "en": en, "hi": hi, "src": [{"name": n, "url": u} for n, u in src]}
    if cat == "days" or (d, cat) in NODAY:
        x["nd"] = 1
    return x

def Q(a, en_q, en_o, en_e, hi_q, hi_o, hi_e):
    return {"a": a, "en": {"q": en_q, "o": en_o, "e": en_e}, "hi": {"q": hi_q, "o": hi_o, "e": hi_e}}

MONTHS = {}

# ------------------------------------------------------------------ OCTOBER 2026
MONTHS["2026-10"] = {
 "items": [
  I("2026-10-01", "appointments", "UPSC completed 100 years on 1 October 2026 (the first Public Service Commission was set up on 1 October 1926). PM Modi released a commemorative coin, a postage stamp and a book at Bharat Mandapam, New Delhi.",
    "UPSC ने 1 अक्टूबर 2026 को 100 साल पूरे किए (पहला लोक सेवा आयोग 1 अक्टूबर 1926 को बना था)। प्रधानमंत्री मोदी ने भारत मंडपम, नई दिल्ली में स्मारक सिक्का, डाक टिकट और एक किताब जारी की।",
    ("GKToday", "https://www.gktoday.in/upsc-marks-centenary-celebrations-with-manthan/"), ("PM India", "https://www.pmindia.gov.in/?p=16942814")),
  I("2026-10-04", "sports", "The 20th Asian Games ended in Aichi-Nagoya, Japan (19 Sep–4 Oct). India finished 4th with 85 medals: 21 gold, 27 silver, 37 bronze. China topped the table.",
    "जापान के आइची-नागोया में 20वें एशियाई खेल (19 सितंबर–4 अक्टूबर) ख़त्म हुए। भारत 85 पदकों (21 स्वर्ण, 27 रजत, 37 कांस्य) के साथ चौथे स्थान पर रहा। चीन पहले नंबर पर रहा।",
    ("Wikipedia: 2026 in Indian sports", "https://en.wikipedia.org/wiki/2026_in_Indian_sports")),
  I("2026-10-07", "economy", "The RBI raised the repo rate by 25 basis points to 5.50% on 7 October 2026 – its first rate hike in nearly four years. RBI Governor: Sanjay Malhotra.",
    "RBI ने 7 अक्टूबर 2026 को रेपो रेट 25 बेसिस पॉइंट बढ़ाकर 5.50% कर दी – लगभग चार साल में पहली बढ़ोतरी। RBI गवर्नर: संजय मल्होत्रा।",
    ("AffairsCloud", "https://affairscloud.com/current-affairs-10-11-12-october-2026/")),
  I("2026-10-05", "awards", "Nobel Prizes 2026 (science): Medicine – Karl Deisseroth, Peter Hegemann and Georg Nagel (optogenetics); Physics – Francis Halzen (IceCube, high-energy neutrinos); Chemistry – Henri B. Kagan and Kenso Soai (asymmetric organic synthesis).",
    "नोबेल पुरस्कार 2026 (विज्ञान): चिकित्सा – कार्ल डाइसरोथ, पीटर हेगेमन और जॉर्ज नागेल (ऑप्टोजेनेटिक्स); भौतिकी – फ्रांसिस हाल्ज़ेन (आइसक्यूब, उच्च-ऊर्जा न्यूट्रिनो); रसायन – हेनरी बी. कागन और केंसो सोआई (असममित कार्बनिक संश्लेषण)।",
    ("Padhai.ai", "https://padhai.ai/science-technology/nobel-prize-2026"), ("DMC Education", "https://dmc-education.com/2026/10/09/nobel-prize-2026-winners-list-complete-details-categories-achievements-and-prize-money/")),
  I("2026-10-12", "awards", "Nobel Prizes 2026: Literature – Anne Carson (Canada); Peace – Navi Pillay (former UN human rights chief); Economics – Robert E. Hall and Michael Woodford.",
    "नोबेल पुरस्कार 2026: साहित्य – ऐन कार्सन (कनाडा); शांति – नवी पिल्लै (संयुक्त राष्ट्र की पूर्व मानवाधिकार प्रमुख); अर्थशास्त्र – रॉबर्ट ई. हॉल और माइकल वुडफ़ोर्ड।",
    ("Chronicle India", "https://www.chronicleindia.in/current-affairs/18284-robert-hall-and-michael-woodford-awarded-nobel-prize-in-economics")),
  I("2026-10-14", "international", "Global Hunger Index 2026: India ranked 100th of 122 countries with a score of 24.1 ('serious' category). Theme: 'No Security without Food Security'. The government has called the index flawed.",
    "ग्लोबल हंगर इंडेक्स 2026: भारत 122 देशों में 100वें स्थान पर, स्कोर 24.1 ('गंभीर' श्रेणी)। थीम: 'No Security without Food Security'। सरकार इस सूचकांक को त्रुटिपूर्ण बता चुकी है।",
    ("Free Press Journal", "https://www.freepressjournal.in/world/world-food-day-2026-india-ranks-100th-among-122-countries-in-global-hunger-index"), ("The South First", "https://thesouthfirst.com/health/india-ranks-100th-in-global-hunger-index-behind-bangladesh-nepal-and-sri-lanka/")),
  I("2026-10-15", "international", "Global Innovation Index 2026 (by WIPO): India ranked 38th of 139 economies, 1st among lower-middle-income economies and in Central & Southern Asia. Switzerland topped for the 16th year in a row.",
    "ग्लोबल इनोवेशन इंडेक्स 2026 (WIPO): भारत 139 अर्थव्यवस्थाओं में 38वें स्थान पर, निम्न-मध्यम आय वाले देशों और मध्य व दक्षिण एशिया में पहले स्थान पर। स्विट्ज़रलैंड लगातार 16वें साल पहले नंबर पर।",
    ("WIPO – India profile", "https://www.wipo.int/edocs/gii-ranking/2026/in.pdf")),
  I("2026-10-20", "international", "The India–New Zealand Free Trade Agreement came into force on 20 October 2026 (Vijayadashami). It was signed in New Delhi on 27 April 2026; all Indian exports get duty-free entry to New Zealand, and New Zealand will help bring USD 20 billion of investment to India over 15 years.",
    "भारत–न्यूज़ीलैंड मुक्त व्यापार समझौता 20 अक्टूबर 2026 (विजयादशमी) से लागू हुआ। इस पर 27 अप्रैल 2026 को नई दिल्ली में हस्ताक्षर हुए थे; भारत के सभी निर्यात को न्यूज़ीलैंड में शुल्क-मुक्त प्रवेश मिलेगा और न्यूज़ीलैंड 15 साल में भारत में 20 अरब डॉलर निवेश लाने में मदद करेगा।",
    ("GKToday", "https://www.gktoday.in/india-new-zealand-fta-comes-into-force-with-zero-duty-access/"), ("All India Radio", "https://newsonair.gov.in/india-new-zealand-free-trade-agreement-finalised-comes-into-force-on-oct-20-piyush-goyal/")),
  I("2026-10-24", "sports", "The 5th Asian Para Games in Aichi-Nagoya, Japan ended on 24 October. India won a record 114 medals (30 gold, 35 silver, 49 bronze) and finished 4th.",
    "जापान के आइची-नागोया में 5वें एशियाई पैरा खेल 24 अक्टूबर को ख़त्म हुए। भारत ने रिकॉर्ड 114 पदक (30 स्वर्ण, 35 रजत, 49 कांस्य) जीते और चौथे स्थान पर रहा।",
    ("Wikipedia: 2026 in Indian sports", "https://en.wikipedia.org/wiki/2026_in_Indian_sports")),
  I("2026-10-30", "science", "ISRO's GSLV-F18 launched NVS-03 from Sriharikota on 30 October 2026 – the third next-generation satellite for NavIC, India's own navigation system.",
    "ISRO के GSLV-F18 ने 30 अक्टूबर 2026 को श्रीहरिकोटा से NVS-03 लॉन्च किया – यह भारत की अपनी नेविगेशन प्रणाली NavIC का तीसरा नई पीढ़ी का उपग्रह है।",
    ("ISRO", "https://www.isro.gov.in/ISRO%5FEN/Orbit_manoeuvring_of_NVS03_spacecraft.html")),
  I("2026-10-30", "sports", "Manisha Bhanwala became the first Indian woman world wrestling champion, winning the women's 59 kg gold at the World Championships in Astana, Kazakhstan (beat USA's Abigail Nette 8-6).",
    "मनीषा भनवाला विश्व कुश्ती चैंपियन बनने वाली पहली भारतीय महिला बनीं – अस्ताना (कज़ाखस्तान) में विश्व चैंपियनशिप में महिला 59 किलो का स्वर्ण जीता (अमेरिका की एबिगेल नेट को 8-6 से हराया)।",
    ("The Hindu", "https://www.thehindu.com/sport/manisha-wins-historic-world-title/article71646117.ece")),
  I("2026-10-30", "scheme", "The 24th instalment of PM-KISAN was released from Banaskantha, Gujarat: over ₹18,690 crore to more than 9.34 crore farmers through DBT.",
    "गुजरात के बनासकांठा से PM-KISAN की 24वीं किस्त जारी हुई: 9.34 करोड़ से ज़्यादा किसानों को DBT से ₹18,690 करोड़ से ज़्यादा।",
    ("PIB", "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2330414&lang=2&reg=48")),
  I("2026-10-30", "defence", "The first BIMSTEC Maritime Security Exercise (30 Oct–3 Nov) was hosted by the Indian Navy at Sri Vijaya Puram (Port Blair), Andaman and Nicobar Islands, with all seven BIMSTEC members.",
    "पहला BIMSTEC समुद्री सुरक्षा अभ्यास (30 अक्टूबर–3 नवंबर) भारतीय नौसेना ने श्री विजया पुरम (पोर्ट ब्लेयर), अंडमान-निकोबार में आयोजित किया; BIMSTEC के सभी सातों सदस्य शामिल हुए।",
    ("PIB", "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2330850&lang=1&reg=3")),
  I("2026-10-31", "railways", "Railway Minister Ashwini Vaishnaw and UP CM Yogi Adityanath flagged off the Varanasi–New Delhi Vande Bharat Sleeper Express on 31 October 2026. (The first Vande Bharat Sleeper ran Howrah–Guwahati in January 2026.)",
    "रेल मंत्री अश्विनी वैष्णव और उत्तर प्रदेश के मुख्यमंत्री योगी आदित्यनाथ ने 31 अक्टूबर 2026 को वाराणसी–नई दिल्ली वंदे भारत स्लीपर एक्सप्रेस को हरी झंडी दिखाई। (पहली वंदे भारत स्लीपर जनवरी 2026 में हावड़ा–गुवाहाटी चली थी।)",
    ("PIB", "https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2330492&lang=2&reg=48")),
  I("2026-10-31", "railways", "The Railway Minister said the PM has approved the north corridor of the bullet-train network: Delhi–Agra–Kanpur–Lucknow–Ayodhya–Varanasi–Patna–Guwahati.",
    "रेल मंत्री ने बताया कि प्रधानमंत्री ने बुलेट ट्रेन नेटवर्क के उत्तरी गलियारे को मंज़ूरी दी है: दिल्ली–आगरा–कानपुर–लखनऊ–अयोध्या–वाराणसी–पटना–गुवाहाटी।",
    ("All India Radio", "https://newsonair.gov.in/hi/railway-minister-ashwini-vaishnav-said-prime-minister-narendra-modi-approved-the-northern-corridor-of-the-bullet-train-network/"), ("The Hindu BusinessLine", "https://www.thehindubusinessline.com/economy/logistics/delhi-to-agra-in-59-minutes-pm-modi-approves-north-corridor-of-bullet-train-project/article71651891.ece")),
  I("2026-10-31", "sports", "India won both the men's and women's titles at the first Commonwealth Kabaddi Championship in Ahmedabad (women beat Uganda 35-15, men beat Sri Lanka 54-20).",
    "अहमदाबाद में पहली कॉमनवेल्थ कबड्डी चैंपियनशिप में भारत ने पुरुष और महिला दोनों खिताब जीते (महिलाओं ने युगांडा को 35-15, पुरुषों ने श्रीलंका को 54-20 से हराया)।",
    ("All India Radio", "https://newsonair.gov.in/indian-women-win-inaugural-commonwealth-kabaddi-championship-title/")),
  I("2026-10-31", "appointments", "Air Chief Marshal Ashutosh Dixit took charge as the 29th Chief of the Air Staff, succeeding Air Chief Marshal A.P. Singh.",
    "एयर चीफ़ मार्शल आशुतोष दीक्षित ने 29वें वायु सेना प्रमुख का पद संभाला; उन्होंने एयर चीफ़ मार्शल ए.पी. सिंह की जगह ली।",
    ("PIB", "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2330846&lang=1&reg=3")),
  I("2026-10-31", "economy", "The Centre released an additional tax-devolution instalment of ₹1,09,019 crore to the states; Uttar Pradesh got the largest share (₹19,208 crore).",
    "केंद्र ने राज्यों को ₹1,09,019 करोड़ की अतिरिक्त कर-हिस्सेदारी जारी की; सबसे बड़ा हिस्सा उत्तर प्रदेश को (₹19,208 करोड़)।",
    ("PIB", "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2330997&lang=2&reg=48")),
  I("2026-10-31", "days", "Important days: 2 Oct Gandhi Jayanti; 16 Oct World Food Day; 24 Oct UN Day; 31 Oct Rashtriya Ekta Diwas – 151st birth anniversary of Sardar Vallabhbhai Patel.",
    "ज़रूरी दिन: 2 अक्टूबर गांधी जयंती; 16 अक्टूबर विश्व खाद्य दिवस; 24 अक्टूबर संयुक्त राष्ट्र दिवस; 31 अक्टूबर राष्ट्रीय एकता दिवस – सरदार वल्लभभाई पटेल की 151वीं जयंती।",
    ("Vajiram & Ravi", "https://vajiramandravi.com/current-affairs/important-days-in-october-2026/"), ("The Hindu", "https://www.thehindu.com/news/national/pm-modi-pays-floral-tributes-to-sardar-patel-at-the-statue-of-unity-on-national-unity-day/article71648293.ece")),
 ],
 "quiz": [
  Q(2, "To what level did the RBI raise the repo rate on 7 October 2026?", ["5.25%", "5.75%", "5.50%", "6.00%"], "A 25-basis-point hike took the repo rate to 5.50%.",
       "7 अक्टूबर 2026 को RBI ने रेपो रेट को कितना कर दिया?", ["5.25%", "5.75%", "5.50%", "6.00%"], "25 बेसिस पॉइंट की बढ़ोतरी से रेपो रेट 5.50% हुई।"),
  Q(1, "What was India's rank in the Global Hunger Index 2026?", ["105th", "100th", "102nd", "111th"], "India was 100th of 122 countries with a score of 24.1.",
       "ग्लोबल हंगर इंडेक्स 2026 में भारत किस स्थान पर रहा?", ["105वें", "100वें", "102वें", "111वें"], "भारत 122 देशों में 100वें स्थान पर रहा, स्कोर 24.1।"),
  Q(0, "Who won the Nobel Peace Prize 2026?", ["Navi Pillay", "Anne Carson", "Francis Halzen", "Michael Woodford"], "Navi Pillay won the Peace Prize; Anne Carson won Literature.",
       "नोबेल शांति पुरस्कार 2026 किसे मिला?", ["नवी पिल्लै", "ऐन कार्सन", "फ्रांसिस हाल्ज़ेन", "माइकल वुडफ़ोर्ड"], "शांति पुरस्कार नवी पिल्लै को; साहित्य ऐन कार्सन को।"),
  Q(3, "From which date did the India–New Zealand FTA come into force?", ["1 October 2026", "15 August 2026", "27 April 2026", "20 October 2026"], "It came into force on 20 October 2026 (Vijayadashami); it was signed on 27 April 2026.",
       "भारत–न्यूज़ीलैंड FTA किस तारीख से लागू हुआ?", ["1 अक्टूबर 2026", "15 अगस्त 2026", "27 अप्रैल 2026", "20 अक्टूबर 2026"], "यह 20 अक्टूबर 2026 (विजयादशमी) से लागू हुआ; हस्ताक्षर 27 अप्रैल 2026 को हुए थे।"),
  Q(1, "How many medals did India win at the 2026 Asian Para Games?", ["85", "114", "111", "106"], "A record 114 medals (30 gold).",
       "2026 एशियाई पैरा खेलों में भारत ने कितने पदक जीते?", ["85", "114", "111", "106"], "रिकॉर्ड 114 पदक (30 स्वर्ण)।"),
  Q(2, "In which weight category did Manisha Bhanwala become world wrestling champion?", ["53 kg", "57 kg", "59 kg", "62 kg"], "She won the women's 59 kg title in Astana.",
       "मनीषा भनवाला किस भार वर्ग में विश्व कुश्ती चैंपियन बनीं?", ["53 किलो", "57 किलो", "59 किलो", "62 किलो"], "उन्होंने अस्ताना में महिला 59 किलो का खिताब जीता।"),
  Q(0, "NVS-03, launched on 30 October 2026, is part of which system?", ["NavIC", "GAGAN", "GISAT", "Gaganyaan"], "NVS satellites are for NavIC, India's own navigation system.",
       "30 अक्टूबर 2026 को लॉन्च हुआ NVS-03 किस प्रणाली का हिस्सा है?", ["NavIC", "GAGAN", "GISAT", "गगनयान"], "NVS उपग्रह भारत की अपनी नेविगेशन प्रणाली NavIC के लिए हैं।"),
  Q(3, "Who became the 29th Chief of the Air Staff on 31 October 2026?", ["A.P. Singh", "Dhiraj Seth", "N.S. Raja Subramani", "Ashutosh Dixit"], "Air Chief Marshal Ashutosh Dixit succeeded A.P. Singh.",
       "31 अक्टूबर 2026 को 29वें वायु सेना प्रमुख कौन बने?", ["ए.पी. सिंह", "धीरज सेठ", "एन.एस. राजा सुब्रमणि", "आशुतोष दीक्षित"], "एयर चीफ़ मार्शल आशुतोष दीक्षित ने ए.पी. सिंह की जगह ली।"),
  Q(1, "Where was the first Commonwealth Kabaddi Championship held?", ["Patna", "Ahmedabad", "Jaipur", "Pune"], "Ahmedabad, Gujarat; India won both titles.",
       "पहली कॉमनवेल्थ कबड्डी चैंपियनशिप कहाँ हुई?", ["पटना", "अहमदाबाद", "जयपुर", "पुणे"], "अहमदाबाद (गुजरात); भारत ने दोनों खिताब जीते।"),
  Q(2, "In which year was the first Public Service Commission (today's UPSC) set up?", ["1919", "1935", "1926", "1950"], "On 1 October 1926; UPSC completed 100 years on 1 October 2026.",
       "पहला लोक सेवा आयोग (आज का UPSC) किस साल बना?", ["1919", "1935", "1926", "1950"], "1 अक्टूबर 1926 को; UPSC ने 1 अक्टूबर 2026 को 100 साल पूरे किए।"),
 ],
}

# ------------------------------------------------------------------ SEPTEMBER 2026
MONTHS["2026-09"] = {
 "items": [
  I("2026-09-04", "science", "ISRO's GSLV-F17 launched EOS-05 (GISAT-1A) from Sriharikota on 4 September 2026 – India's first imaging satellite meant to work from geosynchronous orbit. It replaces GISAT-1, lost in a 2021 launch failure.",
    "ISRO के GSLV-F17 ने 4 सितंबर 2026 को श्रीहरिकोटा से EOS-05 (GISAT-1A) लॉन्च किया – भू-समकालिक कक्षा से काम करने वाला भारत का पहला इमेजिंग उपग्रह। यह 2021 में विफल हुए GISAT-1 की जगह है।",
    ("ETV Bharat", "https://www.etvbharat.com/amp/en/technology/indias-first-imaging-satellite-in-geosynchronous-orbit-lifts-off-successfully-enn26090400330"), ("PSU Connect", "https://www.psuconnect.in/psu-news/isro-successfully-launches-gslv-f17-with-eos-05-india-s-first-geosynchronous-imaging-satellite")),
  I("2026-09-13", "international", "India hosted the 18th BRICS Summit at Bharat Mandapam, New Delhi (12–13 September 2026) under the theme 'Building for Resilience, Innovation, Cooperation and Sustainability'. Leaders adopted the 140-paragraph New Delhi Declaration; China will host the 2027 summit.",
    "भारत ने भारत मंडपम, नई दिल्ली में 18वें ब्रिक्स शिखर सम्मेलन (12–13 सितंबर 2026) की मेज़बानी की; थीम: 'Building for Resilience, Innovation, Cooperation and Sustainability'। नेताओं ने 140 पैराग्राफ़ वाला नई दिल्ली घोषणापत्र अपनाया; 2027 का सम्मेलन चीन में होगा।",
    ("SAnews (South Africa)", "https://www.sanews.gov.za/node/84282"), ("Drishti IAS", "https://www.drishtiias.com/state-pcs-current-affairs/brics-new-delhi-declaration-2026/print_manually")),
  I("2026-09-13", "sports", "India won the Women's T20 Asia Cup in Dubai, beating Sri Lanka by 72 runs in the final – a record eighth title. Shafali Verma (68) and Smriti Mandhana (59) starred; Shree Charani took 4 wickets.",
    "भारत ने दुबई में महिला T20 एशिया कप जीता, फ़ाइनल में श्रीलंका को 72 रन से हराया – रिकॉर्ड आठवाँ खिताब। शेफ़ाली वर्मा (68) और स्मृति मंधाना (59) चमकीं; श्री चरणी ने 4 विकेट लिए।",
    ("Al Jazeera", "https://www.aljazeera.com/amp/sports/liveblog/2026/9/13/india-vs-sri-lanka-live-asia-cup-final"), ("GKToday", "https://www.gktoday.in/india-win-record-eighth-womens-asia-cup-title")),
  I("2026-09-19", "sports", "The 20th Asian Games opened in Aichi-Nagoya, Japan on 19 September 2026 (they ran until 4 October).",
    "20वें एशियाई खेल 19 सितंबर 2026 को जापान के आइची-नागोया में शुरू हुए (4 अक्टूबर तक चले)।",
    ("Wikipedia: 2026 in Indian sports", "https://en.wikipedia.org/wiki/2026_in_Indian_sports")),
  I("2026-09-21", "international", "Commerce Minister Piyush Goyal announced that the India–New Zealand FTA would come into force on 20 October 2026, after both countries completed ratification.",
    "वाणिज्य मंत्री पीयूष गोयल ने घोषणा की कि भारत–न्यूज़ीलैंड FTA दोनों देशों की मंज़ूरी पूरी होने के बाद 20 अक्टूबर 2026 से लागू होगा।",
    ("UNI", "https://www.uniindia.com/business-economy/india-new-zealand-fta-to-come-into-force-on-oct-20-piyush-goyal/187034")),
  I("2026-09-22", "awards", "72nd National Film Awards were given by President Droupadi Murmu at Ekta Nagar, Gujarat. Dadasaheb Phalke Award (for 2024): actor Anant Nag. Best Feature Film: Article 370.",
    "72वें राष्ट्रीय फ़िल्म पुरस्कार राष्ट्रपति द्रौपदी मुर्मु ने एकता नगर (गुजरात) में दिए। दादासाहेब फाल्के पुरस्कार (2024 के लिए): अभिनेता अनंत नाग। सर्वश्रेष्ठ फ़ीचर फ़िल्म: आर्टिकल 370।",
    ("Finology Legal", "https://finologylegal.in/blog/recent-updates/september-current-affairs-2026")),
  I("2026-09-30", "economy", "The Cabinet raised MSPs for all six rabi crops for 2027-28: wheat ₹2,610 per quintal (up ₹25), barley ₹2,286; safflower got the biggest rise (₹675).",
    "कैबिनेट ने 2027-28 के लिए सभी छह रबी फ़सलों का MSP बढ़ाया: गेहूँ ₹2,610 प्रति क्विंटल (₹25 ज़्यादा), जौ ₹2,286; सबसे ज़्यादा बढ़ोतरी कुसुम में (₹675)।",
    ("The Federal (PTI)", "https://thefederal.com/category/news/cabinet-approves-rs-25-hike-in-wheat-msp-to-rs-2610-per-quintal-for-2027-28-258133"), ("Manorama Yearbook", "https://www.manoramayearbook.in/current-affairs/india/2026/10/01/msp-for-rabi-crops-explained.html")),
  I("2026-09-30", "days", "Important days: 5 Sep Teachers' Day; 8 Sep International Literacy Day; 14 Sep Hindi Diwas; 21 Sep International Day of Peace.",
    "ज़रूरी दिन: 5 सितंबर शिक्षक दिवस; 8 सितंबर अंतरराष्ट्रीय साक्षरता दिवस; 14 सितंबर हिंदी दिवस; 21 सितंबर अंतरराष्ट्रीय शांति दिवस।",
    ("Finology Legal", "https://finologylegal.in/blog/recent-updates/september-current-affairs-2026")),
 ],
 "quiz": [
  Q(1, "Which satellite did GSLV-F17 launch on 4 September 2026?", ["NVS-03", "EOS-05 (GISAT-1A)", "Oceansat-3", "RISAT-1A"], "EOS-05, also called GISAT-1A – India's first geosynchronous imaging satellite.",
       "4 सितंबर 2026 को GSLV-F17 ने कौन-सा उपग्रह लॉन्च किया?", ["NVS-03", "EOS-05 (GISAT-1A)", "ओशनसैट-3", "RISAT-1A"], "EOS-05, जिसे GISAT-1A भी कहते हैं – भू-समकालिक कक्षा वाला भारत का पहला इमेजिंग उपग्रह।"),
  Q(0, "Which edition of the BRICS Summit did India host in September 2026?", ["18th", "16th", "17th", "20th"], "The 18th BRICS Summit, New Delhi, 12–13 September 2026.",
       "सितंबर 2026 में भारत ने ब्रिक्स शिखर सम्मेलन का कौन-सा संस्करण आयोजित किया?", ["18वाँ", "16वाँ", "17वाँ", "20वाँ"], "18वाँ ब्रिक्स शिखर सम्मेलन, नई दिल्ली, 12–13 सितंबर 2026।"),
  Q(3, "Which country will host the BRICS Summit in 2027?", ["Russia", "Brazil", "South Africa", "China"], "The New Delhi Declaration backed China's 2027 chairship.",
       "2027 में ब्रिक्स शिखर सम्मेलन कौन-सा देश आयोजित करेगा?", ["रूस", "ब्राज़ील", "दक्षिण अफ़्रीका", "चीन"], "नई दिल्ली घोषणापत्र ने 2027 में चीन की अध्यक्षता का समर्थन किया।"),
  Q(2, "In the Women's T20 Asia Cup 2026 final, India beat which team?", ["Pakistan", "Bangladesh", "Sri Lanka", "Thailand"], "India beat Sri Lanka by 72 runs in Dubai.",
       "महिला T20 एशिया कप 2026 के फ़ाइनल में भारत ने किसे हराया?", ["पाकिस्तान", "बांग्लादेश", "श्रीलंका", "थाईलैंड"], "भारत ने दुबई में श्रीलंका को 72 रन से हराया।"),
  Q(1, "How many times has India won the Women's Asia Cup (after 2026)?", ["7", "8", "6", "9"], "2026 was India's record eighth title.",
       "2026 के बाद भारत कुल कितनी बार महिला एशिया कप जीत चुका है?", ["7", "8", "6", "9"], "2026 भारत का रिकॉर्ड आठवाँ खिताब था।"),
  Q(0, "Who received the Dadasaheb Phalke Award (for 2024) in September 2026?", ["Anant Nag", "Mammootty", "Mithun Chakraborty", "Kartik Aaryan"], "Actor Anant Nag, at the 72nd National Film Awards.",
       "सितंबर 2026 में दादासाहेब फाल्के पुरस्कार (2024 के लिए) किसे मिला?", ["अनंत नाग", "मम्मूटी", "मिथुन चक्रवर्ती", "कार्तिक आर्यन"], "अभिनेता अनंत नाग को, 72वें राष्ट्रीय फ़िल्म पुरस्कार में।"),
  Q(2, "What is the wheat MSP for rabi marketing season 2027-28?", ["₹2,425", "₹2,585", "₹2,610", "₹2,286"], "₹2,610 per quintal, up ₹25 from ₹2,585.",
       "रबी विपणन सीज़न 2027-28 के लिए गेहूँ का MSP कितना है?", ["₹2,425", "₹2,585", "₹2,610", "₹2,286"], "₹2,610 प्रति क्विंटल, ₹2,585 से ₹25 ज़्यादा।"),
  Q(3, "Which rabi crop got the biggest MSP increase for 2027-28?", ["Wheat", "Gram", "Lentil", "Safflower"], "Safflower, up ₹675 per quintal.",
       "2027-28 में किस रबी फ़सल का MSP सबसे ज़्यादा बढ़ा?", ["गेहूँ", "चना", "मसूर", "कुसुम"], "कुसुम, ₹675 प्रति क्विंटल।"),
  Q(1, "Hindi Diwas is observed on:", ["5 September", "14 September", "8 September", "21 September"], "14 September.",
       "हिंदी दिवस कब मनाया जाता है?", ["5 सितंबर", "14 सितंबर", "8 सितंबर", "21 सितंबर"], "14 सितंबर।"),
  Q(0, "The 20th Asian Games (2026) were held in:", ["Aichi-Nagoya, Japan", "Hangzhou, China", "Doha, Qatar", "Jakarta, Indonesia"], "Aichi-Nagoya, Japan (19 Sep–4 Oct 2026). The 2030 Games go to Doha.",
       "20वें एशियाई खेल (2026) कहाँ हुए?", ["आइची-नागोया, जापान", "हांगझोउ, चीन", "दोहा, क़तर", "जकार्ता, इंडोनेशिया"], "आइची-नागोया, जापान (19 सितंबर–4 अक्टूबर 2026)। 2030 के खेल दोहा में होंगे।"),
 ],
}

# ------------------------------------------------------------------ AUGUST 2026
MONTHS["2026-08"] = {
 "items": [
  I("2026-08-02", "sports", "The Commonwealth Games in Glasgow, Scotland ended (23 Jul–2 Aug). India finished 4th with 39 medals (13 gold, 17 silver, 9 bronze); boxing gave 10 medals including 7 gold.",
    "स्कॉटलैंड के ग्लासगो में राष्ट्रमंडल खेल (23 जुलाई–2 अगस्त) ख़त्म हुए। भारत 39 पदकों (13 स्वर्ण, 17 रजत, 9 कांस्य) के साथ चौथे स्थान पर रहा; मुक्केबाज़ी में 7 स्वर्ण सहित 10 पदक मिले।",
    ("Wikipedia: 2026 in Indian sports", "https://en.wikipedia.org/wiki/2026_in_Indian_sports"), ("SSBCrack Exams", "https://ssbcrackexams.com/monthly-current-affairs-august-2026/")),
  I("2026-08-15", "states", "On the 80th Independence Day, PM Modi gave his 13th straight Red Fort address and set out 'Sapta Dhara' – seven streams of strength for Viksit Bharat 2047. Vande Mataram, in its 150th year, was sung at the Red Fort for the first time.",
    "80वें स्वतंत्रता दिवस पर प्रधानमंत्री मोदी ने लाल क़िले से लगातार 13वाँ भाषण दिया और विकसित भारत 2047 के लिए 'सप्त धारा' – शक्ति की सात धाराएँ – रखीं। अपने 150वें वर्ष में 'वंदे मातरम्' पहली बार लाल क़िले पर गाया गया।",
    ("Adda247", "https://currentaffairs.adda247.com/independence-day-2026-pm-modi-unveils-sapta-dhara-vision-for-viksit-bharat/"), ("Telangana Today (IANS)", "https://telanganatoday.com/pm-modi-unveils-sapta-dhara-framework-for-indias-growth-and-viksit-bharat")),
  I("2026-08-18", "awards", "National Sports Awards 2026 were announced: 17 Arjuna Awards and no Major Dhyan Chand Khel Ratna this time.",
    "राष्ट्रीय खेल पुरस्कार 2026 घोषित हुए: 17 अर्जुन पुरस्कार, और इस बार कोई मेजर ध्यानचंद खेल रत्न नहीं।",
    ("Wikipedia: 2026 in Indian sports", "https://en.wikipedia.org/wiki/2026_in_Indian_sports")),
  I("2026-08-22", "sports", "BWF World Championships (30th edition) were held in New Delhi, 17–23 August – India hosted for the first time since 2009. Treesa Jolly and Gayatri Gopichand won bronze in women's doubles, India's first women's doubles medal in 15 years.",
    "BWF विश्व चैंपियनशिप (30वाँ संस्करण) नई दिल्ली में 17–23 अगस्त को हुई – 2009 के बाद भारत में पहली बार। ट्रीसा जॉली और गायत्री गोपीचंद ने महिला युगल में कांस्य जीता – 15 साल में भारत का पहला महिला युगल पदक।",
    ("All India Radio", "https://newsonair.gov.in/treesa-jolly-gayatri-gopichand-clinch-bronze-at-bwf-world-championships/"), ("Wikipedia", "https://en.wikipedia.org/wiki/2026_BWF_World_Championships")),
  I("2026-08-23", "science", "India celebrated its 3rd National Space Day on 23 August (the day Chandrayaan-3 landed on the Moon in 2023).",
    "भारत ने 23 अगस्त को तीसरा राष्ट्रीय अंतरिक्ष दिवस मनाया (2023 में इसी दिन चंद्रयान-3 चाँद पर उतरा था)।",
    ("Defence Guru", "https://www.defenceguru.co.in/current-affairs/monthly-current-affairs-august-2026/")),
  I("2026-08-30", "sports", "FIH Men's Hockey World Cup (Belgium & Netherlands): Germany beat Spain 1-0 in the final at Wavre, Belgium, for their 4th title – level with Pakistan's record. India finished 8th.",
    "FIH पुरुष हॉकी विश्व कप (बेल्जियम और नीदरलैंड): जर्मनी ने वावरे (बेल्जियम) में फ़ाइनल में स्पेन को 1-0 से हराकर चौथा खिताब जीता – पाकिस्तान के रिकॉर्ड की बराबरी। भारत 8वें स्थान पर रहा।",
    ("All India Radio", "https://newsonair.gov.in/germany-retain-fih-mens-hockey-world-cup-title-with-1-0-win-over-spain/"), ("Edunovations", "https://edunovations.com/currentaffairs/international/germany-hockey-world-cup-2026/")),
  I("2026-08-30", "international", "PM Modi made a state visit to Tashkent (29–30 August); India and Uzbekistan raised their ties to a Comprehensive Strategic Partnership.",
    "प्रधानमंत्री मोदी ने ताशकंद की राजकीय यात्रा (29–30 अगस्त) की; भारत और उज़्बेकिस्तान ने अपने संबंधों को व्यापक रणनीतिक साझेदारी तक बढ़ाया।",
    ("PM India", "https://www.pmindia.gov.in/en/news_updates/visit-of-pm-to-uzbekistan-and-kyrgyz-republic-29-august-1-september-2026/"), ("The Knowledge Library", "https://www.theknowledgelibrary.in/monthly-current-affairs-august-2026/")),
  I("2026-08-31", "international", "The 26th SCO Summit was held in Bishkek, Kyrgyzstan (31 August–1 September); PM Modi attended.",
    "26वाँ SCO शिखर सम्मेलन बिश्केक (किर्गिज़स्तान) में 31 अगस्त–1 सितंबर को हुआ; प्रधानमंत्री मोदी शामिल हुए।",
    ("PM India", "https://www.pmindia.gov.in/?p=16912158"), ("The Quint", "https://www.thequint.com/news/breaking-news/pm-modi-putin-xi-jinping-sco-bishkek-summit-2026")),
  I("2026-08-31", "economy", "India's real GDP grew 7.8% in April–June 2026 (Q1 FY27), up from 6.9% a year earlier and above the RBI's 7% estimate; nominal GDP grew 10.3%.",
    "अप्रैल–जून 2026 (FY27 की पहली तिमाही) में भारत की वास्तविक GDP 7.8% बढ़ी – एक साल पहले 6.9% थी और RBI के 7% अनुमान से ज़्यादा; नॉमिनल GDP 10.3% बढ़ी।",
    ("All India Radio", "https://newsonair.gov.in/indias-real-gdp-growth-rate-rises-to-7-8-in-first-quarter-of-fy-2026-27/"), ("PIB factsheet", "https://pib.gov.in/FactsheetDetails.aspx?Id=150991")),
  I("2026-08-31", "scheme", "GOBARdhan – the National Circular Bioenergy Scheme – was approved with an outlay of ₹23,731 crore, to run from 2026-27 to 2035-36.",
    "गोबरधन – राष्ट्रीय सर्कुलर बायोएनर्जी योजना – ₹23,731 करोड़ के परिव्यय के साथ मंज़ूर हुई; यह 2026-27 से 2035-36 तक चलेगी।",
    ("PIB factsheet", "https://pib.gov.in/FactsheetDetails.aspx?Id=150991")),
  I("2026-08-31", "days", "Important days: 7 Aug National Handloom Day; 8 Aug Quit India Movement Day; 15 Aug Independence Day (80th); 29 Aug National Sports Day (Major Dhyan Chand's birthday).",
    "ज़रूरी दिन: 7 अगस्त राष्ट्रीय हथकरघा दिवस; 8 अगस्त भारत छोड़ो आंदोलन दिवस; 15 अगस्त स्वतंत्रता दिवस (80वाँ); 29 अगस्त राष्ट्रीय खेल दिवस (मेजर ध्यानचंद का जन्मदिन)।",
    ("Vajiram & Ravi", "https://vajiramandravi.com/current-affairs/important-days-in-august-2026/")),
 ],
 "quiz": [
  Q(2, "Where were the 2026 Commonwealth Games held?", ["Birmingham", "Gold Coast", "Glasgow", "Ahmedabad"], "Glasgow, Scotland (23 July–2 August 2026). Ahmedabad hosts the 2030 Games.",
       "2026 के राष्ट्रमंडल खेल कहाँ हुए?", ["बर्मिंघम", "गोल्ड कोस्ट", "ग्लासगो", "अहमदाबाद"], "ग्लासगो, स्कॉटलैंड (23 जुलाई–2 अगस्त 2026)। 2030 के खेल अहमदाबाद में होंगे।"),
  Q(1, "How many medals did India win at the 2026 Commonwealth Games?", ["61", "39", "85", "45"], "39 medals: 13 gold, 17 silver, 9 bronze.",
       "2026 राष्ट्रमंडल खेलों में भारत ने कितने पदक जीते?", ["61", "39", "85", "45"], "39 पदक: 13 स्वर्ण, 17 रजत, 9 कांस्य।"),
  Q(0, "What name did PM Modi give to the seven-point framework in his 80th Independence Day speech?", ["Sapta Dhara", "Panch Pran", "Navratna", "Saptarishi"], "'Sapta Dhara' – seven streams of strength for Viksit Bharat.",
       "80वें स्वतंत्रता दिवस के भाषण में प्रधानमंत्री ने सात-सूत्री ढाँचे को क्या नाम दिया?", ["सप्त धारा", "पंच प्रण", "नवरत्न", "सप्तऋषि"], "'सप्त धारा' – विकसित भारत के लिए शक्ति की सात धाराएँ।"),
  Q(3, "Which city hosted the BWF World Championships 2026?", ["Hyderabad", "Paris", "Kuala Lumpur", "New Delhi"], "New Delhi, 17–23 August 2026 – India's first since Hyderabad 2009.",
       "BWF विश्व चैंपियनशिप 2026 किस शहर में हुई?", ["हैदराबाद", "पेरिस", "कुआलालंपुर", "नई दिल्ली"], "नई दिल्ली, 17–23 अगस्त 2026 – 2009 (हैदराबाद) के बाद भारत में पहली बार।"),
  Q(1, "Treesa Jolly and Gayatri Gopichand won which medal at the 2026 badminton Worlds?", ["Gold", "Bronze", "Silver", "None"], "Bronze in women's doubles, after losing the semi-final.",
       "2026 बैडमिंटन विश्व चैंपियनशिप में ट्रीसा जॉली और गायत्री गोपीचंद ने कौन-सा पदक जीता?", ["स्वर्ण", "कांस्य", "रजत", "कोई नहीं"], "महिला युगल में कांस्य, सेमीफ़ाइनल हारने के बाद।"),
  Q(2, "Who won the FIH Men's Hockey World Cup 2026?", ["Spain", "Netherlands", "Germany", "Belgium"], "Germany beat Spain 1-0 for their 4th title.",
       "FIH पुरुष हॉकी विश्व कप 2026 किसने जीता?", ["स्पेन", "नीदरलैंड", "जर्मनी", "बेल्जियम"], "जर्मनी ने स्पेन को 1-0 से हराकर चौथा खिताब जीता।"),
  Q(0, "Where was the 26th SCO Summit (31 Aug–1 Sep 2026) held?", ["Bishkek", "Tashkent", "Tianjin", "Astana"], "Bishkek, Kyrgyzstan.",
       "26वाँ SCO शिखर सम्मेलन (31 अगस्त–1 सितंबर 2026) कहाँ हुआ?", ["बिश्केक", "ताशकंद", "तियानजिन", "अस्ताना"], "बिश्केक, किर्गिज़स्तान।"),
  Q(3, "India's real GDP growth in Q1 (April–June) of FY 2026-27 was:", ["6.9%", "7.0%", "8.2%", "7.8%"], "7.8% (GVA grew 8.2%).",
       "FY 2026-27 की पहली तिमाही (अप्रैल–जून) में भारत की वास्तविक GDP वृद्धि कितनी रही?", ["6.9%", "7.0%", "8.2%", "7.8%"], "7.8% (GVA 8.2% बढ़ा)।"),
  Q(1, "National Space Day is celebrated on:", ["15 August", "23 August", "14 July", "29 August"], "23 August – Chandrayaan-3 landed on this day in 2023.",
       "राष्ट्रीय अंतरिक्ष दिवस कब मनाया जाता है?", ["15 अगस्त", "23 अगस्त", "14 जुलाई", "29 अगस्त"], "23 अगस्त – 2023 में इसी दिन चंद्रयान-3 उतरा था।"),
  Q(2, "With which country did India sign a Comprehensive Strategic Partnership on 30 August 2026?", ["Kyrgyzstan", "Kazakhstan", "Uzbekistan", "Tajikistan"], "Uzbekistan, during PM Modi's state visit to Tashkent.",
       "30 अगस्त 2026 को भारत ने किस देश के साथ व्यापक रणनीतिक साझेदारी की?", ["किर्गिज़स्तान", "कज़ाखस्तान", "उज़्बेकिस्तान", "ताजिकिस्तान"], "उज़्बेकिस्तान, प्रधानमंत्री मोदी की ताशकंद यात्रा के दौरान।"),
 ],
}

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.makedirs(f"{root}/data/monthly", exist_ok=True)
for m, v in MONTHS.items():
    for q in v["quiz"]:
        assert 0 <= q["a"] < 4 and len(q["en"]["o"]) == 4 and len(q["hi"]["o"]) == 4
    v["items"].sort(key=lambda x: x["d"])
    with open(f"{root}/data/monthly/{m}.js", "w", encoding="utf-8") as f:
        f.write("RRB.monthLoaded(" + json.dumps({"month": m, **v}, ensure_ascii=False, indent=0) + ");\n")
with open(f"{root}/data/monthly/index.js", "w", encoding="utf-8") as f:
    f.write("// Months with a current-affairs digest (data/monthly/YYYY-MM.js), newest first. Source: tools/monthly_src.py\n")
    f.write("RRB.MONTHS = " + json.dumps(sorted(MONTHS, reverse=True)) + ";\n")
print({m: (len(v["items"]), len(v["quiz"])) for m, v in MONTHS.items()})
