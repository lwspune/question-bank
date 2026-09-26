import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/redox-reactions";

export const OXIDATION_NUMBER_NOTE: SubtopicNote = {
  subtopicName: "Oxidation Number Calculation and Determination",
  title: "Oxidation Number: The Rules, the Structural Exceptions, and the Change Across a Reaction",
  oneLineDefinition:
    "The oxidation number of an atom is the charge it would carry if every bond were fully ionic; it is found from a few fixed values and the rule that the numbers in a species add up to its charge.",
  whyItMatters:
    "26 PYQs, the heart of the chapter, and only one HARD — the tetrathionate structure. " +
    "Fifteen ask for one atom's number in a compound or ion, five need the structure (a peroxide oxygen, an S–S chain, an average value), and six ask how the number changes across a reaction. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetrdx-on-rules",
      name: "Finding One Atom's Oxidation Number",
      intuition:
        "Write down the atoms whose numbers never change, call the unknown x, and make the total equal the charge on the species — zero for a compound, the ion's charge for an ion. Every one of the fifteen questions of this kind is that one line of algebra.",
      definition:
        "- **Fixed values**: F **−1** always; O **−2** (except peroxides −1, OF₂ +2); H **+1** with non-metals (−1 in metal hydrides); group 1 metals **+1**, group 2 metals **+2**; an element on its own **0**.\n" +
        "- **Sum rule**: the numbers add up to **0** in a neutral compound and to the **charge** in an ion.\n" +
        "- A covalent compound works the same way: in methanal (CH₂O) carbon is **0**; in oxalate (C₂O₄²⁻) each carbon is **+3**.",
      formula: {
        label: "Sum rule",
        latex: "\\sum (\\text{oxidation numbers}) = \\text{charge on the species}",
      },
      authoredExample: {
        prompt: "Find the oxidation number of P in Ca₃(PO₄)₂ and of V in V₂O₇⁴⁻.",
        steps: [
          "Ca₃(PO₄)₂: \\(3(+2) + 2x + 8(-2) = 0\\), so \\(2x = 10\\) and \\(x = +5\\).",
          "V₂O₇⁴⁻: \\(2y + 7(-2) = -4\\), so \\(2y = 10\\) and \\(y = +5\\).",
        ],
        answer: "P = +5, V = +5",
      },
      selfCheckExample: {
        prompt: "Elements X, Y and Z carry +3, +5 and −2. Which formula is possible: XYZ₂, Y₂(XZ₃)₂, X₃(YZ₄)₃, X₃(Y₄Z)₂?",
        steps: [
          "Test each for a zero sum. X₃(YZ₄)₃: \\(3(+3) + 3[(+5) + 4(-2)] = 9 - 9 = 0\\).",
          "None of the others sums to zero.",
        ],
        answer: "X₃(YZ₄)₃",
      },
      practiceSet: [
        { prompt: "Oxidation number of S in SO₃²⁻?", answer: "+4" },
        { prompt: "Oxidation number of Mn in MnO₄⁻?", answer: "+7" },
        { prompt: "Oxidation number of O in OF₂?", answer: "+2" },
        { prompt: "Oxidation number of Xe in XeOF₄?", answer: "+6" },
      ],
      pyqExampleId: "1a9116c9-6c8b-4652-82c6-a334893e21a7",
      traps: [
        {
          title: "Treating an ion as neutral",
          body:
            "In MnO₄⁻ the total is −1, not 0: \\(x - 8 = -1\\) gives +7. Setting the sum to zero gives +8, which is not an option for Mn.",
        },
        {
          title: "Giving oxygen −2 next to fluorine",
          body: "Fluorine is always −1, so in OF₂ oxygen is +2 — the one compound where oxygen is positive.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetrdx-on-structure",
      name: "When the Formula Is Not Enough: Peroxides, Chains and Averages",
      intuition:
        "The sum rule gives the AVERAGE over atoms of one element. When those atoms sit in different places — a peroxide oxygen next to ordinary ones, sulphurs bonded to oxygen and sulphurs bonded only to sulphur — the average hides the real values, and you need the structure to split it.",
      definition:
        "- **Peroxide linkage** (–O–O–): each of those oxygens is **−1**. H₂SO₅ has one peroxide pair and three ordinary O, so S is **+6**, not +8.\n" +
        "- **S–S chain**: a sulphur bonded only to sulphur is **0**. In tetrathionate S₄O₆²⁻ the end sulphurs are **+5** and the two middle ones **0** — average 2.5.\n" +
        "- **Average (fractional) values**: Fe₃O₄ (Fe **8/3**), Mn₃O₄, Pb₃O₄ are mixed-state oxides.\n" +
        "- **Highest in a series**: count the oxygens — HClO **+1**, HClO₂ **+3**, HClO₃ **+5**, HClO₄ **+7**; KIO₄ (+7) beats KIO₃ and IF₅ (+5).",
      formula: {
        label: "Peroxide acid",
        latex: "\\mathrm{H_2SO_5}:\\ 2(+1) + x + 2(-1) + 3(-2) = 0 \\Rightarrow x = +6",
      },
      authoredExample: {
        prompt: "Sulphur in S₄O₆²⁻ averages 2.5. Why do the question's four numbered sulphurs read +5, 0, 0, +5?",
        steps: [
          "Count bonds: each bond to the more electronegative oxygen adds +1, and a bond between two sulphurs adds 0.",
          "Each end sulphur has two S=O (4 bonds to O) and one S–O⁻ (1 more): +5.",
          "The two middle sulphurs bond only to sulphur, so they are 0.",
          "Check: \\(2(+5) + 2(0) + 6(-2) = -2\\), the ion's charge.",
        ],
        answer: "+5, 0, 0, +5 (average +2.5)",
      },
      selfCheckExample: {
        prompt: "Which compound does NOT contain a metal in a fractional oxidation state: Fe₃O₄, Mn₃O₄, Pb₃O₄, Na₂S₄O₆?",
        steps: ["The first three are mixed oxides with average values. In Na₂S₄O₆ the metal, Na, is +1 — it is sulphur that averages 2.5."],
        answer: "Na₂S₄O₆",
      },
      practiceSet: [
        { prompt: "Oxidation number of S in H₂SO₅ (peroxomonosulphuric acid)?", answer: "+6" },
        { prompt: "Chlorine is highest in: KCl, HClO, HClO₂, HClO₄?", answer: "HClO₄ (+7)" },
        { prompt: "Iodine is highest in: KIO₃, KI, IF₅, KIO₄?", answer: "KIO₄ (+7)" },
      ],
      pyqExampleId: "62f20abc-45c7-434a-9cac-a5db85daa916",
      traps: [
        {
          title: "Reading +8 for sulphur",
          body: "No element in group 16 exceeds +6. If the sum rule gives +8 for S in H₂SO₅, a peroxide oxygen has been counted as −2.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetrdx-on-change",
      name: "The Change in Oxidation Number Across a Reaction",
      intuition:
        "Find the atom's number on the left and on the right; the difference is the change, and its direction tells you oxidation (up) or reduction (down). If the number is the same on both sides, that atom is neither oxidised nor reduced — even when its formula changes.",
      definition:
        "- **Up = oxidation**, **down = reduction**; the size of the change is the electrons per atom.\n" +
        "- Common pairs: Cr₂O₇²⁻ → Cr³⁺ **+6 → +3**; NO₃⁻ → NH₄⁺ **+5 → −3**; H₂S → S **−2 → 0**; KMnO₄ → MnO₂ **+7 → +4**; ClO₃⁻ → Cl⁻ (in ICl) **+5 → −1**.\n" +
        "- **No change**: CrO₄²⁻ ⇌ Cr₂O₇²⁻ keeps Cr at **+6** — an acid–base equilibrium, not redox.",
      formula: {
        label: "Change in oxidation number",
        latex: "\\Delta = \\text{ON}_{\\text{product}} - \\text{ON}_{\\text{reactant}}\\quad(\\Delta > 0:\\ \\text{oxidation})",
      },
      authoredExample: {
        prompt: "In I₂ + KClO₃ → ICl + KIO₃, by how much does chlorine's oxidation number change?",
        steps: [
          "In ClO₃⁻, \\(x + 3(-2) = -1\\) gives Cl = +5.",
          "In ICl, iodine is less electronegative, so Cl = −1.",
          "+5 → −1 is a decrease of 6: chlorine is reduced, and KClO₃ is the oxidising agent.",
        ],
        answer: "Decreases by 6",
      },
      selfCheckExample: {
        prompt: "Which conversion involves neither oxidation nor reduction: Na → Na⁺, VO²⁺ → V₂O₃, Zn²⁺ → Zn, CrO₄²⁻ → Cr₂O₇²⁻?",
        steps: ["Cr is +6 in both chromate and dichromate. The others change: 0 → +1, +4 → +3, +2 → 0."],
        answer: "CrO₄²⁻ → Cr₂O₇²⁻",
      },
      practiceSet: [
        { prompt: "Change in N when NO₃⁻ becomes NH₄⁺?", answer: "+5 to −3" },
        { prompt: "Difference in Mn's oxidation number between KMnO₄ and MnO₂?", answer: "3" },
        { prompt: "Change in S in H₂S + NO₃⁻ → NO + S + H₂O?", answer: "−2 to 0" },
      ],
      pyqExampleId: "5d5aad6a-97b1-4754-903e-778cc3729e6a",
      traps: [
        {
          title: "Calling chromate ⇌ dichromate a redox reaction",
          body: "The formula changes and so does the colour, but Cr stays +6. It is set every few years precisely because it looks like redox.",
        },
      ],
    },
  ],
  related: [
    { label: "Balancing: the change in oxidation number decides the coefficients", href: `${BASE}/cetrdx-balancing-redox` },
  ],
};
