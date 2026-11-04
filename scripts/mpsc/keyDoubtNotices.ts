/**
 * The owner's 2026-11-03 ruling on the 203 questions in KEY_DOUBTS.md: notice +
 * grace, MPSC's key KEPT. This file holds the Prelims ones, by config paper id
 * and question number; config.ts folds them into each paper's `notices`, which
 * heads the solution and graces the question in its mock. The Mains ones are in
 * scripts/mpsc-mains/keyDoubtNotices.ts. scripts/mpsc/apply-notices.ts writes
 * them onto the live rows (commit.ts cannot: it resets a paper to PRIVATE).
 */
import { notice } from "./notice";

type Notice = { en: string; mr: string };

export const KEY_DOUBT_NOTICES: Record<string, Record<number, Notice>> = {
  // From MPSC's FINAL keys of the 2025-26 papers, found when the blind solve disagreed (2026-11-04).
  "2025-b": {
    1: notice(
      "MPSC's key gives option C, Shivrampant Paranjape. Paranjape was tried for sedition in 1908 for his articles in Kal, but the sedition case brought over writing on the Muzaffarpur bomb case was against Lokmanya Tilak, for his Kesari articles of May and June 1908: option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, शिवरामपंत परांजपे, बरोबर दिला आहे. परांजपे यांच्यावर 1908 मध्ये 'काळ' मधील लेखांबद्दल राजद्रोहाचा खटला झाला; पण मुजफ्फरपूर बॉम्ब प्रकरणावरील लेखनाबद्दलचा राजद्रोहाचा खटला लोकमान्य टिळकांवर, मे व जून 1908 मधील केसरीतील लेखांबद्दल, भरला गेला: पर्याय A."
    ),
    20: notice(
      "MPSC's key gives option D, statements (b) and (c). Statement (a) is not correct (the Tansa flows into the Vaitarna, and the Vaitarna reaches the sea on its own), but (c) is doubtful too: the Manyad is a tributary of the Girna, which belongs to the Tapi basin, not the Godavari. On that reading only (b) is true, and no option says so.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, विधाने (b) व (c), बरोबर दिला आहे. विधान (a) बरोबर नाही (तानसा वैतरणेला मिळते आणि वैतरणा स्वतंत्रपणे समुद्राला मिळते), पण (c) सुद्धा संशयास्पद आहे: मन्याड ही गिरणेची उपनदी आहे आणि गिरणा तापी खोऱ्यात आहे, गोदावरी खोऱ्यात नाही. त्यानुसार फक्त (b) बरोबर ठरते, आणि असा पर्याय दिलेला नाही."
    ),
    87: notice(
      "No option is right as printed. 52 : 13 is 4 : 1, so the states outnumber the union territories by \\(\\frac{52 - 13}{13} \\times 100 = 300\\%\\), which is not an option. MPSC's key gives option C, 60.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. 52 : 13 म्हणजे 4 : 1, म्हणून राज्यांची संख्या केंद्रशासित प्रदेशांपेक्षा \\(\\frac{52 - 13}{13} \\times 100 = 300\\%\\) ने जास्त आहे; हे उत्तर पर्यायांमध्ये नाही. आयोगाच्या उत्तरतालिकेत पर्याय C, 60, दिला आहे."
    ),
  },
  "2026-b": {
    50: notice(
      "MPSC's key gives option C, both statements correct. Statement A is right (Manohar Joshi and Pankaj Udhas received the Padma Bhushan in 2025, posthumously), but in B Ashok Saraf's 2025 award was the Padma Bhushan, not the Padma Shri; Achyut Palav's was the Padma Shri. That makes the answer only A, option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, दोन्ही विधाने बरोबर, दिला आहे. विधान A बरोबर आहे (मनोहर जोशी व पंकज उधास यांना 2025 मध्ये मरणोत्तर पद्मभूषण मिळाला), पण B मध्ये अशोक सराफ यांना 2025 मध्ये पद्मश्री नव्हे तर पद्मभूषण मिळाला; अच्युत पालव यांना पद्मश्री मिळाला. त्यामुळे उत्तर फक्त A, पर्याय A, ठरते."
    ),
  },
  "2017-b": {
    60: notice(
      "MPSC's key gives option A, only (a). Statement (c) is not correct either: the 2013-14 budget put the fiscal deficit at 4.8% of GDP, not 2.5%. So the key leaves out a second statement that is not correct, and no option names both (a) and (c).",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त (a), बरोबर दिला आहे. विधान (c) सुद्धा बरोबर नाही: 2013-14 च्या अर्थसंकल्पात राजकोषीय तूट GDP च्या 4.8% अंदाजली होती, 2.5% नव्हे. म्हणजे दुसरे चुकीचे विधानही आहे, आणि (a) व (c) दोन्ही सांगणारा पर्याय नाही."
    ),
  },
  "2017-c": {
    17: notice(
      "No option is right as printed. Oil was struck at Bombay High in February 1974, and commercial production began on 21 May 1976; neither date is given exactly. MPSC's key gives option D, 3rd February, 1974.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. बॉम्बे हाय येथे फेब्रुवारी 1974 मध्ये तेल सापडले आणि व्यापारी उत्पादन 21 मे 1976 रोजी सुरू झाले; यांपैकी कोणतीही तारीख पर्यायांत अचूक दिलेली नाही. आयोगाच्या उत्तरतालिकेत पर्याय D, 3 फेब्रुवारी 1974, दिला आहे."
    ),
    31: notice(
      "No option matches the published figures. In 2012-13 engineering exports were about 56.8 billion US dollars out of total exports of about 300 billion, a share close to 19%. MPSC's key gives option B, 21.7%.",
      "प्रसिद्ध आकडेवारीशी कोणताही पर्याय जुळत नाही. 2012-13 मध्ये एकूण सुमारे 300 अब्ज डॉलर निर्यातीपैकी अभियांत्रिकी वस्तूंची निर्यात सुमारे 56.8 अब्ज डॉलर होती, म्हणजे सुमारे 19% वाटा. आयोगाच्या उत्तरतालिकेत पर्याय B, 21.7%, दिला आहे."
    ),
  },
  "2018-b": {
    10: notice(
      "MPSC's key gives option B, (a) and (b). Evaluating the progress of women in the State, (a), is one of the Commission's functions. Implementing the Directive Principles in Articles 38, 39, 39-A and 42, (b), is the work of the State itself; the Commission only reviews safeguards and recommends. So option A, only (a), fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, (a) आणि (b), बरोबर दिला आहे. राज्यातील महिलांच्या प्रगतीचे मूल्यमापन करणे, (a), हे महिला आयोगाचे एक कार्य आहे. कलम 38, 39, 39-अ व 42 मधील मार्गदर्शक तत्त्वे अंमलात आणणे, (b), हे राज्य शासनाचे काम आहे; आयोग फक्त संरक्षक तरतुदींचा आढावा घेऊन शिफारस करतो. म्हणून पर्याय A, फक्त (a), अधिक योग्य ठरतो."
    ),
    35: notice(
      "Two options can be defended. Khadilkar was a close follower of Tilak, option A, and after Tilak's death in 1920 he followed Gandhi, option C. MPSC's key gives option C.",
      "दोन पर्याय समर्थनीय आहेत. खाडिलकर हे टिळकांचे निकटचे अनुयायी होते, पर्याय A, आणि 1920 मध्ये टिळकांच्या निधनानंतर त्यांनी गांधीजींचे अनुयायित्व स्वीकारले, पर्याय C. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
  },
  "2018-c": {
    61: notice(
      "MPSC's key gives option C, college number 3. Working the conditions through, more than one arrangement satisfies all of them, and in one of them S is not in college 3, so S's college cannot be fixed: option D, not confirmed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, महाविद्यालय क्रमांक 3, बरोबर दिला आहे. सर्व अटी तपासल्यास त्या सर्व पूर्ण करणाऱ्या एकापेक्षा जास्त मांडण्या मिळतात, आणि त्यांपैकी एकात S महाविद्यालय 3 मध्ये नाही; म्हणून S चे महाविद्यालय निश्चित सांगता येत नाही: पर्याय D, निश्चित नाही."
    ),
    86: notice(
      "MPSC's key gives option B, only b. Statement a is also correct: Dr. Manmohan Singh was chosen for the Indira Gandhi Prize for Peace, Disarmament and Development (the 2017 prize), and the citation is the one quoted in b. So option C, both, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त b, बरोबर दिला आहे. विधान a सुद्धा बरोबर आहे: डॉ. मनमोहन सिंग यांची शांतता, निःशस्त्रीकरण व विकासासाठीच्या इंदिरा गांधी पुरस्कारासाठी (2017 चा पुरस्कार) निवड झाली होती, आणि b मधील प्रशस्तिपत्रही त्यांचेच आहे. म्हणून पर्याय C, दोन्ही, अधिक योग्य ठरतो."
    ),
  },
  "2019-b": {
    13: notice(
      "MPSC's key gives option D, all the above. The Ramsar Convention is about wetlands, not climate change; the Earth Summit, the Kyoto Protocol and the UNFCCC are the ones tied to climate change, option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, बरोबर दिला आहे. रामसर करार पाणथळ जागांविषयी आहे, हवामान बदलाविषयी नाही; वसुंधरा परिषद, क्योटो करार आणि UNFCCC हे हवामान बदलाशी संबंधित आहेत, म्हणजे पर्याय A."
    ),
    30: notice(
      "MPSC's key gives option D, all four. The Responsive Co-operation Party is credited to M.R. Jayakar, N.C. Kelkar and B.S. Moonje; Madan Mohan Malaviya led a separate group, the Independent Congress Party. So the key is doubtful.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, चारही, बरोबर दिला आहे. प्रतियोगी सहकारिता पक्षाची स्थापना म. रा. जयकर, न. चिं. केळकर व डॉ. बा. शि. मुंजे यांनी केली असे मानले जाते; पं. मदन मोहन मालवीय यांनी स्वतंत्र काँग्रेस पक्ष हा वेगळा गट चालवला. म्हणून हे उत्तर संशयास्पद आहे."
    ),
    37: notice(
      "MPSC's key gives option D. Records date Pringle's posting as Assistant Collector at Poona to 1822, not 1823, and statement A could not be checked against a reliable source, so the key could not be confirmed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D बरोबर दिला आहे. नोंदींनुसार प्रिंगल यांची पुणे येथे सहायक कलेक्टर म्हणून नेमणूक 1822 मध्ये झाली, 1823 मध्ये नव्हे, आणि विधान A विश्वसनीय स्रोतावरून तपासता आले नाही; म्हणून हे उत्तर निश्चित करता आले नाही."
    ),
    70: notice(
      "No option is right as printed. The aim of medium-term fiscal reform is to bring debt down to a sustainable level, (a), but every option that contains (a) also contains (b), increasing the fiscal deficit, which is the opposite of the aim. MPSC's key gives option C, only (c).",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. मध्यम मुदतीच्या राजकोषीय सुधारणांचे उद्दिष्ट कर्ज टिकाऊ पातळीवर आणणे, (a), हे आहे; पण (a) असलेल्या प्रत्येक पर्यायात (b), राजकोषीय तूट वाढवणे, हेही आहे, जे या उद्दिष्टाच्या उलट आहे. आयोगाच्या उत्तरतालिकेत पर्याय C, फक्त (c), दिला आहे."
    ),
  },
  "2019-c": {
    81: notice(
      "MPSC's key gives option A, Bordeaux mixture and sulphur. Sulphur is the standard control for powdery mildew; Bordeaux mixture is the standard spray for downy mildew. So option B, sulphur only, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, बोर्डो मिश्रण व गंधक, बरोबर दिला आहे. भुरी (पावडरी मिल्ड्यू) रोगावर गंधक हा प्रमाणित उपाय आहे; बोर्डो मिश्रण हे केवडा (डाउनी मिल्ड्यू) रोगावरील प्रमाणित फवारणी आहे. म्हणून पर्याय B, फक्त गंधक, अधिक योग्य ठरतो."
    ),
    91: notice(
      "No option is right as printed. Each person gets a different number of melons, so C can never have as many as A: statement (b) is always true, as well as (d). No option gives (b) and (d). MPSC's key gives option D, only (d).",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. प्रत्येकाला वेगवेगळ्या संख्येची कलिंगडे मिळतात, म्हणून C कडे कधीही A इतकी कलिंगडे असू शकत नाहीत: विधान (b) नेहमी सत्य आहे, तसेच (d) सुद्धा. (b) व (d) सांगणारा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय D, फक्त (d), दिला आहे."
    ),
  },
  "2020-b": {
    68: notice(
      "No option fits well. Watching a lot of television, RI, and having no time to shop in the market, RII, are both possible reasons for teleshopping, and no option says both. MPSC's key gives option B, only RII.",
      "कोणताही पर्याय नीट बसत नाही. खूप दूरचित्रवाणी पाहणे, RI, आणि बाजारात खरेदीसाठी वेळ नसणे, RII, ही दोन्ही टेलिशॉपिंगची संभाव्य कारणे आहेत, आणि दोन्ही सांगणारा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त RII, दिला आहे."
    ),
    87: notice(
      "MPSC's key gives option A, only c and d. Statement a also holds: Articles 15(6) and 16(6) give the reservation to economically weaker sections other than the classes already covered (SC, ST and OBC). So option C, a, c and d, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त c आणि d, बरोबर दिला आहे. विधान a सुद्धा बरोबर आहे: कलम 15(6) व 16(6) हे आरक्षण आधीपासून आरक्षण असलेल्या वर्गांव्यतिरिक्त (अनुसूचित जाती, जमाती व इतर मागास वर्ग) आर्थिकदृष्ट्या दुर्बल घटकांना देतात. म्हणून पर्याय C, a, c आणि d, अधिक योग्य ठरतो."
    ),
  },
  "2021-b": {
    16: notice(
      "MPSC's key gives option C, only c. Breaking the caste barrier was the Paramahansa Sabha's chief aim, but sources list women's education and widow remarriage among its reforms too, so no option gives the full set a, b and c.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, फक्त c, बरोबर दिला आहे. जातिभेद मोडणे हे परमहंस सभेचे मुख्य उद्दिष्ट होते, पण स्त्रीशिक्षण व विधवाविवाह यांचाही तिच्या सुधारणांत उल्लेख आढळतो; म्हणून a, b आणि c असा पूर्ण संच देणारा पर्याय नाही."
    ),
    20: notice(
      "MPSC's key gives option C, b, c and d. Tea (plantations in Assam) and wheat (grown in Punjab for export) also spread with the commercialisation of agriculture, so pair a belongs too, and option D, all of the above, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, b, c आणि d, बरोबर दिला आहे. शेतीच्या व्यापारीकरणामुळे चहा (आसाममधील मळे) व गहू (निर्यातीसाठी पंजाबमध्ये) यांचेही उत्पादन वाढले, म्हणून जोडी a सुद्धा बसते आणि पर्याय D, वरील सर्व, अधिक योग्य ठरतो."
    ),
  },
  "2021-c": {
    50: notice(
      "MPSC's key gives option B, dispersed settlements. NCERT gives Bundelkhand as an example of compact villages, built close together for defence, which is option C.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, विखुरलेल्या वस्त्या, बरोबर दिला आहे. NCERT नुसार बुंदेलखंडात संरक्षणासाठी एकत्र बांधलेली केंद्रित (संक्षिप्त) गावे आढळतात, म्हणजे पर्याय C."
    ),
    82: notice(
      "MPSC's key gives option C, (a) and (c). Standard texts (NCERT) class iron as a micronutrient, so statement (a), that N, S and Fe are macronutrients, is not correct, and option D, only (c), fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, (a) आणि (c), बरोबर दिला आहे. प्रमाणित पाठ्यपुस्तकांत (NCERT) लोह हे सूक्ष्म पोषकद्रव्य मानले आहे, म्हणून N, S व Fe ही मुख्य पोषकद्रव्ये आहेत हे विधान (a) बरोबर नाही, आणि पर्याय D, फक्त (c), अधिक योग्य ठरतो."
    ),
    87: notice(
      "No option is a valid argument as printed. The valid chain is (a), (b), (c): modern industry is research driven, Impro is a modern industry, so Impro is research driven. Option B ends on (e), which does not follow. MPSC's key gives option B.",
      "छापलेल्या स्वरूपात कोणताही पर्याय तर्कशुद्ध युक्तिवाद नाही. योग्य क्रम (a), (b), (c) असा आहे: आधुनिक उद्योग संशोधनाधारित असतो, इम्प्रो हा आधुनिक उद्योग आहे, म्हणून इम्प्रो संशोधनाधारित आहे. पर्याय B चा शेवट (e) वर होतो, जे आधीच्या विधानांवरून निघत नाही. आयोगाच्या उत्तरतालिकेत पर्याय B दिला आहे."
    ),
  },
  "2022-b": {
    26: notice(
      "MPSC's key gives option B, (a) and (d). Statement (c) also looks true: the first railways in India were laid on the broad gauge. Since (a), (c) and (d) all hold, no option gives exactly the correct set.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, (a) आणि (d), बरोबर दिला आहे. विधान (c) सुद्धा बरोबर दिसते: भारतातील पहिले लोहमार्ग ब्रॉडगेजवर टाकले गेले. (a), (c) व (d) तिन्ही बरोबर असल्याने अचूक संच देणारा पर्याय नाही."
    ),
    36: notice(
      "MPSC's key gives option B, (a), (b) and (c). Agarkar is linked with Kesari, Maratha and Sudharak; no reliable source links him with Varhad Samachar, (b). So option A, (a) and (c) only, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, (a), (b) आणि (c), बरोबर दिला आहे. आगरकरांचा संबंध केसरी, मराठा व सुधारक यांच्याशी होता; वऱ्हाड समाचार, (b), शी त्यांचा संबंध दाखवणारा विश्वसनीय स्रोत आढळत नाही. म्हणून पर्याय A, फक्त (a) आणि (c), अधिक योग्य ठरतो."
    ),
    42: notice(
      "No option is right as printed. The Maharashtra State Agricultural Marketing Board gives its own date of establishment as 23 March 1984, which is not an option. MPSC's key gives option A, 1986.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. महाराष्ट्र राज्य कृषी पणन मंडळ स्वतःची स्थापना 23 मार्च 1984 रोजी झाल्याचे सांगते; हे वर्ष पर्यायांत नाही. आयोगाच्या उत्तरतालिकेत पर्याय A, 1986, दिला आहे."
    ),
    48: notice(
      "No option matches the published figures. Tourism's share of India's GDP in 2019 was about 6.8% by the World Travel and Tourism Council and about 5% by India's Tourism Satellite Account. MPSC's key gives option D, 9.34%.",
      "प्रसिद्ध आकडेवारीशी कोणताही पर्याय जुळत नाही. 2019 मध्ये भारताच्या GDP मध्ये पर्यटनाचा वाटा जागतिक प्रवास व पर्यटन परिषदेनुसार सुमारे 6.8% आणि भारताच्या पर्यटन उपग्रह लेख्यानुसार सुमारे 5% होता. आयोगाच्या उत्तरतालिकेत पर्याय D, 9.34%, दिला आहे."
    ),
    53: notice(
      "MPSC's key gives option B, only (b). The lack of jobs in rural areas, (c), is itself the reason people migrate to towns, (b), so option A, (b) and (c), fits at least as well.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त (b), बरोबर दिला आहे. ग्रामीण भागात रोजगार उपलब्ध नसणे, (c), हेच लोकांच्या शहरांकडील स्थलांतराचे, (b), कारण आहे; म्हणून पर्याय A, (b) आणि (c), किमान तितकाच योग्य आहे."
    ),
    80: notice(
      "MPSC's key gives option D, (a) and (d). Irrigating saline land damages soil structure and builds up salt, and the salt also inhibits plant growth, (b). Since (a), (b) and (d) all hold, no option gives exactly the correct set.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, (a) आणि (d), बरोबर दिला आहे. क्षारयुक्त जमिनीला पाणी दिल्याने मातीची संरचना बिघडते व क्षार साचतात, आणि क्षारांमुळे वनस्पतींची वाढही खुंटते, (b). (a), (b) व (d) तिन्ही बरोबर असल्याने अचूक संच देणारा पर्याय नाही."
    ),
  },
  "2022-c": {
    55: notice(
      "MPSC's key gives option A, only (a). Jyotiba stands at Wadi Ratnagiri, (a), and the hill is also known as the hill of Kedareshwar, after Jyotiba's name Kedarnath, (d). Since (a) and (d) both hold, no option gives exactly the correct pair.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त (a), बरोबर दिला आहे. जोतिबाचा डोंगर वाडी रत्नागिरी येथे आहे, (a), आणि जोतिबाच्या केदारनाथ या नावावरून त्याला केदारेश्वराचा डोंगरही म्हणतात, (d). (a) व (d) दोन्ही बरोबर असल्याने अचूक जोडी देणारा पर्याय नाही."
    ),
    70: notice(
      "MPSC's key gives option D, all of the above. Statement (c) is not correct: the RBI's 3% bank rate dates from 1935, and in November 1951 it raised the rate to 3.5%, ending the cheap money period rather than starting it. So option A, (a) and (b), fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, बरोबर दिला आहे. विधान (c) बरोबर नाही: रिझर्व्ह बँकेचा 3% बँक दर 1935 पासून होता, आणि नोव्हेंबर 1951 मध्ये तो 3.5% पर्यंत वाढवून स्वस्त पैशाचे धोरण संपवले गेले, सुरू केले गेले नाही. म्हणून पर्याय A, (a) आणि (b), अधिक योग्य ठरतो."
    ),
    88: notice(
      "MPSC's key gives option B, a ban on rearing predator fish. The passage asks for effective, environment-friendly methods of rearing predator fish such as tuna; it does not call for a ban, and no option follows directly from what it says.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, शिकारी माशांच्या संवर्धनावर बंदी, बरोबर दिला आहे. उतारा ट्यूनासारख्या शिकारी माशांच्या संवर्धनासाठी परिणामकारक व पर्यावरणपूरक पद्धती शोधण्याची गरज सांगतो; बंदी घालण्यास सांगत नाही, आणि कोणताही पर्याय उताऱ्यातून थेट निघत नाही."
    ),
  },
  "2023-bc": {
    11: notice(
      "No option is right as printed. The White Revolution, Operation Flood, was launched by the National Dairy Development Board in 1970, which is not an option. MPSC's key gives option A, 1971.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. धवल क्रांती, म्हणजे ऑपरेशन फ्लड, राष्ट्रीय दुग्धविकास मंडळाने 1970 मध्ये सुरू केली; हे वर्ष पर्यायांत नाही. आयोगाच्या उत्तरतालिकेत पर्याय A, 1971, दिला आहे."
    ),
    49: notice(
      "The question rests on a false premise. The Jnanpith Award for 2021-22 went to Damodar Mauzo, who writes in Konkani, not Marathi; none of the options is a Marathi winner for that year. MPSC's key gives option A, Damodar Mauzo.",
      "हा प्रश्न चुकीच्या गृहीतकावर आधारित आहे. 2021-22 चा ज्ञानपीठ पुरस्कार दामोदर मावजो यांना मिळाला, जे कोकणीत लिहितात, मराठीत नव्हे; त्या वर्षीचा मराठी विजेता कोणताही पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय A, दामोदर मावजो, दिला आहे."
    ),
  },
  "asp-2011": {
    66: notice(
      "MPSC's key gives option B, King Solomon. The passage says that in biblical times accountants kept track of goods; King Solomon is only one example from that period, so option A, biblical times, fits at least as well.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, राजा सॉलोमन, बरोबर दिला आहे. उताऱ्यानुसार बायबलकाळात हिशेबनीस वस्तूंच्या नोंदी ठेवत; राजा सॉलोमन हे त्या काळातील एक उदाहरण आहे, म्हणून पर्याय A, बायबलकाळ, किमान तितकाच योग्य आहे."
    ),
    116: notice(
      "MPSC's key gives option B, 21st. Maharashtra's population grew 15.99% in 2001-2011; its rank depends on which states and union territories are counted, so the key could not be confirmed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, 21 वा, बरोबर दिला आहे. 2001-2011 मध्ये महाराष्ट्राची लोकसंख्या 15.99% ने वाढली; त्याचा क्रमांक कोणती राज्ये व केंद्रशासित प्रदेश मोजले यावर अवलंबून आहे, म्हणून हे उत्तर निश्चित करता आले नाही."
    ),
    151: notice(
      "No option matches the published figures. India's rice yield in 1995-96 was about 1,797 kg per hectare. MPSC's key gives option C, 1855.",
      "प्रसिद्ध आकडेवारीशी कोणताही पर्याय जुळत नाही. 1995-96 मध्ये भारतातील तांदळाची उत्पादकता सुमारे 1,797 किलो प्रति हेक्टर होती. आयोगाच्या उत्तरतालिकेत पर्याय C, 1855, दिला आहे."
    ),
    190: notice(
      "MPSC's key gives option B, 50 crore. The figure found for Maharashtra's annual need of fish seed is about 60 crore, which is not an option, so the key could not be confirmed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, 50 कोटी, बरोबर दिला आहे. महाराष्ट्राची मत्स्यबीजाची वार्षिक गरज सुमारे 60 कोटी असल्याचे आढळते; हा आकडा पर्यायांत नाही, म्हणून हे उत्तर निश्चित करता आले नाही."
    ),
  },
  "asp-2012": {
    58: notice(
      "Two options are right. \"I was reading the letter carefully\", option B, and \"I was carefully reading the letter\", option C, are both correct English. MPSC's key gives option C.",
      "दोन पर्याय बरोबर आहेत. \"I was reading the letter carefully\", पर्याय B, आणि \"I was carefully reading the letter\", पर्याय C, ही दोन्ही वाक्ये शुद्ध इंग्रजी आहेत. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
    61: notice(
      "No option is right as printed. The correct complex sentence is \"Can you tell me why you are quiet?\": inside the sentence the question becomes a clause with the normal word order. Option C keeps the question order \"why are you\". MPSC's key gives option C.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. योग्य मिश्र वाक्य \"Can you tell me why you are quiet?\" असे आहे: वाक्याच्या आत प्रश्न हा सामान्य शब्दक्रमाचे उपवाक्य होतो. पर्याय C मध्ये \"why are you\" हा प्रश्नाचा क्रम तसाच राहिला आहे. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
    69: notice(
      "MPSC's key gives option C, education as a failure. The passage does not call education a failure; read as a whole it is about higher learning, option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, शिक्षण: एक अपयश, बरोबर दिला आहे. उतारा शिक्षणाला अपयश म्हणत नाही; संपूर्ण उताऱ्याचा विषय उच्च शिक्षण आहे, म्हणजे पर्याय A."
    ),
    138: notice(
      "No option matches the source figure exactly. Agriculture's share of total employment in 2001 was 58.2%; option C, 59, is only the nearest. MPSC's key gives option C.",
      "स्रोतातील आकड्याशी कोणताही पर्याय नेमका जुळत नाही. 2001 मध्ये एकूण रोजगारात शेतीचा वाटा 58.2% होता; पर्याय C, 59, हा फक्त सर्वात जवळचा आहे. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
  },
  "asp-2016": {
    100: notice(
      "MPSC's key gives option A. Cashew and kokam are coastal (Konkan) fruits, not dryland fruits, and option B has papaya; no option is cleanly a group of dryland fruits.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A बरोबर दिला आहे. काजू व कोकम ही कोकणातील (किनारपट्टीची) फळे आहेत, कोरडवाहू नाहीत, आणि पर्याय B मध्ये पपई आहे; कोणताही पर्याय पूर्णपणे कोरडवाहू फळांचा गट नाही."
    ),
  },
  "asp-2017": {
    4: notice(
      "MPSC's key gives option D, to feel great fear. \"Jivachi ulghal hone\" usually means a restless, troubled state of mind (a turmoil), not fear.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, खूप भीती वाटणे, बरोबर दिला आहे. 'जिवाची उलघाल होणे' याचा प्रचलित अर्थ मनाची घालमेल, अस्वस्थता असा आहे, भीती नव्हे."
    ),
    69: notice(
      "MPSC's key gives option D, all of the above. AGMARKNET mainly gives prices and arrivals of farm produce in markets; it does not provide consumer preferences, so \"all of the above\" is doubtful.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, बरोबर दिला आहे. अॅगमार्कनेट मुख्यतः बाजारातील शेतमालाचे भाव व आवक यांची माहिती देते; ग्राहकांच्या पसंतीची माहिती देत नाही, म्हणून 'वरील सर्व' हे उत्तर संशयास्पद आहे."
    ),
    73: notice(
      "No option is right as printed. The poverty line was set by calorie norms of 2,400 calories a day in rural areas and 2,100 in urban areas; no option gives these. MPSC's key gives option D, less than 2450.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. दारिद्र्यरेषा ग्रामीण भागासाठी दररोज 2,400 व शहरी भागासाठी 2,100 कॅलरी या निकषांवर ठरवली होती; हे आकडे पर्यायांत नाहीत. आयोगाच्या उत्तरतालिकेत पर्याय D, 2450 पेक्षा कमी, दिला आहे."
    ),
  },
  "asp-2018": {
    45: notice(
      "No option is right as printed. Jyotirao Phule founded the Satyashodhak Samaj on 24 September 1873, which is not an option (the key's 14 September looks like a misprint). MPSC's key gives option C.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. महात्मा जोतीराव फुले यांनी सत्यशोधक समाजाची स्थापना 24 सप्टेंबर 1873 रोजी केली; ही तारीख पर्यायांत नाही (उत्तरतालिकेतील 14 सप्टेंबर ही छपाईतील चूक दिसते). आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
    90: notice(
      "MPSC's key gives option A, silver oak. Karanj is the standard green-manure tree, and it also gives timber and fuelwood, option C; silver oak is grown for shade and timber.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, सिल्व्हर ओक, बरोबर दिला आहे. करंज हा हिरवळीच्या खतासाठीचा प्रमाणित वृक्ष असून तो इमारती लाकूड व सरपणही देतो, पर्याय C; सिल्व्हर ओक सावली व इमारती लाकडासाठी लावला जातो."
    ),
  },
  "fsp-2014": {
    30: notice(
      "MPSC's key gives option A, was surprised. The passage says she was \"stupefied, in total disbelief\", so option B, did not believe he had really done so well, fits at least as well.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, आश्चर्य वाटले, बरोबर दिला आहे. उताऱ्यानुसार ती 'स्तंभित, पूर्ण अविश्वासात' होती, म्हणून पर्याय B, त्याने खरोखर इतकी चांगली कामगिरी केली यावर विश्वास बसला नाही, किमान तितकाच योग्य आहे."
    ),
    48: notice(
      "MPSC's key gives option B, only (b). Statement (b) is untrue (C.N.R. Rao studied at Mysore and Banaras Hindu University), but (c) and (d) are untrue too: he is usually called the third scientist to receive the Bharat Ratna, after C.V. Raman and A.P.J. Abdul Kalam, and he headed the Prime Minister's Scientific Advisory Council in 1985 and 2005, not 1994. No option gives that set.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त (b), बरोबर दिला आहे. विधान (b) असत्य आहे (सी. एन. आर. राव यांचे शिक्षण म्हैसूर व बनारस हिंदू विद्यापीठात झाले), पण (c) व (d) सुद्धा असत्य आहेत: सी. व्ही. रामन व ए. पी. जे. अब्दुल कलाम यांच्यानंतर भारतरत्न मिळालेले ते तिसरे वैज्ञानिक मानले जातात, आणि पंतप्रधानांच्या वैज्ञानिक सल्लागार परिषदेचे प्रमुख ते 1985 व 2005 मध्ये होते, 1994 मध्ये नव्हे. हा संच कोणत्याही पर्यायात नाही."
    ),
    77: notice(
      "No option is exact. Ozone gas is pale blue; it is the liquid that is dark blue. MPSC's key gives option B, dark blue.",
      "कोणताही पर्याय अचूक नाही. ओझोन वायू फिकट निळा असतो; गडद निळा रंग द्रवरूप ओझोनचा असतो. आयोगाच्या उत्तरतालिकेत पर्याय B, गडद निळा, दिला आहे."
    ),
  },
  "fsp-2016": {
    49: notice(
      "No option covers what the passage discusses. It takes up theories of history, Justice Ranade as a great man, Hindu society and despotism, and no option gives that whole set. MPSC's key gives option D, (b) only.",
      "उताऱ्यात चर्चिलेले विषय कोणताही पर्याय पूर्ण देत नाही. उताऱ्यात इतिहासाच्या संकल्पना, न्या. रानडे एक महान व्यक्ती म्हणून, हिंदू समाज आणि एकाधिकारशाही या सर्वांचा विचार आहे, आणि हा संपूर्ण संच कोणत्याही पर्यायात नाही. आयोगाच्या उत्तरतालिकेत पर्याय D, फक्त (b), दिला आहे."
    ),
  },
  "fsp-2017": {
    18: notice(
      "MPSC's key gives option C, to feel guilty. \"Usasa takne\" means to heave a sigh of sorrow or regret, which is option B, to feel bad; guilt goes beyond the idiom.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, अपराधीपणा वाटणे, बरोबर दिला आहे. 'उसासा टाकणे' याचा अर्थ दुःखाने किंवा खंताने दीर्घ श्वास सोडणे, म्हणजे वाईट वाटणे, पर्याय B; अपराधीपणा हा अर्थ वाक्प्रचाराच्या पलीकडचा आहे."
    ),
    20: notice(
      "MPSC's key gives option A, a, c and d. The passage blames only working the bullocks beyond their strength, c, and beating them mercilessly, d; failing to keep up the cow-shelter, a, is not given as a cause, and no option is c and d alone.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, अ, क आणि ड, बरोबर दिला आहे. उताऱ्यात धर्माला बट्टा लागण्याची कारणे म्हणून फक्त बैलांकडून शक्तीपलीकडे काम करून घेणे, क, आणि त्यांना निर्दयपणे झोडपणे, ड, ही दिली आहेत; गोशाळेचे जतन न करणे, अ, हे कारण म्हणून दिलेले नाही, आणि फक्त क व ड असा पर्याय नाही."
    ),
    30: notice(
      "MPSC's key gives option C, an error in part c. \"Will be over at 6 pm\" is correct English, so the sentence has no error, option D. (The key may intend \"by 6 pm\".)",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, भाग c मध्ये चूक, बरोबर दिला आहे. \"will be over at 6 pm\" हे शुद्ध इंग्रजी आहे, म्हणून वाक्यात चूक नाही, पर्याय D. (उत्तरतालिकेला कदाचित \"by 6 pm\" अपेक्षित असावे.)"
    ),
    91: notice(
      "MPSC's key gives option D, uncertain. The grandmother of Ila's elder sister is Ila's grandmother too; her only son is their father, his wife is their mother, and her first daughter is Ila's eldest sister. So the girl is Ila's sister, option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, अनिश्चित, बरोबर दिला आहे. इलाच्या मोठ्या बहिणीची आजी ही इलाचीही आजी आहे; तिचा एकुलता एक मुलगा त्यांचे वडील, त्याची पत्नी त्यांची आई, आणि तिची पहिली मुलगी इलाची सर्वांत मोठी बहीण आहे. म्हणून छायाचित्रातील मुलगी इलाची बहीण आहे, पर्याय A."
    ),
  },
  "fsp-2018": {
    2: notice(
      "Two options are right. The sentence is a statement, so it is affirmative-declarative: both A (vidhanarthi) and B (hokararthi) describe it. MPSC's key gives option B.",
      "दोन पर्याय बरोबर आहेत. 'संताप गिळणे संतांना शोभते' हे वाक्य माहिती सांगणारे आहे, म्हणून ते विधानार्थी, पर्याय A, आहे, आणि त्यात नकार नसल्याने होकारार्थी, पर्याय B, सुद्धा आहे. आयोगाच्या उत्तरतालिकेत पर्याय B दिला आहे."
    ),
    12: notice(
      "MPSC's key gives option B, (b) and (c). Anusvar literally means the sound that comes after (anu + svar), which is (b); (c), a sound that rides on the sound, is a popular reading of the word rather than its meaning, and no option gives (b) alone.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, (b) आणि (c), बरोबर दिला आहे. 'अनुस्वार' चा शब्दशः अर्थ नंतर येणारा उच्चार (अनु + स्वार) असा आहे, म्हणजे (b); (c), उच्चारावर स्वार होणारा उच्चार, हे शब्दाचे लोकप्रिय स्पष्टीकरण आहे, अर्थ नव्हे, आणि फक्त (b) असा पर्याय नाही."
    ),
    23: notice(
      "MPSC's key gives option C. The passage presents the nation's response to the Jallianwala Bagh massacre as a sign of India's unity; none of the options says that.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. उतारा जालियनवाला बाग हत्याकांडावरील देशव्यापी प्रतिक्रियेला भारताच्या एकतेचे लक्षण म्हणून मांडतो; कोणताही पर्याय हे सांगत नाही."
    ),
    30: notice(
      "MPSC's key gives option C. \"The essays of Bertrand Russell are not popular\" is a correct sentence; the incorrect one is B, which misplaces \"at Amritsar\" (it should be \"The top of the temple at Amritsar is golden\").",
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. \"The essays of Bertrand Russell are not popular\" हे वाक्य बरोबर आहे; चुकीचे वाक्य B आहे, ज्यात \"at Amritsar\" चुकीच्या जागी आहे (\"The top of the temple at Amritsar is golden\" असे हवे)."
    ),
    32: notice(
      "No option is right as printed. \"She sings well\", (b), and \"I did it anyhow\", (c), are both correct, and no option gives (b) and (c). MPSC's key gives option B, only (b).",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. \"She sings well\", (b), आणि \"I did it anyhow\", (c), ही दोन्ही वाक्ये बरोबर आहेत, आणि (b) व (c) असा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त (b), दिला आहे."
    ),
    40: notice(
      "Two options are incorrect sentences. C, \"Old people always near the death's chariot hurrying near\", has no proper verb, while A only leaves out an optional \"that\". MPSC's key gives option A.",
      "दोन पर्यायांतील वाक्ये चुकीची आहेत. C, \"Old people always near the death's chariot hurrying near\", यात योग्य क्रियापदच नाही, तर A मध्ये फक्त ऐच्छिक \"that\" गाळलेला आहे. आयोगाच्या उत्तरतालिकेत पर्याय A दिला आहे."
    ),
    90: notice(
      "MPSC's key gives option D, more than 3. Using all four letters once each, the meaningful words are READ, DARE and DEAR, three words, option C; \"more than 3\" holds only if shorter words are counted, which the question does not say.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, 3 पेक्षा जास्त, बरोबर दिला आहे. चारही अक्षरे एकदाच वापरून READ, DARE व DEAR असे तीन अर्थपूर्ण शब्द होतात, म्हणजे पर्याय C; लहान शब्दही मोजले तरच '3 पेक्षा जास्त' होते, आणि प्रश्नात तसे म्हटलेले नाही."
    ),
  },
  "ssp-2013": {
    32: notice(
      "No option is right as printed. Only (b) is true: eutrophication happens in still (lentic) water through a gradual build-up of organisms and their products. Algal blooms use up the oxygen and kill fish, so (c) and (d) are false, and no option gives (b) alone. MPSC's key gives option C, (b) and (c).",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. फक्त (b) बरोबर आहे: सुपोषण (युट्रोफिकेशन) स्थिर (संथ) पाण्यात सजीव व त्यांच्या उत्पादांच्या हळूहळू साठण्याने होते. शैवाल बहरामुळे पाण्यातील ऑक्सिजन संपतो आणि मासे मरतात, म्हणून (c) व (d) चूक आहेत, आणि फक्त (b) असा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय C, (b) आणि (c), दिला आहे."
    ),
    47: notice(
      "MPSC's key gives option A, (a), (b), (c), (d). The National Saffron Mission's components include replanting, soil health, irrigation, weather stations and also research and extension, so no option lists all five.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, (a), (b), (c), (d), बरोबर दिला आहे. राष्ट्रीय केशर अभियानात पुनर्लागवड, मृदा आरोग्य, सिंचन, हवामान केंद्रे आणि संशोधन व विस्तार या सर्वांचा समावेश आहे, म्हणून पाचही घटक देणारा पर्याय नाही."
    ),
    62: notice(
      "No option is right as printed. Glucose (sugar) is filtered at the glomerulus like the others and is then reabsorbed in the tubules, so all four are filtered. MPSC's key gives option D, sugar.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. ग्लुकोज (साखर) इतर पदार्थांप्रमाणेच ग्लोमेरुलसमध्ये गाळला जातो आणि नंतर नलिकांमध्ये पुन्हा शोषला जातो; म्हणजे चारही पदार्थ गाळले जातात. आयोगाच्या उत्तरतालिकेत पर्याय D, साखर, दिला आहे."
    ),
    84: notice(
      "No option is exact. Phenolphthalein turns pink in a sodium carbonate solution; option B, purple, is only the nearest. MPSC's key gives option B.",
      "कोणताही पर्याय अचूक नाही. सोडियम कार्बोनेटच्या द्रावणात फिनॉल्फ्थॅलिन गुलाबी रंगाचे होते; पर्याय B, जांभळा, हा फक्त जवळचा आहे. आयोगाच्या उत्तरतालिकेत पर्याय B दिला आहे."
    ),
    98: notice(
      "MPSC's key gives option A, only (a). India recognised the People's Republic of China on 30 December 1949, and Burma had done so first; India also supported the People's Republic's claim to China's Security Council seat. So neither statement is correct, option D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त (a), बरोबर दिला आहे. भारताने 30 डिसेंबर 1949 रोजी चीनच्या जनवादी प्रजासत्ताकाला मान्यता दिली, आणि त्याआधी ब्रह्मदेशाने दिली होती; सुरक्षा परिषदेतील चीनच्या जागेवरील जनवादी प्रजासत्ताकाच्या दाव्याला भारताने पाठिंबाच दिला. म्हणून दोन्ही विधाने चूक आहेत, पर्याय D."
    ),
  },
  "ssp-2014": {
    53: notice(
      "No option is right as printed. On a smooth surface there is no friction, so (c) is false; the forces are the applied force, gravity and the reaction of the surface, (a), (b) and (d), which no option gives. MPSC's key gives option B, all four.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. गुळगुळीत पृष्ठभागावर घर्षण नसते, म्हणून (c) चूक आहे; कार्य करणारी बले म्हणजे लावलेले बल, गुरुत्वबल व पृष्ठभागाची प्रतिक्रिया, (a), (b) व (d), आणि हा संच कोणत्याही पर्यायात नाही. आयोगाच्या उत्तरतालिकेत पर्याय B, चारही, दिला आहे."
    ),
    89: notice(
      "MPSC's key gives option D, only (b). Shourya is a hypersonic surface-to-surface ballistic missile, not a cruise missile, so pair (c) is not correctly matched either: option B, (b) and (c).",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, फक्त (b), बरोबर दिला आहे. शौर्य हे पृष्ठभागावरून पृष्ठभागावर मारा करणारे हायपरसॉनिक बॅलिस्टिक क्षेपणास्त्र आहे, क्रूझ क्षेपणास्त्र नाही; म्हणून जोडी (c) सुद्धा चुकीची आहे: पर्याय B, (b) आणि (c)."
    ),
  },
  "ssp-2015": {
    64: notice(
      "Sources differ on this. Figures from the herbal trade put roots first, while field surveys of remedies put leaves first, so options A and C can both be defended. MPSC's key gives option A, roots.",
      "या प्रश्नावर स्रोतांमध्ये मतभेद आहेत. वनौषधी व्यापाराच्या आकडेवारीनुसार मुळांचा वापर सर्वाधिक आहे, तर औषधोपचारांच्या क्षेत्रीय सर्वेक्षणांनुसार पानांचा; म्हणून पर्याय A व C दोन्ही समर्थनीय आहेत. आयोगाच्या उत्तरतालिकेत पर्याय A, मुळे, दिला आहे."
    ),
  },
  "ssp-2016": {
    20: notice(
      "MPSC's key gives option B. Badrinath (Chaukhamba I, 7,138 m) is higher than Gangotri I (6,672 m), so the descending order is Kanchenjunga, Nanga Parbat, Nanda Devi, Badrinath, Gangotri: option C.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B बरोबर दिला आहे. बद्रीनाथ (चौखंबा I, 7,138 मी.) हे गंगोत्री I (6,672 मी.) पेक्षा उंच आहे, म्हणून उतरता क्रम कांचनजंगा, नंगा पर्वत, नंदादेवी, बद्रीनाथ, गंगोत्री असा आहे: पर्याय C."
    ),
    82: notice(
      "This cannot be settled from reliable sources. Claims about who is left-handed come mostly from popular lists, and Gandhi and Amitabh Bachchan are often described as ambidextrous. MPSC's key gives option D, none of the above.",
      "हे विश्वसनीय स्रोतांवरून निश्चित करता येत नाही. कोण डावखुरा आहे याविषयीचे दावे मुख्यतः लोकप्रिय याद्यांतून येतात, आणि गांधीजी व अमिताभ बच्चन यांचे वर्णन अनेकदा दोन्ही हातांनी लिहिणारे असे केले जाते. आयोगाच्या उत्तरतालिकेत पर्याय D, वरीलपैकी नाही, दिला आहे."
    ),
  },
  "ssp-2017": {
    48: notice(
      "MPSC's key gives option B, all four. A ceiling on the size of holdings is usually taught as a separate land reform, not a tenancy reform, so option D, only a, b and c, fits better; some books group all four together.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, चारही, बरोबर दिला आहे. जमीनधारणेवरील कमाल मर्यादा हा सहसा कुळकायदा सुधारणेपेक्षा वेगळा जमीन सुधारणा उपाय म्हणून शिकवला जातो, म्हणून पर्याय D, फक्त a, b आणि c, अधिक योग्य ठरतो; काही पुस्तके चारही एकत्र देतात."
    ),
    86: notice(
      "MPSC's key gives option C, all four. The Commonwealth adopted a Charter in 2013, so statement b is not correct and \"all correct\" cannot be right.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, चारही बरोबर, दिला आहे. राष्ट्रकुलाने 2013 मध्ये सनद (चार्टर) स्वीकारली, म्हणून विधान b बरोबर नाही आणि 'सर्व बरोबर' हे उत्तर असू शकत नाही."
    ),
  },
  "ssp-2018": {
    43: notice(
      "MPSC's key gives option C, 60. Sucrose gives one glucose and one fructose, each yielding about 30 to 32 ATP on modern figures, so the maximum is about 64 (on older figures, 72 to 76); 60 holds only on the lower modern figure.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, 60, बरोबर दिला आहे. सुक्रोजपासून एक ग्लुकोज व एक फ्रुक्टोज मिळतात; आधुनिक आकड्यांनुसार प्रत्येकापासून सुमारे 30 ते 32 ATP मिळतात, म्हणून कमाल सुमारे 64 (जुन्या आकड्यांनुसार 72 ते 76); 60 हे फक्त कमी आधुनिक आकड्यानुसार येते."
    ),
    58: notice(
      "MPSC's key gives option D, none incorrect. Since the Eleventh Amendment (1961) the Vice-President is elected by all members of both Houses, elected and nominated, so statement a is incorrect: option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, यापैकी नाही, बरोबर दिला आहे. अकराव्या घटनादुरुस्तीपासून (1961) उपराष्ट्रपतीची निवड दोन्ही सभागृहांचे सर्व सदस्य, निर्वाचित व नामनिर्देशित, करतात; म्हणून विधान a चूक आहे: पर्याय A."
    ),
    89: notice(
      "MPSC's key gives option B, Vishwamitra and the Bharata tribe. The Battle of the Ten Kings was fought between Sudas, king of the Bharatas (whose priest was Vasishtha), and a confederation of ten tribes, on whose side Vishwamitra stood; no option states this cleanly.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, विश्वामित्र व भरत टोळी, बरोबर दिला आहे. दाशराज्ञ युद्ध भरतांचा राजा सुदास (ज्याचे पुरोहित वसिष्ठ होते) आणि दहा टोळ्यांचा संघ यांच्यात झाले, आणि विश्वामित्र त्या संघाच्या बाजूने होते; कोणताही पर्याय हे नेमकेपणाने सांगत नाही."
    ),
    90: notice(
      "MPSC's key gives option A, the minor edicts. The standard source for Ashoka's Dhamma is his Fourteen Major Rock Edicts, option D; the minor edicts deal mainly with his own conversion.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, लघु शिलालेख, बरोबर दिला आहे. अशोकाच्या धम्माविषयीचा प्रमुख स्रोत त्याचे चौदा मुख्य शिलालेख आहेत, पर्याय D; लघु शिलालेख मुख्यतः त्याच्या स्वतःच्या धर्मांतराविषयी आहेत."
    ),
  },
  "ssp-2019": {
    1: notice(
      "MPSC's key gives option D, none of the above. The standard reason is statement a: the astronaut and the satellite fall freely together, so the floor exerts no force on the astronaut. \"None of the above\" does not fit.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, यापैकी नाही, बरोबर दिला आहे. प्रमाणित कारण विधान a हे आहे: अंतराळवीर व उपग्रह एकत्र मुक्तपतन करतात, म्हणून उपग्रहाचा तळ अंतराळवीरावर कोणतेही बल लावत नाही. 'यापैकी नाही' हे उत्तर बसत नाही."
    ),
    70: notice(
      "No option is right as printed. Conglomerate is a sedimentary rock, not an extrusive igneous rock, and no extrusive igneous rock is listed in column B, so no matching is fully correct. MPSC's key gives option B.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. कॉन्ग्लोमरेट हा गाळाचा खडक आहे, बाह्य अग्निजन्य नाही, आणि स्तंभ B मध्ये बाह्य अग्निजन्य खडक दिलेलाच नाही; म्हणून कोणतीही जुळणी पूर्णपणे बरोबर नाही. आयोगाच्या उत्तरतालिकेत पर्याय B दिला आहे."
    ),
    84: notice(
      "MPSC's key gives option B, water pollution. Burden-of-disease studies for India (the Global Burden of Disease study, published in The Lancet) rank air pollution, option A, as the largest environmental cause of ill health.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, जलप्रदूषण, बरोबर दिला आहे. भारतासाठीच्या रोगभार अभ्यासांत (ग्लोबल बर्डन ऑफ डिसीज, द लॅन्सेट मध्ये प्रसिद्ध) वायुप्रदूषण, पर्याय A, हे आरोग्य बिघडण्याचे सर्वांत मोठे पर्यावरणीय कारण ठरले आहे."
    ),
  },
  "ssp-2020": {
    41: notice(
      "MPSC's key gives option D, all of them. The National Child Labour Project began in 1988, not 2015, so statement (a) is not correct; (b) and (c) hold, and no option gives (b) and (c).",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, सर्व, बरोबर दिला आहे. राष्ट्रीय बालकामगार प्रकल्प 1988 मध्ये सुरू झाला, 2015 मध्ये नव्हे; म्हणून विधान (a) बरोबर नाही. (b) व (c) बरोबर आहेत, आणि (b) व (c) असा पर्याय नाही."
    ),
    62: notice(
      "MPSC's key gives option C, both. A sarcomere is the particular segment of a myofibril between two Z lines, not any segment of the fibre, so (a) is not correct and option B, only (b), fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, दोन्ही, बरोबर दिला आहे. सार्कोमिअर म्हणजे मायोफायब्रिलमधील दोन Z रेषांमधला विशिष्ट भाग, तंतूचा कोणताही भाग नव्हे; म्हणून (a) बरोबर नाही आणि पर्याय B, फक्त (b), अधिक योग्य ठरतो."
    ),
    98: notice(
      "MPSC's key gives option D, (a), (b), (c). The 2019 Sahitya Akademi Awards were announced in 23 languages, so (a) is correct; the incorrect statements are (b) and (c), option C.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, (a), (b), (c), बरोबर दिला आहे. 2019 चे साहित्य अकादमी पुरस्कार 23 भाषांमध्ये जाहीर झाले, म्हणून (a) बरोबर आहे; चुकीची विधाने (b) व (c) आहेत, पर्याय C."
    ),
  },
  "ssp-2022": {
    48: notice(
      "MPSC's key gives option B, only (a) and (c). Statement (d) is also correct: growth hormone (STH), TSH and ACTH come from the adenohypophysis. So option A, (a), (c) and (d), fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त (a) आणि (c), बरोबर दिला आहे. विधान (d) सुद्धा बरोबर आहे: वृद्धी संप्रेरक (STH), TSH व ACTH ही अॅडिनोहायपोफायसिसमधून स्रवतात. म्हणून पर्याय A, (a), (c) आणि (d), अधिक योग्य ठरतो."
    ),
    49: notice(
      "MPSC's key gives option B, dehydrogenation. In the Krebs cycle the enzyme fumarase adds a molecule of water to fumaric acid to give malic acid: that is hydration, option D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, डीहायड्रोजनेशन, बरोबर दिला आहे. क्रेब्स चक्रात फ्युमरेज हे विकर फ्युमरिक आम्लात पाण्याचा एक रेणू मिळवून मॅलिक आम्ल बनवते: ही जलयोजन (हायड्रेशन) क्रिया आहे, पर्याय D."
    ),
    86: notice(
      "MPSC's key gives option A, Lok Sabha. No Kolhapur organisation of that name from before the All India States People's Conference could be found in reliable sources, so the key could not be checked.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, लोकसभा, बरोबर दिला आहे. अखिल भारतीय संस्थानी प्रजा परिषदेपूर्वी कोल्हापुरात या नावाची संस्था कार्यरत होती असे विश्वसनीय स्रोतांत आढळले नाही, म्हणून हे उत्तर तपासता आले नाही."
    ),
  },
  "ssp-2024": {
    7: notice(
      "MPSC's key gives option C, khiraj and zakat. Non-Muslim landholders paid khiraj, but Muslim landholders paid ushr on their land; zakat was a separate religious levy. No option gives khiraj and ushr.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, खराज व जकात, बरोबर दिला आहे. बिगरमुस्लिम जमीनधारक खराज देत, तर मुस्लिम जमीनधारक त्यांच्या जमिनीवर उश्र देत; जकात हा वेगळा धार्मिक कर होता. खराज व उश्र असा पर्याय नाही."
    ),
    46: notice(
      "MPSC's key gives option A, 4.5 to 5.0%. Only a 4.5% figure for the Twelfth Plan's inflation aim could be found, not a range, so the key could not be confirmed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, 4.5 ते 5.0%, बरोबर दिला आहे. बाराव्या योजनेच्या चलनवाढ उद्दिष्टासाठी फक्त 4.5% हा आकडा आढळला, श्रेणी नाही; म्हणून हे उत्तर निश्चित करता आले नाही."
    ),
    94: notice(
      "Two options are untrue. Karpoori Thakur won his 1952 seat from Tajpur, not Samastipur, option D; and the first non-Congress Chief Minister of Bihar was Mahamaya Prasad Sinha in 1967, so option B is untrue too. MPSC's key gives option D.",
      "दोन पर्याय असत्य आहेत. कर्पूरी ठाकूर 1952 मध्ये ताजपूर मतदारसंघातून निवडून आले, समस्तीपूरमधून नव्हे, पर्याय D; आणि बिहारचे पहिले बिगरकाँग्रेस मुख्यमंत्री 1967 मध्ये महामाया प्रसाद सिन्हा होते, म्हणून पर्याय B सुद्धा असत्य आहे. आयोगाच्या उत्तरतालिकेत पर्याय D दिला आहे."
    ),
    100: notice(
      "MPSC's key gives option C, (a) and (b). MSEDCL describes the solar plants as set up within 5 to 10 km of a 33 kV substation, so statement (d) may also be correct, and no option fits cleanly.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, (a) आणि (b), बरोबर दिला आहे. महावितरणनुसार सौर प्रकल्प 33 kV उपकेंद्रापासून 5 ते 10 किमीच्या आत उभारले जातात, म्हणून विधान (d) सुद्धा बरोबर असू शकते, आणि कोणताही पर्याय नेमका बसत नाही."
    ),
  },
  "ssp-2025": {
    15: notice(
      "MPSC's key gives option C, Prarthana Samaj. The initiation rite of eating bread made by a Christian and drinking water from a Muslim belongs to the Paramahansa Mandali, the forerunner of the Prarthana Samaj, not to any of the Samajs listed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, प्रार्थना समाज, बरोबर दिला आहे. ख्रिश्चनाने बनवलेला पाव खाणे व मुसलमानाच्या हातचे पाणी पिणे हा दीक्षाविधी परमहंस मंडळीचा होता, जी प्रार्थना समाजाची पूर्वसूरी होती; दिलेल्या कोणत्याही समाजाचा तो विधी नव्हता."
    ),
    // Q39 and Q89: MPSC's FINAL key (2 Jan 2026) changed the first key's answer.
    39: notice(
      "MPSC's final key gives option B, both statements incorrect (its first key gave A). The National Food Security Act, 2013 covers up to 75% of the rural and 50% of the urban population, and prices grain at Rs 3 a kg for rice, Rs 2 for wheat and Re 1 for coarse grains, so both statements read as correct: option A.",
      "आयोगाच्या अंतिम उत्तरतालिकेत पर्याय B, दोन्ही विधाने चूक, बरोबर दिला आहे (पहिल्या उत्तरतालिकेत A होता). राष्ट्रीय अन्न सुरक्षा कायदा, 2013 ग्रामीण भागातील 75% पर्यंत व शहरी भागातील 50% पर्यंत लोकसंख्येला लागू आहे, आणि तांदूळ प्रति किलो रु. 3, गहू रु. 2 व भरड धान्य रु. 1 या दराने मिळते; म्हणून दोन्ही विधाने बरोबर वाटतात: पर्याय A."
    ),
    47: notice(
      "MPSC's key gives option C, A and B. ICDS also trains its anganwadi workers, so whether worker's training counts as one of its programmes is arguable: option D, A, B and C, can also be defended.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, A आणि B, बरोबर दिला आहे. एकात्मिक बालविकास सेवा योजनेत अंगणवाडी सेविकांचे प्रशिक्षणही होते, म्हणून कर्मचारी प्रशिक्षण हा तिचा कार्यक्रम मानावा की नाही हे वादग्रस्त आहे: पर्याय D, A, B आणि C, सुद्धा समर्थनीय आहे."
    ),
    50: notice(
      "MPSC's key gives option D, only B. The National Population Policy 2000 aims at universal immunisation, B, and at bringing the infant mortality rate below 30 per thousand, C; it sets population stabilisation for 2045, not 2050. No option gives B and C.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, फक्त B, बरोबर दिला आहे. राष्ट्रीय लोकसंख्या धोरण 2000 चे उद्दिष्ट सार्वत्रिक लसीकरण, B, आणि अर्भक मृत्युदर दर हजारी 30 च्या खाली आणणे, C, हे आहे; लोकसंख्या स्थिरीकरण 2045 पर्यंत अपेक्षित आहे, 2050 नव्हे. B व C असा पर्याय नाही."
    ),
    87: notice(
      "MPSC's key gives option A, only A. Statement B is not correct (INS Vikrant was built at Cochin Shipyard, Kerala), and the August 2024 date in A is doubtful (the ship is reported to have joined the Western Fleet on 20 September 2024), so possibly neither is correct, option D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त A, बरोबर दिला आहे. विधान B बरोबर नाही (आयएनएस विक्रांत कोचीन शिपयार्ड, केरळ येथे बांधली गेली), आणि A मधील ऑगस्ट 2024 ही तारीख संशयास्पद आहे (ही नौका 20 सप्टेंबर 2024 रोजी पश्चिमी ताफ्यात दाखल झाल्याचे वृत्त आहे); म्हणून कदाचित दोन्ही विधाने चूक आहेत, पर्याय D."
    ),
    89: notice(
      "MPSC's final key gives option B, all three statements incorrect (its first key gave C). The awards began in 2018, so C is not correct, and the Sixth National Water Awards were launched in October 2024, so A is doubtful. But the awards are given in nine categories, so B looks correct, and no option is only B.",
      "आयोगाच्या अंतिम उत्तरतालिकेत पर्याय B, तिन्ही विधाने चूक, बरोबर दिला आहे (पहिल्या उत्तरतालिकेत C होता). हे पुरस्कार 2018 पासून दिले जातात, म्हणून C बरोबर नाही, आणि सहाव्या राष्ट्रीय जल पुरस्कारांची घोषणा ऑक्टोबर 2024 मध्ये झाली, म्हणून A संशयास्पद आहे. पण पुरस्कार नऊ श्रेणींमध्ये दिले जातात, म्हणून B बरोबर वाटते, आणि फक्त B असा पर्याय नाही."
    ),
  },
  "ssp-2026": {
    60: notice(
      "MPSC's key gives option D, all of the above. Statements (a) and (b) are right, but (c) is not: Barbara McClintock found jumping genes in maize in the late 1940s and published in 1950 (Nobel Prize, 1983), not in 1965. That makes the answer (a) and (b), option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, बरोबर दिला आहे. विधाने (a) व (b) बरोबर आहेत, पण (c) नाही: बार्बरा मॅक्लिंटॉक यांनी मक्यातील उड्या मारणारी जनुके 1940 च्या दशकाच्या उत्तरार्धात शोधली व 1950 मध्ये प्रसिद्ध केली (नोबेल पुरस्कार, 1983); 1965 मध्ये नव्हे. त्यामुळे उत्तर (a) व (b), पर्याय A, ठरते."
    ),
    77: notice(
      "MPSC's key gives option A, only (a) and (b). The National Commission to Review the Working of the Constitution (2002) also recommended the duty to foster family values and responsible parenthood (d) and the duty of industrial undertakings to educate their employees' children (c), which would make the answer all of the above, option D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त (a) व (b), बरोबर दिला आहे. संविधानाच्या कार्यपद्धतीचा आढावा घेणाऱ्या राष्ट्रीय आयोगाने (2002) कौटुंबिक मूल्ये व जबाबदार पालकत्व जोपासण्याचे कर्तव्य (d) आणि औद्योगिक संस्थांनी आपल्या कर्मचाऱ्यांच्या मुलांना शिक्षण देण्याचे कर्तव्य (c) यांचीही शिफारस केली होती; त्यानुसार उत्तर वरील सर्व, पर्याय D, ठरते."
    ),
  },
  "ssp-csat-2026": {
    13: notice(
      "MPSC's key gives option B, that statements (a) and (c) are not correct. But (a) repeats the passage word for word (more than 28 trillion tonnes of ice lost since the 1990s), and (b) matches it too (Arctic sea ice 40% smaller than in 1980); only (c) misstates the passage's reason. On the passage, (a) and (b) are correct: option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, विधाने (a) व (c) बरोबर नाहीत, दिला आहे. पण (a) उताऱ्यातील वाक्य जसेच्या तसे आहे (1990 पासून 28 ट्रिलियन टनांहून अधिक बर्फ नष्ट), आणि (b) सुद्धा उताऱ्याशी जुळते (आर्क्टिकमधील सागरी बर्फ 1980 पेक्षा 40% कमी); फक्त (c) उताऱ्यातील कारण चुकीचे सांगते. उताऱ्यानुसार (a) व (b) बरोबर आहेत: पर्याय A."
    ),
    57: notice(
      "MPSC's key gives option B, 32. The rule (left x bottom) - right - 2 fits both given triangles (5 x 4 - 6 - 2 = 12; 6 x 5 - 7 - 2 = 21) and gives 4 x 10 - 8 - 2 = 30, option A; we found no rule that fits both and gives 32.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, 32, दिला आहे. (डावी संख्या x खालची संख्या) - उजवी संख्या - 2 हा नियम दोन्ही दिलेल्या त्रिकोणांना लागू पडतो (5 x 4 - 6 - 2 = 12; 6 x 5 - 7 - 2 = 21) आणि त्यानुसार 4 x 10 - 8 - 2 = 30, पर्याय A, येतो; दोन्हींना लागू पडून 32 देणारा नियम आम्हाला आढळला नाही."
    ),
    58: notice(
      "MPSC's key gives option B, only conclusion II. Neither conclusion follows: \"All artists are smokers\" does not make all smokers artists (I), and \"Some smokers are drunkards\" says nothing about drunkards who are not smokers (II). The answer is option C, neither follows.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त निष्कर्ष II, दिला आहे. कोणताही निष्कर्ष निघत नाही: \"सर्व कलाकार धूम्रपान करणारे आहेत\" यावरून सर्व धूम्रपान करणारे कलाकार ठरत नाहीत (I), आणि \"काही धूम्रपान करणारे मद्यपी आहेत\" यावरून धूम्रपान न करणाऱ्या मद्यपींबद्दल काहीच कळत नाही (II). उत्तर पर्याय C, एकही निष्कर्ष निघत नाही."
    ),
    70: notice(
      "MPSC's key gives option C, both conclusions definitely correct. They contradict each other (some laws are not permanent; all laws are permanent), so both cannot be true, and neither follows: the flexible rules need not be laws. The answer is option D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, दोन्ही निष्कर्ष निश्चितपणे बरोबर, दिला आहे. हे दोन निष्कर्ष परस्परविरोधी आहेत (काही कायदे कायमस्वरूपी नाहीत; सर्व कायदे कायमस्वरूपी आहेत), त्यामुळे दोन्ही खरे असू शकत नाहीत, आणि कोणताही निष्कर्ष निघत नाही: लवचिक नियम कायदेच असतील असे नाही. उत्तर पर्याय D."
    ),
  },
  "ssp-csat-2013": {
    10: notice(
      "MPSC's key gives option C, (a) correct. The passage never says profit is the main consideration for farmers or companies (farmers traded their independence for higher performance and larger harvests), and it calls the crosses with wild relatives occasional, not regular. So neither statement is correct, option B.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, (a) बरोबर, दिला आहे. शेतकरी किंवा कंपन्यांसाठी नफा हाच मुख्य विचार आहे असे उताऱ्यात कुठेही म्हटलेले नाही (शेतकऱ्यांनी अधिक उत्पादनासाठी आपले स्वातंत्र्य सोडले), आणि जंगली जातींशी संकर अधूनमधून होत असे, नियमितपणे नव्हे. म्हणून दोन्ही विधाने चूक आहेत, पर्याय B."
    ),
    13: notice(
      "MPSC's key gives option A, a clever people's world. The passage never calls today's world that; it says many call it a century of knowledge, and deeper thinkers a century of the mind.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, हुशार लोकांचे जग, बरोबर दिला आहे. उतारा आजच्या जगाला असे कुठेही म्हणत नाही; तो सांगतो की अनेक जण याला ज्ञानाचे शतक म्हणतात, तर सखोल विचारवंत मनाचे शतक."
    ),
    18: notice(
      "MPSC's key gives option D, (b) correct. Statement (a) is not correct (the passage says the Rio summit reiterated the right to know), but (b) is not correct either: the courts held that the right to information is part of the freedom of speech under Article 19(1)(a); the link to social justice is the writer's own argument. So neither is correct, option B.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, (b) बरोबर, दिला आहे. विधान (a) बरोबर नाही (उताऱ्यानुसार रिओ परिषदेने जाणून घेण्याच्या हक्काचा पुनरुच्चार केला), पण (b) सुद्धा बरोबर नाही: न्यायालयांनी माहितीचा अधिकार कलम 19(1)(a) मधील भाषणस्वातंत्र्याचा भाग असल्याचे म्हटले; सामाजिक न्यायाशी त्याचा संबंध हा लेखकाचा स्वतःचा युक्तिवाद आहे. म्हणून दोन्ही विधाने चूक आहेत, पर्याय B."
    ),
    37: notice(
      "MPSC's key gives option B, (a) and (d). The passage also says \"a kind word, or a kind look, can do wonders\" where coercion has failed, which supports (c); since (a), (c) and (d) all have support, no option groups them.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, (a) आणि (d), बरोबर दिला आहे. उतारा असेही सांगतो की जिथे जबरदस्ती अपयशी ठरते तिथे एक दयाळू शब्द किंवा दयाळू नजर चमत्कार करू शकते, ज्यामुळे (c) ला आधार मिळतो; (a), (c) व (d) तिन्हींना आधार असल्याने ते एकत्र देणारा पर्याय नाही."
    ),
  },
  "ssp-csat-2014": {
    3: notice(
      "MPSC's key gives option D, neither. The line \"Communism awakening imperialism out of its slumber\" supports (b), while \"a new enemy to the kicking imperialism\" in the same sentence reads the other way, so the question is ambiguous as printed.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, दोन्हीपैकी नाही, बरोबर दिला आहे. \"Communism awakening imperialism out of its slumber\" ही ओळ (b) ला आधार देते, तर त्याच वाक्यातील \"a new enemy to the kicking imperialism\" उलट अर्थ सुचवते; म्हणून छापलेल्या स्वरूपात हा प्रश्न संदिग्ध आहे."
    ),
    4: notice(
      "MPSC's key gives option C, both incorrect. Statement (b) is clearly incorrect, but (a) is a loose restatement of \"Indians learnt to die for their cause\", so option B, only (b), is at least as defensible.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, दोन्ही चूक, बरोबर दिला आहे. विधान (b) स्पष्टपणे चूक आहे, पण (a) हे \"Indians learnt to die for their cause\" या वाक्याचे ढोबळ रूप आहे; म्हणून पर्याय B, फक्त (b), किमान तितकाच समर्थनीय आहे."
    ),
    35: notice(
      "MPSC's key gives option B. The passage says only that superstitions, if not restrained, bring misery and disaster; it does not say that disaster comes as faith grows day by day, and no option states what the passage says.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B बरोबर दिला आहे. उतारा फक्त एवढेच सांगतो की अंधश्रद्धांना आळा घातला नाही तर त्या दुःख व विनाश आणतात; श्रद्धा दिवसेंदिवस वाढल्याने आपत्ती येते असे तो म्हणत नाही, आणि उताऱ्यातील म्हणणे कोणताही पर्याय देत नाही."
    ),
    50: notice(
      "MPSC's key gives option C, chalking out our goals. The passage criticises chasing one goal after another and explains why people end up disillusioned, so option A, reasons for disillusionments, names its argument better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. उतारा एकामागून एक उद्दिष्टे गाठण्याच्या धडपडीवर टीका करतो आणि लोक भ्रमनिरास का अनुभवतात हे सांगतो; म्हणून पर्याय A, भ्रमनिरासाची कारणे, त्याचा आशय अधिक नेमका सांगतो."
    ),
    52: notice(
      "No option is right as printed. Read as relations, the statements give F = I, I > B, B at least M and M at most K; from these only inferences (III) and (IV) follow, and no option gives only (III) and (IV). MPSC's key gives option C.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. विधाने संबंधांत लिहिल्यास F = I, I > B, B हा M पेक्षा कमी नाही आणि M हा K पेक्षा जास्त नाही असे मिळते; यावरून फक्त अनुमान (III) व (IV) निघतात, आणि फक्त (III) व (IV) असा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
  },
  "ssp-csat-2015": {
    5: notice(
      "MPSC's key gives option C, neither. The passage credits Gutenberg with the new printing technique, and he is the standard inventor of the movable-type printing press, so statement a is true and option A, a only, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, दोन्हीपैकी नाही, बरोबर दिला आहे. उतारा नव्या मुद्रण तंत्राचे श्रेय गुटेनबर्गला देतो, आणि सुट्या खिळ्यांच्या छपाईयंत्राचा शोध त्यानेच लावला असे मानले जाते; म्हणून विधान a सत्य आहे आणि पर्याय A, फक्त a, अधिक योग्य ठरतो."
    ),
    30: notice(
      "MPSC's key gives option A, a and b. The passage does not say Europeans were unwilling to serve in the forces, and it speaks of a chronic fear of invasion, not of frequent invasions; no option fits what the paragraph suggests.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, a आणि b, बरोबर दिला आहे. युरोपियन लोक सैन्यात काम करण्यास नाखूश होते असे उतारा म्हणत नाही, आणि तो परकीय आक्रमणांच्या सततच्या भीतीविषयी बोलतो, वारंवार आक्रमणांविषयी नव्हे; परिच्छेदाचे सूचन कोणत्याही पर्यायात नेमके नाही."
    ),
    31: notice(
      "MPSC's key gives option B, only b. The passage says biomass conversion \"can result in\" fuel in solid, liquid or gas form; it does not say each of the three methods gives all three forms, so b overstates it. Statement a is not what the passage says either, so neither is correct, option C.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त b, बरोबर दिला आहे. उताऱ्यानुसार जैवभाराच्या रूपांतरणातून घन, द्रव किंवा वायू इंधन मिळू शकते; तिन्ही पद्धतींपैकी प्रत्येकीतून तिन्ही रूपे मिळतात असे तो म्हणत नाही, म्हणून b अतिशयोक्त आहे. विधान a सुद्धा उताऱ्यात नाही; म्हणून दोन्ही चूक आहेत, पर्याय C."
    ),
    37: notice(
      "MPSC's key gives option D, all of these. The passage names the kinds of social norms as folkways, mores and laws, b, g and d, which is option A; order in society is what norms produce, not a kind of norm.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, बरोबर दिला आहे. उताऱ्यात सामाजिक नियमनांचे प्रकार लोकरीती, लोकनीती व कायदे असे दिले आहेत, म्हणजे b, g व d, पर्याय A; समाजात व्यवस्था निर्माण करणे हे नियमनांचे कार्य आहे, नियमनाचा प्रकार नव्हे."
    ),
    46: notice(
      "MPSC's key gives option C, a, b and d. The writer calls tolerance dull, boring, negative and much less thrilling than love, but never unpopular, so b is not supported; option B, only a and d, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, a, b आणि d, बरोबर दिला आहे. लेखक सहिष्णुतेला कंटाळवाणी, नकारात्मक आणि प्रेमापेक्षा खूपच कमी रोमांचक म्हणतो, पण अप्रिय कधीच म्हणत नाही; म्हणून b ला आधार नाही आणि पर्याय B, फक्त a आणि d, अधिक योग्य ठरतो."
    ),
    49: notice(
      "MPSC's key gives option C, neither is incorrect. The writer says \"Don't try to love them: you can't ... try to tolerate them\", so b, \"either love people or tolerate them\", is incorrect, and so is a; option D can be defended, and the key cannot be right as worded.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, दोन्हीपैकी एकही चूक नाही, दिला आहे. लेखक म्हणतो की त्यांच्यावर प्रेम करण्याचा प्रयत्न करू नका, ते शक्य नाही; त्यांना सहन करण्याचा प्रयत्न करा. म्हणून b, प्रेम करा किंवा सहन करा, चूक आहे, आणि a सुद्धा; पर्याय D समर्थनीय आहे आणि उत्तरतालिकेचे उत्तर या शब्दरचनेत बसत नाही."
    ),
  },
  "ssp-csat-2016": {
    1: notice(
      "MPSC's key gives option D, none of the above. The passage says the term modernity was coined in 1864, while its features can be seen from the fifteenth century, so statement B, that the concept was created in the nineteenth century, is arguably not true; the key reads concept as term.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, यापैकी नाही, बरोबर दिला आहे. उताऱ्यानुसार 'आधुनिकता' हा शब्द 1864 मध्ये रूढ झाला, तर तिची वैशिष्ट्ये पंधराव्या शतकापासून दिसतात; म्हणून संकल्पना एकोणिसाव्या शतकात निर्माण झाली हे विधान B असत्य ठरू शकते. उत्तरतालिका 'संकल्पना' म्हणजे 'शब्द' असे वाचते."
    ),
    15: notice(
      "MPSC's key gives option A, only a. Neither statement appears in the passage or bears on Professor Maslin's point that climate change drove the growth of the human brain, so option D, neither, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त a, बरोबर दिला आहे. दोन्हीपैकी कोणतेही विधान उताऱ्यात नाही, आणि हवामान बदलामुळे मानवी मेंदूची वाढ झाली या प्रा. मॅस्लिन यांच्या मुद्द्याशी त्यांचा संबंध नाही; म्हणून पर्याय D, दोन्हीपैकी नाही, अधिक योग्य ठरतो."
    ),
    25: notice(
      "MPSC's key gives option A, all three. Statements b and c clearly confirm the comment; whether a does is arguable, and no option gives b and c alone.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, तिन्ही, बरोबर दिला आहे. विधाने b व c या मताला स्पष्ट आधार देतात; a देते की नाही हे वादग्रस्त आहे, आणि फक्त b व c असा पर्याय नाही."
    ),
    27: notice(
      "MPSC's key gives option B, only a and b. The passage also says George's death marked the end of his species and that the Pinta Island tortoises are extinct, so option C, a, b and c, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त a आणि b, बरोबर दिला आहे. उताऱ्यानुसार जॉर्जच्या मृत्यूने त्याची प्रजाती संपली आणि पिंटा बेटावरील कासवे नामशेष झाली, म्हणून पर्याय C, a, b आणि c, अधिक योग्य ठरतो."
    ),
    38: notice(
      "MPSC's key gives option B, all three regimes. The passage describes persecution under the church and then under the king, and says that with democracy came legal penalties against intolerance; it does not say persecution continued under democracy, so option C, a and b, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, तिन्ही राजवटी, बरोबर दिला आहे. उतारा चर्चच्या व नंतर राजाच्या सत्तेखालील धार्मिक छळाचे वर्णन करतो, आणि लोकशाहीत असहिष्णुतेविरुद्ध कायदेशीर शिक्षा आल्याचे सांगतो; लोकशाहीतही छळ चालू राहिला असे तो म्हणत नाही, म्हणून पर्याय C, a आणि b, अधिक योग्य ठरतो."
    ),
  },
  "ssp-csat-2018": {
    15: notice(
      "No option follows from the data. With the card at the focus of a 9 cm lens, the image is at infinity, and the usual angular magnification (25/9, or 1 + 25/9 with the image at 25 cm) does not give ten times. MPSC's key gives option A, 10 mm by 10 mm.",
      "दिलेल्या माहितीवरून कोणताही पर्याय निघत नाही. 9 सेमी नाभीय अंतराच्या भिंगाच्या नाभीवर कार्ड असल्याने प्रतिमा अनंतावर मिळते, आणि नेहमीची कोनीय विशालन (25/9, किंवा प्रतिमा 25 सेमीवर असल्यास 1 + 25/9) दहापट येत नाही. आयोगाच्या उत्तरतालिकेत पर्याय A, 10 मिमी बाय 10 मिमी, दिला आहे."
    ),
  },
  "ssp-csat-2019": {
    30: notice(
      "MPSC's key gives option A, a, b and c. The passage names constitutional provisions, legal and military measures, and the compromising of democracy, but not a communist regime, so option B, a, b and d, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, a, b आणि c, बरोबर दिला आहे. उताऱ्यात घटनात्मक तरतुदी, कायदेशीर व लष्करी उपाय आणि लोकशाहीशी तडजोड यांचा उल्लेख आहे, साम्यवादी राजवटीचा नाही; म्हणून पर्याय B, a, b आणि d, अधिक योग्य ठरतो."
    ),
    45: notice(
      "MPSC's key gives option C, only c. The passage's reason is that the tribes live in scattered groups, each with its own dialect; statement c does not say that, and no option gives the passage's reason.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, फक्त क, बरोबर दिला आहे. उताऱ्यानुसार आदिवासी विखुरलेल्या गटांत राहतात आणि प्रत्येक गटाची स्वतंत्र बोली आहे; विधान क हे कारण नेमके सांगत नाही, आणि उताऱ्यातील कारण देणारा पर्याय नाही."
    ),
    68: notice(
      "No option is right as printed. At most 3 fish can be both spotted and striped (the spotted fish that are neither golden nor pink), so the minimum is 8 + 13 - 3 = 18, which is not an option. MPSC's key gives option D, 19.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. जास्तीत जास्त 3 माशांवर ठिपके व पट्टे दोन्ही असू शकतात (सोनेरी किंवा गुलाबी नसलेले ठिपकेवाले मासे), म्हणून किमान संख्या 8 + 13 - 3 = 18; ही संख्या पर्यायांत नाही. आयोगाच्या उत्तरतालिकेत पर्याय D, 19, दिला आहे."
    ),
  },
  "ssp-csat-2020": {
    10: notice(
      "MPSC's key gives option D, all four. The passage never says bio-fuel is cheap (it says crude oil was the cheapest and won the competition), so d is not a benefit it gives; option C, a, b and c, fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, चारही, बरोबर दिला आहे. जैवइंधन स्वस्त आहे असे उताऱ्यात कुठेही म्हटलेले नाही (उलट कच्चे तेल सर्वांत स्वस्त होते असे म्हटले आहे); म्हणून d हा उताऱ्यातील फायदा नाही आणि पर्याय C, a, b आणि c, अधिक योग्य ठरतो."
    ),
    17: notice(
      "MPSC's key gives option A, (a) only. The farm ministry itself blames Aadhaar-based enrolment and messy land records for slowing the scheme, so (b), better linking of Aadhaar and land records, also follows: option D, both.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त (a), बरोबर दिला आहे. योजना मंदावण्यासाठी कृषी मंत्रालयानेच आधारआधारित नोंदणी व अव्यवस्थित जमीन नोंदी यांना जबाबदार धरले आहे, म्हणून (b), आधार व जमीन नोंदींची प्रभावी जोडणी, हेही निघते: पर्याय D, दोन्ही."
    ),
    36: notice(
      "MPSC's key gives option C, high intellectual acumen. The passage puts the aim of political education as a democratic, secular and socialist society in place of an inegalitarian one, which is option B, an egalitarian society.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, उच्च बौद्धिक कुशाग्रता, बरोबर दिला आहे. उताऱ्यानुसार राजकीय शिक्षणाचे उद्दिष्ट विषम समाजाऐवजी लोकशाहीवादी, धर्मनिरपेक्ष व समाजवादी समाज निर्माण करणे आहे, म्हणजे पर्याय B, समतावादी समाज."
    ),
    39: notice(
      "MPSC's key gives option C. The passage says the education system of today continues to support the domination of the privileged groups, which is option D; \"hierarchical and inegalitarian\" describes the society to be replaced.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. उताऱ्यानुसार आजची शिक्षणव्यवस्था विशेषाधिकारप्राप्त गटांच्या वर्चस्वाला आधार देत राहते, म्हणजे पर्याय D; 'श्रेणीबद्ध व विषम' हे वर्णन बदलायच्या समाजाचे आहे."
    ),
    49: notice(
      "MPSC's key gives option A, (a) and (e). The passage says it is not the passage of time that makes a book great, so (e) is not true, and no option is fully correct.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, (a) आणि (e), बरोबर दिला आहे. उताऱ्यानुसार काळ लोटल्यामुळे पुस्तक महान ठरत नाही, म्हणून (e) सत्य नाही, आणि कोणताही पर्याय पूर्णपणे बरोबर नाही."
    ),
    50: notice(
      "MPSC's key gives option B, envelop. The passage's own word is \"contain\", and of the options \"have\", option D, fits; to envelop means to wrap round.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, envelop, बरोबर दिला आहे. उताऱ्यातील मूळ शब्द \"contain\" आहे, आणि पर्यायांपैकी \"have\", पर्याय D, बसतो; envelop म्हणजे गुंडाळणे."
    ),
    73: notice(
      "MPSC's key gives option D. The passage says little is known about triclosan and human bones and that only animal studies suggest harm; a ban does not follow as a conclusion from that, and no option does.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D बरोबर दिला आहे. उताऱ्यानुसार ट्रायक्लोसन व मानवी हाडे यांच्या संबंधाविषयी फारच थोडे माहीत आहे आणि फक्त प्राण्यांवरील अभ्यास हानी सुचवतात; त्यावरून बंदी हा निष्कर्ष निघत नाही, आणि कोणताही पर्याय निष्कर्ष म्हणून निघत नाही."
    ),
  },
  "ssp-csat-2021": {
    5: notice(
      "MPSC's key gives option A, only (d). The passage supports (d) and arguably (c) as well (the new archaeology asks for the causes behind events, which reaches into how people thought), while (a) and (b) are not stated; option B, (c) and (d), can also be defended.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, फक्त (d), बरोबर दिला आहे. उतारा (d) ला आधार देतो आणि (c) लाही काही प्रमाणात (नवे पुरातत्त्वशास्त्र घटनांमागील कारणे शोधते, जे प्राचीन माणसांच्या विचारांपर्यंत जाते), तर (a) व (b) उताऱ्यात नाहीत; म्हणून पर्याय B, (c) आणि (d), सुद्धा समर्थनीय आहे."
    ),
    40: notice(
      "No option is right as printed. The passage supports changes needed to keep pace with the times and with the social, economic and political setting, (b) and (c); (d), value addition to existing rights, is not stated, and no option gives (b) and (c). MPSC's key gives option C.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. उतारा काळानुसार आणि सामाजिक, आर्थिक व राजकीय परिस्थितीनुसार आवश्यक बदलांना आधार देतो, (b) व (c); (d), विद्यमान हक्कांत भर, हे उताऱ्यात नाही, आणि (b) व (c) असा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
    68: notice(
      "MPSC's key gives option D, functions of the vehicles. The passage builds to its point that the observations these vehicles make may help solve mankind's energy and food problems, which is option C; D only names the topic.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वाहनांची कार्ये, बरोबर दिला आहे. या वाहनांनी केलेल्या निरीक्षणांमुळे मानवजातीचे ऊर्जा व अन्नाचे प्रश्न सुटू शकतील हा उताऱ्याचा मुख्य मुद्दा आहे, म्हणजे पर्याय C; D फक्त विषयाचे नाव सांगतो."
    ),
  },
  "ssp-csat-2023": {
    11: notice(
      "MPSC's key gives option B, b and d. Statement d follows from the passage, but b, that the language of \"why\" is sometimes not understood, is not given as the reason, so no option is clean.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B, ब आणि ड, बरोबर दिला आहे. विधान ड उताऱ्यातून निघते, पण ब, 'का ?' ची भाषा कधी कधी उमगत नाही, हे कारण म्हणून दिलेले नाही; म्हणून कोणताही पर्याय नेमका नाही."
    ),
    13: notice(
      "MPSC's key gives option C, a, c and d. Each of these reasons is only partly stated in the passage, so the answer cannot be fixed from it.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, अ, क आणि ड, बरोबर दिला आहे. यांपैकी प्रत्येक कारण उताऱ्यात अंशतःच आले आहे, म्हणून उताऱ्यावरून उत्तर निश्चित करता येत नाही."
    ),
    24: notice(
      "MPSC's key gives option A, that B is the reason for A. Both statements are true, but B, how a person weighs money and prestige when choosing a business, does not explain A, Davies's point that a position's prestige depends on the importance of its business; option B fits better.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, B हे A चे कारण, बरोबर दिला आहे. दोन्ही विधाने सत्य आहेत, पण B, व्यवसाय निवडताना माणूस पैसा व प्रतिष्ठा यांचा विचार करतो, हे A चे, म्हणजे पदाची प्रतिष्ठा त्याच्या कामाच्या महत्त्वावर अवलंबून असते या डेव्हिस यांच्या मताचे, कारण नाही; पर्याय B अधिक योग्य ठरतो."
    ),
    28: notice(
      "No option is right as printed. The passage gives the central place in the political programme to the Swaraj of the outcastes, Dalits and lower castes, C and D, and no option gives C and D alone. MPSC's key gives option C, all four.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. उताऱ्यानुसार राजकीय कार्यक्रमात मध्यवर्ती स्थान अस्पृश्य, दलित व खालच्या जातींच्या स्वराज्याला आहे, म्हणजे C व D, आणि फक्त C व D असा पर्याय नाही. आयोगाच्या उत्तरतालिकेत पर्याय C, चारही, दिला आहे."
    ),
    29: notice(
      "MPSC's key gives option A, all four. The passage does not say which movements made Indian democracy more widespread, so the answer cannot be checked against it.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, चारही, बरोबर दिला आहे. कोणत्या चळवळींमुळे भारतीय लोकशाही अधिक व्यापक झाली हे उताऱ्यात सांगितलेले नाही, म्हणून हे उत्तर उताऱ्यावरून तपासता येत नाही."
    ),
    32: notice(
      "MPSC's key gives option C, A and B. The passage ties only the aggressively implemented supply-side measures, D, to preparing the economy for a sustained long-term expansion; the safety nets were the immediate response and the capital spending was to build back medium-term demand. No option is only D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, A आणि B, बरोबर दिला आहे. उताऱ्यानुसार दीर्घकालीन शाश्वत वाढीसाठी फक्त जोमाने राबवलेले पुरवठा बाजूचे उपाय, D, होते; सुरक्षाकवच हा तात्काळ प्रतिसाद होता आणि पायाभूत भांडवली खर्च मध्यम मुदतीची मागणी पुन्हा उभी करण्यासाठी होता. फक्त D असा पर्याय नाही."
    ),
    33: notice(
      "MPSC's key gives option D, (1) and (2). In the passage the words \"This implies that\" are followed only by option A, that overall economic activity has recovered past pre-pandemic levels; B is a separate observation about the second wave.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, (1) आणि (2), बरोबर दिला आहे. उताऱ्यात 'This implies that' नंतर फक्त पर्याय A येतो, म्हणजे एकूण आर्थिक व्यवहार महामारीपूर्व पातळीच्या पुढे गेले; B हे दुसऱ्या लाटेविषयीचे स्वतंत्र निरीक्षण आहे."
    ),
    35: notice(
      "MPSC's key gives option D, all the above. The passage says consumption grew 7 per cent \"with significant contributions from government spending\", option A; capital formation and exports are separate points in the passage, not given as causes of consumption growth.",
      "आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, बरोबर दिला आहे. उताऱ्यानुसार उपभोगातील 7 टक्के वाढ 'सरकारी खर्चाच्या महत्त्वपूर्ण योगदानाने' झाली, पर्याय A; भांडवल निर्मिती व निर्यात हे उताऱ्यातील स्वतंत्र मुद्दे आहेत, उपभोगवाढीची कारणे म्हणून दिलेले नाहीत."
    ),
    53: notice(
      "MPSC's key gives option C, To. If To had won, To could not be the always-truthful Koki (he says Mo won), so Vo would be Koki, Mo the alternating Toki and To the always-false Poki; but then To's \"Vo is not a Poki\" would be true, which a Poki cannot say. The only consistent case is that Mo won: To is Koki, Vo is Toki and Mo is Poki, option A.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, टो, बरोबर दिला आहे. टो जिंकला असता तर टो नेहमी खरे बोलणारा कोकी असू शकत नाही (तो म्हणतो मो जिंकला), म्हणून वो कोकी, मो आलटून पालटून बोलणारा टोकी आणि टो नेहमी खोटे बोलणारा पोकी ठरेल; पण मग टो चे 'वो पोकी नाही' हे विधान खरे ठरेल, जे पोकी बोलू शकत नाही. एकमेव सुसंगत स्थिती म्हणजे मो जिंकला: टो कोकी, वो टोकी आणि मो पोकी, पर्याय A."
    ),
    65: notice(
      "MPSC's key gives option C. The clue about c and b can be read two ways (c to the west of b, or e to the west of b), and neither reading makes one option always true.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. c व b विषयीचा संकेत दोन प्रकारे वाचता येतो (c हा b च्या पश्चिमेस, किंवा e हा b च्या पश्चिमेस), आणि कोणत्याही वाचनात एकच पर्याय नेहमी सत्य ठरत नाही."
    ),
    66: notice(
      "MPSC's key gives option A, graph (1). With length \\(L\\) and width \\(\\frac{L}{2}\\), the pond's area \\(\\frac{L^2}{2}\\) is an upward curve and the concrete's area \\(1.5L + 1\\) is a straight line, the curve starting below the line and crossing it between 3 and 4 metres; read from the picture, that is graph (4), option D.",
      "आयोगाच्या उत्तरतालिकेत पर्याय A, आलेख (1), बरोबर दिला आहे. लांबी \\(L\\) व रुंदी \\(\\frac{L}{2}\\) असल्यास तळ्याचे क्षेत्रफळ \\(\\frac{L^2}{2}\\) हा वर वळणारा वक्र आणि काँक्रीटचे क्षेत्रफळ \\(1.5L + 1\\) ही सरळ रेषा आहे; वक्र रेषेच्या खाली सुरू होऊन 3 ते 4 मीटरदरम्यान तिला छेदतो. चित्रानुसार हा आलेख (4), पर्याय D, आहे."
    ),
  },
  "ssp-csat-2024": {
    40: notice(
      "No option is right as printed. The passage names communal, authoritarian and military threats to democracy but not feudalism, so the set is (a), (c) and (d), which no option gives. MPSC's key gives option D, all of the above.",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. उताऱ्यात लोकशाहीसमोरील आव्हाने म्हणून जातीयवाद, हुकूमशाही व लष्करी दडपशाही यांचा उल्लेख आहे, सरंजामशाहीचा नाही; म्हणजे संच (a), (c) व (d) आहे, जो कोणत्याही पर्यायात नाही. आयोगाच्या उत्तरतालिकेत पर्याय D, वरील सर्व, दिला आहे."
    ),
    42: notice(
      "MPSC's key gives option C, a, c and d. Statement d turns cause and effect round (an artist's experiences shape his art; his art does not cause his experiences), and c is not clearly stated, so no option is clean.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, (अ), (क), (ड), बरोबर दिला आहे. विधान (ड) कार्यकारणभाव उलटा करते (कलावंताचे अनुभव त्याच्या कलेला आकार देतात; कला त्याच्या अनुभवांचे कारण नसते), आणि (क) उताऱ्यात स्पष्टपणे नाही; म्हणून कोणताही पर्याय नेमका नाही."
    ),
  },
};
