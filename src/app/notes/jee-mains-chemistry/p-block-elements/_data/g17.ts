import type { SubtopicNote } from "@/app/notes/_types";

export const G17_PB_NOTE: SubtopicNote = {
  subtopicName: "Groups 17 and 18: Halogens and Noble Gases",
  title: "Groups 17 and 18: Halogens and Noble Gases",
  oneLineDefinition:
    "Fluorine, chlorine, bromine and iodine (ns² np⁵), their redox chemistry, oxoacids and interhalogen compounds, and the xenon fluorides of the noble gases, whose shapes follow from counting lone pairs.",
  whyItMatters:
    "Thirty-five PYQs, twenty-nine of them multiple choice, and four from 2026: the largest page of the chapter. Nine test halogen properties such as bond enthalpy, electron gain enthalpy and the boiling points of HX; thirteen are halogen redox, from disproportionation to the silver-halide and chlorine tests; thirteen cover interhalogen shapes, halogen oxoacids and oxides, and the xenon fluorides.",
  concepts: [
    // C1 — halogen properties
    {
      kind: "reference" as const,
      slug: "jcpb-halogen-properties",
      name: "Halogen properties: bond enthalpy, electron gain enthalpy and hydrogen halides",
      intuition:
        "Most halogen properties change smoothly down the group, but fluorine breaks two of them because it is so small. Its lone pairs crowd each other in F₂, so the F–F bond is weaker than Cl–Cl and even Br–Br. And an incoming electron is squeezed into fluorine's compact 2p shell, so chlorine, not fluorine, releases the most energy on gaining an electron. The hydrogen halides follow size, except that HF is lifted by hydrogen bonding: it boils highest, though HI still melts highest.",
      definition:
        "- **Bond enthalpy:** \\(\\mathrm{Cl_2 > Br_2 > F_2 > I_2}\\).\n" +
        "- **Electron gain enthalpy (most negative first):** \\(\\mathrm{Cl > F > Br > I}\\). Of covalent radius, ionic radius, ionisation enthalpy and electron gain enthalpy, only the last is irregular for F, Cl, Br, I.\n" +
        "- **Fluorine** shows only −1, being the most electronegative element with no d orbitals.\n" +
        "- **HX boiling point:** \\(\\mathrm{HCl < HBr < HI < HF}\\). **Melting point:** \\(\\mathrm{HCl < HBr < HF < HI}\\).\n" +
        "- **Covalent character** of a metal halide rises with the metal's oxidation state: \\(\\mathrm{SnCl_4 > SnCl_2}\\), \\(\\mathrm{PbCl_4 > PbCl_2}\\), \\(\\mathrm{UF_6 > UF_4}\\).\n" +
        "- **With oxygen:** halogens form oxides, but most are unstable; they do not combine easily and directly with oxygen.",
      table: {
        columns: ["Halogen (hydride)", "X–X bond enthalpy (kJ/mol)", "Electron gain enthalpy (kJ/mol)", "HX boiling point (K)", "HX melting point (K)"],
        rows: [
          { cells: ["F (HF)", "158.8", "\\(-333\\)", "293", "190"], noteAmber: "Weak F–F bond and a less negative electron gain enthalpy than Cl: both from fluorine's small size." },
          { cells: ["Cl (HCl)", "242.6", "\\(-349\\)", "189", "159"] },
          { cells: ["Br (HBr)", "192.8", "\\(-325\\)", "206", "185"] },
          { cells: ["I (HI)", "151.1", "\\(-296\\)", "238", "222"] },
        ],
        caption: "Chlorine leads in both bond enthalpy and electron gain enthalpy. HF boils highest; HI melts highest.",
      },
      selfCheckExample: {
        prompt: "Which halogen has the most negative electron gain enthalpy, and why is fluorine's value less negative than expected?",
        steps: [
          "Down the group the value normally becomes less negative, which would put fluorine first.",
          "Fluorine's 2p shell is very compact, so an added electron is strongly repelled by the electrons already there.",
        ],
        answer: "Chlorine; the small 2p shell of fluorine repels the incoming electron.",
      },
      practiceSet: [
        { prompt: "Which halogen molecule has the highest bond dissociation enthalpy?", answer: "\\(\\mathrm{Cl_2}\\)" },
        { prompt: "Which halogen does not show variable oxidation states?", answer: "Fluorine" },
        { prompt: "Which is more covalent, \\(\\mathrm{UF_4}\\) or \\(\\mathrm{UF_6}\\)?", answer: "\\(\\mathrm{UF_6}\\)" },
        { prompt: "Which hydrogen halide has the lowest boiling point?", answer: "HCl" },
      ],
      pyqExampleId: "95a82c2f-af13-4939-92be-0cc87dfbcf15", // 28 Jan 2026 S2 — boiling and melting point orders of HX
      traps: [
        {
          title: "F₂ does not have the highest bond enthalpy",
          body: "Lone-pair repulsion between the two small fluorine atoms weakens the F–F bond. The order is \\(\\mathrm{Cl_2 > Br_2 > F_2 > I_2}\\), so chlorine is highest.",
        },
        {
          title: "HF boils highest but does not melt highest",
          body: "Hydrogen bonding lifts HF's boiling point above HI's. For melting points the larger dispersion forces in HI win, so HI melts highest: \\(\\mathrm{HCl < HBr < HF < HI}\\).",
        },
        {
          title: "Chlorine, not fluorine, has the most negative electron gain enthalpy",
          body: "The order of the magnitudes is \\(\\mathrm{Cl > F > Br > I}\\). A statement that it is F > Cl > Br > I is false.",
        },
      ],
    },

    // C2 — halogen redox
    {
      kind: "formula" as const,
      slug: "jcpb-halogen-redox",
      name: "Oxidising power and disproportionation of the halogens",
      intuition:
        "A halogen's oxidising power is its hunger for an electron in water, measured by its reduction potential, and it falls from F₂ to I₂. So a halogen higher in the group pushes a lower one out of its salt: chlorine water releases bromine from bromide and iodine from iodide. Iodide sits at the bottom, so it is the best reducing agent: it alone reduces Cu²⁺ and Fe³⁺, and it alone is oxidised by air in acid. A species can disproportionate only if the halogen can go both up and down from where it is, so F₂ (which can only go down) and perhalates (which can only go down) never do.",
      definition:
        "- **Oxidising power:** \\(\\mathrm{F_2 > Cl_2 > Br_2 > I_2}\\); \\(E^\\circ\\) = 2.87, 1.36, 1.09 and 0.54 V. This is the basis of the layer test.\n" +
        "- **Disproportionation:** \\(\\mathrm{Cl_2}\\), \\(\\mathrm{Br_2}\\), \\(\\mathrm{I_2}\\) do; \\(\\mathrm{F_2}\\) does not. \\(\\mathrm{ClO^-}\\), \\(\\mathrm{ClO_2^-}\\), \\(\\mathrm{ClO_3^-}\\) can; \\(\\mathrm{ClO_4^-}\\) and \\(\\mathrm{BrO_4^-}\\), at +7, cannot.\n" +
        "- **Chlorine with alkali:** cold and dilute gives chloride and hypochlorite (1 : 1); hot and concentrated gives chloride and chlorate.\n" +
        "- **Iodide as reductant:** \\(\\mathrm{2Cu^{2+} + 4I^- \\rightarrow Cu_2I_2 + I_2}\\); \\(\\mathrm{4I^- + 4H^+ + O_2 \\rightarrow 2I_2 + 2H_2O}\\). \\(\\mathrm{FeX_2}\\) is known for all four halogens, \\(\\mathrm{FeX_3}\\) for F, Cl and Br only.\n" +
        "- **Iodine with concentrated nitric acid:** \\(\\mathrm{I_2 + 10HNO_3 \\rightarrow 2HIO_3 + 10NO_2 + 4H_2O}\\).\n" +
        "- **Chloride test:** \\(\\mathrm{4NaCl + MnO_2 + 4H_2SO_4 \\rightarrow MnCl_2 + 4NaHSO_4 + 2H_2O + Cl_2}\\), a greenish-yellow gas.\n" +
        "- **Silver halides:** AgCl white, soluble in \\(\\mathrm{NH_4OH}\\); AgBr pale yellow, sparingly soluble; AgI yellow, insoluble.\n" +
        "- **Concentrated \\(\\mathrm{H_2SO_4}\\)** gives coloured vapours with bromide (\\(\\mathrm{Br_2}\\)), iodide (\\(\\mathrm{I_2}\\)) and nitrate (\\(\\mathrm{NO_2}\\)), but only colourless HF with fluoride.",
      formula: {
        label: "Chlorine with alkali",
        latex:
          "\\mathrm{Cl_2 + 2OH^- \\xrightarrow{\\text{cold, dilute}} Cl^- + ClO^- + H_2O} \\qquad \\mathrm{3Cl_2 + 6OH^- \\xrightarrow{\\text{hot, conc.}} 5Cl^- + ClO_3^- + 3H_2O}",
      },
      authoredExample: {
        prompt:
          "0.30 mol of chlorine gas is passed into 1.0 L of cold 1.0 M NaOH. Find the concentrations of \\(\\mathrm{Cl^-}\\), \\(\\mathrm{ClO^-}\\) and \\(\\mathrm{OH^-}\\) after the reaction, taking the volume as constant.",
        steps: [
          "Cold, dilute alkali: \\(\\mathrm{Cl_2 + 2OH^- \\rightarrow Cl^- + ClO^- + H_2O}\\).",
          "Hydroxide present: 1.0 mol. Chlorine is the limiting reagent: 0.30 mol uses \\(2 \\times 0.30 = 0.60\\) mol of \\(\\mathrm{OH^-}\\).",
          "Products: 0.30 mol \\(\\mathrm{Cl^-}\\) and 0.30 mol \\(\\mathrm{ClO^-}\\). Hydroxide left: \\(1.0 - 0.60 = 0.40\\) mol.",
          "In 1.0 L these are the molarities.",
        ],
        answer: "\\(\\mathrm{[Cl^-] = 0.30\\ M}\\), \\(\\mathrm{[ClO^-] = 0.30\\ M}\\), \\(\\mathrm{[OH^-] = 0.40\\ M}\\).",
      },
      selfCheckExample: {
        prompt: "Bromine water is added to potassium iodide solution and the mixture is shaken with chloroform. What colour does the chloroform layer turn, and why?",
        steps: [
          "Bromine is a stronger oxidant than iodine, so it oxidises iodide: \\(\\mathrm{Br_2 + 2I^- \\rightarrow 2Br^- + I_2}\\).",
          "Iodine dissolves in chloroform with a violet colour.",
        ],
        answer: "Violet, from iodine displaced by bromine.",
      },
      practiceSet: [
        { prompt: "Which of \\(\\mathrm{F_2}\\), \\(\\mathrm{Cl_2}\\), \\(\\mathrm{Br_2}\\), \\(\\mathrm{I_2}\\) cannot disproportionate?", answer: "\\(\\mathrm{F_2}\\)" },
        { prompt: "Which halide ion reduces \\(\\mathrm{Cu^{2+}}\\) to a copper(I) salt?", answer: "Iodide" },
        { prompt: "What does concentrated nitric acid oxidise iodine to?", answer: "Iodic acid, \\(\\mathrm{HIO_3}\\)" },
        { prompt: "Which silver halide is pale yellow and dissolves only with difficulty in ammonia?", answer: "AgBr" },
      ],
      pyqExampleId: "169827c4-a6b4-448e-8e63-099db0e4d846", // 24 Jan 2026 S2 — Cl₂ into cold KOH: concentrations after reaction
      traps: [
        {
          title: "Cold dilute alkali gives hypochlorite, not chlorate",
          body: "Chlorine with cold, dilute alkali gives \\(\\mathrm{Cl^-}\\) and \\(\\mathrm{ClO^-}\\) in a 1 : 1 ratio. Chlorate, \\(\\mathrm{ClO_3^-}\\), forms only with hot, concentrated alkali.",
        },
        {
          title: "A +7 oxoanion cannot disproportionate",
          body: "Disproportionation needs an intermediate state, so the halogen can be both oxidised and reduced. In \\(\\mathrm{ClO_4^-}\\) or \\(\\mathrm{BrO_4^-}\\) the halogen is already at +7, its highest state.",
        },
        {
          title: "FeI₃ does not exist",
          body: "Iron(III) is a strong enough oxidant to turn iodide into iodine, so it cannot sit beside three iodides. \\(\\mathrm{FeI_2}\\) is known, but \\(\\mathrm{FeX_3}\\) exists only for F, Cl and Br.",
        },
      ],
    },

    // C3 — interhalogens, halogen oxoacids and oxides, xenon compounds
    {
      kind: "formula" as const,
      slug: "jcpb-interhalogens-noble",
      name: "Interhalogen shapes, halogen oxoacids and xenon fluorides",
      intuition:
        "In an interhalogen XX′ₙ the central halogen X has seven valence electrons. It uses n of them to bond, so the other 7 − n form (7 − n)/2 lone pairs; n is always odd so that every electron pairs. Lone pairs plus bonds give the electron-pair geometry, and the lone pairs take the positions that leave the shape: 3 lone pairs make XX′ linear, 2 make XX′₃ T-shaped, 1 makes XX′₅ square pyramidal, and 0 makes IF₇ pentagonal bipyramidal. Xenon has eight valence electrons, so the same count gives (8 − n)/2 lone pairs for XeFₙ.",
      definition:
        "- **Shapes:** XX′ linear; XX′₃ T-shaped (\\(sp^3d\\)); XX′₅ square pyramidal (\\(sp^3d^2\\): \\(\\mathrm{ClF_5}\\), \\(\\mathrm{BrF_5}\\), \\(\\mathrm{IF_5}\\)); \\(\\mathrm{IF_7}\\) pentagonal bipyramidal (\\(sp^3d^3\\)).\n" +
        "- **Bromine with excess fluorine** gives \\(\\mathrm{BrF_5}\\), an interhalogen with bromine at +5.\n" +
        "- **Halogen oxoacids:** fluorine forms only \\(\\mathrm{HOF}\\). Halic(V) acids \\(\\mathrm{HXO_3}\\) exist for Cl, Br and I. Cl=O bonds: \\(\\mathrm{HClO_2}\\) 1, \\(\\mathrm{HClO_3}\\) 2, \\(\\mathrm{HClO_4}\\) 3.\n" +
        "- **Halogen oxides:** higher oxides are more stable than lower ones; stability I > Cl > Br. \\(\\mathrm{O_2F_2}\\) removes plutonium from spent fuel as \\(\\mathrm{PuF_6}\\).\n" +
        "- **Noble gases** are monatomic, held only by weak dispersion forces, so they have very LOW boiling points.\n" +
        "- **Xenon fluorides:** \\(\\mathrm{XeF_2}\\) linear, \\(\\mathrm{XeF_4}\\) square planar, \\(\\mathrm{XeF_6}\\) distorted octahedral. \\(\\mathrm{XeF_4 + SbF_5 \\rightarrow [XeF_3]^+[SbF_6]^-}\\); \\(\\mathrm{6XeF_4 + 12H_2O \\rightarrow 4Xe + 2XeO_3 + 24HF + 3O_2}\\).",
      formula: {
        label: "Lone pairs on the central atom",
        latex:
          "\\mathrm{XX'_n}:\\ \\text{lone pairs on X} = \\dfrac{7-n}{2},\\ n = 1, 3, 5, 7 \\qquad \\mathrm{XeF_n}:\\ \\text{lone pairs on Xe} = \\dfrac{8-n}{2}",
      },
      authoredExample: {
        prompt: "Find the number of lone pairs on the central atom and the shape of \\(\\mathrm{IF_3}\\) and of \\(\\mathrm{BrCl}\\).",
        steps: [
          "\\(\\mathrm{IF_3}\\): \\(n = 3\\), lone pairs \\(= (7 - 3)/2 = 2\\). Three bonds and two lone pairs make five pairs, trigonal bipyramidal; the lone pairs sit in equatorial positions, so the shape is T.",
          "\\(\\mathrm{BrCl}\\): \\(n = 1\\), lone pairs \\(= (7 - 1)/2 = 3\\). A diatomic molecule is linear.",
        ],
        answer: "\\(\\mathrm{IF_3}\\): 2 lone pairs, T-shaped. \\(\\mathrm{BrCl}\\): 3 lone pairs, linear.",
      },
      selfCheckExample: {
        prompt: "How many lone pairs are on xenon in \\(\\mathrm{XeF_4}\\), and what is its shape?",
        steps: [
          "Lone pairs \\(= (8 - 4)/2 = 2\\).",
          "Four bonds and two lone pairs make six pairs, octahedral; the lone pairs sit opposite each other.",
        ],
        answer: "2 lone pairs; square planar.",
      },
      practiceSet: [
        { prompt: "What is the shape of \\(\\mathrm{IF_7}\\)?", answer: "Pentagonal bipyramidal" },
        { prompt: "What is the only oxoacid of fluorine?", answer: "Hypofluorous acid, \\(\\mathrm{HOF}\\)" },
        { prompt: "How many Cl=O bonds are in perchloric acid?", answer: "3" },
        { prompt: "What is the oxidation state of xenon in the xenon oxide formed when \\(\\mathrm{XeF_4}\\) is hydrolysed?", answer: "+6, in \\(\\mathrm{XeO_3}\\)" },
      ],
      pyqExampleId: "249ea3db-6905-47ab-9070-42b297d5da11", // 28 Jul 2022 — how many of eight interhalogens are square pyramidal
      traps: [
        {
          title: "XX′₅ is square pyramidal, not trigonal bipyramidal",
          body: "Five bonds and one lone pair make six electron pairs. The pairs point to the corners of an octahedron, and with one corner held by the lone pair the atoms form a square pyramid.",
        },
        {
          title: "An interhalogen is not a halate",
          body: "\\(\\mathrm{BrF_5}\\) has bromine at +5, the same oxidation state as bromate, \\(\\mathrm{BrO_3^-}\\), but it is an interhalogen compound, not an oxoanion.",
        },
        {
          title: "Noble gases have very low boiling points",
          body: "Their atoms attract each other only by weak dispersion forces. That is why they liquefy only at very low temperatures, so any statement that they have high boiling points is false.",
        },
      ],
    },
  ],
};
