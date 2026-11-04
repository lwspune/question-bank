# MPSC key doubts and defective questions

Read 2026-11-03, while backfilling worked solutions (SOLUTIONS_BACKFILL_SPEC.md, b44). Two solvers, or one solver and the main session, reached an answer other than MPSC's key, or found no option that holds. Each row was then read again by the main session against the question, the passage and, for facts, a source.

**203 questions: about 73 defective as printed** (no option right, or two right, or a false premise) **and 130 with a doubtful key.** None has a worked solution: `apply.ts` never writes a solution that disagrees with the key.

**Status: SETTLED 2026-11-03, owner: notice + grace on all 203, MPSC's key kept.** Each question's notice is in `keyDoubtNotices.ts` (Prelims) or `../mpsc-mains/keyDoubtNotices.ts` (Mains), written onto the live rows by `apply-notices.ts`, and graced in its whole-paper mock (README, "Key doubts found by the solutions backfill").

A finding is a question, not a verdict. Several are matters of grammar-book tradition (MPSC keys the same 'साप' sentence as व्यंग्यार्थ/व्यंजना in three papers, and 'येऊ नये' as आज्ञार्थी in two), where the key may follow a source that teaches it that way.

## MPSC-2017-b-NO9

| Q | key | finding | id |
|---|---|---|---|
| 60 | A | the 2013-14 fiscal deficit was budgeted at 4.8% of GDP, so (c) is not correct either; the key's (a) alone leaves (c) out | a613ff0f |

## MPSC-2017-c-B09

| Q | key | finding | id |
|---|---|---|---|
| 17 | D | defective: Bombay High was found in February 1974 and production began on 21 May 1976; no option gives the start of production | 86d25d0c |
| 31 | B | defective: engineering exports were about USD 56.8 bn of about USD 300 bn in 2012-13, a share near 19%; no option matches | 54741b85 |

## MPSC-2018-b-H11

| Q | key | finding | id |
|---|---|---|---|
| 10 | B | the Commission evaluates women's progress (a); implementing the Directive Principles (b) is the State's work, not the Commission's: only (a) (A) | 86018f57 |
| 35 | C | Khadilkar was Tilak's close follower (A) and turned to Gandhi after Tilak's death (C): two defensible options | e4d733af |

## MPSC-2018-c-J11

| Q | key | finding | id |
|---|---|---|---|
| 61 | C | re-worked: both {I,U} in college 1 with S in college 3, and {S,U} in college 1, satisfy every condition, so S's college is "not confirmed" (D) | f2d987d9 |
| 86 | B | Manmohan Singh did receive the Indira Gandhi Prize (2017) and the citation matches (b): both (C) | 8e319b5e |

## MPSC-2019-b-V12

| Q | key | finding | id |
|---|---|---|---|
| 13 | D | the Ramsar Convention is about wetlands, not climate change; (a), (b), (c) is the usual answer | 5f32c9eb |
| 30 | D | the Responsive Co-operation Party is credited to Jayakar, Kelkar and Moonje; Malaviya led the separate Independent Congress Party, so "all four" is doubtful | bafffb5b |
| 37 | D | a record dates Pringle's Poona posting to 1822, not 1823; statement (A) could not be checked: unsettled | 4352f999 |
| 70 | C | defective: the aim is to bring debt to a sustainable level (a); every option with (a) also has (b) "increase fiscal deficit", which is wrong | 8b888ed8 |

## MPSC-2019-c-Y12

| Q | key | finding | id |
|---|---|---|---|
| 81 | A | Bordeaux mixture is the standard spray for downy, not powdery, mildew; two solvers give sulphur only (B) | eddee337 |
| 91 | D | defective: the four get different numbers, so (b) "C never equals A" is always true as well as (d); no option is "(b) and (d)" | 2487289b |

## MPSC-2020-b-A14

| Q | key | finding | id |
|---|---|---|---|
| 68 | B | both reasons are possible causes of teleshopping; no option says both | 3fac08e0 |
| 87 | A | Articles 15(6) and 16(6) cover sections other than those already covered (SC, ST, OBC), so (a) is also true: "a, c and d" (C) | 2481763a |

## MPSC-2021-b-U14

| Q | key | finding | id |
|---|---|---|---|
| 16 | C | sources list the Paramahansa Sabha's aims as breaking caste together with women's education and widow remarriage; no option holds a, b and c | bb8097d1 |
| 20 | C | tea (Assam plantations) and wheat (Punjab, for export) both grew with commercialisation, so (a) belongs too: all four (D) | 53a5db39 |

## MPSC-2021-c-Y14

| Q | key | finding | id |
|---|---|---|---|
| 50 | B | NCERT names Bundelkhand as a region of COMPACT villages built for defence (C), not dispersed ones | aa1076bb |
| 82 | C | standard texts (NCERT) class Fe as a micronutrient, so (a) is false and only (c) holds; the key follows an older listing | 4da52cca |
| 87 | B | defective: the valid chain is (a), (b), (c); option (B) ends on (e), which does not follow, and no option is valid | acb4da3a |

