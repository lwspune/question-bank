/**
 * The owner's 2026-11-03 ruling on the MPSC Mains questions in
 * scripts/mpsc/KEY_DOUBTS.md: notice + grace, MPSC's key KEPT. One text per
 * question, in the language the question is printed in (a Mains row has no
 * translation). config.ts folds them into each paper's `notices`; the mock
 * builder graces them in every exam the paper was sat for.
 */
import { noticeEn, noticeMr } from "../mpsc/notice";

export const MAINS_KEY_DOUBT_NOTICES: Record<string, Record<number, string>> = {
  "aso-2012": {
    198: noticeEn(
      "MPSC's key gives option C, secularism. \"To live together with mutual tolerance\" is co-existence, option B; the passage uses secularism for an identity above races, castes and religions."
    ),
  },
  "aso-2013": {
    71: noticeEn(
      "No option is right as printed. The saying is \"No physic can cure\": physic, (b), means medicine, and it alone fits, but no option gives (b) alone. MPSC's key gives option B, (a) and (b)."
    ),
    86: noticeEn(
      "MPSC's key gives option B, only (b). \"Gavaskar was the star of Indian cricket\" is also correct English, so option C, both, fits better."
    ),
    100: noticeEn(
      "MPSC's key gives option B, that a poor but contented man is always happy. The passage says such a man may achieve a measure of happiness, which is \"can be happy\", option D, not \"always\"."
    ),
  },
  "aso-2015": {
    3: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D बरोबर दिला आहे. पर्याय A मध्ये 'दोन' हे 'वर' या नामाची संख्या सांगणारे संख्याविशेषण आहे; पर्याय D मधील 'वरपिता' हे सामासिक नाम आहे, विशेषण नाही. म्हणून पर्याय A अधिक योग्य ठरतो."
    ),
    5: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C, अपूर्ण भविष्यकाळ, बरोबर दिला आहे. 'लिहिला असेल' (भूतकालीन रूप + असेल) हा पूर्ण भविष्यकाळ आहे, म्हणजे पर्याय B; अपूर्ण भविष्यकाळ 'लिहीत असेल' असा होतो."
    ),
    30: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C, धकधक, बरोबर दिला आहे. धकधक, धकाधक व धकाधकी हे तिन्ही 'धक' पासून बनलेले अभ्यस्त शब्द आहेत, आणि 'झोंबी' त्या गटात बसत नाही; म्हणून पर्याय D अधिक योग्य दिसतो."
    ),
    82: noticeEn(
      "MPSC's key gives option B, musomania. The dictionary word for an obsession with music is melomania, option A; musomania is not a standard word."
    ),
    97: noticeEn(
      "MPSC's key gives option A, healthy. The passage calls the organisation \"a well-oiled and finely-tuned piece of machinery\" that runs without a break-down and speaks of its overall efficiency, so the sense is efficient, option B."
    ),
  },
  "aso-2016": {
    64: noticeEn(
      "MPSC's key gives option B, only c and d. \"Going for a holiday\", (b), is as correct as \"going on a holiday\", (c), so option D, b, c and d, fits better."
    ),
    84: noticeEn(
      "No option is right as printed. Get off on means to enjoy, get off with means to start a relationship with, get on with it means hurry up, and get out of means to avoid a duty: a-IV, b-I, c-II, d-III, which is not an option. MPSC's key gives option B."
    ),
    85: noticeEn(
      "MPSC's key gives option D, neither. \"Govinda and Madhuri both danced well\" is correct English; only (b) is wrong (it should be \"Not only is he a teacher\"). So option A, only a, fits better."
    ),
  },
  "aso-2017": {
    10: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, व्यंग्यार्थ, बरोबर दिला आहे. 'समाजातील जळवा' या शब्दांचा सरळ अर्थ वाक्यात बसत नाही, म्हणून त्याच्याशी संबंधित अर्थ (शोषण करणारी माणसे) घ्यावा लागतो; सर्वसाधारण नियमानुसार हा लक्ष्यार्थ, पर्याय C, आहे. काही व्याकरणग्रंथ अशी उदाहरणे व्यंग्यार्थात देतात."
    ),
    37: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D, सर्वपुरुषवाचक सर्वनाम, बरोबर दिला आहे. या वाक्यात 'आपण' हे आदरार्थी द्वितीय पुरुषी सर्वनाम ('तुम्ही' या अर्थाने) आहे; हा प्रकार कोणत्याही पर्यायात नेमका दिलेला नाही, म्हणून हे उत्तर वादग्रस्त आहे."
    ),
    47: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय A, सर्व चूक, बरोबर दिला आहे. विधान a, 'अति नेटाने केलेले प्रयत्न', हा 'भगीरथ प्रयत्न' चा अर्थच आहे; म्हणून पर्याय B, फक्त a बरोबर, हेही समर्थनीय आहे. आयोगाचे उत्तर a ही म्हण नसून अर्थ आहे या आधारावर आहे."
    ),
    67: noticeEn(
      "No option is right as printed. Sentence d, \"He is now playing a match\", is also correct, so the correct set is a, c and d, which no option gives. MPSC's key gives option A, only a and c."
    ),
  },
  "asosti-2009": {
    14: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, व्यंग्यार्थ, बरोबर दिला आहे. समाजात वावरणारे खरे साप ठेचणे हा अर्थ वाक्यात बसत नाही; 'साप' म्हणजे सापासारखी दुष्ट माणसे असा संबंधित अर्थ घ्यावा लागतो, जो सर्वसाधारण नियमानुसार लक्ष्यार्थ, पर्याय C, आहे. आयोगाने हेच वाक्य इतर प्रश्नपत्रिकांतही व्यंग्यार्थ म्हणून दिले आहे."
    ),
    37: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D, यापैकी नाही, बरोबर दिला आहे. 'तुला जे समजत नाही' हे गौण वाक्य 'जे ... ते' या जोडीने 'ते तू शिक्षकांस विचारावे' या प्रधान वाक्याशी जोडले आहे; प्रधान व गौण वाक्य असलेले वाक्य मिश्रवाक्य असते, म्हणजे पर्याय A."
    ),
    49: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय A, आज्ञार्थी, बरोबर दिला आहे. 'येऊ नये' हे विध्यर्थाचे नकारी रूप आहे (काय करू नये ते सांगणारे), म्हणजे पर्याय B; आज्ञार्थाचे नकारी रूप 'येऊ नका' असे होते. काही व्याकरणग्रंथ निषेध सांगणारी अशी वाक्ये आज्ञार्थी मानतात."
    ),
    149: noticeEn(
      "Two options are right. \"My essay is still not finished\", option A, and \"My essay still isn't finished\", option C, are the same correct sentence, one with the contraction. MPSC's key gives option A."
    ),
  },
  "grpb-2018": {
    7: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, कर्मकर्तरी प्रयोग, बरोबर दिला आहे. कर्ता 'कडून' सह येतो आणि क्रियापद कर्माप्रमाणे चालते ('गाय ... बांधली जाते', 'दंड आकारण्यात आला'); बहुतेक व्याकरणग्रंथ याला नवीन कर्मणी, म्हणजे कर्मणी प्रयोगाचा एक प्रकार (पर्याय A), मानतात, तर काही कर्मकर्तरी. म्हणून दोन पर्याय समर्थनीय आहेत."
    ),
  },
  "psi-2011": {
    66: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, संयुक्त वाक्य, बरोबर दिला आहे. 'झटून अभ्यास केला की' यात 'की' चा अर्थ 'जेव्हा' असा आहे, म्हणून हे गौण वाक्य 'यश हमखास मिळते' या प्रधान वाक्यावर अवलंबून आहे; असे वाक्य मिश्र वाक्य असते, म्हणजे पर्याय C."
    ),
    136: noticeEn(
      "MPSC's key gives option C, causing worries and anxiety. \"Fraught with\" means full of, and is used of something unpleasant such as danger or grave consequences, so option B, filled with something unpleasant, gives the meaning; option C describes an effect."
    ),
    157: noticeEn(
      "MPSC's key gives option D, collective and abstract. \"Parents\" is a plural common noun, not a collective noun (a collective noun names a group as one unit, such as a family or a team), so option C, common and abstract, fits better."
    ),
    183: noticeEn(
      "Two options are right. \"Shiva is an honest servant in a firm\", option A, and \"... in the firm\", option B, are both correct; nothing in the sentence points to one particular firm. MPSC's key gives option B."
    ),
    189: noticeEn(
      "MPSC's key gives option A. The passage says we do many things to improve the flavour of our food and that \"this goes back ... to our more ancient links with the apes\", so the sign of the link is option C; option A describes the apes' food, not the evidence."
    ),
  },
  "psi-2013": {
    19: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D बरोबर दिला आहे. 'क्वचित' हे क्रिया किती वेळा घडते ते सांगते; काही व्याकरणग्रंथ ते कालवाचक (आवृत्तिदर्शक) क्रियाविशेषणांत, पर्याय A, तर काही परिमाणवाचक क्रियाविशेषणांत देतात. म्हणून दोन पर्याय समर्थनीय आहेत."
    ),
    66: noticeEn(
      "No option is right as printed. Possession, emoluments and succession are spelt correctly; only \"repeatation\" (repetition) is wrong, so the correct set is a, c and d, which no option gives. MPSC's key gives option C, c and d."
    ),
  },
  "psi-2016": {
    25: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C, (a) आणि (b), बरोबर दिला आहे. क्रियाविशेषण अव्यये अविकारी मानली जातात, म्हणून विधान (b) सर्वसाधारण नियमानुसार चूक आहे आणि पर्याय A, फक्त (a), अधिक योग्य ठरतो. आयोगाचे उत्तर लिंगानुसार बदलणाऱ्या थोड्या क्रियाविशेषणांवर (तो चांगला गातो, ती चांगली गाते) आधारित दिसते."
    ),
    67: noticeEn(
      "MPSC's key gives option C, \"a member on the committee\". The standard form is \"a member of the committee\", option B; \"on the committee\" usually goes with serve or sit."
    ),
    70: noticeEn(
      "MPSC's key gives option B, only (b) and (c). Sentence (a), \"A committee was set up to look at the problem\", is also correct (look at means examine), so option C, (a), (b) and (c), fits better."
    ),
    90: noticeEn(
      "MPSC's key gives option C, that (c) is incorrect. \"I have studied this topic for three hours\" is a correct present perfect; \"have been studying\" is only more usual. All three sentences are correct, option D."
    ),
    95: noticeEn(
      "MPSC's key gives option D, none. The key follows the rule that an amount takes a singular verb (\"two pounds of coffee costs\"), but \"cost\" in (a) also reads as the past tense, which is correct. Option A, (a) only, can also be defended."
    ),
  },
  "psi-2017": {
    13: noticeMr(
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. य् चे उच्चारस्थान इ सारखे (तालु), र् चे ऋ सारखे (मूर्धा), ल् चे लृ सारखे (दंत) आणि व् चे उ सारखे (ओष्ठ) आहे, म्हणजे क्रम इ, ऋ, लृ, उ; हा क्रम कोणत्याही पर्यायात नाही. आयोगाच्या उत्तरतालिकेत पर्याय C दिला आहे."
    ),
    29: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D, 'म्हणजे, मग', बरोबर दिला आहे. 'म्हणजे' हे उभयान्वयी अव्यय आहे, विधेयविस्तार नाही; फक्त विधेयविस्तारातील शब्द असलेला पर्याय दिसत नाही, म्हणून हे उत्तर संशयास्पद आहे."
    ),
    48: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C, फक्त (a) व (c), बरोबर दिला आहे. 'उशिरा' हे सुद्धा कालवाचक क्रियाविशेषण आहे, म्हणून (a), (b) व (c) तिन्ही बरोबर आहेत; हा संच कोणत्याही पर्यायात नाही."
    ),
    57: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. उतारा सांगतो की निर्बंधांमुळे संकुचित जातीय भावनेला बळकटी आली आणि 'साहजिकच' जातिनिरपेक्ष जाणीव गौण ठरली, म्हणजे पर्याय D; कुटुंब, जात, गाव इत्यादी संस्थांचे वर्चस्वही मूळ कारण म्हणून दिले आहे. म्हणून दोन पर्याय समर्थनीय आहेत."
    ),
    68: noticeEn(
      "MPSC's key gives option A, all three. In (a) the reporting words carry on the same sentence, so it should read \"Go now!\" she ordered, with a small s. Only (b) and (c) are punctuated correctly, option B."
    ),
    76: noticeEn(
      "Two options are right. \"At a certain university in America I met an advanced soul\", option A, and \"I met an advanced soul at a certain university in America\", option B, are both meaningful sentences. MPSC's key gives option A."
    ),
  },
  "ssm-2017": {
    20: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D, दोन्ही वाक्ये बरोबर, दिला आहे. क्रियाविशेषण अव्यय असल्याने अविकारी मानले जाते, म्हणून दुसरे वाक्य सर्वसाधारण नियमानुसार चूक आहे आणि पर्याय A, फक्त पहिले वाक्य बरोबर, अधिक योग्य ठरतो."
    ),
    43: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C, व्यंजना, बरोबर दिला आहे. 'साप' चा सरळ अर्थ वाक्यात बसत नाही आणि सापासारखी दुष्ट माणसे असा संबंधित अर्थ घ्यावा लागतो; सर्वसाधारण नियमानुसार ही लक्षणा शब्दशक्ती, पर्याय B, आहे. आयोगाने हेच वाक्य इतर प्रश्नपत्रिकांतही व्यंजना/व्यंग्यार्थ म्हणून दिले आहे."
    ),
    75: noticeEn(
      "MPSC's key gives option D, all three. In (c), \"who may come\" describes \"all\" (those who may come), so it is an adjective clause, not a noun clause. Only (a) and (b) hold noun clauses, option B."
    ),
  },
  "ssm-2018": {
    55: noticeEn(
      "MPSC's key gives option C, \"go\". Hari will not come to the listener, and the speaker and listener are the same two people in the reported sentence, so \"come\" can stay: option A. Grammar books differ on when come changes to go."
    ),
    78: noticeEn(
      "MPSC's key gives option C, both. In (a), \"India stands for peace should be known to everybody\", the clause has no \"that\", so it cannot act as the subject; only (b) is a grammatical complex sentence, option B."
    ),
  },
  "sti-2011": {
    1: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B बरोबर दिला आहे. 'गंधाक्षत' म्हणजे पूजेत वाहिले जाणारे गंध व अखंड तांदूळ (अक्षता); कोणताही पर्याय हा अर्थ नेमका देत नाही, म्हणून हे उत्तर संशयास्पद आहे."
    ),
    72: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D, तत्पुरुष समास, बरोबर दिला आहे. या वाक्यात 'कमलनयन' हा शब्द रामाचे वर्णन करतो (कमळासारखे नयन आहेत ज्याचे असा), म्हणून तो बहुव्रीही समास, पर्याय B, आहे; स्वतंत्रपणे पाहिल्यास तो कर्मधारय, म्हणजे तत्पुरुषाचा एक प्रकार ठरतो. म्हणून दोन पर्याय समर्थनीय आहेत."
    ),
    83: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, 'भारतीय नागरिक', बरोबर दिला आहे. वाक्याचा उद्देश्य विभाग 'आम्ही भारतीय नागरिक' असा आहे: 'आम्ही' हा मुख्य उद्देश्य आणि 'भारतीय नागरिक' हा त्याचा विस्तार. पर्याय B मध्ये मुख्य शब्द 'आम्ही' नाही, म्हणून पर्याय A अधिक योग्य ठरतो."
    ),
    85: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. या वाक्याचा विधेयविस्तार 'अद्यापिही' आणि 'जुन्या चाकोरीच्या बाहेर' हा आहे; पर्याय C मध्ये कर्म 'लोकांना' सुद्धा आले आहे, जे विधेयविस्तार नाही. म्हणून कोणताही पर्याय नेमका नाही."
    ),
    111: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय C, शारीरीय, बरोबर दिला आहे. प्रचलित शुद्ध रूप 'शारीरिक' आहे, 'शारीरीय' हे रूप प्रमाण कोशांत आढळत नाही; 'शरदचंद्र' हे लेखनात रूढ रूप आहे, जरी संधीनुसार 'शरच्चंद्र' होते. म्हणून कोणताही पर्याय निःसंदिग्धपणे एकमेव शुद्ध शब्द नाही."
    ),
    142: noticeEn(
      "MPSC's key gives option C, \"alongwith\". The standard form is \"Why don't you go with your friend?\", option A; \"alongwith\" is not standard written English (it is \"along with\", two words)."
    ),
    176: noticeEn(
      "MPSC's key gives option A, \"have seen\". A finished time such as \"a few minutes ago\" takes the simple past, \"I saw the child a few minutes ago\", option C; the present perfect cannot be used with \"ago\"."
    ),
    183: noticeEn(
      "Two options can be defended. \"Mrs. Patil has a fever\", option A, is the standard form, and \"has fever\", option D, is also used, especially in British and Indian English. MPSC's key gives option D."
    ),
    193: noticeEn(
      "Two options can be defended. \"The louder the noise was\", option C, is the regular pattern after \"the closer we got\", and the inverted \"the louder was the noise\", option A, is also found. MPSC's key gives option A."
    ),
  },
  "sti-2015": {
    10: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, (अ) व (क), बरोबर दिला आहे. विधान (क) चूक आहे: वाक्यात नाम नसतानाही विशेषण सर्वनामाचे वर्णन करू शकते, उदा. 'तो हुशार आहे'. म्हणून पर्याय A, फक्त (अ), अधिक योग्य ठरतो."
    ),
    60: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय A, (अ) व (ब), बरोबर दिला आहे. उताऱ्याचा शेवट कार्व्हर यांच्या संदेशावर होतो: ज्या कशामुळे आपल्या बांधवांच्या थाळ्या अन्नाने भरतील ते महत्त्वाचे समजा. म्हणजे अंतिम साध्य (अ) आहे; प्रयोगशाळा उभारणे, (ब), हे साधन आहे. म्हणून पर्याय B, फक्त (अ), अधिक योग्य ठरतो."
    ),
    68: noticeEn(
      "No option fits the sentence as printed. Something that falls from a purse is not the side of a river, a row of keys, a financial institution or a balance (it might be a piggy bank, or a misprint for a band). MPSC's key gives option B, row of keys."
    ),
  },
  "sti-2017": {
    9: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय B, फक्त क, बरोबर दिला आहे. मराठीत निर्जीव वस्तूंना नपुंसकलिंगही दिले जाते (ते घर, ते पुस्तक), म्हणून विधान ड सुद्धा बरोबर आहे; ड समाविष्ट करणारा पर्याय नाही."
    ),
    45: noticeMr(
      "आयोगाच्या उत्तरतालिकेत पर्याय D, यापैकी एकही नाही, बरोबर दिला आहे. उतारा सांगतो की विशिष्ट वर्गाची जाणीव प्रतिष्ठित ठरते आणि त्यातून अभिजात साहित्यकृती निर्माण होतात; हे पर्याय C मध्ये दिले आहे."
    ),
    93: noticeEn(
      "MPSC's key gives option C, that God's name was a part of themselves. The passage says primitive people believed God's name was a part of HIM and carried some of his powers; option C turns that round, and no option gives the passage's reason."
    ),
  },
};
