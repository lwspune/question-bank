/**
 * Deep-dives for the seven STRUCTURE-AND-RECALL playbooks of /guide/jee-mains-chemistry: Organic
 * Chemistry - Some Basic Principles and Techniques, Classification of Elements and Periodicity,
 * Chemical Bonding and Molecular Structure, The p-Block Elements, The d- and f-Block Elements,
 * Coordination Compounds and Biomolecules. Facts, orders and traps follow the chapter notes in
 * src/app/notes/jee-mains-chemistry/<slug>/_data/; subSkills follow those pages' order. Prose
 * carries no bank figures — the pages print counts and rates from the generated matrix.
 */
import type { PlaybookDetail } from "./types";

export const PLAYBOOK_DETAILS_C: Record<string, PlaybookDetail> = {
  "organic-basic-principles": {
    slug: "organic-basic-principles",
    trigger:
      "A compound to name, isomers or stereoisomers to count, species to rank by electron shifts, or a lab method: a purification, a chromatogram, a sodium-fusion test or an element's percentage.",
    story: [
      "The chapter has two halves. The first is how organic molecules are built: IUPAC names, structural and stereo isomers, the four electronic effects, and the stability of carbocations, radicals and carbanions. Each question there turns on one rule applied in the right order: seniority before numbering, numbering before alphabetical order, resonance before hyperconjugation.",
      "The second half is laboratory method: which distillation suits a mixture, what Rf and the order of elution mean, what colour each sodium-fusion test gives, and the percentage of N, C, H, a halogen, S or P from a mass or a gas volume. Most numeric answers sit here, and the marks go to arithmetic done without a slip: the factor 2 for H₂SO₄ in Kjeldahl, 2/18 for hydrogen, 62/222 for phosphorus.",
      "The counting questions (isomers, stereoisomers, chiral compounds in a list, hyperconjugating hydrogens) have no options to check against, and one missed meso form or one chain counted twice costs −1. Write every structure out in full before counting.",
    ],
    subSkills: [
      { name: "Naming and counting bonds", description: "Seniority COOH > SO₃H > COOR > COCl > CONH₂ > CN > CHO > C=O > OH > NH₂; principal group, then multiple bonds, then prefixes take the lowest locants; prefixes go alphabetically, with di- and tri- ignored." },
      { name: "Structural isomers", description: "Name what changed: skeleton (chain), position, functional group, the alkyls around one group (metamerism), or a ring for a double bond. Build counts from the degree of unsaturation, longest chain first." },
      { name: "Stereoisomers and conformations", description: "cis–trans needs two different groups on each C=C carbon; a chiral carbon has four different groups, D counting apart from H; at most 2ⁿ stereoisomers, fewer when a meso form exists; staggered ethane is the stable rotamer." },
      { name: "Electronic effects and acidity", description: "Inductive, resonance and hyperconjugation are permanent, the electromeric effect temporary; rank resonance structures by full octets, no charge separation and negative charge on the electronegative atom; a more stable conjugate base means a stronger acid." },
      { name: "Intermediates and reagents", description: "Carbocations 3° > 2° > 1° > CH₃⁺, with benzylic, allylic and tropylium above; carbanions run the other way; hydride affinity is the reverse of cation stability; 1,2-shifts and ring expansion move the charge." },
      { name: "Purification and chromatography", description: "Simple, fractional, reduced-pressure or steam distillation by boiling-point gap and stability; sublimation, crystallisation and acid–base extraction. Rf is measured from the base line; on silica a more polar compound has a lower Rf and elutes later." },
      { name: "Lassaigne's test and nitrogen", description: "Sodium fusion gives NaCN (only if carbon is present), Na₂S and NaX; boil with HNO₃ before AgNO₃. Dumas collects N₂ (subtract the aqueous tension; 28 g per 22 400 mL); Kjeldahl traps NH₃ in acid and fails for nitro, azo and ring nitrogen." },
      { name: "Estimating C, H, halogens, S and P", description: "C is 12/44 of CO₂, H is 2/18 of water, O by difference; Carius gives AgCl, AgBr or AgI (143.5, 188, 235), BaSO₄ (32/233) and Mg₂P₂O₇ (62/222)." },
    ],
    traps: [
      { name: "The dibasic Kjeldahl acid", description: "One H₂SO₄ neutralises two NH₃. Dropping the factor of 2 gives exactly half the percentage, and that value is always an option." },
      { name: "Hydride affinity read as stability", description: "A more stable carbocation has the LOWER hydride affinity. Options print the stability order and its reverse; pick by what is asked." },
      { name: "Prefixes in locant order", description: "The name is 3-ethyl-1,1-dimethylcyclohexane, not 1,1-dimethyl-3-ethyl: prefixes go alphabetically and di- is ignored. The wrong option obeys every other rule." },
      { name: "2ⁿ without the meso check", description: "Tartaric acid has two chiral centres but three stereoisomers. Look for identical halves before writing 2ⁿ, and count a stereogenic C=C as a unit too." },
      { name: "The paper as the stationary phase", description: "In paper chromatography the stationary phase is the water held in the pores, and the method is partition. TLC and column chromatography work by adsorption." },
    ],
    relatedSlugs: ["hydrocarbons", "chemical-bonding", "some-basic-concepts"],
  },

  periodicity: {
    slug: "periodicity",
    trigger:
      "Elements or ions to rank by radius, ionization enthalpy, electron gain enthalpy or electronegativity; an element to place from Z or a configuration; or oxides to class as acidic, basic, amphoteric or neutral.",
    story: [
      "Almost every question is an order to check or a pair of statements to judge. Each trend takes a line to state: radius falls across a period and rises down a group; ionization enthalpy and electronegativity do the reverse. The marks sit on the exceptions, not on the arrows.",
      "The exceptions are few and fixed: B below Be and O below N for ionization enthalpy, Ga level with Al and Pb above Sn, Cl more negative than F and O least negative in group 16, neon the most positive noble gas. The smooth order is always among the options, and it is always wrong where an exception applies.",
      "Read every order twice: once for direction (signed values against magnitudes, for electron gain enthalpy) and once pair by pair. A two-statement question can pair a true trend with a false reason, so judge each part alone. The few numeric answers count isoelectronic species, or oxides of one kind, in a list.",
    ],
    subSkills: [
      { name: "Position from Z", description: "Period = highest n; block = subshell of the last electron; an element above Z = 100 is named by digit roots (nil, un, bi, tri…) plus -ium; recover Z from an ion as electrons + charge." },
      { name: "Atomic and ionic radii", description: "A cation is smaller and an anion larger than its atom; isoelectronic ions shrink as Z rises: N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺; covalent radius is half the bond length." },
      { name: "Ionization enthalpy", description: "Period 2 runs Li < B < Be < C < O < N < F < Ne; group 13 gives B > Tl > Ga > Al > In and group 14 C > Si > Ge > Pb > Sn; a large jump after k electrons means k valence electrons." },
      { name: "Electron gain enthalpy", description: "Positive for the noble gases (neon most), Be and N; by magnitude Cl > F > Br > I and S > Se > Te > Po > O; electron affinity carries the opposite sign." },
      { name: "Electronegativity and metallic character", description: "F 4.0, O 3.5, Mg below Al; metallic character rises down a group and falls across a period; metalloids B, Si, Ge, As, Sb, Te; diagonal pairs Li–Mg, Be–Al, B–Si." },
      { name: "Nature of oxides", description: "Basic to amphoteric to acidic across a period; the neutral oxides are only CO, NO and N₂O; Al₂O₃, BeO, ZnO, SnO, PbO and the tin and lead dioxides are amphoteric; a higher oxidation state gives a more acidic oxide." },
    ],
    traps: [
      { name: "The smooth period order", description: "Li < Be < B < C < N < O < F misses both dips. The true order swaps B with Be and O with N." },
      { name: "Fluorine taken as most negative", description: "Chlorine has the most negative electron gain enthalpy; fluorine is second, because its small 2p shell repels the added electron. Oxygen is the least negative in group 16." },
      { name: "Signed values against magnitudes", description: "S > Se > Te > O is right by magnitude and wrong on signed values. When two options are exact reverses, decide which reading the question uses." },
      { name: "A blind fall down groups 13 and 14", description: "Ga's ionization enthalpy is just above Al's and Pb's above Sn's, from poor d and f shielding. Ga is also smaller than Al." },
      { name: "One oxide's nature carried to another", description: "CO, NO and N₂O are neutral, not acidic or amphoteric, while CO₂ and NO₂ are acidic. Sort each oxide of an element on its own." },
    ],
    relatedSlugs: ["structure-of-atom", "chemical-bonding", "p-block-elements"],
  },

  "chemical-bonding": {
    slug: "chemical-bonding",
    trigger:
      "A list of molecules or ions to sort by shape, hybridisation, lone pairs, bond order, polarity or magnetism, or two species to compare by bond length, bond angle or dipole moment.",
    story: [
      "Most numeric answers here are counts from a list: how many species are linear, polar or paramagnetic, how many lone pairs sit on a central atom, how many σ and π bonds a chain holds. Each count rests on one routine (steric number, AXE type, MO filling) done the same way for every species. One slip in one species changes the count, and there are no options to catch it.",
      "The rest is orders and exceptions to know by heart: NH₃ more polar than NF₃, BF₃ the weakest boron halide acid, O₂⁺ and O₂⁻ with one unpaired electron each, C≡N shorter than C=O, the axial bonds of PCl₅ longer than the equatorial ones. Options often hold the arrangement of electron pairs as a decoy for the shape, or a σ-only count where π pairs are meant.",
      "Molecular orbital theory is the largest single block: bond order ½(Nb − Na) and unpaired electrons from the filling order, with σ2p dropping below π2p from O₂ onwards. Isoelectronic species share a bond order, so learn the ladder from 13 to 18 electrons once.",
    ],
    subSkills: [
      { name: "Lewis structures and formal charge", description: "Lone pairs = (valence electrons − 2 × bonds)/2, with the charge included; FC = V − L − ½S; octet exceptions are incomplete (BF₃), odd-electron (NO, NO₂, ClO₂) and expanded (PCl₅, SF₆, H₂SO₄)." },
      { name: "Ionic bonding and Fajans' rules", description: "Born–Haber uses half the X–X bond enthalpy; covalent character rises with a smaller or higher-charged cation, a larger anion, and an 18-electron cation (CuCl > NaCl)." },
      { name: "Bond length, angle and resonance", description: "An equivalent bond's order = bonds shared ÷ positions (CO₃²⁻ 4/3, O₃ 1.5); lp–lp > lp–bp > bp–bp closes angles: CH₄ 109.5°, NH₃ 107°, H₂O 104.5°, OF₂ 103°." },
      { name: "VSEPR and lone pairs", description: "SN = ½(V + M − c + a), with oxygen adding nothing; lone pairs go equatorial in a trigonal bipyramid and trans in an octahedron; XeF₂ has three, XeF₄ two, XeF₆ one." },
      { name: "Shapes", description: "Name the shape from the atoms: AX₃E pyramidal, AX₂E₂ bent, AX₄E see-saw, AX₃E₂ T-shaped, AX₂E₃ linear, AX₅E square pyramidal, AX₄E₂ square planar. Put the charge into the count: I₃⁻ is linear, I₃⁺ bent." },
      { name: "Hybridisation and σ and π counts", description: "SN 2 to 7 gives sp to sp³d³; π bonds add no hybrid orbital; σ bonds = atoms − 1 + rings, every C–H included; complexes with strong ligands use dsp² and d²sp³." },
      { name: "Molecular orbital theory", description: "Bond order ½(Nb − Na); σ2p above π2p up to N₂, below it from O₂; O₂, B₂ and N₂²⁻ have two unpaired electrons; N₂, CO, CN⁻ and NO⁺ have bond order 3 and are diamagnetic." },
      { name: "Dipole moment and hydrogen bonding", description: "Symmetric shapes with identical outer atoms are non-polar (CO₂, BF₃, XeF₄, PCl₅); NH₃ 1.47 D beats NF₃ 0.23 D; o-nitrophenol bonds within itself, so it boils lower and is steam volatile." },
    ],
    traps: [
      { name: "The arrangement offered as the shape", description: "NH₃ has a tetrahedral arrangement of pairs but is trigonal pyramidal; XeF₄ is octahedral in pairs and square planar in atoms. The arrangement is a standing distractor." },
      { name: "π bonds counted as hybrid orbitals", description: "SO₃ has three S=O bonds but only three σ bonds, so it is sp², not sp³d². Count σ bonds and lone pairs only." },
      { name: "Electronegativity used for NF₃ and BF₃", description: "F is the most electronegative element, yet NF₃ is far less polar than NH₃ and BF₃ is the weakest boron halide acid. The lone-pair moment and back-bonding decide." },
      { name: "O₂⁺ and O₂⁻ ranked by unpaired electrons", description: "Both have exactly one unpaired electron. Their bond orders differ (2.5 against 1.5); their unpaired counts do not." },
      { name: "Bond length by bond order alone", description: "C≡N (116 pm) is shorter than C=O (122 pm), and C–H (109 pm) is shorter than both. Compare bond orders only between the same pair of atoms." },
    ],
    relatedSlugs: ["coordination-compounds", "p-block-elements", "periodicity"],
  },

  "p-block-elements": {
    slug: "p-block-elements",
    trigger:
      "A statement about a group 13 to 18 element or compound: a trend and its exception, an oxoacid's structure or basicity, an oxide's nature, an interhalogen or xenon fluoride shape, or a salt-analysis test.",
    story: [
      "Nearly every question is multiple choice, and most are lists of statements where each claim is a trend or one of its exceptions. Check each statement on its own before looking at the options; a statement can name a true fact and attach the wrong reason.",
      "The exceptions repeat across the groups and have three causes. Poor d and f shielding makes Ga smaller than Al and lifts the ionisation enthalpy of Tl and Pb. The inert pair effect makes the lower state more stable down groups 13 to 16, so Tl³⁺ and Pb⁴⁺ oxidise while Sn²⁺ reduces. The small first member of each group has no d orbitals and crowded lone pairs: BF₆³⁻ and NCl₅ do not exist, the N–N and F–F bonds are weak, and Cl, not F, has the most negative electron gain enthalpy.",
      "The few counting questions follow fixed rules. The basicity of a phosphorus oxoacid is its count of P–OH groups. The lone pairs on an interhalogen's centre are (7 − n)/2 and on xenon (8 − n)/2. The π bonds in a sulphur oxoacid equal its S=O count.",
    ],
    subSkills: [
      { name: "Group 13 trends and the inert pair", description: "Radius B < Ga < Al < In < Tl; first ionisation enthalpy lowest at In; +1 grows stable down to Tl, so Tl³⁺ oxidises; TlI₃ is Tl⁺I₃⁻ and GaAlCl₄ is Ga⁺[AlCl₄]⁻." },
      { name: "Boron and aluminium compounds", description: "Borax is Na₂[B₄O₅(OH)₄]·8H₂O; boric acid is a monobasic Lewis acid; diborane has two three-centre two-electron bridges and is not planar; Lewis acidity BF₃ < BCl₃ < BBr₃ < BI₃; boron's covalency stops at four." },
      { name: "Group 14", description: "Carbon forms pπ–pπ bonds and stops at covalency four; [SiF₆]²⁻ exists, [SiCl₆]²⁻ does not; C₆₀ has twenty hexagons and twelve pentagons; Sn²⁺ reduces, Pb⁴⁺ oxidises; PbCrO₄ dissolves in NaOH as Na₂[Pb(OH)₄]." },
      { name: "Group 15 and its hydrides", description: "N–N is weaker but shorter than P–P; +5 grows less stable down the group; from NH₃ to BiH₃ stability and basicity fall and reducing power rises; boiling point PH₃ < AsH₃ < NH₃ < SbH₃." },
      { name: "Nitrogen and its oxides", description: "N₂O and NO are neutral, the rest acidic; N₂O, N₂O₃ and N₂O₄ have an N–N bond, N₂O₅ an oxygen bridge; NO₂ is the odd-electron oxide; the brown ring holds NO; Ostwald oxidises NH₃ to NO." },
      { name: "Phosphorus and its oxoacids", description: "Basicity = P–OH groups (H₃PO₂ one, H₃PO₃ two, H₃PO₄ three); any P–H bond makes the acid a reductant; P₄ with hot NaOH gives PH₃ and NaH₂PO₂; H₄P₂O₇ has one P–O–P bridge." },
      { name: "Group 16 and sulphur", description: "Oxygen shows −2, −1, +1 and +2; the hydrides grow more acidic and more reducing from H₂O to H₂Te; H₂S₂O₇ has an S–O–S bridge and H₂S₂O₈ a peroxo link, both at +6; I₂ stops thiosulphate at tetrathionate, Br₂ takes it to sulphate." },
      { name: "Halogens, interhalogens and xenon", description: "Bond enthalpy Cl₂ > Br₂ > F₂ > I₂; HF boils highest, HI melts highest; cold dilute alkali gives ClO⁻, hot concentrated ClO₃⁻; XX′₃ is T-shaped, XX′₅ square pyramidal; XeF₂ linear, XeF₄ square planar." },
    ],
    traps: [
      { name: "The smooth group order", description: "B < Al < Ga < In < Tl for atomic radius is wrong, because Ga is smaller than Al. A steady boiling-point rise from NH₃ is wrong too: PH₃ boils lowest." },
      { name: "Back-bonding read as acid strength", description: "Back-bonding is strongest in BF₃, and that is what makes BF₃ the weakest Lewis acid of the boron trihalides, not the strongest." },
      { name: "P–H hydrogens counted as acidic", description: "H₃PO₃ is dibasic and H₃PO₂ monobasic, because a hydrogen on phosphorus never ionises. H₃PO₂ with NaOH gives NaH₂PO₂." },
      { name: "Oxo and peroxo bridges swapped", description: "Oleum, H₂S₂O₇, has S–O–S; Marshall's acid, H₂S₂O₈, has O–O. N₂O₄ has an N–N bond and no bridging oxygen; N₂O₅ has the bridge." },
      { name: "Bonds counted as oxidation state", description: "Boron makes four bonds in [BF₄]⁻ but is +3; sulphur in H₂S₂O₈ is +6, because the two peroxo oxygens are −1. Balance the charge, do not count the bonds." },
    ],
    relatedSlugs: ["periodicity", "chemical-bonding", "d-and-f-block-elements"],
  },

  "d-and-f-block-elements": {
    slug: "d-and-f-block-elements",
    trigger:
      "A 3d, 4f or 5f ion's configuration, oxidation state, colour or magnetic moment; an E° clue to an oxidant or reductant; permanganate, dichromate or a transition-metal oxide; or a salt-analysis test for a cation.",
    story: [
      "A large share of the numeric answers are spin-only moments. Find the ion the clue points to, take its 4s electrons off first, count the unpaired d or f electrons, and use √(n(n+2)) BM. The same count decides colour: d⁰ and d¹⁰ ions are colourless and diamagnetic, and permanganate and dichromate owe their colour to charge transfer instead.",
      "The rest is recall with a few rules behind it. A higher oxidation state makes an oxide more acidic and more covalent. Down a d-block group the higher state grows more stable, the opposite of the p-block. The medium decides permanganate's product: Mn²⁺ in acid (five electrons), MnO₂ in neutral or faintly alkaline solution (three). Chromium stays +6 from chromate through dichromate to CrO₂Cl₂ and CrO₅.",
      "The lanthanoids reduce to one count: Ln³⁺ is 4fⁿ with n = Z − 57, so the +4 ions near 4f⁰ or 4f⁷ (Ce, Tb) oxidise and the +2 ions (Eu, Yb) reduce. Qualitative analysis is three tables (group reagents, confirmatory colours, borax beads), where one swapped pair costs the mark.",
    ],
    subSkills: [
      { name: "Configurations and general properties", description: "Cr is 3d⁵4s¹ and Cu 3d¹⁰4s¹; ions lose 4s first; Cr's second ionisation enthalpy beats Mn's but its third does not; atomisation enthalpy peaks at V, dips at Mn and is lowest at Zn." },
      { name: "Oxidation states and E°", description: "Mn shows +2 to +7 and Sc only +3; oxygen holds higher states than fluorine; Cu has the only positive M²⁺/M value; Mn³⁺ and Co³⁺ oxidise, Cr²⁺ reduces; Cu⁺ disproportionates in water." },
      { name: "Magnetic moment and colour", description: "μ = √(n(n+2)) BM gives 1.73, 2.83, 3.87, 4.90, 5.92 for n = 1 to 5; past d⁵ use n = 10 − x; d⁰ and d¹⁰ are colourless; V²⁺, Cr³⁺ and Mn³⁺ are all violet." },
      { name: "Transition-metal oxides", description: "Higher state, more acidic: CrO basic, Cr₂O₃ amphoteric, CrO₃ acidic; V₂O₅ amphoteric; Mn₂O₇ is two corner-sharing tetrahedra, covalent, with no Mn–Mn bond; Fe₃O₄ and Mn₃O₄ are mixed oxides." },
      { name: "Dichromate and chromium", description: "Chromite to Na₂CrO₄ to K₂Cr₂O₇; chromate against dichromate is a pH change at +6; acidified dichromate takes six electrons; the CrO₂Cl₂ test for chloride ends in blue CrO₅, +6 with two peroxo groups." },
      { name: "Permanganate and manganese", description: "MnO₂ fused with KOH gives green K₂MnO₄ (+6, d¹, 1.73 BM), which disproportionates to MnO₄⁻ and MnO₂; acid permanganate takes five electrons, neutral three; titrate in H₂SO₄, never HCl." },
      { name: "Lanthanoids and actinoids", description: "Ln³⁺ is 4fⁿ with n = Z − 57; Ce⁴⁺ and Tb⁴⁺ oxidise, Eu²⁺ and Yb²⁺ reduce; Gd³⁺ gives 7.94 BM; actinoids use 5f in bonding, show more states and a larger contraction; Cm has eight unpaired electrons." },
      { name: "Qualitative analysis", description: "Group reagents run from dilute HCl to (NH₄)₂CO₃; ferrocyanide gives chocolate-brown with Cu²⁺ and Prussian blue with Fe³⁺; dmg gives red with Ni²⁺; Nessler's gives brown with NH₄⁺; iron in the brown ring is +1." },
    ],
    traps: [
      { name: "3d emptied before 4s", description: "Mn²⁺ is 3d⁵ with 5.92 BM. Writing it as 3d³4s² gives 3.87 BM, and that value is usually an option." },
      { name: "Colour taken for paramagnetism", description: "Permanganate is deep purple, but Mn(VII) is d⁰ and diamagnetic. Dichromate and chromate are the same: coloured by charge transfer." },
      { name: "Manganate and permanganate swapped", description: "MnO₄²⁻ is green, +6 and paramagnetic; MnO₄⁻ is purple, +7 and diamagnetic. Peroxodisulphate takes Mn²⁺ all the way to permanganate." },
      { name: "Peroxo oxygens counted as −2", description: "CrO₅ is +6, not +10, and chromate to dichromate is not a redox change. Give every peroxo oxygen −1." },
      { name: "The p-block trend carried over", description: "Down a d-block group the higher state grows more stable, so Cr(VI) is less stable than Mo(VI), and CrO₃ is the strongest oxidant of the three trioxides." },
    ],
    relatedSlugs: ["coordination-compounds", "electrochemistry", "p-block-elements"],
  },

  "coordination-compounds": {
    slug: "coordination-compounds",
    trigger:
      "A complex in square brackets: the ions outside the bracket, its name, isomers, hybridisation, d configuration, spin-only moment, CFSE, the wavelength it absorbs, or its use.",
    story: [
      "Most questions run one routine: find the metal's oxidation state and d count, decide whether the ligand is strong or weak field, then read off what is asked: a hybridisation, the unpaired electrons, a spin-only moment, a CFSE or the wavelength absorbed. Learn it on cobalt, iron and nickel complexes and it covers the bulk of the chapter.",
      "The numeric answers are counts with no slack: moles of AgCl from the chlorides outside the bracket, the stereoisomers of a formula type, the paramagnetic species in a list, a moment in the units the stem names. Count species, not electrons, and check whether the question wants electrons, pairs or unpaired electrons.",
      "The recall half is exact: the NCERT spectrochemical series in order, which formula types allow cis–trans or fac–mer forms and which are chiral, and the named complexes (Ni(dmgH)₂, Wilkinson's catalyst, cisplatin, chlorophyll) with the metal each holds. A few keys follow a textbook rule even where measured data disagree; on the paper, answer by the rule.",
    ],
    subSkills: [
      { name: "Werner's theory", description: "Only ions outside the bracket ionise: [Co(NH₃)₄Cl₂]Cl gives one AgCl; primary valency is the oxidation state, secondary valency the coordination number; a double salt gives all its simple ions." },
      { name: "Ligands and naming", description: "Ambidentate ligands (NO₂⁻, SCN⁻, CN⁻) bind through one of two atoms; chelating ones (en, C₂O₄²⁻, EDTA⁴⁻) through several at once; ligands go alphabetically, an anionic complex ends in -ate, the oxidation state in Roman numerals." },
      { name: "Isomerism", description: "Linkage, ionisation, coordination (two different metals) and solvate isomers; square planar MA₂B₂ and octahedral MA₄B₂ and MA₃B₃ have two geometrical forms; M(AA)₃ is chiral; stereoisomers = achiral forms + twice the chiral ones." },
      { name: "Valence bond theory", description: "A strong field pairs electrons: d²sp³, inner orbital, low spin; a weak field gives sp³d², high spin; [Ni(CN)₄]²⁻ is dsp² square planar, [NiCl₄]²⁻ and Ni(CO)₄ sp³ tetrahedral; octahedral Ni²⁺ is always sp³d²." },
      { name: "Crystal field splitting and colour", description: "Octahedral eg +0.6Δₒ, t₂g −0.4Δₒ; tetrahedral inverted, with Δₜ = 4/9 Δₒ; I⁻ < Br⁻ < SCN⁻ < Cl⁻ < S²⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < CN⁻ < CO; a stronger field absorbs a shorter wavelength." },
      { name: "High and low spin and CFSE", description: "The choice exists only for d⁴ to d⁷; CFSE = (−0.4 × t₂g electrons + 0.6 × eg electrons)Δₒ, largest for low-spin d⁶ (−2.4Δₒ) and zero for high-spin d⁵; a tetrahedron fills e before t₂ and is always high spin." },
      { name: "Spin-only moment", description: "μ = √(n(n+2)) BM; low-spin d⁶ ([Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺), square planar d⁸ and d¹⁰ are diamagnetic; [Fe(CN)₆]³⁻ has one unpaired electron; Cu⁺ is diamagnetic, Cu²⁺ gives 1.73 BM." },
      { name: "Carbonyls, stability and uses", description: "CO σ-donates and π-accepts, so M–C strengthens and C–O weakens; Mn₂(CO)₁₀ has no bridging CO, Co₂(CO)₈ two; chelation raises stability; chlorophyll Mg, haemoglobin Fe, vitamin B₁₂ Co, cisplatin Pt, Wilkinson's Rh." },
    ],
    traps: [
      { name: "Chloride inside the bracket counted", description: "In [Cr(H₂O)₄Cl₂]Cl only one of the three chlorides reaches the silver ion. The tripled count is always an option." },
      { name: "Low-spin d⁶ counted as paramagnetic", description: "[Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺ and [Co(C₂O₄)₃]³⁻ have every electron paired in t₂g. They are the commonest slip in a paramagnetic count." },
      { name: "The octahedral order in a tetrahedron", description: "In a tetrahedron e lies below t₂ and Δₜ = 4/9 Δₒ. Writing t₂ first, or giving a tetrahedral CFSE in Δₒ, gets the answer wrong." },
      { name: "Splitting, CFSE and wavelength mixed", description: "Δₒ is the gap the absorbed light matches; CFSE is that gap times a d-count factor. A stronger ligand gives a larger gap and a SHORTER absorbed wavelength." },
      { name: "Geometrical and stereo counts merged", description: "[Co(en)₂Cl₂]⁺ has two geometrical isomers but three stereoisomers, because the cis form is chiral. Tetrahedral complexes have no cis–trans forms at all." },
    ],
    relatedSlugs: ["d-and-f-block-elements", "chemical-bonding", "equilibrium"],
  },

  biomolecules: {
    slug: "biomolecules",
    trigger:
      "A sugar, its linkage or whether it reduces Tollens' reagent; an amino acid, its code or class; a peptide to count or read; a level of protein structure; an enzyme, a vitamin or a nucleic-acid base.",
    story: [
      "It is a recall chapter. Most questions name a sugar, an amino acid, an enzyme or a vitamin and ask for one exact fact about it, often as a match-the-list where one swapped pair costs the mark. Learn the tables as pairs: sugar and linkage, amino acid and code, vitamin and deficiency disease.",
      "The reasoning that remains is short and repeatable: read D or L from the last stereocentre of a Fischer projection, decide whether any anomeric carbon is still free, count peptide bonds (n − 1) and sequences (n! or kⁿ), and count the hydrogen bonds of DNA from one strand (two per A–T, three per G–C). This is where the numeric answers sit.",
      "Carbohydrates, amino acids and proteins carry most of the chapter. NCERT's text is the reference; a few keys rest on facts outside it, such as the named colour tests from the practical manual, so learn those as stated.",
    ],
    subSkills: [
      { name: "Classes and glucose reactions", description: "Every monosaccharide reduces Tollens' reagent, fructose included; HI gives n-hexane, bromine water gluconic acid, nitric acid saccharic acid, acetic anhydride a pentaacetate (five OH groups)." },
      { name: "D/L, rings and anomers", description: "D or L from the OH on the last stereocentre, not from the sign of rotation; glucose is a pyranose, fructose a furanose; α and β differ at C-1 (anomers), glucose and galactose at C-4 (epimers)." },
      { name: "Disaccharides and reducing sugars", description: "Sucrose α1–β2 is non-reducing; maltose α1–4 and lactose β1–4 reduce; invert sugar is laevorotatory because of fructose; amylose is soluble, amylopectin and glycogen branch at C-6, cellulose is β1–4." },
      { name: "Amino acids", description: "Ten essential: V, L, I, R, K, T, M, F, W, H; D aspartic acid, E glutamic acid, N asparagine, Q glutamine; dipolar ions are high-melting and water-soluble; all but glycine are chiral, threonine and isoleucine with two centres." },
      { name: "Peptides and protein structure", description: "n residues hold n − 1 peptide bonds; read from the free NH₂ end; the biuret test needs two peptide bonds; the primary structure is covalent, the rest held by hydrogen bonds, so denaturation keeps the sequence." },
      { name: "Enzymes and vitamins", description: "Invertase, zymase, diastase (starch to maltose), maltase, urease; A, D, E, K and B₁₂ are stored; B₁ beri-beri, B₂ cheilosis, B₆ convulsions, B₁₂ pernicious anaemia, C scurvy, D rickets, K a longer clotting time." },
      { name: "Nucleic acids", description: "DNA: β-D-2-deoxyribose with A, G, C, T; RNA: β-D-ribose with A, G, C, U; the base sits on C-1′, phosphodiester links join C-5′ to C-3′; A–T has two hydrogen bonds, G–C three." },
    ],
    traps: [
      { name: "Sucrose called reducing, maltose not", description: "Sucrose uses both anomeric carbons, so it is non-reducing. Maltose leaves one C-1 free, so it reduces." },
      { name: "D and L read as + and −", description: "D-glucose is (+) but D-fructose is (−). D or L is structural; the sign comes from a polarimeter." },
      { name: "The Asp, Asn, Glu and Gln codes", description: "Aspartic acid is D, asparagine N, glutamic acid E, glutamine Q. Neither acid gets A, which is alanine." },
      { name: "Denaturation said to break peptide bonds", description: "Heat and pH break hydrogen bonds; the primary sequence survives. Quaternary structure is the packing of subunits, not the fold of one chain." },
      { name: "Both DNA strands counted", description: "Each base of the given strand already stands for one pair. Counting the complementary strand too doubles the hydrogen-bond total." },
    ],
    relatedSlugs: ["alcohols-phenols-and-ethers", "aldehydes-ketones-and-carboxylic-acids", "amines"],
  },
};