## MPSC-2022-b-A16

| Q | key | finding | id |
|---|---|---|---|
| 26 | B | (a), (c) and (d) all look true (PWD under Dalhousie, broad gauge from the start, the Nagpur 20-year plan); no option holds that set | 702fd4ee |
| 36 | B | Agarkar is linked with Kesari, Maratha and Sudharak; a web-checked solver found no link to Varhad Samachar (b) | cbd3a5a1 |
| 42 | A | defective: MSAMB's own site gives its establishment as 23 March 1984; no option gives 1984 | 40ba98ff |
| 48 | D | defective: tourism's share of GDP in 2019 was about 6.8% (WTTC) or about 5% (Tourism Satellite Account); no option matches | 0e957884 |
| 53 | B | the lack of rural jobs (c) is the reason people migrate (b); two solvers give (b) and (c) | c834f952 |
| 80 | D | saline irrigation damages soil structure, builds up salt AND inhibits plant growth; no option holds (a), (b) and (d) | d8de5ee6 |

## MPSC-2022-c-F16

| Q | key | finding | id |
|---|---|---|---|
| 55 | A | Jyotiba stands at Wadi Ratnagiri and is also called the hill of Kedareshwar, so (a) and (d) both hold; no option has that pair | 537b177d |
| 70 | D | the RBI's 3% bank rate dates from 1935; in November 1951 it RAISED the rate to 3.5%, ending cheap money, so (c) is wrong: (a) and (b) (A) | 2129ed44 |
| 88 | B | the passage asks for eco-friendly methods of rearing predator fish, not a ban (B); no option follows from a sentence of it | d1365f24 |

## MPSC-2023-bc-J17

| Q | key | finding | id |
|---|---|---|---|
| 11 | A | defective: Operation Flood was launched by NDDB in 1970; no option gives 1970 | 65df816d |
| 49 | A | defective: the 2021-22 Jnanpith went to Damodar Mauzo, who writes in KONKANI, not Marathi; the stem's premise is false | 01fd7b09 |

## MPSC-Mains-aso-2012-D01-ASO

| Q | key | finding | id |
|---|---|---|---|
| 198 | C | "to live together with mutual tolerance" is co-existence (B); secularism is defined in the passage as an identity above races, castes and religions | 63b10bc6 |

## MPSC-Mains-aso-2013-IO3-ASO

| Q | key | finding | id |
|---|---|---|---|
| 71 | B | defective: the proverb is "No physic can cure"; only (b) fits, and no option is (b) alone | d0708c32 |
| 86 | B | "Gavaskar was the star of Indian cricket" (a) is correct English; both sentences are correct (C) | 4f92c80f |
| 100 | B | the passage says a poor man "may" be contented and "achieve a measure of happiness": "can be happy" (D), not "always" (B) | 3c454cf7 |

## MPSC-Mains-aso-2015-VO6-ASO

| Q | key | finding | id |
|---|---|---|---|
| 3 | D | (A) has the संख्याविशेषण 'दोन' (दोन वर); in (D) 'वरपिता' is a compound noun, not an adjective | d2b6c1fc |
| 5 | C | 'लिहिला असेल' is पूर्ण भविष्यकाळ (B) by the standard rule (past form + असेल); अपूर्ण is 'लिहीत असेल'. Key looks wrong | 0e946b39 |
| 30 | C | धकधक, धकाधक, धकाधकी are all अभ्यस्त forms of 'धक', so झोंबी (D) is the odd one; the key's grouping is not clear | 44c96758 |
| 82 | B | the dictionary word for an obsession with music is melomania (A); musomania is not standard | 4244d75b |
| 97 | A | "a well-oiled and finely-tuned piece of machinery ... without any break-down": the sense is efficient (B), and the passage speaks of "overall efficiency" | 98845ea9 |

## MPSC-Mains-aso-2016-K08-ASO

| Q | key | finding | id |
|---|---|---|---|
| 64 | B | "going for a holiday" (b) is as correct as "going on a holiday" (c); the answer set should be b, c, d | 110e6ed6 |
| 84 | B | defective: get off on = enjoy, get off with = start a relationship, get on with it = hurry up, get out of = avoid (a-IV, b-I, c-II, d-III); no option matches | 1499d09d |
| 85 | D | "Govinda and Madhuri both danced well" (a) is correct English; two solvers give only a (A) | f07afa2f |

## MPSC-Mains-aso-2017-O10-ASO

| Q | key | finding | id |
|---|---|---|---|
| 10 | B | "समाजातील जळवा" for exploiters is a लक्षणा (लक्ष्यार्थ, C): the direct sense fails and a related sense is taken; key gives व्यंग्यार्थ | 7a362deb |
| 37 | D | 'आपण' here is the respectful second person (= तुम्ही); no option names a second-person pronoun, and सर्वपुरुषवाचक is arguable | b668f671 |
| 47 | A | (a) gives the meaning of 'भगीरथ प्रयत्न', so "only a is right" (B) is defensible; the key's "all wrong" rests on (a) being a meaning, not a म्हण | 0956d7d5 |
| 67 | A | defective: (d) "He is now playing a match" is also correct, so the correct set is a, c and d; no option gives it | 77e7bfc7 |

