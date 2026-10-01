/**
 * Content for /guide/jee-mains-chemistry/traps — the mistakes that cost marks on JEE Mains Chemistry,
 * bucketed by the strand whose marks they cost.
 *
 * The paper-wide traps follow from the marking: +4 and −1 on both formats, so a blind MCQ guess is
 * worth +0.25 and a guessed numeric answer close to −1. They also cover the three question formats
 * Chemistry leans on: the count from a list, the two statements and the match-the-list.
 *
 * The strand traps are cross-chapter shapes taken from the `traps` arrays in the
 * /notes/jee-mains-chemistry chapters, so each one agrees with the notes. `affects` holds playbook
 * slugs; EMPTY means paper-wide. Prose carries no bank figures.
 */

import type { TrapShape } from "./types";

export const TRAP_SHAPES: TrapShape[] = [
  // -------- Paper-wide --------
  {
    id: "blank-mcq",
    title: "The blank MCQ — expected marks thrown away",
    bucket: "paper",
    affects: [],
    mechanic:
      "A right answer earns 4 and a wrong one loses 1. A blind guess among four options is worth 1/4 × 4 − 3/4 × 1 = +0.25 on average, and with one option ruled out it is worth 1/3 × 4 − 2/3 × 1 ≈ +0.67.",
    fix:
      "Before time runs out, answer every MCQ. Rule out what you can on sight — an impossible oxidation state, an order that ignores a known exception, a unit that cannot be right — and pick from what is left.",
  },
  {
    id: "numeric-guess",
    title: "The guessed numeric answer — almost always −1",
    bucket: "paper",
    affects: [],
    mechanic:
      "A numeric answer has no options, so a guess is almost certainly wrong. It carries the same −1 as a wrong MCQ, so its expected value is close to −1.",
    fix:
      "Enter a numeric answer only when you have worked it out or counted every item. If you have not, leave it blank; the MCQ rule does not carry over.",
  },
  {
    id: "numeric-entry",
    title: "A right method, a wrong entry",
    bucket: "paper",
    affects: [],
    mechanic:
      "The numeric answer is entered as an integer, often after rounding or in a stated unit with a power of ten. A spin-only moment of 2.83 BM asked in units of 10⁻¹ BM is 28; typing 3 or 283 scores −1, the same as a wrong method.",
    fix:
      "Before typing, reread the unit and any power of ten in the stem. Round only at the last step, to the nearest integer, and check the size makes chemical sense.",
  },
  {
    id: "count-from-list",
    title: "How many of the following — one wrong item, a wrong answer",
    bucket: "paper",
    affects: [],
    mechanic:
      "Outside physical chemistry, a numeric answer is usually a count: how many of these are paramagnetic, aromatic, reducing or give a positive test. The count is right only if every item is judged right, and the list hides one or two look-alikes that break its pattern.",
    fix:
      "Mark each item yes or no on its own, with a one-word reason, then add up the marks. Never answer from the look of the list; the exception in it is usually the point of the question.",
  },
  {
    id: "two-statements",
    title: "Two statements, four combinations",
    bucket: "paper",
    affects: [],
    mechanic:
      "The options are the four true–false combinations of Statement I and Statement II. Reading them first invites a guess at the pair. In the assertion–reason form, a true reason can still fail to explain the assertion.",
    fix:
      "Mark each statement true or false on its own, then find the matching option. For assertion and reason, ask a third question once both are true: does R explain A?",
  },
  {
    id: "match-the-list",
    title: "Match the list — fix one pair, then eliminate",
    bucket: "paper",
    affects: [],
    mechanic:
      "Four items in List I meet four in List II, and working every link costs time. The lists are built on swapped pairs — Sandmeyer and Gattermann, positive and negative deviation, Etard and Gattermann–Koch — so a half-remembered pair leads to a wrong option.",
    fix:
      "Start with the pair you are surest of and strike every option that breaks it. Check one more pair among what is left; usually only one option survives.",
  },

  // -------- Calculate --------
  {
    id: "subtraction-order",
    title: "Right size, wrong sign",
    bucket: "calculate",
    affects: ["thermodynamics", "electrochemistry", "chemical-kinetics", "equilibrium"],
    mechanic:
      "Many results are one quantity minus another: bonds broken minus bonds formed, E° of the cathode minus E° of the anode, forward minus backward activation energy, Δn as gaseous products minus gaseous reactants. With combustion enthalpies it is reactants minus products. Reversing the order gives the right size with the opposite sign, and that value sits beside the right one.",
    fix:
      "Write the rule in words before substituting. Then check the sign against a fact: an exothermic reaction has ΔH below zero, and a working cell has E°cell above zero and ΔG° below zero.",
  },
  {
    id: "units-thousand",
    title: "kJ beside J, °C beside K, grams beside kilograms",
    bucket: "calculate",
    affects: [
      "thermodynamics",
      "chemical-kinetics",
      "electrochemistry",
      "solutions",
      "some-basic-concepts",
      "structure-of-atom",
    ],
    mechanic:
      "ΔH comes in kJ and ΔS in J K⁻¹; Ea in kJ and R in J K⁻¹ mol⁻¹. Molality wants kilograms of solvent, and the molar conductivity formula carries a 1000 for litres and cm³. One unconverted unit moves the answer by a factor of a thousand, a temperature left in °C breaks a gas law or the Arrhenius equation, and an energy in eV must become joules before it meets h.",
    fix:
      "Write the unit beside every number before substituting. Work in J, K and kg, and pick the R that matches the pressure unit: 0.082 with atm and litres, 0.083 with bar and litres, 8.314 with joules.",
  },
  {
    id: "log-for-ln",
    title: "log where the formula has ln",
    bucket: "calculate",
    affects: ["chemical-kinetics", "equilibrium", "thermodynamics", "electrochemistry"],
    mechanic:
      "The Arrhenius slope, the van 't Hoff slope and the isothermal work formula are written with ln. In base-ten form each picks up 2.303: the slope of log k against 1/T is −Ea/2.303R, not −Ea/R. Dropping the factor, or using it twice, gives an answer off by 2.303, and that answer is offered.",
    fix:
      "Check which log the graph or the data uses before reading a slope. With log₁₀, multiply by 2.303. The 0.059 in the Nernst equation already contains the factor, so do not add it again.",
  },
  {
    id: "equation-as-written",
    title: "A value that belongs to the equation as written",
    bucket: "calculate",
    affects: [
      "thermodynamics",
      "equilibrium",
      "electrochemistry",
      "chemical-kinetics",
      "some-basic-concepts",
    ],
    mechanic:
      "Doubling an equation doubles ΔH and ΔG° and squares K; dividing it by three takes the cube root of K, not a third of it. E° does not change, because it is intensive. A rate quoted for one species becomes the rate of reaction only after division by that species' coefficient.",
    fix:
      "Before using any ΔH, K or rate, read the equation it is quoted for and scale it to the one the question writes. Count every coefficient and n-factor: H₂SO₄ and Ba(OH)₂ each carry two.",
  },
  {
    id: "particle-count",
    title: "Formula units counted where particles matter",
    bucket: "calculate",
    affects: ["solutions", "equilibrium", "electrochemistry"],
    mechanic:
      "Colligative properties scale with dissolved particles: van 't Hoff i is 2 for NaCl, 3 for CaCl₂ and the ion count for any strong electrolyte. In Ksp each ion carries its count, so for Ag₂CrO₄ Ksp = (2s)²s = 4s³. Leaving i = 1 gives the glucose answer, and dropping the count loses a factor of 4; both are offered.",
    fix:
      "Before any colligative or solubility calculation, write the ions each formula gives. Water of crystallisation adds none, and a dimerising solute has i below 1: i = 1 − α/2.",
  },

  // -------- Reactions --------
  {
    id: "carbon-count",
    title: "A carbon gained or lost",
    bucket: "reactions",
    affects: [
      "amines",
      "aldehydes-ketones-and-carboxylic-acids",
      "hydrocarbons",
      "haloalkanes-and-haloarenes",
    ],
    mechanic:
      "Hofmann bromamide, the haloform reaction and soda-lime decarboxylation each remove one carbon. A Grignard reagent with CO₂ and KCN substitution each add one. Hot KMnO₄ cuts any side chain with a benzylic H down to –COOH, and Wurtz coupling and Kolbe electrolysis join two chains. The product with the right group but the wrong chain length is always an option.",
    fix:
      "Count carbons at every step of a sequence and write the count under each structure. Ask of each reagent: does it add, remove or keep a carbon?",
  },
  {
    id: "where-the-group-lands",
    title: "Where the group lands on an alkene",
    bucket: "reactions",
    affects: [
      "hydrocarbons",
      "alcohols-phenols-and-ethers",
      "haloalkanes-and-haloarenes",
      "aldehydes-ketones-and-carboxylic-acids",
    ],
    mechanic:
      "HX and acid-catalysed hydration go through a carbocation, so they follow Markovnikov, and the cation may shift to a more stable one first. A peroxide reverses the addition of HBr only; HCl and HI still add by Markovnikov. Hydroboration puts OH on the less substituted carbon with no peroxide and no shift. On an alkyne, Hg²⁺ hydration gives a methyl ketone and hydroboration an aldehyde.",
    fix:
      "Name the route first: cation, radical or borane. For a cation, look at the next carbon; if a hydride or methyl shift gives a more stable cation, draw it before placing the group. Make the same check when an alcohol is dehydrated in acid.",
  },
  {
    id: "ambident-nucleophile",
    title: "Ambident nucleophiles: which atom attacks",
    bucket: "reactions",
    affects: ["haloalkanes-and-haloarenes", "amines", "coordination-compounds"],
    mechanic:
      "Cyanide and nitrite can bond through either of two atoms. Ionic KCN gives the nitrile R–CN and covalent AgCN the isocyanide R–NC; KNO₂ gives the alkyl nitrite R–O–N=O and AgNO₂ the nitro compound R–NO₂. The swapped pair is the usual wrong option. In complexes the same two-ended ligands give linkage isomers.",
    fix:
      "Hold one rule: both silver salts attack through nitrogen, so the potassium salts give the nitrile and the nitrite. Then check the product's name against the atom bonded to carbon.",
  },
  {
    id: "reagent-conditions",
    title: "One word in the conditions changes the product",
    bucket: "reactions",
    affects: [
      "haloalkanes-and-haloarenes",
      "hydrocarbons",
      "aldehydes-ketones-and-carboxylic-acids",
      "alcohols-phenols-and-ethers",
    ],
    mechanic:
      "Aqueous KOH substitutes and alcoholic KOH eliminates. Cl₂ in light takes the side chain of toluene, Cl₂ with FeCl₃ the ring. Dilute alkali gives an aldol; concentrated alkali with no α-hydrogen gives the Cannizzaro reaction. NaBH₄ reduces only aldehydes and ketones, while LiAlH₄ also reduces acids and esters. Ozonolysis with Zn/H₂O stops at aldehydes; without zinc they go on to acids.",
    fix:
      "Learn reactions as reagent-and-condition pairs. Underline the deciding word in the stem — aqueous or alcoholic, light or catalyst, dilute or concentrated, cold or hot — before looking at the options.",
  },
  {
    id: "director-at-that-step",
    title: "The director is whatever sits on the ring at that step",
    bucket: "reactions",
    affects: [
      "hydrocarbons",
      "haloalkanes-and-haloarenes",
      "amines",
      "alcohols-phenols-and-ethers",
    ],
    mechanic:
      "Halogens slow the ring yet send the new group ortho and para. –NH₂ directs ortho and para, but in nitrating acid it becomes –NH₃⁺, which directs meta. –CH₃ directs ortho and para until it is oxidised to –COOH, which directs meta. Friedel–Crafts fails on nitrobenzene and on aniline, so a sequence that needs it must run it first.",
    fix:
      "At each step of a sequence, name the group on the ring at that moment and its effect. When two groups disagree, the stronger activator decides where the next group goes.",
  },

  // -------- Structure --------
  {
    id: "spin-state-first",
    title: "A spin-only moment without the spin state",
    bucket: "structure",
    affects: ["coordination-compounds", "d-and-f-block-elements", "structure-of-atom"],
    mechanic:
      "μ = √(n(n + 2)) BM needs the number of unpaired electrons, and that depends on the ion and the ligand. Ions lose 4s electrons before 3d, so Mn²⁺ is 3d⁵ with five unpaired, not 3d³4s². A strong-field ligand pairs electrons: [Fe(CN)₆]⁴⁻ is low-spin d⁶ and diamagnetic, while [Fe(H₂O)₆]²⁺ has four unpaired.",
    fix:
      "Three steps: the ion's d count with the 4s electrons removed first, the ligand's field strength, then the box diagram. Cu⁺ and Zn²⁺ are d¹⁰ and MnO₄⁻ is d⁰, so all three are diamagnetic, however coloured.",
  },
  {
    id: "inert-pair",
    title: "The lower oxidation state wins down a p-block group",
    bucket: "structure",
    affects: ["p-block-elements", "d-and-f-block-elements", "periodicity"],
    mechanic:
      "Down groups 13 to 16 the inner s pair resists bonding, so the lower state grows more stable: Tl⁺ over Tl³⁺, Pb²⁺ over Pb⁴⁺, Bi³⁺ over Bi⁵⁺. So Pb⁴⁺ and Bi(V) are strong oxidants, Sn²⁺ is a reductant, and TlI₃ holds Tl⁺ with I₃⁻. In a d-block group the trend runs the other way.",
    fix:
      "Ask which state the element prefers before calling a compound an oxidant or a reductant. Do not carry the p-block rule into the d-block: the higher state grows more stable down a d group, which is why Cr(VI) is a stronger oxidant than Mo(VI).",
  },
  {
    id: "smooth-order",
    title: "The smooth periodic order is the planted option",
    bucket: "structure",
    affects: ["periodicity", "p-block-elements", "chemical-bonding"],
    mechanic:
      "Trends have exceptions, and the options are built on them. First ionisation enthalpy runs Li < B < Be < C < O < N < F. Ga is smaller than Al. Cl, not F, has the most negative electron gain enthalpy, and the F–F bond is weaker than Cl–Cl. BF₃ is the weakest Lewis acid of the boron halides, because back-bonding fills boron's empty orbital.",
    fix:
      "Keep a one-page list of the exceptions and check every order against it. If an option is the smooth trend, test it at the pairs where the list says the trend breaks.",
  },
  {
    id: "ranking-rule",
    title: "An acid or base order ranked by the wrong effect",
    bucket: "structure",
    affects: [
      "organic-basic-principles",
      "alcohols-phenols-and-ethers",
      "aldehydes-ketones-and-carboxylic-acids",
      "amines",
      "hydrocarbons",
    ],
    mechanic:
      "The −I effect fades within two or three bonds, so position matters more than the number of halogens. Resonance reaches only ortho and para, so a meta –OCH₃ makes phenol more acidic. In water, methylamines run 2° > 1° > 3°, not the gas-phase order. Alkyl groups stabilise a carbocation but destabilise a carbanion.",
    fix:
      "Name the effect that acts at that position and in that medium before ranking. Then check the order against one value you know, such as phenol being a stronger acid than ethanol.",
  },
  {
    id: "isomer-count",
    title: "An isomer count that misses or double-counts",
    bucket: "structure",
    affects: [
      "organic-basic-principles",
      "hydrocarbons",
      "haloalkanes-and-haloarenes",
      "coordination-compounds",
    ],
    mechanic:
      "2ⁿ is a ceiling: a meso form cuts it, so tartaric acid has three stereoisomers. A C=C with two different groups at each end doubles a count. A tetrahedral complex has no cis–trans isomers, and a chiral cis complex adds to the stereoisomer count but not to the geometrical one.",
    fix:
      "Read whether the stem asks for structural, geometrical or all stereoisomers. Draw and name each isomer, so a chain numbered from the other end is not counted twice.",
  },
];
