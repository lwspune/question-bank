import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/jee-mains-chemistry/hydrocarbons";

export const AROMATICITY_HC_NOTE: SubtopicNote = {
  subtopicName: "Benzene and Aromaticity",
  title: "Benzene and Aromaticity",
  oneLineDefinition:
    "Benzene's six π electrons are spread over a planar ring of six sp² carbons, which makes it far more stable than three separate double bonds; any ring that is cyclic, planar, fully conjugated and holds 4n + 2 π electrons shares that stability.",
  whyItMatters:
    "Twenty-two PYQs, nineteen of them multiple choice, and one from 2026. Four are about the structure of benzene: resonance, its Kekulé forms, its addition of chlorine in sunlight and what counts as benzenoid. Thirteen ask which rings or ions are aromatic, or how many in a list are. Five rank species by stability or acidity, or pick the one aromatic species. Three of the twenty-two ask for a number.",
  concepts: [
    // C1 — structure of benzene
    {
      kind: "reference" as const,
      slug: "jchc-benzene-structure",
      name: "The structure of benzene",
      intuition:
        "Kekulé drew benzene with alternating single and double bonds, but that picture fails: all six C–C bonds are the same length, and benzene resists addition. The truth is a resonance hybrid. Each carbon is sp² and gives one p orbital, and the six p orbitals overlap all round the ring into one π cloud above and below the plane, held by all six nuclei. That spreading of charge is the source of its extra stability.",
      definition:
        "- All six C–C bonds are 139 pm, between C–C (154 pm) and C=C (133 pm). All angles are 120°.\n" +
        "- Benzene is about 150 kJ mol⁻¹ more stable than the imaginary cyclohexatriene (resonance energy, from heats of hydrogenation).\n" +
        "- It prefers substitution to addition, but in sunlight it adds three Cl₂: \\(\\mathrm{C_6H_6 + 3Cl_2 \\xrightarrow{h\\nu} C_6H_6Cl_6}\\) (benzene hexachloride, BHC). It adds 3 H₂ with Ni at high temperature and pressure, giving cyclohexane.\n" +
        "- Ozonolysis of benzene gives 3 mol of glyoxal, OHC–CHO.\n" +
        "- A benzenoid compound contains a benzene ring; a non-benzenoid aromatic (tropolone, azulene) is aromatic without one.",
      table: {
        columns: ["Evidence", "Kekulé cyclohexatriene predicts", "Benzene shows", "Conclusion"],
        rows: [
          { cells: ["C–C bond lengths", "Three of 154 pm and three of 133 pm", "Six equal bonds of 139 pm", "Electrons are delocalised"] },
          { cells: ["Heat of hydrogenation", "About 3 × 120 = 360 kJ mol⁻¹", "About 208 kJ mol⁻¹", "Extra stability of about 150 kJ mol⁻¹"] },
          { cells: ["Reaction with Br₂", "Quick addition like an alkene", "Substitution, and only with a Lewis acid", "The π system resists addition"] },
          { cells: ["Isomers of o-dibromobenzene", "Two (Br across a single or a double bond)", "Only one", "The two Kekulé forms are one molecule"] },
        ],
        caption: "Every measurement says the bonds are equal: the two Kekulé structures are resonance forms, not isomers.",
      },
      selfCheckExample: {
        prompt: "What does benzene give on ozonolysis followed by Zn/H₂O, and in what amount?",
        steps: [
          "Cutting the three C=C of one Kekulé form gives three two-carbon pieces, each with two C=O groups.",
          "Each piece is glyoxal, OHC–CHO; the other Kekulé form gives the same pieces.",
        ],
        answer: "3 mol of glyoxal per mole of benzene",
      },
      practiceSet: [
        { prompt: "What is the hybridisation of each carbon in benzene?", answer: "sp²" },
        { prompt: "What is the C–C bond length in benzene?", answer: "139 pm" },
        { prompt: "How many chlorine atoms does benzene hexachloride contain?", answer: "6" },
        { prompt: "Is cyclooctatetraene a benzenoid compound?", answer: "No; it has no benzene ring" },
      ],
      pyqExampleId: "0819984d-a135-4aca-9f09-5b4a892cea73", // 2023 — why benzene is more stable than cyclohexatriene
      traps: [
        {
          title: "Kekulé forms matter for a substituted benzene",
          body: "For o-xylene the two Kekulé forms put the C=C in different places relative to the methyls, so its ozonolysis gives glyoxal, methylglyoxal and dimethylglyoxal together. The real molecule gives all three.",
        },
        {
          title: "Benzene does add, but only under force",
          body: "Resisting addition is not the same as never adding. Sunlight with Cl₂, or H₂ with Ni under pressure, adds three molecules at once.",
        },
      ],
    },

    // C2 — Hückel counting
    {
      kind: "formula" as const,
      slug: "jchc-huckel-count",
      name: "Deciding aromaticity: Hückel's rule",
      intuition:
        "Check four things in order. Is it a ring? Is every ring atom sp² or sp, with a p orbital (a C=C, a cation, an anion or a lone pair)? Is the ring flat? Then count the π electrons in the ring's loop of p orbitals. If all four hold and the count is 2, 6, 10, 14 …, the ring is aromatic. If it is planar and conjugated with 4, 8 … electrons, it is antiaromatic. If any ring atom is sp³, or the ring is not flat, it is simply non-aromatic.",
      definition:
        "- Count 2 for each ring C=C, 2 for a ring carbanion, 0 for a ring carbocation, and 2 for an O, N or S lone pair only if that lone pair is needed to complete the loop (pyrrole's N and furan's O yes; pyridine's N lone pair is in the plane and not counted).\n" +
        "- Only π electrons IN the ring count: an exocyclic C=O or C=C adds nothing to the ring's count.\n" +
        "- Aromatic: benzene, naphthalene, anthracene, pyridine, pyrrole, furan, thiophene, cyclopentadienyl anion, tropylium cation, cyclopropenyl cation, [14]annulene.\n" +
        "- Non-aromatic: cyclooctatetraene (tub-shaped), cis-[10]annulene (not planar), cyclopentadiene and cycloheptatriene (sp³ CH₂).\n" +
        "- Antiaromatic (planar, 4n): cyclobutadiene, cyclopentadienyl cation, cyclopropenyl anion.",
      formula: {
        label: "Hückel's rule",
        latex: "N_{\\pi} = 4n + 2\\quad (n = 0, 1, 2, \\ldots)\\ \\Rightarrow\\ N_{\\pi} = 2,\\ 6,\\ 10,\\ 14",
        symbols: [
          { symbol: "N_π", meaning: "π electrons in the closed ring of p orbitals" },
        ],
      },
      authoredExample: {
        prompt: "How many of these are aromatic: cyclopentadienyl anion, tropylium cation, cyclopropenyl anion, cyclooctatetraene, pyrrole, cyclopentadiene?",
        steps: [
          "Cyclopentadienyl anion: planar, all sp², 4 + 2 = 6 π. Aromatic.",
          "Tropylium cation \\(\\mathrm{C_7H_7^+}\\): planar, all sp², 6 π. Aromatic.",
          "Cyclopropenyl anion: 4 π. Antiaromatic.",
          "Cyclooctatetraene: tub-shaped, not planar. Non-aromatic.",
          "Pyrrole: 4 π from two C=C + 2 from the N lone pair = 6. Aromatic.",
          "Cyclopentadiene: one sp³ CH₂ breaks the loop. Non-aromatic.",
        ],
        answer: "3 (cyclopentadienyl anion, tropylium cation, pyrrole)",
      },
      selfCheckExample: {
        prompt: "Is the cyclooctatetraene dianion, \\(\\mathrm{C_8H_8^{2-}}\\), aromatic?",
        steps: [
          "Two extra electrons make the ring planar, and every carbon is sp².",
          "π electrons \\(= 8 + 2 = 10 = 4(2) + 2\\).",
        ],
        answer: "Yes (10 π, n = 2)",
      },
      practiceSet: [
        { prompt: "Is the cyclopentadienyl cation aromatic?", answer: "No; 4 π electrons, antiaromatic" },
        { prompt: "How many π electrons does furan's aromatic ring hold?", answer: "6 (two C=C and one O lone pair)" },
        { prompt: "Is cycloheptatriene aromatic?", answer: "No; its CH₂ carbon is sp³" },
        { prompt: "How many π electrons does naphthalene have?", answer: "10" },
      ],
      pyqExampleId: "854cfb14-60a2-4787-9230-756fde78db9c", // 2022 — [6], [8] and cis-[10]annulene, planarity
      traps: [
        {
          title: "Look-alike drawings with one double bond missing",
          body: "A ring drawn like naphthalene but with only four C=C on ten carbons has at least one sp³ carbon, often at the ring fusion. Count the double bonds and find every sp³ carbon before calling a ring aromatic.",
        },
        {
          title: "The right count is not enough without planarity",
          body: "cis-[10]annulene has 10 π electrons, but hydrogens inside the ring push it out of plane. It is not aromatic. Cyclooctatetraene is tub-shaped for the same reason.",
        },
        {
          title: "An exocyclic C=O does not add to the ring's count",
          body: "Tropolone has 8 π electrons in total, but its C=O π pair is outside the ring loop. The ring behaves as a 6 π tropylium-like system and is aromatic.",
        },
      ],
    },

    // C3 — stability and acidity through aromaticity
    {
      kind: "reference" as const,
      slug: "jchc-aromatic-stability",
      name: "Aromaticity decides stability and acidity",
      intuition:
        "A species that becomes aromatic gains a large stability bonus, and one that would become antiaromatic pays a large penalty. So look at the ion that forms. Cyclopentadiene gives up a proton easily because its anion is aromatic. Cycloheptatriene loses a hydride (not a proton) easily, because its cation is aromatic. The same reasoning ranks ions against each other.",
      definition:
        "- Aromatic ion forms easily; antiaromatic ion forms with difficulty.\n" +
        "- Cyclopentadiene (pKa ≈ 16) is by far the most acidic simple hydrocarbon: its anion is aromatic. Toluene, propene and alkanes are far weaker acids.\n" +
        "- Tropylium bromide, \\(\\mathrm{C_7H_7^+Br^-}\\), is ionic and dissolves in water, because the cation is aromatic.\n" +
        "- Stability order for rings of similar size: aromatic > non-aromatic > antiaromatic.",
      table: {
        columns: ["Species", "π electrons in the ring", "Verdict", "Consequence"],
        rows: [
          { cells: ["Cyclopentadienyl anion", "6", "Aromatic", "Cyclopentadiene is unusually acidic"] },
          { cells: ["Tropylium cation", "6", "Aromatic", "Tropylium salts are ionic and stable"] },
          { cells: ["Cyclopropenyl cation", "2", "Aromatic", "A stable carbocation"] },
          { cells: ["Cyclopropenyl anion", "4", "Antiaromatic", "Very hard to form"] },
          { cells: ["Cyclopentadienyl cation", "4", "Antiaromatic", "Very hard to form"] },
          { cells: ["Cycloheptatrienyl anion", "8", "Antiaromatic if planar", "Cycloheptatriene is not especially acidic"] },
          { cells: ["Cyclobutadiene", "4", "Antiaromatic", "Exists only at very low temperature"] },
        ],
        caption: "Ask what the ion would be; an aromatic ion is easy to make, an antiaromatic one is not.",
      },
      selfCheckExample: {
        prompt: "Why is tropylium bromide soluble in water as ions, while bromocyclopentadiene is a covalent compound?",
        steps: [
          "Losing Br⁻ from cycloheptatrienyl bromide gives \\(\\mathrm{C_7H_7^+}\\), a planar ring with 6 π electrons: aromatic.",
          "Losing Br⁻ from bromocyclopentadiene would give \\(\\mathrm{C_5H_5^+}\\), with 4 π electrons: antiaromatic.",
        ],
        answer: "The tropylium cation is aromatic; the cyclopentadienyl cation would be antiaromatic.",
      },
      practiceSet: [
        { prompt: "Which is more stable, the cyclopropenyl cation or the cyclopropenyl anion?", answer: "The cation (2 π, aromatic)" },
        { prompt: "Which is more acidic, cyclopentadiene or cycloheptatriene?", answer: "Cyclopentadiene" },
        { prompt: "Is cyclobutadiene aromatic, antiaromatic or non-aromatic?", answer: "Antiaromatic" },
        { prompt: "How many π electrons does the cyclopropenyl cation have?", answer: "2" },
      ],
      pyqExampleId: "0cd16c23-0175-4757-9805-f667036e0e27", // 2021 — most acidic of four hydrocarbons
      traps: [
        {
          title: "Judge the ion, not the neutral molecule",
          body: "Cyclopentadiene itself is not aromatic (it has an sp³ CH₂). What matters for its acidity is the anion left behind, which is aromatic.",
        },
        {
          title: "Antiaromatic is worse than non-aromatic",
          body: "A planar ring with 4n π electrons is destabilised, not just ordinary. Rank aromatic first, non-aromatic next, antiaromatic last.",
        },
      ],
    },
  ],
  related: [
    { label: "Electrophilic Substitution: Reactivity and Directing Effects — what benzene does", href: `${BASE}/jch-hc-eas` },
  ],
};