## MPSC-Mains-asosti-2009-TNS-ASO

| Q | key | finding | id |
|---|---|---|---|
| 14 | B | 'साप' for wicked people: the direct sense fails and a related one is taken, which is लक्ष्यार्थ (C). MPSC keys this same sentence as व्यंग्यार्थ/व्यंजना in three papers, so its source may teach it that way | e9a69d13 |
| 37 | D | 'तुला जे समजत नाही ते ... विचारावे' has a गौण clause joined by जे ... ते, a मिश्र वाक्य (A); "none of these" does not fit | a2a38dab |
| 49 | A | 'येऊ नये' is the विध्यर्थी form (what should not be done); the आज्ञार्थी negative is 'येऊ नका'. Key looks wrong | 32695ba1 |
| 149 | A | "My essay is still not finished" (A) and "My essay still isn't finished" (C) are the same sentence, contracted: two right options | 37f2a262 |

## MPSC-Mains-asosti-2009-TNS-STI

| Q | key | finding | id |
|---|---|---|---|
| 14 | B | same sentence as e9a69d13: लक्ष्यार्थ (C) by the usual rule; keyed व्यंग्यार्थ | cd404351 |
| 37 | D | same sentence as a2a38dab: 'जे ... ते' joins a गौण clause, a मिश्र वाक्य (A); "none of these" does not fit | 145f77b2 |
| 49 | A | 'येऊ नये' is the विध्यर्थी form (B); MPSC keys it आज्ञार्थी here and in 32695ba1, so its source may class prohibitions as commands | 56ee098a |

## MPSC-Mains-grpb-2018-W11-GRPB

| Q | key | finding | id |
|---|---|---|---|
| 7 | B | 'कडून ... बांधली जाते' is taught as नवीन कर्मणी (a type of कर्मणी, A) in most books and as कर्मकर्तरी (B) in some: two defensible options | 37543c7f |

## MPSC-Mains-psi-2011-RAM-PSI

| Q | key | finding | id |
|---|---|---|---|
| 66 | B | 'अभ्यास केला की यश मिळते': 'की' here means 'when', so the first clause depends on the second, a मिश्र वाक्य (C), not संयुक्त | e6640e6a |
| 136 | C | 'fraught with' means full of (something undesirable): (B); (C) describes an effect, not the meaning | d175192c |
| 157 | D | 'Parents' is a plural common noun, not a collective noun (a group named as one unit); Common, Abstract (C) fits | 08b908e6 |
| 183 | B | "an honest servant in a firm" (A) and "... in the firm" (B) are both correct; nothing names a particular firm | 81ce518f |
| 189 | A | the passage says our improving the flavour of food "goes back ... to our more ancient links with the apes" (C); (A) describes the apes' food, not the evidence | ed120f39 |

## MPSC-Mains-psi-2013-Y02-PSI

| Q | key | finding | id |
|---|---|---|---|
| 19 | D | grammar books differ on 'क्वचित': some list it under कालवाचक (how often, A), some under परिमाणवाचक (D): two defensible options | 663b2890 |
| 66 | C | defective: possession, emoluments and succession are correct (a, c, d); only 'repeatation' is wrong; no option is a, c and d | d1d3a970 |

## MPSC-Mains-psi-2016-KO9-PSI

| Q | key | finding | id |
|---|---|---|---|
| 25 | C | adverbs are taught as अविकारी (अव्यय), which makes (b) wrong and (a) only (A) right; the key's (a) and (b) rests on the few adverbs that agree in gender (तो चांगला गातो, ती चांगली गाते) | ace7ec4d |
| 67 | C | "a member of the committee" (B) is the standard form; "on the committee" goes with "serve" or "sit", not usually with "member" | efcb60d6 |
| 70 | B | (a) "set up to look at the problem" is correct English (look at = examine), so (a), (b), (c) (C) fits better than (b), (c) | f98304d4 |
| 90 | C | "I have studied this topic for three hours" is correct present perfect ("have been studying" is only more usual); all three are correct: None (D) | 206cb8df |
| 95 | D | the key follows the rule "an amount takes a singular verb (costs)", but 'cost' in (a) also reads as past tense, which is correct: (a) only (A) is defensible | 768f139a |

## MPSC-Mains-psi-2017-L10-PSI

