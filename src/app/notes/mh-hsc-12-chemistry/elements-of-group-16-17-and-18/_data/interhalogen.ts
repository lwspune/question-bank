import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_INTERHALOGEN_NOTE: SubtopicNote = {
  subtopicName: "Interhalogen Compounds",
  title: "Interhalogen Compounds",
  oneLineDefinition:
    "Compounds of two different halogens: their general formula and types, general characteristics, preparation and reactions, and the shapes that follow from the lone pairs on the central halogen.",
  whyItMatters:
    "16 questions. Six were set in board papers: the structure of ClF₃ (2016), what interhalogen compounds are, with the preparation of oxygen from KClO₃ and PbO₂ (2020), the same definition with the action of chlorine on dry slaked lime (2024), their general formula (2025), the shape of BrF₅ (2026) and their general characteristics (2026). The textbook adds their preparation, hydrolysis, stability, lone pairs and shapes.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgp-interhalogen-types",
      name: "Types and general characteristics",
      intuition:
        "Halogens differ in electronegativity, so they can bond to each other. The bigger, less electronegative halogen sits in the middle and the smaller, more electronegative ones gather round it. A halogen has seven valence electrons, an odd number, so it can bond to one, three, five or seven others and still keep all its electrons paired. The bigger the central atom compared with its partners, the more of them fit round it.",
      definition:
        "- An **interhalogen compound** is a neutral compound formed by the combination of atoms of two different halogens. Ions made of different halogens, such as \\(\\text{Cl}_3^-\\) in \\(\\text{K}[\\text{Cl}_3]\\) and \\(\\text{I}_5^-\\) in \\([\\text{NH}_4][\\text{I}_5]\\), are called polyhalide ions.\n" +
        "- **General formula \\(\\text{XX}'_n\\):** X is the larger, more electropositive halogen (the central atom); X′ is the smaller, more electronegative one; \\(n = 1, 3, 5\\) or 7. The compound is named as the halide of X, so ClF is chlorine monofluoride. Fluorine is never the central atom.\n" +
        "- **General characteristics.** The value of n increases as the ratio of the radius of X to that of X′ increases.\n" +
        "- They have an even number of atoms: 2, 4, 6 or 8.\n" +
        "- Their properties are generally intermediate between those of the parent halogens.\n" +
        "- The central halogen shows different oxidation states in different compounds.\n" +
        "- The number of X′ atoms is always odd.\n" +
        "- They are all diamagnetic.\n" +
        "- XX′ compounds are more reactive than \\(\\text{X}_2\\) or \\(\\text{X}'_2\\), because the polar X-X′ bond is weaker.\n" +
        "- **Uses:** ICl in glacial acetic acid (Wijs solution) determines the iodine value of oils; \\(\\text{XX}'_3\\) compounds are fluorinating agents, non-aqueous solvents and are used to prepare polyhalides.",
      table: {
        columns: ["Type", "Examples", "Oxidation state of X", "Lone pairs on X"],
        rows: [
          {
            cells: ["\\(\\text{XX}'\\)", "ClF, BrF, BrCl, ICl, IBr", "\\(+1\\)", "3"],
            pyqExampleId: "9a47327f-feba-4afd-8742-486947fb79ad",
            noteAmber: "Board 2024 (and 2020) asked what interhalogen compounds are.",
          },
          {
            cells: ["\\(\\text{XX}'_3\\)", "\\(\\text{ClF}_3\\), \\(\\text{BrF}_3\\), \\(\\text{IF}_3\\), \\(\\text{ICl}_3\\)", "\\(+3\\)", "2"],
            pyqExampleId: "27740380-ba1a-481c-8f32-ac1832aaddfc",
            noteAmber: "Board 2025 asked which general formula is possible.",
          },
          { cells: ["\\(\\text{XX}'_5\\)", "\\(\\text{ClF}_5\\), \\(\\text{BrF}_5\\), \\(\\text{IF}_5\\)", "\\(+5\\)", "1"] },
          { cells: ["\\(\\text{XX}'_7\\)", "\\(\\text{IF}_7\\)", "\\(+7\\)", "0"] },
        ],
      },
      practiceSet: [
        { prompt: "What is Wijs solution, and what is it used for?", answer: "Iodine monochloride in glacial acetic acid; it is used to find the iodine value of an oil" },
        { prompt: "Name BrF₃.", answer: "Bromine trifluoride" },
        { prompt: "Are interhalogen compounds paramagnetic or diamagnetic?", answer: "All are diamagnetic" },
        { prompt: "Why does iodine form IF₇ while chlorine forms no ClF₇?", answer: "n grows with the radius ratio of X to X′; only the large iodine atom has room for seven fluorines" },
      ],
      pyqExampleId: "27740380-ba1a-481c-8f32-ac1832aaddfc",
      traps: [
        {
          title: "Even atoms, odd partners",
          body: "The total number of atoms is even (2, 4, 6, 8) while the number of X′ atoms is odd (1, 3, 5, 7). A formula with an even number of X′ atoms cannot be an interhalogen.",
        },
        {
          title: "Naming from the wrong end",
          body: "Name the compound as the halide of the larger halogen: ClF is chlorine monofluoride, never fluorine monochloride.",
        },
        {
          title: "General characteristics are a list",
          body: "Board 2026 asked for general characteristics. Write the textbook's points (formula and n, even atoms, odd X′, intermediate properties, varying oxidation states, diamagnetic), not just 'they are reactive'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-interhalogen-reactions",
      name: "Preparation and reactions of interhalogens",
      intuition:
        "Most interhalogens are made simply by mixing the two halogens; how much of each you take decides the product. In water an interhalogen splits so that the larger halogen ends up in the oxoacid and the smaller, more electronegative one in the halogen acid. It is the same split you would expect from the polar X-X′ bond: X carries the positive end.",
      definition:
        "- **Direct combination:** equal volumes give XX′ (\\(\\text{Cl}_2 + \\text{F}_2 \\xrightarrow{523\\ \\text{K},\\ \\text{Cu vessel}} 2\\text{ClF}\\); \\(\\text{I}_2 + \\text{Cl}_2 \\longrightarrow 2\\text{ICl}\\)). An excess of the smaller halogen gives a higher compound: \\(\\text{Cl}_2 + 3\\text{F}_2 \\longrightarrow 2\\text{ClF}_3\\), \\(\\text{Br}_2 + 3\\text{F}_2 \\longrightarrow 2\\text{BrF}_3\\), \\(\\text{I}_2 + 3\\text{Cl}_2 \\longrightarrow 2\\text{ICl}_3\\).\n" +
        "- **Halogen with an interhalogen:** \\(\\text{Br}_2 + \\text{BrF}_3 \\longrightarrow 3\\text{BrF}\\). **Special reaction for ICl:** \\(\\text{I}_2 + \\text{KClO}_3 \\longrightarrow \\text{ICl} + \\text{KIO}_3\\).\n" +
        "- **Hydrolysis:** oxoacid of the larger halogen and halogen acid of the smaller: \\(\\text{BrCl} + \\text{H}_2\\text{O} \\longrightarrow \\text{HOBr} + \\text{HCl}\\); \\(2\\text{ICl}_3 + 3\\text{H}_2\\text{O} \\longrightarrow \\text{HIO}_3 + 5\\text{HCl} + \\text{ICl}\\).\n" +
        "- **Disproportionation:** \\(5\\text{BrF} \\longrightarrow 2\\text{Br}_2 + \\text{BrF}_5\\); \\(\\text{ICl}_3 \\xrightarrow{341\\ \\text{K}} \\text{ICl} + \\text{Cl}_2\\).\n" +
        "- **Addition across a double bond:** \\(\\text{H}_2\\text{C}=\\text{CH}_2 + \\text{ICl} \\longrightarrow \\text{ICH}_2-\\text{CH}_2\\text{Cl}\\).\n" +
        "- **Thermal stability:** \\(\\text{ClF} > \\text{ICl} > \\text{IBr} > \\text{BrCl} > \\text{BrF}\\).",
      formula: {
        label: "Hydrolysis of an interhalogen",
        latex: "\\text{XX}' + \\text{H}_2\\text{O} \\longrightarrow \\text{HOX} + \\text{HX}'",
      },
      authoredExample: {
        prompt: "Complete and balance the hydrolysis of iodine monochloride, 5ICl + 3H₂O, and the fluorination of uranium by ClF₃.",
        steps: [
          "Hydrolysis puts iodine, the larger halogen, into an oxoacid: \\(5\\text{ICl} + 3\\text{H}_2\\text{O} \\longrightarrow \\text{HIO}_3 + 5\\text{HCl} + 2\\text{I}_2\\).",
          "Check: I \\(5 = 1 + 4\\); Cl 5; H \\(6 = 1 + 5\\); O 3. Balanced.",
          "\\(\\text{ClF}_3\\) is a fluorinating agent: \\(\\text{U} + 3\\text{ClF}_3 \\longrightarrow \\text{UF}_6 + 3\\text{ClF}\\).",
          "Check: 1 U; Cl 3; F \\(9 = 6 + 3\\). Balanced.",
        ],
        answer: "5ICl + 3H₂O → HIO₃ + 5HCl + 2I₂; U + 3ClF₃ → UF₆ + 3ClF",
      },
      selfCheckExample: {
        prompt: "What is formed when bromine reacts with bromine trifluoride? Write the balanced equation.",
        steps: ["\\(\\text{Br}_2 + \\text{BrF}_3 \\longrightarrow 3\\text{BrF}\\).", "Check: 3 Br and 3 F on each side."],
        answer: "Bromine monofluoride, BrF",
      },
      practiceSet: [
        { prompt: "Write the special reaction for preparing ICl.", answer: "\\(\\text{I}_2 + \\text{KClO}_3 \\longrightarrow \\text{ICl} + \\text{KIO}_3\\)" },
        { prompt: "What does BrF give when it disproportionates?", answer: "Bromine and bromine pentafluoride: \\(5\\text{BrF} \\longrightarrow 2\\text{Br}_2 + \\text{BrF}_5\\)" },
        { prompt: "Write the product of adding ICl to ethene.", answer: "\\(\\text{ICH}_2-\\text{CH}_2\\text{Cl}\\)" },
        { prompt: "Which is the most stable of ClF, ICl, IBr, BrCl and BrF?", answer: "ClF" },
      ],
      pyqExampleId: "2ebf22f5-a1d9-4ee9-a9e1-2f2cfd7a3779",
      traps: [
        {
          title: "Hydrolysis the wrong way round",
          body: "BrCl gives HOBr and HCl, not HOCl and HBr. The larger halogen goes into the oxoacid.",
        },
        {
          title: "Iodine both ways in ICl hydrolysis",
          body: "When ICl is hydrolysed, iodine ends up both in iodic acid and as free iodine. Leave out the \\(\\text{I}_2\\) and the equation cannot balance.",
        },
        {
          title: "Proportions decide the product",
          body: "Two halogens in equal volumes give the XX′ compound; an excess of the smaller halogen gives \\(\\text{XX}'_3\\). State the proportion along with the product.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-interhalogen-shapes",
      name: "Shapes of interhalogen compounds",
      intuition:
        "Count the electron pairs round the central halogen, bonds and lone pairs together, and they spread out as far apart as they can. The lone pairs take the roomiest places. The shape you name, though, comes from where the atoms are, so the lone pairs vanish from the name: five pairs with two lone pairs make a T, six pairs with one lone pair make a square pyramid.",
      definition:
        "- The central halogen X has 7 valence electrons. In \\(\\text{XX}'_n\\), n of them form bonds and the rest form \\((7 - n)/2\\) lone pairs.\n" +
        "- Total electron pairs: 4 gives a tetrahedral arrangement \\((sp^3)\\), 5 a trigonal bipyramid \\((sp^3d)\\), 6 an octahedron \\((sp^3d^2)\\).\n" +
        "- In a trigonal bipyramid the lone pairs take the **equatorial** positions.\n" +
        "- **Shapes (textbook Table 7.11):** ICl linear; \\(\\text{ClF}_3\\) bent T-shaped (F-Cl-F about 89°); \\(\\text{BrF}_3\\) bent T-shaped (about 86°); \\(\\text{BrF}_5\\) and \\(\\text{ClF}_5\\) square pyramidal.\n" +
        "- The same count works for polyhalide ions, remembering the charge: \\([\\text{I}_3]^-\\) is linear and \\([\\text{BrF}_4]^-\\) is square planar.",
      formula: {
        label: "Lone pairs on the central halogen",
        latex: "\\text{lone pairs} = \\frac{7 - n}{2}, \\qquad \\text{electron pairs} = n + \\frac{7 - n}{2}",
      },
      authoredExample: {
        prompt: "Explain the shape of BrF₃.",
        steps: [
          "Bromine has 7 valence electrons; 3 form bonds with the three fluorines.",
          "Lone pairs \\(= (7 - 3)/2 = 2\\). Electron pairs \\(= 3 + 2 = 5\\), so bromine is \\(sp^3d\\) hybridised and the pairs point to the corners of a trigonal bipyramid.",
          "The two lone pairs take equatorial positions; the three fluorines occupy one equatorial and two axial positions.",
          "The molecule is bent T-shaped; lone pair repulsion closes the F-Br-F angle to about 86°.",
        ],
        answer: "Bent T-shaped (3 bond pairs, 2 lone pairs, sp³d)",
      },
      selfCheckExample: {
        prompt: "How many lone pairs are on iodine in ICl, and what is the shape of the molecule?",
        steps: ["Lone pairs \\(= (7 - 1)/2 = 3\\).", "A diatomic molecule is always linear."],
        answer: "Three lone pairs; linear",
      },
      practiceSet: [
        { prompt: "Which interhalogen has no lone pair on its central atom?", answer: "\\(\\text{IF}_7\\)" },
        { prompt: "How many electron pairs surround chlorine in ClF₃?", answer: "Five (3 bond pairs and 2 lone pairs)" },
        { prompt: "What hybridisation fits six electron pairs?", answer: "\\(sp^3d^2\\)" },
        { prompt: "What is the shape of the [I₃]⁻ ion?", answer: "Linear" },
      ],
      pyqExampleId: "407c14a6-f2e8-4ebe-ba36-717a92f7b1f6",
      traps: [
        {
          title: "Naming the arrangement instead of the shape",
          body: "In \\(\\text{ClF}_3\\) the electron pairs form a trigonal bipyramid, but the molecule is bent T-shaped. Name the shape from the atoms.",
        },
        {
          title: "Lone pairs go equatorial",
          body: "In a trigonal bipyramid the lone pairs sit in the equatorial plane, where they have more room. Putting them axial gives the wrong shape.",
        },
      ],
    },
  ],
};
