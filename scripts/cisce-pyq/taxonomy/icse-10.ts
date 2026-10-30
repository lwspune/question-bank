/**
 * ICSE Class 10 chapter + subtopic taxonomy (Mathematics 51, Science 52 papers
 * 1-3: Physics, Chemistry, Biology).
 *
 * ── PROVENANCE ───────────────────────────────────────────────────────────────
 * Authored from CISCE's Class X syllabus documents for the ICSE 2027
 * examination (uploaded 2025-03: 8.-Mathematics, 9.-Physics, 10.-Chemistry,
 * 11.-Biology, each "CLASS X" only), cross-checked against the 2025 and 2026
 * papers. The syllabus that governed the 2025-2026 examinations is no longer
 * on cisce.org (both earlier uploads now 404), and the 2027 Mathematics
 * syllabus is a REDUCED one: Shares and Dividend, the geometric half of
 * Progressions, Loci, Constructions and spheres are gone from it, yet the 2026
 * paper still asks a Shares question (and the 2026 Biology paper asks human
 * evolution and food chains, which the 2027 Biology syllabus does not list).
 * So the rule is: the 2027 units, PLUS any
 * older-syllabus topic the 2025 or 2026 papers actually examine. Those carry
 * `syllabusRef: "pre-2027"` so the provenance is visible.
 *
 * ── THE GRAIN RULE (as for ISC) ──────────────────────────────────────────────
 * A syllabus unit is split into its sub-units when they are distinct
 * techniques (Mathematics "Algebra" becomes six chapters; Physics "Light"
 * three), kept whole when its sub-units are facets of one topic. Science
 * chapters follow the units' own sub-headings, which are also how every ICSE
 * Class X textbook divides them.
 */
import type { CisceChapter } from "../exams";

export const ICSE_10_SUBJECTS = ["Mathematics", "Physics", "Chemistry", "Biology"] as const;
export type Icse10Subject = (typeof ICSE_10_SUBJECTS)[number];

export const ICSE_10_TAXONOMY: Record<Icse10Subject, readonly CisceChapter[]> = {
  // Section A (40, compulsory) and Section B (any 4 of 7) both draw on every unit.
  Mathematics: [
    { name: "Goods and Services Tax", syllabusRef: "1(i)" },
    { name: "Banking", syllabusRef: "1(ii)" },
    { name: "Shares and Dividend", syllabusRef: "pre-2027" },
    { name: "Linear Inequations", syllabusRef: "2(i)" },
    { name: "Quadratic Equations", syllabusRef: "2(ii)" },
    { name: "Ratio and Proportion", syllabusRef: "2(iii)" },
    { name: "Factorisation of Polynomials", syllabusRef: "2(iv)" },
    { name: "Matrices", syllabusRef: "2(v)" },
    { name: "Arithmetic and Geometric Progressions", syllabusRef: "2(vi) + pre-2027 GP" },
    { name: "Reflection", syllabusRef: "2(vii)(a)" },
    { name: "Section and Mid-point Formula", syllabusRef: "2(vii)(b)(i)" },
    { name: "Equation of a Line", syllabusRef: "2(vii)(b)(ii)" },
    { name: "Similarity", syllabusRef: "3(a)" },
    { name: "Loci", syllabusRef: "pre-2027" },
    { name: "Circles", syllabusRef: "3(b)" },
    { name: "Constructions", syllabusRef: "pre-2027" },
    { name: "Mensuration", syllabusRef: "4 + pre-2027 sphere" },
    { name: "Trigonometric Identities", syllabusRef: "5(a)" },
    { name: "Heights and Distances", syllabusRef: "5(b)" },
    { name: "Statistics", syllabusRef: "6" },
    { name: "Probability", syllabusRef: "7" },
  ],
  Physics: [
    { name: "Force", syllabusRef: "1(i)-(ii)" },
    { name: "Work, Energy and Power", syllabusRef: "1(iii)-(iv), (vi)" },
    { name: "Machines", syllabusRef: "1(v)" },
    { name: "Refraction of Light at Plane Surfaces", syllabusRef: "2(i)" },
    { name: "Refraction through a Lens", syllabusRef: "2(ii)" },
    { name: "Spectrum", syllabusRef: "2(iii)" },
    { name: "Sound", syllabusRef: "3" },
    { name: "Current Electricity", syllabusRef: "4(i)" },
    { name: "Household Circuits", syllabusRef: "4(ii)" },
    { name: "Electromagnetism", syllabusRef: "4(iii)" },
    { name: "Calorimetry", syllabusRef: "5" },
    { name: "Radioactivity", syllabusRef: "6" },
  ],
  Chemistry: [
    { name: "Periodic Table, Periodic Properties and Variations", syllabusRef: "1" },
    { name: "Chemical Bonding", syllabusRef: "2" },
    { name: "Acids, Bases and Salts", syllabusRef: "3" },
    { name: "Analytical Chemistry", syllabusRef: "4" },
    { name: "Mole Concept and Stoichiometry", syllabusRef: "5" },
    { name: "Electrolysis", syllabusRef: "6" },
    { name: "Metallurgy", syllabusRef: "7" },
    { name: "Study of Compounds: Hydrogen Chloride", syllabusRef: "8(A)" },
    { name: "Study of Compounds: Ammonia", syllabusRef: "8(B)" },
    { name: "Study of Compounds: Nitric Acid", syllabusRef: "8(C)" },
    { name: "Study of Compounds: Sulphuric Acid", syllabusRef: "8(D)" },
    { name: "Organic Chemistry", syllabusRef: "9" },
  ],
  Biology: [
    { name: "Cell Cycle, Cell Division and Structure of Chromosomes", syllabusRef: "1(i)-(ii)" },
    { name: "Genetics", syllabusRef: "1(iii)" },
    { name: "Absorption by Roots", syllabusRef: "2(i)" },
    { name: "Transpiration", syllabusRef: "2(ii)" },
    { name: "Photosynthesis", syllabusRef: "2(iii)" },
    { name: "Chemical Coordination in Plants", syllabusRef: "2(iv)" },
    { name: "Circulatory System", syllabusRef: "3(i)" },
    { name: "Excretory System", syllabusRef: "3(ii)" },
    { name: "Nervous System and Sense Organs", syllabusRef: "3(iii)" },
    { name: "Endocrine System", syllabusRef: "3(iv)" },
    { name: "Reproductive System", syllabusRef: "3(v)" },
    { name: "Human Evolution", syllabusRef: "pre-2027" },
    { name: "Population", syllabusRef: "4" },
    { name: "Pollution", syllabusRef: "5" },
  ],
};