| Q | key | finding | id |
|---|---|---|---|
| 13 | C | defective: य् = इ (तालु), र् = ऋ (मूर्धा), ल् = लृ (दंत), व् = उ (ओष्ठ), i.e. इ, ऋ, लृ, उ; no option has that order | 3b6f5087 |
| 29 | D | 'म्हणजे' is a conjunction, not part of the predicate's extension; no option holds only विधेयविस्तार words | fd1f83cc |
| 48 | C | (b) 'उशिरा' is also a correct कालवाचक adverb, so (a), (b) and (c) are right; no option gives that set | 0c5b4fd1 |
| 57 | C | the passage says caste feeling grew strong and "naturally" caste-free awareness was always secondary (D); the dominance of family, caste, village etc. (C) is also given as the root: two defensible options | 9797b02c |
| 68 | A | in (a) the reporting words continue the sentence, so it should be "she ordered" with a small s; only (b) and (c) (B) are punctuated correctly | 125cc8d1 |
| 76 | A | "I met an advanced soul at a certain university in America" (B) and "At a certain university in America I met an advanced soul" (A) are both meaningful: two right options | 1b86d139 |

## MPSC-Mains-ssm-2017-Y09-SSM

| Q | key | finding | id |
|---|---|---|---|
| 20 | D | adverbs are taught as अविकारी, so the second sentence is wrong: (A); same point as ace7ec4d | 90f6908c |
| 43 | C | same 'साप' sentence: the usual rule gives लक्षणा (B); keyed व्यंजना | 1c253227 |
| 75 | D | in (c) 'who may come' qualifies 'all', an adjective clause, so only (a) and (b) (B) hold noun clauses | cd32424f |

## MPSC-Mains-ssm-2018-R11-SSM

| Q | key | finding | id |
|---|---|---|---|
| 55 | C | 'come' changes to 'go' only when the place changes; here Hari will not come to the listener, so 'come' stays: (A). Books differ on this rule | 4bf0b7bf |
| 78 | C | (a) "India stands for peace should be known..." has no 'that', so the clause cannot be the subject; only (b) (B) is grammatical | 7976e78f |

## MPSC-Mains-sti-2011-RRM-STI

| Q | key | finding | id |
|---|---|---|---|
| 1 | B | गंधाक्षत = sandal paste and unbroken rice offered in worship; none of the options gives that meaning exactly | b57f3cea |
| 72 | D | 'कमलनयन' here describes Rama (one whose eyes are like lotuses), a बहुव्रीही (B); read alone it is a कर्मधारय, a kind of तत्पुरुष: two defensible options | 88c02d9e |
| 83 | B | the subject part is 'आम्ही भारतीय नागरिक' (A): 'आम्ही' with its extension; (B) drops the core word | 62dd2d60 |
| 85 | C | the विधेयविस्तार is 'अद्यापिही' with 'जुन्या चाकोरीच्या बाहेर'; (C) includes the object 'लोकांना', so no option is clean | 70fdc812 |
| 111 | C | 'शारीरीय' is not a standard form (शारीरिक is); 'शरदचंद्र' is the common written form though sandhi gives शरच्चंद्र: no option is clearly the one pure word | 39a12ecf |
| 142 | C | "go with your friend" (A) is the standard form; "alongwith" is not standard written English | e47bed68 |
| 176 | A | "a few minutes ago" takes the simple past: "I saw" (C). "I have seen ... ago" is wrong. Key looks wrong | e7fba864 |
| 183 | D | "has a fever" (A) is standard; "has fever" (D) is also used: two defensible options | 3ad08b57 |
| 193 | A | "the louder the noise was" (C) is the regular pattern; the inverted "the louder was the noise" (A) is also found: two defensible options | a667fcb3 |

## MPSC-Mains-sti-2015-M08-STI

| Q | key | finding | id |
|---|---|---|---|
| 10 | B | (क) is false: an adjective can qualify a pronoun with no noun in the sentence ('तो हुशार आहे'), so only (अ) (A) | 3e6f31ac |
| 60 | A | the passage ends on Carver's message "whatever fills our brothers' plates with food", so the final aim is (अ) alone (B); building the lab (ब) is the means | 824abcf2 |
| 68 | B | defective: something falling from a purse is not a river side, a row of keys, a bank or a balance; no option fits the sentence | 115f110e |

## MPSC-Mains-sti-2017-Y10-STI

| Q | key | finding | id |
|---|---|---|---|
| 9 | B | Marathi also gives non-living things the neuter (ते), so ड is true as well; no option includes it | 1393e800 |
| 45 | D | the passage says the awareness of a particular class becomes prestigious "and from it classical works are born", which is (C) | f1aa8320 |
| 93 | C | the passage says God's name was a part of HIM (God) and carried his powers; (C) "a part of themselves" misstates it, and no option says they sought God's powers | 98be9f47 |

## MPSC-asp-2011-RSM

| Q | key | finding | id |
|---|---|---|---|
| 66 | B | the passage says "In biblical times the accountants kept track..."; King Solomon is one example in those times; A fits at least as well | 3841af47 |
| 116 | B | Maharashtra's 2001-2011 growth was 15.99%; its rank depends on which states and UTs are counted, so no option can be fixed | e92d5c1e |
| 151 | C | defective: India's rice yield in 1995-96 was about 1,797 kg/ha; no option matches | a97fcdbf |
| 190 | B | the figure found for Maharashtra's fish seed need (about 60 crore) matches no option; could not be confirmed | 41ea117f |

