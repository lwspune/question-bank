import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/redox-reactions";

export const BALANCING_REDOX_NOTE: SubtopicNote = {
  subtopicName: "Balancing Redox Reactions and Oxidized/Reduced Species",
  title: "Redox Reactions: Spotting What Is Oxidised, Counting Electrons, and Balancing",
  oneLineDefinition:
    "In a redox reaction one element's oxidation number rises and another's falls; the electrons lost by the first must equal the electrons gained by the second, and that equality fixes the coefficients.",
  whyItMatters:
    "12 PYQs, none HARD. Six ask which element is oxidised or reduced, or whether a reaction is redox at all; six ask for electrons transferred or a missing coefficient. " +
    "Two cards, both built on the oxidation numbers of the page before.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetrdx-identify-redox",
      name: "Which Element Is Oxidised, Which Is Reduced — and Is It Redox at All?",
      intuition:
        "Mark the oxidation number of every element on both sides and look for the two that move. The one that goes up lost electrons and was oxidised; the one that goes down gained them and was reduced. If nothing moves, the reaction is not redox, however much the formulas change.",
      definition:
        "- **Oxidised** = oxidation number rises (electrons lost); **reduced** = it falls (electrons gained).\n" +
        "- The species containing the reduced element is the **oxidising agent**, and vice versa.\n" +
        "- **Not redox**: double displacement (NaCl + KNO₃), acid–base (Mg(OH)₂ + NH₄Cl), and Cr₂O₇²⁻ + H₂O ⇌ 2CrO₄²⁻ + 2H⁺ — Cr stays +6.\n" +
        "- **Redox**: displacement of a metal, e.g. Zn + 2AgCN → Zn(CN)₂ + 2Ag (Zn 0 → +2, Ag +1 → 0); combination with an element, e.g. 3Mg + N₂ → Mg₃N₂.",
      authoredExample: {
        prompt: "In 3H₃AsO₃ + BrO₃⁻ → Br⁻ + 3H₃AsO₄, which element is reduced and which oxidised?",
        steps: [
          "Br: +5 in BrO₃⁻ → −1 in Br⁻ — down, so bromine is reduced.",
          "As: +3 in H₃AsO₃ → +5 in H₃AsO₄ — up, so arsenic is oxidised.",
          "H and O keep +1 and −2 throughout.",
        ],
        answer: "Br reduced, As oxidised",
      },
      selfCheckExample: {
        prompt: "For Ag₂O + H₂O + 2e⁻ → 2Ag + 2OH⁻, which statement is true: water is oxidised; hydrogen is oxidised; silver is reduced; hydrogen is reduced?",
        steps: ["Ag goes +1 → 0 and the electrons are on the left: a reduction half-reaction. H stays +1."],
        answer: "Silver is reduced",
      },
      practiceSet: [
        { prompt: "In 3Mg + N₂ → Mg₃N₂, is Mg oxidised or reduced?", answer: "Oxidised (0 → +2)" },
        { prompt: "Element reduced in Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 7H₂O + 3I₂?", answer: "Cr" },
        { prompt: "Is Cr₂O₇²⁻ + H₂O → 2CrO₄²⁻ + 2H⁺ a redox reaction?", answer: "No — Cr stays +6" },
      ],
      pyqExampleId: "6bec2638-0e75-41be-b5f7-c81b17b59e4a",
      traps: [
        {
          title: "Picking hydrogen or oxygen because they appear on both sides",
          body: "H (+1) and O (−2) are spectators in almost every aqueous redox reaction. Look for the element whose number actually changes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetrdx-electrons-balancing",
      name: "Electrons Transferred and the Balancing Coefficients",
      intuition:
        "The change in oxidation number per atom is the number of electrons that atom moves. Multiply by the atoms of that element in the formula to get electrons per formula; then choose coefficients so the electrons lost equal the electrons gained. For a half-reaction, balance the charge instead.",
      definition:
        "- **Electrons per atom** = size of the change: MnO₄⁻ → Mn²⁺ **5**; Cr₂O₇²⁻ → 2Cr³⁺ **6** (3 per Cr); NO₃⁻ → NH₄⁺ **8**; KMnO₄ → Mn₂O₃ **4** per Mn.\n" +
        "- **Oxidation-number method**: electrons lost × coefficient = electrons gained × coefficient.\n" +
        "- **Half-reaction (ion-electron) method**: after balancing atoms, add electrons so both sides carry the same **charge**.\n" +
        "- **Per mole of oxidising agent** in Zn + 2HCl: H⁺ + e⁻ → ½H₂, so **1 mol** of electrons.",
      formula: {
        label: "Electron balance",
        latex: "n_{\\text{lost}} \\times (\\text{coefficient}) = n_{\\text{gained}} \\times (\\text{coefficient})",
      },
      authoredExample: {
        prompt: "Balance Mn²⁺ + x ClO₃⁻ → MnO₂ + x ClO₂. What is x?",
        steps: [
          "Mn: +2 → +4, loses 2 electrons.",
          "Cl: +5 → +4, gains 1 electron per ClO₃⁻.",
          "Electrons lost = gained: \\(2 = x \\times 1\\), so x = 2.",
        ],
        answer: "x = 2",
      },
      selfCheckExample: {
        prompt: "In BiO₃⁻ + 6H⁺ + x e⁻ → Bi³⁺ + 3H₂O, what is x?",
        steps: ["Charge on the left: \\(-1 + 6 - x\\). On the right: +3. So \\(5 - x = 3\\) and x = 2."],
        answer: "2",
      },
      practiceSet: [
        { prompt: "Which change involves 5 electrons: MnO₄⁻ → Mn²⁺, CrO₄²⁻ → Cr³⁺, NO₃⁻ → NH₄⁺, Cr₂O₇²⁻ → 2Cr³⁺?", answer: "MnO₄⁻ → Mn²⁺" },
        { prompt: "x CuO + y NH₃ → x Cu + N₂ + x H₂O: x and y?", answer: "x = 3, y = 2" },
        { prompt: "Electrons per Mn when KMnO₄ becomes Mn₂O₃?", answer: "4" },
      ],
      pyqExampleId: "6c63994e-3bfa-473b-a7f2-3c623fe9da10",
      traps: [
        {
          title: "Counting electrons per ion instead of per atom",
          body: "Cr₂O₇²⁻ → 2Cr³⁺ is 3 electrons per Cr but 6 per dichromate ion. Read which the question asks for.",
        },
        {
          title: "Forgetting that N₂ has two atoms",
          body: "In CuO + NH₃ → N₂, one N₂ needs 2 N at 3 electrons each — 6 electrons, so 3 Cu (2 each) balance it, not 6.",
        },
      ],
    },
  ],
  related: [
    { label: "Oxidation numbers — the input to every step here", href: `${BASE}/cetrdx-oxidation-number` },
    { label: "Oxidising and reducing agents", href: `${BASE}/cetrdx-agents-and-oxides` },
  ],
};
