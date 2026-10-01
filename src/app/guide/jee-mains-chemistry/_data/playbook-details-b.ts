/**
 * Deep-dives for the five REACTIONS-strand playbooks of /guide/jee-mains-chemistry: Hydrocarbons,
 * Haloalkanes and Haloarenes, Alcohols Phenols and Ethers, Aldehydes Ketones and Carboxylic Acids,
 * and Amines. Every reagent, product and trap agrees with the chapter's /notes/jee-mains-chemistry
 * pages, and subSkills follow those pages' order. Prose carries no bank figures — the pages print
 * counts and rates from the generated matrix.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_B: Record<string, PlaybookDetail> = {
  hydrocarbons: {
    slug: "hydrocarbons",
    trigger: "An alkane, alkene, alkyne or benzene ring meets a reagent, and you must say where the new group goes, how many products form, or whether a ring is aromatic.",
    story: [
      "Most questions reduce to one decision: which carbon gets the new group. For an alkene it is the carbon that leaves the more stable carbocation, after any hydride or methyl shift, or the more stable radical when HBr has a peroxide. For a substituted benzene it is the position the group already on the ring directs to.",
      "The numeric answers are counts: monochloro products of an alkane, carbonyl fragments from ozonolysis, π electrons in a ring, moles of H₂ taken up. Each count has a routine. Apply it in full, because one missed isomer loses the four marks and a wrong entry costs one more.",
      "Marks slip on conditions, not on the reactions. Cold dilute KMnO₄ gives a diol, hot KMnO₄ cuts the C=C; Cl₂ in the dark adds, Cl₂ in light substitutes; Lindlar gives the cis alkene, Na in liquid NH₃ the trans. Read the reagent line twice before choosing.",
    ],
    subSkills: [
      { name: "Alkanes: preparation and conformations", description: "Wurtz and Kolbe double the chain, soda lime removes one carbon, RMgX + H₂O gives RH; staggered ethane is most stable, fully eclipsed butane least." },
      { name: "Free-radical halogenation", description: "Monohalo products = sets of non-equivalent H; add enantiomers when the stem counts stereoisomers; Br₂ strongly prefers a 3° H, Cl₂ does not." },
      { name: "Alkene stability and HX or water addition", description: "More alkyl groups on C=C, more stable; HX adds Markovnikov after any shift; HBr + peroxide adds anti-Markovnikov; hydroboration gives the anti-Markovnikov alcohol with no shift." },
      { name: "Halogens, KMnO₄ and ozonolysis", description: "Br₂ adds anti (trans-but-2-ene → meso); cold KMnO₄ → syn diol, hot KMnO₄ → acids, ketones and CO₂; O₃ then Zn/H₂O → aldehydes and ketones." },
      { name: "Alkynes", description: "Alc. KOH then NaNH₂ makes the C≡C; a terminal C–H gives acetylides and a white AgNO₃ precipitate; Lindlar → cis, Na/liq. NH₃ → trans; HgSO₄ hydration gives a methyl ketone (ethanal from ethyne)." },
      { name: "Benzene and aromaticity", description: "Cyclic, planar, fully conjugated, 4n + 2 π electrons; count only π electrons inside the ring; aromatic > non-aromatic > antiaromatic in stability." },
      { name: "Electrophilic substitution on benzene", description: "NO₂⁺, Cl⁺, SO₃ and R⁺ from acids or AlCl₃; lone-pair groups and alkyls direct ortho-para, NO₂, CN, CHO, COOH meta; halogens deactivate yet direct ortho-para." },
      { name: "Friedel–Crafts, side-chain oxidation and step order", description: "Alkylation rearranges, acylation does not; hot KMnO₄ cuts any chain with a benzylic H to COOH; do Friedel–Crafts before adding NO₂, COR or SO₃H." },
    ],
    traps: [
      { name: "The unshifted product", description: "When the first cation is 2° next to a 3° or quaternary carbon, a hydride or methyl shift comes first. The product without the shift is always among the options; oxymercuration and hydroboration are the routes that never shift." },
      { name: "Peroxide on the wrong acid", description: "Only HBr adds anti-Markovnikov with a peroxide. HCl and HI still give the Markovnikov product." },
      { name: "A ring alkene split into two molecules", description: "Ozonolysis or hot KMnO₄ of a ring C=C opens the ring into one chain with a carbonyl at each end. Cyclohexene gives one product, hexanedioic acid with hot KMnO₄." },
      { name: "Aromatic by count alone", description: "cis-[10]annulene and cyclooctatetraene fail on planarity, cyclopentadiene on its sp³ CH₂. Judge the ion where the question is about acidity: the cyclopentadienyl anion is aromatic." },
      { name: "Halobenzenes ranked above benzene", description: "Halogens direct ortho-para but slow the ring. Chlorobenzene sits just below benzene in rate of electrophilic substitution." },
    ],
    relatedSlugs: ["organic-basic-principles", "haloalkanes-and-haloarenes", "aldehydes-ketones-and-carboxylic-acids"],
  },

  "haloalkanes-and-haloarenes": {
    slug: "haloalkanes-and-haloarenes",
    trigger: "A halide meets a nucleophile, a base or a metal, or a list of halides is ranked by SN1, SN2 or a physical property.",
    story: [
      "The chapter is a reasoning chapter. A halide and a reagent are given and the work is choosing the pathway before writing the product: can the carbon form a stable cation, is it open to attack from behind, is the reagent a nucleophile or a base?",
      "Ranking questions are common, and each ranks by one property only. SN1 follows carbocation stability, SN2 follows crowding at the carbon, nucleophilicity follows the solvent. Name the property first; most wrong orders come from mixing two of them.",
      "The recall is small but exact: a few named reactions (Finkelstein, Swarts, Sandmeyer, Gattermann, Wurtz), a few physical trends, and the uses of polyhalogen compounds. Numeric questions are rare and are counts of products or of halides that pass a test.",
    ],
    subSkills: [
      { name: "Classes and physical properties", description: "Allylic and benzylic X sit on sp³ carbon, vinylic and aryl X on sp²; aryl C–X is shorter and less polar; b.p. rises R–F < R–Cl < R–Br < R–I and falls with branching; p-dichlorobenzene melts highest." },
      { name: "Preparation and named reactions", description: "SOCl₂, PCl₅ or HX/ZnCl₂ on alcohols; Finkelstein NaI in dry acetone → RI; Swarts AgF or SbF₃ → RF; Sandmeyer CuCl, CuBr, CuCN on ArN₂⁺; phenol never gives ArX with HX." },
      { name: "SN1 and SN2 mechanisms", description: "SN2: rate k[RX][Nu⁻], one step, inversion; SN1: rate k[RX], planar cation, racemisation and possible shifts; tosylation keeps the configuration." },
      { name: "Reactivity order in substitution", description: "SN1 by cation stability (3°, benzylic, allylic, CH₃OCH₂Cl fast); SN2 CH₃ > 1° > 2° > 3°, neopentyl slow; vinylic, aryl and small-cage bridgehead halides do not ionise." },
      { name: "Nucleophiles and ambident reagents", description: "In protic solvents I⁻ > Br⁻ > Cl⁻ > F⁻, in DMSO the order reverses; KCN → R–CN, AgCN → R–NC; KNO₂ → R–O–N=O, AgNO₂ → R–NO₂." },
      { name: "Elimination against substitution", description: "Aqueous KOH substitutes, alcoholic KOH with heat eliminates; a bulky base or a 3° halide gives the alkene; Zaitsev product unless another C=C is conjugated; no β-H, no E2." },
      { name: "Haloarenes and metals", description: "NO₂ ortho or para to Cl makes nucleophilic substitution easy; halogens direct electrophiles ortho-para; RX + Mg/dry ether → RMgX; Wurtz, Wurtz–Fittig and Fittig with Na." },
    ],
    traps: [
      { name: "The nitrite and cyanide pairs swapped", description: "KNO₂ gives the alkyl nitrite R–O–N=O and AgNO₂ the nitroalkane R–NO₂; KCN gives the nitrile and AgCN the isocyanide. Both silver salts bond through nitrogen." },
      { name: "Primary means fast SN2", description: "Neopentyl halides are primary but react very slowly, because the tert-butyl group blocks the back of the carbon. Benzylic halides are fast by both SN1 and SN2." },
      { name: "A tertiary bridgehead ionises", description: "A halogen at the bridgehead of a small cage is tertiary yet barely reacts by SN1: the cage keeps the carbon from flattening. 3-Bromocyclopropene and 7-bromocycloheptatriene ionise easily because their cations are aromatic." },
      { name: "Inversion read as R to S", description: "SN2 inverts the 3-D arrangement, but the R/S letter changes only when the incoming group takes the leaving group's priority rank. Reassign priorities on the product." },
      { name: "Gattermann gives a cyanide", description: "Copper powder with HCl or HBr gives ArCl or ArBr. The aryl cyanide comes from the Sandmeyer reaction with CuCN." },
    ],
    relatedSlugs: ["organic-basic-principles", "hydrocarbons", "alcohols-phenols-and-ethers"],
  },

  "alcohols-phenols-and-ethers": {
    slug: "alcohols-phenols-and-ethers",
    trigger: "An O–H or C–O–C compound is ranked by acidity, dehydrated or split by acid, or put through a named phenol reaction.",
    story: [
      "Three habits carry most of the chapter. Rank acidity by how well the ion left behind spreads its negative charge. Follow the carbocation whenever an alcohol meets acid, and let it shift before the alkene forms. Decide which C–O bond HI breaks, remembering that the aryl–oxygen bond never does.",
      "The rest is exact recall, where one swapped reagent costs the mark: which solvent gives which bromophenol, which nitrophenol steam distils, what CHCl₃ and CO₂ each put on the ring, and which phenol fails the phthalein test.",
      "Numeric answers are small: active hydrogens counted by CH₃MgI, the mass gained on acetylation (42 per OH), the overall yield of a route (multiply the step yields), or how many compounds in a list pass a screen.",
    ],
    subSkills: [
      { name: "Classes, preparation and boiling points", description: "Count carbons on the carbinol carbon, ring carbons included; acid hydration can shift, hydroboration cannot; NaBH₄ leaves acids alone; o-nitrophenol is chelated and steam volatile." },
      { name: "Acidity of alcohols and phenols", description: "Phenol (pKa 10.0) is far stronger than ethanol (15.9); p-nitro > o-nitro > m-nitro > phenol; m-OCH₃ strengthens, p-OCH₃ weakens; NaHCO₃ needs two or three o/p nitro groups." },
      { name: "Reactions of alcohols", description: "SOCl₂, PCl₅ or HX replace OH; Lucas: 3° clouds at once, 1° stays clear; PCC stops at the aldehyde; Cu at 573 K dehydrogenates 1° and 2°, dehydrates 3°." },
      { name: "Acid dehydration and shifts", description: "E1 through the carbocation; 1,2-hydride or methyl shifts and ring expansion first; then the most substituted, conjugated alkene." },
      { name: "Making phenol and its named reactions", description: "Dow, sulphonate fusion, diazonium + warm water, cumene hydroperoxide; Zn dust → benzene; Reimer–Tiemann (CHCl₃/NaOH) → salicylaldehyde; Kolbe (CO₂/NaOH) → salicylic acid." },
      { name: "Ring substitution of phenol", description: "Bromine water → 2,4,6-tribromophenol; Br₂ in CS₂ at low temperature → mainly p-bromophenol; dilute HNO₃ → o- and p-nitrophenol; picric acid via the disulphonic acid; phthalein test needs a free para H." },
      { name: "Ethers: Williamson and cleavage", description: "Alkoxide or phenoxide + CH₃ or 1° halide; HI attacks the smaller group, a 3° group leaves as the cation; ArOR + HI → ArOH + RI, never ArI." },
    ],
    traps: [
      { name: "Ortho-nitrophenol as the strongest", description: "Its internal hydrogen bond holds the proton back, so p-nitrophenol is slightly stronger. m-Nitrophenol is the weakest of the three." },
      { name: "Reimer–Tiemann and Kolbe swapped", description: "CHCl₃ with NaOH puts CHO on the ring (salicylaldehyde, ortho major); CO₂ with sodium phenoxide puts COOH there (salicylic acid). The swap is the usual wrong pair in a match list." },
      { name: "The solvent in phenol bromination", description: "Water gives the tribromo product at once; CS₂ or CHCl₃ at low temperature gives mainly p-bromophenol. No FeBr₃ is needed in either case." },
      { name: "The wrong half of an ether", description: "With a methyl or primary partner iodide ends on the smaller group; with a tertiary partner it ends on the tertiary carbon. An aryl ether always gives the phenol and the alkyl iodide." },
      { name: "Benzyl alcohol treated as a phenol", description: "C₆H₅CH₂OH has its OH on a CH₂, so it gives no salt with NaOH and no FeCl₃ colour. Count it with the alcohols in a screen." },
    ],
    relatedSlugs: ["organic-basic-principles", "haloalkanes-and-haloarenes", "aldehydes-ketones-and-carboxylic-acids"],
  },

  "aldehydes-ketones-and-carboxylic-acids": {
    slug: "aldehydes-ketones-and-carboxylic-acids",
    trigger: "A C=O compound meets a reagent in a short scheme, or a list is ranked by carbonyl reactivity, α-H acidity or acid strength.",
    story: [
      "Almost every question is a short reaction scheme: a starting compound, one or more reagents, and a product to name or pick. The work is knowing exactly how far each reagent goes, which carbon a nucleophile or a base attacks, and which group a test detects.",
      "Reagent reach decides most marks. PCC stops at the aldehyde, the Jones reagent goes on to the acid; NaBH₄ reduces only aldehydes and ketones, LiAlH₄ almost everything; Clemmensen and Wolff–Kishner go all the way to CH₂. Carbon counts matter too: CO₂ on a Grignard adds one carbon, the haloform reaction removes one.",
      "Rankings come often, of carbonyl reactivity, α-hydrogen acidity and acid strength, and each ranks by one effect at a time. The numeric answers are counts, such as how many compounds give the iodoform or Tollens' test, and small mole calculations on the same reactions.",
    ],
    subSkills: [
      { name: "Preparing aldehydes and ketones", description: "Rosenmund (RCOCl, H₂, Pd/BaSO₄), Stephen (RCN, SnCl₂/HCl, then H₃O⁺), Etard (CrO₂Cl₂ on toluene), Gattermann–Koch (CO, HCl, AlCl₃); PCC and DIBAL-H stop at the aldehyde." },
      { name: "Nucleophilic addition and derivatives", description: "HCHO > RCHO > R₂CO > aryl ketones; HCN gives a racemic cyanohydrin; acetals are stable to base; H₂N–Z gives C=N–Z at pH about 4 to 5; semicarbazide bonds through its NH-side NH₂." },
      { name: "Grignard reagents", description: "HCHO → 1°, RCHO → 2°, ketone → 3° alcohol; an ester takes two equivalents; a nitrile gives a ketone after hydrolysis; CO₂ gives an acid one carbon longer; each acidic H uses one more equivalent." },
      { name: "Reductions", description: "Clemmensen (Zn–Hg, conc. HCl) and Wolff–Kishner (N₂H₄, KOH, glycol) give CH₂; NaBH₄ leaves esters and acids; LiAlH₄ reduces amides and nitriles to amines; DIBAL-H must be cold." },
      { name: "Oxidation and identification tests", description: "Tollens' for any aldehyde, Fehling's for aliphatic aldehydes only; 2,4-DNP for any aldehyde or ketone; iodoform for CH₃CO– or CH₃CH(OH)– joined to H or C." },
      { name: "Enols and self-aldol", description: "α-H between two C=O is most acidic; the α-carbon of one molecule joins the C=O carbon of the other; a 1,4-diketone closes a five-membered ring, a 1,5-diketone a six." },
      { name: "Crossed aldol and Cannizzaro", description: "Two enolisable aldehydes give four products, one non-enolisable partner gives two; Claisen–Schmidt gives chalcone; concentrated alkali on an aldehyde with no α-H gives acid salt + alcohol." },
      { name: "Carboxylic acids", description: "−I groups strengthen, closer and more of them strengthen more; HCOOH > CH₃COOH; derivative reactivity RCOCl > anhydride > ester > amide; HVZ halogenates the α-carbon; soda lime removes one carbon." },
    ],
    traps: [
      { name: "Fehling's counted like Tollens'", description: "Aromatic aldehydes give a silver mirror but no red Cu₂O. An α-hydroxy ketone passes both tests although it is a ketone, so count the test, not the class name." },
      { name: "CH₃CO joined to oxygen", description: "Acetic acid, its esters and amides contain CH₃CO yet give no iodoform. Ethanol and ethanal are the only positives in their classes; methanol and methanal are negative." },
      { name: "The reduction that stops at the alcohol", description: "Clemmensen and Wolff–Kishner give CH₂, never CHOH. Choose between them by what else survives: acid dehydrates a 3° alcohol, hot base removes a chlorine." },
      { name: "Enolate and acceptor swapped", description: "In a crossed aldol the enolate gives the α-carbon and the acceptor gives the carbon that ends up double-bonded to it. A partner with no α-H, such as benzaldehyde or methanal, is never the enolate." },
      { name: "Dilute base for Cannizzaro", description: "Dilute base with an enolisable aldehyde gives an aldol. Cannizzaro needs concentrated alkali and no α-hydrogen, and the hydride moves from carbon, so in D₂O the CH₂ of the alcohol carries no D." },
    ],
    relatedSlugs: ["organic-basic-principles", "alcohols-phenols-and-ethers", "amines"],
  },

  amines: {
    slug: "amines",
    trigger: "A nitrogen base is ranked by basicity, made or degraded, tested by carbylamine or Hinsberg, or turned into a diazonium salt or an azo dye.",
    story: [
      "Everything turns on one lone pair: how freely it takes a proton, how strongly it activates a benzene ring, and what becomes of the nitrogen once it is a diazonium ion. Basicity orders, ring substitution on aniline and the diazonium replacements all follow from that.",
      "Multistep sequences are common, so learn each reagent with the carbon count and ring position it leaves behind. Hofmann bromamide removes a carbon, reduction of a nitrile from RX + KCN adds one, Gabriel gives only primary alkyl amines.",
      "The numbers are short stoichiometry: grams of acetanilide or dye from a mass of aniline, litres of N₂ from an aliphatic amine and nitrous acid, the nitrogen content of a product, or how many amines in a list pass a test. One mole of amine gives one mole of each product, so the work is the molar masses.",
    ],
    subSkills: [
      { name: "Basicity", description: "In water: (CH₃)₂NH > CH₃NH₂ > (CH₃)₃N > NH₃ but (C₂H₅)₂NH > (C₂H₅)₃N > C₂H₅NH₂ > NH₃; aniline is weak, benzylamine aliphatic-strength; amides and pyrrole barely basic." },
      { name: "Preparation", description: "Sn/HCl or Fe/HCl on ArNO₂; LiAlH₄ on RCN or RCONH₂ keeps every carbon; ammonolysis gives a mixture unless NH₃ is in excess; Gabriel gives pure 1° alkyl amines, never aryl." },
      { name: "Hofmann bromamide degradation", description: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃, through an isocyanate; one carbon shorter; aryl groups migrate too; ring positions are kept." },
      { name: "Acylation, nitrous acid and Hofmann elimination", description: "Acetylation adds 42 g/mol per acetylated N; 1° aliphatic amine + HNO₂ → alcohol + N₂; quaternary hydroxide on heating gives the less substituted alkene." },
      { name: "Carbylamine and Hinsberg tests", description: "CHCl₃/alc. KOH gives an isocyanide from any 1° amine; C₆H₅SO₂Cl: 1° product dissolves in alkali, 2° precipitates, 3° does not react." },
      { name: "Ring substitution on aniline", description: "Bromine water → 2,4,6-tribromoaniline; acetylate first for one Br; direct nitration gives much meta via the anilinium ion; Friedel–Crafts fails; heating with H₂SO₄ → sulphanilic acid." },
      { name: "Diazonium salts and replacements", description: "ArNH₂ + NaNO₂/HCl at 273–278 K; CuCl, CuBr, CuCN (Sandmeyer); KI → ArI; HBF₄ then heat → ArF; warm water → phenol; H₃PO₂ or ethanol → ArH." },
      { name: "Coupling and azo dyes", description: "Phenol in mild alkali → orange 4-hydroxyazobenzene; aniline in mild acid → aniline yellow; β-naphthol → orange-red dye; attack para to OH or NH₂; moles of dye = moles of diazonium salt." },
    ],
    traps: [
      { name: "Tertiary as the strongest base in water", description: "Tertiary wins only in the gas phase. In water solvation and crowding pull it back, and the methyl and ethyl series give different orders." },
      { name: "Benzamide to benzylamine", description: "Hofmann bromamide removes the carbonyl carbon: C₆H₅CONH₂ gives aniline. Benzylamine comes from LiAlH₄ on the same amide." },
      { name: "NH₂ called a meta director", description: "The amino group directs ortho-para. The meta nitroaniline from direct nitration comes from the anilinium ion formed in the acid." },
      { name: "Benzylamine treated as aryl", description: "Its nitrogen is on a CH₂, so it is strongly basic, gives N₂ and benzyl alcohol with nitrous acid, and forms no stable diazonium salt or azo dye." },
      { name: "Fluoro- and iodoarenes from copper", description: "Copper(I) salts deliver Cl, Br and CN only. Iodobenzene comes from KI, fluorobenzene from the fluoroborate on heating, and ethanol on a diazonium salt gives benzene, not an ether." },
    ],
    relatedSlugs: ["organic-basic-principles", "aldehydes-ketones-and-carboxylic-acids", "biomolecules"],
  },
};