## MPSC-asp-2012-EOO

| Q | key | finding | id |
|---|---|---|---|
| 58 | C | "I was reading the letter carefully" (B) and "I was carefully reading the letter" (C) are both correct English | 3cafab0c |
| 61 | C | defective: the correct complex sentence is "Can you tell me why you are quiet?"; option (C) keeps the question order "why are you" | 78b8677c |
| 69 | C | two solvers read the passage's subject as "Education - higher learning" (A); "a failure" is not what the passage calls it | 0cbf1e29 |
| 138 | C | the source figure is 58.2%, which no option gives exactly (59 is nearest) | c8969713 |

## MPSC-asp-2016-U07

| Q | key | finding | id |
|---|---|---|---|
| 100 | A | (A) has cashew and kokam (coastal, not dryland) and (B) has papaya: no option is cleanly a dryland group | 35050de7 |

## MPSC-asp-2017-Q09

| Q | key | finding | id |
|---|---|---|---|
| 4 | D | 'जिवाची उलघाल होणे' means a restless, troubled mind (घालमेल); "खूप भीती वाटणे" is not its usual meaning | 2030948e |
| 69 | D | AGMARKNET mainly gives market prices and arrivals; "consumer preferences" is not what it provides, so "all of the above" is doubtful | 4649be0f |
| 73 | D | defective: the poverty-line calorie norm is 2,400 (rural) and 2,100 (urban); no option matches | e99c1dad |

## MPSC-asp-2018-I11

