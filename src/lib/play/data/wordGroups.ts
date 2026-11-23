import type { GroupLevel, Puzzle } from "../groups";

/**
 * Word Groups puzzles (2026-11-18). Each group is four words with one shared
 * meaning, written around words from real SSC, NDA, CDS and MPSC synonym
 * questions (the bank's synonym subtopics). Near-synonym groups (talkative and
 * wordy, shy and withdrawn, frugal and stingy) are never in the same puzzle,
 * so each puzzle has one solution. Two blind solvers checked every puzzle
 * before it shipped (scripts/play/groups-check/). Colour 1 is the easiest
 * group, 4 the hardest. British spelling, as Indian papers print it.
 *
 * Add a puzzle at the END: the daily puzzle is picked by position
 * (lib/play/groups puzzleIndexForDay), so inserting one shifts every later day.
 */

type Row = [name: string, level: GroupLevel, words: string];

const RAW: Row[][] = [
  [["Very large", 1, "enormous gigantic mammoth colossal"], ["Praise highly", 2, "extol laud glorify acclaim"], ["Stubborn", 3, "adamant obstinate intransigent stubborn"], ["Rude boldness", 4, "audacity effrontery temerity impudence"]],
  [["Hungry", 1, "famished ravenous starving hungry"], ["Talkative", 2, "garrulous loquacious chatty voluble"], ["Generous", 3, "magnanimous benevolent munificent bountiful"], ["Too little", 4, "exiguous meagre scanty sparse"]],
  [["Angry", 1, "irate incensed livid furious"], ["Peaceful", 2, "tranquil serene placid calm"], ["Make clear", 3, "elucidate explicate clarify illuminate"], ["Hard to understand", 4, "abstruse recondite esoteric arcane"]],
  [["Lazy", 1, "idle lethargic slothful indolent"], ["Hardworking", 2, "industrious diligent assiduous sedulous"], ["Poverty", 3, "penury indigence destitution poverty"], ["Brief in words", 4, "laconic terse succinct pithy"]],
  [["Spotless", 1, "spotless immaculate pristine unsullied"], ["Dirty", 2, "filthy grimy squalid soiled"], ["Fake", 3, "counterfeit spurious bogus sham"], ["Flattery", 4, "sycophancy adulation blandishment flattery"]],
  [["Fearless", 1, "fearless valiant intrepid dauntless"], ["Fear", 2, "dread trepidation apprehension terror"], ["Puzzled", 3, "baffled perplexed nonplussed bewildered"], ["Short-lived", 4, "ephemeral transient fleeting evanescent"]],
  [["Very small", 1, "tiny minute diminutive minuscule"], ["Eager", 2, "zealous ardent fervent avid"], ["Changeable", 3, "fickle capricious mercurial volatile"], ["Sulky and gloomy", 4, "morose sullen glum dour"]],
  [["Polite", 1, "courteous civil polite urbane"], ["Proud and arrogant", 2, "haughty arrogant supercilious conceited"], ["Humble", 3, "modest meek unassuming humble"], ["Sociable", 4, "gregarious sociable convivial outgoing"]],
  [["Deadly", 1, "fatal lethal mortal deadly"], ["Healing", 2, "therapeutic curative remedial healing"], ["Harmful", 3, "detrimental deleterious pernicious injurious"], ["Good for health", 4, "salubrious nourishing wholesome healthful"]],
  [["Disaster", 1, "disaster catastrophe calamity cataclysm"], ["Favourable", 2, "propitious auspicious favourable opportune"], ["Threatening", 3, "ominous sinister baleful menacing"], ["Highest point", 4, "apex zenith pinnacle acme"]],
  [["Begin", 1, "commence initiate inaugurate launch"], ["Stop", 2, "terminate conclude cease discontinue"], ["Get in the way", 3, "impede hinder obstruct hamper"], ["Slow to act", 4, "dilatory tardy sluggish laggard"]],
  [["Make bigger", 1, "augment amplify enhance magnify"], ["Get smaller", 2, "diminish dwindle wane shrink"], ["Ease pain", 3, "alleviate mitigate assuage allay"], ["Make worse", 4, "aggravate exacerbate worsen compound"]],
  [["Forbid", 1, "prohibit ban forbid proscribe"], ["Cancel a law", 2, "repeal revoke rescind annul"], ["Agree", 3, "concur acquiesce assent consent"], ["Object to small things", 4, "cavil quibble carp nitpick"]],
  [["Scold", 1, "scold reprimand rebuke chide"], ["Forgive", 2, "pardon condone absolve exonerate"], ["False damaging words", 3, "calumny defamation libel slander"], ["Send away", 4, "exile expel deport banish"]],
  [["Strong", 1, "robust sturdy hardy stalwart"], ["Weak", 2, "feeble frail infirm debilitated"], ["Bends easily", 3, "pliable supple pliant flexible"], ["Put right", 4, "rectify amend remedy redress"]],
  [["Beautiful", 1, "gorgeous exquisite ravishing lovely"], ["Ugly", 2, "hideous grotesque unsightly ugly"], ["Very thin", 3, "gaunt emaciated lean skinny"], ["Pale", 4, "pallid wan sallow ashen"]],
  [["Fat", 1, "obese corpulent portly stout"], ["Boring", 2, "tedious monotonous humdrum dreary"], ["Holds your attention", 3, "intriguing engrossing absorbing riveting"], ["Childish", 4, "juvenile puerile infantile childish"]],
  [["Hot", 1, "scorching sweltering torrid sultry"], ["Cold", 2, "frigid chilly glacial icy"], ["Wet", 3, "damp moist soggy sodden"], ["Very dry", 4, "arid parched desiccated dry"]],
  [["Delicious", 1, "delicious scrumptious delectable luscious"], ["Tasteless", 2, "insipid bland vapid flavourless"], ["Greedy", 3, "voracious avaricious rapacious greedy"], ["Lively", 4, "vivacious sprightly animated lively"]],
  [["Rich", 1, "affluent wealthy prosperous moneyed"], ["About money", 2, "fiscal financial monetary pecuniary"], ["Mean with money", 3, "miserly parsimonious niggardly stingy"], ["Too much", 4, "surfeit glut plethora excess"]],
  [["Very happy", 1, "ecstatic elated jubilant euphoric"], ["Sadness", 2, "melancholy sorrow gloom despondency"], ["Grieve", 3, "mourn grieve lament bewail"], ["Celebrate", 4, "rejoice exult revel celebrate"]],
  [["Hide", 1, "conceal mask veil cloak"], ["Reveal", 2, "disclose divulge unveil expose"], ["Done in secret", 3, "covert clandestine surreptitious furtive"], ["Obvious", 4, "manifest evident patent conspicuous"]],
  [["Avoid", 1, "evade elude dodge shun"], ["Keep bothering", 2, "harass pester badger hound"], ["Frighten", 3, "intimidate daunt cow terrify"], ["Persuade gently", 4, "coax cajole wheedle entice"]],
  [["Bring together", 1, "muster assemble congregate convene"], ["Spread apart", 2, "disperse dissipate scatter strew"], ["Take by authority", 3, "confiscate impound expropriate seize"], ["Steal", 4, "pilfer filch purloin thieve"]],
  [["Cheat", 1, "swindle defraud dupe con"], ["Genuine", 2, "genuine authentic legitimate veritable"], ["Copy", 3, "replica duplicate facsimile clone"], ["Alike", 4, "akin analogous alike similar"]],
  [["Unlike", 1, "different distinct dissimilar disparate"], ["Join into one", 2, "merge fuse unite amalgamate"], ["Cut apart", 3, "sever detach sunder disconnect"], ["Lay waste", 4, "devastate ravage wreck blight"]],
  [["Wipe out", 1, "annihilate obliterate eradicate efface"], ["Big fire", 2, "conflagration blaze inferno fire"], ["Flood", 3, "inundate submerge swamp deluge"], ["Stormy", 4, "inclement stormy squally tempestuous"]],
  [["Fashion", 1, "vogue trend craze fad"], ["Job", 2, "vocation occupation profession calling"], ["Free-time activity", 3, "pastime hobby recreation diversion"], ["Short break", 4, "respite lull pause intermission"]],
  [["Hard work", 1, "labour toil drudgery exertion"], ["Copy closely", 2, "emulate imitate mimic ape"], ["Achieve", 3, "accomplish attain achieve fulfil"], ["Total failure", 4, "fiasco debacle flop washout"]],
  [["Success", 1, "triumph victory conquest success"], ["Not giving up", 2, "perseverance tenacity persistence doggedness"], ["Patience", 3, "forbearance tolerance restraint patience"], ["Too much", 4, "inordinate exorbitant excessive extravagant"]],
  [["Ruler", 1, "monarch sovereign emperor king"], ["Cruel ruler", 2, "despot dictator oppressor tyrant"], ["Betrayal", 3, "betrayal treachery perfidy treason"], ["Loyal", 4, "faithful devoted staunch loyal"]],
  [["Kind", 1, "compassionate humane benign kindly"], ["Cruel", 2, "ruthless merciless callous brutal"], ["Bitter in words", 3, "acrimonious vitriolic caustic scathing"], ["Refined", 4, "refined cultured cultivated sophisticated"]],
  [["Strict", 1, "stringent rigorous austere severe"], ["Not straight", 2, "crooked twisted askew awry"], ["Stretched tight", 3, "taut tight tense strained"], ["Without plan", 4, "haphazard arbitrary random desultory"]],
  [["Ordinary", 1, "mundane commonplace prosaic banal"], ["Extraordinary", 2, "exceptional remarkable phenomenal prodigious"], ["Unimportant", 3, "trivial trifling petty paltry"], ["Highest in rank", 4, "paramount supreme foremost preeminent"]],
  [["Very important", 1, "crucial pivotal critical vital"], ["Required", 2, "mandatory compulsory obligatory binding"], ["Your choice", 3, "optional voluntary discretionary elective"], ["To the point", 4, "apposite pertinent germane relevant"]],
  [["Against the law", 1, "illegal illicit unlawful criminal"], ["Wrongdoing", 2, "transgression violation offence misdeed"], ["Seeming", 3, "ostensible apparent seeming outward"], ["Mysterious", 4, "enigmatic cryptic inscrutable mysterious"]],
  [["Madness", 1, "madness insanity lunacy derangement"], ["Slow-witted", 2, "dense obtuse doltish imbecilic"], ["Wild with feeling", 3, "berserk frenzied frantic hysterical"], ["Calm under pressure", 4, "composed unruffled collected imperturbable"]],
  [["Nervous", 1, "nervous uneasy apprehensive edgy"], ["Well spoken", 2, "articulate eloquent fluent expressive"], ["Angry speech", 3, "invective tirade diatribe harangue"], ["Make fun of", 4, "deride ridicule scoff jeer"]],
  [["Trip", 1, "jaunt excursion expedition voyage"], ["Wander", 2, "roam rove meander ramble"], ["Hurry", 3, "hasten hurry rush scurry"], ["About to happen", 4, "impending imminent looming forthcoming"]],
  [["Where it began", 1, "origin source genesis provenance"], ["Result", 2, "outcome upshot result consequence"], ["Central part", 3, "crux gist essence kernel"], ["Difficult situation", 4, "predicament quandary dilemma plight"]],
  [["Puzzle", 1, "riddle puzzle enigma conundrum"], ["Mistaken belief", 2, "fallacy misconception error mistake"], ["Make sure", 3, "ascertain verify confirm corroborate"], ["Guess", 4, "speculate surmise conjecture presume"]],
  [["Judge the value", 1, "evaluate assess appraise gauge"], ["Beg", 2, "implore beseech entreat plead"], ["Push to act", 3, "exhort urge goad spur"], ["Always complaining", 4, "querulous peevish petulant fretful"]],
  [["Complaint", 1, "grievance complaint grouse gripe"], ["Fault-finding", 2, "captious censorious hypercritical carping"], ["Careless", 3, "negligent remiss heedless slipshod"], ["Noisy and unruly", 4, "obstreperous rowdy boisterous unruly"]],
  [["Obedient", 1, "obedient docile compliant submissive"], ["Defiant", 2, "defiant insubordinate recalcitrant refractory"], ["Very careful", 3, "meticulous scrupulous fastidious punctilious"], ["Fame", 4, "renown eminence prestige repute"]],
  [["Out of date", 1, "obsolete antiquated outmoded archaic"], ["New and original", 2, "novel innovative pioneering inventive"], ["Lasting for ever", 3, "eternal perpetual everlasting immortal"], ["Shame", 4, "ignominy infamy dishonour disgrace"]],
  [["Hate", 1, "hate detest loathe abhor"], ["Love", 2, "affection fondness devotion adoration"], ["Insult", 3, "affront slight indignity insult"], ["Strong wish", 4, "yearning hankering craving longing"]],
  [["Giving light", 1, "luminous radiant lustrous incandescent"], ["Sparkle", 2, "coruscate glitter twinkle scintillate"], ["Loud noise", 3, "din clamour uproar tumult"], ["Good judgement", 4, "wisdom sagacity discernment prudence"]],
  [["Shy", 1, "shy bashful reticent coy"], ["Full of energy", 2, "dynamic vigorous energetic spirited"], ["Enthusiasm", 3, "zeal fervour ardour passion"], ["Sly", 4, "artful wily crafty cunning"]],
  [["Honest", 1, "candid frank forthright sincere"], ["Beginner", 2, "novice neophyte tyro beginner"], ["Skilled", 3, "adept proficient adroit deft"], ["Clumsy", 4, "awkward gauche maladroit ungainly"]],
  [["Easily fooled", 1, "naive gullible credulous ingenuous"], ["Firm", 2, "steadfast unwavering resolute determined"], ["Poisonous", 3, "toxic venomous noxious poisonous"], ["Keeping apart", 4, "reclusive solitary withdrawn secluded"]],
  [["Help", 1, "assist aid support succour"], ["Allow", 2, "permit allow let license"], ["Personal charm", 3, "charisma allure magnetism appeal"], ["Cowardly", 4, "timid timorous craven cowardly"]],
  [["Cheerful", 1, "cheerful jovial genial buoyant"], ["Bad-tempered", 2, "grumpy cantankerous irascible testy"], ["Calm someone", 3, "pacify placate appease mollify"], ["Downcast", 4, "disconsolate dejected despondent crestfallen"]],
  [["Quarrel", 1, "quarrel dispute altercation wrangle"], ["Ready to fight", 2, "pugnacious belligerent bellicose combative"], ["Amazed", 3, "astonished astounded flabbergasted stunned"], ["Plenty", 4, "abundant ample copious profuse"]],
  [["Shocked", 1, "horrified appalled aghast dismayed"], ["Using too many words", 2, "wordy verbose prolix rambling"], ["Give approval", 3, "endorse ratify approve sanction"], ["Luxurious", 4, "lavish sumptuous plush luxurious"]],
  [["Grand", 1, "magnificent splendid grand majestic"], ["Without equal", 2, "peerless unrivalled matchless incomparable"], ["Mocking", 3, "sarcastic sardonic mocking derisive"], ["Bubbling with joy", 4, "ebullient exuberant effervescent bubbly"]],
  [["Laugh", 1, "giggle chuckle chortle snigger"], ["Cry", 2, "weep sob wail whimper"], ["Shout", 3, "yell bellow roar holler"], ["Stare", 4, "gaze gape ogle gawk"]],
  [["Anger", 1, "wrath ire rage fury"], ["Joy", 2, "bliss delight elation glee"], ["Dislike", 3, "aversion antipathy hostility enmity"], ["Friendship", 4, "camaraderie fellowship companionship amity"]],
  [["Enemy", 1, "foe adversary rival antagonist"], ["Companion", 2, "partner associate consort comrade"], ["Strange", 3, "bizarre eccentric peculiar odd"], ["Usual", 4, "customary habitual routine usual"]],
  [["Good smell", 1, "aroma fragrance scent perfume"], ["Bad smell", 2, "stench reek stink malodour"], ["Covering everything", 3, "comprehensive thorough exhaustive complete"], ["Not often found", 4, "scarce rare uncommon infrequent"]],
  [["Eat greedily", 1, "devour gobble wolf gulp"], ["Lie", 2, "falsehood fib untruth fabrication"], ["Serious", 3, "solemn grave sombre earnest"], ["Funny", 4, "witty humorous droll facetious"]],
  [["Walk slowly", 1, "stroll saunter amble promenade"], ["Quick look", 2, "glance glimpse peek peep"], ["Bravery", 3, "courage valour bravery gallantry"], ["Not complete", 4, "incomplete fragmentary partial sketchy"]],
];

export const PUZZLES: Puzzle[] = RAW.map((rows, i) => ({
  id: i + 1,
  groups: rows.map(([name, level, words]) => ({ name, level, words: words.split(" ") })),
}));
