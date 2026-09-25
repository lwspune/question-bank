import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/transition-and-inner-transition-elements";

export const OXIDATION_STATES_NOTE: SubtopicNote = {
  subtopicName: "Oxidation States of Transition Elements",
  title: "Oxidation States of Transition Elements",
  oneLineDefinition:
    "Transition elements show several oxidation states because their (n−1)d and ns electrons are close in energy and can be lost in steps; the range is widest in the middle of the 3d series, at manganese (+2 to +7), narrowest at the ends — scandium +3 (and +2), zinc only +2 — and the highest state in the whole block is +8, reached by osmium in the 5d series.",
  whyItMatters:
    "6 PYQs, none HARD. Two ask which 3d element shows the most oxidation states (Mn), one which shows the fewest (Zn), one Scandium's states, one the highest state in the third series (+8), and one the Stock notation of MnO₂. " +
    "One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cettr-oxidation-state-range",
      name: "How Many Oxidation States, and the Highest One",
      intuition:
        "The highest oxidation state an early 3d element can reach is the number of its 4s plus 3d electrons: Sc +3, Ti +4, V +5, Cr +6, Mn +7. After manganese the d electrons start pairing and hold on more tightly, so the maximum falls again (Fe +6, Co +4, Ni +4, Cu +2, Zn +2). Manganese therefore has the widest range, +2 to +7. The ends are narrow: scandium mostly +3, zinc only +2. Going down a group higher states become MORE stable, so the 5d series reaches +8 in OsO₄. Stock notation just writes the state in Roman numerals: MnO₂ has Mn at +4, Mn(IV)O₂.",
      definition:
        "- **Most states in the 3d series**: **Mn**, +2 to +7 (4s² 3d⁵ — all seven outer electrons can be used).\n" +
        "- **Fewest**: **Zn**, only +2 (fewer than Sc, Ti or Cu).\n" +
        "- **Scandium**: **+2, +3** (+3 the stable one, giving Sc³⁺ d⁰).\n" +
        "- **Highest state in the d-block**: **+8**, by Os in \\(\\text{OsO}_4\\) (5d); the maximum in the 3d series is +7 (Mn in \\(\\text{MnO}_4^-\\)).\n" +
        "- **Stock notation**: oxidation state in Roman numerals — \\(\\text{MnO}_2\\): \\(x + 2(-2) = 0\\), so **Mn(IV)O₂**; \\(\\text{KMnO}_4\\) is Mn(VII).",
      formula: {
        label: "Maximum oxidation state, Sc to Mn",
        latex: "\\text{max O.S.} = n(4s) + n(3d):\\ \\text{Sc } {+3},\\ \\text{Ti } {+4},\\ \\text{V } {+5},\\ \\text{Cr } {+6},\\ \\text{Mn } {+7}",
      },
      authoredExample: {
        prompt: "Give the oxidation state of Cr in K₂Cr₂O₇ and write it in Stock notation.",
        steps: [
          "2(+1) + 2x + 7(−2) = 0 gives 2x = 12, so x = +6.",
        ],
        answer: "+6; potassium dichromate(VI)",
      },
      selfCheckExample: {
        prompt: "Which element shows the lowest number of oxidation states: Sc, Cu, Ti, Zn?",
        steps: [
          "Zinc has only +2.",
        ],
        answer: "Zn",
      },
      practiceSet: [
        { prompt: "3d element with the maximum number of oxidation states?", answer: "Mn" },
        { prompt: "Oxidation states of scandium?", answer: "+2, +3" },
        { prompt: "Highest oxidation state of third-row transition elements?", answer: "+8" },
        { prompt: "Stock notation of manganese dioxide?", answer: "Mn(IV)O₂" },
      ],
      pyqExampleId: "14d70248-76d6-4ed7-819e-f3a5b7681d36",
      traps: [
        {
          title: "Picking the element with most d electrons",
          body:
            "Zinc and copper have the most d electrons but the fewest states — a full or nearly full d subshell does not give up electrons. The widest range belongs to the middle, Mn.",
        },
      ],
    },
  ],
  related: [
    { label: "Position and Configuration — the 4s and 3d counts behind the range", href: `${BASE}/cettr-position-and-configuration` },
  ],
};