| Q | key | finding | id |
|---|---|---|---|
| 45 | C | defective: the Satyashodhak Samaj was founded on 24 September 1873; no option gives that date (the key's 14 Sep looks like a misprint) | 3af71ac1 |
| 90 | A | Karanj is the standard green-manure tree and also gives timber and fuel (C); silver oak is a shade and timber tree | ca49ff63 |

## MPSC-fsp-2014-D04

| Q | key | finding | id |
|---|---|---|---|
| 30 | A | the passage says she was "stupefied, in total disbelief": "did not believe he had really done so well" (B) fits at least as well as "was surprised" (A) | 78876a2d |
| 48 | B | (b) is untrue (he studied at Mysore and BHU), but so are (c) (he is usually called the third scientist after Raman and Kalam) and (d) (he chaired the PM's advisory council in 1985 and 2005, not 1994) | f06cc5ae |
| 77 | B | ozone gas is PALE blue; dark blue is the liquid. No option is exact | 3b1f358c |

## MPSC-fsp-2016-M07

| Q | key | finding | id |
|---|---|---|---|
| 49 | D | defective: the passage discusses theories of history, Ranade, Hindu society and despotism; no option covers what it discusses | a2926119 |

## MPSC-fsp-2017-E09

| Q | key | finding | id |
|---|---|---|---|
| 18 | C | 'उसासा टाकणे' means to sigh with sorrow or regret, वाईट वाटणे (B); the passage shows regret, and guilt (C) is a stretch of the idiom | 87e47e46 |
| 20 | A | the passage names only क and ड (overworking and beating the bullocks); अ (not keeping the cow-shelter) is not given as a cause, and no option is "क and ड" | 481fa844 |
| 30 | C | "will be over at 6 pm" is correct English; two solvers find no error (key may intend "by 6 pm") | 7585bc75 |
| 91 | D | the grandmother's only son's wife is Ila's mother, and her first daughter is Ila's eldest sister (A); "uncertain" needs a reading the question does not give | 3e16ce52 |

## MPSC-fsp-2018-K11

| Q | key | finding | id |
|---|---|---|---|
| 2 | B | 'संताप गिळणे संतांना शोभते' is both विधानार्थी (A) and होकारार्थी (B): two right options | 3fc79b62 |
| 12 | B | अनुस्वार literally means the sound that comes after (अनु + स्वार), which is (b) alone; (c) is a folk reading and no option is (b) alone | b7eb09a1 |
| 23 | C | the passage presents the Jallianwala Bagh reaction as a sign of the nation's unity; none of the options says that | 5cb1dcb5 |
| 30 | C | (C) is a correct sentence; (B) misplaces 'at Amritsar' ("The top of the temple at Amritsar is golden") and is the incorrect one | 64ee7042 |
| 32 | B | defective: (b) "She sings well" and (c) "I did it anyhow" are both correct, and no option gives (b) and (c) | 7eeaf158 |
| 40 | A | (C) "Old people always near the death's chariot hurrying near" has no verb, so it is incorrect too; (A) only lacks an optional 'that': two incorrect options | fe37319a |
| 90 | D | with all four letters the words are READ, DARE, DEAR (3, C); "more than 3" holds only if shorter words count, which the question does not say | a889e291 |

## MPSC-ssp-2013-X01

| Q | key | finding | id |
|---|---|---|---|
| 32 | C | defective: only (b) is true; algal blooms deplete oxygen and kill fish, so (c) is false. No option is (b) alone | d6375f36 |
| 47 | A | the Saffron Mission's components include replanting, soil health, irrigation, weather stations AND research and extension; no option lists all five | 3218b1a9 |
| 62 | D | defective: glucose IS filtered at the glomerulus (and then reabsorbed); all four substances are filtered | 8311e628 |
| 84 | B | phenolphthalein turns PINK in sodium carbonate solution; no option says pink ("purple" is only the nearest) | 373b16d6 |
| 98 | A | India recognised the PRC on 30 December 1949 and Burma was first; India also supported the PRC's Security Council seat: neither (D) | 81cb94d3 |

## MPSC-ssp-2014-G03

| Q | key | finding | id |
|---|---|---|---|
| 53 | B | defective: on a SMOOTH surface there is no friction, so (c) is false; the forces are (a), (b), (d), and no option gives that set | 55abae2f |
| 89 | D | Shourya is a hypersonic surface-to-surface BALLISTIC missile, not a cruise missile, so (c) is also wrong: (b) and (c) (B) | d1abcb49 |

## MPSC-ssp-2015-V05

| Q | key | finding | id |
|---|---|---|---|
| 64 | A | sources differ: herbal trade figures put roots first, field surveys of remedies put leaves first: two defensible options | 46c1f0e3 |

## MPSC-ssp-2016-N07

| Q | key | finding | id |
|---|---|---|---|
| 20 | B | Badrinath (Chaukhamba I, 7,138 m) is higher than Gangotri I (6,672 m), so the order is b, e, a, d, c (C) | c0e4d467 |
| 82 | D | only listicle sources call these people left-handed; Gandhi and Bachchan are often called ambidextrous. Cannot be settled from reliable sources | 461af9d3 |

## MPSC-ssp-2017-W08

| Q | key | finding | id |
|---|---|---|---|
| 48 | B | a ceiling on holdings is usually taught as a separate land reform, not a tenancy reform: only a, b and c (D); some books group all four | 224d3fdf |
| 86 | C | the Commonwealth adopted a Charter in 2013, so (b) is false; "all correct" (C) cannot be right | 084cd918 |

## MPSC-ssp-2018-F11

| Q | key | finding | id |
|---|---|---|---|
| 43 | C | sucrose gives one glucose and one fructose: 2 x 30-32 = 60-64 ATP on modern figures (72-76 on older ones); the MAXIMUM would be 64, so 60 is defensible only as the lower modern figure | 6d1b7ef2 |
| 58 | D | since the 11th Amendment the electoral college is ALL members of both Houses, elected and nominated, so (a) is incorrect (A) | 8114694c |
| 89 | B | the Battle of the Ten Kings was between Sudas of the Bharatas and a confederation of ten tribes (with Vishwamitra on their side); no option states it cleanly | f58ee881 |
| 90 | A | the Fourteen Major Rock Edicts (D) are the standard source for Ashoka's Dhamma; the minor edicts are mainly about his own conversion | c049cd70 |

## MPSC-ssp-2019-T12

| Q | key | finding | id |
|---|---|---|---|
| 1 | D | (a) is the standard reason: the floor exerts no force on the astronaut in free fall; "none of the above" does not fit | 826dee33 |
| 70 | B | defective: conglomerate is sedimentary, not extrusive igneous, and no extrusive rock is listed; no option matches correctly | fdb1d65f |
| 84 | B | burden-of-disease studies (GBD, Lancet) rank air pollution (A) as India's largest environmental cause of ill health | 81bb0bf1 |

## MPSC-ssp-2020-Y13

| Q | key | finding | id |
|---|---|---|---|
| 41 | D | the NCLP began in 1988, not 2015, so (a) is false; (b) and (c) hold, and no option is (b) and (c) | b9acef66 |
| 62 | C | a sarcomere is the segment between two Z lines, not "any segment of the fibre", so only (b) (B) is true | ad1b971d |
| 98 | D | the 2019 Sahitya Akademi Awards were announced in 23 languages, so (a) is correct; incorrect are (b) and (c) (C) | c83c6c20 |

## MPSC-ssp-2022-H15

| Q | key | finding | id |
|---|---|---|---|
| 48 | B | (d) is true: STH, TSH and ACTH come from the adenohypophysis, so (a), (c) and (d) (A) | 25aed124 |
| 49 | B | fumarase adds water to fumarate to give malate: hydration (D), not dehydrogenation. Key looks wrong | 38cfb292 |
| 86 | A | no Kolhapur body called "Lok Sabha" could be found; the other three are legislatures or unconfirmed. Could not be checked | 74c379b1 |

## MPSC-ssp-2024-W18

| Q | key | finding | id |
|---|---|---|---|
| 7 | C | Muslim landholders paid ushr, not zakat (a separate religious levy); no option gives Khiraj and Ushr | 4d87d353 |
| 46 | A | only a 4.5% figure for the 12th Plan's inflation aim could be found, not the range; could not be confirmed | 931528d1 |
| 94 | D | two options are untrue: he won in 1952 from Tajpur (D), and the first non-Congress CM of Bihar was Mahamaya Prasad Sinha, 1967 (B) | 3a03ebe1 |
| 100 | C | MSEDCL describes panels within 5 to 10 km of a 33 kV substation, so (d) may also be true; no option fits cleanly | 1fda01ff |

## MPSC-ssp-2025-E21

| Q | key | finding | id |
|---|---|---|---|
| 15 | C | the bread-and-water initiation belongs to the Paramahansa Mandali (forerunner of the Prarthana Samaj), not to any Samaj listed | 2f996d42 |
| 47 | C | ICDS also runs training of its anganwadi workers; whether "worker's training" counts as a programme under the scheme is arguable (A, B and C vs A and B) | 35a9650b |
| 50 | D | NPP 2000 aims at universal immunisation (B) and IMR below 30 per 1,000 (C); population stabilisation is set for 2045. No option is B and C | 81b04be7 |
| 87 | A | B is wrong (Vikrant was built at Cochin Shipyard, Kerala); A's "August 2024" is doubtful (a web-checked solver found 20 September 2024): possibly neither (D) | 487dabcb |
| 89 | C | the 6th National Water Awards were launched in October 2024 (A doubtful) with nine categories (B); the awards began in 2018 (C false). No option is "only B" | 0d2937a3 |

## MPSC-ssp-csat-2013-Y01

| Q | key | finding | id |
|---|---|---|---|
| 10 | C | the passage never names profit as anyone's main consideration (farmers traded independence for performance and larger harvests), and the wild crosses were "occasional": neither (B) | b3524fb6 |
| 13 | A | the passage never calls today's world "a clever people's world"; it says many call it a century of knowledge and deeper thinkers a century of mind | 1f1290a7 |
| 18 | D | (a) is wrong (Rio "reiterated" it), but (b) is wrong too: the courts held RTI inherent in Article 19(1)(a); the social-justice link is the writer's own. Neither (B) | cab373bb |
| 37 | B | (a), (c) and (d) all have support in the passage ("a kind word ... can do wonders"); no option groups them | 253e24f5 |

## MPSC-ssp-csat-2014-H03

| Q | key | finding | id |
|---|---|---|---|
| 3 | D | "Communism awakening imperialism out of its slumber" supports (b); "kicking imperialism" in the same line reads the other way: ambiguous as printed | cfd8aa31 |
| 4 | C | (b) is clearly incorrect; (a) is a loose paraphrase of "Indians learnt to die for their cause", so "only (b)" (B) is at least as defensible as "both" | 956de4ab |
| 35 | B | the passage says only that superstitions "if not restrained" bring disaster; no option says that, and (b) is not stated | d0fd0fc2 |
| 50 | C | the passage criticises goal-chasing and explains why people end up disillusioned; "Chalking out our goals" names the habit, not the argument: (A) fits better | 80f347e0 |
| 52 | C | defective: F = I > B >= M <= K gives (III) and (IV) only; no option is "only (III) and (IV)" | da5c7b5d |

## MPSC-ssp-csat-2015-W05

| Q | key | finding | id |
|---|---|---|---|
| 5 | C | the passage credits Gutenberg with the new printing technique, and he is the standard inventor of the movable-type press; "neither" (C) makes (a) false | 696b02cc |
| 30 | A | the passage does not say Europeans were unwilling to serve or that invasions were common (only a "chronic fear" of them); no option fits it | d9afd744 |
| 31 | B | the passage says conversion "can result in" solid, liquid or gas fuel, not that each method gives all three; (b) overstates it. Neither (C) | 5c42ab82 |
| 37 | D | the passage names the kinds of norms as लोकरीती, लोकनीती and कायदे (b, d, g = A); order in society is what norms do, not a norm | 2d8b55e1 |
| 46 | C | the passage calls tolerance dull, boring, negative and "much less thrilling", never unpopular; (b) is not supported | 8b322030 |
| 49 | C | the writer says "Don't try to love them: you can't ... try to tolerate them", so (b) "either love or tolerate" is incorrect; key says neither is incorrect | 892f5e8b |

## MPSC-ssp-csat-2016-O07

| Q | key | finding | id |
|---|---|---|---|
| 1 | D | the passage says the TERM was coined in 1864 while the features go back to the fifteenth century, so "the concept was created in the nineteenth century" (B) is arguably untrue; "none" rests on reading concept = term | d34c88e0 |
| 15 | A | neither statement is in the passage or bears on climate-driven brain growth; "only a" is a stretch | 791f43e9 |
| 25 | A | (b) and (c) clearly confirm the comment; whether (a) does is arguable, and no option is (b) and (c) | 897e173e |
| 27 | B | the passage also says the Pinta tortoise species ended with George, so a, b and c (C) are extinct | 671edb06 |
| 38 | B | passage: persecution under the church and then the king; with democracy came legal penalties. Nothing says persecution continued under democracy, so "all three" (d) does not follow | 66c0eb04 |

## MPSC-ssp-csat-2018-G11

| Q | key | finding | id |
|---|---|---|---|
| 15 | A | defective: an object at the focus of a 9 cm lens forms its image at infinity, and the usual angular magnification (25/9, or 1 + 25/9) gives no option; 10 times is not derivable | 60910e8a |

## MPSC-ssp-csat-2019-U12

| Q | key | finding | id |
|---|---|---|---|
| 30 | A | passage names constitution, legal and military measures, and "compromising democracy"; "communist regime" (c) is not named, "failure of democracy" (d) is: B fits better | a60a5160 |
| 45 | C | defective: the passage's reason (scattered groups, each with its own dialect) is not what (क) says, and no option gives it | 097e469c |
| 68 | D | defective: at most 3 fish (spotted, not golden, not pink) can be both spotted and striped, so the minimum is 8 + 13 - 3 = 18; no option gives 18 | e55424cd |

## MPSC-ssp-csat-2020-Z13

| Q | key | finding | id |
|---|---|---|---|
| 10 | D | the passage never calls bio-fuel cheap (it says crude oil was the cheapest), so (d) is not a stated benefit: (a), (b), (c) (C) | 616c1e0a |
| 17 | A | the ministry itself blames Aadhaar-based enrolment and messy land records, so (b) also follows: both (D) | c3df3f3c |
| 36 | C | passage: the aim is a democratic, secular, socialist society in place of an inegalitarian one (B); "high intellectual acumen" is not stated | a1596d74 |
| 39 | C | passage: "the education system of today continues to support the domination of the privileged groups" (D); "hierarchical and inegalitarian" describes the society to be replaced | 96c98a23 |
| 49 | A | the passage says it is not the passage of time that makes a book great, so (e) is false; no option is fully correct | 21df992c |
| 50 | B | the passage's own word is "contain"; "have" (D) fits; "envelop" means to wrap round | 372ba7d9 |
| 73 | D | the passage says little is known about humans and only animal studies suggest harm; a ban (D) does not follow as a conclusion, and no option does | b59b78c2 |

## MPSC-ssp-csat-2021-P14

| Q | key | finding | id |
|---|---|---|---|
| 5 | A | the passage supports (d) and arguably (c) (studying causes behind events); (a) and (b) are not stated. "Only (d)" vs "(c) and (d)" | 6762d3b7 |
| 40 | C | defective: the passage supports (b) and (c); (d) "value addition to existing rights" is not stated, and no option is (b) and (c) | 6f44690b |
| 68 | D | the passage builds to "these observations may help solve mankind's energy and food problems", which is (C); "functions of the vehicles" (D) names the topic, not the argument | 26b4f5b6 |

## MPSC-ssp-csat-2023-R17

| Q | key | finding | id |
|---|---|---|---|
| 11 | B | (ड) follows from the passage; (ब) "the language of 'why' is sometimes not understood" is not given as the reason: no option is clean | 04777a4f |
| 13 | C | (अ), (क) and (ड) are each only partly stated in the passage; no option can be fixed from it | e3231e4d |
| 24 | A | B (how a person chooses a business) is not the reason for A (Davies on the prestige of a position); two solvers give B | f275afc5 |
| 28 | C | defective: the passage gives the central place to the Swaraj of outcastes, Dalits and lower castes (C and D); no option has them alone | 0e1f5b20 |
| 29 | A | the passage does not say which movements made democracy more widespread; no option can be checked against it | c760359b |
| 32 | C | the passage ties only the supply-side measures (D) to "a sustained long-term expansion"; safety nets were the immediate response and capex built medium-term demand. No option is "only D" | 4c7e3e74 |
| 33 | D | the passage's own "This implies that" is followed by (A) only; (B) is a separate observation | 39fd2b47 |
| 35 | D | passage: consumption grew 7% "with significant contributions from government spending" (A); GFCF and exports are separate points, not causes | 95819925 |
| 53 | C | worked through: if To won, To cannot be Koki, Vo must be Koki, Mo Toki and To Poki, but then To's "Vo is not Poki" is true, which a Poki cannot say. Only Mo winning is consistent (A). Key looks wrong | 5bb0809b |
| 65 | C | the clue "c ... and to the west of b" reads two ways (c west of b, or e west of b), and neither reading forces one option | bcfa5424 |
| 66 | A | pond area L²/2 (curve) vs concrete 1.5L + 1 (line), crossing between 3 and 4; two solvers reading the picture pick graph (4) | 1ee2b64f |

## MPSC-ssp-csat-2024-X18

| Q | key | finding | id |
|---|---|---|---|
| 40 | D | defective: the passage names communal, authoritarian and military strains but not feudalism; no option is (a), (c), (d) | 793d3e08 |
| 42 | C | (ड) reverses cause and effect (experiences shape art, art does not cause experiences) and (क) is not clearly stated: no option is clean | 0abd252f |

