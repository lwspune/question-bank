import type { SubtopicNote } from "@/app/notes/_types";

export const WERNER_COORD_NOTE: SubtopicNote = {
  subtopicName: "Werner's Theory and Ionisable Ligands",
  title: "Werner's Theory and Ionisable Ligands",
  oneLineDefinition:
    "Only the ions written outside the square bracket are free in solution; they decide how much AgCl or BaSO₄ precipitates, how many ions the salt gives and its primary valency, while the ligands inside fix the coordination number.",
  whyItMatters:
    "Nineteen PYQs, eight of them multiple choice, and four from 2026. Fourteen count the ions outside the bracket, from the silver chloride or barium sulphate they precipitate, from a cation exchanger, from conductivity or from a freezing-point depression. Five turn a formula into primary and secondary valency or tell a double salt from a complex. Eleven of the nineteen ask for a number.",
  concepts: [
    // C1 — counting ionisable ions
    {
      kind: "formula" as const,
      slug: "jccoord-ionisable-count",
      name: "Counting the ions outside the coordination sphere",
      intuition:
        "A ligand inside the bracket is bonded to the metal and does not leave it in water. An ion outside the bracket is an ordinary counter-ion. So \\(\\mathrm{AgNO_3}\\) precipitates only the chloride outside the bracket, and \\(\\mathrm{BaCl_2}\\) only the sulphate outside it. Every question here is the same count: how many free ions does one formula unit give?",
      definition:
        "- Moles of AgCl = moles of complex × number of \\(\\mathrm{Cl^-}\\) outside the bracket.\n" +
        "- Number of ions per formula unit = 1 complex ion + the counter-ions. It sets the conductivity type (1:1, 1:2, 1:3) and the van 't Hoff factor \\(i\\) in \\(\\Delta T_f = iK_f m\\).\n" +
        "- \\(\\mathrm{CoCl_3\\cdot xNH_3}\\) with coordination number 6: \\(x = 6, 5, 4, 3\\) give 3, 2, 1, 0 mol AgCl per mol.\n" +
        "- A cation exchanger holds back the complex cation and releases the outer anions into the eluate, still one \\(\\mathrm{Cl^-}\\) per ionisable chloride.\n" +
        "- Ionisation isomers such as \\(\\mathrm{[Co(NH_3)_5SO_4]Br}\\) and \\(\\mathrm{[Co(NH_3)_5Br]SO_4}\\) each give only their own outer ion: the first precipitates AgBr, the second \\(\\mathrm{BaSO_4}\\).",
      formula: {
        label: "Precipitate from the ionisable ions",
        latex:
          "n_{\\mathrm{AgCl}} = n_{\\text{complex}} \\times (\\text{number of } \\mathrm{Cl^-} \\text{ outside } [\\;]) \\qquad \\Delta T_f = i\\,K_f\\,m",
      },
      authoredExample: {
        prompt:
          "Excess \\(\\mathrm{AgNO_3}\\) is added to 50 mL of a 0.04 M solution of \\(\\mathrm{[Co(NH_3)_6]Cl_3}\\). Find the moles and the mass of AgCl formed (molar mass of AgCl = 143.5 g mol\\(^{-1}\\)).",
        steps: [
          "Moles of complex \\(= 0.04 \\times 0.050 = 2.0 \\times 10^{-3}\\) mol.",
          "All three chlorides are outside the bracket, so each formula unit gives 3 \\(\\mathrm{Cl^-}\\).",
          "Moles of AgCl \\(= 3 \\times 2.0 \\times 10^{-3} = 6.0 \\times 10^{-3}\\) mol.",
          "Mass \\(= 6.0 \\times 10^{-3} \\times 143.5 = 0.861\\) g.",
        ],
        answer: "\\(6.0 \\times 10^{-3}\\) mol AgCl, 0.861 g.",
      },
      selfCheckExample: {
        prompt:
          "0.01 mol of an octahedral complex \\(\\mathrm{CoCl_3\\cdot 5NH_3}\\) gives 2.87 g of AgCl with excess \\(\\mathrm{AgNO_3}\\). Write its formula and the number of ions it gives in water.",
        steps: [
          "Moles of AgCl \\(= 2.87/143.5 = 0.02\\) mol, which is 2 mol per mol of complex.",
          "Two chlorides are outside the bracket and one is inside. With five \\(\\mathrm{NH_3}\\) the coordination number is 6.",
          "The formula is \\(\\mathrm{[Co(NH_3)_5Cl]Cl_2}\\): one complex cation and two chloride ions.",
        ],
        answer: "\\(\\mathrm{[Co(NH_3)_5Cl]Cl_2}\\); 3 ions per formula unit (a 1:2 electrolyte).",
      },
      practiceSet: [
        { prompt: "How many moles of AgCl does 1 mol of the octahedral complex \\(\\mathrm{CoCl_3\\cdot 4NH_3}\\) give with excess \\(\\mathrm{AgNO_3}\\)?", answer: "1 mol, since it is \\(\\mathrm{[Co(NH_3)_4Cl_2]Cl}\\)" },
        { prompt: "Which ion does \\(\\mathrm{BaCl_2}\\) precipitate from a solution of \\(\\mathrm{[Co(NH_3)_5Br]SO_4}\\)?", answer: "Sulphate, as \\(\\mathrm{BaSO_4}\\)" },
        { prompt: "How many ions does one formula unit of \\(\\mathrm{[Pt(NH_3)_4]Cl_2}\\) give in water?", answer: "3" },
        { prompt: "What van 't Hoff factor does complete dissociation of \\(\\mathrm{K_3[Fe(CN)_6]}\\) give?", answer: "\\(i = 4\\)" },
      ],
      pyqExampleId: "f09bef7d-18e5-4cc1-9ea9-d0431b05611e", // 2026 — AgCl from tetraaquadichloridochromium(III) chloride
      traps: [
        {
          title: "Chloride inside the bracket never precipitates",
          body: "In \\(\\mathrm{[Cr(H_2O)_4Cl_2]Cl}\\) only one of the three chlorides reaches the silver ion. Counting all three triples the answer, and that value is always among the options.",
        },
        {
          title: "Use the portion that was actually tested",
          body: "When a mixed solution is split in two and each half meets a different reagent, each half carries only half the moles. Working from the whole volume doubles every answer.",
        },
        {
          title: "Read which ratio the question wants",
          body: "Moles of complex per mole of AgCl and moles of AgCl per mole of complex are reciprocals. For \\(\\mathrm{[Cr(H_2O)_6]Cl_3}\\) the first is 1/3 and the second is 3.",
        },
      ],
    },

    // C2 — primary and secondary valency; double salts
    {
      kind: "formula" as const,
      slug: "jccoord-valency",
      name: "Primary valency, secondary valency and double salts",
      intuition:
        "Werner saw two kinds of valency in one metal. The primary valency is the oxidation state: it is balanced by negative ions and can be ionisable. The secondary valency is the coordination number: the ligands that hold a fixed shape around the metal. A double salt has no such inner sphere, so in water it breaks up completely into simple ions.",
      definition:
        "- **Primary valency** = oxidation state of the metal. It stays the same whether the balancing anions are inside or outside the bracket.\n" +
        "- **Secondary valency** = coordination number = number of donor atoms bonded to the metal (a bidentate ligand counts 2, EDTA⁴⁻ counts 6).\n" +
        "- Oxidation state: \\(x + \\sum(\\text{ligand charges}) = \\text{charge on the complex ion}\\). A complex counter-cation also carries charge: in \\(\\mathrm{Hg[Co(SCN)_4]}\\) mercury is +2, so cobalt is +2.\n" +
        "- **Double salts** such as Mohr's salt \\(\\mathrm{FeSO_4\\cdot(NH_4)_2SO_4\\cdot 6H_2O}\\) and potash alum \\(\\mathrm{K_2SO_4\\cdot Al_2(SO_4)_3\\cdot 24H_2O}\\) give all their simple ions in water.\n" +
        "- A **complex** keeps its complex ion: \\(\\mathrm{Fe(CN)_2\\cdot 4KCN}\\) is \\(\\mathrm{K_4[Fe(CN)_6]}\\) and gives no free \\(\\mathrm{Fe^{2+}}\\) or \\(\\mathrm{CN^-}\\).",
      formula: {
        label: "Oxidation state of the central metal",
        latex: "x + \\sum q_{\\text{ligands}} = q_{\\text{complex ion}}",
      },
      authoredExample: {
        prompt: "Find the primary and secondary valency of iron in \\(\\mathrm{K_3[Fe(C_2O_4)_3]}\\).",
        steps: [
          "The complex ion is \\(\\mathrm{[Fe(C_2O_4)_3]^{3-}}\\) because three \\(\\mathrm{K^+}\\) balance it.",
          "\\(x + 3(-2) = -3\\), so \\(x = +3\\): the primary valency is 3.",
          "Each oxalate is bidentate, so three of them give 6 donor atoms: the secondary valency is 6.",
        ],
        answer: "Primary valency 3, secondary valency 6.",
      },
      selfCheckExample: {
        prompt: "Find the primary and secondary valency of platinum in \\(\\mathrm{[Pt(en)_2Cl_2]Cl_2}\\).",
        steps: [
          "The complex ion is \\(\\mathrm{[Pt(en)_2Cl_2]^{2+}}\\); en is neutral and each Cl⁻ is −1.",
          "\\(x + 2(0) + 2(-1) = +2\\), so \\(x = +4\\).",
          "Two bidentate en give 4 donor atoms and two Cl⁻ give 2 more: coordination number 6.",
        ],
        answer: "Primary valency 4, secondary valency 6.",
      },
      practiceSet: [
        { prompt: "What is the secondary valency of cobalt in \\(\\mathrm{[Co(NH_3)_5Cl]Cl_2}\\)?", answer: "6" },
        { prompt: "What is the oxidation state of copper in \\(\\mathrm{[Cu(NH_3)_4]SO_4}\\)?", answer: "+2" },
        { prompt: "Is Mohr's salt a double salt or a coordination compound?", answer: "A double salt" },
        { prompt: "What is the coordination number of calcium in \\(\\mathrm{[Ca(EDTA)]^{2-}}\\)?", answer: "6" },
      ],
      pyqExampleId: "f6bb6ec2-2caa-4ae4-b82d-4bd3768f2f79", // 2022 — primary valency of a 1:1 CoCl3(NH3)4 complex
      traps: [
        {
          title: "Primary valency is the oxidation state, not the ionisable count",
          body: "\\(\\mathrm{[Co(NH_3)_4Cl_2]Cl}\\) has only one ionisable chloride, but cobalt is still +3, so its primary valency is 3. The number of ions outside the bracket tells you the formula, not the valency.",
        },
        {
          title: "A complex counter-ion changes the metal's charge",
          body: "In \\(\\mathrm{Hg[Co(SCN)_4]}\\) the mercury ion is +2, so the complex anion is 2− and cobalt is +2, with coordination number 4. A 2025 key gave this complex primary valency 3; the charge balance gives 2.",
        },
      ],
    },
  ],
};