/** Per chapter, the subtopics a row may be filed under (picked verbatim by agents). */
export const ICSE_10_SUBTOPICS: Record<string, readonly string[]> = {
  // Mathematics
  "Goods and Services Tax": ["Computation of GST", "GST with Discount and Inverse Cases", "Input Tax Credit and Tax Payable"],
  Banking: ["Recurring Deposit: Interest", "Recurring Deposit: Maturity Value and Inverse Cases"],
  "Shares and Dividend": ["Face Value, Market Value and Dividend", "Income and Return on Investment", "Buying and Selling Shares"],
  "Linear Inequations": ["Solving Linear Inequations", "Solution Sets on the Number Line"],
  "Quadratic Equations": ["Nature of Roots", "Solving by Factorisation", "Solving by Formula", "Word Problems on Quadratic Equations"],
  "Ratio and Proportion": ["Proportion, Continued and Mean Proportion", "Componendo and Dividendo and Other Properties"],
  "Factorisation of Polynomials": ["Remainder Theorem", "Factor Theorem", "Complete Factorisation"],
  Matrices: ["Order and Types of Matrices", "Addition and Subtraction of Matrices", "Multiplication of Matrices", "Matrix Equations"],
  "Arithmetic and Geometric Progressions": ["General Term of an AP", "Sum of n Terms of an AP", "Geometric Progression"],
  Reflection: ["Reflection in the Axes and the Origin", "Reflection in Lines x = a and y = a", "Invariant Points and Figures under Reflection"],
  "Section and Mid-point Formula": ["Section Formula", "Mid-point Formula", "Centroid of a Triangle"],
  "Equation of a Line": ["Slope and Inclination", "Slope-Intercept and Two-Point Forms", "Parallel and Perpendicular Lines"],
  Similarity: ["Conditions for Similar Triangles", "Areas of Similar Triangles", "Maps and Models"],
  Loci: ["Locus Theorems", "Constructing a Locus"],
  Circles: ["Angle Properties", "Cyclic Quadrilaterals", "Tangent and Secant Properties", "Intersecting Chords and Tangents"],
  Constructions: ["Tangents to a Circle", "Circumscribed and Inscribed Circles", "Regular Hexagons"],
  Mensuration: ["Cylinder", "Cone", "Sphere and Hemisphere", "Conversion and Combination of Solids"],
  "Trigonometric Identities": ["Proving Identities", "Simplifying Trigonometric Expressions"],
  "Heights and Distances": ["Angles of Elevation and Depression", "Problems with Two Triangles"],
  Statistics: ["Mean of Grouped Data", "Median, Quartiles and Mode", "Histograms and Ogives"],
  Probability: ["Probability of Simple Events", "Cards, Dice and Coins"],
  // Physics
  Force: ["Moment of a Force", "Equilibrium and Principle of Moments", "Centre of Gravity", "Uniform Circular Motion"],
  "Work, Energy and Power": ["Work", "Power", "Kinetic and Potential Energy", "Conservation and Conversion of Energy"],
  Machines: ["Mechanical Advantage, Velocity Ratio and Efficiency", "Levers", "Pulleys"],
  "Refraction of Light at Plane Surfaces": ["Laws of Refraction and Refractive Index", "Refraction through a Glass Slab and Prism", "Real and Apparent Depth", "Total Internal Reflection"],
  "Refraction through a Lens": ["Lenses and Ray Diagrams", "Lens Formula and Magnification", "Power of a Lens and Uses"],
  Spectrum: ["Dispersion of White Light", "Electromagnetic Spectrum", "Scattering of Light"],
  Sound: ["Reflection of Sound and Echoes", "Natural and Forced Vibrations and Resonance", "Characteristics of Sound"],
  "Current Electricity": ["Ohm's Law and Resistance", "Combination of Resistors", "EMF, Terminal Voltage and Internal Resistance", "Electrical Energy and Power"],
  "Household Circuits": ["Power Distribution and House Wiring", "Fuses, Switches and Earthing", "Three-Pin Plugs and Colour Coding"],
  Electromagnetism: ["Magnetic Effect of Current", "Electromagnets and Electric Motor", "Electromagnetic Induction and AC Generator", "Transformers"],
  Calorimetry: ["Heat Capacity and Specific Heat Capacity", "Principle of Calorimetry", "Latent Heat"],
  Radioactivity: ["Structure of the Nucleus", "Alpha, Beta and Gamma Emissions", "Nuclear Energy and Safety"],
  // Chemistry
  "Periodic Table, Periodic Properties and Variations": ["Periods and Groups", "Periodic Properties", "Trends in Groups and Periods"],
  "Chemical Bonding": ["Electrovalent Bonding", "Covalent Bonding", "Coordinate Bonding"],
  "Acids, Bases and Salts": ["Acids and Bases", "pH and Indicators", "Salts and their Preparation"],
  "Analytical Chemistry": ["Action of Alkalis on Metal Salts", "Action of Alkalis on Metals and Oxides"],
  "Mole Concept and Stoichiometry": ["Gay-Lussac's Law and Avogadro's Law", "Mole Concept and Molar Volume", "Empirical and Molecular Formula", "Calculations from Equations"],
  Electrolysis: ["Electrolytes and Non-electrolytes", "Electrolysis of Compounds", "Applications of Electrolysis"],
  Metallurgy: ["Occurrence and Extraction of Metals", "Extraction of Aluminium", "Alloys"],
  "Study of Compounds: Hydrogen Chloride": ["Preparation and Properties of Hydrogen Chloride", "Hydrochloric Acid"],
  "Study of Compounds: Ammonia": ["Preparation of Ammonia", "Properties and Uses of Ammonia"],
  "Study of Compounds: Nitric Acid": ["Preparation of Nitric Acid", "Properties of Nitric Acid"],
  "Study of Compounds: Sulphuric Acid": ["Manufacture of Sulphuric Acid", "Properties of Sulphuric Acid"],
  "Organic Chemistry": ["Hydrocarbons and Homologous Series", "Nomenclature and Isomerism", "Alkanes, Alkenes and Alkynes", "Alcohols and Carboxylic Acids"],
  // Biology
  "Cell Cycle, Cell Division and Structure of Chromosomes": ["Cell Cycle", "Mitosis", "Meiosis", "Structure of Chromosomes"],
  Genetics: ["Mendel's Laws of Inheritance", "Monohybrid and Dihybrid Crosses", "Sex Determination and Sex-linked Inheritance", "Genetic Terms and Mutation"],
  "Absorption by Roots": ["Diffusion, Osmosis and Imbibition", "Absorption of Water by Roots", "Ascent of Sap"],
  Transpiration: ["Process and Significance of Transpiration", "Factors Affecting Transpiration", "Experiments on Transpiration"],
  Photosynthesis: ["Process of Photosynthesis", "Experiments on Photosynthesis", "Adaptations for Photosynthesis"],
  "Chemical Coordination in Plants": ["Tropisms", "Plant Hormones"],
  "Circulatory System": ["Blood and its Components", "The Heart and Cardiac Cycle", "Blood Vessels and Circulation", "Lymphatic System"],
  "Excretory System": ["Organs of Excretion", "Structure and Function of the Kidney"],
  "Nervous System and Sense Organs": ["Neuron and Nerve Impulse", "Brain and Spinal Cord", "Reflex Action", "The Eye", "The Ear"],
  "Endocrine System": ["Endocrine Glands and Hormones", "Hormonal Disorders"],
  "Reproductive System": ["Male and Female Reproductive Organs", "Menstrual Cycle and Fertilisation", "Development and Pregnancy"],
  "Human Evolution": ["Theories and Evidence of Evolution", "Evolution of Man"],
  Population: ["Population Growth and its Control"],
  Pollution: ["Food Chains and Ecosystems", "Air and Water Pollution", "Soil and Noise Pollution", "Effects of Pollution and its Control"],
};
