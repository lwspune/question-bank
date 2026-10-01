/**
 * /guide/jee-mains-chemistry/reference, part B: the STRUCTURE-AND-RECALL chapters. Each group is a
 * flat list of the orders, rules, colours, tests and fact tables the paper asks for exactly.
 *
 * Source of truth: each chapter's /notes/jee-mains-chemistry/<slug>/_data pages, which were checked
 * against NCERT and the past questions. Entries follow the notes pages' order within a group.
 *
 * PLAIN TEXT + UNICODE, NOT LaTeX: the shared FormulaSheet prints `formula` as raw text, and the
 * guide-data test fails on any backslash. No bank figures (counts, shares, years) in `notes`.
 */

import type { ReferenceGroup } from "./types";

export const REFERENCE_GROUPS_B: ReferenceGroup[] = [
  {
    chapter: "Organic Chemistry - Some Basic Principles and Techniques",
    playbookSlug: "organic-basic-principles",
    formulas: [
      {
        id: "seniority",
        name: "Seniority of functional groups",
        formula: "–COOH > –SO₃H > –COOR > –COCl > –CONH₂ > –CN > –CHO > >C=O > –OH > –NH₂ > C=C, C≡C",
        legend: ["The senior group takes the suffix and the lowest locant", "–X, –NO₂ and –OR are always prefixes"],
        notes: "–CHO outranks the ketone, and –CN sits between the amide and the aldehyde.",
      },
      {
        id: "numbering",
        name: "Numbering the parent chain",
        formula: "principal group → multiple bonds → all prefixes (lowest set) → alphabetical order",
        legend: ["Compare locant sets term by term: 2,3,6 beats 2,4,5", "di-, tri-, tetra- are ignored when alphabetising"],
        notes: "An ene–yne tie goes to the double bond; in a ring the OH carbon is C-1.",
      },
      {
        id: "unsaturation",
        name: "Degree of unsaturation",
        formula: "DoU = (2C + 2 + N − H − X) / 2",
        legend: ["Each ring or C=C counts 1, a C≡C 2, a benzene ring 4", "X = halogen atoms, counted like H"],
        notes: "Alkane isomers: C₄H₁₀ 2, C₅H₁₂ 3, C₆H₁₄ 5, C₇H₁₆ 9.",
      },
      {
        id: "stereoisomers",
        name: "Counting stereoisomers",
        formula: "N ≤ 2ⁿ     n = chiral centres + stereogenic C=C bonds",
        legend: ["cis–trans needs abC=Ccd with a ≠ b and c ≠ d", "Chiral carbon: four different groups; D counts as different from H"],
        notes: "Identical halves give a meso form: tartaric acid has 3 stereoisomers, not 4.",
      },
      {
        id: "effects-acidity",
        name: "Electronic effects and acid strength",
        formula: "RSO₃H > RCOOH > phenol > H₂O > ROH > RC≡CH",
        legend: [
          "−I: –NO₂ > –CN > –COOH > –F > –Cl > –Br > –I; alkyl groups are +I",
          "+R: –OH, –OR, –NH₂, –X     −R: –NO₂, –CN, –CHO, –COOH, >C=O",
          "C–H acidity: sp > sp² > sp³",
        ],
        notes: "Conjugate bases run the other way, so RO⁻ is a stronger base than OH⁻.",
      },
      {
        id: "intermediates",
        name: "Stability of reaction intermediates",
        formula: "carbocation and radical: 3° > 2° > 1° > CH₃     carbanion: CH₃⁻ > 1° > 2° > 3°",
        legend: [
          "Carbocation sp², planar, 6 e⁻ · carbanion sp³, pyramidal · radical 7 e⁻",
          "Resonance beats hyperconjugation: Ph₃C⁺ > Ph₂CH⁺ > PhCH₂⁺",
          "Hyperconjugating H = number of α-H (CH₃⁺ has none)",
        ],
        notes: "The more stable the cation, the LOWER its hydride affinity.",
      },
      {
        id: "purification",
        name: "Choosing a purification method",
        formula: "simple: b.p. far apart · fractional: b.p. close · reduced pressure: decomposes at its b.p. · steam: steam volatile, immiscible with water",
        legend: [
          "Sublimation: solid → vapour directly (camphor, naphthalene from NaCl)",
          "o-Nitrophenol is steam volatile (intramolecular H-bond); p-nitrophenol is not",
        ],
        notes: "Glycerol from spent lye: reduced pressure. An azeotrope cannot be split by fractional distillation.",
      },
      {
        id: "rf",
        name: "Retardation factor",
        formula: "Rf = distance moved by the spot / distance moved by the solvent front",
        legend: [
          "Both measured from the base line; Rf < 1, no unit",
          "Column and TLC work by adsorption; paper by partition (water in the pores is the stationary phase)",
        ],
        notes: "More polar on silica → lower Rf → elutes later from a column.",
      },
      {
        id: "lassaigne",
        name: "Lassaigne's test",
        formula: "N: Prussian blue Fe₄[Fe(CN)₆]₃ · S: violet with nitroprusside, black PbS · N + S: blood red [Fe(SCN)]²⁺ · Cl, Br, I: AgCl white, AgBr pale yellow, AgI yellow",
        legend: ["Boil with dilute HNO₃ before adding AgNO₃, never HCl", "P: yellow ammonium phosphomolybdate"],
        notes: "NaCN needs carbon: hydrazine and hydroxylamine give no Prussian blue.",
      },
      {
        id: "estimation",
        name: "Quantitative estimation",
        formula: "Kjeldahl %N = 1.4·M·V·b / m     %C = (12/44)·m(CO₂)/m × 100     %H = (2/18)·m(H₂O)/m × 100     %X = (X/AgX)·m(AgX)/m × 100     %S = (32/233)·m(BaSO₄)/m × 100     %P = (62/222)·m(Mg₂P₂O₇)/m × 100",
        legend: [
          "b = basicity of the acid (2 for H₂SO₄); V in mL, m in g",
          "Dumas: subtract the aqueous tension, reduce to STP, %N = (28/22400)·V(mL)/m × 100",
          "AgCl 143.5, AgBr 188, AgI 235; oxygen by difference",
        ],
        notes: "Kjeldahl fails for nitro, azo and ring nitrogen; Mg₂P₂O₇ carries two P, so 62/222.",
      },
    ],
  },
  {
    chapter: "Classification of Elements and Periodicity",
    playbookSlug: "periodicity",
    formulas: [
      {
        id: "period-lengths",
        name: "Periods and the periodic law",
        formula: "elements per period = 2 × orbitals filled: 2, 8, 8, 18, 18, 32, 32",
        legend: ["Modern law: properties are a periodic function of atomic number (Moseley)", "Mendeleev used atomic weight and predicted eka-aluminium (Ga), eka-silicon (Ge)"],
      },
      {
        id: "iupac-names",
        name: "Names for Z above 100",
        formula: "0 nil · 1 un · 2 bi · 3 tri · 4 quad · 5 pent · 6 hex · 7 sept · 8 oct · 9 enn + ium",
        legend: ["Drop a doubled letter: enn + nil = ennil; bi or tri + ium = bium, trium", "113 to 118: Nh, Fl, Mc, Lv, Ts, Og"],
      },
      {
        id: "placing",
        name: "Placing an element",
        formula: "s: group = ns e⁻ · d: group = (n − 1)d + ns e⁻ · p: group = 10 + ns + np e⁻     Z = e⁻ + q",
        legend: ["Period = highest n; block = subshell of the last electron", "q = charge with its sign: X²⁻ with 10 e⁻ has Z = 8"],
        notes: "Diagonal pairs: Li–Mg, Be–Al, B–Si.",
      },
      {
        id: "radii",
        name: "Atomic and ionic radii",
        formula: "N³⁻ > O²⁻ > F⁻ > Na⁺ > Mg²⁺ > Al³⁺     P³⁻ > S²⁻ > Cl⁻ > K⁺ > Ca²⁺",
        legend: [
          "Isoelectronic: the radius falls as Z rises (10 and 18 electrons above)",
          "Falls across a period, rises down a group; cation < atom < anion",
          "Covalent radius = half the X–X bond length",
        ],
        notes: "Down a group beats across a period: Be (111 pm) is smaller than Mg (160 pm).",
      },
      {
        id: "ionization",
        name: "First ionization enthalpy across a period",
        formula: "Li < B < Be < C < O < N < F < Ne     Na < Al < Mg < Si < S < P < Cl < Ar",
        legend: ["Group 2 > group 13: an s electron is held better than a p", "Group 15 > group 16: half-filled np³"],
        notes: "Down groups 13 and 14: B > Tl > Ga > Al > In and C > Si > Ge > Pb > Sn.",
      },
      {
        id: "successive-ie",
        name: "Successive ionization enthalpies",
        formula: "IE₁ < IE₂ < IE₃ …     a big jump after IE(k) → k valence electrons     E = (m/M)·(IE₁ + IE₂ + …)",
        legend: ["IE₂ compares the cations: Na > Mg; C < N < F < O"],
        notes: "IE₂ of Mg must be positive and larger than its IE₁ (737 kJ/mol).",
      },
      {
        id: "electron-gain",
        name: "Electron gain enthalpy",
        formula: "by magnitude: Cl > F > Br > I > At     S > Se > Te > Po > O",
        legend: [
          "Positive (endothermic): noble gases, Be, N; Ne +116 the most positive, He +48",
          "Electron affinity has the opposite sign to ΔegH",
        ],
        notes: "Cl (−349 kJ/mol) is the most negative of all elements, not F.",
      },
      {
        id: "electronegativity",
        name: "Electronegativity and metallic character",
        formula: "Pauling: F 4.0 > O 3.5 > N = Cl 3.0     rises across a period, falls down a group",
        legend: [
          "Not a constant: it changes with the bonded atom and the oxidation state",
          "Metallic character: down and to the left; metalloids B, Si, Ge, As, Sb, Te",
        ],
        notes: "Mg (1.2) is below Al (1.5); Bi and Pb are metals.",
      },
      {
        id: "oxides",
        name: "Nature of oxides",
        formula: "neutral: CO, NO, N₂O · amphoteric: Al₂O₃, BeO, ZnO, SnO, SnO₂, PbO, PbO₂, Cr₂O₃, As₂O₃, V₂O₅",
        legend: [
          "Period 3: Na₂O strongly basic → Al₂O₃ amphoteric → Cl₂O₇ strongly acidic",
          "Higher oxidation state of one element → more acidic oxide",
        ],
        notes: "GeO is acidic, not amphoteric; NO is neutral, not amphoteric.",
      },
    ],
  },
  {
    chapter: "Chemical Bonding and Molecular Structure",
    playbookSlug: "chemical-bonding",
    formulas: [
      {
        id: "formal-charge",
        name: "Lone pairs and formal charge",
        formula: "lone pairs = (valence e⁻ − 2 × bonds) / 2     FC = V − L − S/2",
        legend: ["V = valence e⁻ of the free atom, L = its lone-pair e⁻, S = its bonding e⁻", "Add one e⁻ per negative charge, remove one per positive"],
        notes: "Read whether the question counts the whole molecule or the central atom only.",
      },
      {
        id: "octet-exceptions",
        name: "Octet rule exceptions",
        formula: "incomplete: BeF₂ (4), BF₃, AlCl₃ (6) · odd electron: NO, NO₂, ClO₂ · expanded: PCl₅, SF₄ (10), SF₆, H₂SO₄, SO₃ (12), IF₇ (14)",
        legend: ["Only period 3 and heavier atoms expand the octet", "Lewis acid strength: BI₃ > BBr₃ > BCl₃ > BF₃ (back-bonding in BF₃)"],
        notes: "PCl₅ has no lone pair on P, so it is not a Lewis base.",
      },
      {
        id: "born-haber",
        name: "Born–Haber cycle",
        formula: "ΔfH = ΔsubH + ΔiH + ½ΔdissH + ΔegH + ΔlatticeH",
        legend: ["Lattice step for ions coming together: negative", "|ΔlatticeH| ∝ z⁺z⁻ / (r⁺ + r⁻)"],
        notes: "Half the X–X bond enthalpy, not all of it.",
      },
      {
        id: "fajans",
        name: "Fajans' rules",
        formula: "more covalent: smaller cation · higher cation charge · larger anion · 18-electron cation",
        legend: ["LiCl > NaCl > KCl · AlCl₃ > MgCl₂ > NaCl · CaI₂ > CaF₂ · CuCl > NaCl"],
        notes: "A bigger cation means LESS covalent; a bigger anion means MORE.",
      },
      {
        id: "resonance-length",
        name: "Resonance bond order and bond length",
        formula: "bond order = total bonds to the equivalent atoms / number of them:  O₃ 1.5 · CO₃²⁻, NO₃⁻ 4/3 · RCOO⁻ 1.5",
        legend: ["Same two atoms: higher bond order → shorter bond", "PCl₅: axial 219 pm > equatorial 204 pm"],
        notes: "C≡N (116 pm) is shorter than C=O (122 pm): compare orders only for the same pair of atoms.",
      },
      {
        id: "bond-angles",
        name: "Bond angles",
        formula: "lp–lp > lp–bp > bp–bp     CH₄ 109.5° · NH₃ 107° · H₂O 104.5° · NF₃ 102°",
        legend: ["OF₂ 103° < H₂O 104.5° < Cl₂O ≈ 111°", "Down a group the angle closes: H₂S 92°, PH₃ 93.5°"],
        notes: "SO₂ (sp², ≈ 119°) is bent at a wider angle than H₂O.",
      },
      {
        id: "steric-number",
        name: "Steric number and hybridisation",
        formula: "SN = ½(V + M − c + a):  2 sp · 3 sp² · 4 sp³ · 5 sp³d · 6 sp³d² · 7 sp³d³",
        legend: [
          "V = valence e⁻ of the centre, M = H or halogen atoms, c = + charge, a = − charge; O adds nothing",
          "Lone pairs on the centre = SN − atoms bonded to it",
        ],
        notes: "π bonds add no hybrid orbital: SO₃ is sp², BrF₅ is sp³d².",
      },
      {
        id: "shapes",
        name: "Shapes with lone pairs",
        formula: "SN 5: AX₄E see-saw · AX₃E₂ T-shape · AX₂E₃ linear     SN 6: AX₅E square pyramidal · AX₄E₂ square planar",
        legend: [
          "Lone pairs sit equatorial in a trigonal bipyramid, trans in an octahedron",
          "SF₄ see-saw · ClF₃ T-shape · XeF₂, I₃⁻ linear · BrF₅ square pyramid · XeF₄ square planar",
        ],
        notes: "Charge changes the shape: I₃⁻ linear, I₃⁺ bent; NO₂⁺ linear, NO₂⁻ bent.",
      },
      {
        id: "mo-bond-order",
        name: "MO bond order",
        formula: "bond order = ½(Nb − Na):  B₂ 1 · C₂ 2 · N₂ 3 · O₂ 2 · F₂ 1 · O₂⁺ 2.5 · O₂⁻ 1.5 · O₂²⁻ 1",
        legend: [
          "Up to 14 e⁻: π2p below σ2p; from O₂ on, σ2p below π2p",
          "14 e⁻ (N₂, CO, CN⁻, NO⁺) all have bond order 3",
          "Paramagnetic: B₂, O₂, O₂⁺, O₂⁻, NO, N₂²⁻",
        ],
        notes: "Bond order zero (He₂, Be₂) means no molecule; He₂⁺ (0.5) exists.",
      },
      {
        id: "dipole",
        name: "Dipole moment and hydrogen bonding",
        formula: "μ = q × d     1 D = 10⁻¹⁸ esu cm = 3.336 × 10⁻³⁰ C m",
        legend: [
          "Zero: CO₂, BF₃, CCl₄, XeF₂, XeF₄, PCl₅, SF₆, p-dichlorobenzene",
          "NH₃ 1.47 D > NF₃ 0.23 D: the lone-pair moment adds in NH₃, opposes in NF₃",
        ],
        notes: "o-Nitrophenol: intramolecular H-bond, lower b.p., steam volatile; the para isomer bonds between molecules.",
      },
    ],
  },
  {
    chapter: "The p-Block Elements",
    playbookSlug: "p-block-elements",
    formulas: [
      {
        id: "group-13",
        name: "Group 13 trends",
        formula: "atomic radius: B < Ga < Al < In < Tl     IE₁: In < Al < Ga < Tl < B",
        legend: ["M³⁺ radius rises steadily; electronegativity dips at Al", "m.p.: B > Al > Tl > In > Ga (Ga liquid from 303 to 2676 K)"],
        notes: "Inert pair: Tl⁺ is more stable than Tl³⁺, so TlI₃ is Tl⁺[I₃]⁻.",
      },
      {
        id: "boric-acid",
        name: "Borax and boric acid",
        formula: "borax Na₂[B₄O₅(OH)₄]·8H₂O     B(OH)₃ + 2H₂O → [B(OH)₄]⁻ + H₃O⁺",
        legend: ["Boric acid: weak, monobasic Lewis acid; H-bonded layers", "Borax bead: Na₂B₄O₇ → 2NaBO₂ + B₂O₃; Cu blue-green (oxidising), Co blue"],
        notes: "Borax in water is alkaline: NaOH + H₃BO₃.",
      },
      {
        id: "diborane",
        name: "Diborane and borazine",
        formula: "B₂H₆: 4 terminal 2c–2e B–H + 2 bridging 3c–2e B–H–B; B ≈ sp³, non-planar",
        legend: [
          "Borazine B₃N₃H₆: planar ring, B sp², all B–N bonds equal",
          "Lewis acid strength: BF₃ < BCl₃ < BBr₃ < BI₃ (back-bonding strongest in BF₃)",
        ],
        notes: "Boron's maximum covalency is 4: BF₆³⁻ does not exist.",
      },
      {
        id: "group-14",
        name: "Group 14: inert pair and oxides",
        formula: "Sn⁴⁺ more stable than Sn²⁺ (SnCl₂ reduces) · Pb²⁺ more stable than Pb⁴⁺ (PbO₂ oxidises)",
        legend: [
          "CO₂, SiO₂, GeO₂ acidic; SnO, SnO₂, PbO, PbO₂ amphoteric; CO neutral",
          "C₆₀: 20 six-membered + 12 five-membered rings, every C sp²",
        ],
        notes: "[SiF₆]²⁻ exists; [SiCl₆]²⁻ does not.",
      },
      {
        id: "group-15-hydrides",
        name: "Group 15 hydrides",
        formula: "stability and basicity: NH₃ > PH₃ > AsH₃ > SbH₃ > BiH₃     reducing power: the reverse",
        legend: ["b.p.: PH₃ < AsH₃ < NH₃ < SbH₃", "Bond angle: NH₃ 107.8° down to SbH₃ 91.3°"],
        notes: "The N–N single bond is weaker but shorter than P–P.",
      },
      {
        id: "nitrogen-oxides",
        name: "Oxides of nitrogen",
        formula: "N₂O +1 · NO +2 · N₂O₃ +3 · NO₂ +4 · N₂O₄ +4 · N₂O₅ +5",
        legend: ["Neutral: N₂O, NO; the rest acidic", "N–N bond in N₂O, N₂O₃, N₂O₄; an N–O–N bridge only in N₂O₅"],
        notes: "The brown ring is [Fe(H₂O)₅(NO)]²⁺: NO, not NO₂.",
      },
      {
        id: "phosphorus-reactions",
        name: "Reactions of phosphorus",
        formula: "P₄ + 3NaOH + 3H₂O → PH₃ + 3NaH₂PO₂     PCl₃ + 3H₂O → H₃PO₃ + 3HCl     PCl₅ + 4H₂O → H₃PO₄ + 5HCl",
        legend: ["P₄ + 8SOCl₂ → 4PCl₃ + 4SO₂ + 2S₂Cl₂", "Red P: white P heated at 573 K in an inert atmosphere"],
      },
      {
        id: "phosphorus-oxoacids",
        name: "Phosphorus oxoacids",
        formula: "basicity = number of P–OH:  H₃PO₂ 1 · H₃PO₃ 2 · H₃PO₄ 3 · H₄P₂O₇ 4",
        legend: [
          "P–H bonds = non-ionisable H; a P–H bond makes the acid reducing",
          "P: H₃PO₂ +1, H₃PO₃ +3, H₄P₂O₆ +4, H₃PO₄ and H₄P₂O₇ +5",
        ],
        notes: "P–O–P bridges: H₄P₂O₇ one, (HPO₃)₃ three, P₄O₁₀ six.",
      },
      {
        id: "sulphur-oxoacids",
        name: "Group 16 and the sulphur oxoacids",
        formula: "H₂SO₃ +4 · H₂SO₄ +6 · H₂S₂O₇ +6 (S–O–S) · H₂S₂O₈ +6 (O–O peroxo) · H₂S₂O₆ +5 (S–S)",
        legend: ["Hydride acid strength: H₂O < H₂S < H₂Se < H₂Te", "O is −1 in H₂O₂, +1 in O₂F₂, +2 in OF₂"],
        notes: "Rhombic sulphur is stable below 369 K, monoclinic above; ozone has six lone pairs.",
      },
      {
        id: "halogens",
        name: "Halogens and noble gases",
        formula: "bond enthalpy: Cl₂ > Br₂ > F₂ > I₂     ΔegH (magnitude): Cl > F > Br > I     oxidising power: F₂ > Cl₂ > Br₂ > I₂",
        legend: [
          "HX b.p.: HCl < HBr < HI < HF; m.p.: HCl < HBr < HF < HI",
          "Cl₂ + cold dilute OH⁻ → Cl⁻ + ClO⁻; hot concentrated → Cl⁻ + ClO₃⁻",
          "XeF₂ linear · XeF₄ square planar · XeF₆ distorted octahedral",
        ],
        notes: "F₂ does not disproportionate, and neither does a +7 oxoanion (ClO₄⁻).",
      },
    ],
  },
  {
    chapter: "The d- and f-Block Elements",
    playbookSlug: "d-and-f-block-elements",
    formulas: [
      {
        id: "configurations",
        name: "Configurations and ionisation",
        formula: "Cr [Ar]3d⁵4s¹ · Cu [Ar]3d¹⁰4s¹     d count of M²⁺ and above = Z − 18 − n",
        legend: [
          "Ions lose 4s before 3d: Mn⁺ is 3d⁵4s¹, Cr⁺ is 3d⁵",
          "4d: Nb 4d⁴5s¹, Mo 4d⁵5s¹, Ru 4d⁷5s¹, Rh 4d⁸5s¹, Pd 4d¹⁰5s⁰, Ag 4d¹⁰5s¹",
          "IE₂ high for Cr and Cu (Cr⁺ 3d⁵, Cu⁺ 3d¹⁰); IE₃ high for Mn (Mn²⁺ 3d⁵)",
        ],
        notes: "Atomisation enthalpy peaks at V, dips at Mn and is lowest at Zn.",
      },
      {
        id: "oxidation-states",
        name: "Oxidation states of the 3d metals",
        formula: "most states: Mn (+2 to +7) · only one: Sc (+3)",
        legend: [
          "Down a d-group the HIGHER state is more stable: CrO₃ is the strongest oxidant of Cr, Mo, W(VI)",
          "Mn reaches +7 only in Mn₂O₇; its highest fluoride is MnF₄",
        ],
        notes: "The opposite of the p-block, where the lower state wins down a group.",
      },
      {
        id: "electrode-potentials",
        name: "Electrode potentials",
        formula: "M³⁺/M²⁺: Mn +1.57, Co +1.97 V (strong oxidants) · Ti, V, Cr negative (M²⁺ liberates H₂)",
        legend: [
          "Cu²⁺/Cu +0.34 V: the only positive M²⁺/M, so Cu gives no H₂ with dilute acid",
          "Fe³⁺/Fe²⁺ is only +0.77 V because Fe³⁺ is already d⁵",
        ],
        notes: "2Cu⁺ → Cu²⁺ + Cu: Cu²⁺ wins on its MORE negative hydration enthalpy.",
      },
      {
        id: "spin-only",
        name: "Spin-only magnetic moment",
        formula: "μ = √(n(n + 2)) BM     n = 1→1.73 · 2→2.83 · 3→3.87 · 4→4.90 · 5→5.92 · 7→7.94",
        legend: ["n = unpaired electrons; free ion dˣ: n = x up to d⁵, 10 − x from d⁶"],
        notes: "Mn²⁺ is 3d⁵ (5.92 BM), not 3d³4s²; Cu²⁺ (d⁹) has one unpaired electron.",
      },
      {
        id: "ion-colours",
        name: "Colours of aqueous ions",
        formula: "Ti³⁺ purple · V³⁺ green · Cr³⁺ violet · Mn²⁺ pink · Fe²⁺ green · Fe³⁺ yellow · Co²⁺ pink · Ni²⁺ green · Cu²⁺ blue",
        legend: [
          "Colourless: d⁰ (Sc³⁺, Ti⁴⁺) and d¹⁰ (Zn²⁺, Cu⁺)",
          "MnO₄⁻ purple, Cr₂O₇²⁻ orange, CrO₄²⁻ yellow: d⁰, charge transfer, diamagnetic",
        ],
        notes: "Anhydrous CuSO₄ is white; CuSO₄·5H₂O is blue.",
      },
      {
        id: "oxides",
        name: "Transition metal oxides",
        formula: "one metal: higher oxidation state → more covalent, more acidic",
        legend: [
          "V₂O₃ basic, V₂O₄ less basic, V₂O₅ amphoteric · CrO basic, Cr₂O₃ amphoteric, CrO₃ acidic · MnO basic, Mn₂O₇ acidic",
          "Mn₂O₇: two tetrahedra sharing one O, a covalent green oil",
        ],
        notes: "Fe₃O₄, Mn₃O₄ and Co₃O₄ are mixed (+2 and +3); Fe₂O₃ is not.",
      },
      {
        id: "dichromate",
        name: "Potassium dichromate",
        formula: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O     2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O",
        legend: [
          "n-factor 6 in acid; Cr stays +6 between chromate and dichromate",
          "Chromyl chloride CrO₂Cl₂ (orange-red) → yellow Na₂CrO₄ → blue CrO₅, Cr +6 with two peroxo groups",
        ],
        notes: "K₂Cr₂O₇ is a primary standard; Na₂Cr₂O₇ is hygroscopic.",
      },
      {
        id: "permanganate",
        name: "Potassium permanganate",
        formula: "acid: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O     neutral or faintly alkaline: MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻",
        legend: [
          "Manganate MnO₄²⁻: green, +6, d¹, 1.73 BM · permanganate MnO₄⁻: purple, +7, d⁰",
          "3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O",
        ],
        notes: "Titrate in dilute H₂SO₄, never HCl: permanganate oxidises chloride.",
      },
      {
        id: "lanthanoids",
        name: "Lanthanoids and actinoids",
        formula: "Ln³⁺: 4f electrons = Z − 57     Ce⁴⁺ (4f⁰), Tb⁴⁺ (4f⁷) oxidants · Eu²⁺ (4f⁷), Yb²⁺ (4f¹⁴) reductants",
        legend: [
          "5d¹ in the atom: Ce 4f¹5d¹6s², Gd 4f⁷5d¹6s², Lu 4f¹⁴5d¹6s²",
          "Actinoids: all radioactive, up to +7 (Np); the actinoid contraction is larger per element",
        ],
        notes: "Gd³⁺ is 4f⁷ (7.94 BM); Cm has eight unpaired electrons, Am seven.",
      },
      {
        id: "qualitative",
        name: "Cation groups and confirmatory tests",
        formula: "I dil. HCl (Pb²⁺) · II H₂S in dil. HCl (Pb²⁺, Cu²⁺, Cd²⁺, As³⁺) · III NH₄OH + NH₄Cl (Fe³⁺, Al³⁺, Cr³⁺) · IV H₂S in NH₄OH (Zn²⁺, Mn²⁺, Co²⁺, Ni²⁺) · V (NH₄)₂CO₃ (Ba²⁺, Sr²⁺, Ca²⁺) · VI Mg²⁺",
        legend: [
          "Cu²⁺ + K₄[Fe(CN)₆] chocolate-brown · Fe³⁺ Prussian blue, blood red with SCN⁻ · Ni²⁺ + dmg red",
          "Brown ring [Fe(H₂O)₅(NO)]²⁺: Fe is +1",
        ],
        notes: "Nessler's reagent K₂[HgI₄] gives a brown precipitate with NH₄⁺ and contains no N.",
      },
    ],
  },
  {
    chapter: "Coordination Compounds",
    playbookSlug: "coordination-compounds",
    formulas: [
      {
        id: "werner",
        name: "Werner's theory and ionisable ions",
        formula: "mol AgCl = mol complex × Cl⁻ outside [ ]     x + Σ ligand charges = charge on the complex ion",
        legend: [
          "Primary valency = oxidation state; secondary valency = coordination number",
          "CoCl₃·xNH₃, x = 6, 5, 4, 3 → 3, 2, 1, 0 mol AgCl",
        ],
        notes: "The ions per formula unit set the conductivity and i in ΔTf = i·Kf·m.",
      },
      {
        id: "denticity",
        name: "Denticity and ligand types",
        formula: "mono: NH₃, H₂O, Cl⁻, CO · bi: en, C₂O₄²⁻, dmgH⁻ · hexa: EDTA⁴⁻ · ambidentate: NO₂⁻, SCN⁻, CN⁻",
        legend: ["Chelating: two atoms bind at once; ambidentate: one of two atoms binds", "PPh₃ is a σ-donor and π-acceptor; N(CH₃)₃ only a σ-donor"],
        notes: "Oxalate chelates; it is not ambidentate.",
      },
      {
        id: "naming",
        name: "Names and d-electron count",
        formula: "d count = group number − oxidation state",
        legend: [
          "Anionic ligands end in -ido (chlorido, cyanido, oxido); an anionic complex ends in -ate (ferrate, cuprate, argentate)",
          "Ligands alphabetical; bis-, tris- for ligands that already carry a number",
        ],
        notes: "In nitroprusside, NO is counted as NO⁺.",
      },
      {
        id: "structural-isomers",
        name: "Structural isomerism",
        formula: "linkage (–NO₂ / –ONO) · ionisation ([Co(NH₃)₅SO₄]Br / [Co(NH₃)₅Br]SO₄) · coordination (metals swap ligands) · hydrate ([Cr(H₂O)₆]Cl₃ / [Cr(H₂O)₅Cl]Cl₂·H₂O)",
        legend: ["Ionisation pair: one gives AgBr, the other BaSO₄", "Hydrate pair: AgNO₃ precipitates 3 and 2 Cl⁻"],
        notes: "Coordination isomerism needs two DIFFERENT metals.",
      },
      {
        id: "stereo-isomers",
        name: "Geometrical and optical isomers",
        formula: "square planar MA₂B₂ 2 · MABCD 3     octahedral MA₄B₂ 2 · MA₃B₃ 2 (fac, mer) · M(AA)₂B₂ 2 geometrical, 3 stereo · M(AA)₃ 0 geometrical, 2 optical",
        legend: ["Tetrahedral complexes have no geometrical isomers", "Stereoisomers = achiral forms + 2 × chiral forms"],
        notes: "Square planar complexes are never optically active.",
      },
      {
        id: "vbt",
        name: "Valence bond theory",
        formula: "d⁴–d⁷, strong field: d²sp³, inner orbital, low spin · weak field: sp³d², outer orbital, high spin",
        legend: [
          "Octahedral Ni²⁺ (d⁸) is always sp³d² with 2 unpaired",
          "Four-coordinate d⁸: CN⁻ → dsp², square planar, 0 unpaired; Cl⁻ → sp³, tetrahedral, 2 unpaired",
        ],
        notes: "Ni(CO)₄ is Ni(0), d¹⁰, sp³, diamagnetic; Pt²⁺ and Pd²⁺ are always square planar.",
      },
      {
        id: "spectrochemical",
        name: "Spectrochemical series",
        formula: "I⁻ < Br⁻ < SCN⁻ < Cl⁻ < S²⁻ < F⁻ < OH⁻ < C₂O₄²⁻ < H₂O < NCS⁻ < EDTA⁴⁻ < NH₃ < en < CN⁻ < CO",
        legend: [
          "Higher metal charge, and 3d < 4d < 5d, raise Δo",
          "Stronger field → larger Δ → shorter λ absorbed: Δ = hc/λ",
        ],
        notes: "S-bonded SCN⁻ is weak; N-bonded NCS⁻ sits above water.",
      },
      {
        id: "splitting-cfse",
        name: "Crystal field splitting and CFSE",
        formula: "octahedral: eg +0.6Δo, t₂g −0.4Δo · tetrahedral: t₂ +0.4Δt, e −0.6Δt · Δt = (4/9)Δo     CFSE = (−0.4·n(t₂g) + 0.6·n(eg))Δo",
        legend: [
          "Δo > P → low spin; Δo < P → high spin; a choice only for d⁴ to d⁷",
          "High-spin d³ and d⁸ −1.2Δo; low-spin d⁶ −2.4Δo; tetrahedral is always high spin, filling e first",
        ],
        notes: "CFSE is not Δo: for d¹ the CFSE is −0.4Δo, but the light absorbed matches Δo.",
      },
      {
        id: "magnetic",
        name: "Magnetic moment of complexes",
        formula: "μ = √(n(n + 2)) BM:  [Fe(CN)₆]³⁻ 1 unpaired, 1.73 · [Fe(H₂O)₆]³⁺ 5 unpaired, 5.92",
        legend: [
          "Diamagnetic: d⁰, d¹⁰, low-spin d⁶ ([Fe(CN)₆]⁴⁻, [Co(NH₃)₆]³⁺), square planar d⁸",
          "Any odd d count is paramagnetic",
        ],
        notes: "Cu²⁺ in any complex is 1.73 BM; Cu⁺ (d¹⁰) is zero.",
      },
      {
        id: "carbonyls",
        name: "Metal carbonyls, stability and uses",
        formula: "σ: C lone pair → metal · π: filled metal d → CO π*  ⇒  M–C stronger, C–O weaker",
        legend: [
          "Co₂(CO)₈: 2 bridging CO, one Co–Co bond · Mn₂(CO)₁₀: no bridging CO, one Mn–Mn bond",
          "βn = K₁K₂…Kn; chelates are more stable: [Co(en)₃]²⁺ > [Co(NH₃)₆]²⁺",
          "Chlorophyll Mg · haemoglobin Fe · vitamin B₁₂ Co · cisplatin Pt · Wilkinson's Rh",
        ],
        notes: "π-acceptor ligands such as CO stabilise the zero oxidation state.",
      },
    ],
  },
  {
    chapter: "Biomolecules",
    playbookSlug: "biomolecules",
    formulas: [
      {
        id: "tests",
        name: "Colour tests",
        formula: "Fehling's red Cu₂O · Tollens' silver mirror · Seliwanoff's cherry red (ketoses) · iodine blue-black (starch) · biuret violet (two or more peptide bonds) · ninhydrin purple (amino acids)",
        legend: ["Every monosaccharide is reducing, fructose included (enediol to glucose)"],
        notes: "Seliwanoff's and the iodine test use no copper.",
      },
      {
        id: "glucose-reactions",
        name: "Reactions of glucose",
        formula: "HI → n-hexane · Br₂ water → gluconic acid · HNO₃ → saccharic acid · (CH₃CO)₂O → pentaacetate · NH₂OH → oxime",
        legend: ["Straight chain, one CHO and five OH", "No Schiff's test, no NaHSO₃ adduct: the evidence for the ring"],
        notes: "Bromine water oxidises only the CHO; nitric acid also oxidises the CH₂OH.",
      },
      {
        id: "anomers",
        name: "Anomers, epimers and rings",
        formula: "α-D-glucose: m.p. 419 K, +111° · β-D-glucose: m.p. 423 K, +19° · equilibrium +52.5°",
        legend: [
          "Anomers differ at C-1; glucose and galactose are C-4 epimers, glucose and mannose C-2 epimers",
          "Glucose forms a pyranose, fructose a furanose",
        ],
        notes: "D or L comes from the last stereocentre's OH, not from the sign of rotation.",
      },
      {
        id: "glycosidic-links",
        name: "Glycosidic linkages",
        formula: "sucrose α1–β2 (non-reducing) · maltose α1–4 · lactose β1–4 · amylose α1–4 · amylopectin, glycogen α1–4 + α1–6 · cellulose β1–4",
        legend: [
          "Invert sugar: glucose +52.5°, fructose −92.4°, so the mixture is laevorotatory",
          "Lactose: C-1 of galactose to C-4 of glucose",
        ],
        notes: "Only sucrose joins two anomeric carbons; amylose is the water-soluble fraction of starch.",
      },
      {
        id: "amino-acids",
        name: "Amino acids",
        formula: "essential: V L I R K T M F W H",
        legend: [
          "Acidic: D, E · basic: K, R, H · sulphur: C, M",
          "D Asp, E Glu, N Asn, Q Gln, K Lys, R Arg, F Phe, W Trp, Y Tyr",
        ],
        notes: "Tyrosine and proline are non-essential; threonine and isoleucine have two stereocentres.",
      },
      {
        id: "peptides-proteins",
        name: "Peptides and protein structure",
        formula: "peptide bonds = n − 1 · sequences n! (no repeats), kⁿ (repeats allowed) · M_min = M × 100/p",
        legend: [
          "1° sequence (peptide bonds) · 2° α-helix, β-sheet (H-bonds) · 3° overall fold · 4° subunit packing",
          "Fibrous (keratin, collagen, myosin) insoluble; globular (insulin, albumin) soluble",
        ],
        notes: "Denaturation destroys the 2° and 3° structure; the primary structure stays.",
      },
      {
        id: "enzymes",
        name: "Enzymes",
        formula: "invertase: sucrose → glucose + fructose · diastase: starch → maltose · maltase: maltose → glucose · zymase: glucose → ethanol + CO₂ · urease: urea → NH₃ + CO₂",
        legend: ["Pepsin: proteins → peptides; trypsin: → amino acids", "Almost all enzymes are globular proteins, each highly specific"],
        notes: "Diastase stops at maltose; maltase takes it on to glucose.",
      },
      {
        id: "vitamins",
        name: "Vitamins and deficiency diseases",
        formula: "A xerophthalmia · B1 beri-beri · B2 cheilosis · B6 convulsions · B12 pernicious anaemia · C scurvy · D rickets · E fragile red cells · K longer clotting time",
        legend: ["B1 thiamine, B2 riboflavin, B6 pyridoxine, B12 cyanocobalamin", "Stored: A, D, E, K and B12"],
        notes: "B12 is water soluble but is still stored.",
      },
      {
        id: "nucleic-acids",
        name: "Nucleic acids",
        formula: "DNA: A, G, C, T + β-D-2-deoxyribose · RNA: A, G, C, U + β-D-ribose",
        legend: [
          "Purines A, G (two rings); pyrimidines C, T, U (one ring)",
          "Nucleoside = base + sugar; nucleotide adds phosphate at C-5′; phosphodiester link C-5′ to C-3′",
        ],
        notes: "DNA carries the message; the proteins are made by RNA.",
      },
      {
        id: "base-pairing",
        name: "Base pairing",
        formula: "H-bonds = 2 × n(A–T) + 3 × n(G–C)",
        legend: ["A pairs with T (U in RNA), G with C", "Antiparallel strands: write the complement 3′ → 5′"],
        notes: "Count one strand only; counting both doubles the answer.",
      },
    ],
  },
];
